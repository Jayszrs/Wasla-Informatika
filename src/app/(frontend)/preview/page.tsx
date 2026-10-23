import { notFound } from 'next/navigation'
import { currentUser } from '@/backend/auth'
import { listDocuments } from '@/backend/content'
import type { Project, Post, Service } from '@/shared/content-types'
import { Content, PageIntro, ProjectImage } from '@/frontend/components/ui'
export const metadata = { title: 'Preview draft', robots: { index: false, follow: false } }
export default async function Preview({ searchParams }: { searchParams: Promise<{ collection?: string; id?: string }> }) {
  const params = await searchParams
  if (!['services', 'projects', 'posts'].includes(params.collection || '') || !/^\d+$/.test(params.id || '')) notFound()
  const user = await currentUser()
  if (!user || !['admin', 'editor'].includes(user.role)) notFound()
  const collection = params.collection as 'services' | 'projects' | 'posts'
  const doc = (await listDocuments(collection, true)).find(d => d.id === Number(params.id)) as unknown as Project | Post | Service | undefined
  if (!doc) notFound()
  return <><PageIntro title={doc.title} copy="Preview internal — konten draft, belum tentu dipublikasikan."/><section className="wrap page-content">{'content' in doc && <Content data={doc.content}/>} {'challenge' in doc && <><ProjectImage project={doc}/><p>{doc.challenge}</p><p>{doc.solution}</p></>}</section></>
}
