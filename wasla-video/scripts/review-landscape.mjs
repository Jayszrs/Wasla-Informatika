import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,openBrowser} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
const browserExecutable=process.env.CHROME_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),rspack:true});
const browser=await openBrowser('chrome',{browserExecutable});
try{
 const composition=await selectComposition({serveUrl,id:'WaslaLandscapePromo',puppeteerInstance:browser});
 await mkdir('output/landscape-review',{recursive:true});
 const frames=[0,48,115,185,250,340,410,485,565,630,680,750,825,895,975,1060,1145,1205,1260,1325,1400,1475,1530,1590,1655];
 for(const frame of frames){await renderStill({serveUrl,composition,frame,output:path.resolve(`output/landscape-review/frame-${String(frame).padStart(4,'0')}.png`),imageFormat:'png',puppeteerInstance:browser});console.log(`Frame ${frame}`);}
}finally{await browser.close({silent:true});}
