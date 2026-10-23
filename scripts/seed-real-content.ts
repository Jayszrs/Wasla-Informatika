import 'dotenv/config'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const payload = await getPayload({ config })
const projects = [
  { slug: 'catatan-mengaji-bani-saleh', title: 'Catatan Mengaji — SD Bani Saleh', category: 'Aplikasi Web', client: 'SD Islam Labschool Bani Saleh', url: 'https://ngajiyuk.sdilbanisalehsetu.com/', image: 'ngajiyuk', excerpt: 'Platform pendampingan Tahsin dan Tahfidz dengan halaman informasi Ngaji Yuk untuk SD Islam Labschool Bani Saleh.' },
  { slug: 'ipnu-kota-bekasi', title: 'IPNU Kota Bekasi', category: 'Portal Berita', client: 'IPNU Kota Bekasi', url: 'https://ipnubekasi.my.id/', image: 'ipnubekasi', excerpt: 'Website organisasi dan portal informasi kegiatan IPNU IPPNU Kota Bekasi.' },
  { slug: 'batu-alam-supplier', title: 'Batu Alam Supplier', category: 'Company Profile', client: 'Batu Alam Supplier', url: 'https://www.batualamsupplier.com/', image: 'batu-alam-supplier', excerpt: 'Website profil dan katalog pemasok batu alam yang memperkenalkan produk serta jalur konsultasi.' },
  { slug: 'fazma-stone', title: 'Fazma Stone', category: 'Company Profile', client: 'Fazma Stone', url: 'https://www.fazmastone.com/', image: 'fazmastone', excerpt: 'Website pemasok batu alam dengan informasi produk dan katalog untuk membantu pengunjung mengenal pilihan material.' },
  { slug: 'cimuning-e-katalog', title: 'Cimuning — E-Katalog', category: 'E-Katalog', client: 'Cimuning Digital Hub', url: 'https://cimuning.com/', image: 'cimuning', excerpt: 'Direktori UMKM dan e-katalog produk Cimuning yang menghubungkan informasi usaha dengan calon pelanggan.' },
  { slug: 'mahameru-baja-indonesia', title: 'Mahameru Baja Indonesia', category: 'Company Profile', client: 'Mahameru Baja Indonesia', url: 'https://mahamerubaja.vercel.app/', image: 'mahameru-baja', excerpt: 'Company profile MBI Laser Cutting yang memperkenalkan layanan industri Mahameru Baja Indonesia.' },
  { slug: 'sit-permata-hati-bekasi', title: 'SIT Permata Hati Bekasi', category: 'Company Profile', client: 'SIT Permata Hati Bekasi', url: 'https://sitpermatahati.up.railway.app/', image: 'sit-permatahati', excerpt: 'Website profil sekolah yang memperkenalkan SIT Permata Hati Bekasi dan informasi pendidikannya.' },
]
const implementations: Record<string, string> = {
  'catatan-mengaji-bani-saleh': 'Halaman pengenalan Ngaji Yuk menyatukan informasi platform Tahsin dan Tahfidz dalam pengalaman digital untuk lingkungan SD Islam Labschool Bani Saleh.',
  'ipnu-kota-bekasi': 'Informasi organisasi, berita, dan kegiatan ditampilkan dalam satu portal yang membantu pengunjung mengikuti perkembangan IPNU IPPNU Kota Bekasi.',
  'batu-alam-supplier': 'Profil pemasok dan pilihan batu alam disajikan melalui katalog visual dengan akses menuju informasi produk serta konsultasi.',
  'fazma-stone': 'Tampilan katalog memperkenalkan pilihan material batu alam dan memberikan jalur bagi pengunjung untuk melanjutkan pencarian produk.',
  'cimuning-e-katalog': 'Direktori usaha dan katalog produk disusun sebagai pusat informasi digital UMKM Cimuning.',
  'mahameru-baja-indonesia': 'Layanan industri dan laser cutting diperkenalkan melalui company profile yang menempatkan informasi usaha dan jalur kontak dalam satu website.',
  'sit-permata-hati-bekasi': 'Profil sekolah dan pengenalan lingkungan pendidikan disampaikan melalui website resmi SIT Permata Hati Bekasi.',
}
async function media(file: string, alt: string, caption: string) {
  const filename = path.basename(file)
  const existing = await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1, overrideAccess: true })
  return existing.docs[0] || payload.create({ collection: 'media', filePath: path.resolve(file), data: { alt, caption }, overrideAccess: true })
}
try {
  for (const [order, project] of projects.entries()) {
    const screenshot = await media(`public/images/projects/${project.image}.webp`, `Screenshot website ${project.title}`, `Screenshot website publik asli ${project.url}, diambil 23 Oktober 2026 atas izin pemilik. Teknologi dan hasil bisnis tidak diasumsikan.`)
    const existing = await payload.find({ collection: 'projects', where: { slug: { equals: project.slug } }, limit: 1, overrideAccess: true })
    const data = { title: project.title, slug: project.slug, category: project.category, client: project.client,
      excerpt: project.excerpt, challenge: project.excerpt, solution: implementations[project.slug],
      isConcept: false, featured: true, order, thumbnail: screenshot.id, externalLink: project.url, technologies: [], _status: 'published' as const }
    if (existing.docs[0]) await payload.update({ collection: 'projects', id: existing.docs[0].id, overrideAccess: true, data })
    else await payload.create({ collection: 'projects', overrideAccess: true, data })
    const articleSlug = ['website-atau-aplikasi-web', 'menyiapkan-brief-digital', 'perawatan-produk-digital'][order]
    if (articleSlug) {
      const article = await payload.find({ collection: 'posts', where: { slug: { equals: articleSlug } }, limit: 1, overrideAccess: true })
      if (article.docs[0]) await payload.update({ collection: 'posts', id: article.docs[0].id, overrideAccess: true, data: { image: screenshot.id, _status: article.docs[0]._status } })
    }
  }
  // Preserve the old demonstrations privately instead of deleting CMS history.
  for (const slug of ['nusa-profile', 'ruang-commerce', 'alur-operations', 'sela-journal']) {
    const old = await payload.find({ collection: 'projects', where: { slug: { equals: slug } }, limit: 1, overrideAccess: true })
    if (old.docs[0]?.isConcept) await payload.update({ collection: 'projects', id: old.docs[0].id, overrideAccess: true, data: { _status: 'draft', featured: false } })
  }
  const team = [
    ['Jaelani Surya Saputra', 'Software Engineering', '6281318533055'],
    ['Amat Suroso', 'Project Manager', '6281310154447'],
    ['Alhafiz', 'Web Developer', '6289697505769'],
    ['Laksa', 'Full Stack Engineering', '6289643092842'],
  ]
  for (const [order, [name, role, phone]] of team.entries()) {
    const existing = await payload.find({ collection: 'team', where: { name: { equals: name } }, limit: 1, overrideAccess: true })
    const data = { name, role, order, biography: `Hubungi ${name} untuk berdiskusi dengan divisi ${role} Wasla Informatika.`, socials: [{ label: 'WhatsApp', url: `https://wa.me/${phone}` }] }
    if (existing.docs[0]) await payload.update({ collection: 'team', id: existing.docs[0].id, overrideAccess: true, data })
    else await payload.create({ collection: 'team', overrideAccess: true, data })
  }
  const emblem = await media('public/images/brand/wasla-emblem.webp', 'Logo Wasla Informatika', 'Restorasi raster logo yang disediakan pemilik; bentuk asli menjadi referensi, diproses melalui imagegen.')
  const favicon = await media('public/images/brand/favicon.png', 'Ikon Wasla Informatika', 'Turunan ikon logo pemilik untuk favicon.')
  const device = await media('public/images/brand/wasla-device-branded.webp', 'Mockup perangkat dengan logo Wasla Informatika', 'Visual ilustrasi perangkat, bukan produk klien. Logo mengacu pada aset yang diberikan pemilik.')
  await payload.updateGlobal({ slug: 'site-settings', overrideAccess: true, data: { logoWhite: emblem.id, logoNavy: emblem.id, favicon: favicon.id, featureImage: device.id } })
  const sculptures = await Promise.all([
    media('public/images/services/web-3d.webp', 'Objek 3D browser dan perangkat untuk pengembangan website', 'Ilustrasi layanan 3D orisinal melalui imagegen, bukan screenshot project.'),
    media('public/images/services/app-3d.webp', 'Objek 3D sistem aplikasi yang saling terhubung', 'Ilustrasi layanan 3D orisinal melalui imagegen, bukan foto infrastruktur klien.'),
    media('public/images/services/design-3d.webp', 'Objek 3D alat desain antarmuka dan kurva Bezier', 'Ilustrasi layanan 3D orisinal melalui imagegen.'),
  ])
  const services = await payload.find({ collection: 'services', limit: 100, overrideAccess: true })
  for (const service of services.docs) {
    const index = service.slug === 'ui-ux-design' ? 2 : ['website-development', 'e-commerce'].includes(service.slug) ? 0 : 1
    await payload.update({ collection: 'services', id: service.id, overrideAccess: true, data: { image: sculptures[index].id, illustration: sculptures[index].id, _status: service._status } })
  }
  const navigation = await payload.findGlobal({ slug: 'navigation', overrideAccess: true })
  await payload.updateGlobal({ slug: 'navigation', overrideAccess: true, data: { links: navigation.links?.map(link => ({ ...link, label: link.href === '/portofolio' ? 'Project' : link.href === '/insights' ? 'Artikel' : link.label })) } })
  console.log('Seven real projects, four WhatsApp contacts, brand assets, 3D services and navigation are ready.')
} finally { await payload.destroy() }
process.exit(0)
