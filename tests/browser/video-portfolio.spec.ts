import { expect, test } from '@playwright/test'

async function enter(page: import('@playwright/test').Page, path = '/portofolio') {
  await page.goto(path)
  const skip = page.getByRole('button', { name: path.startsWith('/en') ? 'Skip intro' : 'Lewati intro', exact: true })
  await expect(skip).toBeVisible()
  await skip.click()
}
async function playerFixtures(page: import('@playwright/test').Page) {
  // Provider fixtures verify our interaction and cleanup, not provider playback availability.
  await page.route('https://www.youtube.com/iframe_api', route => route.abort())
  for (const url of ['https://www.youtube-nocookie.com/embed/**', 'https://drive.google.com/file/d/*/preview', 'https://www.tiktok.com/player/v1/**']) await page.route(url, route => route.fulfill({ contentType: 'text/html', body: '<html><body>Provider interaction fixture</body></html>' }))
}

test('all selected films open full viewport players, clean up and restore keyboard focus', async ({ page }) => {
  await playerFixtures(page)
  await enter(page)
  const portfolio = page.locator('#video-portfolio')
  await expect(portfolio.locator('iframe')).toHaveCount(0)
  for (const [title, id] of [
    ['A Day at World Stamp Championship', 'XV0e0PkjDPc'], ['SEPTIHAN', 'K0dGYfzaAX0'],
    ['Seventeen', 'mnIo2zrQwRk'], ['Sejarah Singkat Universitas Bani Saleh', 'hOLDG50DHCI'],
    ['Company Profile FTID', '1Vtk5hSiIk9hXtsa2feURucZyPy4DLxri'],
  ]) {
    const opener = portfolio.getByRole('button', { name: 'Putar ' + title, exact: true })
    await opener.click()
    const modal = portfolio.getByRole('dialog', { name: title, exact: true })
    await expect(modal).toBeVisible()
    expect(await modal.locator('iframe').getAttribute('src')).toContain(id)
    const box = (await modal.boundingBox())!
    expect(box.x).toBe(0)
    expect(box.y).toBe(0)
    expect(box.width).toBe(page.viewportSize()!.width)
    await expect(modal.getByRole('link', { name: 'Sumber asli', exact: true })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(portfolio.locator('iframe')).toHaveCount(0)
    await expect(opener).toBeFocused()
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
  }
})

test('each account has a real multi-item gallery with video or photo viewing', async ({ page }) => {
  await playerFixtures(page)
  await page.setViewportSize({ width: 390, height: 844 })
  await enter(page)
  const portfolio = page.locator('#video-portfolio')
  for (const [channel, count, type] of [['Fulday', 5, 'video'], ['TikTok @jayszrss', 5, 'video'], ['Cimuning PPKHMTI', 4, 'image'], ['Growthfin', 4, 'image']] as const) {
    await portfolio.getByRole('tab', { name: new RegExp(channel) }).click()
    const panel = portfolio.getByRole('tabpanel', { name: channel, exact: true })
    await expect(panel.locator('article')).toHaveCount(count)
    const first = panel.locator('article').first().getByRole('button').first()
    await first.click()
    const modal = page.getByRole('dialog')
    await expect(modal).toBeVisible()
    if (type === 'image') {
      await expect(modal.locator('iframe')).toHaveCount(0)
      const image = modal.locator('img').first()
      await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0)
    } else await expect(modal.locator('iframe')).toHaveCount(1)
    const source = await modal.getByRole('link', { name: 'Sumber asli', exact: true }).getAttribute('href')
    const address = new URL(source!)
    expect(address.hostname).toBe(type === 'image' ? 'www.instagram.com' : channel === 'Fulday' ? 'www.youtube.com' : 'www.tiktok.com')
    expect(address.pathname).toContain(type === 'image' ? '/p/' : channel === 'Fulday' ? '/watch' : '/@jayszrss/video/')
    await modal.getByRole('button', { name: 'Tutup video', exact: true }).click()
    await expect(first).toBeFocused()
  }
  await portfolio.getByRole('tab', { name: /Fulday/ }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(portfolio.getByRole('tab', { name: /TikTok/ })).toHaveAttribute('aria-selected', 'true')
})

test('gallery stays readable at phone, tablet and desktop widths in both locales', async ({ page }) => {
  for (const [width, height, path] of [[320, 700, '/portofolio'], [820, 1180, '/portofolio'], [1440, 900, '/en/portofolio']] as const) {
    await page.setViewportSize({ width, height })
    await enter(page, path)
    const portfolio = page.locator('#video-portfolio')
    await expect(portfolio.getByRole('heading', { name: path.startsWith('/en') ? /Stories\.\s*In motion\./ : /Cerita\.\s*Dalam gerak\./ })).toBeVisible()
    await portfolio.scrollIntoViewIfNeeded()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
    for (const image of await portfolio.locator('article img').all()) {
      await image.scrollIntoViewIfNeeded()
      await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0)
    }
    await portfolio.screenshot({ path: '.local/site-review/video-gallery-' + width + '-20261029.png' })
  }
})

test('YouTube rejects are reported with retry and source instead of a dead player', async ({ page }) => {
  await playerFixtures(page)
  await page.addInitScript(() => {
    (window as unknown as { YT: unknown }).YT = { Player: class {
      constructor(_frame: unknown, config: { events: { onError: () => void } }) { setTimeout(() => config.events.onError(), 30) }
      destroy() {} playVideo() {}
    } }
  })
  await enter(page)
  await page.getByRole('button', { name: 'Putar SEPTIHAN', exact: true }).click()
  const modal = page.getByRole('dialog', { name: 'SEPTIHAN', exact: true })
  await expect(modal.getByText('Video ini belum dapat diputar di sini.', { exact: true })).toBeVisible()
  await expect(modal.getByRole('button', { name: 'Coba lagi' })).toBeVisible()
  await expect(modal.getByRole('link', { name: 'Buka video asli' })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=K0dGYfzaAX0')
})
