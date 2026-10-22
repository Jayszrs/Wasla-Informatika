import { randomBytes } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
if (existsSync('.env')) { console.log('.env already exists; unchanged.'); process.exit(0) }
const password = randomBytes(24).toString('hex')
let content = readFileSync('.env.example', 'utf8')
  .replaceAll('REPLACE_WITH_RANDOM_PASSWORD', password)
  .replace('REPLACE_WITH_AT_LEAST_32_RANDOM_BYTES', randomBytes(48).toString('hex'))
writeFileSync('.env', content, { mode: 0o600 })
mkdirSync('.local', { recursive: true })
console.log('Created ignored .env with random local database password and Payload secret. Set bootstrap email/password before seeding an administrator.')
