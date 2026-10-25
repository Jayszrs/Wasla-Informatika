import { Pool } from 'pg'
import { attachDatabasePool } from '@vercel/functions'
import { databaseConnectionString } from './database-connection'
const shared = globalThis as unknown as { studioPool?: Pool; studioPoolAttached?: boolean }
export const pool = shared.studioPool ||= new Pool({ connectionString: databaseConnectionString(process.env.DATABASE_URL), max: 3, connectionTimeoutMillis: 8000, idleTimeoutMillis: 10000 })
if (process.env.VERCEL === '1' && !shared.studioPoolAttached) { attachDatabasePool(pool); shared.studioPoolAttached = true }
pool.on('error', () => console.error('Database connection interrupted.'))
export const schemaSQL = `
CREATE TABLE IF NOT EXISTS studio_documents (collection text NOT NULL, id bigserial NOT NULL, data jsonb NOT NULL, published jsonb, revision integer NOT NULL DEFAULT 1, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(collection,id));
CREATE UNIQUE INDEX IF NOT EXISTS studio_documents_slug ON studio_documents(collection,(data->>'slug')) WHERE data->>'slug' IS NOT NULL;
CREATE TABLE IF NOT EXISTS studio_globals (slug text PRIMARY KEY, data jsonb NOT NULL, revision integer NOT NULL DEFAULT 1, updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS studio_users (id bigserial PRIMARY KEY, email text UNIQUE NOT NULL, name text NOT NULL, role text NOT NULL CHECK(role IN ('admin','editor')), password_hash text NOT NULL, legacy_salt text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS studio_sessions (hash text PRIMARY KEY, user_id bigint NOT NULL REFERENCES studio_users(id) ON DELETE CASCADE, expires_at timestamptz NOT NULL);
CREATE INDEX IF NOT EXISTS studio_sessions_expiry ON studio_sessions(expires_at);
CREATE TABLE IF NOT EXISTS studio_login_limits (key text PRIMARY KEY, hits integer NOT NULL, reset_at timestamptz NOT NULL);
CREATE TABLE IF NOT EXISTS studio_revisions (id bigserial PRIMARY KEY, collection text NOT NULL, document_id bigint NOT NULL, data jsonb NOT NULL, actor text NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS studio_revisions_doc ON studio_revisions(collection,document_id,created_at DESC);
CREATE TABLE IF NOT EXISTS contact_rate_limits (key text PRIMARY KEY, hits integer NOT NULL, reset_at timestamptz NOT NULL);
`
