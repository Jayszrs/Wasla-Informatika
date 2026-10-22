import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { randomBytes } from 'node:crypto'
if (process.env.NODE_ENV === 'production') throw new Error('Local development only.')
let env = readFileSync('.env', 'utf8')
if (/^BOOTSTRAP_ADMIN_EMAIL=.+$/m.test(env)) { console.log('Bootstrap values already set; unchanged.'); process.exit(0) }
const email = 'admin@wasla.local'
const password = randomBytes(24).toString('base64url')
env = env.replace(/^BOOTSTRAP_ADMIN_EMAIL=$/m, `BOOTSTRAP_ADMIN_EMAIL=${email}`).replace(/^BOOTSTRAP_ADMIN_PASSWORD=$/m, `BOOTSTRAP_ADMIN_PASSWORD=${password}`)
writeFileSync('.env', env, { mode: 0o600 })
mkdirSync('.local', { recursive: true })
writeFileSync('.local/admin-credentials.txt', `LOCAL DEVELOPMENT ACCOUNT ONLY\nEmail: ${email}\nPassword: ${password}\n\nUse your own owner account and unique secrets in production.\n`, { mode: 0o600 })
console.log('Generated local-only bootstrap values. Credentials are in ignored .local/admin-credentials.txt.')
