import { test, expect } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

test.use({ storageState: process.env.TEST_STORAGE_STATE })

test('reference pricing has category tabs, aligned cards, and keyboard-operable details', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1080 })
  await page.goto('/paket-website#paket-layanan')
  const tabs = page.getByRole('tablist', { name: 'Kategori paket layanan' })
  await expect(tabs.getByRole('tab')).toHaveCount(3)
  await expect(tabs.getByRole('tab', { selected: true })).toHaveText('Website & aplikasi')
  const visibleCards = page.locator('.package-card:visible')
  await expect(visibleCards).toHaveCount(3)
  const geometry = await visibleCards.evaluateAll(cards => cards.map(card => {
    const price = card.querySelector('strong')!.getBoundingClientRect()
    const action = card.querySelector('a')!.getBoundingClientRect()
    return { priceY: price.y, actionY: action.y, background: getComputedStyle(card).backgroundColor }
  }))
  expect(Math.max(...geometry.map(item => item.priceY)) - Math.min(...geometry.map(item => item.priceY))).toBeLessThan(2)
  expect(Math.max(...geometry.map(item => item.actionY)) - Math.min(...geometry.map(item => item.actionY))).toBeLessThan(2)
  expect(geometry.every(item => item.background === 'rgb(255, 255, 255)')).toBe(true)
  const summary = visibleCards.first().locator('summary')
  await summary.focus()
  await page.keyboard.press('Enter')
  await expect(visibleCards.first().locator('details')).toHaveAttribute('open', '')
  await expect(visibleCards.first().locator('details')).toContainText('Domain, hosting')
  await page.keyboard.press('Enter')
  await expect(visibleCards.first().locator('details')).not.toHaveAttribute('open')
  await tabs.getByRole('tab', { name: 'Website & aplikasi', exact: true }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(tabs.getByRole('tab', { name: 'Fotografi', exact: true })).toBeFocused()
  await expect(visibleCards).toHaveCount(2)
  await expect(visibleCards.first()).toContainText('Mulai dari')
  await page.keyboard.press('End')
  await expect(visibleCards).toHaveCount(1)
  await expect(visibleCards).toContainText('Video Editing')
  await page.keyboard.press('ArrowRight')
  await expect(tabs.getByRole('tab', { name: 'Website & aplikasi', exact: true })).toBeFocused()
  await page.keyboard.press('ArrowLeft')
  await expect(tabs.getByRole('tab', { name: 'Video editing', exact: true })).toBeFocused()
  await page.keyboard.press('Home')
  await expect(visibleCards).toHaveCount(3)
})

test('all categories fit desktop, tablet, and mobile with useful touch controls', async ({ page }) => {
  await mkdir('.local/pricing-review', { recursive: true })
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  for (const width of [1440, 1024, 768, 390]) {
    await page.setViewportSize({ width, height: 1080 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/paket-website#paket-layanan')
    await page.evaluate(() => document.fonts.ready)
    for (const category of ['Website & aplikasi', 'Fotografi', 'Video editing']) {
      const tab = page.getByRole('tab', { name: category, exact: true })
      await tab.click()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${category} at ${width}`).toBe(true)
      expect((await tab.boundingBox())!.height).toBeGreaterThanOrEqual(44)
      for (const card of await page.locator('.package-card:visible').all()) {
        const price = await card.locator('strong').boundingBox()
        const bounds = await card.boundingBox()
        expect(price!.x + price!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width)
        expect((await card.getByRole('link').boundingBox())!.height).toBeGreaterThanOrEqual(44)
      }
      if (width === 1440 || width === 390) await page.locator('.website-packages').screenshot({ path: `.local/pricing-review/${width}-${category === 'Website & aplikasi' ? 'website' : category === 'Fotografi' ? 'photography' : 'video'}.png` })
    }
  }
  expect(errors).toEqual([])
})

test('homepage uses the same category cards and preserves package consultation', async ({ page }) => {
  await page.goto('/#paket-layanan')
  await expect(page.locator('.website-packages .package-card:visible')).toHaveCount(3)
  await page.getByRole('tab', { name: 'Fotografi', exact: true }).click()
  await expect(page.locator('.website-packages .package-card:visible')).toHaveCount(2)
  await page.getByRole('link', { name: 'Konsultasi paket Foto Wedding & Acara', exact: true }).click()
  await expect(page.locator('#service')).toHaveValue('Fotografi & Dokumentasi')
  await expect(page.locator('#message')).toHaveValue(/Foto Wedding & Acara/)
})

test('all package content remains readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ baseURL: test.info().project.use.baseURL, javaScriptEnabled: false, storageState: process.env.TEST_STORAGE_STATE })
  try {
    const page = await context.newPage()
    await page.goto('/paket-website')
    await expect(page.locator('.package-card:visible')).toHaveCount(6)
    await expect(page.getByRole('tablist')).not.toBeVisible()
    const first = page.locator('.package-card').first()
    await first.locator('summary').click()
    await expect(first.locator('details')).toHaveAttribute('open', '')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  } finally { await context.close() }
})
