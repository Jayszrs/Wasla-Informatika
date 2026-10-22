import { chromium } from '@playwright/test'
import { writeFile } from 'node:fs/promises'
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true })
const result = []
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 1000 }, reducedMotion: 'reduce' })
  await page.goto('http://localhost:3000/portofolio')
  await page.locator('h1').waitFor(); await page.evaluate(() => document.fonts.ready)
  await page.locator('.site-header .brand').waitFor({ state: 'visible' })
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  const count = await page.locator('.project-card').count()
  if (count !== 4) throw new Error(`Expected only the four seeded concepts, got ${count}`)
  await page.screenshot({ path: `.impeccable/review/portfolio-${width}.png`, fullPage: true })
  await page.screenshot({ path: `.impeccable/review/portfolio-${width}-viewport.png` })
  result.push({ width, count, captured: new Date().toISOString() })
  await page.close()
}
await writeFile('.impeccable/review/portfolio-recapture.json', JSON.stringify(result, null, 2))
console.log('Portfolio recaptured after isolated CMS fixtures were removed; both widths contain only 4 concepts.')
await browser.close()
