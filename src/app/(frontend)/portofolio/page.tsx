import { getProjects } from '@/backend/cms'
import { PageIntro, CTA } from '@/frontend/components/ui'
import { ProjectListing } from '@/frontend/components/listings'
import { pageMeta } from '@/frontend/lib/seo'
export const metadata = pageMeta('Project', 'Project website dan aplikasi yang telah dikerjakan Wasla Informatika untuk bisnis, organisasi, dan pendidikan.', '/portofolio')
export default async function Page() { const { docs } = await getProjects(); return <><PageIntro title="Project" copy="Website dan aplikasi yang telah kami kerjakan. Buka detail project atau kunjungi website aslinya."/><section className="wrap page-content"><ProjectListing projects={docs}/></section><CTA/></> }
