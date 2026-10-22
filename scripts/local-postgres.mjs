import 'dotenv/config'
import EmbeddedPostgres from 'embedded-postgres'
import { existsSync } from 'node:fs'
if (process.env.NODE_ENV === 'production') throw new Error('Use managed PostgreSQL in production.')
const pg = new EmbeddedPostgres({
  databaseDir: '.local/postgres',
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT || 5433),
  persistent: true,
  initdbFlags: ['--encoding=UTF8', '--locale=C'],
})
if (!existsSync('.local/postgres/PG_VERSION')) await pg.initialise()
await pg.start()
try { await pg.createDatabase(process.env.POSTGRES_DB || 'wasla') } catch (error) {
  if (error.code !== '42P04') throw error
}
console.log('Local PostgreSQL ready on loopback. Keep this terminal running; Ctrl+C stops it.')
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => { await pg.stop(); process.exit(0) })
setInterval(() => {}, 60_000)
