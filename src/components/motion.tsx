'use client'
import { useEffect, useState } from 'react'

export function HeroEnhancement() {
  const [intro, setIntro] = useState(false)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wide = window.matchMedia('(min-width: 901px)')
    let timeout: ReturnType<typeof setTimeout>
    let introFrame = 0
    try {
      if (!sessionStorage.getItem('wasla-visited') && !reduce.matches && wide.matches) {
        sessionStorage.setItem('wasla-visited', '1'); introFrame = requestAnimationFrame(() => setIntro(true))
        document.documentElement.classList.add('wasla-intro')
        timeout = setTimeout(() => { setIntro(false); document.documentElement.classList.remove('wasla-intro') }, 900)
      }
    } catch { /* Enhancement is optional when storage is unavailable. */ }
    let frame = 0
    const art = document.querySelector<HTMLElement>('[data-hero-art]')
    const draw = () => { frame = 0; if (art) art.style.setProperty('--parallax', reduce.matches || !wide.matches ? '0px' : `${Math.min(window.scrollY * .035, 22)}px`) }
    const scroll = () => { if (!frame) frame = requestAnimationFrame(draw) }
    window.addEventListener('scroll', scroll, { passive: true }); reduce.addEventListener('change', draw); wide.addEventListener('change', draw)
    return () => { clearTimeout(timeout); cancelAnimationFrame(introFrame); cancelAnimationFrame(frame); window.removeEventListener('scroll', scroll); reduce.removeEventListener('change', draw); wide.removeEventListener('change', draw); document.documentElement.classList.remove('wasla-intro') }
  }, [])
  return intro ? <button className="skip-intro" onClick={() => { setIntro(false); document.documentElement.classList.remove('wasla-intro') }}>Lewati animasi</button> : null
}
