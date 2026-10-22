import 'dotenv/config'
import { randomBytes } from 'node:crypto'
import { test, expect, request as requestFactory } from '@playwright/test'
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

test('CMS login, roles, drafts, publishing, media, settings and private submissions', async ({ page, context }) => {
  test.setTimeout(240_000)
  const baseURL = process.env.TEST_BASE_URL || 'http://localhost:3000'
  await context.setExtraHTTPHeaders({ Origin: baseURL })
  const request = page.request
  await page.goto('/admin/login')
  await page.locator('input[name="email"]').fill(process.env.BOOTSTRAP_ADMIN_EMAIL!)
  await page.locator('input[name="password"]').fill(process.env.BOOTSTRAP_ADMIN_PASSWORD!)
  await page.getByRole('button', { name: 'Login', exact: true }).click()
  await expect(page.getByText('Pengaturan Website', { exact: true }).first()).toBeVisible()
  await mkdir('.impeccable/review', { recursive: true })
  await page.screenshot({ path: '.impeccable/review/admin.png', fullPage: true })
  const unique = randomBytes(6).toString('hex')
  let editorId: number | undefined
  let projectId: number | undefined
  let mediaId: number | undefined
  let heroMediaId: number | undefined
  let previousHero: number | null = null
  let heroChanged = false
  const publicClient = await requestFactory.newContext({ baseURL })
  const editorClient = await requestFactory.newContext({ baseURL, extraHTTPHeaders: { Origin: baseURL } })
  try {
    const editorEmail = `qa-${unique}@example.invalid`
    const editorPassword = randomBytes(24).toString('base64url')
    const editorResponse = await request.post('/api/users', { data: { name: 'Akun QA lokal', email: editorEmail, password: editorPassword, role: 'editor' } })
    expect(editorResponse.status()).toBe(201)
    editorId = (await editorResponse.json()).doc.id
    const editorLogin = await editorClient.post('/api/users/login', { data: { email: editorEmail, password: editorPassword } })
    expect(editorLogin.ok()).toBe(true)
    const escalate = await editorClient.patch(`/api/users/${editorId}`, { data: { role: 'admin' } })
    expect(escalate.ok()).toBe(true)
    expect((await escalate.json()).doc.role).toBe('editor')
    const blockedUser = await editorClient.post('/api/users', { data: { name: 'Blocked', email: `blocked-${unique}@example.invalid`, password: editorPassword, role: 'admin' } })
    expect(blockedUser.status()).toBe(403)
    const png = await sharp({ create: { width: 100, height: 70, channels: 3, background: '#071a33' } }).png().toBuffer()
    const upload = await editorClient.post('/api/media', { multipart: { _payload: JSON.stringify({ alt: 'Gambar pengujian lokal, bukan aset klien' }), file: { name: `qa-${unique}.png`, mimeType: 'image/png', buffer: png } } })
    expect(upload.status()).toBe(201)
    const media = (await upload.json()).doc
    mediaId = media.id
    expect(media.alt).toContain('pengujian')
    const file = await publicClient.get(media.url)
    expect(file.status()).toBe(200)
    const invalidFile = await editorClient.post('/api/media', { multipart: { _payload: JSON.stringify({ alt: 'Invalid' }), file: { name: 'invalid.png', mimeType: 'image/png', buffer: Buffer.from('<script>invalid</script>') } } })
    expect(invalidFile.status()).toBeGreaterThanOrEqual(400)
    const created = await editorClient.post('/api/projects?draft=true', { data: {
      title: 'Konsep pengujian lokal', slug: `qa-${unique}`, category: 'QA', excerpt: 'Demonstrasi lifecycle CMS lokal.',
      challenge: 'Memastikan draft tidak terbuka untuk publik.', solution: 'Izin akses sisi server.', thumbnail: mediaId, isConcept: true, _status: 'draft',
    } })
    expect(created.status()).toBe(201)
    projectId = (await created.json()).doc.id
    let anonymous = await publicClient.get(`/api/projects?where[slug][equals]=qa-${unique}&draft=true`)
    expect((await anonymous.json()).docs).toHaveLength(0)
    await page.goto(`/preview?collection=projects&id=${projectId}`)
    await expect(page.locator('h1')).toContainText('Konsep pengujian lokal')
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', /noindex/)
    const published = await editorClient.patch(`/api/projects/${projectId}`, { data: { _status: 'published' } })
    expect(published.ok()).toBe(true)
    anonymous = await publicClient.get(`/api/projects?where[slug][equals]=qa-${unique}`)
    expect((await anonymous.json()).docs).toHaveLength(1)
    await page.goto(`/portofolio/qa-${unique}`)
    await expect(page.locator('.detail-visual img')).toHaveAttribute('alt', 'Gambar pengujian lokal, bukan aset klien')
    await expect(page.locator('.detail-visual img')).toBeVisible()
    const draftUpdate = await editorClient.patch(`/api/projects/${projectId}?draft=true`, { data: { title: 'Draft perubahan privat', _status: 'draft' } })
    expect(draftUpdate.ok()).toBe(true)
    anonymous = await publicClient.get(`/api/projects?where[slug][equals]=qa-${unique}&draft=true`)
    const visible = (await anonymous.json()).docs
    expect(visible.length === 0 || visible.every((d: { title: string }) => d.title !== 'Draft perubahan privat')).toBe(true)
    const noDelete = await editorClient.delete(`/api/projects/${projectId}`)
    expect(noDelete.status()).toBe(403)
    const privateContacts = await request.get('/api/contact-submissions')
    expect(privateContacts.ok()).toBe(true)
    const settingsResponse = await request.get('/api/globals/site-settings')
    expect(settingsResponse.ok()).toBe(true)
    const settings = await settingsResponse.json()
    previousHero = typeof settings.heroImage === 'object' ? settings.heroImage?.id || null : settings.heroImage || null
    const heroAlt = 'Gambar hero pengujian lokal'
    const heroUpload = await request.post('/api/media', { multipart: { _payload: JSON.stringify({ alt: heroAlt }), file: { name: `qa-hero-${unique}.png`, mimeType: 'image/png', buffer: png } } })
    expect(heroUpload.status()).toBe(201)
    heroMediaId = (await heroUpload.json()).doc.id
    const replaceHero = await request.post('/api/globals/site-settings', { data: { heroImage: heroMediaId } })
    expect(replaceHero.ok()).toBe(true)
    heroChanged = true
    await page.goto('/')
    await expect(page.locator('.hero-stage-image')).toHaveAttribute('alt', heroAlt)
    await expect(page.locator('.hero-stage-image')).toBeVisible()
    await expect(page.locator('.hero-concept-label')).toHaveCount(0)
    const restoreHero = await request.post('/api/globals/site-settings', { data: { heroImage: previousHero } })
    expect(restoreHero.ok()).toBe(true)
    heroChanged = false
    await page.goto('/admin/collections/services')
    await expect(page.getByRole('link', { name: 'Website Development', exact: true }).first()).toBeVisible()
  } finally {
    if (heroChanged) await request.post('/api/globals/site-settings', { data: { heroImage: previousHero } })
    if (projectId) await request.delete(`/api/projects/${projectId}`)
    if (mediaId) await request.delete(`/api/media/${mediaId}`)
    if (heroMediaId) await request.delete(`/api/media/${heroMediaId}`)
    if (editorId) await request.delete(`/api/users/${editorId}`)
    await editorClient.dispose(); await publicClient.dispose()
  }
})
