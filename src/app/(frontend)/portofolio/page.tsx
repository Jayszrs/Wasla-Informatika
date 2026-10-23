import { getProjects } from '@/lib/cms'
import { PageIntro, CTA } from '@/components/ui'
import { ProjectListing } from '@/components/listings'
import { pageMeta } from '@/lib/seo'
export const metadata = pageMeta('Project', 'Project website dan aplikasi yang telah dikerjakan Wasla Informatika untuk bisnis, organisasi, dan pendidikan.', '/portofolio')
export default async function Page() { const { docs } = await getProjects(); return <><PageIntro title="Project" copy="Website dan aplikasi yang telah kami kerjakan. Buka detail project atau kunjungi website aslinya."/><section className="wrap page-content"><ProjectListing projects={docs}/></section><CTA/></> }
