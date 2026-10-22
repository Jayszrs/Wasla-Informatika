import { test } from 'node:test'
import assert from 'node:assert/strict'
import { contactSchema, validPublicLink, validWhatsApp } from '../src/lib/validation'

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
