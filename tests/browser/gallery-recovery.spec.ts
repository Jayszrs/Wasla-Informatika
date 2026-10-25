import { test, expect } from '@playwright/test'

test('gallery recovers after a failed enlarged image is reopened', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/portofolio/catatan-mengaji-bani-saleh')
  const open = page.getByRole('link', { name: /^Perbesar gambar 1:/ })
  const source = await open.getAttribute('href')
  let failNext = true
  await page.route('**/_next/image?**', async route => {
    const url = new URL(route.request().url())
    if (failNext && url.searchParams.get('url') === source && Number(url.searchParams.get('w')) >= 1200) {
      failNext = false
      return route.fulfill({ status: 503, body: 'Temporary image failure', headers: { 'Cache-Control': 'no-store' } })
    }
    await route.continue()
  })
  await open.click()
  const dialog = page.getByRole('dialog')
  const recovery = dialog.getByRole('link', { name: 'Gambar belum termuat. Buka gambar asli' })
  await expect(recovery).toBeVisible()
  await expect(recovery).toHaveAttribute('href', source!)
  await page.keyboard.press('Escape')
  await open.click()
  await expect.poll(() => dialog.locator('img').evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  await expect(recovery).toHaveCount(0)
  await page.keyboard.press('ArrowRight')
  await expect(dialog.locator('.gallery-controls p')).toContainText('2 / 3')
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
})
