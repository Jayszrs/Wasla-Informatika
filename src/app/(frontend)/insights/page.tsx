import { getPosts } from '@/backend/cms'
import { PageIntro, CTA } from '@/frontend/components/ui'
import { PostListing } from '@/frontend/components/listings'
import { pageMeta } from '@/frontend/lib/seo'
export const metadata = pageMeta('Artikel', 'Perspektif tentang strategi digital, desain, teknologi, dan kolaborasi dari Wasla Informatika.', '/insights')
export default async function Page() { const { docs } = await getPosts(); return <><PageIntro title="Artikel" copy="Catatan tentang teknologi, desain, dan cara membuat keputusan digital yang lebih terarah."/><section className="wrap page-content"><PostListing posts={docs}/></section><CTA/></> }
