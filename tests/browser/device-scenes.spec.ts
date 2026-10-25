import 'dotenv/config'
import { test, expect } from '@playwright/test'

test('real textured devices share one GPU context and retain the same frame across scrolling', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext
    const contexts = new Set<RenderingContext>()
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      const context = original.apply(this, args)
      if (context && /webgl/.test(args[0])) contexts.add(context)
      Reflect.set(window, '__webglContexts', contexts.size)
      return context
    } as typeof original
  })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  await expect(page.locator('.device3d-canvas')).toHaveCount(0)
  await expect(page.locator('.homepage-projects')).not.toHaveAttribute('data-reveal-state', 'waiting')
  const project = page.locator('.project-device-stage').first()
  await project.scrollIntoViewIfNeeded()
  const canvas = project.locator('canvas[data-rendered3d=true]')
  await expect(canvas).toBeVisible({ timeout: 30000 })
  await expect(canvas).toHaveAttribute('data-textured-screens', '2')
  const bitmapSizes = await project.locator('.device-frame img').evaluateAll(async images => Promise.all(images.map(async image => { const source = new Image(); source.src = (image as HTMLImageElement).currentSrc; await source.decode(); return `${source.naturalWidth}x${source.naturalHeight}` })))
  await expect(canvas).toHaveAttribute('data-texture-source-sizes', bitmapSizes.join(','))
  const before = await canvas.getAttribute('data-rotation')
  await project.hover({ position: { x: 70, y: 70 } })
  await expect.poll(() => canvas.getAttribute('data-rotation')).not.toBe(before)
  expect(await page.evaluate(() => Reflect.get(window, '__webglContexts'))).toBe(1)
  const originalCanvas = await canvas.elementHandle()
  if (!originalCanvas) throw Error('Rendered device canvas unavailable')
  const phone = page.locator('.brand-phone-stage')
  await phone.scrollIntoViewIfNeeded()
  await expect(phone.locator('canvas[data-device3d=phone]')).toBeVisible({ timeout: 30000 })
  await expect(canvas).toBeAttached()
  await expect(project).toHaveAttribute('data-device-ready', 'true')
  await project.scrollIntoViewIfNeeded()
  await expect(project.locator('.device3d-poster')).toHaveCount(0)
  expect(await canvas.evaluate((element, original) => element === original, originalCanvas)).toBe(true)
  expect(await page.evaluate(() => Reflect.get(window, '__webglContexts'))).toBe(1)
  await expect(project.locator('canvas[data-rendered3d=true]')).toBeVisible({ timeout: 30000 })
  await phone.scrollIntoViewIfNeeded()
  await expect(phone.locator('canvas[data-rendered3d=true]')).toBeVisible({ timeout: 30000 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect.poll(() => phone.locator('canvas').getAttribute('data-rotation')).toBe('-0.110,-0.180')
  await phone.hover({ position: { x: 70, y: 70 } })
  expect(await phone.locator('canvas').getAttribute('data-rotation')).toBe('-0.110,-0.180')
  await page.goto('/portofolio/catatan-mengaji-bani-saleh')
  for (const stage of await page.locator('.gallery-device-stage').all()) {
    await stage.scrollIntoViewIfNeeded()
    await expect(stage.locator('canvas[data-rendered3d=true]')).toBeVisible({ timeout: 30000 })
  }
  expect(await page.evaluate(() => Reflect.get(window, '__webglContexts'))).toBe(1)
  await page.getByRole('link', { name: /^Perbesar gambar 1:/ }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
})

test('same whole-card toggle works both ways and CMS bio/photo remain editable without clipping', async ({ page, context }) => {
  const base = process.env.TEST_BASE_URL || 'http://localhost:3000'
  await context.setExtraHTTPHeaders({ Origin: base })
  const login = await page.request.post('/api/users/login', { data: { email: process.env.BOOTSTRAP_ADMIN_EMAIL, password: process.env.BOOTSTRAP_ADMIN_PASSWORD } })
  expect(login.status()).toBe(200)
  const members = (await (await page.request.get('/api/team?depth=0')).json()).docs
  const member = members.find((person: { role: string }) => person.role === 'Project Manager')
  const biography = 'Bio uji pengelolaan konten. '.repeat(18)
  try {
    const saved = await page.request.patch(`/api/team/${member.id}`, { data: { biography, photo: typeof member.photo === 'object' ? member.photo.id : member.photo, revision: member.revision } })
    expect(saved.status()).toBe(200)
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const card = page.locator('.division-flip-card').first(), toggle = card.locator('.division-card-toggle')
    await toggle.click()
    await expect(card).toHaveClass(/is-flipped/)
    await expect(card.locator('.division-back p')).toHaveText(biography.trim())
    expect(await card.locator('.division-back p').evaluate(el => el.scrollHeight <= el.clientHeight + 1)).toBe(true)
    const link = card.getByRole('link', { name: 'Hubungi via WhatsApp' })
    await link.scrollIntoViewIfNeeded()
    expect(await link.evaluate(el => { const r=el.getBoundingClientRect(); return document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.closest('a')===el })).toBe(true)
    await toggle.click()
    await expect(card).not.toHaveClass(/is-flipped/)
    await toggle.focus(); await page.keyboard.press('Enter'); await page.keyboard.press('Space')
    await expect(card).not.toHaveClass(/is-flipped/)
    await expect(card.locator('.division-back button')).toHaveCount(0)
  } finally {
    const latest = await (await page.request.get(`/api/team/${member.id}?depth=0`)).json()
    const restored = await page.request.patch(`/api/team/${member.id}`, { data: { biography: member.biography, photo: typeof member.photo === 'object' ? member.photo.id : member.photo, revision: latest.revision } })
    expect(restored.status()).toBe(200)
  }
})


test('cold responsive screenshots and one transient decode failure recover without raw media textures', async ({ page }) => {
  await page.addInitScript(() => {
    const selected = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'currentSrc')!
    Object.defineProperty(HTMLImageElement.prototype, 'currentSrc', {
      configurable: true,
      get(this: HTMLImageElement) { return this.closest('.device-frame') ? '' : selected.get!.call(this) },
    })
    const decode = HTMLImageElement.prototype.decode
    const stats = { rawRejected: 0, transientFailures: 0, decoded: [] as string[] }
    Reflect.set(window, '__coldDeviceSources', stats)
    HTMLImageElement.prototype.decode = async function () {
      const independentTexture = !this.isConnected && this.crossOrigin === 'anonymous'
      if (independentTexture) {
        if (new URL(this.src).pathname.startsWith('/api/media/file/')) {
          stats.rawRejected++
          throw new DOMException('Raw media redirects cannot be used as CORS textures', 'EncodingError')
        }
        if (!stats.transientFailures) {
          stats.transientFailures++
          throw new DOMException('Transient image decode failure', 'EncodingError')
        }
      }
      await decode.call(this)
      if (independentTexture) stats.decoded.push(`${this.naturalWidth}x${this.naturalHeight}`)
    }
  })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/portofolio/mahameru-baja-indonesia')
  const stage = page.locator('.detail-visual .device3d-stage')
  await stage.scrollIntoViewIfNeeded()
  const canvas = stage.locator('canvas[data-rendered3d=true]')
  await expect(canvas).toBeVisible({ timeout: 30000 })
  await expect(stage).not.toHaveAttribute('data-device-state', 'fallback')
  const stats = await page.evaluate(() => Reflect.get(window, '__coldDeviceSources') as { rawRejected: number; transientFailures: number; decoded: string[] })
  expect(stats.rawRejected).toBe(0)
  expect(stats.transientFailures).toBe(1)
  expect(stats.decoded).toHaveLength(2)
  expect((await canvas.getAttribute('data-texture-source-sizes'))!.split(',').sort()).toEqual(stats.decoded.sort())
})
