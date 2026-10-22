import 'server-only'
import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

export const cms = cache(() => getPayload({ config }))
export const getSettings = cache(async () => (await cms()).findGlobal({ slug: 'site-settings', depth: 1, overrideAccess: false }))
export const getNavigation = cache(async () => (await cms()).findGlobal({ slug: 'navigation', overrideAccess: false }))
export const getServices = cache(async () => (await cms()).find({ collection: 'services', sort: 'order', limit: 100, depth: 1, overrideAccess: false, draft: false }))
export const getProjects = cache(async () => (await cms()).find({ collection: 'projects', sort: 'order', limit: 100, depth: 1, overrideAccess: false, draft: false }))
export const getPosts = cache(async () => (await cms()).find({ collection: 'posts', sort: '-publishedAt', limit: 100, depth: 1, overrideAccess: false, draft: false }))
export const getTeam = cache(async () => (await cms()).find({ collection: 'team', sort: 'order', depth: 1, limit: 100, overrideAccess: false }))
export const getFAQs = cache(async () => (await cms()).find({ collection: 'faqs', sort: 'order', limit: 100, overrideAccess: false, draft: false }))
export const getTestimonials = cache(async () => (await cms()).find({ collection: 'testimonials', limit: 8, overrideAccess: false, draft: false }))
export async function serviceBySlug(slug: string) { return (await (await cms()).find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1, depth: 1, overrideAccess: false, draft: false })).docs[0] }
export async function projectBySlug(slug: string) { return (await (await cms()).find({ collection: 'projects', where: { slug: { equals: slug } }, limit: 1, depth: 2, overrideAccess: false, draft: false })).docs[0] }
export async function postBySlug(slug: string) { return (await (await cms()).find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1, depth: 2, overrideAccess: false, draft: false })).docs[0] }
