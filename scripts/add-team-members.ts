import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { listDocuments, saveDocument } from '../src/backend/content'
import { pool } from '../src/backend/database'

const people = [
  { name: 'Bayu Saputra', role: 'Project Consultant & QA Project', biography: 'Rekan diskusi untuk kebutuhan project, pemeriksaan kualitas, dan kesesuaian hasil dengan lingkup yang disepakati.', slug: 'bayu-saputra', order: 4 },
  { name: 'Adelya Amanda', role: 'Mobile Developer & UI UX Specialist', biography: 'Rekan diskusi untuk pengembangan aplikasi mobile serta perancangan antarmuka dan pengalaman pengguna.', slug: 'adelya-amanda', order: 5 },
  { name: 'Difa Alfaruq', role: 'UI UX Designer', biography: 'Rekan diskusi untuk alur pengguna, struktur antarmuka, dan desain pengalaman digital yang mudah digunakan.', slug: 'difa-alfaruq', order: 6 },
]
const portraits = JSON.parse(await readFile('docs/team-linkedin-provenance.json', 'utf8')) as { name: string; linkedin: string; output: string; width: number; height: number }[]
try {
  const team = await listDocuments('team', true, false)
  await mkdir('.local/site-review', { recursive: true })
  await writeFile(`.local/site-review/team-before-additions-${Date.now()}.json`, JSON.stringify(team, null, 2))
  for (const person of people) {
    const portrait = portraits.find(photo => photo.name === person.name)!
    const existing = team.find(member => member.name === person.name || (member.socials as { url?: string }[] | undefined)?.some(social => social.url === portrait.linkedin))
    if (existing) { console.log(`${person.name}: already present; existing edits preserved`); continue }
    const filename = `${person.slug}-linkedin.webp`
    const media = await saveDocument('media', { filename, url: portrait.output, alt: `Foto profil LinkedIn ${person.name}`, mimeType: 'image/webp', width: portrait.width, height: portrait.height, caption: 'Foto profil LinkedIn asli; ukuran dan format dioptimalkan untuk website.' }, 'owner-request-20261027')
    const fields = { name: person.name, role: person.role, biography: person.biography, order: person.order }
    const saved = await saveDocument('team', { ...fields, photo: media.id, socials: [{ label: 'LinkedIn', url: portrait.linkedin }] }, 'owner-request-20261027')
    console.log(`${person.name}: added as ${saved.id}`)
  }
} finally { await pool.end() }
