import { test } from 'node:test'
import assert from 'node:assert/strict'
import { contactSchema, validPublicLink, validWhatsApp } from '../src/shared/validation'
import { whatsappMessage, linkedinProfile } from '../src/shared/contacts'
import { databaseConnectionString } from '../src/backend/database-connection'
import { publicBlobSource, mediaSource } from '../src/shared/media'
import { expand, findMediaByFilename } from '../src/backend/content'
import { pool } from '../src/backend/database'
import { websitePackages, packageHighlights } from '../src/shared/website-packages'
import { validateDocument } from '../src/backend/content-validation'

test('package scope follows CMS edits and never retains stale default inclusions', () => {
  const original = websitePackages[0]
  assert.equal(packageHighlights(original).length, 3)
  assert.deepEqual(packageHighlights({ ...original, description: 'Kebutuhan baru yang ditetapkan editor.' }), [original.cms])
  const edited = { ...original, features: [{ item: 'Rincian dari editor' }, { item: 'Rincian dari editor' }] }
  assert.deepEqual(packageHighlights(edited), ['Rincian dari editor'])
  assert.deepEqual(packageHighlights({ ...original, features: [] }), [original.cms])
  const result = validateDocument('site-settings', { websitePackages: [edited] }, true)
  assert.equal(result.error, undefined)
  assert.match(JSON.stringify(result.data), /Rincian dari editor/)
})

test('media CDN sources only allow credential-free HTTPS Vercel Blob origins', () => {
  assert.equal(publicBlobSource('https://store.public.blob.vercel-storage.com/studio/photo.webp'), 'https://store.public.blob.vercel-storage.com/studio/photo.webp')
  for (const source of [null, '/api/media/file/photo.webp', 'http://store.public.blob.vercel-storage.com/a', 'https://store.public.blob.vercel-storage.com.evil.invalid/a', 'https://user:pass@store.public.blob.vercel-storage.com/a', 'javascript:alert(1)']) assert.equal(publicBlobSource(source), undefined)
  assert.equal(mediaSource('https://wasla.my.id/api/media/file/photo.webp'), '/api/media/file/photo.webp')
  assert.equal(mediaSource('https://store.public.blob.vercel-storage.com/a'), 'https://store.public.blob.vercel-storage.com/a')
})

test('media expansion reads only referenced IDs, skips text-only content, and parameterizes filename lookup', async () => {
  const originalQuery = pool.query
  const queries: { sql: string; values: unknown[] }[] = []
  pool.query = (async (sql: string, values: unknown[]) => {
    queries.push({ sql, values })
    return { rows: [{ id: '12', data: { filename: 'photo.webp', alt: 'Portrait', url: '/api/media/file/photo.webp' } }] }
  }) as typeof pool.query
  try {
    const plain = { title: 'Text only', socials: [{ label: 'Website' }] }
    assert.deepEqual(await expand(plain), plain)
    assert.equal(queries.length, 0)
    const expanded = await expand({ photo: 12, gallery: [{ image: 12 }, { image: 99 }], order: 77 })
    assert.equal(queries.length, 1)
    assert.match(queries[0].sql, /id=ANY\(\$1::bigint\[\]\)/)
    assert.deepEqual(queries[0].values, [[12, 99]])
    assert.equal((expanded.photo as unknown as { id: number }).id, 12)
    assert.equal(expanded.gallery[1].image, null)
    assert.equal(expanded.order, 77)
    await findMediaByFilename("photo.webp' OR true--")
    assert.deepEqual(queries[1].values, ["photo.webp' OR true--"])
    assert.doesNotMatch(queries[1].sql, /OR true/)
  } finally { pool.query = originalQuery }
})

test('database TLS mode is explicit without weakening certificate verification', () => {
  for (const mode of ['prefer', 'require', 'verify-ca', 'verify-full']) assert.equal(new URL(databaseConnectionString(`postgresql://user:password@db.example.invalid/db?sslmode=${mode}`)!).searchParams.get('sslmode'), 'verify-full')
  assert.equal(new URL(databaseConnectionString('postgresql://localhost/db?sslmode=disable')!).searchParams.get('sslmode'), 'disable')
  assert.equal(new URL(databaseConnectionString('postgresql://localhost/db?sslmode=require&uselibpqcompat=true')!).searchParams.get('sslmode'), 'require')
  assert.equal(databaseConnectionString(undefined), undefined)
})

const valid = { name: 'Penguji Lokal', email: 'test@example.invalid', company: '', phone: '+62 812 0000', service: 'Website Development', message: 'Pesan pengujian yang cukup panjang.', consent: true, website: '' }
test('contact: validates required consent, email, message and honeypot', () => {
  assert.equal(contactSchema.safeParse(valid).success, true)
  for (const bad of [{ consent: false }, { email: 'invalid' }, { message: 'pendek' }, { website: 'spam' }, { name: '' }, { phone: '<script>' }]) {
    assert.equal(contactSchema.safeParse({ ...valid, ...bad }).success, false)
  }
  assert.equal(contactSchema.safeParse({ ...valid, message: 'x'.repeat(5001) }).success, false)
})
test('contact: trims and bounds data', () => {
  const parsed = contactSchema.parse({ ...valid, name: '  Penguji  ', extra: '<script>' })
  assert.equal(parsed.name, 'Penguji')
  assert.equal('extra' in parsed, false)
})
test('public links and WhatsApp reject unsafe or invented formats', () => {
  for (const link of ['javascript:alert(1)', '//evil.invalid', '/\\evil.invalid', 'http://insecure.invalid']) assert.equal(validPublicLink(link), false)
  assert.equal(validPublicLink('/layanan/website-development'), true)
  assert.equal(validPublicLink('https://example.invalid'), true)
  assert.equal(linkedinProfile('https://www.linkedin.com/in/jayszrs/?isSelfProfile=true'), 'https://www.linkedin.com/in/jayszrs/')
  for (const url of ['javascript:alert(1)', 'https://linkedin.com.evil.invalid/in/jay', 'https://user:password@linkedin.com/in/jay', 'https://www.linkedin.com/company/test', 'http://linkedin.com/in/jay']) assert.equal(linkedinProfile(url), undefined)
  assert.equal(validWhatsApp('6281234567890'), true)
  for (const number of ['', '+6281234567890', '08123456789', 'abc']) assert.equal(validWhatsApp(number), false)
})
test('WhatsApp summary encodes user text and validates recipient identifiers', () => {
  const href = whatsappMessage({ id: '1', name: 'Penguji', role: 'Web Developer', phone: '+6281234567890', href: 'https://wa.me/6281234567890' }, { name: 'Nama & Rekan', email: 'test@example.invalid', service: 'Website Development', message: 'Baris satu\nBaris dua & detail?' })
  const url = new URL(href)
  assert.equal(url.pathname, '/6281234567890')
  assert.match(url.searchParams.get('text')!, /Nama & Rekan/)
  assert.match(url.searchParams.get('text')!, /Baris satu\nBaris dua & detail\?/)
  for (const recipient of ['javascript:alert(1)', '-1', '2147483648', '999999999999999999']) assert.equal(contactSchema.safeParse({ ...valid, recipient }).success, false)
})
