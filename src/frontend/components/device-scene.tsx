'use client'
import { useEffect, useRef, type ReactNode } from 'react'

export type DeviceScreen = { src: string; alt: string; width: number; height: number }
export type DeviceKind = 'laptop' | 'tablet' | 'phone'
export type DeviceSceneSpec = { device: DeviceKind; screen: DeviceScreen; mobile?: DeviceScreen; brand?: boolean }

export function DeviceScene({ spec, className, children }: { spec: DeviceSceneSpec; className: string; children: ReactNode }) {
  const host = useRef<HTMLDivElement>(null)
  const serialized = JSON.stringify(spec)
  useEffect(() => {
    const spec = JSON.parse(serialized) as DeviceSceneSpec
    const element = host.current
    if (!element) return
    let disposed = false, visible = false, generation = 0, stop: (() => void) | undefined
    let idle: number | undefined
    async function start() {
      const current = ++generation
      try {
        const runtime = await import('../lib/device-scene-runtime')
        if (disposed || !visible || current !== generation) return
        const release = await runtime.mountDeviceScene(element!, spec, () => !disposed && visible && current === generation)
        if (disposed || !visible || current !== generation) release?.()
        else stop = release
      } catch {
        // The real screenshot stays usable when WebGL or a texture is unavailable.
        element!.dataset.deviceState = 'fallback'
      }
    }
    function schedule() {
      if ('requestIdleCallback' in window) idle = window.requestIdleCallback(() => { idle = undefined; void start() }, { timeout: 900 })
      else void start()
    }
    function cancel() {
      generation++
      if (idle !== undefined) window.cancelIdleCallback(idle)
      idle = undefined
      stop?.(); stop = undefined
    }
    const observer = new IntersectionObserver(entries => {
      const next = entries[0].isIntersecting
      if (next === visible) return
      visible = next
      if (visible) schedule()
      else cancel()
    }, { rootMargin: '0px' })
    observer.observe(element)
    return () => { disposed = true; cancel(); observer.disconnect() }
  }, [serialized])
  return <div ref={host} className={`${className} device3d-stage`} data-device-kind={spec.device}>{children}</div>
}
