import {execFileSync} from 'node:child_process';
import {writeFileSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {binary} from './binaries.mjs';
const source='public/audio/reel/user-sound.mp3';
const sourceDecodedSeconds=14.706958333333333;
const tempo=1;
const raw='public/audio/reel/music-9s-raw.wav';
execFileSync(binary('ffmpeg'),['-v','error','-y','-i',source,'-af',`atempo=${tempo},apad,atrim=end=9`,'-ar','48000','-ac','2','-c:a','pcm_s16le',raw],{windowsHide:true});
const bytes=readFileSync(raw);
for(let at=12;at+8<bytes.length;){const name=bytes.toString('ascii',at,at+4);const length=bytes.readUInt32LE(at+4);if(name==='data'){const count=Math.min(length,bytes.length-at-8)/4;for(let i=0;i<count;i++){const gain=Math.max(0,Math.min(1,i/48000/.012,(9-i/48000)/.35));for(let ch=0;ch<2;ch++){const pos=at+8+i*4+ch*2;bytes.writeInt16LE(Math.round(bytes.readInt16LE(pos)*gain),pos);}}break;}at+=8+length+length%2;}
writeFileSync(raw,bytes);
execFileSync(binary('ffmpeg'),['-v','error','-y','-i',raw,'-af','loudnorm=I=-16:TP=-1.5:LRA=7','-ar','48000','-ac','2','-c:a','pcm_s16le','public/audio/reel/music-9s.wav'],{windowsHide:true});
writeFileSync('public/audio/reel/music-9s-manifest.json',JSON.stringify({source,sourceSha256:createHash('sha256').update(readFileSync(source)).digest('hex'),sourceDecodedSeconds,outputSeconds:9,tempo,pitchPreserved:true,looped:false,voiceOver:false,fadeOutSeconds:.35},null,2));
console.log('Prepared 9-second music from supplied MP3, original tempo; no looping or voice-over.');
