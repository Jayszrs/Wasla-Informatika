import type { PoolClient } from 'pg'
import sharp from 'sharp'
import path from 'node:path'
import { initialVideoItems } from '../../src/shared/video-library'

// Only inserts missing slugs. Existing edits, drafts, publication state and users are preserved.
export async function seedVideoLibrary(client: PoolClient) {
  let inserted = 0
  for (const [index, item] of initialVideoItems.entries()) {
    const slug = item.key.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    if ((await client.query(`SELECT 1 FROM studio_documents WHERE collection='video-projects' AND data->>'slug'=$1`, [slug])).rowCount) continue
    let mediaId: number | undefined
    if (item.posterURL) {
      const existing = (await client.query(`SELECT id FROM studio_documents WHERE collection='media' AND data->>'url'=$1 LIMIT 1`, [item.posterURL])).rows[0]
      if (existing) mediaId = Number(existing.id)
      else {
        const metadata = await sharp(path.join(process.cwd(), 'public', item.posterURL)).metadata()
        const data = { alt: item.title, filename: path.basename(item.posterURL), url: item.posterURL, mimeType: 'image/jpeg', width: metadata.width, height: metadata.height }
        mediaId = Number((await client.query(`INSERT INTO studio_documents(collection,data,published) VALUES('media',$1,$1) RETURNING id`, [data])).rows[0].id)
      }
    }
    const data = { title: item.title, slug, category: item.category, channel: item.channel, provider: item.provider, sourceURL: item.sourceURL, thumbnail: mediaId, description: item.description, mediaType: item.mediaType || 'video', featured: item.featured, order: index, _status: 'published' }
    const saved = (await client.query(`INSERT INTO studio_documents(collection,data,published) VALUES('video-projects',$1,$1) RETURNING id`, [data])).rows[0]
    await client.query(`INSERT INTO studio_revisions(collection,document_id,data,actor) VALUES('video-projects',$1,$2,'video-gallery-import')`, [saved.id, data])
    inserted++
  }
  return inserted
}
