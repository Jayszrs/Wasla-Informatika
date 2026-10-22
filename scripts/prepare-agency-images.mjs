import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const source = process.argv[2]
if (!source) throw new Error('Pass the directory containing the original generated images.')
await mkdir('public/images/demo', { recursive: true })
for (const [name, file, width] of [
  ['workspace-hero', 'exec-3c93496b-ccef-49df-b315-a829a76d8feb.png', 1920],
  ['nusa-concept', 'exec-8cb64555-ed0a-4dfb-b5ea-b9079358cb19.png', 1920],
  ['wasla-device', 'exec-380de604-a9dc-4ed8-ace6-4aba37774a21.png', 1400],
]) {
  await sharp(path.join(source, file)).resize({ width, withoutEnlargement: true }).webp({ quality: 90, alphaQuality: 100 }).toFile(`public/images/demo/${name}.webp`)
  console.log(`Prepared ${name}.webp`)
}
