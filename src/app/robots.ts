import type { MetadataRoute } from 'next'
import { siteURL } from '@/frontend/lib/seo'
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/preview'] }, sitemap: `${siteURL()}/sitemap.xml` } }
