import type { MetadataRoute } from 'next'
import { getServices, getProjects, getPosts } from '@/backend/cms'
import { seoContentUpdatedAt, serviceSEO, siteURL } from '@/frontend/lib/seo'
export const dynamic = 'force-dynamic'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects, posts] = await Promise.all([getServices(), getProjects(), getPosts()])
  const base = siteURL()
  return [ ...['', '/tentang-kami', '/layanan', '/paket-website', '/portofolio', '/insights', '/cara-membuat-website', '/kontak', '/privasi'].map(p => ({ url: `${base}${p}`, ...(['', '/cara-membuat-website'].includes(p) ? { lastModified: seoContentUpdatedAt } : {}) })),
    ...services.docs.map(s => ({ url: `${base}/layanan/${s.slug}`, lastModified: serviceSEO[s.slug] && Date.parse(s.updatedAt) < Date.parse(seoContentUpdatedAt) ? seoContentUpdatedAt : s.updatedAt })),
    ...projects.docs.map(p => ({ url: `${base}/portofolio/${p.slug}`, lastModified: p.updatedAt })),
    ...posts.docs.map(p => ({ url: `${base}/insights/${p.slug}`, lastModified: p.updatedAt })),
  ]
}
