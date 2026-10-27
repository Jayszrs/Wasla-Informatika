import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,openBrowser} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
const browserExecutable=process.env.CHROME_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),rspack:true});
const browser=await openBrowser('chrome',{browserExecutable});
try{
 const composition=await selectComposition({serveUrl,id:'WaslaLandscapePromo',puppeteerInstance:browser});
 await mkdir('output/landscape-showcase-v2-review',{recursive:true});
 const frames=[930,945,970,995,1020,1050,1080,1115];
 for(const frame of frames){await renderStill({serveUrl,composition,frame,output:path.resolve(`output/landscape-showcase-v2-review/frame-${String(frame).padStart(4,'0')}.png`),imageFormat:'png',puppeteerInstance:browser});console.log(`Frame ${frame}`);}
}finally{await browser.close({silent:true});}
