import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { test, expect, request as requestFactory } from '@playwright/test'

test('CMS native video upload, byte seeking, publish, playback and unpublish', async ({ page, context }) => {
  test.setTimeout(180_000)
  const baseURL = process.env.TEST_BASE_URL || 'http://localhost:3000'
  test.skip(!baseURL.includes('localhost') && !baseURL.includes('127.0.0.1'), 'Local storage integration test only')
  await context.setExtraHTTPHeaders({ Origin: baseURL })
  const request = page.request
  const anonymous = await requestFactory.newContext({ baseURL })
  let mediaId: number | undefined, projectId: number | undefined
  try {
    expect((await anonymous.get('/api/media/video-upload')).status()).toBe(401)
    const login = await request.post('/api/users/login', { data: { email: process.env.BOOTSTRAP_ADMIN_EMAIL, password: process.env.BOOTSTRAP_ADMIN_PASSWORD } })
    expect(login.status()).toBe(200)
    expect((await (await request.get('/api/media/video-upload')).json()).direct).toBe(false)
    const invalid = await request.post('/api/media/video-upload/local', { headers: { 'Content-Type': 'video/mp4', 'X-Upload-Alt': 'Invalid fixture' }, data: Buffer.from('This is not a video') })
    expect(invalid.status()).toBe(400)
    const bytes = await readFile('public/videos/wasla-sales-reel.mp4')
    const upload = await request.post('/api/media/video-upload/local', { headers: { 'Content-Type': 'video/mp4', 'X-Upload-Alt': encodeURIComponent('QA video upload') }, data: bytes })
    expect(upload.status()).toBe(201)
    const media = (await upload.json()).doc
    mediaId = media.id
    const part = await anonymous.get(media.url, { headers: { Range: 'bytes=0-63' } })
    expect(part.status()).toBe(206)
    expect(part.headers()['content-range']).toBe(`bytes 0-63/${bytes.length}`)
    expect((await part.body()).equals(bytes.subarray(0, 64))).toBe(true)
    expect((await anonymous.get(media.url, { headers: { Range: `bytes=${bytes.length}-` } })).status()).toBe(416)
    const header = await anonymous.head(media.url)
    expect(header.status()).toBe(200)
    expect(header.headers()['content-length']).toBe(String(bytes.length))
    const slug = `qa-native-${randomUUID()}`
    const created = await request.post('/api/video-projects', { data: { title: 'QA native video playback', slug, category: 'QA', channel: 'Pilihan', provider: 'upload', video: mediaId, _status: 'draft' } })
    expect(created.status()).toBe(201)
    projectId = (await created.json()).doc.id
    expect((await (await anonymous.get(`/api/video-projects?where[slug][equals]=${slug}`)).json()).docs).toHaveLength(0)
    expect((await request.patch(`/api/video-projects/${projectId}`, { data: { _status: 'published' } })).status()).toBe(200)
    await page.addInitScript(() => sessionStorage.setItem('wasla:intro:seen', '1'))
    await page.goto('/portofolio')
    const skip = page.getByRole('button', { name: 'Lewati intro', exact: true })
    if (await skip.isVisible()) await skip.click()
    await page.getByRole('button', { name: 'Putar QA native video playback', exact: true }).click()
    const dialog = page.getByRole('dialog', { name: 'QA native video playback', exact: true })
    const video = dialog.locator('video')
    await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.readyState)).toBeGreaterThanOrEqual(2)
    await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime)).toBeGreaterThan(0)
    expect(await video.evaluate((node: HTMLVideoElement) => node.muted)).toBe(false)
    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
    expect((await request.delete(`/api/media/${mediaId}`)).status()).toBe(409)
    await request.post(`/api/video-projects/${projectId}/unpublish`)
    expect((await (await anonymous.get(`/api/video-projects?where[slug][equals]=${slug}`)).json()).docs).toHaveLength(0)
  } finally {
    if (projectId) await request.delete(`/api/video-projects/${projectId}`)
    if (mediaId) await request.delete(`/api/media/${mediaId}`)
    await anonymous.dispose()
  }
})
