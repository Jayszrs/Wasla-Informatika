import type { Media, Project, Service, Post, Team, Faq, Testimonial, ContactSubmission, SiteSetting, Navigation, VideoProject } from '@/shared/content-types'
import { pool } from './database'
import { editorialCollections } from '../shared/studio-schema'
import { publicBlobSource } from '@/shared/media'
export type ContentMap = { media: Media; projects: Project; services: Service; posts: Post; team: Team; faqs: Faq; testimonials: Testimonial; 'contact-submissions': ContactSubmission; 'video-projects': VideoProject }
export type Doc = Record<string, unknown> & { id: number; revision?: number; updatedAt?: string; createdAt?: string }
type Row = { id: string; data: Record<string, unknown>; published: Record<string, unknown> | null; revision: number; updated_at: Date; created_at: Date }
const mediaFields = new Set(['image', 'thumbnail', 'illustration', 'photo', 'heroImage', 'featureImage', 'favicon', 'logoWhite', 'logoNavy', 'clientLogo', 'video'])
export async function expand<T>(value: T): Promise<T> {
  const ids = new Set<number>()
  function collect(input: unknown, key = '') {
    if (mediaFields.has(key) && typeof input === 'number') ids.add(input)
    else if (Array.isArray(input)) input.forEach(item => collect(item))
    else if (input && typeof input === 'object') Object.entries(input).forEach(([k, v]) => collect(v, k))
  }
  collect(value)
  if (!ids.size) return value
  const media = await pool.query<Pick<Row, 'id' | 'data'>>(`SELECT id,data FROM studio_documents WHERE collection='media' AND id=ANY($1::bigint[])`, [[...ids]])
  const useBlob = process.env.VERCEL === '1' || process.env.USE_VERCEL_BLOB === 'true'
  const map = new Map(media.rows.map(row => {
    const source = useBlob ? publicBlobSource(row.data.blobURL) : undefined
    return [Number(row.id), { ...row.data, ...(source ? { url: source } : {}), id: Number(row.id) }]
  }))
  function walk(input: unknown, key = ''): unknown {
    if (mediaFields.has(key) && typeof input === 'number') return map.get(input) || null
    if (Array.isArray(input)) return input.map(item => walk(item))
    if (input && typeof input === 'object') return Object.fromEntries(Object.entries(input).map(([k, v]) => [k, walk(v, k)]))
    return input
  }
  return walk(value) as T
}
export async function findMediaByFilename(filename: string): Promise<Doc | null> {
  const result = await pool.query<Pick<Row, 'id' | 'data'>>(`SELECT id,data FROM studio_documents WHERE collection='media' AND (data->>'filename'=$1 OR data->'sizes'->'card'->>'filename'=$1) LIMIT 1`, [filename])
  const row = result.rows[0]
  return row ? { ...row.data, id: Number(row.id) } : null
}
export async function listDocuments(collection: string, staff = false, resolve = true): Promise<Doc[]> {
  const editorial = editorialCollections.includes(collection)
  const rows = await pool.query<Row>(`SELECT * FROM studio_documents WHERE collection=$1 ${!staff && editorial ? 'AND published IS NOT NULL' : ''} ORDER BY id`, [collection])
  const docs = rows.rows.map(row => ({ ...(!staff && editorial ? row.published : row.data), id: Number(row.id), revision: row.revision, ...(staff && editorial ? { _hasPublished: !!row.published } : {}), createdAt: row.created_at.toISOString(), updatedAt: row.updated_at.toISOString() })) as Doc[]
  const visible = collection === 'testimonials' && !staff ? docs.filter(d => d.approved === true) : docs
  visible.sort((a, b) => Number(a.order || 0) - Number(b.order || 0))
  return resolve ? expand(visible) : visible
}
export async function getGlobal<T extends 'site-settings' | 'navigation'>(slug: T, resolve = true): Promise<T extends 'site-settings' ? SiteSetting : Navigation> {
  const result = await pool.query(`SELECT data,revision FROM studio_globals WHERE slug=$1`, [slug])
  if (!result.rows[0]) throw new Error('Website settings have not been migrated.')
  const doc = { ...result.rows[0].data, revision: result.rows[0].revision }
  return resolve ? expand(doc) : doc
}
export async function saveDocument(collection: string, data: Record<string, unknown>, actor: string, id?: number, revision?: number): Promise<Doc> {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const existing = id ? (await client.query<Row>(`SELECT * FROM studio_documents WHERE collection=$1 AND id=$2 FOR UPDATE`, [collection, id])).rows[0] : null
    if (id && !existing) throw new Error('NOT_FOUND')
    if (existing && revision !== undefined && revision !== existing.revision) throw new Error('CONFLICT')
    const merged = { ...existing?.data, ...data }
    delete merged.id; delete merged.revision; delete merged.createdAt; delete merged.updatedAt
    const published = editorialCollections.includes(collection) ? merged._status === 'published' ? merged : existing?.published || null : merged
    const result = existing ? await client.query<Row>(`UPDATE studio_documents SET data=$3,published=$4,revision=revision+1,updated_at=now() WHERE collection=$1 AND id=$2 RETURNING *`, [collection, id, merged, published]) : await client.query<Row>(`INSERT INTO studio_documents(collection,data,published) VALUES($1,$2,$3) RETURNING *`, [collection, merged, published])
    const row = result.rows[0]
    await client.query(`INSERT INTO studio_revisions(collection,document_id,data,actor) VALUES($1,$2,$3,$4)`, [collection, row.id, merged, actor])
    await client.query(`DELETE FROM studio_revisions WHERE collection=$1 AND document_id=$2 AND id NOT IN (SELECT id FROM studio_revisions WHERE collection=$1 AND document_id=$2 ORDER BY id DESC LIMIT 20)`, [collection, row.id])
    await client.query('COMMIT')
    return { ...row.data, id: Number(row.id), revision: row.revision, createdAt: row.created_at.toISOString(), updatedAt: row.updated_at.toISOString() }
  } catch (error) { await client.query('ROLLBACK'); throw error } finally { client.release() }
}
