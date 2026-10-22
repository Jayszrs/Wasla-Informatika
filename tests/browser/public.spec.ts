import 'dotenv/config'
import { createHmac } from 'node:crypto'
import { Pool } from 'pg'
import { test, expect, request as requestFactory } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

test.beforeAll(async () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const key = createHmac('sha256', process.env.PAYLOAD_SECRET!).update('shared-direct').digest('hex')
  await pool.query('DELETE FROM contact_rate_limits WHERE key = $1', [key])
  await pool.end()
})

test('all public routes, metadata, portfolio filters, FAQ and service conversion', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', e => errors.push(e.message))
  for (const [path, heading] of [
    ['/', 'Software House'], ['/layanan', 'Satu kebutuhan.'], ['/layanan/website-development', 'Website Development'],
    ['/portofolio', 'Ide yang menemukan'], ['/portofolio/ruang-commerce', 'Ruang — Commerce'],
    ['/insights', 'Pikiran yang terus'], ['/insights/website-atau-aplikasi-web', 'Website atau aplikasi'],
    ['/tentang-kami', 'Menghubungkan ide.'], ['/kontak', 'Percakapan baik.'], ['/privasi', 'Informasi Anda,'],
  ]) {
    const response = await page.goto(path)
    expect(response?.status(), path).toBe(200)
    await expect(page.locator('h1')).toContainText(heading)
    const canonical = await page.locator('link[rel=canonical]').getAttribute('href')
    expect(new URL(canonical!).pathname).toBe(path)
  }
  await page.goto('/portofolio')
  await page.getByRole('button', { name: 'E-Commerce', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(1)
  await expect(page.getByRole('status')).toContainText('1 karya')
  await page.getByRole('button', { name: 'Semua', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(4)
  await page.goto('/insights')
  await page.getByRole('button', { name: 'Teknologi', exact: true }).click()
  await expect(page.locator('.post-card')).toHaveCount(1)
  await page.getByRole('button', { name: 'Semua', exact: true }).click()
  await expect(page.locator('.post-card')).toHaveCount(3)
  for (const [label, path] of [['Layanan', '/layanan'], ['Karya', '/portofolio'], ['Tentang', '/tentang-kami'], ['Insights', '/insights']]) {
    await page.getByRole('navigation', { name: 'Navigasi utama', exact: true }).getByRole('link', { name: label, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`${path}$`))
  }
  await page.getByRole('link', { name: 'Wasla Informatika, beranda', exact: true }).click()
  await expect(page).toHaveURL(/\/$/)
  await page.goto('/layanan')
  const summary = page.locator('.faq-list summary').first()
  await summary.click()
  await expect(summary.locator('..')).toHaveAttribute('open', '')
  await summary.focus(); await page.keyboard.press('Enter')
  await expect(summary.locator('..')).not.toHaveAttribute('open')
  await page.goto('/layanan/website-development')
  await page.getByRole('link', { name: 'Diskusikan kebutuhan', exact: true }).click()
  await expect(page.locator('#service')).toHaveValue('Website Development')
  await page.goto('/layanan/tidak-ada')
  await expect(page.locator('h1')).toContainText('belum ditemukan')
  expect(errors).toEqual([])
})

test('responsive, keyboard, reduced motion and visual captures', async ({ page, browser }) => {
  await mkdir('.impeccable/review', { recursive: true })
  for (const width of [1440, 1024, 768, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible()
    await page.evaluate(() => document.fonts.ready)
    const dimensions = await page.evaluate(() => ({ w: innerWidth, sw: document.documentElement.scrollWidth }))
    expect(dimensions.sw, `overflow at ${width}`).toBeLessThanOrEqual(dimensions.w)
    if (width === 1440 || width === 390) await page.screenshot({ path: `.impeccable/review/${width === 1440 ? 'desktop' : 'mobile'}.png`, fullPage: true })
    if (width <= 768) {
      const summary = page.locator('.mobile-menu summary')
      await summary.click(); await expect(page.locator('.mobile-menu')).toHaveAttribute('open', '')
      await expect(page.locator('#main')).toHaveAttribute('inert', '')
      await page.screenshot({ path: `.impeccable/review/menu-${width}.png` })
      await summary.focus(); await page.keyboard.press('Escape'); await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open')
      await expect(page.locator('#main')).not.toHaveAttribute('inert')
      await summary.focus(); await page.keyboard.press('Enter'); await page.getByRole('navigation', { name: 'Navigasi mobile' }).getByRole('link', { name: 'Layanan', exact: true }).click()
      await expect(page).toHaveURL(/\/layanan$/)
      await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open')
    }
  }
  await page.goto('/')
  await page.setViewportSize({ width: 390, height: 844 })
  await page.locator('.mobile-menu summary').click()
  await expect(page.locator('#main')).toHaveAttribute('inert', '')
  await page.setViewportSize({ width: 1440, height: 900 })
  await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open')
  await expect(page.locator('#main')).not.toHaveAttribute('inert')
  await page.goto('/kontak'); await page.keyboard.press('Tab')
  await expect(page.locator(':focus')).toBeVisible()
  const staticContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
  const staticPage = await staticContext.newPage(); await staticPage.goto('/')
  await expect(staticPage.locator('h1')).toBeVisible()
  await staticPage.locator('.mobile-menu summary').click()
  await expect(staticPage.getByRole('navigation', { name: 'Navigasi mobile' }).getByRole('link', { name: 'Layanan', exact: true })).toBeVisible()
  await staticPage.goto('/kontak')
  await expect(staticPage.locator('form')).toHaveAttribute('method', 'post')
  await staticContext.close()
})

test('hero stays readable and parallax respects viewport and reduced motion', async ({ page }) => {
  for (const width of [1440, 390]) {
    for (const reducedMotion of ['no-preference', 'reduce'] as const) {
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ reducedMotion })
      await page.goto('/')
      await expect(page.locator('h1')).toBeVisible()
      await expect(page.locator('.hero-stage-image')).toHaveAttribute('alt', /Ilustrasi workstation/)
      await expect(page.locator('.hero-concept-label')).toHaveCount(0)
      expect(await page.locator('h1').evaluate(el => getComputedStyle(el).opacity)).toBe('1')
      await page.evaluate(() => window.scrollTo(0, 600))
      const offset = () => page.locator('[data-hero-art]').evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42)
      if (width === 1440 && reducedMotion === 'no-preference') {
        await expect.poll(offset).toBeGreaterThan(0)
        expect(await offset()).toBeLessThanOrEqual(72)
      } else {
        await expect.poll(offset).toBe(0)
      }
    }
  }
})

test('contact validation, persistence and server protections', async ({ page, request }) => {
  const headers = { origin: 'http://localhost:3000' }
  await page.goto('/kontak')
  await page.getByRole('button', { name: 'Kirim pesan', exact: true }).click()
  await expect(page.locator('#name-error')).toBeVisible()
  await expect(page.locator('#consent-error')).toBeVisible()
  const invalid = await request.post('/api/contact', { headers, data: { name: 'a' } })
  expect(invalid.status()).toBe(400)
  const rejected = await request.post('/api/contact', { headers: { origin: 'https://untrusted.invalid' }, data: {} })
  expect(rejected.status()).toBe(403)
  await page.locator('#name').fill('Pengujian Browser')
  await page.locator('#email').fill('browser@example.invalid')
  await page.locator('#service').selectOption({ label: 'Website Development' })
  await page.locator('#message').fill('Pesan QA lokal untuk memeriksa penyimpanan formulir konsultasi.')
  await page.locator('#consent').check()
  let release!: () => void
  const held = new Promise<void>(resolve => { release = resolve })
  await page.route('**/api/contact', async route => { await held; await route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'Pesan belum tersimpan. Silakan coba lagi beberapa saat.' }) }) })
  await page.getByRole('button', { name: 'Kirim pesan', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Menyimpan pesan…', exact: true })).toBeDisabled()
  release()
  await expect(page.locator('.form-feedback')).toHaveAttribute('data-state', 'error')
  await expect(page.locator('#name')).toHaveValue('Pengujian Browser')
  await page.unroute('**/api/contact')
  await page.getByRole('button', { name: 'Kirim pesan', exact: true }).click()
  await expect(page.locator('.form-feedback')).toHaveAttribute('data-state', 'success')
  for (let i = 0; i < 3; i++) await request.post('/api/contact', { headers, data: {} })
  const rate = await request.post('/api/contact', { headers, data: {} })
  expect(rate.status()).toBe(429)
  expect(rate.headers()['retry-after']).toBe('900')
  const direct = await request.post('/api/contact-submissions', { data: { name: 'Unauthorized' } })
  expect([401, 403]).toContain(direct.status())
  const privateRead = await request.get('/api/contact-submissions')
  expect([401, 403]).toContain(privateRead.status())
  const userCreate = await request.post('/api/users', { data: { email: 'intruder@example.invalid', password: 'LongTestPassword123!', role: 'admin', name: 'Unauthorized' } })
  expect([401, 403]).toContain(userCreate.status())
  const preview = await request.get('/preview?collection=services&id=1')
  expect([200, 404]).toContain(preview.status())
  const previewBody = await preview.text()
  expect(previewBody).toContain('Halaman ini belum ditemukan.')
  expect(previewBody).not.toContain('Preview internal — konten draft')
  const firstUser = await request.post('/api/users/first-register', { data: { email: 'intruder@example.invalid', password: 'LongTestPassword123!', role: 'admin', name: 'Unauthorized' } })
  expect(firstUser.status()).toBe(403)
  const admin = await requestFactory.newContext({ baseURL: process.env.TEST_BASE_URL || 'http://localhost:3000', extraHTTPHeaders: { Origin: 'http://localhost:3000' } })
  try {
    await admin.post('/api/users/login', { data: { email: process.env.BOOTSTRAP_ADMIN_EMAIL, password: process.env.BOOTSTRAP_ADMIN_PASSWORD } })
    const saved = await admin.get('/api/contact-submissions?where[email][equals]=browser@example.invalid')
    const docs = (await saved.json()).docs
    expect(docs.length).toBeGreaterThan(0)
    expect(docs.some((d: { message: string }) => d.message.includes('Pesan QA lokal'))).toBe(true)
    for (const doc of docs) if (doc.name === 'Pengujian Browser') await admin.delete(`/api/contact-submissions/${doc.id}`)
  } finally { await admin.dispose() }
})
