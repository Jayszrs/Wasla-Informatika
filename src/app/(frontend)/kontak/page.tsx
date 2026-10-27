import { ServerTranslation } from '@/frontend/components/server-translation'
import { websitePackages, formatRupiah } from '@/shared/website-packages'
import { getServices, getSettings, getTeam } from '@/backend/cms'
import { PageIntro } from '@/frontend/components/ui'
import { ContactForm } from '@/frontend/components/contact-form'
import { ContactCards } from '@/frontend/components/contact-cards'
import { teamContacts } from '@/shared/contacts'
import { Arrow } from '@/frontend/components/icons'
import { DivisionStructure } from '@/frontend/components/division-structure'
import { localizedPageMeta } from '@/frontend/lib/seo'
import { getLocale } from '@/frontend/lib/locale'
import { translate } from '@/shared/i18n'

export async function generateMetadata() { return localizedPageMeta('Kontak & Konsultasi', 'Hubungi divisi Software Engineering, Project Management, Web Development dan Full Stack Engineering Wasla Informatika.', '/kontak') }
export default async function Page({ searchParams }: { searchParams: Promise<{ layanan?: string; paket?: string }> }) {
  const locale = await getLocale()
  const [services, settings, team, params] = await Promise.all([getServices(), getSettings(), getTeam(), searchParams])
  const contacts = teamContacts(team.docs)
  const plan = (settings.websitePackages ?? websitePackages).find(item => item.slug === params.paket)
  const packageMessage = !plan ? '' : locale === 'en'
    ? `I am interested in the ${translate(plan.name, locale)} package (${plan.startingPrice ? 'from ' : ''}${formatRupiah(plan.price)}${plan.priceUnit ? ` ${translate(plan.priceUnit, locale)}` : ''}; ${translate(plan.cms, locale)}). I would like to discuss my requirements and the project details.`
    : `Saya tertarik dengan paket ${plan.name} (${plan.startingPrice ? 'mulai dari ' : ''}${formatRupiah(plan.price)}${plan.priceUnit ? ` ${plan.priceUnit}` : ''}; ${plan.cms}). Saya ingin membahas kebutuhan dan rincian pengerjaannya.`
  return <ServerTranslation>{<>
    <PageIntro title="Mari terhubung." copy="Rekan diskusi untuk setiap kebutuhan digital Anda."/>
    <section className="wrap contact-directory" id="tim-kontak"><div className="contact-heading"><h2>Kenali rekan diskusi Anda.</h2><p>Pilih divisi sesuai kebutuhan. Setiap kontak membuka WhatsApp langsung ke orang yang Anda pilih.</p></div><ContactCards contacts={contacts}/></section>
    <div className="wrap contact-team"><DivisionStructure contacts={contacts} members={team.docs}/></div>
    <section className="wrap contact-section"><aside className="contact-note"><h2>Mulai dari cerita Anda.</h2><p>Belum memiliki brief lengkap? Ceritakan kebutuhan Anda, pilih kontak, lalu lanjutkan percakapan melalui WhatsApp setelah ringkasan tersimpan.</p>{settings.email && <a href={`mailto:${settings.email}`}>{settings.email}<Arrow diagonal/></a>}{settings.address && <p>{settings.address}</p>}<p>Lingkup, jadwal, dan biaya dibahas bersama setelah kebutuhan project dipahami.</p></aside><ContactForm services={services.docs.map(service => service.title)} initialService={plan?.service || params.layanan} initialMessage={packageMessage} contacts={contacts}/></section>
  </>}</ServerTranslation>
}
