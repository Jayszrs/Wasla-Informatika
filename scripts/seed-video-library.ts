import 'dotenv/config'
import { pool } from '../src/backend/database'
import { seedVideoLibrary } from './lib/seed-video-library'

const client = await pool.connect()
try {
  await client.query('BEGIN')
  await client.query('SELECT pg_advisory_xact_lock(771091)')
  const count = await seedVideoLibrary(client)
  await client.query('COMMIT')
  console.log(`Video gallery ready: ${count} new items. Existing edits and accounts preserved.`)
} catch (error) { await client.query('ROLLBACK'); throw error }
finally { client.release(); await pool.end() }
