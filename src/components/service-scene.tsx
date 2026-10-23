'use client'
import { useEffect, useRef, useState } from 'react'
export function ServiceScene({ variant = 0, dark = false }: { variant?: number; dark?: boolean }) {
  const host = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false), [interactive, setInteractive] = useState(false)
  const active = useRef(false)
  useEffect(() => { active.current = interactive }, [interactive])
  useEffect(() => {
    if (!host.current) return
    const element: HTMLDivElement = host.current
    let cancelled = false, generation = 0, teardown: (() => void) | undefined
    async function create() {
      const current = ++generation
      try {
        const [T, { RoundedBoxGeometry }, { RoomEnvironment }] = await Promise.all([import('three'), import('three/addons/geometries/RoundedBoxGeometry.js'), import('three/addons/environments/RoomEnvironment.js')])
        if (cancelled || current !== generation) return
        const renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); renderer.setClearColor(0, 0)
        renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap
        renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.3
        const scene = new T.Scene(), camera = new T.PerspectiveCamera(34, 1, .1, 40)
        camera.position.set(0, .35, 8); camera.lookAt(0, 0, 0)
        const pmrem = new T.PMREMGenerator(renderer), room = new RoomEnvironment()
        const environment = pmrem.fromScene(room, .04); scene.environment = environment.texture; room.dispose(); pmrem.dispose()
        const model = new T.Group(); scene.add(model)
        const ivory = new T.MeshStandardMaterial({ color: '#edf1f4', roughness: .27, metalness: .3 }), navy = new T.MeshStandardMaterial({ color: '#0b2545', roughness: .26, metalness: .42 }), blue = new T.MeshStandardMaterial({ color: '#9fbdd9', roughness: .3, metalness: .25 }), silver = new T.MeshStandardMaterial({ color: '#a9b9c9', roughness: .2, metalness: .75 })
        const light = new T.DirectionalLight('#ffffff', 4); light.position.set(-3, 5, 5); light.castShadow = true; light.shadow.mapSize.set(512, 512); scene.add(light); scene.add(new T.AmbientLight('#b9cce0', .8))
        const rim = new T.DirectionalLight('#b9d4f4', 3); rim.position.set(4, 1, -2); scene.add(rim)
        function box(parent: import('three').Group, size: [number, number, number], position: [number, number, number], material = ivory, radius = .08) {
          const mesh = new T.Mesh(new RoundedBoxGeometry(...size, 3, radius), material); mesh.position.set(...position); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh
        }
        function ball(parent: import('three').Group, radius: number, position: [number, number, number], material = blue) { const mesh = new T.Mesh(new T.SphereGeometry(radius, 24, 16), material); mesh.position.set(...position); mesh.castShadow = true; parent.add(mesh); return mesh }
        const type = variant % 5
        if (type === 0) {
          const browser = new T.Group(); model.add(browser); browser.position.set(.2, .15, 0)
          box(browser, [3.1, 2.05, .19], [0, 0, 0]); box(browser, [2.85, 1.7, .06], [0, -.04, .13], navy)
          for (let i = 0; i < 3; i++) ball(browser, .035, [-1.28 + i * .14, .89, .13], silver)
          box(browser, [1.3, .57, .08], [-.55, .36, .21], blue); box(browser, [.82, .13, .08], [.67, .5, .22]); box(browser, [.62, .08, .08], [.57, .25, .22], silver)
          for (let i = 0; i < 3; i++) box(browser, [.72, .5, .12], [-.88 + i * .88, -.45, .23], i === 1 ? blue : ivory)
          box(browser, [.55, .57, .16], [0, -1.28, -.15], silver); box(browser, [1.3, .13, .65], [0, -1.6, 0], ivory)
          const phone = new T.Group(); model.add(phone); phone.position.set(-1.36, -.38, .75); phone.rotation.z = -.1
          box(phone, [.8, 1.58, .16], [0, 0, 0], navy, .12); box(phone, [.66, 1.38, .05], [0, 0, .1], ivory, .09); box(phone, [.51, .45, .04], [0, .27, .14], blue); box(phone, [.44, .07, .04], [0, -.12, .14], navy); box(phone, [.35, .07, .04], [-.04, -.3, .14], silver)
        } else if (type === 1 || type === 4) {
          for (let i = 0; i < 3; i++) {
            const server = new T.Group(); model.add(server); server.position.set(0, -.9 + i * .78, 0)
            box(server, [2.45, .58, 1.35], [0, 0, 0]); box(server, [1.92, .34, .06], [0, 0, .7], navy)
            for (let j = 0; j < 4; j++) box(server, [.08, .05, .03], [-.65 + j * .16, 0, .75], blue, .01)
            ball(server, .07, [.7, 0, .75], silver)
          }
          const tube = new T.CatmullRomCurve3([new T.Vector3(1.12, -.9, .15), new T.Vector3(1.65, -.6, .1), new T.Vector3(1.65, .35, .1), new T.Vector3(1.1, .65, .15)])
          model.add(new T.Mesh(new T.TubeGeometry(tube, 40, .09, 12, false), silver))
          const board = new T.Group(); model.add(board); board.position.set(-.65, -1.37, 1.08); board.rotation.x = -.38
          box(board, [1.7, .9, .12], [0, 0, 0], navy); for (let j = 0; j < 3; j++) box(board, [.36, .46, .08], [-.5 + j * .5, 0, .1], j === 1 ? blue : ivory)
        } else if (type === 2) {
          const boards = new T.Group(); model.add(boards); boards.rotation.z = -.05
          box(boards, [2.5, 2.2, .13], [.05, 0, 0]); box(boards, [1.85, 1.65, .12], [.75, -.15, .45], navy)
          box(boards, [1.45, .22, .1], [.75, .35, .56], blue)
          for (let j = 0; j < 2; j++) box(boards, [.55, .52, .16], [.4 + j * .7, -.3, .58], ivory)
          const ring = new T.Mesh(new T.TorusGeometry(.45, .11, 16, 48), silver); ring.position.set(-1, .4, .5); ring.rotation.y = .35; model.add(ring)
          ball(model, .3, [-.95, -.75, .5], blue)
        } else {
          const tablet = new T.Group(); model.add(tablet); tablet.rotation.x = -.08
          box(tablet, [2.7, 1.95, .19], [0, 0, 0], navy); box(tablet, [2.4, 1.65, .06], [0, 0, .13], ivory)
          for (let j = 0; j < 4; j++) box(tablet, [.28, .35 + j * .18, .12], [-.8 + j * .52, -.4 + j * .09, .23], j === 3 ? navy : blue)
          ball(model, .45, [1.25, 1, .35], silver); box(model, [1.1, .58, .2], [-1.15, .75, .55], blue)
        }
        light.shadow.normalBias = .03; light.shadow.radius = 3
        const canvas = renderer.domElement; canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', 'Objek layanan 3D. Gunakan tombol panah untuk memutar saat area ini difokuskan.'); canvas.tabIndex = 0; canvas.dataset.rendered3d = 'true'; element.appendChild(canvas); element.dataset.ready = 'true'
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)'), fine = window.matchMedia('(hover:hover) and (pointer:fine)')
        let frame = 0, rotationX = -.1, rotationY = -.35, targetX = rotationX, targetY = rotationY, drag: { x: number; y: number } | null = null, frames = 0
        function draw() {
          frame = 0; if (cancelled) return
          rotationX += (targetX - rotationX) * (reduce.matches ? 1 : .15); rotationY += (targetY - rotationY) * (reduce.matches ? 1 : .15)
          model.rotation.set(rotationX, rotationY, 0); renderer.render(scene, camera)
          if (++frames < 70 && (Math.abs(targetX - rotationX) > .001 || Math.abs(targetY - rotationY) > .001)) frame = requestAnimationFrame(draw)
        }
        function render() { frames = 0; if (!frame) frame = requestAnimationFrame(draw) }
        function resize() { const rect = element.getBoundingClientRect(); renderer.setSize(rect.width, rect.height); camera.aspect = rect.width / rect.height; camera.position.z = camera.aspect < .95 ? 9.3 : 8; camera.updateProjectionMatrix(); render() }
        function scroll() { if (reduce.matches || !fine.matches || drag) return; const rect = element.getBoundingClientRect(); const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - rect.top - rect.height / 2) / innerHeight)); targetX = -.1 + progress * .25; model.position.y = progress * .16; render() }
        function pointerdown(event: PointerEvent) { if (!fine.matches && !active.current) return; drag = { x: event.clientX, y: event.clientY }; canvas.setPointerCapture(event.pointerId); canvas.focus({ preventScroll: true }) }
        function pointermove(event: PointerEvent) {
          if (drag) { targetY += (event.clientX - drag.x) * .012; targetX = Math.max(-.7, Math.min(.7, targetX + (event.clientY - drag.y) * .008)); drag = { x: event.clientX, y: event.clientY }; render() }
          else if (fine.matches && !reduce.matches) { const rect = canvas.getBoundingClientRect(); targetY = -.35 + ((event.clientX - rect.left) / rect.width - .5) * .3; render() }
        }
        function pointerup() { drag = null }
        function key(event: KeyboardEvent) { if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(event.key)) return; event.preventDefault(); if (event.key === 'Home') { targetX = -.1; targetY = -.35 } else if (event.key === 'ArrowLeft') targetY -= .15; else if (event.key === 'ArrowRight') targetY += .15; else if (event.key === 'ArrowUp') targetX -= .12; else targetX += .12; render() }
        const observer = new ResizeObserver(resize); observer.observe(element); resize()
        canvas.addEventListener('pointerdown', pointerdown); canvas.addEventListener('pointermove', pointermove); canvas.addEventListener('pointerup', pointerup); canvas.addEventListener('pointercancel', pointerup); canvas.addEventListener('keydown', key); window.addEventListener('scroll', scroll, { passive: true })
        teardown = () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', scroll); canvas.removeEventListener('pointerdown', pointerdown); canvas.removeEventListener('pointermove', pointermove); canvas.removeEventListener('pointerup', pointerup); canvas.removeEventListener('pointercancel', pointerup); canvas.removeEventListener('keydown', key); scene.traverse(object => { if (object instanceof T.Mesh) { object.geometry.dispose(); const materials = Array.isArray(object.material) ? object.material : [object.material]; materials.forEach(m => m.dispose()) } }); environment.dispose(); renderer.dispose(); renderer.forceContextLoss(); canvas.remove(); delete element.dataset.ready }
      } catch { if (!cancelled && current === generation) setFailed(true) }
    }
    const visibility = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { if (!teardown) void create() }
      else { generation++; teardown?.(); teardown = undefined }
    }, { rootMargin: '120px' })
    visibility.observe(element)
    return () => { cancelled = true; generation++; visibility.disconnect(); teardown?.() }
  }, [variant, dark])
  return <div className={`service-scene ${dark ? 'scene-dark' : ''} ${interactive ? 'scene-interactive' : ''}`}><div className="service-scene-viewport" ref={host}><img className="service-scene-fallback" src={`/images/services/${variant % 3 === 0 ? 'web' : variant % 3 === 1 ? 'app' : 'design'}-3d.webp`} alt="Ilustrasi layanan" loading="lazy"/></div>{!failed && <div className="service-scene-tools"><span>Objek 3D · geser untuk memutar</span><button type="button" className="scene-touch-control" onClick={() => setInteractive(v => !v)} aria-pressed={interactive}>{interactive ? 'Selesai memutar' : 'Putar objek'}</button></div>}</div>
}
