import { redirect, notFound } from 'next/navigation'
import { currentUser } from '@/lib/studio-auth'
import { StudioWorkspace, StudioLogin } from '@/components/studio-workspace'
import { studioSchema } from '@/lib/studio-schema'
export default async function AdminPage({ params }: { params: Promise<{ segments?: string[] }> }) {
  const segments = (await params).segments || []
  const user = await currentUser()
  if (segments[0] === 'login') { if (user) redirect('/admin'); return <StudioLogin/> }
  if (!user) redirect('/admin/login')
  if (segments.length > 2 || segments[0] && !studioSchema[segments[0]]) notFound()
  if (segments[0] === 'users' && user.role !== 'admin') notFound()
  return <StudioWorkspace user={user} section={segments[0] || 'overview'} documentId={segments[1]}/>
}
