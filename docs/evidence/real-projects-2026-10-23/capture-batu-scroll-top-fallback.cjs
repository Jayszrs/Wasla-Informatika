const { chromium } = require('playwright');
const fs = require('node:fs/promises');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, locale: 'id-ID', reducedMotion: 'reduce', serviceWorkers: 'block' });
  const page = await context.newPage();
  const record = { provider: 'Playwright fallback verification (not REA)', requestedUrl: 'https://www.batualamsupplier.com/', capturedAt: new Date().toISOString(), viewport: { width: 1440, height: 1000 }, actions: ['navigate public root', 'await fonts and visible images, bounded eight seconds', 'Control+Home', 'explicit scroll to 0,0', 'read visible heading geometry and screenshot'], limitations: ['No original hero is invented or recreated.', 'No page content or styles changed.', 'No forms or authentication used.'] };
  try {
    const response = await page.goto(record.requestedUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await Promise.race([page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].filter(img => { const r = img.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; }).map(img => img.complete ? Promise.resolve() : new Promise(resolve => { img.addEventListener('load', resolve, { once: true }); img.addEventListener('error', resolve, { once: true }); }))); }), page.waitForTimeout(8000)]);
    await page.waitForTimeout(2000);
    await page.keyboard.press('Control+Home');
    await page.evaluate(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }));
    await page.waitForTimeout(1000);
    record.status = response?.status();
    record.actualUrl = page.url();
    record.title = await page.title();
    record.visibleGeometry = await page.evaluate(() => ({ scrollX, scrollY, documentScrollTop: document.scrollingElement?.scrollTop, documentHeight: document.documentElement.scrollHeight, headings: [...document.querySelectorAll('main h1,main h2')].slice(0, 8).map(el => ({ text: el.textContent.trim(), top: el.getBoundingClientRect().top, height: el.getBoundingClientRect().height })), scrollContainers: [...document.querySelectorAll('body, main, body > div')].map(el => ({ tag: el.tagName, scrollTop: el.scrollTop, clientHeight: el.clientHeight, scrollHeight: el.scrollHeight })) }));
    record.screenshot = 'batu-alam-supplier-verified-scroll-top.png';
    await page.screenshot({ path: path.join(__dirname, record.screenshot), fullPage: false });
    record.result = 'captured';
  } catch (error) { record.result = 'unavailable'; record.error = error.message; }
  await browser.close();
  await fs.writeFile(path.join(__dirname, 'batu-scroll-top-fallback.json'), JSON.stringify(record, null, 2));
  console.log(JSON.stringify(record));
})();
