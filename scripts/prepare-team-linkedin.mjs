import { mkdir, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import sharp from 'sharp'

const profiles = [
  { name: 'Bayu Saputra', slug: 'bayu-saputra', linkedin: 'https://www.linkedin.com/in/bayusaputra05/', source: 'https://media.licdn.com/dms/image/v2/D5603AQH1p0PBQmkMnw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1692156615887?e=2147483647&v=beta&t=SQT_l3nVX5CwMYmlXO0lffaeBNcy-sf0VGPeyqaLdhE' },
  { name: 'Adelya Amanda', slug: 'adelya-amanda', linkedin: 'https://www.linkedin.com/in/adelya-amanda/', source: 'https://media.licdn.com/dms/image/v2/D5603AQHFpJnEiTnEyw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1691033377998?e=1794441600&v=beta&t=C8YKsPSbJTM4S8TJ0NiT0-xGyMFC5tSK583sUZUq8VQ' },
  { name: 'Difa Alfaruq', slug: 'difa-alfaruq', linkedin: 'https://www.linkedin.com/in/difa-alfaruq/', source: 'https://media.licdn.com/dms/image/v2/D5635AQGUk4RblH3fDw/profile-framedphoto-shrink_800_800/B56Z_7GZmaHcAY-/0/1786624187606?e=1793696400&v=beta&t=PTPAGfE0pNOznCOjONqTzehNWOmrFdRgGsIFzvhIsS8' },
]
await mkdir('public/images/team', { recursive: true })
const manifest = []
for (const profile of profiles) {
  const response = await fetch(profile.source)
  if (!response.ok) throw new Error(`Portrait unavailable for ${profile.name}: ${response.status}`)
  const original = Buffer.from(await response.arrayBuffer())
  const image = sharp(original)
  const metadata = await image.metadata()
  const output = `/images/team/${profile.slug}-linkedin.webp`
  const encoded = await image.resize({ width: 640, withoutEnlargement: true }).webp({ quality: 88 }).toBuffer()
  await writeFile(`public${output}`, encoded)
  manifest.push({ ...profile, output, width: Math.min(640, metadata.width), height: Math.round(metadata.height * Math.min(1, 640 / metadata.width)), retrieved: '2026-10-27', sourceSHA256: createHash('sha256').update(original).digest('hex'), treatment: 'Original LinkedIn profile photo, resized and encoded as WebP. No generated face or retouching.', whatsapp: null })
}
await writeFile('docs/team-linkedin-provenance.json', JSON.stringify(manifest, null, 2) + '\n')
console.log(manifest.map(({ name, width, height }) => ({ name, width, height })))
