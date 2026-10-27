import { ServerTranslation } from '@/frontend/components/server-translation'
import { getSettings } from '@/backend/cms'
import { WebsitePackages } from '@/frontend/components/website-packages'
import { PageIntro, CTA } from '@/frontend/components/ui'
import { localizedPageMeta } from '@/frontend/lib/seo'

export async function generateMetadata() { return localizedPageMeta('Paket Website, Fotografi & Video Editing', 'Pilihan paket website, fotografi wisuda dan wedding, serta video editing Wasla Informatika.', '/paket-website') }
export default async function Page() {
  const settings = await getSettings()
  return <ServerTranslation>{<><PageIntro title="Paket layanan." copy="Website, fotografi, dan video editing untuk bisnis dan momen Anda."/><WebsitePackages packages={settings.websitePackages} standalone/><CTA title="Kita mulai dari kebutuhan Anda."/></>}</ServerTranslation>
}
