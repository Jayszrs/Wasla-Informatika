import Link from 'next/link'
import { getServices, getProjects, getPosts, getTeam, getFAQs, getSettings, getTestimonials } from '@/lib/cms'
import { Arrow } from '@/components/icons'
import { ButtonLink, TextLink, MediaImage, ServiceRow, ProjectCard, PostCard, Process, TeamSection, FAQSection } from '@/components/ui'
import { ContactForm } from '@/components/contact-form'
import { HeroEnhancement } from '@/components/motion'
import { pageMeta } from '@/lib/seo'

export async function generateMetadata() {
  const s = await getSettings()
  return pageMeta('Solusi digital untuk bisnis yang melaju', s.seoDescription || s.description, '/')
}

export default async function Home() {
  const [settings, services, projects, posts, team, faqs, testimonials] = await Promise.all([
    getSettings(), getServices(), getProjects(), getPosts(), getTeam(), getFAQs(), getTestimonials(),
  ])
  const featured = projects.docs.filter(p => p.featured).slice(0, 3)
  const heroProject = featured.find(p => p.visual === 'platform') || featured[0]
  const heroImage = settings.heroImage || heroProject?.thumbnail
  const heroImageID = typeof heroImage === 'object' ? heroImage?.id : heroImage
  const heroConcept = heroImageID && featured.find(p => p.isConcept && (typeof p.thumbnail === 'object' ? p.thumbnail?.id : p.thumbnail) === heroImageID)
  const heroConceptLabel = heroConcept ? `Konsep eksplorasi — ${heroConcept.title.split(' — ')[0]}`
    : typeof heroImage === 'object' && /konsep/i.test(`${heroImage?.caption || ''} ${heroImage?.alt || ''}`) ? 'Konsep eksplorasi' : null

  return <>
    <section className="hero">
      <HeroEnhancement />
      <div className="wrap hero-main">
        <div className="hero-title-row">
          <h1>{settings.heroTitle}</h1>
          <div className="hero-introduction">
            <p>{settings.heroCopy}</p>
            <ButtonLink href="/kontak" variant="button-white" arrow>Mulai konsultasi</ButtonLink>
          </div>
        </div>
        <div className="hero-stage" data-hero-art>
          <MediaImage media={heroImage} className="hero-stage-image" priority />
          {heroConceptLabel && <span className="concept-tag hero-concept-label">{heroConceptLabel}</span>}
          <div className="hero-stage-caption">
            <span>Strategi. Desain. Teknologi.</span>
            <Link href="/portofolio"><span>Lihat karya kami<small>Eksplorasi desain &amp; pengembangan</small></span><Arrow diagonal /></Link>
          </div>
        </div>
        <div className="hero-rail">
          <span>Website / Aplikasi / Solusi IT</span>
          <a href="#featured-works">Temukan kemungkinan <Arrow /></a>
        </div>
      </div>
    </section>

    <section id="featured-works" className="works-section wrap">
      <div className="section-heading">
        <h2>Ide yang menemukan<br/>bentuknya.</h2>
        <div><p>Eksplorasi kami dalam mempertemukan karakter, fungsi, dan pengalaman digital.</p><TextLink href="/portofolio">Jelajahi semua karya</TextLink></div>
      </div>
      <div className="project-grid homepage-projects">{featured.map(p => <ProjectCard key={p.id} project={p}/>)}</div>
      {!featured.length && <p>Portofolio sedang disiapkan. <TextLink href="/kontak">Diskusikan kebutuhan Anda</TextLink></p>}
    </section>

    <section className="services-section" id="layanan">
      <div className="wrap services-layout">
        <div className="services-intro"><h2>Dibangun untuk<br/>kebutuhan Anda.</h2><p>Dari wajah pertama sebuah bisnis hingga sistem di balik operasionalnya. Kita tentukan solusi yang tepat, bersama.</p><TextLink href="/layanan">Semua layanan</TextLink></div>
        <div className="home-service-list">{services.docs.slice(0, 5).map((s, i) => <ServiceRow key={s.id} service={s} index={i}/>)}</div>
      </div>
    </section>

    <section className="brand-statement wrap" id="kenali-wasla">
      <h2>{settings.statement}</h2>
      <div className="brand-statement-body"><p>Kami menghubungkan strategi, desain, dan pengembangan untuk menciptakan solusi digital yang berguna. Tujuan bisnis menjadi dasar; perhatian pada detail menyatukan semuanya.</p><TextLink href="/tentang-kami">Kenali Wasla</TextLink></div>
      <div className="principles-list">{[
        ['Konteks sebelum kode.', 'Memahami tujuan, pengguna, dan alur kerja sebelum menentukan teknologi.'],
        ['Dikerjakan bersama.', 'Lingkup, prioritas, dan perkembangan dibahas dengan terbuka di setiap tahap.'],
        ['Detail yang berguna.', 'Tampilan yang terarah, interaksi yang jelas, serta konten yang mudah dikelola.'],
      ].map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <Process/>
    {!!team.docs.length && <TeamSection members={team.docs}/>}
    {!!testimonials.docs.length && <section className="testimonials-section wrap"><div className="section-heading"><h2>Cerita kolaborasi.</h2></div><div className="testimonials-grid">{testimonials.docs.map(t => <figure key={t.id} className="testimony-card"><blockquote>{t.quote}</blockquote><figcaption><strong>{t.clientName}</strong> · {t.company}</figcaption></figure>)}</div></section>}

    <section className="insights-section wrap"><div className="section-heading"><h2>Perspektif untuk<br/>langkah berikutnya.</h2><TextLink href="/insights">Semua insights</TextLink></div><div className="post-grid">{posts.docs.slice(0, 3).map((p, i) => <PostCard key={p.id} post={p} index={i}/>)}</div></section>
    {!!faqs.docs.length && <FAQSection items={faqs.docs}/>}

    <section className="consultation-section" id="konsultasi"><div className="wrap consultation-grid"><div className="consultation-info"><h2>Setiap kemungkinan<br/>dimulai dari<br/>percakapan.</h2><p>Ceritakan apa yang ingin Anda bangun atau perbaiki. Kita mulai dari memahami kebutuhan, lalu menentukan langkah yang sesuai.</p>{settings.email && <a className="text-link" href={`mailto:${settings.email}`}>{settings.email}<Arrow diagonal/></a>}</div><ContactForm services={services.docs.map(s => s.title)}/></div></section>
  </>
}
