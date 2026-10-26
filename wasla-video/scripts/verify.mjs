import {execFileSync} from 'node:child_process';
import {readFileSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {binary} from './binaries.mjs';

process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'));
const spec=JSON.parse(readFileSync('video-spec.json','utf8'));
const file = spec.output;
const probe = JSON.parse(execFileSync(binary('ffprobe'), ['-v','error','-show_streams','-show_format','-of','json',file], {encoding:'utf8', windowsHide:true}));
const video = probe.streams.find(stream => stream.codec_type === 'video');
const audio = probe.streams.find(stream => stream.codec_type === 'audio');
assert.equal(video.codec_name, 'h264');
assert.equal(video.width, 1080); assert.equal(video.height, 1920);
assert.equal(video.r_frame_rate, `${spec.fps}/1`); assert.equal(Number(video.nb_frames), spec.frames);
assert.equal(video.pix_fmt, 'yuv420p'); assert.equal(Number(video.duration), spec.durationSeconds);
assert.equal(Number(probe.format.duration), spec.durationSeconds);
assert.equal(audio.codec_name, 'aac'); assert.equal(Number(audio.duration), spec.durationSeconds);
assert.equal(Number(audio.sample_rate), 48000);
function pcm(input) {
  const bytes = execFileSync(binary('ffmpeg'), ['-v','error','-i',input,'-vn','-ac','1','-ar','48000','-c:a','pcm_s16le','-f','wav','pipe:1'], {maxBuffer:20*1024*1024, windowsHide:true});
  for (let offset=12;offset+8<bytes.length;) {
    const name=bytes.toString('ascii',offset,offset+4); const length=bytes.readUInt32LE(offset+4);
    if (name==='data') {
      const count=Math.floor(Math.min(length,bytes.length-offset-8)/2);
      const samples=new Float32Array(count);
      for(let n=0;n<count;n++) samples[n]=bytes.readInt16LE(offset+8+n*2)/32768;
      return samples;
    }
    offset+=8+length+(length%2);
  }
  throw new Error(`No PCM data in decoded WAV: ${input}`);
}
const mixed = pcm(file);
let peak = 0;
for (const sample of mixed) {assert.ok(Number.isFinite(sample)); peak=Math.max(peak, Math.abs(sample));}
assert.ok(peak > .05 && peak < .99, `Audio peak ${peak} is silent or clipping`);
const narration = JSON.parse(readFileSync(spec.narration,'utf8'));
const scenes = narration.map(scene => {
  const voice = pcm(path.join('public', scene.file));
  const start = Math.round(scene.startFrame/30*48000);
  let cross=0, sourcePower=0, finalPower=0;
  for(let i=0;i<voice.length && start+i<mixed.length;i++) {
    cross += voice[i]*mixed[start+i]; sourcePower += voice[i]**2; finalPower += mixed[start+i]**2;
  }
  const correlation = cross/Math.sqrt(sourcePower*finalPower);
  assert.ok(correlation>.97, `Scene ${scene.scene} narration is missing or out of sync: ${correlation}`);
  const endSeconds=scene.startFrame/30+voice.length/48000;
  const sceneEnd=(scene.sceneStartFrame+scene.sceneFrames)/spec.fps;
  assert.ok(endSeconds<=sceneEnd, `Narration ${scene.scene} is cut off`);
  return {scene:scene.scene, voice:scene.voice, correlation:Number(correlation.toFixed(5)), endSeconds:Number(endSeconds.toFixed(4)), sceneEndSeconds:sceneEnd};
});
const report = {passed:true, file, sha256:createHash('sha256').update(readFileSync(file)).digest('hex'), width:video.width,height:video.height,fps:spec.fps,frames:spec.frames,durationSeconds:spec.durationSeconds,videoCodec:video.codec_name,pixelFormat:video.pix_fmt,audioCodec:audio.codec_name,audioSampleRate:48000,audioTruePeakNote:'See QA.md for FFmpeg true-peak measurement',decodedMonoPeakDbFS:Number((20*Math.log10(peak)).toFixed(2)),scenes};
writeFileSync('output/verification.json',JSON.stringify(report,null,2)+'\n');
writeFileSync('output/ffprobe.json',JSON.stringify(probe,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
