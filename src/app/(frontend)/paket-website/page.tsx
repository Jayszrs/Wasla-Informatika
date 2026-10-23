import { getSettings } from '@/backend/cms'
import { WebsitePackages } from '@/frontend/components/website-packages'
import { PageIntro, CTA } from '@/frontend/components/ui'
import { pageMeta } from '@/frontend/lib/seo'

export const metadata = pageMeta('Paket Website', 'Landing page Rp5 juta tanpa CMS, web application Rp8 juta, dan company profile dengan CMS Rp10 juta.', '/paket-website')
export default async function Page() {
  const settings = await getSettings()
  return <><PageIntro title="Paket website." copy="Pilihan dasar untuk halaman penawaran, aplikasi web, dan profil bisnis Anda."/><WebsitePackages packages={settings.websitePackages} standalone/><CTA title="Kita mulai dari kebutuhan Anda."/></>
}
