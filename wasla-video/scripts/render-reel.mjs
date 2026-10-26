import {spawnSync,execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {binary} from './binaries.mjs';
import assert from 'node:assert/strict';
mkdirSync('output',{recursive:true});
const file='output/wasla-scroll-reel-35s.mp4';
function run(command,args){const result=spawnSync(command,args,{stdio:'inherit',windowsHide:true});if(result.error)throw result.error;if(result.status!==0)process.exit(result.status||1);}
if(!process.argv.includes('--finalize-only'))run(process.execPath,['node_modules/@remotion/cli/remotion-cli.js','render','src/index.ts','WaslaScrollReel','output/reel-master-35s.mp4','--codec=h264','--crf=18','--concurrency=2','--muted']);
run(binary('ffmpeg'),['-hide_banner','-y','-i','output/reel-master-35s.mp4','-an','-vf','scale=in_range=pc:out_range=tv:in_color_matrix=bt601:out_color_matrix=bt709,format=yuv420p','-c:v','libx264','-preset','medium','-crf','18','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-color_range','tv','-t','35','-movflags','+faststart',file]);
const probe=JSON.parse(execFileSync(binary('ffprobe'),['-v','error','-show_streams','-show_format','-of','json',file],{encoding:'utf8',windowsHide:true}));
const video=probe.streams.find(x=>x.codec_type==='video');
assert.equal(video.codec_name,'h264');assert.equal(video.width,1080);assert.equal(video.height,1920);assert.equal(video.r_frame_rate,'30/1');assert.equal(Number(video.nb_frames),1050);assert.equal(Number(probe.format.duration),35);assert.equal(video.pix_fmt,'yuv420p');assert.equal(probe.streams.filter(x=>x.codec_type==='audio').length,0);
const report={passed:true,file,width:1080,height:1920,fps:30,frames:1050,durationSeconds:35,audioTracks:0,voiceOver:false,embeddedMusic:false,musicReference:'https://www.youtube.com/watch?v=5EpyN_6dqyk',editGridBpm:120,gridNote:'Tempo-based edit; exact phase not measured against a local recording.',sha256:createHash('sha256').update(readFileSync(file)).digest('hex')};
writeFileSync('output/reel-verification.json',JSON.stringify(report,null,2));writeFileSync('output/reel-ffprobe.json',JSON.stringify(probe,null,2));console.log(JSON.stringify(report,null,2));
