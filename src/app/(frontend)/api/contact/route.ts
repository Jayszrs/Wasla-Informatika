import { createHmac } from 'node:crypto'
import { Pool } from 'pg'
import { cms } from '@/lib/cms'
import { contactSchema } from '@/lib/validation'
import { sameOrigin } from '@/lib/studio-auth'

export const runtime = 'nodejs'
const globals = globalThis as unknown as { contactPool?: Pool }
const pool = globals.contactPool ||= new Pool({ connectionString: process.env.DATABASE_URL, max: 3, connectionTimeoutMillis: 5000 })
const json = (data: unknown, status: number, extra: Record<string, string> = {}) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store', ...extra } })

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: 'Asal permintaan tidak diizinkan.' }, 403)
  if (!request.headers.get('content-type')?.startsWith('application/json')) return json({ error: 'Format pesan tidak didukung.' }, 415)
  try {
    const identity = process.env.TRUST_PROXY === 'true' ? request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown' : 'shared-direct'
    const key = createHmac('sha256', (process.env.STUDIO_SECRET || process.env.PAYLOAD_SECRET)!).update(identity).digest('hex')
    const limited = await pool.query<{ hits: number }>(`INSERT INTO contact_rate_limits (key, hits, reset_at) VALUES ($1, 1, NOW() + INTERVAL '15 minutes')
      ON CONFLICT (key) DO UPDATE SET hits = CASE WHEN contact_rate_limits.reset_at < NOW() THEN 1 ELSE contact_rate_limits.hits + 1 END,
      reset_at = CASE WHEN contact_rate_limits.reset_at < NOW() THEN NOW() + INTERVAL '15 minutes' ELSE contact_rate_limits.reset_at END RETURNING hits`, [key])
    if (limited.rows[0].hits > 5) return json({ error: 'Terlalu banyak percobaan. Silakan coba lagi dalam 15 menit.' }, 429, { 'Retry-After': '900' })
    const reader = request.body?.getReader()
    if (!reader) return json({ error: 'Pesan kosong.' }, 400)
    const chunks: Uint8Array[] = []
    let size = 0
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > 16_384) { await reader.cancel(); return json({ error: 'Pesan terlalu panjang.' }, 413) }
      chunks.push(value)
    }
    let input: unknown
    try { input = JSON.parse(Buffer.concat(chunks).toString('utf8')) } catch { return json({ error: 'Format pesan tidak valid.' }, 400) }
    const parsed = contactSchema.safeParse(input)
    if (!parsed.success) return json({ error: 'Periksa kembali data yang diisi.', fields: parsed.error.flatten().fieldErrors }, 400)
    const store = await cms()
    if (parsed.data.service !== 'Belum yakin, mari diskusikan') {
      const service = await store.count({ collection: 'services', where: { title: { equals: parsed.data.service } }, overrideAccess: false })
      if (!service.totalDocs) return json({ error: 'Pilih layanan yang tersedia.', fields: { service: ['Layanan ini belum tersedia. Pilih kembali.'] } }, 400)
    }
    const { website: _honeypot, recipient, ...data } = parsed.data
    if (recipient) {
      const contacts = await store.find({ collection: 'team', where: { id: { equals: recipient } }, limit: 1, overrideAccess: false })
      const person = contacts.docs[0]
      if (!person || !person.socials?.some(s => /^https:\/\/wa\.me\/[1-9]\d{8,14}$/.test(s.url || ''))) return json({ error: 'Pilih kontak yang tersedia.', fields: { recipient: ['Kontak belum tersedia. Pilih kembali.'] } }, 400)
      data.message = `Tujuan: ${person.name} — ${person.role}\n\n${data.message}`
    }
    await store.create({ collection: 'contact-submissions', overrideAccess: true, data: { ...data, status: 'baru' } })
    return json({ success: true, message: 'Pesan Anda telah tersimpan. Tim Wasla dapat meninjaunya melalui panel admin.' }, 201)
  } catch {
    console.error('Contact persistence unavailable.')
    return json({ error: 'Pesan belum tersimpan. Silakan coba lagi beberapa saat.' }, 503)
  }
}
