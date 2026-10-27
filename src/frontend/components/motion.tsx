'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function HeroEnhancement() {
  const pathname = usePathname()
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wide = window.matchMedia('(min-width: 901px)')
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const art = document.querySelector<HTMLElement>('[data-hero-art]')
    const feature = document.querySelector<HTMLElement>('[data-parallax-feature]')
    const reveals = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    const scenes = [...document.querySelectorAll<HTMLElement>('[data-art-scene]')]
    let pointer: { scene: HTMLElement; x: number; y: number } | null = null
    let frame = 0
    let observer: IntersectionObserver | undefined
    const showAll = () => reveals.forEach(el => { el.dataset.revealState = 'shown' })
    const setupReveals = () => {
      observer?.disconnect()
      if (reduce.matches || !wide.matches || !('IntersectionObserver' in window)) { showAll(); return }
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.revealState = 'shown'
          observer?.unobserve(entry.target)
        }
      }), { threshold: .08, rootMargin: '0px 0px -30px 0px' })
      reveals.forEach(el => {
        if (el.getBoundingClientRect().top > window.innerHeight + 40) {
          el.dataset.revealState = 'waiting'
          observer?.observe(el)
        } else el.dataset.revealState = 'shown'
      })
    }
    const draw = () => {
      frame = 0
      const enabled = !reduce.matches && wide.matches && fine.matches
      art?.style.setProperty('--parallax', enabled ? `${Math.min(window.scrollY * .12, 72)}px` : '0px')
      if (feature) {
        const rect = feature.getBoundingClientRect()
        const shift = enabled ? Math.max(-28, Math.min(28, (innerHeight / 2 - rect.top - rect.height / 2) * .07)) : 0
        feature.style.setProperty('--feature-parallax', `${shift}px`)
      }
      const measurements = scenes.map(scene => ({ scene, rect: scene.getBoundingClientRect() }))
      measurements.forEach(({ scene, rect }) => {
        const surface = scene.querySelector<HTMLElement>('[data-art-surface]')
        if (!surface) return
        const visible = rect.bottom > -100 && rect.top < innerHeight + 100
        const depth = Number(scene.dataset.depth || '.1')
        const shift = enabled && visible ? Math.max(-38, Math.min(38, (innerHeight / 2 - rect.top - rect.height / 2) * depth)) : 0
        const hovering = enabled && fine.matches && pointer?.scene === scene
        const x = hovering ? pointer!.x : 0
        const y = hovering ? pointer!.y : 0
        surface.style.setProperty('--scene-scroll', `${shift.toFixed(2)}px`)
        surface.style.setProperty('--scene-x', `${(x * 12).toFixed(2)}px`)
        surface.style.setProperty('--scene-y', `${(y * 9).toFixed(2)}px`)
        surface.style.setProperty('--scene-rx', `${(-y * 7).toFixed(2)}deg`)
        surface.style.setProperty('--scene-ry', `${(x * 9).toFixed(2)}deg`)
      })
    }
    const scroll = () => { if (!frame) frame = requestAnimationFrame(draw) }
    const preference = () => { setupReveals(); draw() }
    const move = (event: PointerEvent) => {
      const scene = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-art-scene]') : null
      if (!scene || event.pointerType === 'touch' || reduce.matches || !fine.matches || !wide.matches) { pointer = null; scroll(); return }
      const rect = scene.getBoundingClientRect()
      pointer = { scene, x: Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - .5) * 2)), y: Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - .5) * 2)) }
      scroll()
    }
    const leave = () => { pointer = null; scroll() }
    setupReveals()
    draw()
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('resize', scroll, { passive: true })
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    window.addEventListener('blur', leave)
    reduce.addEventListener('change', preference)
    wide.addEventListener('change', preference)
    fine.addEventListener('change', preference)
    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect(); showAll()
      window.removeEventListener('scroll', scroll); window.removeEventListener('resize', scroll)
      window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); window.removeEventListener('blur', leave)
      reduce.removeEventListener('change', preference); wide.removeEventListener('change', preference)
      fine.removeEventListener('change', preference)
      scenes.forEach(scene => scene.querySelector<HTMLElement>('[data-art-surface]')?.removeAttribute('style'))
      document.documentElement.classList.remove('wasla-intro')
    }
  }, [pathname])
  return null
}
