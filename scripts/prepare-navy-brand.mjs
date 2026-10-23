import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'
const source = process.argv[2]
if (!source) throw new Error('Pass the generated navy logo image path')
const prompt = await readFile('docs/assets/navy-logo-20261023-prompt.txt', 'utf8')
await sharp(source).resize({ width: 720, height: 720, fit: 'contain', background: '#00000000' }).webp({ quality: 92, alphaQuality: 100 }).toFile('public/images/brand/wasla-emblem-navy.webp')
await sharp(source).resize({ width: 128, height: 128, fit: 'contain', background: '#00000000' }).png().toFile('public/images/brand/favicon-navy.png')
for (const file of ['public/images/brand/wasla-emblem-navy.webp', 'public/images/brand/favicon-navy.png']) await writeFile(`${file}.json`, JSON.stringify({ source: 'User-supplied emblem restoration, edited using built-in imagegen to navy circular medallion.', prompt, date: '2026-10-23', original: source, transformations: 'Resize/encode only. Transparency preserved.' }, null, 2))
console.log('Navy emblem and round favicon prepared.')
