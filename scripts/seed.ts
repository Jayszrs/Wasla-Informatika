import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { serviceSeeds, projectSeeds, postSeeds, faqSeeds, richText } from '../src/lib/seed-content'

const payload = await getPayload({ config })
const users = await payload.count({ collection: 'users', overrideAccess: true })
if (!users.totalDocs) {
  if (!process.env.BOOTSTRAP_ADMIN_EMAIL || !process.env.BOOTSTRAP_ADMIN_PASSWORD || process.env.BOOTSTRAP_ADMIN_PASSWORD.length < 16) {
    throw new Error('Set BOOTSTRAP_ADMIN_EMAIL and a unique BOOTSTRAP_ADMIN_PASSWORD of at least 16 characters in .env. No public registration is allowed.')
  }
  await payload.create({ collection: 'users', overrideAccess: true, context: { bootstrapAdmin: true }, data: {
    name: 'Administrator Wasla', email: process.env.BOOTSTRAP_ADMIN_EMAIL, password: process.env.BOOTSTRAP_ADMIN_PASSWORD, role: 'admin',
  } })
}
for (const [i, [title, slug, excerpt, category, deliverables]] of serviceSeeds.entries()) {
  const exists = await payload.count({ collection: 'services', where: { slug: { equals: slug } }, overrideAccess: true })
  if (!exists.totalDocs) await payload.create({ collection: 'services', data: { title, slug, excerpt, category, order: i,
    content: richText([excerpt, 'Setiap kebutuhan dimulai dari pemahaman proses bisnis dan pengguna. Kami memetakan prioritas, menyusun lingkup, lalu mengembangkan solusi secara bertahap dengan tinjauan bersama.', 'Teknologi dan hasil kerja ditentukan berdasarkan konteks proyek. Diskusikan kebutuhan Anda untuk mendapatkan arah implementasi yang sesuai.']),
    deliverables: deliverables.map(item => ({ item })), _status: 'published' }, overrideAccess: true })
}
for (const [i, item] of projectSeeds.entries()) {
  const exists = await payload.count({ collection: 'projects', where: { slug: { equals: item.slug } }, overrideAccess: true })
  if (!exists.totalDocs) await payload.create({ collection: 'projects', overrideAccess: true, data: { ...item,
    technologies: item.technologies.map(name => ({ name })), isConcept: true, featured: true, order: i, _status: 'published' } })
}
for (const [i, post] of postSeeds.entries()) {
  const exists = await payload.count({ collection: 'posts', where: { slug: { equals: post.slug } }, overrideAccess: true })
  if (!exists.totalDocs) await payload.create({ collection: 'posts', overrideAccess: true, data: {
    title: post.title, slug: post.slug, category: post.category, excerpt: post.excerpt, content: richText(post.paragraphs),
    publishedAt: new Date(Date.UTC(2026, 9, 22 - i)).toISOString(), _status: 'published',
  } })
}
for (const [i, [question, answer]] of faqSeeds.entries()) {
  const exists = await payload.count({ collection: 'faqs', where: { question: { equals: question } }, overrideAccess: true })
  if (!exists.totalDocs) await payload.create({ collection: 'faqs', overrideAccess: true, data: { question, answer, order: i, category: 'Proyek', _status: 'published' } })
}
const settings = await payload.findGlobal({ slug: 'site-settings', overrideAccess: true })
if (!settings.heroTitle) await payload.updateGlobal({ slug: 'site-settings', overrideAccess: true, data: {
  name: 'Wasla Informatika', description: 'Studio pengembangan website, aplikasi, dan solusi IT untuk kebutuhan bisnis di Indonesia.',
  heroTitle: 'Solusi teknologi.\nBisnis melaju.',
  heroCopy: 'Wasla Informatika menghadirkan website, aplikasi, dan solusi IT yang dirancang untuk membantu bisnis berkembang secara digital.',
  statement: 'Teknologi yang tepat dimulai dari pemahaman yang baik.',
  seoDescription: 'Website, aplikasi web, desain UI/UX, dan solusi IT dari Wasla Informatika. Diskusikan kebutuhan digital bisnis Anda.',
  footerNote: 'Teknologi dengan tujuan. Desain dengan perhatian.',
} })
const navigation = await payload.findGlobal({ slug: 'navigation', overrideAccess: true })
if (!navigation.links?.length) await payload.updateGlobal({ slug: 'navigation', overrideAccess: true, data: { links: [
  { label: 'Layanan', href: '/layanan', enabled: true, order: 0 }, { label: 'Karya', href: '/portofolio', enabled: true, order: 1 },
  { label: 'Tentang', href: '/tentang-kami', enabled: true, order: 2 }, { label: 'Insights', href: '/insights', enabled: true, order: 3 },
] } })
console.log('Seed complete. Existing content preserved. No client evidence or team members invented.')
await payload.destroy()
process.exit(0)
