import { test } from 'node:test'
import assert from 'node:assert/strict'
import { contactSchema, validPublicLink, validWhatsApp } from '../src/shared/validation'
import { whatsappMessage } from '../src/shared/contacts'
import { databaseConnectionString } from '../src/backend/database-connection'

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
