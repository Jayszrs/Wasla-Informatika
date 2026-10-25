import * as T from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { createSceneSurface, reducedMotionPreference } from './scene-surface'
import type { DeviceSceneController, DeviceSceneSpec, DeviceScreen } from '../components/device-scene'

let sceneSequence = 0

export async function mountDeviceScene(host: HTMLDivElement, spec: DeviceSceneSpec, alive: () => boolean): Promise<DeviceSceneController | undefined> {
  const fallbacks = [...host.querySelectorAll<HTMLImageElement>('.device-frame img, .brand-phone-fallback img')]
  const screens = [spec.screen, ...(spec.mobile ? [spec.mobile] : [])]
  const decode = (image: HTMLImageElement) => new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => reject(new DOMException('Image decoding timed out', 'TimeoutError')), 10_000)
    image.decode().then(() => { clearTimeout(timer); resolve() }, error => { clearTimeout(timer); reject(error) })
  })
  const sources = await Promise.all(screens.map(async (screen, index) => {
    const fallback = fallbacks[index]
    let failure: unknown
    for (let attempt = 0; attempt < 2 && alive(); attempt++) {
      try {
        // Wait for Next Image's selected responsive URL. Its lazy currentSrc can
        // initially be empty; the raw media redirect may not permit CORS.
        if (fallback) { fallback.loading = 'eager'; await decode(fallback) }
        if (!alive()) return null
        // Decode the selected bitmap independently: srcset naturalWidth is
        // density-corrected and must not be used for pixel-space texture crops.
        const source = new Image(); source.crossOrigin = 'anonymous'; source.decoding = 'async'
        source.src = fallback?.currentSrc || fallback?.src || screen.src
        await decode(source)
        return source
      } catch (error) {
        failure = error
        if (!attempt && alive()) await new Promise(resolve => setTimeout(resolve, 150))
      }
    }
    if (!alive()) return null
    throw failure
  }))

  if (!alive() || sources.some(source => !source)) return
  const bitmaps = sources as HTMLImageElement[]
  let surface: ReturnType<typeof createSceneSurface> | undefined, frame = 0, stopped = false, visible = true
  const resources: { dispose(): void }[] = []
  const cleanups: (() => void)[] = []
  const cleanup = () => {
    if (stopped) return
    stopped = true; cancelAnimationFrame(frame)
    const ownsHost = surface && host.dataset.deviceOwner === surface.canvas.dataset.deviceOwner
    cleanups.forEach(fn => fn()); resources.forEach(item => item.dispose())
    surface?.dispose()
    if (ownsHost) {
      delete host.dataset.deviceReady; delete host.dataset.deviceState
      delete host.dataset.deviceOwner
    }
  }
  try {
    surface = createSceneSurface()
    const scene = new T.Scene(), model = new T.Group()
    scene.add(model)
    scene.add(new T.HemisphereLight('#ffffff', '#60758a', 3.4))
    const key = new T.DirectionalLight('#ffffff', 3); key.position.set(-3, 5, 5); scene.add(key)
    const rim = new T.DirectionalLight('#adc9e8', 2); rim.position.set(5, 2, -3); scene.add(rim)
    const silver = new T.MeshStandardMaterial({ color: '#b9c4cf', metalness: .65, roughness: .28 })
    const edge = new T.MeshStandardMaterial({ color: '#101b29', metalness: .4, roughness: .24 })
    const keyboard = new T.MeshStandardMaterial({ color: '#536373', metalness: .32, roughness: .4 })
    resources.push(silver, edge, keyboard)
    function box(parent: T.Group, size: [number, number, number], position: [number, number, number], material: T.Material, radius = .06) {
      const geometry = new RoundedBoxGeometry(...size, 2, radius); resources.push(geometry)
      const mesh = new T.Mesh(geometry, material); mesh.position.set(...position); parent.add(mesh); return mesh
    }
    function plate(parent: T.Group, size: [number, number, number], position: [number, number, number], material: T.Material, radius: number) {
      const [width, height, depth] = size, bevel = Math.min(.015, depth / 5)
      const x = width / 2 - bevel, y = height / 2 - bevel, r = Math.max(.01, radius - bevel)
      const shape = new T.Shape()
      shape.moveTo(-x + r, -y); shape.lineTo(x - r, -y); shape.quadraticCurveTo(x, -y, x, -y + r)
      shape.lineTo(x, y - r); shape.quadraticCurveTo(x, y, x - r, y)
      shape.lineTo(-x + r, y); shape.quadraticCurveTo(-x, y, -x, y - r)
      shape.lineTo(-x, -y + r); shape.quadraticCurveTo(-x, -y, -x + r, -y)
      const geometry = new T.ExtrudeGeometry(shape, { depth: depth - bevel * 2, bevelEnabled: true, bevelSize: bevel, bevelThickness: bevel, bevelSegments: 1, curveSegments: 5, steps: 1 })
      geometry.translate(0, 0, -(depth - bevel * 2) / 2); resources.push(geometry)
      const mesh = new T.Mesh(geometry, material); mesh.position.set(...position); parent.add(mesh); return mesh
    }
    async function texture(screen: DeviceScreen, ratio: number, index: number) {
      const source = bitmaps[index]
      if (!alive()) return null
      const maximum = innerWidth < 768 ? 1024 : 1536
      const width = Math.floor(Math.min(spec.brand ? 720 : source.naturalWidth, maximum, maximum * ratio))
      const height = Math.round(width / ratio)
      const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height
      const context = canvas.getContext('2d'); if (!context) throw Error('Texture canvas unavailable')
      context.beginPath(); context.roundRect(0, 0, width, height, Math.round(width * (spec.device === 'phone' || index === 1 ? .055 : .012))); context.clip()
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
      const map = new T.CanvasTexture(canvas); map.colorSpace = T.SRGBColorSpace; map.anisotropy = surface!.anisotropy; resources.push(map)
      const material = new T.MeshBasicMaterial({ map, toneMapped: false, alphaTest: .1 }); resources.push(material)
      return material
    }
    async function device(kind: DeviceSceneSpec['device'], image: DeviceScreen, index: number) {
      const group = new T.Group()
      const width = kind === 'laptop' ? 4.8 : kind === 'tablet' ? 4.3 : 1.62
      const height = kind === 'laptop' ? 3 : kind === 'tablet' ? 3.15 : 3.36
      const inset = kind === 'phone' ? .085 : .12
      const material = await texture(image, (width - inset * 2) / (height - inset * 2), index)
      if (!material) return group
      const corner = kind === 'phone' ? .19 : kind === 'tablet' ? .13 : .085
      const body = plate(group, [width, height, .23], [0, 0, -.015], silver, corner)
      plate(group, [width - .025, height - .025, .065], [0, 0, .09], edge, corner * .95)
      const geometry = new T.PlaneGeometry(width - inset * 2, height - inset * 2); resources.push(geometry)
      const display = new T.Mesh(geometry, material); display.position.z = .126; group.add(display)
      if (kind === 'laptop') {
        const floor = -height / 2
        box(group, [width + .3, .14, 1.75], [0, floor - .035, .73], silver, .055)
        box(group, [width - .4, .018, .87], [0, floor + .044, .47], keyboard, .035)
        box(group, [1.24, .018, .46], [0, floor + .044, 1.17], keyboard, .035)
        box(group, [1.19, .02, .41], [0, floor + .049, 1.17], silver, .03)
        box(group, [.83, .03, .035], [0, floor - .015, 1.605], edge, .012)
        const hingeGeometry = new T.CylinderGeometry(.07, .07, width - .4, 12); resources.push(hingeGeometry)
        const hinge = new T.Mesh(hingeGeometry, keyboard); hinge.rotation.z = Math.PI / 2; hinge.position.set(0, floor, .03); group.add(hinge)
        const keyGeometry = new RoundedBoxGeometry(.25, .026, .12, 1, .009)
        const keys = new T.InstancedMesh(keyGeometry, edge, 52), matrix = new T.Matrix4()
        for (let row = 0; row < 4; row++) for (let col = 0; col < 13; col++) keys.setMatrixAt(row * 13 + col, matrix.makeTranslation(-1.92 + col * .32, floor + .065, .22 + row * .16))
        group.add(keys); resources.push(keyGeometry, keys)
        for (const side of [-1, 1]) {
          box(group, [.025, .045, .23], [side * (width + .3) / 2, floor - .03, .38], edge, .008)
          box(group, [.025, .045, .14], [side * (width + .3) / 2, floor - .03, .76], edge, .008)
        }
      } else if (kind === 'phone') {
        box(group, [.32, .025, .025], [0, height / 2 - .052, .13], edge, .012)
        box(group, [.04, .39, .075], [width / 2 + .018, .46, -.02], silver, .015)
        for (let i = 0; i < 2; i++) box(group, [.04, .2, .075], [-width / 2 - .018, .63 - i * .28, -.02], silver, .012)
        box(group, [.27, .018, .07], [0, -height / 2 - .008, -.015], edge, .01)
        const lensGeometry = new T.SphereGeometry(.022, 8, 6); resources.push(lensGeometry)
        const lens = new T.Mesh(lensGeometry, keyboard); lens.position.set(-.23, height / 2 - .052, .127); group.add(lens)
      } else {
        box(group, [.04, .34, .07], [width / 2 + .016, .8, -.03], silver, .013)
        box(group, [.28, .04, .07], [.95, height / 2 + .012, -.03], silver, .013)
        box(group, [1.28, 1.42, .09], [0, -.98, -.495], keyboard, .055).rotation.x = .55
        box(group, [1.85, .075, .96], [0, -height / 2 - .055, -.4], silver, .045)
        const lensGeometry = new T.SphereGeometry(.023, 8, 6); resources.push(lensGeometry)
        const lens = new T.Mesh(lensGeometry, keyboard); lens.position.set(0, height / 2 - .054, .127); group.add(lens)
      }
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
    const reduced = reducedMotionPreference(), fine = matchMedia('(hover:hover) and (pointer:fine)')
    const rest = { x: spec.device === 'laptop' ? .1 : spec.device === 'tablet' ? .06 : -.08, y: spec.device === 'tablet' ? -.36 : -.3 }
    let currentX = reduced.matches ? -.11 : rest.x, currentY = reduced.matches ? -.18 : rest.y
    let targetX = currentX, targetY = currentY, drawn = 0, pinned = false
    let drag: { pointerId: number; x: number; y: number; rotationX: number; rotationY: number; moved: boolean } | null = null
    let suppressClick = false
    const canvas = surface.canvas
    canvas.dataset.deviceOwner = String(++sceneSequence); host.dataset.deviceOwner = canvas.dataset.deviceOwner
    canvas.className = 'device3d-canvas'; canvas.setAttribute('aria-hidden', 'true'); canvas.dataset.device3d = spec.device; canvas.dataset.texturedScreens = spec.mobile ? '2' : '1'
    canvas.dataset.physicalDetail = 'beveled-chassis'; canvas.dataset.interaction = 'hover-drag-keyboard'
    canvas.dataset.textureSourceSizes = bitmaps.map(source => `${source.naturalWidth}x${source.naturalHeight}`).join(',')
    host.append(canvas)
    function draw() {
      frame = 0; if (stopped || !alive() || !visible || document.hidden) return
      if (reduced.matches && !pinned) { targetX = -.11; targetY = -.18 }
      const speed = reduced.matches ? 1 : .2
      currentX += (targetX - currentX) * speed; currentY += (targetY - currentY) * speed
      stage.rotation.set(currentX, currentY, 0); if (!surface!.render(scene, camera)) return
      canvas.dataset.rendered3d = 'true'; canvas.dataset.rotation = `${currentX.toFixed(3)},${currentY.toFixed(3)}`
      host.dataset.deviceReady = 'true'
      if (++drawn < 45 && (Math.abs(targetX - currentX) > .001 || Math.abs(targetY - currentY) > .001)) frame = requestAnimationFrame(draw)

    }
    function render() { drawn = 0; if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw) }
    function resize() {
      const rect = host.getBoundingClientRect(); if (!rect.width || !rect.height) return
      surface!.resize(rect.width, rect.height); camera.aspect = rect.width / rect.height
      const size = bounds.getSize(new T.Vector3()), tangent = Math.tan(T.MathUtils.degToRad(camera.fov / 2))
      camera.position.set(0, .1, Math.max(size.y / (2 * tangent), size.x / (2 * tangent * camera.aspect)) * 1.18 + size.z)
      camera.lookAt(0, 0, 0); camera.updateProjectionMatrix(); render()
    }
    const pointerSurface = host.closest('a') || host
    const originalTabIndex = host.getAttribute('tabindex')
    const originalShortcuts = pointerSurface.getAttribute('aria-keyshortcuts')
    const originalDescription = pointerSurface.getAttribute('aria-describedby')
    if (pointerSurface === host) host.tabIndex = 0
    pointerSurface.setAttribute('aria-keyshortcuts', 'ArrowLeft ArrowRight ArrowUp ArrowDown Home Escape')
    if (pointerSurface !== host && host.getAttribute('aria-describedby')) pointerSurface.setAttribute('aria-describedby', [originalDescription, host.getAttribute('aria-describedby')].filter(Boolean).join(' '))
    function constrain() { targetX = T.MathUtils.clamp(targetX, -.65, .38); targetY = T.MathUtils.clamp(targetY, -.85, .55) }
    function pointer(event: PointerEvent) {
      if (!visible || event.pointerType === 'touch') return
      if (drag && event.pointerId === drag.pointerId) {
        const dx = event.clientX - drag.x, dy = event.clientY - drag.y
        if (!drag.moved && Math.hypot(dx, dy) < 6) return
        if (!drag.moved) {
          drag.moved = true; pinned = true; suppressClick = true; host.dataset.deviceDragging = 'true'
          try { pointerSurface.setPointerCapture(event.pointerId) } catch { /* The browser may cancel a pointer during a navigation. */ }
        }
        event.preventDefault()
        targetY = drag.rotationY + dx * .006
        targetX = drag.rotationX + dy * .004
        constrain(); render(); return
      }
      if (!fine.matches || reduced.matches || pinned) return
      const rect = host.getBoundingClientRect()
      targetY = rest.y + ((event.clientX - rect.left) / rect.width - .5) * .3
      targetX = rest.x + ((event.clientY - rect.top) / rect.height - .5) * .16
      constrain(); render()
    }
    function pointerDown(event: PointerEvent) {
      if (!visible || event.button !== 0 || event.pointerType === 'touch' || event.altKey || event.ctrlKey || event.metaKey) return
      suppressClick = false
      drag = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, rotationX: currentX, rotationY: currentY, moved: false }
    }
    function pointerUp(event?: PointerEvent) {
      if (!drag || event && event.pointerId !== drag.pointerId) return
      if (pointerSurface.hasPointerCapture(drag.pointerId)) pointerSurface.releasePointerCapture(drag.pointerId)
      drag = null; delete host.dataset.deviceDragging
    }
    function cancelPointer() { pointerUp(); suppressClick = false }
    function click(event: MouseEvent) {
      if (!suppressClick || event.detail === 0) return
      suppressClick = false; event.preventDefault(); event.stopImmediatePropagation()
    }
    function preventNativeDrag(event: DragEvent) { event.preventDefault() }
    function reset() { pinned = false; targetX = reduced.matches ? -.11 : rest.x; targetY = reduced.matches ? -.18 : rest.y; render() }
    function pointerLeave() { if (!drag && !pinned) reset() }
    function handleKey(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'Escape'].includes(event.key)) return
      event.preventDefault(); event.stopPropagation()
      if (event.key === 'Home' || event.key === 'Escape') { reset(); return }
      pinned = true
      if (event.key === 'ArrowLeft') targetY -= .1
      if (event.key === 'ArrowRight') targetY += .1
      if (event.key === 'ArrowUp') targetX -= .08
      if (event.key === 'ArrowDown') targetX += .08
      constrain(); render()
    }
    function scroll() {
      if (!visible || !fine.matches || reduced.matches || drag || pinned) return
      const rect = host.getBoundingClientRect()
      targetX = rest.x + Math.max(-1, Math.min(1, (innerHeight / 2 - rect.top - rect.height / 2) / innerHeight)) * .07; render()
    }
    function visibility() { if (document.hidden) { cancelPointer(); cancelAnimationFrame(frame); frame = 0 } else render() }
    const observer = new ResizeObserver(resize); observer.observe(host)
    pointerSurface.addEventListener('pointerdown', pointerDown as EventListener)
    pointerSurface.addEventListener('pointermove', pointer as EventListener)
    pointerSurface.addEventListener('pointerup', pointerUp as EventListener)
    pointerSurface.addEventListener('pointercancel', cancelPointer)
    pointerSurface.addEventListener('lostpointercapture', pointerUp as EventListener)
    pointerSurface.addEventListener('pointerleave', pointerLeave)
    pointerSurface.addEventListener('click', click as EventListener, true)
    pointerSurface.addEventListener('dragstart', preventNativeDrag as EventListener)
    pointerSurface.addEventListener('keydown', handleKey as EventListener)
    window.addEventListener('scroll', scroll, { passive: true }); document.addEventListener('visibilitychange', visibility)
    reduced.addEventListener('change', reset)
    cleanups.push(() => {
      observer.disconnect(); cancelPointer()
      pointerSurface.removeEventListener('pointerdown', pointerDown as EventListener)
      pointerSurface.removeEventListener('pointermove', pointer as EventListener)
      pointerSurface.removeEventListener('pointerup', pointerUp as EventListener)
      pointerSurface.removeEventListener('pointercancel', cancelPointer)
      pointerSurface.removeEventListener('lostpointercapture', pointerUp as EventListener)
      pointerSurface.removeEventListener('pointerleave', pointerLeave)
      pointerSurface.removeEventListener('click', click as EventListener, true)
      pointerSurface.removeEventListener('dragstart', preventNativeDrag as EventListener)
      pointerSurface.removeEventListener('keydown', handleKey as EventListener)
      window.removeEventListener('scroll', scroll); document.removeEventListener('visibilitychange', visibility); reduced.removeEventListener('change', reset)
      if (originalTabIndex === null) host.removeAttribute('tabindex'); else host.setAttribute('tabindex', originalTabIndex)
      if (originalShortcuts === null) pointerSurface.removeAttribute('aria-keyshortcuts'); else pointerSurface.setAttribute('aria-keyshortcuts', originalShortcuts)
      if (pointerSurface !== host) { if (originalDescription === null) pointerSurface.removeAttribute('aria-describedby'); else pointerSurface.setAttribute('aria-describedby', originalDescription) }
    })
    surface.onRestore(render)
    resize()
    return { dispose: cleanup, setVisible(value) { visible = value; if (value) render(); else { cancelPointer(); cancelAnimationFrame(frame); frame = 0 } } }
  } catch (error) {
    cleanup()
    throw error
  }
}
