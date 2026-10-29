'use client'
import { upload } from '@vercel/blob/client'
import { maxVideoBytes } from '@/shared/video-source'

export type StudioMediaAsset = Record<string, unknown> & { id: number; url: string; alt: string }
async function result(response: Response) {
  const body = await response.json()
  if (!response.ok) throw new Error(body.error || 'Unggahan belum tersimpan.')
  return body
}

export async function uploadStudioMedia(file: File, alt: string, onProgress?: (percentage: number) => void): Promise<StudioMediaAsset> {
  if (!alt.trim() || alt.trim().length > 500) throw new Error('Isi deskripsi media terlebih dahulu.')
  if (!file.type.startsWith('video/')) {
    const form = new FormData()
    form.set('file', file); form.set('alt', alt.trim())
    onProgress?.(0)
    const body = await result(await fetch('/api/media', { method: 'POST', body: form }))
    onProgress?.(100)
    return body.doc
  }
  if (!['video/mp4', 'video/webm'].includes(file.type) || !file.size || file.size > maxVideoBytes) throw new Error('Gunakan video MP4 atau WebM maksimal 250 MB.')
  const config = await result(await fetch('/api/media/video-upload'))
  if (!config.available) throw new Error('Penyimpanan video belum dikonfigurasi.')
  onProgress?.(0)
  if (!config.direct) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest()
      request.open('POST', '/api/media/video-upload/local')
      request.setRequestHeader('Content-Type', file.type)
      request.setRequestHeader('X-Upload-Alt', encodeURIComponent(alt.trim()))
      request.upload.onprogress = event => { if (event.lengthComputable) onProgress?.(Math.round(event.loaded / event.total * 95)) }
      request.onerror = () => reject(new Error('Koneksi unggahan terputus. Coba lagi.'))
      request.onload = () => {
        try { const body = JSON.parse(request.responseText); if (request.status >= 400) reject(new Error(body.error || 'Unggahan belum tersimpan.')); else { onProgress?.(100); resolve(body.doc) } }
        catch { reject(new Error('Unggahan belum tersimpan.')) }
      }
      request.send(file)
    })
  }
  const pathname = `studio/video/${crypto.randomUUID()}.${file.type === 'video/mp4' ? 'mp4' : 'webm'}`
  const blob = await upload(pathname, file, {
    access: 'public', contentType: file.type, multipart: true, handleUploadUrl: '/api/media/video-upload',
    clientPayload: JSON.stringify({ alt: alt.trim(), mimeType: file.type, filesize: file.size }),
    onUploadProgress: event => onProgress?.(Math.round(event.percentage * .95)),
  })
  const body = await result(await fetch('/api/media/video-upload/complete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pathname: blob.pathname, url: blob.url }) }))
  onProgress?.(100)
  return body.doc
}
