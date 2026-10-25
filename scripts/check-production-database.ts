import fs from 'node:fs'
import dotenv from 'dotenv'
import { Pool } from 'pg'
import { databaseConnectionString } from '../src/backend/database-connection'
const env = dotenv.parse(fs.readFileSync('.local/vercel.production.env'))
const connectionString = databaseConnectionString(env.DATABASE_URL)
if (!connectionString || !new URL(connectionString).hostname.endsWith('.neon.tech') || new URL(connectionString).searchParams.get('sslmode') !== 'verify-full') throw Error('Expected verified production TLS')
const pool = new Pool({ connectionString, max: 1, connectionTimeoutMillis: 10000 })
try {
  const client = await pool.connect()
  try {
    await client.query('SELECT 1')
    const stream = (client as unknown as { connection: { stream: { encrypted: boolean; authorized: boolean; getProtocol(): string } } }).connection.stream
    if (!stream.encrypted || !stream.authorized) throw Error('Verified TLS not established')
    console.log(JSON.stringify({ connected: true, sslmode: 'verify-full', encrypted: stream.encrypted, certificateAuthorized: stream.authorized, protocol: stream.getProtocol() }))
  } finally { client.release() }
} finally { await pool.end() }
