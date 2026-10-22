import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true })
await mkdir('.impeccable/review', { recursive: true })
const errors = []
const readings = []
for (const width of [1440, 1024, 768, 390]) {
  const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 1000 }, reducedMotion: 'reduce' })
  page.on('pageerror', e => errors.push(e.message))
  for (const [name, route] of [['home', '/'], ['services', '/layanan'], ['service', '/layanan/website-development'], ['portfolio', '/portofolio'], ['project', '/portofolio/ruang-commerce'], ['insights', '/insights'], ['article', '/insights/website-atau-aplikasi-web'], ['about', '/tentang-kami'], ['contact', '/kontak']]) {
    await page.goto(`http://localhost:3000${route}`, { waitUntil: 'domcontentloaded', timeout: 90_000 })
    await page.locator('h1').waitFor()
    await page.locator('.site-header .brand').waitFor({ state: 'visible' })
    await page.waitForLoadState('load', { timeout: 90_000 })
    await page.evaluate(() => document.fonts.ready)
    for (const img of await page.locator('img').all()) {
      await img.scrollIntoViewIfNeeded()
      await img.evaluate(img => img.complete ? Promise.resolve() : new Promise(resolve => { img.addEventListener('load', resolve, { once: true }); img.addEventListener('error', resolve, { once: true }) }))
    }
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
    const info = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth,
      h1: { size: getComputedStyle(document.querySelector('h1')).fontSize, family: getComputedStyle(document.querySelector('h1')).fontFamily },
      artTransform: document.querySelector('[data-hero-art]') ? getComputedStyle(document.querySelector('[data-hero-art]')).transform : null,
      brokenImages: [...document.images].filter(img => !img.naturalWidth).map(img => img.currentSrc),
    }))
    readings.push({ width, route, ...info })
    if (width === 1440 || width === 390) {
      await page.screenshot({ path: `.impeccable/review/${name}-${width}-viewport.png` })
      if (name !== 'home') await page.screenshot({ path: `.impeccable/review/${name}-${width}.png`, fullPage: true })
    }
    if (name === 'home' && (width === 1440 || width === 390)) await page.screenshot({ path: `.impeccable/review/${width === 1440 ? 'desktop' : 'mobile'}.png`, fullPage: true })
  }
  await page.close()
}
function contrast(hex1, hex2) {
  const lum = hex => { const rgb = hex.match(/\w\w/g).map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4); return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722 }
  const l = [lum(hex1), lum(hex2)].sort((a, b) => b - a)
  return Number(((l[0] + .05) / (l[1] + .05)).toFixed(2))
}
const report = { readings, errors, tokenContrast: { navyOnWhite: contrast('071a33', 'ffffff'), slateOnWhite: contrast('526277', 'ffffff'), lightOnNavy: contrast('dceaff', '071a33'), whiteOnAction: contrast('ffffff', '245fd1') } }
await writeFile('.impeccable/review/browser-readings.json', JSON.stringify(report, null, 2))
console.log(JSON.stringify({ routesChecked: readings.length, overflow: readings.filter(r => r.overflow), errors, tokenContrast: report.tokenContrast }))
await browser.close()
