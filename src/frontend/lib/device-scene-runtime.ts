import * as T from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import type { DeviceSceneSpec, DeviceScreen } from '../components/device-scene'

const MAX_RENDERERS = 4
let renderers = 0
const waiting = new Set<() => void>()
async function reserve(alive: () => boolean) {
  while (renderers >= MAX_RENDERERS) {
    if (!alive()) return false
    await new Promise<void>(resolve => {
      const timer = setTimeout(done, 250)
      function done() { clearTimeout(timer); waiting.delete(done); resolve() }
      waiting.add(done)
    })
  }
  if (!alive()) return false
  renderers++
  return true
}
function release() { renderers--; waiting.forEach(wake => wake()) }

export async function mountDeviceScene(host: HTMLDivElement, spec: DeviceSceneSpec, alive: () => boolean): Promise<(() => void) | undefined> {
  if (!await reserve(alive)) return
  let renderer: T.WebGLRenderer | undefined, frame = 0, stopped = false
  const resources: { dispose(): void }[] = []
  const cleanups: (() => void)[] = []
  const cleanup = () => {
    if (stopped) return
    stopped = true; cancelAnimationFrame(frame)
    cleanups.forEach(fn => fn()); resources.forEach(item => item.dispose())
    if (renderer) { renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove() }
    delete host.dataset.deviceReady; delete host.dataset.deviceState
    release()
  }
  try {
    renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25)); renderer.setClearColor(0, 0)
    renderer.outputColorSpace = T.SRGBColorSpace; renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.15
    const scene = new T.Scene(), model = new T.Group()
    scene.add(model)
    scene.add(new T.HemisphereLight('#ffffff', '#60758a', 3.4))
    const key = new T.DirectionalLight('#ffffff', 3); key.position.set(-3, 5, 5); scene.add(key)
    const rim = new T.DirectionalLight('#adc9e8', 2); rim.position.set(5, 2, -3); scene.add(rim)
    const silver = new T.MeshStandardMaterial({ color: '#aebdcc', metalness: .55, roughness: .32 })
    const edge = new T.MeshStandardMaterial({ color: '#102236', metalness: .35, roughness: .35 })
    const keyboard = new T.MeshStandardMaterial({ color: '#314457', metalness: .3, roughness: .5 })
    resources.push(silver, edge, keyboard)
    function box(parent: T.Group, size: [number, number, number], position: [number, number, number], material: T.Material, radius = .06) {
      const geometry = new RoundedBoxGeometry(...size, 2, radius); resources.push(geometry)
      const mesh = new T.Mesh(geometry, material); mesh.position.set(...position); parent.add(mesh); return mesh
    }
    const fallbacks = [...host.querySelectorAll<HTMLImageElement>('img')]
    async function texture(screen: DeviceScreen, ratio: number, index: number) {
      const fallback = fallbacks[index]
      if (fallback && !fallback.complete) await fallback.decode().catch(() => {})
      const source = new Image(); source.crossOrigin = 'anonymous'; source.decoding = 'async'
      source.src = fallback?.currentSrc || screen.src
      await source.decode()
      if (!alive()) return null
      const maximum = innerWidth < 768 ? 1024 : 1536
      const width = Math.floor(Math.min(spec.brand ? 720 : source.naturalWidth, maximum, maximum * ratio))
      const height = Math.round(width / ratio)
      const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height
      const context = canvas.getContext('2d'); if (!context) throw Error('Texture canvas unavailable')
      const sourceRatio = source.naturalWidth / source.naturalHeight
      let cropWidth = source.naturalWidth, cropHeight = source.naturalHeight
      if (sourceRatio > ratio) cropWidth = cropHeight * ratio
      else cropHeight = cropWidth / ratio
      if (spec.brand) {
        context.fillStyle = '#ffffff'; context.fillRect(0, 0, width, height)
        const logoSize = width * .59
        context.drawImage(source, (width - logoSize) / 2, height * .29, logoSize, logoSize)
        await document.fonts.ready
        context.fillStyle = '#071b35'; context.textAlign = 'center'
        const font = getComputedStyle(host).fontFamily
        context.font = `600 ${Math.round(width * .13)}px ${font}`; context.fillText('wasla', width / 2, height * .68)
        context.font = `400 ${Math.round(width * .04)}px ${font}`; context.fillText('informatika', width / 2, height * .72)
      } else context.drawImage(source, (source.naturalWidth - cropWidth) / 2, 0, cropWidth, cropHeight, 0, 0, width, height)
      const map = new T.CanvasTexture(canvas); map.colorSpace = T.SRGBColorSpace; map.anisotropy = Math.min(4, renderer!.capabilities.getMaxAnisotropy()); resources.push(map)
      const material = new T.MeshBasicMaterial({ map, toneMapped: false }); resources.push(material)
      return material
    }
    async function device(kind: DeviceSceneSpec['device'], image: DeviceScreen, index: number) {
      const group = new T.Group()
      const width = kind === 'laptop' ? 4.8 : kind === 'tablet' ? 4 : 1.6
      const height = kind === 'laptop' ? 3 : kind === 'tablet' ? 3 : 3.22
      const inset = kind === 'phone' ? .085 : .12
      const material = await texture(image, (width - inset * 2) / (height - inset * 2), index)
      if (!material) return group
      const body = box(group, [width, height, .17], [0, 0, 0], edge, kind === 'phone' ? .17 : .1)
      box(group, [width + .025, height + .025, .09], [0, 0, -.1], silver, kind === 'phone' ? .17 : .1)
      const geometry = new T.PlaneGeometry(width - inset * 2, height - inset * 2); resources.push(geometry)
      const display = new T.Mesh(geometry, material); display.position.z = .089; group.add(display)
      if (kind === 'laptop') {
        const base = box(group, [width + .3, .1, 1.4], [0, -height / 2 - .04, .6], silver, .04)
        base.rotation.x = -.035
        box(group, [width - .42, .016, .64], [0, -height / 2 + .02, .42], keyboard, .03)
        box(group, [1.1, .02, .37], [0, -height / 2 + .03, .96], silver, .03)
        const keyGeometry = new RoundedBoxGeometry(.23, .023, .095, 1, .008)
        const keys = new T.InstancedMesh(keyGeometry, edge, 52), matrix = new T.Matrix4()
        for (let row = 0; row < 4; row++) for (let col = 0; col < 13; col++) keys.setMatrixAt(row * 13 + col, matrix.makeTranslation(-1.81 + col * .3, -height / 2 + .04, .17 + row * .13))
        group.add(keys); resources.push(keyGeometry, keys)
      } else if (kind === 'phone') {
        box(group, [.4, .075, .025], [0, height / 2 - .13, .11], edge, .035)
        box(group, [.045, .4, .08], [width / 2 + .025, .5, -.015], silver, .015)
        box(group, [.045, .29, .08], [-width / 2 - .025, .6, -.015], silver, .015)
      } else box(group, [.17, .045, .02], [0, height / 2 - .07, .1], silver, .015)
      body.name = `physical-${kind}`
      return group
    }
    const main = await device(spec.device, spec.screen, 0)
    if (!alive()) { cleanup(); return }
    model.add(main)
    if (spec.mobile) {
      main.position.set(-.45, .08, -.15); main.rotation.y = -.05
      const mobile = await device('phone', spec.mobile, 1)
      if (!alive()) { cleanup(); return }
      mobile.position.set(2.12, -.45, .75); mobile.rotation.set(.02, -.13, -.06); mobile.scale.setScalar(.84); model.add(mobile)
    }
    if (spec.brand) { main.rotation.z = -.16; main.rotation.y = -.1 }
    const bounds = new T.Box3().setFromObject(model), center = bounds.getCenter(new T.Vector3())
    model.position.sub(center)
    const stage = new T.Group(); stage.add(model); scene.add(stage); scene.remove(model)
    const camera = new T.PerspectiveCamera(33, 1, .1, 100)
    const reduced = matchMedia('(prefers-reduced-motion: reduce)'), fine = matchMedia('(hover:hover) and (pointer:fine)')
    let currentX = -.11, currentY = -.18, targetX = currentX, targetY = currentY, drawn = 0
    const canvas = renderer.domElement
    canvas.className = 'device3d-canvas'; canvas.setAttribute('aria-hidden', 'true'); canvas.dataset.device3d = spec.device; canvas.dataset.texturedScreens = spec.mobile ? '2' : '1'
    host.append(canvas)
    const contextLost = (event: Event) => { event.preventDefault(); cleanup() }
    canvas.addEventListener('webglcontextlost', contextLost)
    cleanups.push(() => canvas.removeEventListener('webglcontextlost', contextLost))
    function draw() {
      frame = 0; if (stopped || !alive()) return
      const speed = reduced.matches ? 1 : .2
      currentX += (targetX - currentX) * speed; currentY += (targetY - currentY) * speed
      stage.rotation.set(currentX, currentY, 0); renderer!.render(scene, camera)
      canvas.dataset.rendered3d = 'true'; canvas.dataset.rotation = `${currentX.toFixed(3)},${currentY.toFixed(3)}`
      host.dataset.deviceReady = 'true'
      if (++drawn < 45 && (Math.abs(targetX - currentX) > .001 || Math.abs(targetY - currentY) > .001)) frame = requestAnimationFrame(draw)
    }
    function render() { drawn = 0; if (!frame) frame = requestAnimationFrame(draw) }
    function resize() {
      const rect = host.getBoundingClientRect(); if (!rect.width || !rect.height) return
      renderer!.setSize(rect.width, rect.height); camera.aspect = rect.width / rect.height
      const size = bounds.getSize(new T.Vector3()), tangent = Math.tan(T.MathUtils.degToRad(camera.fov / 2))
      camera.position.set(0, .1, Math.max(size.y / (2 * tangent), size.x / (2 * tangent * camera.aspect)) * 1.18 + size.z)
      camera.lookAt(0, 0, 0); camera.updateProjectionMatrix(); render()
    }
    function pointer(event: PointerEvent) {
      if (!fine.matches || reduced.matches) return
      const rect = host.getBoundingClientRect()
      targetY = -.18 + ((event.clientX - rect.left) / rect.width - .5) * .38
      targetX = -.11 + ((event.clientY - rect.top) / rect.height - .5) * .17; render()
    }
    function reset() { targetX = -.11; targetY = -.18; render() }
    function scroll() {
      if (!fine.matches || reduced.matches) return
      const rect = host.getBoundingClientRect()
      targetX = -.11 + Math.max(-1, Math.min(1, (innerHeight / 2 - rect.top - rect.height / 2) / innerHeight)) * .12; render()
    }
    function visibility() { if (document.hidden) { cancelAnimationFrame(frame); frame = 0 } else render() }
    const observer = new ResizeObserver(resize); observer.observe(host)
    const pointerSurface = host.closest('a') || host
    pointerSurface.addEventListener('pointermove', pointer as EventListener); pointerSurface.addEventListener('pointerleave', reset)
    pointerSurface.addEventListener('focusin', reset); window.addEventListener('scroll', scroll, { passive: true }); document.addEventListener('visibilitychange', visibility)
    reduced.addEventListener('change', reset)
    cleanups.push(() => { observer.disconnect(); pointerSurface.removeEventListener('pointermove', pointer as EventListener); pointerSurface.removeEventListener('pointerleave', reset); pointerSurface.removeEventListener('focusin', reset); window.removeEventListener('scroll', scroll); document.removeEventListener('visibilitychange', visibility); reduced.removeEventListener('change', reset) })
    resize()
    return cleanup
  } catch {
    cleanup()
    return undefined
  }
}
