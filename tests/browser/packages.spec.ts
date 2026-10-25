import 'dotenv/config'
import { test, expect } from '@playwright/test'

test('approved packages reach consultation and native scrolling works without a page scrollbar', async ({ page }) => {
  await page.goto('/paket-website')
  await expect(page.locator('.package-row')).toHaveCount(6)
  await expect(page.locator('.package-price strong')).toHaveText([/Rp\s*5\.000\.000/, /Rp\s*8\.000\.000/, /Rp\s*10\.000\.000/, /Rp\s*750\.000/, /Rp\s*2\.000\.000/, /Rp\s*350\.000/])
  await expect(page.locator('.package-row').first()).toContainText('Tanpa CMS')
  for (const [name, service] of [['Landing Page', 'Website Development'], ['Web Application', 'Web Application'], ['Company Profile + CMS', 'Website Development'], ['Foto Wisuda & Personal', 'Fotografi & Dokumentasi'], ['Foto Wedding & Acara', 'Fotografi & Dokumentasi'], ['Video Editing', 'Video Editing']]) {
    await page.getByRole('link', { name: `Konsultasi paket ${name}`, exact: true }).click()
    await expect(page.locator('#service')).toHaveValue(service)
    await expect(page.locator('#message')).toHaveValue(new RegExp(name.replace(/[+]/g, '\\+')))
    await page.goto('/paket-website')
  }
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollbarWidth)).toBe('none')
  await page.mouse.wheel(0, 700)
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(0)
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(page.locator('.website-packages .package-row')).toHaveCount(6)
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  await expect(page.getByRole('navigation', { name: 'Layanan footer' }).getByRole('link', { name: 'Fotografi Wedding & Wisuda' })).toHaveAttribute('href', '/layanan/photography')
})

test('package prices can be saved through the authenticated CMS without changing other settings', async ({ page, context }) => {
  const base = process.env.TEST_BASE_URL || 'http://localhost:3000'
  await context.setExtraHTTPHeaders({ Origin: base })
  const login = await page.request.post('/api/users/login', { data: { email: process.env.BOOTSTRAP_ADMIN_EMAIL, password: process.env.BOOTSTRAP_ADMIN_PASSWORD } })
  expect(login.status()).toBe(200)
  const current = await (await page.request.get('/api/globals/site-settings')).json()
  const original = current.websitePackages
  const modified = original.map((plan: { slug: string; price: number }) => ({ ...plan, price: plan.slug === 'landing-page' ? 5050000 : plan.price }))
  try {
    const save = await page.request.patch('/api/globals/site-settings', { data: { websitePackages: modified, revision: current.revision } })
    expect(save.status()).toBe(200)
    await page.goto('/paket-website')
    await expect(page.locator('.package-price strong').first()).toHaveText(/Rp\s*5\.050\.000/)
  } finally {
    const latest = await (await page.request.get('/api/globals/site-settings')).json()
    const restored = await page.request.patch('/api/globals/site-settings', { data: { websitePackages: original, revision: latest.revision } })
    expect(restored.status()).toBe(200)
  }
})
