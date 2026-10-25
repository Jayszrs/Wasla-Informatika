import * as T from 'three'

// One GPU context serves every independently composited canvas. Each canvas
// keeps its last frame while offscreen; no readback encoding or render loop.
let shared: T.WebGLRenderer | undefined
let clients = 0
let disposeTimer: ReturnType<typeof setTimeout> | undefined
const redraw = new Set<() => void>()
let reducedMotion: MediaQueryList | undefined
export function reducedMotionPreference() { return reducedMotion ??= matchMedia('(prefers-reduced-motion: reduce)') }

export function createSceneSurface() {
  clearTimeout(disposeTimer)
  if (!shared) {
    shared = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    shared.setPixelRatio(1)
    shared.setClearColor(0, 0)
    shared.outputColorSpace = T.SRGBColorSpace
    shared.toneMapping = T.ACESFilmicToneMapping
    shared.setScissorTest(true)
    shared.domElement.addEventListener('webglcontextrestored', () => redraw.forEach(draw => draw()))
  }
  const renderer = shared
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d', { alpha: true })
  if (!context) throw Error('Canvas unavailable')
  clients++
  let disposed = false
  let width = 1, height = 1
  let onRestore: (() => void) | undefined
  return {
    canvas,
    anisotropy: Math.min(4, renderer.capabilities.getMaxAnisotropy()),
    resize(cssWidth: number, cssHeight: number) {
      const ratio = Math.min(devicePixelRatio, 1.25, 1600 / cssWidth, 1200 / cssHeight)
      width = Math.max(1, Math.round(cssWidth * ratio))
      height = Math.max(1, Math.round(cssHeight * ratio))
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height }
    },
    render(scene: T.Scene, camera: T.Camera, exposure = 1.15) {
      if (disposed || renderer.getContext().isContextLost()) return false
      const source = renderer.domElement
      if (source.width < width || source.height < height) renderer.setSize(Math.max(source.width, width), Math.max(source.height, height), false)
      renderer.setViewport(0, 0, width, height)
      renderer.setScissor(0, 0, width, height)
      renderer.toneMappingExposure = exposure
      renderer.render(scene, camera)
      context.globalCompositeOperation = 'copy'
      context.drawImage(source, 0, source.height - height, width, height, 0, 0, width, height)
      return true
    },
    onRestore(draw: () => void) { onRestore = draw; redraw.add(draw) },
    dispose() {
      if (disposed) return
      disposed = true
      if (onRestore) redraw.delete(onRestore)
      canvas.remove()
      clients--
      if (!clients) disposeTimer = setTimeout(() => {
        if (!clients && shared === renderer) { renderer.dispose(); renderer.forceContextLoss(); shared = undefined }
      }, 1000)
    },
  }
}
