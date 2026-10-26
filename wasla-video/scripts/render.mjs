import {spawnSync} from 'node:child_process';
import {mkdirSync,readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {binary} from './binaries.mjs';

process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'));
mkdirSync('output', {recursive: true});
const spec=JSON.parse(readFileSync('video-spec.json','utf8'));
function run(command, args) {
  const result = spawnSync(command, args, {stdio: 'inherit', windowsHide: true});
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}
if (!process.argv.includes('--finalize-only')) {
  run(process.execPath, ['node_modules/@remotion/cli/remotion-cli.js', 'render', 'src/index.ts', 'WaslaCompanyProfile', spec.master, '--codec=h264', '--audio-codec=aac', '--audio-bitrate=192k', '--crf=18', '--concurrency=2']);
}
// Normalize JPEG-derived full-range output to limited-range Rec.709 and remove
// AAC tail padding from the MP4 timeline. Match the authored duration exactly.
run(binary('ffmpeg'), ['-hide_banner', '-y', '-i', spec.master,
  '-vf', 'scale=in_range=pc:out_range=tv:in_color_matrix=bt601:out_color_matrix=bt709,format=yuv420p',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv',
  '-af', `atrim=end=${spec.durationSeconds},asetpts=PTS-STARTPTS`, '-c:a', 'aac', '-b:a', '192k', '-t', String(spec.durationSeconds), '-use_editlist', '1', '-movflags', '+faststart', '-metadata:s:a:0', 'language=ind',
  spec.output]);
run(process.execPath, ['scripts/verify.mjs']);
