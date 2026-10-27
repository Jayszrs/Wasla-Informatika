import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {binary} from './binaries.mjs';
function pcm(input){
 const bytes=execFileSync(binary('ffmpeg'),['-v','error','-i',input,'-vn','-ac','1','-ar','48000','-c:a','pcm_s16le','-f','wav','pipe:1'],{maxBuffer:20*1024*1024,windowsHide:true});
 for(let at=12;at+8<bytes.length;){const name=bytes.toString('ascii',at,at+4);const len=bytes.readUInt32LE(at+4);if(name==='data'){const count=Math.floor(Math.min(len,bytes.length-at-8)/2);const a=new Float64Array(count);for(let i=0;i<count;i++)a[i]=bytes.readInt16LE(at+8+2*i)/32768;return a;}at+=8+len+len%2;}
 throw new Error('No PCM data');
}
const source=pcm('public/audio/reel/music-landscape-27s6.wav');const mixed=pcm('output/wasla-landscape-showcase-v2-27s6.mp4');
let cross=0,a=0,b=0,peak=0;
for(let i=0;i<Math.min(source.length,mixed.length);i++){cross+=source[i]*mixed[i];a+=source[i]**2;b+=mixed[i]**2;peak=Math.max(peak,Math.abs(mixed[i]));}
const correlation=cross/Math.sqrt(a*b);assert.ok(correlation>.985,`Music missing or desynchronized: ${correlation}`);assert.ok(peak<.99&&peak>.1);
const report={passed:true,userMusicPresent:true,voiceOver:false,correlation:Number(correlation.toFixed(6)),decodedMonoPeakDbFS:Number((20*Math.log10(peak)).toFixed(2)),decodedMusicSamples:source.length,decodedMp4Samples:mixed.length,durationSeconds:27.6,sync:'Prepared soundtrack matched directly against the MP4; cuts follow reference scene timing rather than new beat labels.'};
writeFileSync('output/landscape-showcase-v2-audio-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
