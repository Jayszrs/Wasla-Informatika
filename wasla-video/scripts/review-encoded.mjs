import {execFileSync} from 'node:child_process';
import {binary} from './binaries.mjs';
for(const frame of [0,45,180,360,485,600,725,840,965,1080,1205,1310,1450,1580,1660,1730,1799]) {
  execFileSync(binary('ffmpeg'), ['-v','error','-y','-ss',(frame/30).toFixed(6),'-i','output/wasla-informatika-portfolio-60s.mp4','-frames:v','1',`output/review/encoded-${String(frame).padStart(4,'0')}.png`], {windowsHide:true});
  console.log(`Decoded final frame ${frame}`);
}
