import fs from 'node:fs'
import dotenv from 'dotenv'
const production = process.argv.includes('--production')
if (production) {
  const env = dotenv.parse(fs.readFileSync('.local/vercel.production.env'))
  const connection = env.DATABASE_URL_UNPOOLED || env.DATABASE_URL
  if (!new URL(connection).hostname.endsWith('.neon.tech')) throw Error('Unexpected database')
  Object.assign(process.env, env, { DATABASE_URL: connection })
} else dotenv.config()
const { pool } = await import('../src/backend/database')
const profiles: Record<string, string> = {
  'Project Manager': 'Rekan diskusi untuk kebutuhan dan ruang lingkup project, koordinasi tim, serta rencana pengerjaan.',
  'Software Engineering': 'Rekan diskusi untuk logika aplikasi, struktur perangkat lunak, dan pengembangan solusi sesuai kebutuhan project.',
  'Web Developer': 'Rekan diskusi untuk pengembangan website, antarmuka yang responsif, dan pengelolaan konten web.',
  'Full Stack Engineering': 'Rekan diskusi untuk antarmuka aplikasi, backend, dan integrasi data dalam satu alur pengembangan.',
}
const client = await pool.connect()
try {
  await client.query('BEGIN')
  const result = await client.query("SELECT id,data FROM studio_documents WHERE collection='team' FOR UPDATE")
  fs.writeFileSync(`.local/team-bio-${production ? 'production' : 'local'}-${Date.now()}.json`, JSON.stringify(result.rows), { mode: 0o600 })
  let changed = 0
  for (const row of result.rows) {
    const biography = profiles[row.data.role]
    if (biography && (!row.data.biography || /^Hubungi .+ untuk berdiskusi dengan divisi /.test(row.data.biography))) {
      await client.query("UPDATE studio_documents SET data=data||$2::jsonb,revision=revision+1,updated_at=now() WHERE collection='team' AND id=$1", [row.id, JSON.stringify({ biography })])
      changed++
    }
  }
  await client.query('COMMIT')
  console.log(`Updated ${changed} generic role biographies; owner edits preserved.`)
} catch (error) { await client.query('ROLLBACK'); throw error }
finally { client.release(); await pool.end() }
