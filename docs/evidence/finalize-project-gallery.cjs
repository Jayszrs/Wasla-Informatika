const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const manifestPath = path.join(__dirname, 'project-gallery-2026-10-23.json');
const entries = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const captions = {
  ngajiyuk: ['Fitur pencatatan, rapor, dan kurikulum dalam tampilan desktop.', 'Alur guru, sistem, dan orang tua pada halaman publik.'],
  ipnubekasi: ['Daftar berita dan kategori pada portal organisasi.', 'Arsip berita dan bagian liputan video.'],
  'batu-alam-supplier': ['Bagian keunggulan produk pada situs Batu Alam Supplier.', 'Katalog batu alam dengan foto dan informasi produk.'],
  fazmastone: ['Bagian testimoni publik pada situs Fazmastone.', 'Kategori produk batu alam dan aksesori.'],
  cimuning: ['Katalog produk dan jasa lokal Cimuning.', 'Direktori UMKM pilihan pada halaman publik.'],
  'mahameru-baja': ['Galeri promo dan penawaran Mahameru Baja.', 'Informasi penawaran dan profil Mahameru Group.'],
  'sit-permatahati': ['Bagian program pendidikan terpadu.', 'Jenjang pendidikan dan foto gedung unit sekolah.'],
};
for (const entry of entries) {
  if (entry.variant !== 'mobile') entry.caption = captions[entry.slug][entry.variant === 'detail-1' ? 0 : 1];
  const asset = path.join(root, 'public', entry.src);
  fs.writeFileSync(`${asset}.source.json`, JSON.stringify(entry, null, 2) + '\n');
  const prompt = `Sourced actual public website screenshot. Origin: ${entry.source_url}. Captured by REA controlled browser scenario on 2026-10-23; viewport ${entry.viewport.width}x${entry.viewport.height}; evidence ${entry.evidence_id}, step ${entry.evidence_step}. ${entry.caption} PNG converted to WebP with unchanged viewport composition. Not AI-generated.`;
  fs.writeFileSync(path.join(__dirname, 'project-gallery-2026-10-23', `${entry.slug}-${entry.variant}-origin.txt`), prompt + '\n');
}
fs.writeFileSync(manifestPath, JSON.stringify(entries, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'public/images/projects/gallery/provenance.json'), JSON.stringify(entries, null, 2) + '\n');
const cmsSlugs = {
  ngajiyuk: 'catatan-mengaji-bani-saleh',
  ipnubekasi: 'ipnu-kota-bekasi',
  'batu-alam-supplier': 'batu-alam-supplier',
  fazmastone: 'fazmastone',
  cimuning: 'cimuning-digital-hub',
  'mahameru-baja': 'mahameru-baja-indonesia',
  'sit-permatahati': 'sit-permata-hati-bekasi',
};
const grouped = Object.entries(cmsSlugs).map(([slug, projectSlug]) => ({ projectSlug, images: entries.filter(e => e.slug === slug).map(e => ({ path: e.src, caption: e.caption, alt: `${e.title}: ${e.caption}`, sourceUrl: e.source_url, evidenceId: e.evidence_id })) }));
fs.writeFileSync(path.join(__dirname, 'project-gallery-2026-10-23-cms.json'), JSON.stringify(grouped, null, 2) + '\n');
