import { notFound } from 'next/navigation'
import { postBySlug } from '@/backend/cms'
import { Content, MediaImage, CTA, TextLink } from '@/frontend/components/ui'
import { pageMeta } from '@/frontend/lib/seo'
import { seoImageSource } from '@/shared/media'
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) { const p = await postBySlug((await params).slug); if (!p) return {}; return { ...pageMeta(p.seo?.title || p.title, p.seo?.description || p.excerpt, `/insights/${p.slug}`, seoImageSource(p.seo?.image)), openGraph: { type: 'article' as const, title: p.seo?.title || p.title, description: p.seo?.description || p.excerpt, publishedTime: p.publishedAt, images: [seoImageSource(p.seo?.image) || '/opengraph-image'] } } }
export default async function Page({ params }: Props) {
  const p = await postBySlug((await params).slug); if (!p) notFound()
  return <><div className="wrap"><header className="article-header"><TextLink href="/insights">Kembali ke insights</TextLink><p>{p.category} · {new Date(p.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' })}{p.author && typeof p.author === 'object' && ` · ${p.author.name}`}</p><h1>{p.title}</h1></header><article className="article-content">{p.image && <div className="detail-visual"><MediaImage media={p.image}/></div>}<p className="prose">{p.excerpt}</p><Content data={p.content}/></article></div><CTA title="Ada ide yang ingin Anda diskusikan?"/></>
}
