import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { test, expect, request as requestFactory, type Page } from '@playwright/test'

async function captureStudio(page: Page, path: string) {
  if (page.viewportSize()!.width < 992) {
    await expect(page.locator('.studio-sidebar')).toHaveAttribute('inert', '')
    await expect.poll(() => page.locator('.studio-sidebar').evaluate(node => node.getBoundingClientRect().right)).toBeLessThanOrEqual(0)
  }
  await page.evaluate(async () => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
    await document.fonts.ready
    window.scrollTo(0, 0)
  })
  await page.screenshot({ path, fullPage: true, animations: 'disabled' })
}

test('Studio media UI uploads a real video, filters picker types, saves and publishes', async ({ page, context }) => {
  test.setTimeout(180_000)
  const baseURL = process.env.TEST_BASE_URL || 'http://localhost:3000'
  const target = new URL(baseURL)
  test.skip(!['localhost', '127.0.0.1', '[::1]'].includes(target.hostname), 'This fixture only writes to a local development server')
  expect(Boolean(process.env.BOOTSTRAP_ADMIN_EMAIL && process.env.BOOTSTRAP_ADMIN_PASSWORD), 'Existing local bootstrap credentials are required').toBe(true)
  await context.setExtraHTTPHeaders({ Origin: target.origin })
  const request = page.request
  const anonymous = await requestFactory.newContext({ baseURL })
  const unique = randomUUID()
  const title = `QA Studio video ${unique}`
  const alt = `QA uploaded video ${unique}`
  const slug = `qa-studio-video-${unique}`
  const screenshots = resolve('.local/site-review')
  let mediaId: number | undefined, projectId: number | undefined

  try {
    // Authenticate without rendering or logging either credential in a form.
    const login = await request.post('/api/users/login', { data: { email: process.env.BOOTSTRAP_ADMIN_EMAIL, password: process.env.BOOTSTRAP_ADMIN_PASSWORD } })
    expect(login.status(), 'Existing local administrator can authenticate').toBe(200)
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/admin/media')
    await expect(page.getByRole('heading', { name: 'Media', exact: true })).toBeVisible()
    await page.getByLabel('Deskripsi media', { exact: true }).fill(alt)
    await page.getByLabel('Pilih file', { exact: true }).setInputFiles(resolve('public/videos/wasla-sales-reel.mp4'))
    const uploaded = page.waitForResponse(response => response.url().endsWith('/api/media/video-upload/local') && response.request().method() === 'POST')
    await page.getByRole('button', { name: 'Unggah ke Media', exact: true }).click()
    const uploadResponse = await uploaded
    expect(uploadResponse.status()).toBe(201)
    // Large video requests can evict browser inspector response bodies; read the
    // persisted metadata through the authenticated API instead.
    const media = (await (await request.get('/api/media?depth=0')).json()).docs.find((asset: { alt?: string }) => asset.alt === alt)
    expect(media).toBeTruthy()
    mediaId = Number(media.id)
    expect(media.mimeType).toBe('video/mp4')
    expect(mediaId).toBeGreaterThan(0)
    const card = page.locator('.studio-media-library > a').filter({ hasText: alt })
    await expect(card).toBeVisible()
    await expect(card.locator('video')).toHaveAttribute('src', media.url)
    await page.getByLabel('Jenis media', { exact: true }).selectOption('image')
    await expect(card).toHaveCount(0)
    await page.getByLabel('Jenis media', { exact: true }).selectOption('video')
    await expect(card).toBeVisible()
    await card.locator('video').evaluate(async (node: HTMLVideoElement) => { await node.play(); node.currentTime = 1; node.pause() })
    await expect.poll(() => card.locator('video').evaluate((node: HTMLVideoElement) => node.readyState)).toBeGreaterThanOrEqual(2)
    await mkdir(screenshots, { recursive: true })
    await captureStudio(page, resolve(screenshots, 'studio-media-1440.png'))
    await page.setViewportSize({ width: 390, height: 844 })
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await captureStudio(page, resolve(screenshots, 'studio-media-390.png'))
    await card.click()
    await expect(page).toHaveURL(new RegExp(`/admin/media/${mediaId}$`))
    const preview = page.locator('video.studio-asset-preview')
    await expect(preview).toHaveAttribute('controls', '')
    await expect.poll(() => preview.evaluate((node: HTMLVideoElement) => node.readyState)).toBeGreaterThanOrEqual(1)
    expect(await preview.evaluate((node: HTMLVideoElement) => node.duration)).toBeGreaterThan(10)
    await preview.evaluate((node: HTMLVideoElement) => { node.currentTime = 2 })
    await expect.poll(() => preview.evaluate((node: HTMLVideoElement) => node.currentTime)).toBeGreaterThanOrEqual(2)

    const image = (await (await request.get('/api/media?limit=1000')).json()).docs.find((asset: { mimeType?: string }) => asset.mimeType?.startsWith('image/'))
    expect(image, 'An existing image is available to verify picker separation').toBeTruthy()
    await page.goto('/admin/video-projects/new')
    await page.getByLabel('Judul *', { exact: true }).fill(title)
    await page.getByLabel('Alamat halaman (slug) *', { exact: true }).fill(slug)
    await page.getByLabel('Jenis karya *', { exact: true }).fill('Pengujian lokal CMS')
    await page.getByLabel('Kanal / galeri *', { exact: true }).selectOption('Pilihan')
    await page.getByLabel('Format konten', { exact: true }).selectOption('video')
    await page.getByLabel('Sumber pemutaran *', { exact: true }).selectOption('upload')
    const videoPicker = page.getByLabel('File video MP4 / WebM', { exact: true })
    const imagePicker = page.getByLabel('Gambar sampul', { exact: true })
    await expect(videoPicker.locator(`option[value="${mediaId}"]`)).toHaveText(alt)
    await expect(videoPicker.locator(`option[value="${image.id}"]`)).toHaveCount(0)
    await expect(imagePicker.locator(`option[value="${mediaId}"]`)).toHaveCount(0)
    await imagePicker.selectOption(String(image.id))
    await videoPicker.selectOption(String(mediaId))
    await expect(page.locator('.studio-media-field-video video')).toHaveAttribute('src', media.url)
    await page.getByLabel('Keterangan karya', { exact: true }).fill('Fixture pengujian lokal; dihapus setelah verifikasi.')
    await page.setViewportSize({ width: 1440, height: 1000 })
    await captureStudio(page, resolve(screenshots, 'studio-video-editor-1440.png'))
    await page.setViewportSize({ width: 390, height: 844 })
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await captureStudio(page, resolve(screenshots, 'studio-video-editor-390.png'))
    const created = page.waitForResponse(response => new URL(response.url()).pathname === '/api/video-projects' && response.request().method() === 'POST')
    await page.getByRole('button', { name: 'Simpan perubahan', exact: true }).click()
    const createResponse = await created
    expect(createResponse.status()).toBe(201)
    const draft = (await createResponse.json()).doc
    projectId = Number(draft.id)
    expect(draft._status).toBe('draft')
    expect(Number(draft.video?.id || draft.video)).toBe(mediaId)
    await expect(page).toHaveURL(new RegExp(`/admin/video-projects/${projectId}$`))
    await expect(page.getByLabel('File video MP4 / WebM', { exact: true })).toHaveValue(String(mediaId))
    expect((await (await anonymous.get(`/api/video-projects?where[slug][equals]=${slug}`)).json()).docs).toHaveLength(0)
    const published = page.waitForResponse(response => new URL(response.url()).pathname === `/api/video-projects/${projectId}` && response.request().method() === 'PATCH')
    await page.getByRole('button', { name: 'Terbitkan ke website', exact: true }).click()
    expect((await published).status()).toBe(200)
    await expect(page.getByLabel('Publikasi *', { exact: true })).toHaveValue('published')
    const publicDocs = (await (await anonymous.get(`/api/video-projects?where[slug][equals]=${slug}`)).json()).docs
    expect(publicDocs).toHaveLength(1)
    expect(Number(publicDocs[0].video?.id || publicDocs[0].video)).toBe(mediaId)
    await expect(page.locator('.studio-error')).toHaveCount(0)
  } finally {
    // IDs come only from this run; existing content and user accounts are untouched.
    if (!projectId) projectId = (await (await request.get(`/api/video-projects?where[slug][equals]=${slug}&depth=0`)).json()).docs?.[0]?.id
    if (!mediaId) mediaId = (await (await request.get('/api/media?depth=0')).json()).docs?.find((asset: { alt?: string }) => asset.alt === alt)?.id
    if (projectId) expect((await request.delete(`/api/video-projects/${projectId}`)).status(), 'Remove only the created video fixture').toBe(200)
    if (mediaId) expect((await request.delete(`/api/media/${mediaId}`)).status(), 'Remove only the uploaded media fixture').toBe(200)
    await anonymous.dispose()
  }
})
