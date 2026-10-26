import { notFound } from 'next/navigation'
import { serviceBySlug } from '@/backend/cms'
import { PageIntro, Content, CTA, ButtonLink } from '@/frontend/components/ui'
import { ServiceScene } from '@/frontend/components/service-scene'
import { pageMeta, serviceSEO, serviceAreas, siteURL } from '@/frontend/lib/seo'
import { StructuredData } from '@/frontend/components/structured-data'
import Link from 'next/link'
import { seoImageSource } from '@/shared/media'
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) { const { slug } = await params; const s = await serviceBySlug(slug); return s ? pageMeta(s.seo?.title || serviceSEO[s.slug]?.title || s.title, s.seo?.description || serviceSEO[s.slug]?.description || s.excerpt, `/layanan/${s.slug}`, seoImageSource(s.seo?.image)) : {} }
export default async function Page({ params }: Props) {
  const service = await serviceBySlug((await params).slug); if (!service) notFound()
  const focus = serviceSEO[service.slug]
  const title = focus?.title || service.title
  const url = `${siteURL()}/layanan/${service.slug}`
  return <>
    <StructuredData data={{ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Service', '@id': `${url}#service`, name: title, description: focus?.description || service.excerpt, url, serviceType: service.title,
        provider: { '@id': `${siteURL()}/#organization` }, areaServed: serviceAreas.map(name => ({ '@type': 'City', name })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteURL() },
        { '@type': 'ListItem', position: 2, name: 'Layanan', item: `${siteURL()}/layanan` },
        { '@type': 'ListItem', position: 3, name: title, item: url },
      ] },
    ] }}/>
    <PageIntro title={title} copy={focus?.description || service.excerpt}><ButtonLink href={`/kontak?layanan=${encodeURIComponent(service.title)}`} arrow>Diskusikan kebutuhan</ButtonLink></PageIntro>
    <section className="wrap page-content"><div className="detail-grid"><aside className="detail-sidebar"><div><strong>Fokus layanan</strong>{service.category}</div><div className="service-detail-art"><ServiceScene service={service.slug}/></div></aside><div className="detail-body">
      <Content data={service.content}/>
      {focus && <section className="prose"><h2>{service.slug === 'website-development' ? 'Buat website sesuai kebutuhan bisnis Anda' : 'Kapan bisnis membutuhkan IT consultant?'}</h2>
        {service.slug === 'website-development' ? <>
          <p>Landing page cocok untuk satu penawaran atau kampanye. Website company profile membantu calon pelanggan mengenal layanan dan menghubungi bisnis Anda. Jika staf perlu memperbarui konten sendiri, kita bisa membahas CMS; jika ada proses operasional khusus, pertimbangkan aplikasi web.</p>
          <p>Siapkan tujuan website, target pengguna, daftar halaman, materi tulisan dan foto, serta kebutuhan formulir atau integrasi. Alur kerja mencakup pembahasan kebutuhan, desain, pengembangan, pengujian, dan persiapan peluncuran. Jadwal, revisi, pengelolaan domain, hosting, serta pemeliharaan ditetapkan dalam penawaran.</p>
          <p>Lihat <Link href="/paket-website">paket dan harga pembuatan website</Link>, <Link href="/portofolio">contoh project Wasla</Link>, atau baca <Link href="/cara-membuat-website">panduan cara membuat website</Link> sebelum konsultasi.</p>
        </> : <>
          <p>Konsultasi membantu ketika Anda ingin membuat website atau aplikasi, memilih teknologi, menghubungkan sistem yang terpisah, atau menyusun prioritas pengembangan. Mulai dari masalah yang dialami tim, perangkat yang digunakan, batasan anggaran, dan hasil yang ingin dicapai.</p>
          <p>Kita membahas alur kerja saat ini, kebutuhan pengguna, pilihan solusi, dan tahapan implementasi. Kebutuhan akses, dokumentasi, serta hasil konsultasi disepakati sebelum pekerjaan dimulai. Pengembangan sistem dapat dibahas sebagai lingkup lanjutan.</p>
          <p>Jika kebutuhannya sudah mengarah pada situs bisnis, lihat <Link href="/layanan/website-development">jasa pembuatan website</Link>. Untuk alur operasional khusus, pelajari <Link href="/layanan/web-application">pengembangan aplikasi web</Link>.</p>
        </>}
        <h2>Melayani Jakarta, Bogor, Depok, Tangerang, dan Bekasi</h2>
        <p>Kami menerima kebutuhan project dari seluruh Jabodetabek. Sampaikan lokasi bisnis, target pengguna, dan ruang lingkup pekerjaan saat konsultasi agar cara koordinasi serta kebutuhan pertemuan dapat disepakati bersama.</p>
      </section>}
      {!!service.deliverables?.length && <section><h2>Ruang lingkup yang bisa dibahas.</h2><ul className="deliverables">{service.deliverables.map(d => <li key={d.id}>{d.item}</li>)}</ul><p>Rincian hasil kerja disepakati sesuai konteks dan kebutuhan proyek.</p></section>}
    </div></div></section><CTA title="Mari temukan bentuk solusi Anda."/>
  </>
}
