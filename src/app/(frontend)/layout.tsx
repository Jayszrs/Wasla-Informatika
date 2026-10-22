import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Link from 'next/link'
import { getNavigation, getSettings } from '@/lib/cms'
import { NavigationBar } from '@/components/navigation'
import { Arrow } from '@/components/icons'
import { SectionWave } from '@/components/artwork'
import { validPublicLink, validWhatsApp } from '@/lib/validation'
import { siteURL } from '@/lib/seo'
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
    icons: favicon ? { icon: favicon } : undefined,
  }
}
export default async function Layout({ children }: { children: React.ReactNode }) {
  const [settings, nav] = await Promise.all([getSettings(), getNavigation()])
  const publicLinks = nav.links?.filter(l => l.enabled && validPublicLink(l.href)) || []
  return <html lang="id" className={poppins.variable} id="top"><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Organization', name: settings.name, url: siteURL(), description: settings.description,
      ...(settings.email ? { email: settings.email } : {}),
    }).replace(/</g, '\\u003c') }}/>
    <a className="skip-link" href="#main">Langsung ke konten</a>
    <NavigationBar settings={settings} navigation={nav}/>
    <main id="main">{children}</main>
    <footer className="site-footer"><SectionWave variant="light-dark"/><div className="wrap">
      <div className="footer-top"><div className="footer-statement"><Link className="footer-wordmark" href="/" aria-label="Wasla Informatika">wasla<span>informatika</span></Link><strong>{settings.name}</strong><p>{settings.description}</p></div>
        <div className="footer-contact">{settings.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}{validWhatsApp(settings.whatsapp) && <a href={`https://wa.me/${settings.whatsapp}`}>Diskusi melalui WhatsApp<Arrow diagonal/></a>}{settings.address && <address>{settings.address}</address>}{settings.socials?.filter(s => validPublicLink(s.url)).map(s => <a key={s.id || s.url} href={s.url} rel="noopener noreferrer">{s.label}<Arrow diagonal/></a>)}</div>
      </div>
      <a href="#top" className="back-top" aria-label="Kembali ke atas"><Arrow diagonal/></a>
      <div className="footer-bottom"><nav aria-label="Navigasi footer"><Link href="/">Beranda</Link>{publicLinks.map(l => <Link key={l.id || l.href} href={l.href}>{l.label}</Link>)}<Link href="/kontak">Kontak</Link><Link href="/privasi">Privasi</Link></nav><span>© {new Date().getFullYear()} Wasla Informatika</span></div>
    </div></footer>
    <a className="floating-contact" href={validWhatsApp(settings.whatsapp) ? `https://wa.me/${settings.whatsapp}` : '/kontak'} aria-label={validWhatsApp(settings.whatsapp) ? 'Diskusi melalui WhatsApp' : 'Buka konsultasi'}><svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M27 15a11 11 0 0 1-11 11c-2 0-3.8-.5-5.4-1.4L5 27l1.9-5.8A11 11 0 1 1 27 15Z"/><path d="M10 14h12M10 18h8" strokeLinecap="round"/></svg></a>
  </body></html>
}
