import sharp from 'sharp'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const source = process.argv[2]
if (!source) throw new Error('Pass the generated-image directory.')
const provenance = JSON.parse(await readFile('docs/assets/brand-20261023-prompts.json', 'utf8'))
await mkdir('public/images/brand', { recursive: true })
await mkdir('public/images/services', { recursive: true })
for (const [destination, file, promptKey, width] of [
  ['brand/wasla-emblem', 'exec-7c104065-69f6-467a-a383-bd45f9a0a949.png', 'logo', 720],
  ['brand/wasla-device-branded', 'exec-09883fb0-dd8b-47bb-b1e2-73f9d3b004f8.png', 'device', 1200],
  ['services/web-3d', 'exec-ccdc9b8d-0166-412a-ba63-bf9c2507fe39.png', 'service-web', 900],
  ['services/app-3d', 'exec-6d28c273-e010-4fef-b825-15000f862862.png', 'service-app', 900],
  ['services/design-3d', 'exec-d1bc2fc3-0309-46e0-8a92-a3956812b17c.png', 'service-design', 900],
]) {
  const target = `public/images/${destination}.webp`
  await sharp(path.join(source, file)).trim().resize({ width, withoutEnlargement: true }).webp({ quality: 90, alphaQuality: 100 }).toFile(target)
  await writeFile(`${target}.json`, JSON.stringify({ source: provenance.tool, prompt: provenance.prompts[promptKey], original: file, date: provenance.date }, null, 2))
  console.log(`Prepared ${target}`)
}
await sharp('public/images/brand/wasla-emblem.webp').resize(128, 128, { fit: 'contain', background: '#00000000' }).png().toFile('public/images/brand/favicon.png')
await writeFile('public/images/brand/favicon.png.json', JSON.stringify({ source: 'Resized derivative of wasla-emblem.webp, user-provided brand restoration via built-in imagegen.', prompt: provenance.prompts.logo }, null, 2))
