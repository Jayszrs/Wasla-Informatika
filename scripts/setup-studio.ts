import 'dotenv/config'
import { pool, schemaSQL } from '../src/backend/database'
import { hashPassword } from '../src/backend/auth'
import initial from '../src/backend/data/initial-content.json'
await pool.query(schemaSQL)
const client = await pool.connect()
try {
  await client.query('BEGIN')
  await client.query(`SELECT pg_advisory_xact_lock(771091)`)
  const ready = (await client.query(`SELECT slug FROM studio_globals WHERE slug='site-settings'`)).rowCount
  if (!ready) {
    for (const [collection, records] of Object.entries(initial.collections)) for (const doc of records as Record<string, unknown>[]) await client.query(`INSERT INTO studio_documents(collection,id,data,published) VALUES($1,$2,$3,$3) ON CONFLICT DO NOTHING`, [collection, doc.id, doc])
    for (const [slug, data] of Object.entries(initial.globals)) await client.query(`INSERT INTO studio_globals(slug,data) VALUES($1,$2) ON CONFLICT DO NOTHING`, [slug, data])
    console.log('Initialized public Wasla content. No consultation data or user credentials are included in the baseline.')
  }
  const users = await client.query(`SELECT id FROM studio_users LIMIT 1`)
  if (!users.rowCount) {
    const email = process.env.BOOTSTRAP_ADMIN_EMAIL, password = process.env.BOOTSTRAP_ADMIN_PASSWORD
    if (!email || !password || password.length < 12) throw new Error('Set BOOTSTRAP_ADMIN_EMAIL and BOOTSTRAP_ADMIN_PASSWORD (at least 12 characters) in the ignored environment file.')
    await client.query(`INSERT INTO studio_users(email,name,role,password_hash) VALUES($1,'Administrator Wasla','admin',$2)`, [email.toLowerCase(), await hashPassword(password)])
    console.log('Administrator initialized. Credentials are not printed.')
  }
  await client.query(`SELECT setval(pg_get_serial_sequence('studio_documents','id'),GREATEST((SELECT COALESCE(max(id),0) FROM studio_documents)+1,(SELECT last_value FROM studio_documents_id_seq)+1,1000),false)`)
  await client.query('COMMIT')
  console.log('Studio database ready. Existing content and users preserved.')
} catch (error) { await client.query('ROLLBACK'); throw error } finally { client.release(); await pool.end() }
