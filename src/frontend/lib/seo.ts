import type { Metadata } from 'next'
export const siteURL = () => new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://wasla.my.id').origin
export const serviceAreas = ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi']
export const seoContentUpdatedAt = '2026-10-26'
export const homeSEO = {
  title: 'Jasa Pembuatan Website Jabodetabek & IT Consultant',
  description: 'Jasa pembuatan website dan IT consultant di Jakarta, Bogor, Depok, Tangerang, Bekasi. Buat website bisnis, company profile, dan aplikasi web bersama Wasla Informatika.',
}
export const serviceSEO: Record<string, { title: string; description: string }> = {
  'website-development': {
    title: 'Jasa Pembuatan Website di Jabodetabek',
    description: 'Buat website bisnis, landing page, dan company profile bersama Wasla Informatika. Melayani Jakarta, Bogor, Depok, Tangerang, dan Bekasi. Lihat paket dan konsultasikan kebutuhan.',
  },
  'it-consultation': {
    title: 'Jasa IT Consultant di Jabodetabek',
    description: 'Konsultasi IT untuk pemilihan teknologi, perencanaan website, aplikasi, dan integrasi sistem. Diskusikan kebutuhan bisnis di Jakarta, Bogor, Depok, Tangerang, dan Bekasi.',
  },
}
export function pageMeta(title: string, description: string, pathname: string, image?: string | null): Metadata {
  return { metadataBase: new URL(siteURL()), title, description, alternates: { canonical: pathname },
    openGraph: { title: `${title} | Wasla Informatika`, description, url: pathname, locale: 'id_ID', type: 'website', images: image ? [image] : ['/opengraph-image'] },
    twitter: { card: 'summary_large_image', title: `${title} | Wasla Informatika`, description, images: image ? [image] : ['/opengraph-image'] },
  }
}
