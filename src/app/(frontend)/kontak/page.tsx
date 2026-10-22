import { getServices, getSettings } from '@/lib/cms'
import { PageIntro } from '@/components/ui'
import { ContactForm } from '@/components/contact-form'
import { Arrow } from '@/components/icons'
import { validWhatsApp } from '@/lib/validation'
import { pageMeta } from '@/lib/seo'
export const metadata = pageMeta('Mulai Konsultasi', 'Ceritakan kebutuhan website, aplikasi, atau solusi IT Anda kepada Wasla Informatika.', '/kontak')
export default async function Page({ searchParams }: { searchParams: Promise<{ layanan?: string }> }) { const [services, s, params] = await Promise.all([getServices(), getSettings(), searchParams]); return <><PageIntro title="Kontak" copy="Ceritakan apa yang ingin Anda bangun atau perbaiki. Kita mulai dari memahami kebutuhan, lalu menentukan langkah yang sesuai."/><section className="wrap contact-section"><aside className="contact-note"><h2>Mulai dari cerita Anda.</h2><p>Belum memiliki brief lengkap? Sampaikan tujuan bisnis dan tantangan yang sedang Anda hadapi.</p>{s.email && <a href={`mailto:${s.email}`}>{s.email}<Arrow diagonal/></a>}{validWhatsApp(s.whatsapp) && <a href={`https://wa.me/${s.whatsapp}`} rel="noopener noreferrer">Diskusi melalui WhatsApp<Arrow diagonal/></a>}{s.address && <p>{s.address}</p>}<p>Lingkup, jadwal, dan biaya dibahas setelah kebutuhan dipahami. Tidak ada harga atau jaminan yang diasumsikan sebelum kesepakatan.</p></aside><ContactForm services={services.docs.map(s => s.title)} initialService={params.layanan}/></section></> }
