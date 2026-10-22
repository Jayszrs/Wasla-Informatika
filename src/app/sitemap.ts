import type { MetadataRoute } from 'next'
import { getServices, getProjects, getPosts } from '@/lib/cms'
import { siteURL } from '@/lib/seo'
export const dynamic = 'force-dynamic'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects, posts] = await Promise.all([getServices(), getProjects(), getPosts()])
  const base = siteURL()
  return [ ...['', '/tentang-kami', '/layanan', '/portofolio', '/insights', '/kontak', '/privasi'].map(p => ({ url: `${base}${p}` })),
    ...services.docs.map(s => ({ url: `${base}/layanan/${s.slug}`, lastModified: s.updatedAt })),
    ...projects.docs.map(p => ({ url: `${base}/portofolio/${p.slug}`, lastModified: p.updatedAt })),
    ...posts.docs.map(p => ({ url: `${base}/insights/${p.slug}`, lastModified: p.updatedAt })),
  ]
}
