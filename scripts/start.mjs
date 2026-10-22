import 'dotenv/config'
import { cp, access } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const standalone = path.join(root, '.next', 'standalone')
const server = path.join(standalone, 'server.js')
try { await access(server) } catch { throw new Error('Production build missing. Run npm run build before npm start.') }
await cp(path.join(root, 'public'), path.join(standalone, 'public'), { recursive: true })
await cp(path.join(root, '.next', 'static'), path.join(standalone, '.next', 'static'), { recursive: true })
process.env.HOSTNAME ||= '127.0.0.1'
process.env.PORT ||= '3000'
process.env.MEDIA_DIR = path.resolve(root, process.env.MEDIA_DIR || 'media')
await import(pathToFileURL(server).href)
