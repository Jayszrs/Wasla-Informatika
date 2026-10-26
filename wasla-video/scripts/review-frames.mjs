import {bundle} from '@remotion/bundler';
import {selectComposition, renderStill, openBrowser} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';

const browserExecutable = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), rspack: true});
const browser = await openBrowser('chrome', {browserExecutable});
try {
  const composition = await selectComposition({serveUrl, id: 'WaslaCompanyProfile', puppeteerInstance: browser});
  await mkdir('output/review', {recursive: true});
  for (const frame of [0,45,100,119,120,180,265,299,300,360,420,485,535,539,540,600,660,725,775,779,780,840,900,965,1015,1019,1020,1080,1140,1205,1255,1259,1260,1310,1365,1379,1380,1450,1510,1580,1589,1590,1660,1730,1799]) {
    const output = path.resolve(`output/review/frame-${String(frame).padStart(3, '0')}.png`);
    await renderStill({serveUrl, composition, frame, output, imageFormat: 'png', puppeteerInstance: browser});
    console.log(`Reviewed frame ${frame}`);
  }
} finally {
  await browser.close({silent: true});
}
