import { getProjects } from '@/lib/cms'
import { PageIntro, CTA } from '@/components/ui'
import { ProjectListing } from '@/components/listings'
import { pageMeta } from '@/lib/seo'
export const metadata = pageMeta('Portofolio & Eksplorasi', 'Jelajahi pendekatan desain dan pengembangan Wasla. Karya demonstrasi ditandai sebagai konsep eksplorasi.', '/portofolio')
export default async function Page() { const { docs } = await getProjects(); return <><PageIntro title="Karya Kami" copy="Ruang eksplorasi untuk pengalaman digital yang berguna dan berkarakter. Proyek demonstrasi ditandai sebagai konsep; bukan hasil kerja untuk klien."/><section className="wrap page-content"><ProjectListing projects={docs}/></section><CTA/></> }
