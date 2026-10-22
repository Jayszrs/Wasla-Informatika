import type { Metadata } from 'next'
export const siteURL = () => process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export function pageMeta(title: string, description: string, pathname: string, image?: string | null): Metadata {
  return { title, description, alternates: { canonical: pathname },
    openGraph: { title: `${title} — Wasla Informatika`, description, url: pathname, locale: 'id_ID', type: 'website', images: image ? [image] : ['/opengraph-image'] },
  }
}
