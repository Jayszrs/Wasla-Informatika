import fs from 'node:fs'
import dotenv from 'dotenv'
import { websitePackages } from '../src/shared/website-packages'
const production = process.argv.includes('--production')
if (production) {
  const env = dotenv.parse(fs.readFileSync('.local/vercel.production.env'))
  const connection = env.DATABASE_URL_UNPOOLED || env.DATABASE_URL
  if (!new URL(connection).hostname.endsWith('.neon.tech')) throw Error('Unexpected production database')
  Object.assign(process.env, env, { DATABASE_URL: connection })
} else dotenv.config()
const { pool } = await import('../src/backend/database')
const { validateDocument } = await import('../src/backend/content-validation')
const client = await pool.connect()
try {
  await client.query('BEGIN')
  const result = await client.query("SELECT data,revision FROM studio_globals WHERE slug='site-settings' FOR UPDATE")
  if (!result.rows[0]) throw Error('Settings unavailable')
  fs.writeFileSync(`.local/creative-packages-${production ? 'production' : 'local'}-${Date.now()}.json`, JSON.stringify(result.rows), { mode: 0o600 })
  const current = result.rows[0].data.websitePackages ?? websitePackages.slice(0, 3)
  const additions = websitePackages.slice(3).filter(plan => !current.some((item: { slug: string }) => item.slug === plan.slug))
  const checked = validateDocument('site-settings', { websitePackages: [...current, ...additions] }, true)
  if (!checked.data) throw Error(checked.error)
  if (additions.length) await client.query("UPDATE studio_globals SET data=data||$1::jsonb,revision=revision+1,updated_at=now() WHERE slug='site-settings'", [JSON.stringify(checked.data)])
  await client.query('COMMIT')
  console.log(`Added ${additions.length} creative packages; existing prices and owner edits preserved.`)
} catch (error) { await client.query('ROLLBACK'); throw error }
finally { client.release(); await pool.end() }
