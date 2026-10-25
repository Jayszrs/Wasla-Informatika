import Image from 'next/image'
import Link from 'next/link'
import type { Project, Testimonial } from '@/shared/content-types'
import { mediaSource } from '@/shared/media'
import { localizedPath } from '@/shared/i18n'
import { TestimonialRail } from './testimonial-rail'
import styles from './homepage-proof.module.css'

type Locale = 'id' | 'en'
type BrandMark = { id: string; name: string; src: string; width: number; height: number }

const marks: Record<string, BrandMark> = {
  'catatan-mengaji-bani-saleh': { id: 'bani-saleh', name: 'SD Islam Labschool Bani Saleh', src: '/images/clients/bani-saleh.webp', width: 160, height: 160 },
  'ipnu-kota-bekasi': { id: 'ipnu-kota-bekasi', name: 'IPNU IPPNU Kota Bekasi', src: '/images/clients/ipnu-kota-bekasi.webp', width: 256, height: 115 },
  'batu-alam-supplier': { id: 'fazma-stone', name: 'Fazma Stone', src: '/images/clients/fazma-stone.webp', width: 160, height: 160 },
  'fazma-stone': { id: 'fazma-stone', name: 'Fazma Stone', src: '/images/clients/fazma-stone.webp', width: 160, height: 160 },
  'cimuning-e-katalog': { id: 'cimuning', name: 'Cimuning Digital Hub', src: '/images/clients/cimuning.webp', width: 160, height: 160 },
  'mahameru-baja-indonesia': { id: 'mahameru-baja', name: 'Mahameru Baja Indonesia', src: '/images/clients/mahameru-baja.webp', width: 160, height: 160 },
  'sit-permata-hati-bekasi': { id: 'sit-permata-hati', name: 'SIT Permata Hati Bekasi', src: '/images/clients/sit-permata-hati.webp', width: 164, height: 160 },
}

function projectBrands(projects: Project[]) {
  const brands = new Map<string, { mark?: BrandMark; name: string; projects: Project[] }>()
  for (const project of projects.filter(item => !item.isConcept)) {
    const uploaded = typeof project.clientLogo === 'object' && project.clientLogo?.url ? project.clientLogo : null
    const preset = marks[project.slug]
    const mark = uploaded ? { id: `project-${project.id}`, name: project.client || project.title, src: mediaSource(uploaded.url!), width: uploaded.width || 256, height: uploaded.height || 160 } : preset
    const key = mark?.id || `project-${project.id}`
    const group = brands.get(key)
    if (group) group.projects.push(project)
    else brands.set(key, { mark, name: mark?.name || project.client || project.title, projects: [project] })
  }
  return [...brands.values()]
}

export function HomepageProof({ projects, testimonials, locale = 'id' }: { projects: Project[]; testimonials: Testimonial[]; locale?: Locale }) {
  const brands = projectBrands(projects)
  const english = locale === 'en'
  return <>
    {!!brands.length && <section className={`${styles.brands} wrap`} aria-labelledby="project-brands-title">
      <div className={styles.heading}>
        <h2 id="project-brands-title">{english ? "Projects we've worked on." : 'Project yang pernah kami kerjakan.'}</h2>
        <p>{english ? "Websites and applications in Wasla's portfolio. Select a logo to explore the project." : 'Website dan aplikasi dalam portofolio Wasla. Pilih logo untuk melihat projectnya.'}</p>
      </div>
      <ul className={styles.brandList}>{brands.map(brand => <li key={brand.mark?.id || brand.projects[0].id} className={styles.brand}>
        <Link href={localizedPath(`/portofolio/${brand.projects[0].slug}`, locale)} aria-label={`${english ? 'View project' : 'Lihat project'} ${brand.projects[0].title}`}>
          <span className={styles.mark}>{brand.mark ? <Image src={brand.mark.src} alt={brand.name} width={brand.mark.width} height={brand.mark.height} sizes="(max-width: 767px) 100px, 145px"/> : <span className={styles.wordmark}>{brand.name}</span>}</span>
          <span className={styles.brandName}>{brand.name}</span>
        </Link>
        {brand.projects.slice(1).map(project => <Link key={project.id} className={styles.additionalProject} href={localizedPath(`/portofolio/${project.slug}`, locale)}>{project.client || project.title}</Link>)}
      </li>)}</ul>
    </section>}
    <TestimonialRail testimonials={testimonials} locale={locale}/>
  </>
}
