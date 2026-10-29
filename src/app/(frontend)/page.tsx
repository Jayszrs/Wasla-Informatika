import { ServerTranslation } from '@/frontend/components/server-translation'
import { WebsitePackages } from '@/frontend/components/website-packages'
import Link from 'next/link'
import { getServices, getProjects, getSettings, getTestimonials, getTeam } from '@/backend/cms'
import { Arrow } from '@/frontend/components/icons'
import { SectionWave } from '@/frontend/components/artwork'
import { ServiceScene } from '@/frontend/components/service-scene'
import { ButtonLink, MediaImage, ProjectCard } from '@/frontend/components/ui'
import { ContactForm } from '@/frontend/components/contact-form'
import { homeSEO, localizedPageMeta } from '@/frontend/lib/seo'
import { DivisionStructure } from '@/frontend/components/division-structure'
import { TechnologyLogos } from '@/frontend/components/technology-logos'
import { teamContacts } from '@/shared/contacts'
import { BrandPhone } from '@/frontend/components/device-mockup'
import { BrandFilmShowcase } from '@/frontend/components/brand-films'
import { VideoPortfolio } from '@/frontend/components/video-portfolio'

export async function generateMetadata() { return localizedPageMeta(homeSEO.title, homeSEO.description, '/') }

export default async function Home() {
  const [settings, services, projects, testimonials, team] = await Promise.all([getSettings(), getServices(), getProjects(), getTestimonials(), getTeam()])
  const featured = projects.docs.filter(p => p.featured).slice(0, 8)
  const contacts = teamContacts(team.docs)
  const selectedServices = ['website-development', 'web-application', 'ui-ux-design', 'photography', 'video-editing', 'creative-editing'].map(slug => services.docs.find(s => s.slug === slug)).filter(s => s !== undefined)
  const heroImage = settings.heroImage
  const heroImageID = typeof heroImage === 'object' ? heroImage?.id : heroImage
  const heroConcept = heroImageID && projects.docs.find(p => p.isConcept && (typeof p.thumbnail === 'object' ? p.thumbnail?.id : p.thumbnail) === heroImageID)
  const heroConceptLabel = heroConcept ? `Konsep eksplorasi — ${heroConcept.title.split(' — ')[0]}`
    : typeof heroImage === 'object' && /konsep/i.test(`${heroImage?.caption || ''} ${heroImage?.alt || ''}`) ? 'Konsep eksplorasi' : null

  return <ServerTranslation>{<>
    <section className="hero">
      <div className="hero-backdrop" data-hero-art><MediaImage media={heroImage} className="hero-stage-image" priority sizes="100vw"/></div>
      <div className="wrap hero-main"><div className="hero-copy">
        <h1>{settings.heroTitle}</h1>
        <div className="hero-descriptor"><span className="descriptor-icon"><Arrow diagonal/></span><strong>Jasa pembuatan website & IT consultant Jabodetabek.</strong></div>
        <p className="hero-caption">{settings.heroCopy}</p>
        <ButtonLink href="/kontak" variant="button-outline-light">Mulai konsultasi</ButtonLink>
      </div></div>
      {heroConceptLabel && <span className="concept-tag hero-concept-label">{heroConceptLabel}</span>}
      <a className="hero-scroll" href="#featured-works"><span className="scroll-mouse"/><span>Gulir ke bawah</span></a>
    </section>
    <SectionWave layered/>
    <BrandFilmShowcase/>

    <section className="works-section wrap" id="featured-works">
      <div className="section-heading centered"><h2>Project pilihan</h2><p>Website dan aplikasi yang telah kami kerjakan untuk pendidikan, organisasi, dan bisnis.</p></div>
      <div className="project-grid homepage-projects">{featured.map(p => <ProjectCard key={p.id} project={p}/>)}</div>
      {!featured.length && <p>Project sedang diperbarui. Mari diskusikan kebutuhan Anda.</p>}
      <div className="section-action"><ButtonLink href="/portofolio" variant="button-outline">Lihat semua project</ButtonLink></div>
    </section>
    <VideoPortfolio compact/>
    <SectionWave variant="light-dark"/>

    <section className="services-section" id="layanan"><div className="wrap">
      <div className="section-heading centered"><h2>Layanan kami</h2><p>Pengembangan website dan aplikasi, fotografi, serta penyuntingan visual untuk kebutuhan bisnis dan momen Anda.</p></div>
      <div className="service-cards">{selectedServices.map(s => <article className="service-card" key={s.id} data-reveal>
        <div className="service-picture"><ServiceScene service={s.slug} dark/></div>
        <h3><Link href={`/layanan/${s.slug}`}>{s.title}</Link></h3><p>{s.excerpt}</p>
        <ButtonLink href={`/layanan/${s.slug}`} variant="button-outline-light">Pelajari layanan</ButtonLink>
      </article>)}</div>
      <div className="section-action"><Link className="all-services" href="/layanan">Jelajahi seluruh layanan</Link></div>
    </div></section>
    <SectionWave/>

    <WebsitePackages packages={settings.websitePackages}/>

    <section className="agency-feature wrap">
      <div className="agency-feature-visual"><BrandPhone/></div>
      <div className="agency-feature-copy">
        <article><div><h2>Jasa pembuatan website<br/>di Jabodetabek.</h2><p>Wasla Informatika membantu bisnis di Jakarta, Bogor, Depok, Tangerang, dan Bekasi membuat landing page, website company profile, serta aplikasi web. Desain responsif, pengelolaan konten, dan integrasi dibahas sesuai kebutuhan usaha Anda.</p><Link className="text-link" href="/layanan/website-development">Lihat jasa pembuatan website</Link><p>Baru mulai? Baca <Link href="/cara-membuat-website">cara membuat website</Link> untuk menyiapkan tujuan, konten, domain, dan anggaran sebelum memilih paket.</p></div></article>
        <article><div><h2>IT consultant untuk<br/>keputusan teknologi Anda.</h2><p>Konsultasi IT dimulai dari kebutuhan bisnis dan pengguna. Kita membahas pilihan teknologi, prioritas pengembangan, serta integrasi dengan sistem yang sudah digunakan. Melayani kebutuhan bisnis di Jabodetabek; lingkup dan cara kolaborasi disepakati saat konsultasi.</p><Link className="text-link" href="/layanan/it-consultation">Diskusikan kebutuhan dengan IT consultant</Link></div></article>
      </div>
    </section>

    <section className="technology-section wrap"><div className="section-heading centered"><h2>Teknologi kami</h2><p>Pilihan teknologi untuk kebutuhan website, aplikasi, dan integrasi. Sentuh logo untuk mengenal perangkatnya.</p></div><TechnologyLogos/></section>

    <section className="consultation-section" id="konsultasi"><div className="wrap"><DivisionStructure contacts={contacts} members={team.docs}/><div className="consultation-grid"><div className="consultation-info"><h2>Ceritakan project Anda.</h2><p>Sampaikan tujuan bisnis dan kebutuhan Anda. Pilih rekan diskusi, siapkan ringkasan, lalu lanjutkan percakapan melalui WhatsApp.</p><p>Lingkup, jadwal, dan biaya dibahas bersama sesuai kebutuhan project.</p>{settings.email && <a className="text-link" href={`mailto:${settings.email}`}>{settings.email}<Arrow diagonal/></a>}</div><ContactForm services={services.docs.map(s => s.title)} contacts={contacts}/></div></div></section>

    {!!testimonials.docs.length && <section className="testimonials-section wrap"><div className="section-heading centered"><h2>Cerita kolaborasi</h2><p>Pengalaman yang dibagikan oleh rekan kolaborasi Wasla.</p></div><div className="testimonials-grid">{testimonials.docs.map(t => <figure key={t.id} className="testimony-card"><blockquote>{t.quote}</blockquote><figcaption><strong>{t.clientName}</strong> · {t.company}</figcaption></figure>)}</div></section>}
  </>}</ServerTranslation>
}
