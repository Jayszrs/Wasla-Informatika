import { ServerTranslation } from '@/frontend/components/server-translation'
import { ButtonLink } from '@/frontend/components/ui'
export default function NotFound() { return <ServerTranslation>{<section className="wrap empty-page"><h1>Halaman ini belum ditemukan.</h1><p>Tautan mungkin berubah, atau konten belum dipublikasikan.</p><ButtonLink href="/">Kembali ke beranda</ButtonLink></section>}</ServerTranslation> }
