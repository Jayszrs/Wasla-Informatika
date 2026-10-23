import fs from 'node:fs'
import dotenv from 'dotenv'
const production = process.argv.includes('--production')
if (production) {
  const env = dotenv.parse(fs.readFileSync('.local/vercel.production.env'))
  if (!new URL(env.DATABASE_URL_UNPOOLED || env.DATABASE_URL).hostname.endsWith('.neon.tech')) throw new Error('Unexpected production database')
  Object.assign(process.env, env, { DATABASE_URL: env.DATABASE_URL_UNPOOLED || env.DATABASE_URL })
} else dotenv.config()
const { pool, schemaSQL } = await import('../src/lib/studio-db')
const backup = JSON.parse(fs.readFileSync(`.local/legacy-${production ? 'production' : 'local'}-backup.json`, 'utf8'))
if (!backup.collections.projects || !backup.globals['site-settings']) throw new Error('Incomplete legacy backup')
await pool.query(schemaSQL)
const client = await pool.connect()
try {
  await client.query('BEGIN')
  for (const [collection, records] of Object.entries(backup.collections) as [string, Record<string, unknown>[]][]) {
    if (collection === 'users') continue
    for (const doc of records) {
      const published = ['projects', 'services', 'posts', 'faqs', 'testimonials'].includes(collection) ? doc._status === 'published' ? doc : null : doc
      await client.query(`INSERT INTO studio_documents(collection,id,data,published,created_at,updated_at) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(collection,id) DO NOTHING`, [collection, doc.id, doc, published, doc.createdAt, doc.updatedAt])
    }
    console.log('Preserved', collection, records.length)
  }
  for (const [slug, data] of Object.entries(backup.globals)) await client.query(`INSERT INTO studio_globals(slug,data) VALUES($1,$2) ON CONFLICT(slug) DO NOTHING`, [slug, data])
  const users = await client.query(`SELECT id,email,name,role,hash,salt FROM users`)
  fs.writeFileSync(`.local/legacy-${production ? 'production' : 'local'}-accounts.json`, JSON.stringify(users.rows), { mode: 0o600 })
  for (const user of users.rows) await client.query(`INSERT INTO studio_users(id,email,name,role,password_hash,legacy_salt) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(email) DO NOTHING`, [user.id, user.email.toLowerCase(), user.name, user.role, user.hash, user.salt])
  await client.query(`SELECT setval(pg_get_serial_sequence('studio_documents','id'),GREATEST((SELECT COALESCE(max(id),0) FROM studio_documents)+1,(SELECT last_value FROM studio_documents_id_seq)+1,1000),false)`)
  await client.query(`SELECT setval(pg_get_serial_sequence('studio_users','id'),GREATEST((SELECT COALESCE(max(id),0) FROM studio_users)+1,100),false)`)
  await client.query('COMMIT')
  console.log('Studio migration committed. Legacy tables unchanged. Existing credentials retained.')
} catch (error) { await client.query('ROLLBACK'); throw error } finally { client.release(); await pool.end() }
