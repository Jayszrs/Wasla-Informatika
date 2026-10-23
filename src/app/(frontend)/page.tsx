import Link from 'next/link'
import { getServices, getProjects, getSettings, getTestimonials, getTeam } from '@/lib/cms'
import { Arrow } from '@/components/icons'
import { SectionWave, ServiceArt } from '@/components/artwork'
import { ButtonLink, MediaImage, ProjectCard } from '@/components/ui'
import { ContactForm } from '@/components/contact-form'
import { pageMeta } from '@/lib/seo'
import { DivisionStructure } from '@/components/division-structure'
import { TechnologyLogos } from '@/components/technology-logos'
import { teamContacts } from '@/lib/contacts'

export async function generateMetadata() {
  const s = await getSettings()
  return pageMeta('Software House & Solusi Digital', s.seoDescription || s.description, '/')
}

export default async function Home() {
  const [settings, services, projects, testimonials, team] = await Promise.all([getSettings(), getServices(), getProjects(), getTestimonials(), getTeam()])
  const featured = projects.docs.filter(p => p.featured).slice(0, 8)
  const contacts = teamContacts(team.docs)
  const selectedServices = ['website-development', 'web-application', 'ui-ux-design'].map(slug => services.docs.find(s => s.slug === slug)).filter(s => s !== undefined)
  const heroImage = settings.heroImage
  const heroImageID = typeof heroImage === 'object' ? heroImage?.id : heroImage
  const heroConcept = heroImageID && projects.docs.find(p => p.isConcept && (typeof p.thumbnail === 'object' ? p.thumbnail?.id : p.thumbnail) === heroImageID)
  const heroConceptLabel = heroConcept ? `Konsep eksplorasi — ${heroConcept.title.split(' — ')[0]}`
    : typeof heroImage === 'object' && /konsep/i.test(`${heroImage?.caption || ''} ${heroImage?.alt || ''}`) ? 'Konsep eksplorasi' : null

  return <>
    <section className="hero">
      <div className="hero-backdrop" data-hero-art><MediaImage media={heroImage} className="hero-stage-image" priority sizes="100vw"/></div>
      <div className="wrap hero-main"><div className="hero-copy">
        <h1>{settings.heroTitle}</h1>
        <div className="hero-descriptor"><span className="descriptor-icon"><Arrow diagonal/></span><strong>Desain. Pengembangan. Solusi IT.</strong></div>
        <p className="hero-caption">{settings.heroCopy}</p>
        <ButtonLink href="/kontak" variant="button-outline-light">Mulai konsultasi</ButtonLink>
      </div></div>
      {heroConceptLabel && <span className="concept-tag hero-concept-label">{heroConceptLabel}</span>}
      <a className="hero-scroll" href="#featured-works"><span className="scroll-mouse"/><span>Gulir ke bawah</span></a>
    </section>
    <SectionWave layered/>

    <section className="works-section wrap" id="featured-works">
      <div className="section-heading centered"><h2>Project pilihan</h2><p>Website dan aplikasi yang telah kami kerjakan untuk pendidikan, organisasi, dan bisnis.</p></div>
      <div className="project-grid homepage-projects" data-reveal>{featured.map(p => <ProjectCard key={p.id} project={p}/>)}</div>
      {!featured.length && <p>Project sedang diperbarui. Mari diskusikan kebutuhan Anda.</p>}
      <div className="section-action"><ButtonLink href="/portofolio" variant="button-outline">Lihat semua project</ButtonLink></div>
    </section>
    <SectionWave variant="light-dark"/>

    <section className="services-section" id="layanan"><div className="wrap">
      <div className="section-heading centered"><h2>Layanan kami</h2><p>Solusi digital yang disusun sesuai kebutuhan, dengan perhatian pada desain, teknologi, dan kemudahan penggunaan.</p></div>
      <div className="service-cards">{selectedServices.map((s, i) => <article className="service-card" key={s.id} data-reveal>
        <Link className="service-picture" data-art-scene data-depth=".1" href={`/layanan/${s.slug}`} aria-label={`Lihat layanan ${s.title}`}><span className="motion-surface" data-art-surface>{s.illustration ? <MediaImage media={s.illustration}/> : <ServiceArt variant={i}/>}</span></Link>
        <h3><Link href={`/layanan/${s.slug}`}>{s.title}</Link></h3><p>{s.excerpt}</p>
        <ButtonLink href={`/layanan/${s.slug}`} variant="button-outline-light">Pelajari layanan</ButtonLink>
      </article>)}</div>
      <div className="section-action"><Link className="all-services" href="/layanan">Jelajahi seluruh layanan<Arrow diagonal/></Link></div>
    </div></section>
    <SectionWave/>

    <section className="agency-feature wrap">
      <div className="agency-feature-visual" data-parallax-feature><MediaImage media={settings.featureImage} className="agency-device-image"/><span className="illustration-note">Visual ilustrasi perangkat</span></div>
      <div className="agency-feature-copy">
        <article><div className="feature-label"><span className="descriptor-icon"><Arrow diagonal/></span><h2>Keahlian kami</h2></div><div><h3>Desain yang terarah.<br/>Teknologi yang tepat guna.</h3><p>Website responsif, aplikasi web, e-commerce, desain UI/UX, pengelolaan konten, integrasi sistem, dan solusi IT. Kami menyatukan disiplin tersebut untuk membantu Anda membangun pengalaman digital yang berguna.</p></div></article>
        <article><div className="feature-label"><span className="descriptor-icon"><Arrow diagonal/></span><h2>Proses kami</h2></div><div><h3>Memahami kebutuhan,<br/>sebelum membangun solusi.</h3><p>Kita mulai dari tujuan bisnis dan pengguna, kemudian menyusun prioritas, merancang pengalaman, serta mengembangkan dan menguji secara bertahap. Setiap langkah dibahas bersama agar hasilnya mudah digunakan dan dikelola.</p><Link className="text-link" href="/tentang-kami">Kenali cara kami bekerja<Arrow diagonal/></Link></div></article>
      </div>
    </section>

    <section className="technology-section wrap"><div className="section-heading centered"><h2>Teknologi kami</h2><p>Pilihan teknologi untuk kebutuhan website, aplikasi, dan integrasi. Sentuh logo untuk mengenal perangkatnya.</p></div><TechnologyLogos/></section>

    <section className="consultation-section" id="konsultasi"><div className="wrap"><DivisionStructure contacts={contacts}/><div className="consultation-grid"><div className="consultation-info"><h2>Ceritakan project Anda.</h2><p>Sampaikan tujuan bisnis dan kebutuhan Anda. Pilih rekan diskusi, siapkan ringkasan, lalu lanjutkan percakapan melalui WhatsApp.</p><p>Lingkup, jadwal, dan biaya dibahas bersama sesuai kebutuhan project.</p>{settings.email && <a className="text-link" href={`mailto:${settings.email}`}>{settings.email}<Arrow diagonal/></a>}</div><ContactForm services={services.docs.map(s => s.title)} contacts={contacts}/></div></div></section>

    {!!testimonials.docs.length && <section className="testimonials-section wrap"><div className="section-heading centered"><h2>Cerita kolaborasi</h2><p>Pengalaman yang dibagikan oleh rekan kolaborasi Wasla.</p></div><div className="testimonials-grid">{testimonials.docs.map(t => <figure key={t.id} className="testimony-card"><blockquote>{t.quote}</blockquote><figcaption><strong>{t.clientName}</strong> · {t.company}</figcaption></figure>)}</div></section>}
  </>
}
