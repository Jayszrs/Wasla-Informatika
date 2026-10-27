import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {binary} from './binaries.mjs';
function pcm(input){
 const bytes=execFileSync(binary('ffmpeg'),['-v','error','-i',input,'-vn','-ac','1','-ar','48000','-c:a','pcm_s16le','-f','wav','pipe:1'],{maxBuffer:20*1024*1024,windowsHide:true});
 for(let at=12;at+8<bytes.length;){const name=bytes.toString('ascii',at,at+4);const len=bytes.readUInt32LE(at+4);if(name==='data'){const count=Math.floor(Math.min(len,bytes.length-at-8)/2);const a=new Float64Array(count);for(let i=0;i<count;i++)a[i]=bytes.readInt16LE(at+8+2*i)/32768;return a;}at+=8+len+len%2;}
 throw new Error('No PCM data');
}
const source=pcm('public/audio/reel/music-30s.wav');const mixed=pcm('output/wasla-motion-reference-30s.mp4');
let cross=0,a=0,b=0,peak=0;
for(let i=0;i<Math.min(source.length,mixed.length);i++){cross+=source[i]*mixed[i];a+=source[i]**2;b+=mixed[i]**2;peak=Math.max(peak,Math.abs(mixed[i]));}
const correlation=cross/Math.sqrt(a*b);assert.ok(correlation>.985,`Music missing or desynchronized: ${correlation}`);assert.ok(peak<.99&&peak>.1);
const analysis=JSON.parse(readFileSync('output/reference/audio-analysis.json','utf8'));
const text=readFileSync('src/motion/data.ts','utf8');const frames=JSON.parse('['+text.match(/cutFrames=\[([^\]]+)\]/)[1]+']');
const allOnsets=[0,14,28].flatMap(offset=>analysis.onsets.map(([t])=>t+offset)).filter(t=>t<=30);
const cuts=frames.filter(f=>f!==0&&f!==420&&f!==840&&f!==900).map(frame=>{const time=frame/30;const onset=allOnsets.reduce((a,b)=>Math.abs(b-time)<Math.abs(a-time)?b:a);return{frame,time:Number(time.toFixed(4)),onset,errorMs:Number((1000*Math.abs(time-onset)).toFixed(2))};});
assert.ok(cuts.every(c=>c.errorMs<24));
const report={passed:true,userMusicPresent:true,voiceOver:false,correlation:Number(correlation.toFixed(6)),decodedMonoPeakDbFS:Number((20*Math.log10(peak)).toFixed(2)),cutsChecked:cuts.length,maxCutOnsetErrorMs:Math.max(...cuts.map(c=>c.errorMs)),onsetNote:'Spectral-flux onset estimate, with 10ms analysis hops; not a sample-accurate musical beat label.',cuts};
writeFileSync('output/motion-audio-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
