import { videoUploadAPI } from '@/backend/video-upload'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export async function POST(request: Request, context: { params: Promise<{ action: string }> }) { return videoUploadAPI(request, (await context.params).action) }
