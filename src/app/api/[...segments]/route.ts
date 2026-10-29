import { studioAPI } from '@/backend/api'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
async function handle(request: Request, context: { params: Promise<{ segments: string[] }> }) { return studioAPI(request, (await context.params).segments) }
export { handle as GET, handle as HEAD, handle as POST, handle as PATCH, handle as DELETE }
