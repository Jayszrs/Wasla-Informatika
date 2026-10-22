import 'dotenv/config'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const payload = await getPayload({ config })
const seeds = [
  { name: 'ruang', slug: 'ruang-commerce', alt: 'Konsep Ruang: website toko furnitur pada monitor dan ponsel di studio dengan cahaya alami.', post: 'website-atau-aplikasi-web' },
  { name: 'alur', slug: 'alur-operations', alt: 'Konsep Alur: aplikasi pengelolaan proyek pada laptop dan ponsel dalam studio navy.', post: 'perawatan-produk-digital' },
  { name: 'sela', slug: 'sela-journal', alt: 'Konsep Sela: website jurnal desain dengan fotografi arsitektur pada laptop dan tablet.', post: 'menyiapkan-brief-digital' },
]
let heroID: number | undefined
for (const item of seeds) {
  const filename = `${item.name}-concept.webp`
  const existing = await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1, overrideAccess: true })
  const media = existing.docs[0] || await payload.create({ collection: 'media', overrideAccess: true,
    filePath: path.resolve('public/images/demo', filename),
    data: { alt: item.alt, caption: 'Gambar contoh orisinal, dibuat dengan imagegen. Konsep eksplorasi; bukan proyek klien. Dapat diganti melalui CMS.' },
  })
  if (item.name === 'alur') heroID = media.id
  const projects = await payload.find({ collection: 'projects', where: { slug: { equals: item.slug } }, limit: 1, overrideAccess: true })
  const project = projects.docs[0]
  if (project?.isConcept && !project.thumbnail) await payload.update({ collection: 'projects', id: project.id, overrideAccess: true, data: { thumbnail: media.id, _status: 'published' } })
  const posts = await payload.find({ collection: 'posts', where: { slug: { equals: item.post } }, limit: 1, overrideAccess: true })
  const post = posts.docs[0]
  if (post && !post.image) await payload.update({ collection: 'posts', id: post.id, overrideAccess: true, data: { image: media.id, _status: 'published' } })
}
const settings = await payload.findGlobal({ slug: 'site-settings', overrideAccess: true })
await payload.updateGlobal({ slug: 'site-settings', overrideAccess: true, data: {
  ...(!settings.heroImage && heroID ? { heroImage: heroID } : {}),
  ...(['Solusi teknologi untuk membawa bisnismu lebih maju.', 'Solusi teknologi.\nKemungkinan baru.'].includes(settings.heroTitle) ? { heroTitle: 'Solusi teknologi.\nBisnis melaju.' } : {}),
} })
console.log('Demo media ready. Existing image selections and custom content preserved.')
await payload.destroy()
process.exit(0)
