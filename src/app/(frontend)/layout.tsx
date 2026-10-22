import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Link from 'next/link'
import { getNavigation, getSettings } from '@/lib/cms'
import { NavigationBar } from '@/components/navigation'
import { Arrow } from '@/components/icons'
import { validPublicLink, validWhatsApp } from '@/lib/validation'
import { siteURL } from '@/lib/seo'
import './globals.css'

const manrope = localFont({ src: '../../../public/fonts/manrope.ttf', variable: '--font-display', display: 'swap' })
const jakarta = localFont({ src: '../../../public/fonts/plus-jakarta-sans.ttf', variable: '--font-body', display: 'swap' })
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
  return <html lang="id" className={`${manrope.variable} ${jakarta.variable}`} id="top"><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Organization', name: settings.name, url: siteURL(), description: settings.description,
      ...(settings.email ? { email: settings.email } : {}),
    }).replace(/</g, '\\u003c') }}/>
    <a className="skip-link" href="#main">Langsung ke konten</a>
    <NavigationBar settings={settings} navigation={nav}/>
    <main id="main">{children}</main>
    <footer className="site-footer"><div className="wrap">
      <div className="footer-top"><div className="footer-statement"><p>{settings.footerNote || 'Teknologi dengan tujuan. Desain dengan perhatian.'}</p><Link className="text-link" href="/kontak">Bicarakan ide Anda<Arrow diagonal/></Link></div>
        <nav aria-label="Navigasi footer"><Link href="/">Beranda</Link>{publicLinks.map(l => <Link key={l.id || l.href} href={l.href}>{l.label}</Link>)}<Link href="/kontak">Kontak</Link></nav>
        <div className="footer-contact">{settings.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}{validWhatsApp(settings.whatsapp) && <a href={`https://wa.me/${settings.whatsapp}`}>Diskusi melalui WhatsApp<Arrow diagonal/></a>}{settings.address && <address>{settings.address}</address>}{settings.socials?.filter(s => validPublicLink(s.url)).map(s => <a key={s.id || s.url} href={s.url} rel="noopener noreferrer">{s.label}<Arrow diagonal/></a>)}</div>
      </div>
      <Link className="footer-wordmark" href="/" aria-label="Wasla Informatika">wasla<span>informatika</span></Link>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Wasla Informatika</span><span>Dirancang dengan perhatian di Indonesia.</span><Link href="/privasi">Kebijakan privasi</Link><a href="#top" className="back-top">Kembali ke atas<Arrow diagonal/></a></div>
    </div></footer>
  </body></html>
}
