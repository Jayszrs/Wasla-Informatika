import { ServerTranslation } from '@/frontend/components/server-translation'
import { getProjects } from '@/backend/cms'
import { PageIntro, CTA } from '@/frontend/components/ui'
import { ProjectListing } from '@/frontend/components/listings'
import { localizedPageMeta } from '@/frontend/lib/seo'
export async function generateMetadata() { return localizedPageMeta('Project', 'Project website dan aplikasi yang telah dikerjakan Wasla Informatika untuk bisnis, organisasi, dan pendidikan.', '/portofolio') }
export default async function Page() { const { docs } = await getProjects(); return <ServerTranslation>{<><PageIntro title="Project" copy="Website dan aplikasi yang telah kami kerjakan. Buka detail project atau kunjungi website aslinya."/><section className="wrap page-content"><ProjectListing projects={docs}/></section><CTA/></>}</ServerTranslation> }
