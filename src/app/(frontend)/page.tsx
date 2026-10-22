import Link from 'next/link'
import { getServices, getProjects, getSettings, getTestimonials } from '@/lib/cms'
import { Arrow } from '@/components/icons'
import { SectionWave, ServiceArt } from '@/components/artwork'
import { ButtonLink, MediaImage, ProjectCard } from '@/components/ui'
import { ContactForm } from '@/components/contact-form'
import { HeroEnhancement } from '@/components/motion'
import { pageMeta } from '@/lib/seo'

export async function generateMetadata() {
  const s = await getSettings()
  return pageMeta('Software House & Solusi Digital', s.seoDescription || s.description, '/')
}

export default async function Home() {
  const [settings, services, projects, testimonials] = await Promise.all([getSettings(), getServices(), getProjects(), getTestimonials()])
  const featured = projects.docs.filter(p => p.featured).slice(0, 4)
  const selectedServices = ['website-development', 'web-application', 'ui-ux-design'].map(slug => services.docs.find(s => s.slug === slug)).filter(s => s !== undefined)
  const heroImage = settings.heroImage
  const heroImageID = typeof heroImage === 'object' ? heroImage?.id : heroImage
  const heroConcept = heroImageID && projects.docs.find(p => p.isConcept && (typeof p.thumbnail === 'object' ? p.thumbnail?.id : p.thumbnail) === heroImageID)
  const heroConceptLabel = heroConcept ? `Konsep eksplorasi — ${heroConcept.title.split(' — ')[0]}`
    : typeof heroImage === 'object' && /konsep/i.test(`${heroImage?.caption || ''} ${heroImage?.alt || ''}`) ? 'Konsep eksplorasi' : null

  return <>
    <HeroEnhancement/>
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
      <div className="section-heading centered"><h2>Portofolio pilihan</h2><p>Eksplorasi website dan aplikasi yang mempertemukan desain, fungsi, dan kebutuhan bisnis.</p></div>
      <div className="project-grid homepage-projects" data-reveal>{featured.map(p => <ProjectCard key={p.id} project={p}/>)}</div>
      {!featured.length && <p>Portofolio sedang disiapkan. Mari diskusikan kebutuhan Anda.</p>}
      <div className="section-action"><ButtonLink href="/portofolio" variant="button-outline">Lihat semua karya</ButtonLink></div>
    </section>
    <SectionWave variant="light-dark"/>

    <section className="services-section" id="layanan"><div className="wrap">
      <div className="section-heading centered"><h2>Layanan kami</h2><p>Solusi digital yang disusun sesuai kebutuhan, dengan perhatian pada desain, teknologi, dan kemudahan penggunaan.</p></div>
      <div className="service-cards">{selectedServices.map((s, i) => <article className="service-card" key={s.id} data-reveal>
        <Link className="service-picture" href={`/layanan/${s.slug}`} aria-label={`Lihat layanan ${s.title}`}>{s.illustration ? <MediaImage media={s.illustration}/> : <ServiceArt variant={i}/>}</Link>
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

    <section className="technology-section wrap"><div className="section-heading centered"><h2>Teknologi kami</h2><p>Fondasi untuk website, aplikasi, dan pengelolaan konten yang terhubung.</p></div><div className="technology-grid">{['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Payload CMS'].map(name => <div key={name}>{name}</div>)}</div></section>

    <section className="consultation-section" id="konsultasi"><div className="wrap consultation-grid"><div className="consultation-info"><h2>Konsultasi proyek</h2><h3>Punya rencana digital?<br/>Mari mulai dari percakapan.</h3><p>Ceritakan tujuan bisnis, kendala saat ini, atau produk yang ingin Anda bangun. Kita petakan kebutuhan dan tentukan langkah berikutnya bersama.</p><p>Lingkup, jadwal, dan biaya dibahas berdasarkan kebutuhan proyek yang disepakati.</p>{settings.email && <a className="text-link" href={`mailto:${settings.email}`}>{settings.email}<Arrow diagonal/></a>}</div><ContactForm services={services.docs.map(s => s.title)}/></div></section>

    {!!testimonials.docs.length && <section className="testimonials-section wrap"><div className="section-heading centered"><h2>Cerita kolaborasi</h2><p>Pengalaman yang dibagikan oleh rekan kolaborasi Wasla.</p></div><div className="testimonials-grid">{testimonials.docs.map(t => <figure key={t.id} className="testimony-card"><blockquote>{t.quote}</blockquote><figcaption><strong>{t.clientName}</strong> · {t.company}</figcaption></figure>)}</div></section>}
  </>
}
