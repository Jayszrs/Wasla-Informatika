import { ServerTranslation } from '@/frontend/components/server-translation'
import { notFound } from 'next/navigation'
import { postBySlug } from '@/backend/cms'
import { Content, MediaImage, CTA, TextLink } from '@/frontend/components/ui'
import { localizedPageMeta } from '@/frontend/lib/seo'
import { seoImageSource } from '@/shared/media'
import { getLocale } from '@/frontend/lib/locale'
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) {
  const p = await postBySlug((await params).slug)
  if (!p) return {}
  const meta = await localizedPageMeta(p.seo?.title || p.title, p.seo?.description || p.excerpt, `/insights/${p.slug}`, seoImageSource(p.seo?.image))
  return { ...meta, openGraph: { ...meta.openGraph, type: 'article' as const, publishedTime: p.publishedAt } }
}
export default async function Page({ params }: Props) {
  const locale = await getLocale()
  const p = await postBySlug((await params).slug); if (!p) notFound()
  return <ServerTranslation>{<><div className="wrap"><header className="article-header"><TextLink href="/insights">Kembali ke insights</TextLink><p>{p.category} · {new Date(p.publishedAt).toLocaleDateString(locale === 'en' ? 'en-GB' : 'id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' })}{p.author && typeof p.author === 'object' && ` · ${p.author.name}`}</p><h1>{p.title}</h1></header><article className="article-content">{p.image && <div className="detail-visual"><MediaImage media={p.image}/></div>}<p className="prose">{p.excerpt}</p><Content data={p.content}/></article></div><CTA title="Ada ide yang ingin Anda diskusikan?"/></>}</ServerTranslation>
}
