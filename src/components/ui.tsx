import Link from 'next/link'
import Image from 'next/image'
import type { Media, Project, Post, Service, Team } from '@/lib/content-types'
import { RichText } from './studio-richtext'
import { Arrow, Plus } from './icons'
import { ConceptVisual, SectionWave } from './artwork'
import { ServiceScene } from './service-scene'
import { mediaSource } from '@/lib/media'
import { teamContacts } from '@/lib/contacts'
import { DivisionStructure } from './division-structure'
import { ProjectMockup } from './device-mockup'

export function ButtonLink({
  href,
  children,
  variant = '',
}: {
  href: string
  children: React.ReactNode
  variant?: string
  arrow?: boolean
}) {
  return (
    <Link className={`button btn ${variant}`} href={href}>
      <span>{children}</span>
    </Link>
  )
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="text-link" href={href}>
      <span>{children}</span>
    </Link>
  )
}

export function PageIntro({ title, copy, children }: { title: string; copy: string; children?: React.ReactNode }) {
  return (
    <section className="page-intro">
      <div className="wrap page-intro-content">
      <h1>{title}</h1>
      <div className="intro-bottom">
        <p>{copy}</p>
        {children}
      </div>
      </div>
      <SectionWave layered />
    </section>
  )
}

export function Content({ data }: { data?: Service['content'] | null }) {
  return data ? (
    <div className="prose">
      <RichText data={data} />
    </div>
  ) : null
}

export function MediaImage({ media, className = '', priority = false, sizes = '(max-width: 768px) 100vw, 65vw' }: { media?: number | Media | null; className?: string; priority?: boolean; sizes?: string }) {
  if (!media || typeof media !== 'object' || !media.url) return null
  return (
    <Image
      className={className}
      src={mediaSource(media.url)}
      width={media.width || 1200}
      height={media.height || 800}
      alt={media.alt}
      preload={priority}
      sizes={sizes}
    />
  )
}

export function ProjectImage({ project }: { project: Project }) {
  return project.thumbnail && typeof project.thumbnail === 'object' && project.thumbnail.url ? (
    <ProjectMockup project={project} />
  ) : project.isConcept ? (
    <ConceptVisual variant={project.visual} />
  ) : (
    <div className="image-empty">Gambar proyek belum tersedia.</div>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card ft-work-item">
      <Link className="project-image ft-work-media" href={`/portofolio/${project.slug}`} aria-label={`Lihat ${project.title}`}>
        <ProjectImage project={project} />
        {project.isConcept && <span className="concept-tag">Konsep Eksplorasi</span>}
        <div className="project-overlay" aria-hidden="true"><span>{project.category}</span><strong>{project.title}</strong><span className="project-view">Lihat project</span></div>
      </Link>
      <div className="project-caption">
        <h3>
          <Link href={`/portofolio/${project.slug}`}>{project.title}</Link>
        </h3>
        <span>{project.category}</span>
      </div>
      {project.externalLink?.startsWith('https://') && <a className="project-live" href={project.externalLink} target="_blank" rel="noopener noreferrer" aria-label={`Buka website ${project.title}`}>Kunjungi website</a>}
    </article>
  )
}

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <article className="post-card">
      <Link href={`/insights/${post.slug}`} className={`post-image post-art-${index % 3}`} aria-label={`Baca ${post.title}`}>
        {post.image && typeof post.image === 'object' ? (
          <MediaImage media={post.image} />
        ) : (
          <span aria-hidden="true" className="article-graphic">{post.title}</span>
        )}
        <span className="post-cat-badge">{post.category}</span>
        <span className="circle-arrow">
          <Arrow diagonal />
        </span>
      </Link>
      <p className="post-meta">
        {new Date(post.publishedAt).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          timeZone: 'Asia/Jakarta',
        })}
      </p>
      <h3>
        <Link href={`/insights/${post.slug}`}>{post.title}</Link>
      </h3>
      <p>{post.excerpt}</p>
    </article>
  )
}

export function ServiceRow({ service }: { service: Service; index?: number }) {
  return (
    <article className="service-row our-service-item">
      <div className="service-row-image"><ServiceScene service={service.slug}/></div>
      <div className="our-service-content">
        <h3 className="our-service-title">{service.title}</h3>
        <p className="our-service-desc">{service.excerpt}</p>
        <ButtonLink href={`/layanan/${service.slug}`} variant="button-outline">Pelajari layanan</ButtonLink>
      </div>
    </article>
  )
}

export function CTA({ title = 'Langkah berikutnya, kita mulai bersama.' }: { title?: string }) {
  return (
    <section className="final-cta">
      <div className="wrap">
        <div className="final-cta-content">
          <h2>{title}</h2>
          <p>Ceritakan rencana Anda. Kita petakan kebutuhan digital atau produksi visual sesuai tujuan Anda.</p>
          <ButtonLink href="/kontak" variant="button-white btn-white" arrow>
            Mulai konsultasi
          </ButtonLink>
        </div>
        <span className="cta-line" aria-hidden="true" />
      </div>
    </section>
  )
}

export function Process() {
  return (
    <section className="process-section"><div className="wrap">
      <div className="section-heading text-center">
        <h2>Dari percakapan,<br />menjadi kenyataan.</h2>
        <p>Proses yang terbuka, dengan arah dan keputusan yang kita pahami bersama.</p>
      </div>
      <ol className="process-list">
        {[
          ['Kenali kebutuhan', 'Kita membahas tujuan bisnis, pengguna, dan masalah yang perlu diselesaikan.'],
          ['Rancang arahnya', 'Prioritas menjadi alur, struktur, dan desain yang dapat ditinjau bersama.'],
          ['Bangun solusinya', 'Pengembangan bertahap memberi ruang untuk menguji dan menyempurnakan.'],
          ['Luncurkan & rawat', 'Persiapan peluncuran, dokumentasi, dan dukungan sesuai lingkup proyek.'],
        ].map(([title, copy], i) => (
          <li key={title} className="process-item">
            <span className="process-number">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </li>
        ))}
      </ol>
    </div></section>
  )
}

export function TeamSection({ members, showAboutLink = true }: { members: Team[]; showAboutLink?: boolean }) {
  return <section className="team-section wrap"><DivisionStructure contacts={teamContacts(members)} members={members}/>{showAboutLink && <TextLink href="/tentang-kami">Mengenal Wasla</TextLink>}</section>
}

export function FAQSection({ items }: { items: { id: number; question: string; answer: string }[] }) {
  return (
    <section className="faq-section wrap">
      <div>
        <h2>Sebelum kita<br />mulai.</h2>
        <p>Beberapa hal yang membantu Anda mempersiapkan percakapan.</p>
        <div style={{ marginTop: '24px' }}>
          <TextLink href="/kontak">Diskusikan kebutuhan</TextLink>
        </div>
      </div>
      <div className="faq-list">
        {items.map(f => (
          <details key={f.id}>
            <summary>
              <span>{f.question}</span>
              <Plus />
            </summary>
            <p>{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
