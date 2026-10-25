import { test, expect } from '@playwright/test'

test('creative services are published, have matching 3D objects, and reach consultation', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/layanan')
  await expect(page.locator('.service-row')).toHaveCount(13)
  for (const [slug, title, visual] of [
    ['photography', 'Fotografi & Dokumentasi', 'photography'],
    ['video-editing', 'Video Editing', 'video'],
    ['creative-editing', 'Desain Grafis & Photo Editing', 'creative'],
  ]) {
    const row = page.locator('.service-row').filter({ has: page.getByRole('heading', { name: title, exact: true }) })
    await row.scrollIntoViewIfNeeded()
    await expect(row.locator('canvas[data-service-visual]')).toHaveAttribute('data-service-visual', visual, { timeout: 30000 })
    await row.getByRole('link', { name: 'Pelajari layanan', exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`/layanan/${slug}$`))
    await expect(page.locator('.detail-body')).not.toBeEmpty()
    await page.getByRole('link', { name: 'Diskusikan kebutuhan', exact: true }).click()
    await expect(page.locator('#service')).toHaveValue(title)
    await page.goto('/layanan')
  }
  expect(errors).toEqual([])
})

test('real team portraits and real desktop/mobile project screens remain editable CMS media', async ({ page, request }) => {
  const team = (await (await request.get('/api/team')).json()).docs
  expect(team).toHaveLength(4)
  expect(team.map((member: { name: string }) => member.name)).toEqual(expect.arrayContaining(['Ahmad Suroso', 'Jaelani Surya Saputra', 'Al Hafiz Taufikur Rohman', 'Muhammad Lakchamana']))
  expect(team.every((member: { photo?: { id: number; width: number } }) => member.photo?.id && member.photo.width >= 800)).toBe(true)
  await page.goto('/')
  const portraits = page.locator('.division-portrait > img')
  await expect(portraits).toHaveCount(4)
  await portraits.first().scrollIntoViewIfNeeded()
  for (const image of await portraits.all()) await expect.poll(() => image.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  await expect(page.locator('.footer-signature-subtitle')).toHaveText('informatika')
  const projects = (await (await request.get('/api/projects')).json()).docs
  for (const project of projects) {
    await page.goto(`/portofolio/${project.slug}`)
    await expect(page.locator('.detail-visual .device-laptop img')).toHaveAttribute('src', /.+/)
    await expect(page.locator('.detail-visual .device-phone img')).toHaveAttribute('alt', `Tampilan mobile website ${project.title}`)
    await expect(page.locator('.gallery-grid .device-frame')).toHaveCount(project.gallery.length)
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/tentang-kami')
  await expect(page.locator('.division-flip-trigger')).toHaveCount(4)
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
})
