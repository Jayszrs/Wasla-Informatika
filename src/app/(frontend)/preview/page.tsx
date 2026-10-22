import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { cms } from '@/lib/cms'
import { Content, PageIntro, ProjectImage } from '@/components/ui'
export const metadata = { title: 'Preview draft', robots: { index: false, follow: false } }
export default async function Preview({ searchParams }: { searchParams: Promise<{ collection?: string; id?: string }> }) {
  const params = await searchParams
  if (!['services', 'projects', 'posts'].includes(params.collection || '') || !/^\d+$/.test(params.id || '')) notFound()
  const payload = await cms()
  const { user } = await payload.auth({ headers: await headers() })
  if (!user || !['admin', 'editor'].includes(user.role)) notFound()
  const collection = params.collection as 'services' | 'projects' | 'posts'
  const doc = await payload.findByID({ collection, id: Number(params.id), draft: true, overrideAccess: false, user })
  if (!doc) notFound()
  return <><PageIntro title={doc.title} copy="Preview internal — konten draft, belum tentu dipublikasikan."/><section className="wrap page-content">{'content' in doc && <Content data={doc.content}/>} {'challenge' in doc && <><ProjectImage project={doc}/><p>{doc.challenge}</p><p>{doc.solution}</p></>}</section></>
}
