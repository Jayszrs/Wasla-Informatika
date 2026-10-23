const { chromium } = require('playwright');
const fs = require('node:fs/promises');
const path = require('node:path');

(async () => {
  const out = __dirname;
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, locale: 'id-ID', reducedMotion: 'reduce', serviceWorkers: 'block' });
  const page = await context.newPage();
  const startedAt = new Date().toISOString();
  const record = { provider: 'Playwright fallback (not REA)', requestedUrl: 'https://ngajiyuk.sdilbanisalehsetu.com/', startedAt, viewport: { width: 1440, height: 1000 }, actions: ['navigate public landing only', 'wait for fonts and visible images; maximum 8 seconds'], technologyClaims: [], limitation: 'REA navigation failed before initial state; fallback uses domcontentloaded. No authentication, forms, private assets, source scripts, or child records inspected.' };
  try {
    const response = await page.goto(record.requestedUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await Promise.race([page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].filter(img => { const r=img.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; }).map(img => img.complete ? Promise.resolve() : new Promise(resolve => { img.addEventListener('load',resolve,{once:true}); img.addEventListener('error',resolve,{once:true}); }))); }), page.waitForTimeout(8000)]);
    await page.waitForTimeout(1000);
    record.status = response?.status();
    record.actualUrl = page.url();
    record.title = await page.title();
    record.headings = await page.locator('h1,h2').allTextContents();
    record.screenshot = 'ngajiyuk.png';
    await page.screenshot({ path: path.join(out, record.screenshot), fullPage: false });
    record.result = 'captured';
  } catch (error) { record.result = 'unavailable'; record.error = error.message; }
  await browser.close();
  await fs.writeFile(path.join(out, 'ngajiyuk-fallback.json'), JSON.stringify(record, null, 2));
  console.log(JSON.stringify(record));
})();
