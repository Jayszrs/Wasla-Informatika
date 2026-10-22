'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import type { Navigation, SiteSetting } from '@/payload-types'
import { validPublicLink } from '@/lib/validation'
import { Arrow } from './icons'
import { LinkProgress } from './link-progress'
import { mediaSource } from '@/lib/media'

export function NavigationBar({ settings, navigation }: { settings: SiteSetting; navigation: Navigation }) {
  const pathname = usePathname()
  const menu = useRef<HTMLDetailsElement>(null)
  const links = navigation.links?.filter(l => l.enabled && validPublicLink(l.href)).sort((a, b) => (a.order || 0) - (b.order || 0)) || []
  const logo = typeof settings.logoWhite === 'object' ? settings.logoWhite : null
  const close = () => { if (menu.current) menu.current.open = false }

  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <Link className="brand" href="/" aria-label="Wasla Informatika, beranda">
          {logo?.url ? (
            <Image src={mediaSource(logo.url)} width={140} height={48} alt={logo.alt} />
          ) : (
            <span>wasla<span className="brand-sub">informatika</span><span className="brand-period">.</span></span>
          )}
        </Link>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          {links.map(l => (
            <Link key={l.id || l.href} href={l.href} aria-current={pathname.startsWith(l.href) ? 'page' : undefined}>
              <span>{l.label}</span>
              <LinkProgress />
            </Link>
          ))}
        </nav>
        <Link className="btn btn-white button button-white header-cta" href="/kontak">
          <span>Mulai konsultasi</span>
          <Arrow diagonal />
        </Link>
        <details
          ref={menu}
          className="mobile-menu"
          onKeyDown={e => {
            if (e.key === 'Escape') {
              close()
              menu.current?.querySelector('summary')?.focus()
            }
          }}
        >
          <summary aria-label="Buka menu navigasi">
            <span />
            <span />
          </summary>
          <nav aria-label="Navigasi mobile">
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
