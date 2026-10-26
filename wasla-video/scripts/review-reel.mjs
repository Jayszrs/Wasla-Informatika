import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,openBrowser} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
const browserExecutable=process.env.CHROME_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),rspack:true});
const browser=await openBrowser('chrome',{browserExecutable});
try{
 const composition=await selectComposition({serveUrl,id:'WaslaScrollReel',puppeteerInstance:browser});
 await mkdir('output/reel-review',{recursive:true});
 for(const frame of [0,30,59,60,85,135,195,209,210,240,285,345,359,360,390,435,495,509,510,540,585,645,659,660,690,735,795,809,810,840,885,945,959,960,990,1049]){
  await renderStill({serveUrl,composition,frame,output:path.resolve(`output/reel-review/frame-${String(frame).padStart(4,'0')}.png`),imageFormat:'png',puppeteerInstance:browser});
  console.log(`Frame ${frame}`);
 }
}finally{await browser.close({silent:true});}
