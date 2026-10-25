import { unstable_cache, revalidateTag } from 'next/cache'
import { head } from '@vercel/blob'
import { listDocuments, getGlobal, findMediaByFilename } from './content'
import { publicBlobSource } from '@/shared/media'
import { studioSchema } from '@/shared/studio-schema'

const publicContentTag = 'wasla-public-content-v1'
const cacheOptions = { tags: [publicContentTag], revalidate: 300 }

// This app does not enable Cache Components. The supported Data Cache keeps
// published SQL reads reusable across requests without caching sessions/drafts.
const cachedDocuments = unstable_cache((collection: string) => listDocuments(collection), ['public-documents-v1'], cacheOptions)
export function publicDocuments(collection: string) {
  const schema = studioSchema[collection]
  if (!schema || schema.private || schema.global) throw new Error('Collection is not public content')
  return cachedDocuments(collection)
}
export const publicGlobal = unstable_cache((slug: 'site-settings' | 'navigation') => getGlobal(slug), ['public-globals-v1'], cacheOptions)

export const publicMediaFile = unstable_cache(async (filename: string) => {
  const media = await findMediaByFilename(filename)
  if (!media) return null
  let source = media.filename === filename ? publicBlobSource(media.blobURL) : undefined
  const blobEnabled = process.env.BLOB_READ_WRITE_TOKEN && (process.env.VERCEL === '1' || process.env.USE_VERCEL_BLOB === 'true')
  if (blobEnabled && !source) {
    source = publicBlobSource((await head([media.prefix, filename].filter(Boolean).join('/'))).url)
    if (!source) throw new Error('Invalid media origin')
  }
  return { media, source }
}, ['public-media-file-v1'], cacheOptions)

export function invalidatePublicContent(collection: string) {
  if (studioSchema[collection] && !studioSchema[collection].private) revalidateTag(publicContentTag, { expire: 0 })
}
