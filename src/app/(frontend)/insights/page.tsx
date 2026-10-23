import { getPosts } from '@/lib/cms'
import { PageIntro, CTA } from '@/components/ui'
import { PostListing } from '@/components/listings'
import { pageMeta } from '@/lib/seo'
export const metadata = pageMeta('Artikel', 'Perspektif tentang strategi digital, desain, teknologi, dan kolaborasi dari Wasla Informatika.', '/insights')
export default async function Page() { const { docs } = await getPosts(); return <><PageIntro title="Artikel" copy="Catatan tentang teknologi, desain, dan cara membuat keputusan digital yang lebih terarah."/><section className="wrap page-content"><PostListing posts={docs}/></section><CTA/></> }
