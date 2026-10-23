import fs from 'node:fs'
import dotenv from 'dotenv'
import services from '../src/lib/creative-services.json'

const production = process.argv.includes('--production')
if (production) {
  const env = dotenv.parse(fs.readFileSync('.local/vercel.production.env'))
  const connection = env.DATABASE_URL_UNPOOLED || env.DATABASE_URL
  if (!new URL(connection).hostname.endsWith('.neon.tech')) throw new Error('Unexpected production database')
  Object.assign(process.env, env, { DATABASE_URL: connection })
} else dotenv.config()
const { pool } = await import('../src/lib/studio-db')
const { saveDocument } = await import('../src/lib/studio-content')
const { validateDocument } = await import('../src/lib/studio-validation')
try {
  const before = await pool.query("SELECT collection,id,data,published,revision FROM studio_documents WHERE collection IN ('services','team') ORDER BY collection,id")
  fs.mkdirSync('.local', { recursive: true })
  fs.writeFileSync(`.local/creative-services-${production ? 'production' : 'local'}-${Date.now()}.json`, JSON.stringify(before.rows), { mode: 0o600 })
  for (const service of services) {
    const existing = await pool.query("SELECT id FROM studio_documents WHERE collection='services' AND data->>'slug'=$1", [service.slug])
    if (existing.rowCount) { console.log('Preserved existing service:', service.slug); continue }
    const parsed = validateDocument('services', service)
    if (!parsed.data) throw new Error(parsed.error)
    const doc = await saveDocument('services', parsed.data, 'owner-request: creative services')
    console.log('Added service:', service.slug, doc.id)
  }
} finally { await pool.end() }
