import { ServerTranslation } from '@/frontend/components/server-translation'
import { getPosts } from '@/backend/cms'
import { PageIntro, CTA, ButtonLink } from '@/frontend/components/ui'
import { PostListing } from '@/frontend/components/listings'
import { localizedPageMeta } from '@/frontend/lib/seo'
export async function generateMetadata() { return localizedPageMeta('Artikel', 'Perspektif tentang strategi digital, desain, teknologi, dan kolaborasi dari Wasla Informatika.', '/insights') }
export default async function Page() { const { docs } = await getPosts(); return <ServerTranslation>{<><PageIntro title="Artikel" copy="Catatan tentang teknologi, desain, dan cara membuat keputusan digital yang lebih terarah."><ButtonLink href="/cara-membuat-website">Baca cara membuat website</ButtonLink></PageIntro><section className="wrap page-content"><PostListing posts={docs}/></section><CTA/></>}</ServerTranslation> }
