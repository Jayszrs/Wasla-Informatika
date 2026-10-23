'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'
import type { Navigation, SiteSetting } from '@/lib/content-types'
import { validPublicLink } from '@/lib/validation'
import { Arrow } from './icons'

export function NavigationBar({ navigation }: { settings: SiteSetting; navigation: Navigation }) {
  const pathname = usePathname()
  const menu = useRef<HTMLDetailsElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const onHome = pathname === '/'
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  const links = navigation.links?.filter(l => l.enabled && validPublicLink(l.href)).sort((a, b) => (a.order || 0) - (b.order || 0)) || []
  const close = () => { if (menu.current) menu.current.open = false }
  useEffect(() => {
    const reset = () => {
      if (menu.current) menu.current.open = false
      document.getElementById('main')?.removeAttribute('inert')
      document.querySelector('.site-footer')?.removeAttribute('inert')
    }
    reset()
    const resize = () => { if (window.innerWidth >= 992) reset() }
    window.addEventListener('resize', resize, { passive: true })
    return () => { window.removeEventListener('resize', resize); reset() }
  }, [pathname])

  return (
    <header className={`site-header ${onHome ? 'header-home' : 'header-inner-page'} ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-inner wrap">
        <Link className="brand" href="/" onClick={close} aria-label="Wasla Informatika, beranda">
          <span>wasla<span className="brand-sub">informatika</span><span className="brand-period">.</span></span>
        </Link>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          {links.map(l => (
            <Link key={l.id || l.href} href={l.href} aria-current={pathname.startsWith(l.href) ? 'page' : undefined}>
              <span>{l.label}</span>
            </Link>
          ))}
          {!links.some(l => l.href === '/kontak') && <Link href="/kontak">Kontak</Link>}
        </nav>
        <span className="header-language" aria-label="Bahasa Indonesia">ID</span>
        <details
          ref={menu}
          className="mobile-menu"
          onToggle={() => {
            const open = menu.current?.open || false
            document.getElementById('main')?.toggleAttribute('inert', open)
            document.querySelector('.site-footer')?.toggleAttribute('inert', open)
          }}
          onKeyDown={e => {
            if (e.key === 'Escape') {
              close()
              menu.current?.querySelector('summary')?.focus()
            }
            if (e.key === 'Tab' && menu.current?.open) {
              const stops = [...menu.current.querySelectorAll<HTMLElement>('summary, nav a[href]')]
              const first = stops[0]
              const last = stops[stops.length - 1]
              if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
              if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
            }
          }}
        >
          <summary aria-label="Buka menu navigasi">
            <span />
            <span />
            <span />
          </summary>
          <nav aria-label="Navigasi mobile">
            <span className="menu-wordmark" aria-hidden="true">wasla<span>informatika</span></span>
            {links.map(l => (
              <Link key={l.id || l.href} onClick={close} href={l.href} aria-current={pathname.startsWith(l.href) ? 'page' : undefined}>
                {l.label}
              </Link>
            ))}
            <Link onClick={close} href="/kontak" className="mobile-cta-link">
              Mulai konsultasi <Arrow diagonal />
            </Link>
          </nav>
        </details>
      </div>
    </header>
  )
}
