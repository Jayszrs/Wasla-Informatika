import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Link from 'next/link'
import { getNavigation, getSettings, getTeam } from '@/lib/cms'
import { NavigationBar } from '@/components/navigation'
import { validPublicLink } from '@/lib/validation'
import { teamContacts } from '@/lib/contacts'
import { WhatsAppIcon } from '@/components/contact-cards'
import { mediaSource } from '@/lib/media'
import { siteURL } from '@/lib/seo'
import { HeroEnhancement } from '@/components/motion'
import './globals.css'

const poppins = localFont({ src: [
  { path: '../../../public/fonts/Poppins-Light.ttf', weight: '300', style: 'normal' },
  { path: '../../../public/fonts/Poppins-Regular.ttf', weight: '400', style: 'normal' },
  { path: '../../../public/fonts/Poppins-Medium.ttf', weight: '500', style: 'normal' },
  { path: '../../../public/fonts/Poppins-SemiBold.ttf', weight: '600', style: 'normal' },
  { path: '../../../public/fonts/Poppins-Bold.ttf', weight: '700', style: 'normal' },
], variable: '--font-poppins', display: 'swap' })
export const dynamic = 'force-dynamic'
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const favicon = typeof settings.favicon === 'object' ? settings.favicon?.url : undefined
  return {
    metadataBase: new URL(siteURL()),
    title: { default: 'Wasla Informatika — Solusi Digital untuk Bisnis', template: '%s — Wasla Informatika' },
    description: settings.seoDescription || settings.description,
    openGraph: { type: 'website', locale: 'id_ID', siteName: 'Wasla Informatika', images: ['/opengraph-image'] },
    twitter: { card: 'summary_large_image' }, robots: { index: true, follow: true },
    icons: { icon: favicon ? mediaSource(favicon) : '/images/brand/favicon-navy.png', apple: '/images/brand/favicon-navy.png' },
  }
}
export default async function Layout({ children }: { children: React.ReactNode }) {
  const [settings, nav, team] = await Promise.all([getSettings(), getNavigation(), getTeam()])
  const contacts = teamContacts(team.docs)
  const publicLinks = nav.links?.filter(l => l.enabled && validPublicLink(l.href)) || []
  return <html lang="id" className={poppins.variable} id="top"><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Organization', name: settings.name, url: siteURL(), description: settings.description,
      ...(settings.email ? { email: settings.email } : {}),
    }).replace(/</g, '\\u003c') }}/>
    <a className="skip-link" href="#main">Langsung ke konten</a>
    <NavigationBar settings={settings} navigation={nav}/>
    <HeroEnhancement/>
    <main id="main">{children}</main>
    <footer className="site-footer"><div className="wrap">
      <div className="footer-top"><div className="footer-statement"><Link className="footer-wordmark" href="/" aria-label="Wasla Informatika">wasla<span>informatika</span></Link><p>{settings.description}</p>{settings.email && <a className="footer-email" href={`mailto:${settings.email}`}>{settings.email}</a>}{settings.address && <address>{settings.address}</address>}</div>
        <nav className="footer-explore" aria-label="Navigasi footer"><h2>Jelajahi Wasla</h2><Link href="/">Beranda</Link>{publicLinks.map(l => <Link key={l.id || l.href} href={l.href}>{l.label}</Link>)}{!publicLinks.some(l => l.href === '/kontak') && <Link href="/kontak">Kontak</Link>}</nav>
        <div className="footer-contact"><h2>Bicara dengan tim</h2>{contacts.map(person => <a href={person.href} key={person.id} target="_blank" rel="noopener noreferrer"><strong>{person.name}</strong><span>{person.role}</span></a>)}{settings.socials?.filter(s => validPublicLink(s.url)).map(s => <a key={s.id || s.url} href={s.url} rel="noopener noreferrer">{s.label}</a>)}</div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Wasla Informatika</span><div><Link href="/privasi">Privasi</Link><a href="#top">Kembali ke atas</a></div></div>
      <div className="footer-signature" aria-hidden="true">wasla</div>
    </div></footer>
    <Link className="floating-contact" href="/kontak#tim-kontak" aria-label="Pilih kontak WhatsApp"><WhatsAppIcon size={32}/></Link>
  </body></html>
}
