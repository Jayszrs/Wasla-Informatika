import { test, expect, type Page, type BrowserContext } from '@playwright/test'

async function protectStage(context: BrowserContext) {
  const base = process.env.TEST_BASE_URL
  const bypass = process.env.TEST_PROTECTION_BYPASS
  if (base && bypass) await context.route(`${base}/**`, route => route.continue({ headers: { ...route.request().headers(), 'x-vercel-protection-bypass': bypass } }))
}
test.beforeEach(async ({ context }) => protectStage(context))

async function skipIntroduction(page: Page, english = false) {
  const button = page.getByRole('button', { name: english ? 'Skip intro' : 'Lewati intro', exact: true })
  await expect(button).toBeVisible()
  await button.click()
  await expect(page.locator('dialog[open]')).toHaveCount(0)
}

test('intro autoplays without controls, replays and stops on dismissal', async ({ page }) => {
  await page.goto('/')
  const intro = page.getByRole('dialog', { name: 'Sekilas tentang Wasla.' })
  const film = page.locator('dialog video')
  await expect(intro).toBeVisible()
  await expect(film).toHaveAttribute('data-format', 'landscape')
  await expect.poll(() => film.evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(0)
  expect(await film.evaluate(v => (v as HTMLVideoElement).controls)).toBe(false)
  await expect(intro.locator('progress, footer, header')).toHaveCount(0)
  await expect(intro.getByRole('button')).toHaveCount(1)
  await skipIntroduction(page)
  await expect.poll(() => film.evaluate(v => (v as HTMLVideoElement).paused)).toBe(true)
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
  await page.reload()
  await skipIntroduction(page)
  const replay = page.getByRole('button', { name: 'Tonton film Wasla' })
  await replay.click()
  await expect(intro).toBeVisible()
  expect(await film.evaluate(v => (v as HTMLVideoElement).currentTime)).toBeLessThan(3)
  await page.keyboard.press('Escape')
  await expect(intro).not.toBeVisible()
  await expect(replay).toBeFocused()
  const reel = page.locator('main video')
  await reel.scrollIntoViewIfNeeded()
  await expect.poll(() => reel.evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(.1)
  expect(await reel.evaluate(v => ({ muted: (v as HTMLVideoElement).muted, controls: (v as HTMLVideoElement).controls, error: (v as HTMLVideoElement).error }))).toMatchObject({ muted: true, controls: false, error: null })
  await page.locator('.site-footer').scrollIntoViewIfNeeded()
  await expect.poll(() => reel.evaluate(v => (v as HTMLVideoElement).paused)).toBe(true)
})

test('English works across public routes, links, metadata and the consultation form without changing service values', async ({ page }) => {
  await page.goto('/')
  await skipIntroduction(page)
  await page.getByRole('link', { name: 'Switch to English', exact: true }).click()
  await expect(page).toHaveURL(/\/en$/)
  await skipIntroduction(page, true)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('h1')).toHaveText('A Software House for Your Business.')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/en$/)
  await expect(page.locator('.desktop-nav').getByRole('link', { name: 'About', exact: true })).toHaveAttribute('href', '/en/tentang-kami')
  await expect(page.locator('.site-footer')).toContainText('A website, application, and IT solutions studio for businesses in Indonesia.')
  const routes = [
    ['/en/tentang-kami', 'About Wasla'], ['/en/layanan', 'Services'], ['/en/paket-website', 'Service packages.'],
    ['/en/portofolio', 'Projects'], ['/en/insights', 'Articles'], ['/en/kontak', 'Let’s connect.'],
    ['/en/privasi', 'Your information, with a clear purpose.'], ['/en/cara-membuat-website', 'How to Build a Business Website: A Beginner’s Guide'],
    ['/en/layanan/website-development', 'Website Development in Greater Jakarta'], ['/en/layanan/photography', 'Photography & Documentation'],
  ]
  for (const [path, heading] of routes) {
    await page.goto(path)
    await skipIntroduction(page, true)
    await expect(page.locator('h1')).toHaveText(heading)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
  }
  await page.goto('/en/kontak?layanan=Fotografi%20%26%20Dokumentasi#tim-kontak')
  await skipIntroduction(page, true)
  await expect(page.getByLabel('What would you like to build?')).toHaveValue('Fotografi & Dokumentasi')
  await expect(page.getByLabel('What would you like to build?').locator('option:checked')).toHaveText('Photography & Documentation')
  await expect(page.getByRole('form', { name: 'Consultation form' })).toHaveAttribute('action', '/api/contact')
  await page.getByRole('link', { name: 'Beralih ke Bahasa Indonesia', exact: true }).click()
  await expect(page).toHaveURL(/\/kontak\?layanan=Fotografi%20%26%20Dokumentasi#tim-kontak$/)
  await skipIntroduction(page)
  await expect(page.locator('html')).toHaveAttribute('lang', 'id')
})

test('seven real team profiles include new LinkedIn portraits independently of WhatsApp availability', async ({ page }) => {
  await page.goto('/tentang-kami')
  await skipIntroduction(page)
  await expect(page.locator('.division-flip-card')).toHaveCount(7)
  for (const [name, profile] of [['Bayu Saputra', 'bayusaputra05'], ['Adelya Amanda', 'adelya-amanda'], ['Difa Alfaruq', 'difa-alfaruq']]) {
    const card = page.locator('.division-flip-card').filter({ has: page.locator('.division-card-info strong', { hasText: name }) })
    await card.scrollIntoViewIfNeeded()
    const photo = card.getByRole('img', { name, exact: true })
    await expect(photo).toHaveAttribute('src', /-hd\.png/)
    await expect.poll(() => photo.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    await card.getByRole('button', { name: new RegExp(`^Kenali ${name}`) }).click()
    await expect(card.getByRole('link', { name: `LinkedIn ${name}`, exact: true })).toHaveAttribute('href', `https://www.linkedin.com/in/${profile}/`)
    await expect(card.locator('.division-actions a[href^="https://wa.me/"]')).toHaveCount(0)
    await card.getByRole('button', { name: `Kembali ke profil ${name}`, exact: true }).press('Enter')
    await expect(card.getByRole('button', { name: new RegExp(`^Kenali ${name}`) })).toHaveAttribute('aria-expanded', 'false')
  }
  await page.locator('.division-card-grid').screenshot({ path: '.local/site-review/team-seven-20261029.png' })
})

test('phone film is portrait, tablet film is landscape, and the intro dismisses from any viewing area', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const intro = page.locator('dialog[aria-label="Sekilas tentang Wasla."]')
  const film = intro.locator('video')
  await expect(film).toHaveAttribute('src', '/videos/wasla-sales-reel.mp4')
  expect(await film.evaluate(v => (v as HTMLVideoElement).muted)).toBe(false)
  await intro.click({ position: { x: 100, y: 10 } })
  await expect(intro).not.toBeVisible()
  expect(await film.evaluate(v => (v as HTMLVideoElement).paused)).toBe(true)
  await expect(page.locator('main video')).toHaveAttribute('src', '/videos/wasla-sales-reel.mp4')
  await page.getByRole('button', { name: 'Tonton film Wasla' }).click()
  await expect.poll(() => film.evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(0)
  await film.click({ position: { x: 20, y: 20 } })
  await expect(intro).not.toBeVisible()
  await page.setViewportSize({ width: 820, height: 1180 })
  await expect(page.locator('main video')).toHaveAttribute('src', '/videos/wasla-introduction.mp4')
  await page.getByRole('button', { name: 'Tonton film Wasla' }).click()
  await expect(film).toHaveAttribute('src', '/videos/wasla-introduction.mp4')
  await intro.click({ position: { x: 2, y: 2 } })
  await expect(intro).not.toBeVisible()
  expect(await page.locator('body').evaluate(el => el.style.overflow)).not.toBe('hidden')
})

test('blocked audible autoplay retries muted without showing a play button', async ({ page }) => {
  await page.addInitScript(() => {
    const play = HTMLMediaElement.prototype.play
    HTMLMediaElement.prototype.play = function () {
      if (!this.muted) return Promise.reject(new DOMException('Autoplay blocked', 'NotAllowedError'))
      return play.call(this)
    }
  })
  await page.goto('/')
  const intro = page.getByRole('dialog', { name: 'Sekilas tentang Wasla.' })
  const film = page.locator('dialog video')
  await expect.poll(() => film.evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(0)
  expect(await film.evaluate(v => (v as HTMLVideoElement).muted)).toBe(true)
  await expect(intro.getByRole('button', { name: 'Putar perkenalan', exact: true })).toHaveCount(0)
  await expect(intro.locator('progress, footer')).toHaveCount(0)
  await page.keyboard.press('Escape')
  await expect.poll(() => film.evaluate(v => (v as HTMLVideoElement).paused)).toBe(true)
})

test('mobile devices rotate with horizontal touch, allow native scrolling and keep every service scene interactive', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 })
  await protectStage(context)
  const page = await context.newPage()
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  await page.screenshot({ path: '.impeccable/review/intro-mobile-20261027.png' })
  await skipIntroduction(page)
  const host = page.locator('.homepage-projects .device3d-stage').first()
  await host.scrollIntoViewIfNeeded()
  await expect(host).toHaveAttribute('data-device-ready', 'true', { timeout: 30000 })
  const canvas = host.locator('canvas')
  const cdp = await context.newCDPSession(page)
  async function swipe(x: number, y: number, dx: number, dy: number) {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] })
    for (let i = 1; i <= 8; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + dx * i / 8, y: y + dy * i / 8 }] })
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  }
  const rect = (await host.boundingBox())!
  const before = await canvas.getAttribute('data-rotation')
  const address = page.url()
  await swipe(rect.x + rect.width * .35, rect.y + rect.height * .5, 65, 1)
  await expect.poll(() => canvas.getAttribute('data-rotation')).not.toBe(before)
  expect(page.url()).toBe(address)
  const scrollBefore = await page.evaluate(() => scrollY)
  await swipe(rect.x + rect.width * .6, rect.y + rect.height * .65, 1, -100)
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(scrollBefore + 30)
  await page.getByRole('heading', { name: 'Dari ide, jadi website.' }).scrollIntoViewIfNeeded()
  await page.screenshot({ path: '.impeccable/review/reel-mobile-20261027.png' })
  for (const scene of await page.locator('.service-scene').all()) {
    await scene.scrollIntoViewIfNeeded()
    await expect(scene.locator('canvas')).toHaveAttribute('data-rendered3d', 'true', { timeout: 30000 })
    await scene.getByRole('button', { name: 'Putar objek', exact: true }).click()
    const rect = (await scene.locator('canvas').boundingBox())!
    const before = await scene.locator('canvas').getAttribute('data-rotation')
    await swipe(rect.x + rect.width * .35, rect.y + rect.height * .5, 60, 5)
    await expect.poll(() => scene.locator('canvas').getAttribute('data-rotation')).not.toBe(before)
    await scene.getByRole('button', { name: 'Selesai memutar', exact: true }).click()
  }
  for (const width of [360, 390, 484, 768]) {
    await page.setViewportSize({ width, height: 844 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
  }
  expect(errors).toEqual([])
  await context.close()
})

test('automatic intro remains dismissible with reduced motion and exits on video failure', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' })
  await protectStage(context)
  const page = await context.newPage()
  await page.goto('/')
  await expect.poll(() => page.locator('dialog video').evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(0)
  await skipIntroduction(page)
  await context.close()
  const failedContext = await browser.newContext()
  await protectStage(failedContext)
  await failedContext.route('**/videos/wasla-introduction.mp4', route => route.abort())
  const failedPage = await failedContext.newPage()
  await failedPage.goto('/')
  await expect(failedPage.locator('dialog[open]')).toHaveCount(0)
  await expect(failedPage.locator('h1')).toBeVisible()
  await failedContext.close()
})
