import { randomBytes, createHash, scrypt as scryptCallback, timingSafeEqual, pbkdf2 as pbkdf2Callback } from 'node:crypto'
import { promisify } from 'node:util'
import { cookies } from 'next/headers'
import { pool } from './database'
const scrypt = promisify(scryptCallback)
const pbkdf2 = promisify(pbkdf2Callback)
export type StudioUser = { id: number; name: string; email: string; role: 'admin' | 'editor' }
export const sessionCookie = 'wasla_session'
export const tokenHash = (token: string) => createHash('sha256').update(token).digest('hex')
export async function hashPassword(password: string) {
  const salt = randomBytes(24).toString('hex')
  const derived = await scrypt(password, salt, 64) as Buffer
  return `scrypt:${salt}:${derived.toString('hex')}`
}
export async function verifyPassword(password: string, hash: string, legacySalt?: string) {
  let actual: Buffer, expected: Buffer
  if (hash.startsWith('scrypt:')) {
    const [, salt, stored] = hash.split(':')
    actual = await scrypt(password, salt, 64) as Buffer; expected = Buffer.from(stored, 'hex')
  } else if (legacySalt) {
    const modern = hash.startsWith('pbkdf2-sha256-v1:')
    expected = Buffer.from(modern ? hash.slice('pbkdf2-sha256-v1:'.length) : hash, 'hex')
    actual = await pbkdf2(password, legacySalt, modern ? 600000 : 25000, modern ? 32 : 512, 'sha256')
  } else return false
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}
export async function currentUser(): Promise<StudioUser | null> {
  const token = (await cookies()).get(sessionCookie)?.value
  if (!token || !/^[a-zA-Z0-9_-]{43}$/.test(token)) return null
  const result = await pool.query<StudioUser>(`SELECT u.id,u.name,u.email,u.role FROM studio_users u JOIN studio_sessions s ON s.user_id=u.id WHERE s.hash=$1 AND s.expires_at>now()`, [tokenHash(token)])
  return result.rows[0] ? { ...result.rows[0], id: Number(result.rows[0].id) } : null
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  const allowed = [new URL(request.url).origin, process.env.NEXT_PUBLIC_SITE_URL, 'https://waslainformatika.vercel.app', 'https://wasla.my.id'].filter(Boolean)
  return !!origin && allowed.includes(origin) && !['cross-site'].includes(request.headers.get('sec-fetch-site') || '')
}
export async function createSession(id: number) {
  const token = randomBytes(32).toString('base64url')
  await pool.query(`DELETE FROM studio_sessions WHERE expires_at<now()`)
  await pool.query(`INSERT INTO studio_sessions(hash,user_id,expires_at) VALUES($1,$2,now()+interval '8 hours')`, [tokenHash(token), id])
  ;(await cookies()).set(sessionCookie, token, { httpOnly: true, secure: (process.env.NEXT_PUBLIC_SITE_URL || '').startsWith('https://'), sameSite: 'lax', path: '/', maxAge: 28800 })
}
