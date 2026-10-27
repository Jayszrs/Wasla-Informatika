import {execFileSync} from 'node:child_process';
import {writeFileSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {binary} from './binaries.mjs';
const source='public/audio/reel/music-loop-raw.wav';
const sourceDecodedSeconds=30;
const tempo=1;
const raw='public/audio/reel/music-landscape-27s6-raw.wav';
execFileSync(binary('ffmpeg'),['-v','error','-y','-i',source,'-af',`atempo=${tempo},apad,atrim=end=27.6`,'-ar','48000','-ac','2','-c:a','pcm_s16le',raw],{windowsHide:true});
const bytes=readFileSync(raw);
for(let at=12;at+8<bytes.length;){const name=bytes.toString('ascii',at,at+4);const length=bytes.readUInt32LE(at+4);if(name==='data'){const count=Math.min(length,bytes.length-at-8)/4;for(let i=0;i<count;i++){const gain=Math.max(0,Math.min(1,i/48000/.012,(27.6-i/48000)/.35));for(let ch=0;ch<2;ch++){const pos=at+8+i*4+ch*2;bytes.writeInt16LE(Math.round(bytes.readInt16LE(pos)*gain),pos);}}break;}at+=8+length+length%2;}
writeFileSync(raw,bytes);
execFileSync(binary('ffmpeg'),['-v','error','-y','-i',raw,'-af','loudnorm=I=-16:TP=-1.5:LRA=7','-ar','48000','-ac','2','-c:a','pcm_s16le','public/audio/reel/music-landscape-27s6.wav'],{windowsHide:true});
// Leave extra headroom for AAC intersample overshoot on the supplied transients.
const mastered=readFileSync('public/audio/reel/music-landscape-27s6.wav');
for(let at=12;at+8<mastered.length;){const name=mastered.toString('ascii',at,at+4);const length=mastered.readUInt32LE(at+4);if(name==='data'){const end=Math.min(at+8+length,mastered.length);for(let pos=at+8;pos+2<=end;pos+=2)mastered.writeInt16LE(Math.round(mastered.readInt16LE(pos)*.75),pos);break;}at+=8+length+length%2;}
writeFileSync('public/audio/reel/music-landscape-27s6.wav',mastered);
writeFileSync('public/audio/reel/music-landscape-27s6-manifest.json',JSON.stringify({source,sourceSha256:createHash('sha256').update(readFileSync(source)).digest('hex'),sourceDecodedSeconds,outputSeconds:27.6,tempo,pitchPreserved:true,looped:true,voiceOver:false,fadeOutSeconds:.35,postNormalizationGain:.75},null,2));
console.log('Prepared 27.6-second music from the supplied recording, equal-power loop, no voice-over.');
