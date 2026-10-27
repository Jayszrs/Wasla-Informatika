import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,openBrowser} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
const browserExecutable=process.env.CHROME_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),rspack:true});
const browser=await openBrowser('chrome',{browserExecutable});
try{
 const composition=await selectComposition({serveUrl,id:'WaslaSalesReel',puppeteerInstance:browser});
 await mkdir('output/sales-v2-review',{recursive:true});
 const frames=[0,12,32,54,68,88,104,125,129,150,174,200,210,230,260,281,290,320,344,356,379,420,449];
 for(const frame of frames){await renderStill({serveUrl,composition,frame,output:path.resolve(`output/sales-v2-review/frame-${String(frame).padStart(4,'0')}.png`),imageFormat:'png',puppeteerInstance:browser});console.log(`Frame ${frame}`);}
}finally{await browser.close({silent:true});}
