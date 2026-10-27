'use client'
import { useEffect, useRef, useState } from 'react'
import { Translation, useLocale } from './locale-provider'
import { translate } from '@/shared/i18n'
import { getServiceVisual, serviceVisualLabels, serviceVisualPaths, type ServiceVisual } from '@/frontend/lib/service-visual'

const legacyVisuals: ServiceVisual[] = ['website', 'infrastructure', 'design', 'consultation', 'integration']
export function ServiceScene({ service, variant = 0, dark = false }: { service?: string; variant?: number; dark?: boolean }) {
  const locale = useLocale()
  const visual = service ? getServiceVisual(service) : legacyVisuals[Math.abs(variant) % legacyVisuals.length]
  const host = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false), [interactive, setInteractive] = useState(false)
  const active = useRef(false)
  useEffect(() => { active.current = interactive }, [interactive])
  useEffect(() => {
    if (!host.current) return
    const element: HTMLDivElement = host.current
    let cancelled = false, visible = false, creating = false, generation = 0, teardown: (() => void) | undefined, resume: (() => void) | undefined
    async function create() {
      if (creating || teardown || cancelled) return
      creating = true
      const current = ++generation
      let abortCreate: (() => void) | undefined
      try {
        const [T, { RoundedBoxGeometry }, { createSceneSurface, reducedMotionPreference }] = await Promise.all([import('three'), import('three/addons/geometries/RoundedBoxGeometry.js'), import('../lib/scene-surface')])
        if (cancelled || current !== generation) return
        const surface = createSceneSurface()
        const scene = new T.Scene(), camera = new T.PerspectiveCamera(34, 1, .1, 40)
        camera.position.set(0, .35, 8); camera.lookAt(0, 0, 0)
        const model = new T.Group(); scene.add(model)
        abortCreate = () => { scene.traverse(object => { if (object instanceof T.Mesh) { object.geometry.dispose(); const materials = Array.isArray(object.material) ? object.material : [object.material]; materials.forEach(material => material.dispose()) } }); surface.dispose(); delete element.dataset.ready }
        const ivory = new T.MeshStandardMaterial({ color: '#edf1f4', roughness: .27, metalness: .3 }), navy = new T.MeshStandardMaterial({ color: '#0b2545', roughness: .26, metalness: .42 }), blue = new T.MeshStandardMaterial({ color: '#9fbdd9', roughness: .3, metalness: .25 }), silver = new T.MeshStandardMaterial({ color: '#a9b9c9', roughness: .3, metalness: .5 })
        const light = new T.DirectionalLight('#ffffff', 4); light.position.set(-3, 5, 5); scene.add(light); scene.add(new T.HemisphereLight('#ffffff', '#60758a', 2.4))
        const rim = new T.DirectionalLight('#b9d4f4', 3); rim.position.set(4, 1, -2); scene.add(rim)
        function box(parent: import('three').Group, size: [number, number, number], position: [number, number, number], material = ivory, radius = .08) {
          const mesh = new T.Mesh(new RoundedBoxGeometry(...size, 2, radius), material); mesh.position.set(...position); parent.add(mesh); return mesh
        }
        function ball(parent: import('three').Group, radius: number, position: [number, number, number], material = blue) { const mesh = new T.Mesh(new T.SphereGeometry(radius, 24, 16), material); mesh.position.set(...position); parent.add(mesh); return mesh }
        function cylinder(parent: import('three').Group, radius: number, depth: number, position: [number, number, number], material = ivory, facing = false) {
          const mesh = new T.Mesh(new T.CylinderGeometry(radius, radius, depth, 40), material)
          if (facing) mesh.rotation.x = Math.PI / 2
          mesh.position.set(...position); parent.add(mesh); return mesh
        }
        function ring(parent: import('three').Group, radius: number, tube: number, position: [number, number, number], material = silver) {
          const mesh = new T.Mesh(new T.TorusGeometry(radius, tube, 12, 48), material); mesh.position.set(...position); parent.add(mesh); return mesh
        }
        function cable(a: [number, number, number], b: [number, number, number], material = silver, thickness = .04) {
          const start = new T.Vector3(...a), end = new T.Vector3(...b)
          const mesh = new T.Mesh(new T.CylinderGeometry(thickness, thickness, start.distanceTo(end), 10), material)
          mesh.position.copy(start.clone().add(end).multiplyScalar(.5)); mesh.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), end.clone().sub(start).normalize()); model.add(mesh)
        }
        function triangle(parent: import('three').Group, position: [number, number, number], size = .4, material = ivory) {
          const shape = new T.Shape(); shape.moveTo(-size * .6, -size); shape.lineTo(size, 0); shape.lineTo(-size * .6, size); shape.closePath()
          const mesh = new T.Mesh(new T.ExtrudeGeometry(shape, { depth: .06, bevelEnabled: true, bevelSegments: 2, bevelSize: .02, bevelThickness: .02 }), material); mesh.position.set(...position); parent.add(mesh); return mesh
        }
        if (visual === 'website') {
          const browser = new T.Group(); model.add(browser); browser.position.set(.2, .15, 0)
          box(browser, [3.1, 2.05, .19], [0, 0, 0]); box(browser, [2.85, 1.7, .06], [0, -.04, .13], navy)
          for (let i = 0; i < 3; i++) ball(browser, .035, [-1.28 + i * .14, .89, .13], silver)
          box(browser, [1.3, .57, .08], [-.55, .36, .21], blue); box(browser, [.82, .13, .08], [.67, .5, .22]); box(browser, [.62, .08, .08], [.57, .25, .22], silver)
          for (let i = 0; i < 3; i++) box(browser, [.72, .5, .12], [-.88 + i * .88, -.45, .23], i === 1 ? blue : ivory)
          box(browser, [.55, .57, .16], [0, -1.28, -.15], silver); box(browser, [1.3, .13, .65], [0, -1.6, 0], ivory)
          const phone = new T.Group(); model.add(phone); phone.position.set(-1.36, -.38, .75); phone.rotation.z = -.1
          box(phone, [.8, 1.58, .16], [0, 0, 0], navy, .12); box(phone, [.66, 1.38, .05], [0, 0, .1], ivory, .09); box(phone, [.51, .45, .04], [0, .27, .14], blue); box(phone, [.44, .07, .04], [0, -.12, .14], navy); box(phone, [.35, .07, .04], [-.04, -.3, .14], silver)
        } else if (visual === 'infrastructure') {
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
        } else if (visual === 'design') {
          const boards = new T.Group(); model.add(boards); boards.rotation.z = -.05
          box(boards, [2.5, 2.2, .13], [.05, 0, 0]); box(boards, [1.85, 1.65, .12], [.75, -.15, .45], navy)
          box(boards, [1.45, .22, .1], [.75, .35, .56], blue)
          for (let j = 0; j < 2; j++) box(boards, [.55, .52, .16], [.4 + j * .7, -.3, .58], ivory)
          const ring = new T.Mesh(new T.TorusGeometry(.45, .11, 16, 48), silver); ring.position.set(-1, .4, .5); ring.rotation.y = .35; model.add(ring)
          ball(model, .3, [-.95, -.75, .5], blue)
        } else if (visual === 'application') {
          box(model, [3.05, 2.08, .2], [0, .1, 0], navy); box(model, [2.8, 1.82, .05], [0, .1, .13])
          box(model, [.48, 1.65, .05], [-1.08, .1, .2], navy)
          for (let i = 0; i < 4; i++) box(model, [.27, .05, .04], [-1.08, .65 - i * .29, .25], i === 1 ? ivory : blue, .01)
          for (let i = 0; i < 3; i++) { box(model, [.5, 1.15, .05], [-.35 + i * .63, -.02, .2], silver); for (let j = 0; j <= i; j++) box(model, [.39, .2, .06], [-.35 + i * .63, .36 - j * .32, .26], i === 1 ? blue : ivory) }
          box(model, [3.4, .14, 1.45], [0, -1.01, .48], silver); box(model, [.78, .035, .35], [0, -.92, .87], navy)
        } else if (visual === 'software') {
          const modules: [number, number, number][] = [[-1.04, .65, 0], [1.04, .65, 0], [0, -.85, .2]]
          modules.forEach((p, i) => { const unit = new T.Group(); model.add(unit); unit.position.set(...p); box(unit, [1.16, .95, .68], [0, 0, 0], i === 1 ? blue : navy); box(unit, [.77, .08, .05], [0, .18, .38]); box(unit, [.5, .07, .05], [-.13, -.05, .38], silver); box(unit, [.3, .07, .05], [-.23, -.25, .38], silver) })
          cable(modules[0], modules[1]); cable(modules[0], modules[2]); cable(modules[1], modules[2]); ball(model, .13, [0, .65, 0], blue)
        } else if (visual === 'commerce') {
          box(model, [1.65, 1.78, .6], [-.6, -.15, .1], navy, .12)
          const handle = ring(model, .43, .065, [-.6, .78, .14]); handle.scale.y = 1.15
          box(model, [.65, .82, .08], [-.6, -.18, .45], ivory); box(model, [.38, .05, .04], [-.6, -.2, .51], blue)
          const payment = new T.Group(); model.add(payment); payment.position.set(.85, -.43, .82); payment.rotation.z = -.12
          box(payment, [1.42, .9, .12], [0, 0, 0], ivory); box(payment, [1.25, .15, .04], [0, .16, .09], navy); box(payment, [.26, .18, .04], [-.4, -.13, .09], silver)
          const product = new T.Group(); model.add(product); product.position.set(1, .82, -.1); product.rotation.z = .1
          box(product, [.95, 1.1, .12], [0, 0, 0], ivory); ball(product, .25, [0, .12, .15], blue); box(product, [.55, .07, .05], [0, -.32, .12], navy)
        } else if (visual === 'consultation') {
          box(model, [2.6, 1.85, .15], [-.2, .27, 0], ivory)
          box(model, [1.75, .14, .07], [-.2, .86, .12], navy)
          for (let i = 0; i < 3; i++) { box(model, [.32, .35 + i * .25, .08], [-.85 + i * .63, -.28 + i * .125, .14], i === 2 ? navy : blue) }
          cable([-.8, -.72, 0], [-1.16, -1.45, 0]); cable([.5, -.72, 0], [.86, -1.45, 0])
          const bubble = new T.Group(); model.add(bubble); bubble.position.set(1.03, -.55, .6)
          box(bubble, [1.2, .75, .22], [0, 0, 0], navy, .15); const tail = box(bubble, [.24, .24, .12], [-.3, -.38, 0], navy, .02); tail.rotation.z = .5
          for (let i = 0; i < 3; i++) ball(bubble, .06, [-.27 + i * .27, 0, .16], ivory)
        } else if (visual === 'maintenance') {
          box(model, [2.12, 1.55, .32], [-.28, .15, 0], ivory); box(model, [1.85, 1.28, .08], [-.28, .15, .21], navy)
          const cog = new T.Group(); model.add(cog); cog.position.set(-.28, .15, .32)
          ring(cog, .37, .12, [0, 0, 0], silver)
          for (let i = 0; i < 8; i++) { const angle = i * Math.PI / 4; const tooth = box(cog, [.18, .25, .17], [Math.sin(angle) * .49, Math.cos(angle) * .49, 0], silver, .02); tooth.rotation.z = -angle }
          const tool = new T.Group(); model.add(tool); tool.position.set(1.03, -.25, .7); tool.rotation.z = -.48
          box(tool, [.2, 1.45, .17], [0, -.18, 0], navy); ring(tool, .29, .12, [0, .62, 0]); cylinder(tool, .2, .18, [0, -.96, 0], silver, true)
          box(model, [1.3, .14, .63], [-.28, -.9, .03], silver)
        } else if (visual === 'integration') {
          box(model, [1.05, 1.05, .75], [0, 0, 0], navy); ring(model, .27, .055, [0, 0, .43], ivory)
          const nodes: [number, number, number][] = [[-1.37, .85, 0], [1.37, .85, 0], [-1.37, -.85, 0], [1.37, -.85, 0]]
          nodes.forEach((p, i) => { cable([0, 0, 0], p, silver, .055); box(model, [.72, .66, .43], p, i % 2 ? blue : ivory); box(model, [.38, .1, .05], [p[0], p[1], p[2] + .25], navy) })
        } else if (visual === 'database') {
          for (let i = 0; i < 3; i++) { const y = -.77 + i * .74; cylinder(model, 1.03, .53, [0, y, 0], i === 1 ? navy : ivory); const lip = ring(model, 1.015, .035, [0, y + .265, 0]); lip.rotation.x = Math.PI / 2; ball(model, .045, [-.34, y, .99], blue); ball(model, .045, [-.13, y, 1.03], blue) }
          const record = new T.Group(); model.add(record); record.position.set(1.15, -.65, .92); record.rotation.z = -.12
          box(record, [.82, 1.02, .12], [0, 0, 0], blue); for (let i = 0; i < 3; i++) box(record, [.5, .065, .04], [0, .26 - i * .23, .1], navy)
        } else if (visual === 'photography') {
          box(model, [2.48, 1.52, .82], [0, -.03, 0], navy, .18)
          box(model, [.85, .27, .61], [-.24, .83, -.02], navy)
          box(model, [.46, 1.32, .96], [1.04, -.03, .06], silver, .12)
          cylinder(model, .7, .49, [-.28, -.04, .58], silver, true)
          cylinder(model, .58, .47, [-.28, -.04, .95], navy, true)
          ring(model, .49, .055, [-.28, -.04, 1.2], silver)
          cylinder(model, .43, .04, [-.28, -.04, 1.23], blue, true)
          cylinder(model, .27, .045, [-.28, -.04, 1.26], navy, true)
          cylinder(model, .13, .07, [.86, .83, 0], navy)
          box(model, [.35, .14, .045], [-.84, .46, .44], ivory, .02)
          ball(model, .07, [.1, -.12, 1.3], ivory)
        } else if (visual === 'video') {
          box(model, [3.05, 2.02, .17], [0, .2, 0], ivory); box(model, [2.8, 1.76, .06], [0, .2, .12], navy)
          box(model, [1.8, .85, .04], [.2, .5, .18], blue); triangle(model, [.22, .5, .23], .24)
          box(model, [.3, .85, .04], [-1.13, .5, .18], silver)
          for (let i = 0; i < 3; i++) { box(model, [2.25 - i * .26, .12, .05], [-.07 - i * .1, -.18 - i * .19, .2], i === 1 ? blue : silver) }
          box(model, [.035, .72, .07], [.57, -.3, .28], ivory, .01)
          box(model, [.45, .4, .15], [0, -1.02, -.03], silver); box(model, [1.35, .12, .65], [0, -1.28, 0], ivory)
          const slate = new T.Group(); model.add(slate); slate.position.set(-1.12, -.86, .9); slate.rotation.z = -.13
          box(slate, [1.05, .67, .13], [0, 0, 0], navy); box(slate, [1.05, .18, .15], [0, .43, 0], silver)
          for (let i = 0; i < 4; i++) { const mark = box(slate, [.1, .17, .025], [-.35 + i * .23, .43, .1], ivory, .01); mark.rotation.z = -.4 }
        } else if (visual === 'creative') {
          const artboard = new T.Group(); model.add(artboard); artboard.rotation.z = .08
          box(artboard, [2.15, 2.4, .14], [-.2, .05, 0], ivory); box(artboard, [1.66, 1.6, .06], [-.2, .19, .11], blue)
          ball(artboard, .24, [-.65, .62, .19], ivory); const artwork = box(artboard, [.9, .9, .09], [-.03, -.1, .2], navy); artwork.rotation.z = Math.PI / 4
          for (let i = 0; i < 4; i++) cylinder(artboard, .11, .05, [-.73 + i * .36, -.91, .15], [navy, blue, silver, ivory][i], true)
          const pen = new T.Group(); model.add(pen); pen.position.set(1.14, -.04, .72); pen.rotation.z = -.43
          cylinder(pen, .12, 1.88, [0, 0, 0], navy); cylinder(pen, .125, .26, [0, .64, 0], silver)
          const tip = new T.Mesh(new T.ConeGeometry(.12, .37, 24), silver); tip.rotation.z = Math.PI; tip.position.y = -1.12; pen.add(tip)
        }
        const canvas = surface.canvas; canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', `${translate(serviceVisualLabels[visual], locale)}. ${locale === 'en' ? 'Use the arrow keys to rotate when this area is focused.' : 'Gunakan tombol panah untuk memutar saat area ini difokuskan.'}`); canvas.tabIndex = 0; canvas.dataset.serviceVisual = visual; element.appendChild(canvas)
        const reduce = reducedMotionPreference(), fine = window.matchMedia('(hover:hover) and (pointer:fine)')
        let frame = 0, rotationX = -.1, rotationY = -.35, targetX = rotationX, targetY = rotationY, drag: { x: number; y: number } | null = null, frames = 0
        function draw() {
          frame = 0; if (cancelled || !visible || document.hidden) return
          rotationX += (targetX - rotationX) * (reduce.matches ? 1 : .15); rotationY += (targetY - rotationY) * (reduce.matches ? 1 : .15)
          model.rotation.set(rotationX, rotationY, 0); if (!surface.render(scene, camera, 1.3)) return; canvas.dataset.rendered3d = 'true'; canvas.dataset.rotation = `${rotationX.toFixed(3)},${rotationY.toFixed(3)}`; element.dataset.ready = 'true'
          if (++frames < 45 && (Math.abs(targetX - rotationX) > .001 || Math.abs(targetY - rotationY) > .001)) frame = requestAnimationFrame(draw)
        }
        function render() { frames = 0; if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw) }
        function resize() { const rect = element.getBoundingClientRect(); surface.resize(rect.width, rect.height); camera.aspect = rect.width / rect.height; camera.position.z = camera.aspect < .95 ? 9.3 : 8; camera.updateProjectionMatrix(); render() }
        function scroll() { if (!visible || reduce.matches || drag) return; const rect = element.getBoundingClientRect(); const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - rect.top - rect.height / 2) / innerHeight)); targetX = -.1 + progress * .25; model.position.y = progress * .16; render() }
        function pointerdown(event: PointerEvent) { if (!fine.matches && !active.current) return; drag = { x: event.clientX, y: event.clientY }; canvas.setPointerCapture(event.pointerId); canvas.focus({ preventScroll: true }) }
        function pointermove(event: PointerEvent) {
          if (drag) { targetY = Math.max(-.9, Math.min(.65, targetY + (event.clientX - drag.x) * .008)); targetX = Math.max(-.7, Math.min(.7, targetX + (event.clientY - drag.y) * .008)); drag = { x: event.clientX, y: event.clientY }; render() }
          else if (fine.matches && !reduce.matches) { const rect = canvas.getBoundingClientRect(); targetY = -.35 + ((event.clientX - rect.left) / rect.width - .5) * .3; render() }
        }
        function pointerup() { drag = null }
        function key(event: KeyboardEvent) { if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(event.key)) return; event.preventDefault(); if (event.key === 'Home') { targetX = -.1; targetY = -.35 } else if (event.key === 'ArrowLeft') targetY -= .15; else if (event.key === 'ArrowRight') targetY += .15; else if (event.key === 'ArrowUp') targetX -= .12; else targetX += .12; targetX = Math.max(-.6, Math.min(.6, targetX)); targetY = Math.max(-.9, Math.min(.65, targetY)); render() }
        function visibilityChange() { if (document.hidden) { cancelAnimationFrame(frame); frame = 0 } else render() }
        resume = () => { if (visible) resize(); else { cancelAnimationFrame(frame); frame = 0 } }
        surface.onRestore(render)
        document.addEventListener('visibilitychange', visibilityChange)
        const observer = new ResizeObserver(resize); observer.observe(element); resize()
        canvas.addEventListener('pointerdown', pointerdown); canvas.addEventListener('pointermove', pointermove); canvas.addEventListener('pointerup', pointerup); canvas.addEventListener('pointercancel', pointerup); canvas.addEventListener('keydown', key); window.addEventListener('scroll', scroll, { passive: true })
        teardown = () => { document.removeEventListener('visibilitychange', visibilityChange); cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', scroll); canvas.removeEventListener('pointerdown', pointerdown); canvas.removeEventListener('pointermove', pointermove); canvas.removeEventListener('pointerup', pointerup); canvas.removeEventListener('pointercancel', pointerup); canvas.removeEventListener('keydown', key); scene.traverse(object => { if (object instanceof T.Mesh) { object.geometry.dispose(); const materials = Array.isArray(object.material) ? object.material : [object.material]; materials.forEach(m => m.dispose()) } }); surface.dispose(); delete element.dataset.ready }
        abortCreate = undefined
      } catch { abortCreate?.(); if (!cancelled && current === generation) setFailed(true) }
      finally { creating = false }
    }
    const visibility = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting
      if (visible && !teardown) void create()
      resume?.()
    }, { rootMargin: '120px' })
    visibility.observe(element)
    return () => { cancelled = true; generation++; visibility.disconnect(); teardown?.() }
  }, [visual, locale])
  return <Translation><div className={`service-scene ${dark ? 'scene-dark' : ''} ${interactive ? 'scene-interactive' : ''}`}><div className="service-scene-viewport" ref={host}><svg className="service-scene-fallback" viewBox="0 0 32 32" role="img" aria-label={serviceVisualLabels[visual]} style={{ color: dark ? '#c5d0dd' : '#173b63', padding: '18%' }}><path d={serviceVisualPaths[visual]} transform="translate(4 4)" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg></div>{!failed && <div className="service-scene-tools"><span>Objek 3D · geser untuk memutar</span><button type="button" className="scene-touch-control" onClick={() => setInteractive(v => !v)} aria-pressed={interactive}>{interactive ? 'Selesai memutar' : 'Putar objek'}</button></div>}</div></Translation>
}
