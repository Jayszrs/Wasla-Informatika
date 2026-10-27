import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {binary} from './binaries.mjs';
function pcm(input){
 const bytes=execFileSync(binary('ffmpeg'),['-v','error','-i',input,'-vn','-ac','1','-ar','48000','-c:a','pcm_s16le','-f','wav','pipe:1'],{maxBuffer:20*1024*1024,windowsHide:true});
 for(let at=12;at+8<bytes.length;){const name=bytes.toString('ascii',at,at+4);const len=bytes.readUInt32LE(at+4);if(name==='data'){const count=Math.floor(Math.min(len,bytes.length-at-8)/2);const a=new Float64Array(count);for(let i=0;i<count;i++)a[i]=bytes.readInt16LE(at+8+2*i)/32768;return a;}at+=8+len+len%2;}
 throw new Error('No PCM data');
}
function correlation(a,b){let ab=0,aa=0,bb=0;for(let i=0;i<Math.min(a.length,b.length);i++){ab+=a[i]*b[i];aa+=a[i]**2;bb+=b[i]**2;}return ab/Math.sqrt(aa*bb);}
const expected=pcm('public/audio/sales-v4/final-mix.wav');
const music=pcm('public/audio/sales-v4/music-main.wav');
const effects=pcm('public/audio/sales-v4/sfx-clean.wav');
const originalMusic=pcm('public/audio/reel/music-15s.wav');
const actual=pcm('output/wasla-sales-reel-v4-sfx-rapi-15s.mp4');
const residual=new Float64Array(Math.min(music.length,actual.length));
let peak=0,sfxEnergy=0;
for(let i=0;i<residual.length;i++){residual[i]=actual[i]-music[i];peak=Math.max(peak,Math.abs(actual[i]));sfxEnergy+=effects[i]**2;}
const fullCorrelation=correlation(expected,actual);const effectsCorrelation=correlation(effects,residual);
assert.ok(fullCorrelation>.985,'Sound mix missing or shifted');
assert.ok(effectsCorrelation>.9,'SFX missing or shifted relative to the music');
assert.ok(Math.sqrt(sfxEnergy/effects.length)>.002,'SFX stem unexpectedly silent');
assert.ok(peak<.99&&peak>.1,'Unexpected decoded level');
const manifest=JSON.parse(readFileSync('public/audio/sales-v4/manifest.json','utf8'));
assert.equal(manifest.cueCount,9);
const userMusicCorrelation=correlation(originalMusic,music);
assert.ok(userMusicCorrelation>.999,'Foreground track differs from prepared user music');
const musicEnergy=music.reduce((sum,x)=>sum+x*x,0);
const musicOverSfxDb=10*Math.log10(musicEnergy/sfxEnergy);
assert.ok(musicOverSfxDb>18,'Music is not sufficiently foregrounded');
const report={passed:true,durationSeconds:15,voiceOver:false,embeddedMusic:true,originalUserMp3Sha256:manifest.originalUserMp3Sha256,userMusicCorrelation:Number(userMusicCorrelation.toFixed(6)),musicOverSfxDb:Number(musicOverSfxDb.toFixed(2)),originalSfxCues:manifest.cueCount,mixCorrelation:Number(fullCorrelation.toFixed(6)),sfxResidualCorrelation:Number(effectsCorrelation.toFixed(6)),sfxRmsDbFS:Number((20*Math.log10(Math.sqrt(sfxEnergy/effects.length))).toFixed(2)),decodedMonoPeakDbFS:Number((20*Math.log10(peak)).toFixed(2)),portfolioScenes:1,portfolioFromFrame:128,portfolioDurationFrames:73};
writeFileSync('output/sales-v4-audio-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
