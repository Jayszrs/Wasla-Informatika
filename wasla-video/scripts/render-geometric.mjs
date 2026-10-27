import {spawnSync,execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {binary} from './binaries.mjs';
import assert from 'node:assert/strict';
mkdirSync('output',{recursive:true});
const file='output/wasla-geometric-9s.mp4';
function run(command,args){const result=spawnSync(command,args,{stdio:'inherit',windowsHide:true});if(result.error)throw result.error;if(result.status!==0)process.exit(result.status||1);}
if(!process.argv.includes('--finalize-only'))run(process.execPath,['node_modules/@remotion/cli/remotion-cli.js','render','src/index.ts','WaslaGeometricReel','output/geometric-master-9s.mp4','--codec=h264','--audio-codec=aac','--audio-bitrate=192k','--crf=18','--concurrency=2']);
run(binary('ffmpeg'),['-hide_banner','-y','-i','output/geometric-master-9s.mp4','-i','public/audio/reel/music-9s.wav','-map','0:v:0','-map','1:a:0','-vf','scale=in_range=pc:out_range=tv:in_color_matrix=bt601:out_color_matrix=bt709,format=yuv420p','-c:v','libx264','-preset','medium','-crf','18','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-color_range','tv','-af','atrim=end=9,asetpts=PTS-STARTPTS','-c:a','aac','-b:a','192k','-t','9','-use_editlist','1','-movflags','+faststart',file]);
const probe=JSON.parse(execFileSync(binary('ffprobe'),['-v','error','-show_streams','-show_format','-of','json',file],{encoding:'utf8',windowsHide:true}));
const video=probe.streams.find(x=>x.codec_type==='video');const audio=probe.streams.find(x=>x.codec_type==='audio');
assert.equal(video.codec_name,'h264');assert.equal(video.width,1080);assert.equal(video.height,1920);assert.equal(video.r_frame_rate,'30/1');assert.equal(Number(video.nb_frames),270);assert.equal(Number(probe.format.duration),9);assert.equal(video.pix_fmt,'yuv420p');assert.equal(audio.codec_name,'aac');assert.equal(Number(audio.duration),9);assert.equal(Number(audio.sample_rate),48000);
const report={passed:true,file,width:1080,height:1920,fps:30,frames:270,durationSeconds:9,voiceOver:false,embeddedMusic:true,musicSource:'User-supplied MP3, trimmed to 9s at original tempo, no loop',reference:'https://pin.it/1XOcr4ZmM',referenceEvidence:'ev_cf0e437bd4101cbfd22397cbe5461180e824946ae9af136e2e3b6c0494441d94',sha256:createHash('sha256').update(readFileSync(file)).digest('hex')};
writeFileSync('output/geometric-verification.json',JSON.stringify(report,null,2));writeFileSync('output/geometric-ffprobe.json',JSON.stringify(probe,null,2));console.log(JSON.stringify(report,null,2));
