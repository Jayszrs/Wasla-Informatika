import {spawnSync,execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {binary} from './binaries.mjs';
import assert from 'node:assert/strict';
mkdirSync('output',{recursive:true});
const file='output/wasla-motion-reference-30s.mp4';
function run(command,args){const result=spawnSync(command,args,{stdio:'inherit',windowsHide:true});if(result.error)throw result.error;if(result.status!==0)process.exit(result.status||1);}
if(!process.argv.includes('--finalize-only'))run(process.execPath,['node_modules/@remotion/cli/remotion-cli.js','render','src/index.ts','WaslaMotionReel','output/motion-master-30s.mp4','--codec=h264','--audio-codec=aac','--audio-bitrate=192k','--crf=18','--concurrency=2']);
run(binary('ffmpeg'),['-hide_banner','-y','-i','output/motion-master-30s.mp4','-i','public/audio/reel/music-30s.wav','-map','0:v:0','-map','1:a:0','-vf','scale=in_range=pc:out_range=tv:in_color_matrix=bt601:out_color_matrix=bt709,format=yuv420p','-c:v','libx264','-preset','medium','-crf','18','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-color_range','tv','-af','atrim=end=30,asetpts=PTS-STARTPTS','-c:a','aac','-b:a','192k','-t','30','-use_editlist','1','-movflags','+faststart',file]);
const probe=JSON.parse(execFileSync(binary('ffprobe'),['-v','error','-show_streams','-show_format','-of','json',file],{encoding:'utf8',windowsHide:true}));
const video=probe.streams.find(x=>x.codec_type==='video');const audio=probe.streams.find(x=>x.codec_type==='audio');
assert.equal(video.codec_name,'h264');assert.equal(video.width,1080);assert.equal(video.height,1920);assert.equal(video.r_frame_rate,'30/1');assert.equal(Number(video.nb_frames),900);assert.equal(Number(probe.format.duration),30);assert.equal(video.pix_fmt,'yuv420p');assert.equal(audio.codec_name,'aac');assert.equal(Number(audio.duration),30);assert.equal(Number(audio.sample_rate),48000);
const report={passed:true,file,width:1080,height:1920,fps:30,frames:900,durationSeconds:30,voiceOver:false,embeddedMusic:true,musicSource:'User-supplied MP3, looped with equal-power fades',reference:'https://pin.it/4EUwN5nj4',referenceEvidence:'ev_2ae92d96d3e0626f80df631904a77eb4d226b8e92b9efbd14943cc767f39c35b',sha256:createHash('sha256').update(readFileSync(file)).digest('hex')};
writeFileSync('output/motion-verification.json',JSON.stringify(report,null,2));writeFileSync('output/motion-ffprobe.json',JSON.stringify(probe,null,2));console.log(JSON.stringify(report,null,2));
