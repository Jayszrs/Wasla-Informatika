import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,openBrowser} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
const browserExecutable=process.env.CHROME_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),rspack:true});
const browser=await openBrowser('chrome',{browserExecutable});
try{
 const composition=await selectComposition({serveUrl,id:'WaslaMotionReel',puppeteerInstance:browser});
 await mkdir('output/motion-review',{recursive:true});
 const frames=[0,12,40,75,112,140,170,202,230,265,302,332,362,397,434,460,495,530,560,590,620,650,686,720,752,782,818,855,880,899];
 for(const frame of frames){await renderStill({serveUrl,composition,frame,output:path.resolve(`output/motion-review/frame-${String(frame).padStart(4,'0')}.png`),imageFormat:'png',puppeteerInstance:browser});console.log(`Frame ${frame}`);}
}finally{await browser.close({silent:true});}
