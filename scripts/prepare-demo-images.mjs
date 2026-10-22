import sharp from 'sharp'
import { mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const source = process.argv[2]
if (!source) throw new Error('Pass the directory containing the three generated originals.')
const files = {
  ruang: 'exec-59014bb0-ce3e-466f-9bfc-582f9a9feb7d.png',
  alur: 'exec-2bfd4dd6-cb77-4541-b5e8-2a6c9adb50d6.png',
  sela: 'exec-98e9d690-a3c0-46c6-a16a-a2f37adc4926.png',
}
await mkdir('public/images/demo', { recursive: true })
for (const [name, filename] of Object.entries(files)) {
  const data = await readFile(path.join(source, filename))
  await sharp(data).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 90 }).toFile(`public/images/demo/${name}-concept.webp`)
  console.log(`Prepared ${name}-concept.webp`)
}
