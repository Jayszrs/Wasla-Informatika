import {spawnSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {binary} from './binaries.mjs';

process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'));
mkdirSync('output', {recursive: true});
function run(command, args) {
  const result = spawnSync(command, args, {stdio: 'inherit', windowsHide: true});
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}
if (!process.argv.includes('--finalize-only')) {
  run(process.execPath, ['node_modules/@remotion/cli/remotion-cli.js', 'render', 'src/index.ts', 'WaslaCompanyProfile', 'output/render-master.mp4', '--codec=h264', '--audio-codec=aac', '--audio-bitrate=192k', '--crf=18', '--concurrency=2']);
}
// Normalize JPEG-derived full-range output to limited-range Rec.709 and remove
// AAC tail padding from the MP4 timeline. Video AND container end at 30.000s.
run(binary('ffmpeg'), ['-hide_banner', '-y', '-i', 'output/render-master.mp4',
  '-vf', 'scale=in_range=pc:out_range=tv:in_color_matrix=bt601:out_color_matrix=bt709,format=yuv420p',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv',
  '-af', 'atrim=end=30,asetpts=PTS-STARTPTS', '-c:a', 'aac', '-b:a', '192k', '-t', '30', '-use_editlist', '1', '-movflags', '+faststart', '-metadata:s:a:0', 'language=ind',
  'output/wasla-informatika-company-profile-30s.mp4']);
run(process.execPath, ['scripts/verify.mjs']);
