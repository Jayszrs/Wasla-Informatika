import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import { Readable } from 'node:stream'
import path from 'node:path'
import sharp from 'sharp'
import { put, del } from '@vercel/blob'
import { cookies } from 'next/headers'
import { pool } from './database'
import { currentUser, createSession, hashPassword, verifyPassword, sameOrigin, sessionCookie, tokenHash } from './auth'
import { listDocuments, saveDocument, getGlobal } from './content'
import { publicMediaFile, invalidatePublicContent } from './public-content'
import { studioSchema, editorialCollections, contentCollections } from '../shared/studio-schema'
import { validateDocument } from './content-validation'
import { mediaByteRange } from './media-range'
const json = (data: unknown, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } })
async function readBody(request: Request, max: number) {
  if (Number(request.headers.get('content-length') || 0) > max) throw new Error('TOO_LARGE')
  const reader = request.body?.getReader(); if (!reader) return new Uint8Array()
  const chunks: Uint8Array[] = []; let bytes = 0
  while (true) { const { value, done } = await reader.read(); if (done) break; bytes += value.byteLength; if (bytes > max) { await reader.cancel(); throw new Error('TOO_LARGE') } chunks.push(value) }
  return Buffer.concat(chunks)
}
async function login(request: Request) {
  const body = JSON.parse(Buffer.from(await readBody(request, 4096)).toString())
  const input = z.object({ email: z.email().max(254), password: z.string().min(1).max(256) }).safeParse(body)
  if (!input.success) return json({ error: 'Isi email dan password dengan benar.' }, 400)
  const key = tokenHash(input.data.email.toLowerCase())
  const rate = await pool.query(`INSERT INTO studio_login_limits(key,hits,reset_at) VALUES($1,1,now()+interval '10 minutes') ON CONFLICT(key) DO UPDATE SET hits=CASE WHEN studio_login_limits.reset_at<now() THEN 1 ELSE studio_login_limits.hits+1 END, reset_at=CASE WHEN studio_login_limits.reset_at<now() THEN now()+interval '10 minutes' ELSE studio_login_limits.reset_at END RETURNING hits`, [key])
  if (rate.rows[0].hits > 5) return json({ error: 'Terlalu banyak percobaan. Coba lagi dalam 10 menit.' }, 429)
  const user = (await pool.query(`SELECT * FROM studio_users WHERE email=$1`, [input.data.email.toLowerCase()])).rows[0]
  const valid = user ? await verifyPassword(input.data.password, user.password_hash, user.legacy_salt) : await verifyPassword(input.data.password, 'scrypt:invalid:' + '0'.repeat(128))
  if (!user || !valid) return json({ error: 'Email atau password tidak cocok.' }, 401)
  if (!user.password_hash.startsWith('scrypt:')) await pool.query(`UPDATE studio_users SET password_hash=$2,legacy_salt=NULL WHERE id=$1`, [user.id, await hashPassword(input.data.password)])
  await pool.query(`DELETE FROM studio_login_limits WHERE key=$1`, [key])
  await createSession(user.id)
  return json({ user: { id: Number(user.id), name: user.name, email: user.email, role: user.role } })
}
async function upload(request: Request, actor: string) {
  const maxMB = process.env.VERCEL === '1' ? 4 : 8
  const bytes = await readBody(request, maxMB * 1024 * 1024 + 65536)
  const form = await new Request(request.url, { method: 'POST', headers: { 'content-type': request.headers.get('content-type') || '' }, body: bytes }).formData()
  const file = form.get('file')
  const legacy = form.get('_payload')
  const alt = String(form.get('alt') || (legacy ? JSON.parse(String(legacy)).alt : '') || '').trim()
  if (!(file instanceof File) || !alt || alt.length > 500 || file.size > maxMB * 1024 * 1024) return json({ error: `Isi deskripsi dan unggah gambar maksimal ${maxMB} MB.` }, 400)
  const input = Buffer.from(await file.arrayBuffer())
  const meta = await sharp(input, { limitInputPixels: 40000000 }).metadata()
  if (!['png', 'jpeg', 'webp', 'avif', 'heif'].includes(meta.format || '') || !meta.width || !meta.height) return json({ error: 'Gunakan gambar PNG, JPEG, WebP, atau AVIF.' }, 400)
  const buffer = await sharp(input, { limitInputPixels: 40000000 }).rotate().webp({ quality: 88 }).toBuffer({ resolveWithObject: true })
  const filename = `${randomUUID()}.webp`
  let blobURL: string | undefined
  if (process.env.BLOB_READ_WRITE_TOKEN && (process.env.VERCEL === '1' || process.env.USE_VERCEL_BLOB === 'true')) {
    const blob = await put(`studio/${filename}`, buffer.data, { access: 'public', addRandomSuffix: false, contentType: 'image/webp' }); blobURL = blob.url
  } else {
    const directory = path.resolve(process.env.MEDIA_DIR || 'media'); await fs.mkdir(directory, { recursive: true }); await fs.writeFile(path.join(directory, filename), buffer.data)
  }
  const doc = await saveDocument('media', { alt, caption: String(form.get('caption') || ''), filename, mimeType: 'image/webp', filesize: buffer.data.length, width: buffer.info.width, height: buffer.info.height, url: `/api/media/file/${filename}`, ...(blobURL ? { blobURL } : {}) }, actor)
  invalidatePublicContent('media')
  return json({ doc }, 201)
}
async function mediaFile(filename: string, request: Request) {
  if (!/^[a-zA-Z0-9._-]+$/.test(filename)) return json({ error: 'Gambar tidak ditemukan.' }, 404)
  const resolved = await publicMediaFile(filename)
  if (!resolved) return json({ error: 'Gambar tidak ditemukan.' }, 404)
  const { media, source } = resolved
  if (source) return new Response(null, { status: 307, headers: { Location: source, 'Cache-Control': 'public,max-age=300', 'X-Content-Type-Options': 'nosniff' } })
  const filepath = path.join(path.resolve(process.env.MEDIA_DIR || 'media'), filename)
  const size = (await fs.stat(filepath)).size
  const range = mediaByteRange(request.headers.get('range'), size)
  if (range === 'invalid') return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}`, 'Accept-Ranges': 'bytes' } })
  const headers: Record<string, string> = { 'Content-Type': String(media.mimeType || 'image/webp'), 'Content-Length': String(range ? range.end - range.start + 1 : size), 'Accept-Ranges': 'bytes', 'Cache-Control': 'public,max-age=86400,immutable', 'X-Content-Type-Options': 'nosniff' }
  if (range) headers['Content-Range'] = `bytes ${range.start}-${range.end}/${size}`
  const stream = request.method === 'HEAD' ? null : Readable.toWeb(createReadStream(filepath, range || undefined)) as ReadableStream<Uint8Array>
  return new Response(stream, { status: range ? 206 : 200, headers })
}
export async function studioAPI(request: Request, segments: string[]) {
  try {
    const method = request.method
    if (!['GET', 'HEAD'].includes(method) && !sameOrigin(request)) return json({ error: 'Asal permintaan tidak diizinkan.' }, 403)
    const [collection, action, extra] = segments
    if (collection === 'users' && action === 'login' && method === 'POST') return await login(request)
    if (collection === 'media' && action === 'file' && extra && ['GET', 'HEAD'].includes(method)) return await mediaFile(extra, request)
    const user = await currentUser()
    if (collection === 'users' && action === 'me' && method === 'GET') return user ? json({ user }) : json({ error: 'Silakan masuk.' }, 401)
    if (collection === 'users' && action === 'logout' && method === 'POST') {
      const jar = await cookies(); const token = jar.get(sessionCookie)?.value
      if (token) await pool.query(`DELETE FROM studio_sessions WHERE hash=$1`, [tokenHash(token)])
      jar.delete(sessionCookie); return json({ success: true })
    }
    if (collection === 'globals' && ['site-settings', 'navigation'].includes(action)) {
      if (method === 'GET') return json(await getGlobal(action as 'site-settings', !user || new URL(request.url).searchParams.get('depth') !== '0'))
      if (!user) return json({ error: 'Silakan masuk.' }, 401)
      if (method !== 'POST' && method !== 'PATCH') return json({ error: 'Metode tidak didukung.' }, 405)
      const body = JSON.parse(Buffer.from(await readBody(request, 512000)).toString())
      const parsed = validateDocument(action, body, true); if (parsed.error) return json({ error: parsed.error }, 400)
      const result = await pool.query(`UPDATE studio_globals SET data=data||$2::jsonb,revision=revision+1,updated_at=now() WHERE slug=$1 AND ($3::integer IS NULL OR revision=$3) RETURNING data,revision`, [action, parsed.data, body.revision || null])
      if (result.rowCount) invalidatePublicContent(action)
      return result.rowCount ? json({ ...result.rows[0].data, revision: result.rows[0].revision }) : json({ error: 'Konten telah diubah. Muat ulang sebelum menyimpan.' }, 409)
    }
    if (!studioSchema[collection] || studioSchema[collection].global) return json({ error: 'Halaman tidak ditemukan.' }, 404)
    if (studioSchema[collection].private && !user) return json({ error: 'Silakan masuk.' }, 401)
    if (collection === 'users') {
      if (!user || user.role !== 'admin') return json({ error: 'Hanya administrator yang dapat mengelola pengguna.' }, 403)
      if (method === 'GET') { const docs = (await pool.query(`SELECT id,name,email,role,created_at FROM studio_users ORDER BY id`)).rows.map(d => ({ ...d, id: Number(d.id) })); return json(action ? docs.find(d => d.id === Number(action)) || {} : { docs, totalDocs: docs.length }) }
      const id = action ? Number(action) : undefined
      if (action && (!Number.isSafeInteger(id) || Number(id) < 1)) return json({ error: 'ID tidak valid.' }, 400)
      if (id === user.id && method === 'DELETE') return json({ error: 'Akun yang sedang digunakan tidak dapat dihapus.' }, 400)
      const body = method === 'DELETE' ? {} : JSON.parse(Buffer.from(await readBody(request, 10000)).toString())
      if (id === user.id && body.role && body.role !== 'admin') return json({ error: 'Administrator aktif tidak dapat menurunkan hak akses sendiri.' }, 400)
      if (method === 'DELETE') { await pool.query(`DELETE FROM studio_users WHERE id=$1`, [id]); return json({ success: true }) }
      const fields = z.object({ name: z.string().min(2).max(100), email: z.email().max(254), role: z.enum(['admin', 'editor']), password: z.string().min(12).max(256).optional() }).safeParse({ ...body, password: body.password || undefined })
      if (!fields.success || !id && !fields.data.password) return json({ error: 'Periksa nama, email, peran, dan password (minimal 12 karakter).' }, 400)
      const d = fields.data
      const hash = d.password ? await hashPassword(d.password) : null
      const result = id ? await pool.query(`UPDATE studio_users SET name=$2,email=$3,role=$4,password_hash=COALESCE($5,password_hash),legacy_salt=CASE WHEN $5 IS NOT NULL THEN NULL ELSE legacy_salt END WHERE id=$1 RETURNING id,name,email,role`, [id, d.name, d.email.toLowerCase(), d.role, hash]) : await pool.query(`INSERT INTO studio_users(name,email,role,password_hash) VALUES($1,$2,$3,$4) RETURNING id,name,email,role`, [d.name, d.email.toLowerCase(), d.role, hash])
      if (id && (hash || body.role)) await pool.query(`DELETE FROM studio_sessions WHERE user_id=$1`, [id])
      return json({ doc: result.rows[0] }, id ? 200 : 201)
    }
    if (!contentCollections.includes(collection)) return json({ error: 'Tidak ditemukan.' }, 404)
    const id = action ? Number(action) : undefined
    if (action && (!Number.isSafeInteger(id) || Number(id) < 1)) return json({ error: 'ID tidak valid.' }, 400)
    if (method === 'GET') {
      const url = new URL(request.url)
      let docs = await listDocuments(collection, !!user, !(user && url.searchParams.get('depth') === '0'))
      for (const field of ['id', 'slug', 'title']) { const filter = url.searchParams.get(`where[${field}][equals]`); if (filter) docs = docs.filter(d => String(d[field]) === filter) }
      if (id && extra === 'revisions' && user) return json({ docs: (await pool.query(`SELECT id,data,actor,created_at FROM studio_revisions WHERE collection=$1 AND document_id=$2 ORDER BY id DESC LIMIT 20`, [collection, id])).rows })
      if (id) return docs.find(d => d.id === id) ? json(docs.find(d => d.id === id)) : json({ error: 'Konten tidak ditemukan.' }, 404)
      return json({ docs, totalDocs: docs.length })
    }
    if (!user) return json({ error: 'Silakan masuk.' }, 401)
    if (id && extra === 'unpublish' && method === 'POST' && editorialCollections.includes(collection)) {
      await pool.query(`UPDATE studio_documents SET published=NULL,data=jsonb_set(data,'{_status}','"draft"'),revision=revision+1,updated_at=now() WHERE collection=$1 AND id=$2`, [collection, id]); invalidatePublicContent(collection); return json({ success: true })
    }
    if (method === 'DELETE') {
      if (user.role !== 'admin') return json({ error: 'Hanya administrator yang dapat menghapus konten.' }, 403)
      if (!id) return json({ error: 'Pilih konten yang akan dihapus.' }, 400)
      if (collection === 'media') {
        const docs = (await pool.query(`SELECT data,published FROM studio_documents WHERE collection<>'media' UNION ALL SELECT data,NULL FROM studio_globals`)).rows
        function usesMedia(value: unknown, key = ''): boolean {
          if (['image','thumbnail','illustration','photo','heroImage','featureImage','logoWhite','logoNavy','favicon','video'].includes(key) && value === id) return true
          return Array.isArray(value) ? value.some(v => usesMedia(v)) : !!value && typeof value === 'object' && Object.entries(value).some(([k, v]) => usesMedia(v, k))
        }
        if (docs.some(d => usesMedia(d.data) || usesMedia(d.published))) return json({ error: 'Media masih digunakan. Ganti media pada konten terkait sebelum menghapus.' }, 409)
        const media = (await listDocuments('media', true, false)).find(d => d.id === id)
        if (media?.blobURL && process.env.BLOB_READ_WRITE_TOKEN) await del(String(media.blobURL))
      }
      await pool.query(`DELETE FROM studio_documents WHERE collection=$1 AND id=$2`, [collection, id]); invalidatePublicContent(collection); return json({ success: true })
    }
    if (collection === 'media' && method === 'POST' && !id) return await upload(request, user.email)
    if (!['POST', 'PATCH'].includes(method) || method === 'PATCH' && !id) return json({ error: 'Metode tidak didukung.' }, 405)
    if (collection === 'contact-submissions' && !id) return json({ error: 'Gunakan formulir konsultasi.' }, 405)
    const body = JSON.parse(Buffer.from(await readBody(request, 512000)).toString())
    const previous = id ? (await listDocuments(collection, true, false)).find(d => d.id === id) : null
    if (id && !previous) return json({ error: 'Konten tidak ditemukan.' }, 404)
    const candidate = collection === 'contact-submissions' ? { ...previous, status: body.status } : { ...previous, ...body }
    const parsed = validateDocument(collection, candidate)
    if (parsed.error) return json({ error: parsed.error }, 400)
    if (collection === 'video-projects') {
      for (const [field, prefix] of [['video', 'video/'], ['thumbnail', 'image/']]) {
        const mediaId = parsed.data?.[field]
        if (!mediaId) continue
        const media = (await pool.query(`SELECT data FROM studio_documents WHERE collection='media' AND id=$1`, [mediaId])).rows[0]?.data
        if (!media || !String(media.mimeType || '').startsWith(prefix)) return json({ error: field === 'video' ? 'Pilih file video dari Media.' : 'Pilih gambar sampul dari Media.' }, 400)
      }
    }
    const doc = await saveDocument(collection, collection === 'contact-submissions' ? { status: parsed.data?.status } : parsed.data!, user.email, id, body.revision)
    invalidatePublicContent(collection)
    return json({ doc }, id ? 200 : 201)
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    if (message === 'CONFLICT') return json({ error: 'Konten diubah oleh pengguna lain. Muat ulang sebelum menyimpan.' }, 409)
    if (message === 'TOO_LARGE') return json({ error: 'Ukuran unggahan terlalu besar.' }, 413)
    if ((error as { code?: string }).code === '23505') return json({ error: 'Slug atau email sudah digunakan.' }, 409)
    if (error instanceof SyntaxError || message.includes('unsupported image') || message.includes('Input buffer')) return json({ error: 'Format data atau gambar tidak valid.' }, 400)
    console.error('Studio request failed.', { category: error instanceof Error ? error.name : 'unknown' })
    return json({ error: 'Perubahan belum tersimpan. Silakan coba lagi.' }, 503)
  }
}
