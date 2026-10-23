import { getServices, getSettings, getTeam } from '@/lib/cms'
import { PageIntro } from '@/components/ui'
import { ContactForm } from '@/components/contact-form'
import { ContactCards } from '@/components/contact-cards'
import { teamContacts } from '@/lib/contacts'
import { Arrow } from '@/components/icons'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta('Kontak & Konsultasi', 'Hubungi divisi Software Engineering, Project Management, Web Development dan Full Stack Engineering Wasla Informatika.', '/kontak')
export default async function Page({ searchParams }: { searchParams: Promise<{ layanan?: string }> }) {
  const [services, settings, team, params] = await Promise.all([getServices(), getSettings(), getTeam(), searchParams])
  const contacts = teamContacts(team.docs)
  return <>
    <PageIntro title="Mari terhubung." copy="Empat rekan diskusi. Satu tujuan: mewujudkan project digital Anda."/>
    <section className="wrap contact-directory" id="tim-kontak"><div className="contact-heading"><h2>Kenali rekan diskusi Anda.</h2><p>Pilih divisi sesuai kebutuhan. Setiap kontak membuka WhatsApp langsung ke orang yang Anda pilih.</p></div><ContactCards contacts={contacts}/></section>
    <section className="wrap contact-section"><aside className="contact-note"><h2>Mulai dari cerita Anda.</h2><p>Belum memiliki brief lengkap? Ceritakan kebutuhan Anda, pilih kontak, lalu lanjutkan percakapan melalui WhatsApp setelah ringkasan tersimpan.</p>{settings.email && <a href={`mailto:${settings.email}`}>{settings.email}<Arrow diagonal/></a>}{settings.address && <p>{settings.address}</p>}<p>Lingkup, jadwal, dan biaya dibahas bersama setelah kebutuhan project dipahami.</p></aside><ContactForm services={services.docs.map(service => service.title)} initialService={params.layanan} contacts={contacts}/></section>
  </>
}