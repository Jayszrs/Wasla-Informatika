import { videoUploadAPI } from '@/backend/video-upload'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export async function GET(request: Request) { return videoUploadAPI(request) }
export async function POST(request: Request) { return videoUploadAPI(request) }
