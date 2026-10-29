import { randomUUID } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { head } from '@vercel/blob'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { currentUser, sameOrigin } from './auth'
import { pool } from './database'
import { saveDocument } from './content'
import { invalidatePublicContent } from './public-content'
import { publicBlobSource } from '@/shared/media'
import { maxVideoBytes, videoMimeType } from '@/shared/video-source'

class UploadError extends Error { constructor(message: string, readonly status = 400) { super(message) } }
const json = (value: unknown, status = 200) => Response.json(value, { status, headers: { 'Cache-Control': 'no-store' } })
const blobEnabled = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN && (process.env.VERCEL === '1' || process.env.USE_VERCEL_BLOB === 'true'))
const validPath = (value: string) => /^studio\/video\/[a-f\d-]{36}\.(mp4|webm)$/.test(value)

async function staff(request: Request) {
  if (!sameOrigin(request) && request.method !== 'GET') throw new UploadError('Asal permintaan tidak diizinkan.', 403)
  const user = await currentUser()
  if (!user) throw new UploadError('Silakan masuk.', 401)
  return user
}

async function smallJSON(request: Request) {
  const reader = request.body?.getReader()
  if (!reader) throw new UploadError('Data unggahan tidak lengkap.')
  const chunks: Uint8Array[] = []
  let size = 0
  while (true) {
    const next = await reader.read()
    if (next.done) break
    size += next.value.byteLength
    if (size > 16_384) { await reader.cancel(); throw new UploadError('Data unggahan terlalu besar.', 413) }
    chunks.push(next.value)
  }
  return JSON.parse(Buffer.concat(chunks).toString())
}

async function registerBlob(pathname: string, inputURL: string, owner?: string) {
  const source = publicBlobSource(inputURL)
  if (!source || !validPath(pathname)) throw new UploadError('Sumber unggahan tidak valid.')
  const metadata = await head(source)
  if (metadata.pathname !== pathname || !['video/mp4', 'video/webm'].includes(metadata.contentType) || !metadata.size || metadata.size > maxVideoBytes) throw new UploadError('File harus MP4 atau WebM maksimal 250 MB.')
  const response = await fetch(source, { headers: { Range: 'bytes=0-63' }, redirect: 'error', signal: AbortSignal.timeout(10_000) })
  if (!response.ok || !response.body) throw new UploadError('File video belum dapat diperiksa.')
  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let prefixLength = 0
  while (prefixLength < 12) {
    const next = await reader.read()
    if (next.done) break
    chunks.push(next.value.subarray(0, 64))
    prefixLength += next.value.length
  }
  await reader.cancel()
  if (videoMimeType(Buffer.concat(chunks)) !== metadata.contentType) throw new UploadError('Isi file tidak cocok dengan format video.')
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const pending = (await client.query(`SELECT id,data FROM studio_documents WHERE collection='_video-uploads' AND data->>'pathname'=$1 ORDER BY id LIMIT 1 FOR UPDATE`, [pathname])).rows[0]
    if (!pending || owner && pending.data.actor !== owner) throw new UploadError('Unggahan tidak ditemukan.', 404)
    if (pending.data.mediaId) {
      const media = (await client.query(`SELECT id,data FROM studio_documents WHERE collection='media' AND id=$1`, [pending.data.mediaId])).rows[0]
      if (!media) throw new UploadError('Media tidak ditemukan.', 404)
      await client.query('COMMIT')
      return { ...media.data, id: Number(media.id) }
    }
    if (Number(pending.data.expiresAt) < Date.now()) throw new UploadError('Unggahan kedaluwarsa. Unggah kembali.')
    const filename = pathname.split('/').pop()!
    const data = { filename, prefix: 'studio/video', alt: pending.data.alt, mimeType: metadata.contentType, filesize: metadata.size, blobURL: source, url: `/api/media/file/${filename}` }
    const media = (await client.query(`INSERT INTO studio_documents(collection,data,published) VALUES('media',$1,$1) RETURNING id`, [data])).rows[0]
    await client.query(`INSERT INTO studio_revisions(collection,document_id,data,actor) VALUES('media',$1,$2,$3)`, [media.id, data, pending.data.actor])
    await client.query(`UPDATE studio_documents SET data=jsonb_set(data,'{mediaId}',$2::jsonb),updated_at=now() WHERE collection='_video-uploads' AND id=$1`, [pending.id, JSON.stringify(Number(media.id))])
    await client.query('COMMIT')
    invalidatePublicContent('media')
    return { ...data, id: Number(media.id) }
  } catch (error) { await client.query('ROLLBACK'); throw error } finally { client.release() }
}

