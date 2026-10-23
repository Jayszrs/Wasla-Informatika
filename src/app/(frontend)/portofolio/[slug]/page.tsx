import { notFound } from 'next/navigation'
import { projectBySlug } from '@/backend/cms'
import { PageIntro, ProjectImage, CTA, TextLink } from '@/frontend/components/ui'
import { ProjectGallery } from '@/frontend/components/project-gallery'
import { pageMeta } from '@/frontend/lib/seo'
import { seoImageSource, mediaSource } from '@/shared/media'
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) { const p = await projectBySlug((await params).slug); return p ? pageMeta(p.seo?.title || p.title, p.seo?.description || p.excerpt, `/portofolio/${p.slug}`, seoImageSource(p.seo?.image)) : {} }
export default async function Page({ params }: Props) {
  const p = await projectBySlug((await params).slug); if (!p) notFound()
  const gallery = (p.gallery || []).flatMap(item => typeof item.image === 'object' && item.image?.url ? [{ src: mediaSource(item.image.url), alt: item.image.alt, caption: item.caption || '', width: item.image.width || 1440, height: item.image.height || 1000 }] : [])
  return <><PageIntro title={p.title} copy={p.excerpt}/><section className="wrap page-content">{p.isConcept && <p className="concept-disclosure"><strong>Konsep eksplorasi.</strong> Demonstrasi desain orisinal oleh Wasla. Bukan proyek klien, bukan aplikasi aktif, dan tidak memuat hasil bisnis yang diklaim.</p>}<div className="detail-visual"><ProjectImage project={p}/></div><div className="detail-grid"><aside className="detail-sidebar"><div><strong>Kategori</strong>{p.category}</div>{p.client && !p.isConcept && <div><strong>Klien</strong>{p.client}</div>}{!!p.technologies?.length && <div><strong>Teknologi</strong><div className="detail-tags">{p.technologies.map(t => <span key={t.id}>{t.name}</span>)}</div></div>}{p.externalLink?.startsWith('https://') && <a className="text-link" href={p.externalLink} target="_blank" rel="noopener noreferrer">Kunjungi website</a>}</aside><div className="detail-body"><section><h2>{p.isConcept ? 'Pertanyaan desain.' : 'Tentang project.'}</h2><p>{p.challenge}</p></section><section><h2>Pendekatan solusi.</h2><p>{p.solution}</p></section>{p.results && <section><h2>Hasil.</h2><p>{p.results}</p></section>}<TextLink href="/kontak">Diskusikan proyek serupa</TextLink></div></div><ProjectGallery images={gallery}/></section><CTA/></>
}
