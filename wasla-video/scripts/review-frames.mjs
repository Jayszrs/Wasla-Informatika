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
  for (const frame of [0,45,110,149,150,200,300,329,330,370,430,490,530,539,540,590,670,710,719,720,760,830,899]) {
    const output = path.resolve(`output/review/frame-${String(frame).padStart(3, '0')}.png`);
    await renderStill({serveUrl, composition, frame, output, imageFormat: 'png', puppeteerInstance: browser});
    console.log(`Reviewed frame ${frame}`);
  }
} finally {
  await browser.close({silent: true});
}
