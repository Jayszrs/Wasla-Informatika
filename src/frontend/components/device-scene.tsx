'use client'
import { useEffect, useId, useRef, type ReactNode } from 'react'
import { useLocale } from './locale-provider'
import styles from './device-scene.module.css'

export type DeviceScreen = { src: string; alt: string; width: number; height: number }
export type DeviceKind = 'laptop' | 'tablet' | 'phone'
export type DeviceSceneSpec = { device: DeviceKind; screen: DeviceScreen; mobile?: DeviceScreen; brand?: boolean }
export type DeviceSceneController = { dispose(): void; setVisible(visible: boolean): void }

export function DeviceScene({ spec, className, children }: { spec: DeviceSceneSpec; className: string; children: ReactNode }) {
  const host = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const hintId = useId()
  const hint = locale === 'en' ? 'Swipe sideways to rotate · scroll vertically to continue' : 'Geser ke samping untuk memutar · gulir vertikal untuk lanjut'
  const serialized = JSON.stringify(spec)
  useEffect(() => {
    const spec = JSON.parse(serialized) as DeviceSceneSpec
    const element = host.current
    if (!element) return
    let disposed = false, visible = false, loading = false, attempts = 0
    let controller: DeviceSceneController | undefined
    let idle: number | undefined
    let retry: ReturnType<typeof setTimeout> | undefined
    async function start() {
      if (loading || controller || disposed || !visible || attempts >= 2) return
      loading = true; attempts++
      try {
        const runtime = await import('../lib/device-scene-runtime')
        if (disposed || !visible) { attempts--; return }
        const mounted = await runtime.mountDeviceScene(element!, spec, () => !disposed)
        if (disposed) mounted?.dispose()
        else { controller = mounted; controller?.setVisible(visible); if (mounted) { delete element!.dataset.deviceError; delete element!.dataset.deviceState } }
      } catch (error) {
        if (disposed) return
        element!.dataset.deviceState = 'fallback'
        element!.dataset.deviceError = error instanceof Error ? error.name : 'UnknownError'
        if (attempts < 2) retry = setTimeout(() => { if (visible && !disposed) void start() }, 350)
      }
      finally { loading = false }
    }
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting
      controller?.setVisible(visible)
      if (visible && !controller && !loading) {
        if ('requestIdleCallback' in window) idle = window.requestIdleCallback(() => { idle = undefined; void start() }, { timeout: 300 })
        else void start()
      }
    }, { rootMargin: '100px' })
    const prewarm = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      void import('../lib/device-scene-runtime').catch(() => {})
      prewarm.disconnect()
    }, { rootMargin: '300px' })
    prewarm.observe(element); observer.observe(element)
    return () => { disposed = true; clearTimeout(retry); if (idle !== undefined) window.cancelIdleCallback(idle); controller?.dispose(); observer.disconnect(); prewarm.disconnect() }
  }, [serialized])
  return <div ref={host} className={`${className} device3d-stage ${styles.interactive}`} data-device-kind={spec.device} role="group" aria-label={locale === 'en' ? 'Interactive 3D device preview' : 'Pratinjau perangkat 3D interaktif'} aria-describedby={hintId}>{children}<span className={styles.hint} id={hintId} aria-hidden="true">{hint}</span></div>
}
