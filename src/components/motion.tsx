'use client'
import { useEffect, useState } from 'react'

export function HeroEnhancement() {
  const [intro, setIntro] = useState(false)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wide = window.matchMedia('(min-width: 901px)')
    const art = document.querySelector<HTMLElement>('[data-hero-art]')
    const feature = document.querySelector<HTMLElement>('[data-parallax-feature]')
    const reveals = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    let timeout: ReturnType<typeof setTimeout>
    let introFrame = 0
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
      const enabled = !reduce.matches && wide.matches
      art?.style.setProperty('--parallax', enabled ? `${Math.min(window.scrollY * .12, 72)}px` : '0px')
      if (feature) {
        const rect = feature.getBoundingClientRect()
        const shift = enabled ? Math.max(-28, Math.min(28, (innerHeight / 2 - rect.top - rect.height / 2) * .07)) : 0
        feature.style.setProperty('--feature-parallax', `${shift}px`)
      }
    }
    const scroll = () => { if (!frame) frame = requestAnimationFrame(draw) }
    const preference = () => { setupReveals(); draw() }
    try {
      if (!sessionStorage.getItem('wasla-agency-visited') && !reduce.matches && wide.matches) {
        sessionStorage.setItem('wasla-agency-visited', '1')
        introFrame = requestAnimationFrame(() => setIntro(true))
        document.documentElement.classList.add('wasla-intro')
        timeout = setTimeout(() => { setIntro(false); document.documentElement.classList.remove('wasla-intro') }, 900)
      }
    } catch { /* The content remains usable without browser storage. */ }
    setupReveals()
    draw()
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('resize', scroll, { passive: true })
    reduce.addEventListener('change', preference)
    wide.addEventListener('change', preference)
    return () => {
      clearTimeout(timeout); cancelAnimationFrame(introFrame); cancelAnimationFrame(frame)
      observer?.disconnect(); showAll()
      window.removeEventListener('scroll', scroll); window.removeEventListener('resize', scroll)
      reduce.removeEventListener('change', preference); wide.removeEventListener('change', preference)
      document.documentElement.classList.remove('wasla-intro')
    }
  }, [])
  return intro ? <button className="skip-intro" onClick={() => { setIntro(false); document.documentElement.classList.remove('wasla-intro') }}>Lewati animasi</button> : null
}