async function localUpload(request: Request) {
  const user = await staff(request)
  if (process.env.VERCEL === '1' || blobEnabled()) throw new UploadError('Gunakan penyimpanan video langsung.', 405)
  const mimeType = (request.headers.get('content-type') || '').split(';')[0]
  const alt = decodeURIComponent(request.headers.get('x-upload-alt') || '').trim()
  if (!['video/mp4', 'video/webm'].includes(mimeType) || !alt || alt.length > 500 || !request.body) throw new UploadError('Pilih video MP4 / WebM dan isi deskripsinya.')
  if (Number(request.headers.get('content-length') || 0) > maxVideoBytes) throw new UploadError('Video maksimal 250 MB.', 413)
  const directory = path.resolve(process.env.MEDIA_DIR || 'media')
  await fs.mkdir(directory, { recursive: true })
  const filename = `${randomUUID()}.${mimeType === 'video/mp4' ? 'mp4' : 'webm'}`
  const target = path.join(directory, filename)
  const file = await fs.open(target, 'wx')
  let filesize = 0
  let prefix = Buffer.alloc(0)
  try {
    const reader = request.body.getReader()
    while (true) {
      const next = await reader.read()
      if (next.done) break
      filesize += next.value.byteLength
      if (filesize > maxVideoBytes) { await reader.cancel(); throw new UploadError('Video maksimal 250 MB.', 413) }
      if (prefix.length < 64) prefix = Buffer.concat([prefix, next.value]).subarray(0, 64)
      let offset = 0
      while (offset < next.value.length) {
        const written = await file.write(next.value, offset)
        if (!written.bytesWritten) throw new UploadError('File belum selesai disimpan.')
        offset += written.bytesWritten
      }
    }
    await file.close()
    if (!filesize || videoMimeType(prefix) !== mimeType) throw new UploadError('Isi file tidak cocok dengan format video.')
    const doc = await saveDocument('media', { filename, alt, mimeType, filesize, url: `/api/media/file/${filename}` }, user.email)
    invalidatePublicContent('media')
    return json({ doc }, 201)
  } catch (error) {
    await file.close().catch(() => {})
    await fs.unlink(target).catch(() => {})
    throw error
  }
}

export async function videoUploadAPI(request: Request, action?: string) {
  try {
    if (action === 'local' && request.method === 'POST') return await localUpload(request)
    if (request.method === 'GET' && !action) { await staff(request); return json({ direct: blobEnabled(), available: process.env.VERCEL !== '1' || blobEnabled(), maxBytes: maxVideoBytes }) }
    if (request.method !== 'POST') return json({ error: 'Metode tidak didukung.' }, 405)
    if (action === 'complete') {
      const user = await staff(request)
      const body = await smallJSON(request)
      return json({ doc: await registerBlob(String(body.pathname || ''), String(body.url || ''), user.email) }, 201)
    }
    if (action || !blobEnabled()) return json({ error: 'Penyimpanan video belum dikonfigurasi.' }, 503)
    const body = await smallJSON(request) as HandleUploadBody
    const result = await handleUpload({
      request, body,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const user = await staff(request)
        if (!validPath(pathname)) throw new UploadError('Nama file video tidak valid.')
        const payload = JSON.parse(clientPayload || '{}')
        const alt = String(payload.alt || '').trim()
        const mimeType = String(payload.mimeType || '')
        const size = Number(payload.filesize)
        if (!alt || alt.length > 500 || !['video/mp4', 'video/webm'].includes(mimeType) || !Number.isSafeInteger(size) || size <= 0 || size > maxVideoBytes || pathname.endsWith('.mp4') !== (mimeType === 'video/mp4')) throw new UploadError('Periksa deskripsi dan format video, maksimal 250 MB.')
        await saveDocument('_video-uploads', { pathname, alt, actor: user.email, expiresAt: Date.now() + 7_200_000 }, user.email)
        return { allowedContentTypes: [mimeType], maximumSizeInBytes: maxVideoBytes, validUntil: Date.now() + 7_200_000, addRandomSuffix: false, allowOverwrite: false, tokenPayload: JSON.stringify({ pathname }) }
      },
      onUploadCompleted: async ({ blob }) => { await registerBlob(blob.pathname, blob.url) },
    })
    return json(result)
  } catch (error) {
    if (error instanceof UploadError) return json({ error: error.message }, error.status)
    if (error instanceof SyntaxError || error instanceof URIError) return json({ error: 'Data unggahan tidak valid.' }, 400)
    return json({ error: 'Unggahan belum tersimpan. Coba lagi.' }, 400)
  }
}
