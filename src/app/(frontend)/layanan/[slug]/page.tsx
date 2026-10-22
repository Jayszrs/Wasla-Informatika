import { notFound } from 'next/navigation'
import { serviceBySlug } from '@/lib/cms'
import { PageIntro, Content, CTA, MediaImage, ButtonLink } from '@/components/ui'
import { ServiceArt } from '@/components/artwork'
import { pageMeta } from '@/lib/seo'
import { seoImageSource } from '@/lib/media'
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) { const { slug } = await params; const s = await serviceBySlug(slug); return s ? pageMeta(s.seo?.title || s.title, s.seo?.description || s.excerpt, `/layanan/${s.slug}`, seoImageSource(s.seo?.image)) : {} }
export default async function Page({ params }: Props) {
  const service = await serviceBySlug((await params).slug); if (!service) notFound()
  return <><PageIntro title={service.title} copy={service.excerpt}><ButtonLink href={`/kontak?layanan=${encodeURIComponent(service.title)}`} arrow>Diskusikan kebutuhan</ButtonLink></PageIntro><section className="wrap page-content"><div className="detail-grid"><aside className="detail-sidebar"><div><strong>Fokus layanan</strong>{service.category}</div>{service.image ? <MediaImage media={service.image}/> : <div className="service-detail-art"><ServiceArt variant={service.order || 0}/></div>}</aside><div className="detail-body"><Content data={service.content}/>{!!service.deliverables?.length && <section><h2>Ruang lingkup yang bisa dibahas.</h2><ul className="deliverables">{service.deliverables.map(d => <li key={d.id}>{d.item}</li>)}</ul><p>Rincian hasil kerja disepakati sesuai konteks dan kebutuhan proyek.</p></section>}</div></div></section><CTA title="Mari temukan bentuk solusi Anda."/></>
}
