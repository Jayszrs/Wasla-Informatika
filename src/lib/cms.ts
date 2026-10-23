import 'server-only'
import { cache } from 'react'
import { listDocuments, getGlobal, saveDocument, type ContentMap } from './studio-content'
type FindOptions<K extends keyof ContentMap> = { collection: K; where?: Record<string, { equals: unknown }>; limit?: number; sort?: string; depth?: number; overrideAccess?: boolean; draft?: boolean }
async function find<K extends keyof ContentMap>(options: FindOptions<K>) {
  let docs = await listDocuments(options.collection) as unknown as ContentMap[K][]
  for (const [key, value] of Object.entries(options.where || {})) docs = docs.filter(d => String((d as unknown as Record<string, unknown>)[key]) === String(value.equals))
  if (options.sort === '-publishedAt') docs.sort((a, b) => String((b as unknown as Record<string, unknown>).publishedAt).localeCompare(String((a as unknown as Record<string, unknown>).publishedAt)))
  return { docs: docs.slice(0, options.limit || 100), totalDocs: docs.length }
}
export const cms = cache(async () => ({ find, count: async <K extends keyof ContentMap>(o: FindOptions<K>) => ({ totalDocs: (await find(o)).totalDocs }), create: async (o: { collection: 'contact-submissions'; overrideAccess?: boolean; data: Record<string, unknown> }) => saveDocument(o.collection, o.data, 'consultation') }))
export const getSettings = cache(() => getGlobal('site-settings'))
export const getNavigation = cache(() => getGlobal('navigation'))
export const getServices = cache(() => find({ collection: 'services' }))
export const getProjects = cache(() => find({ collection: 'projects' }))
export const getPosts = cache(() => find({ collection: 'posts', sort: '-publishedAt' }))
export const getTeam = cache(() => find({ collection: 'team' }))
export const getFAQs = cache(() => find({ collection: 'faqs' }))
export const getTestimonials = cache(() => find({ collection: 'testimonials', limit: 8 }))
export async function serviceBySlug(slug: string) { return (await find({ collection: 'services', where: { slug: { equals: slug } } })).docs[0] }
export async function projectBySlug(slug: string) { return (await find({ collection: 'projects', where: { slug: { equals: slug } } })).docs[0] }
export async function postBySlug(slug: string) { return (await find({ collection: 'posts', where: { slug: { equals: slug } } })).docs[0] }
