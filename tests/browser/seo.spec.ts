import { test, expect } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

test.use({ storageState: process.env.TEST_STORAGE_STATE })

test('search crawlers receive canonical metadata, visible local content, and structured data', async ({ browser }) => {
  const context = await browser.newContext({ baseURL: test.info().project.use.baseURL, javaScriptEnabled: false, storageState: process.env.TEST_STORAGE_STATE })
  const page = await context.newPage()
  try {
    for (const [path, title, type] of [
      ['/', 'Jasa Pembuatan Website Jabodetabek & IT Consultant', 'Organization'],
      ['/layanan/website-development', 'Jasa Pembuatan Website di Jabodetabek', 'Service'],
      ['/layanan/it-consultation', 'Jasa IT Consultant di Jabodetabek', 'Service'],
      ['/cara-membuat-website', 'Cara Membuat Website untuk Bisnis', 'TechArticle'],
    ]) {
      expect((await page.goto(path))?.status(), path).toBe(200)
      await expect(page).toHaveTitle(new RegExp(title))
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
      expect(new URL(canonical!).pathname).toBe(path)
      expect(new URL(canonical!).search).toBe('')
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /website|teknologi/i)
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/)
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', canonical!)
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image')
      expect(await page.locator('h1').count()).toBe(1)
      await expect(page.locator('main')).toContainText('Jakarta')
      await expect(page.locator('main')).toContainText('Bekasi')
      const graphs = await page.locator('script[type="application/ld+json"]').allTextContents()
      const nodes = graphs.flatMap(text => { const data = JSON.parse(text); return data['@graph'] || [data] })
      expect(nodes.some(node => node['@type'] === type), path).toBe(true)
      const organization = nodes.find(node => node['@type'] === 'Organization')
      expect(organization.areaServed.map((area: { name: string }) => area.name)).toEqual(['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi'])
    }
  } finally { await context.close() }
})

test('sitemap, crawler rules, and stable branded icons are accessible', async ({ request, page }) => {
  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.status()).toBe(200)
  const xml = await sitemap.text()
  for (const path of ['/cara-membuat-website', '/layanan/website-development', '/layanan/it-consultation']) expect(xml).toContain(`${path}</loc>`)
  expect(xml).not.toMatch(/\/admin|\/preview/)
  const robots = await request.get('/robots.txt')
  expect(robots.status()).toBe(200)
  expect(await robots.text()).toContain('Allow: /')
  expect(await robots.text()).toContain('Disallow: /admin')
  expect(await robots.text()).toContain('Sitemap: ')
  for (const [path, mime] of [['/favicon.ico', /image\/(x-icon|vnd.microsoft.icon)/], ['/apple-touch-icon.png', /image\/png/], ['/images/brand/favicon-navy.png', /image\/png/]] as const) {
    const response = await request.get(path)
    expect(response.status(), path).toBe(200)
    expect(response.headers()['content-type']).toMatch(mime)
    expect((await response.body()).length).toBeGreaterThan(100)
  }
  const favicon = await (await request.get('/favicon.ico')).body()
  expect(favicon.readUInt16LE(2)).toBe(1)
  expect(favicon.readUInt16LE(4)).toBe(4)
  const og = await request.get('/opengraph-image')
  expect(og.status()).toBe(200)
  expect(og.headers()['content-type']).toContain('image/png')
  await page.goto('/')
  await expect(page.locator('link[rel="icon"][href="/favicon.ico"]')).toHaveCount(1)
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', '/apple-touch-icon.png')
})

test('guide is readable on mobile and its navigation leads to the right service', async ({ page }) => {
  await mkdir('.local/seo-review', { recursive: true })
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/cara-membuat-website')
    await page.evaluate(() => document.fonts.ready)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.screenshot({ path: `.local/seo-review/guide-${width}.png` })
  }
  await page.getByRole('navigation', { name: 'Isi panduan' }).getByRole('link', { name: 'Domain, hosting, dan akses' }).click()
  await expect(page).toHaveURL(/#domain$/)
  await page.getByRole('link', { name: 'Konsultasikan pembuatan website', exact: true }).click()
  await expect(page).toHaveURL(/\/layanan\/website-development$/)
  await expect(page.locator('h1')).toHaveText('Jasa Pembuatan Website di Jabodetabek')
  await page.getByRole('link', { name: 'Diskusikan kebutuhan', exact: true }).click()
  await expect(page.locator('#service')).toHaveValue('Website Development')
  await page.goto('/layanan/it-consultation')
  await page.getByRole('link', { name: 'Diskusikan kebutuhan', exact: true }).click()
  await expect(page.locator('#service')).toHaveValue('IT Consultation')
  await page.goto('/insights')
  await page.getByRole('link', { name: 'Baca cara membuat website', exact: true }).click()
  await expect(page).toHaveURL(/\/cara-membuat-website$/)
  expect(errors).toEqual([])
})
