import { getSettings } from '@/backend/cms'
import { WebsitePackages } from '@/frontend/components/website-packages'
import { PageIntro, CTA } from '@/frontend/components/ui'
import { pageMeta } from '@/frontend/lib/seo'

export const metadata = pageMeta('Paket Website, Fotografi & Video Editing', 'Pilihan paket website, fotografi wisuda dan wedding, serta video editing Wasla Informatika.', '/paket-website')
export default async function Page() {
  const settings = await getSettings()
  return <><PageIntro title="Paket layanan." copy="Website, fotografi, dan video editing untuk bisnis dan momen Anda."/><WebsitePackages packages={settings.websitePackages} standalone/><CTA title="Kita mulai dari kebutuhan Anda."/></>
}
