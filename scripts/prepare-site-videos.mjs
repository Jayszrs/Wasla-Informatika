import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { homedir } from 'node:os'
import path from 'node:path'

const ffmpeg = path.resolve('wasla-video/node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe')
await mkdir('public/videos', { recursive: true })
const videos = [
  { original: 'wasla-landscape-reference-27s6.mp4', name: 'wasla-introduction', width: 1600, frame: 16.5 },
  { original: 'WaslaSalesReel-Revisi-SFX-v4.mp4', name: 'wasla-sales-reel', width: 720, frame: 1.4 },
]
const records = []
for (const video of videos) {
  const input = path.join(homedir(), 'Downloads', video.original)
  const output = `public/videos/${video.name}.mp4`
  const encode = spawnSync(ffmpeg, ['-y', '-hide_banner', '-loglevel', 'error', '-i', input, '-vf', `scale=${video.width}:-2`, '-r', '30', '-c:v', 'libx264', '-preset', 'medium', '-crf', '24', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', output], { encoding: 'utf8' })
  if (encode.status) throw new Error(encode.stderr)
  const poster = spawnSync(ffmpeg, ['-y', '-hide_banner', '-loglevel', 'error', '-ss', String(video.frame), '-i', output, '-frames:v', '1', '-q:v', '3', `public/videos/${video.name}.jpg`], { encoding: 'utf8' })
  if (poster.status) throw new Error(poster.stderr)
  const original = await readFile(input), encoded = await readFile(output)
  records.push({ source: video.original, sourceSHA256: createHash('sha256').update(original).digest('hex'), output, bytes: encoded.length, sha256: createHash('sha256').update(encoded).digest('hex'), treatment: 'Same full video and original audio, resized and compressed for web delivery; no added voiceover.' })
}
await writeFile('docs/site-video-provenance.json', JSON.stringify(records, null, 2) + '\n')
console.log(records.map(({ output, bytes }) => ({ output, bytes })))
