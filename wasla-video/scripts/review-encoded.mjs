import {execFileSync} from 'node:child_process';
import {binary} from './binaries.mjs';
for(const frame of [0,45,200,370,430,470,530,590,670,710,830,899]) {
  execFileSync(binary('ffmpeg'), ['-v','error','-y','-ss',(frame/30).toFixed(6),'-i','output/wasla-informatika-company-profile-30s.mp4','-frames:v','1',`output/review/encoded-${String(frame).padStart(3,'0')}.png`], {windowsHide:true});
  console.log(`Decoded final frame ${frame}`);
}
