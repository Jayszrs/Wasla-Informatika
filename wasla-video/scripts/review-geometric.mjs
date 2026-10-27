import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,openBrowser} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
const browserExecutable=process.env.CHROME_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),rspack:true});
const browser=await openBrowser('chrome',{browserExecutable});
try{
 const composition=await selectComposition({serveUrl,id:'WaslaGeometricReel',puppeteerInstance:browser});
 await mkdir('output/geometric-review',{recursive:true});
 const frames=[0,20,44,60,75,90,104,120,140,153,175,192,210,235,269];
 for(const frame of frames){await renderStill({serveUrl,composition,frame,output:path.resolve(`output/geometric-review/frame-${String(frame).padStart(4,'0')}.png`),imageFormat:'png',puppeteerInstance:browser});console.log(`Frame ${frame}`);}
}finally{await browser.close({silent:true});}
