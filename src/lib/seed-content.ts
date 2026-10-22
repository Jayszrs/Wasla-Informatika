export const serviceSeeds = [
  ['Website Development', 'website-development', 'Website yang menjelaskan nilai bisnis Anda dengan jelas dan mudah dikelola.', 'Pengembangan', ['Website profil perusahaan', 'Sistem manajemen konten', 'Tampilan responsif', 'Konfigurasi SEO dasar']],
  ['Web Application', 'web-application', 'Aplikasi web yang merapikan proses kerja dan menghubungkan tim Anda.', 'Pengembangan', ['Pemetaan alur kerja', 'Dashboard operasional', 'Hak akses pengguna', 'Integrasi API']],
  ['Custom Software', 'custom-software', 'Perangkat lunak yang mengikuti cara bisnis Anda bekerja.', 'Pengembangan', ['Analisis kebutuhan', 'Arsitektur sistem', 'Pengembangan bertahap', 'Dokumentasi penggunaan']],
  ['E-Commerce', 'e-commerce', 'Pengalaman berbelanja yang terarah, dari katalog sampai pesanan.', 'Pengembangan', ['Katalog produk', 'Alur checkout', 'Integrasi pembayaran sesuai penyedia', 'Pengelolaan pesanan']],
  ['UI/UX Design', 'ui-ux-design', 'Desain yang mempertemukan kebutuhan pengguna dengan tujuan bisnis.', 'Desain', ['Riset kebutuhan pengguna', 'Wireframe', 'Prototipe interaktif', 'Sistem desain']],
  ['IT Consultation', 'it-consultation', 'Petakan prioritas teknologi sebelum menentukan langkah berikutnya.', 'Konsultasi', ['Diskusi kebutuhan', 'Tinjauan sistem', 'Rekomendasi teknologi', 'Rencana implementasi']],
  ['IT Infrastructure & Support', 'it-infrastructure', 'Fondasi infrastruktur yang disesuaikan dengan kebutuhan operasional.', 'Infrastruktur', ['Pemetaan infrastruktur', 'Konfigurasi lingkungan', 'Dokumentasi sistem', 'Rencana dukungan']],
  ['Maintenance & Support', 'maintenance-support', 'Perawatan teknis untuk menjaga website dan aplikasi tetap relevan.', 'Infrastruktur', ['Pembaruan berkala sesuai lingkup', 'Pemantauan aplikasi', 'Perbaikan masalah', 'Dukungan teknis']],
  ['Systems Integration', 'systems-integration', 'Hubungkan sistem agar data dapat mengalir tanpa pekerjaan berulang.', 'Pengembangan', ['Audit integrasi', 'Koneksi API', 'Sinkronisasi data', 'Penanganan kesalahan']],
  ['Database & Digital Solutions', 'database-digital-solutions', 'Struktur data yang membantu informasi menjadi lebih mudah digunakan.', 'Pengembangan', ['Perancangan basis data', 'Migrasi terencana', 'Optimasi kueri', 'Dokumentasi data']],
] as const

export const projectSeeds = [
  { title: 'Nusa — Company Profile', slug: 'nusa-profile', category: 'Website', visual: 'editorial' as const,
    excerpt: 'Eksplorasi website perusahaan dengan citra arsitektur, hierarki layanan yang jelas, dan pengelolaan konten yang terarah.',
    challenge: 'Konsep ini mengeksplorasi cara memperkenalkan perusahaan melalui narasi, layanan, dan proyek tanpa membuat informasi sulit ditemukan. Bukan pekerjaan untuk klien nyata.',
    solution: 'Komposisi fotografi yang kuat, navigasi ringkas, halaman layanan yang terstruktur, dan pengelolaan konten melalui CMS.', technologies: ['Next.js', 'Payload CMS', 'TypeScript'] },
  { title: 'Ruang — Commerce', slug: 'ruang-commerce', category: 'E-Commerce', visual: 'commerce' as const,
    excerpt: 'Eksplorasi toko digital untuk benda sehari-hari. Fokus pada katalog yang lapang dan perjalanan belanja yang sederhana.',
    challenge: 'Bagaimana membantu pengunjung menemukan produk di katalog tanpa kehilangan karakter merek? Ini adalah pertanyaan desain pada demonstrasi, bukan tantangan dari klien nyata.',
    solution: 'Hierarki foto yang kuat, kategori yang singkat, halaman produk yang mudah dipindai, dan alur checkout yang terarah.', technologies: ['Next.js', 'TypeScript', 'PostgreSQL'] },
  { title: 'Alur — Operations', slug: 'alur-operations', category: 'Aplikasi Web', visual: 'platform' as const,
    excerpt: 'Eksplorasi ruang kerja digital yang menghubungkan proyek, tugas, dan keputusan tim dalam satu alur.',
    challenge: 'Demonstrasi ini meneliti cara menyederhanakan informasi operasional tanpa menyembunyikan konteks yang diperlukan tim.',
    solution: 'Pemisahan informasi berdasarkan pekerjaan, status yang terbaca jelas, dan navigasi yang konsisten di seluruh ruang kerja.', technologies: ['React', 'Node.js', 'PostgreSQL'] },
  { title: 'Sela — Digital Journal', slug: 'sela-journal', category: 'Website', visual: 'editorial' as const,
    excerpt: 'Eksplorasi website editorial dengan tipografi ekspresif dan pengalaman membaca yang tenang.',
    challenge: 'Demonstrasi ini menguji keseimbangan antara identitas editorial yang kuat dan keterbacaan di layar kecil.',
    solution: 'Skala huruf yang lentur, kolom baca yang terukur, dan CMS yang memisahkan struktur artikel dari presentasinya.', technologies: ['Next.js', 'Payload CMS', 'Tailwind CSS'] },
]

export const postSeeds = [
  { title: 'Website atau aplikasi web: apa yang bisnis Anda butuhkan?', slug: 'website-atau-aplikasi-web', category: 'Strategi Digital',
    excerpt: 'Mulai dari masalah yang ingin diselesaikan, lalu pilih bentuk produk digital yang tepat.',
    paragraphs: ['Website membantu orang memahami bisnis, layanan, dan cara menghubungi Anda. Aplikasi web membantu pengguna menyelesaikan pekerjaan tertentu, seperti mengelola pesanan atau berkolaborasi.', 'Tuliskan pekerjaan yang perlu menjadi lebih mudah. Jika kebutuhan utamanya menjelaskan penawaran dan membangun kepercayaan, website bisa menjadi langkah awal. Jika ada alur kerja, data, dan peran pengguna, aplikasi web mungkin lebih sesuai.', 'Petakan pengguna, informasi, integrasi, dan cara mengukur hasil. Setelah itu, tentukan lingkup awal yang dapat diuji. Ruang lingkup yang jelas membuat pilihan teknologi lebih terarah.'] },
  { title: 'Sebelum mulai membangun, rapikan brief digital Anda.', slug: 'menyiapkan-brief-digital', category: 'Proses & Kolaborasi',
    excerpt: 'Tujuan, pengguna, dan prioritas yang jelas membantu percakapan proyek menjadi lebih produktif.',
    paragraphs: ['Brief tidak harus panjang. Mulailah dengan alasan proyek ini diperlukan dan siapa yang akan menggunakannya. Jelaskan proses saat ini dan bagian yang menimbulkan hambatan.', 'Pisahkan kebutuhan inti dari pengembangan lanjutan. Sertakan contoh konten, sistem yang perlu terhubung, pihak yang memberi persetujuan, dan batasan yang sudah diketahui.', 'Tentukan bagaimana perubahan akan ditinjau. Kesepakatan tentang lingkup, konten, dan pengambilan keputusan membantu tim bergerak dengan pemahaman yang sama.'] },
  { title: 'Peluncuran adalah awal dari perawatan produk digital.', slug: 'perawatan-produk-digital', category: 'Teknologi',
    excerpt: 'Pembaruan, cadangan, dan dokumentasi perlu menjadi bagian dari rencana sejak awal.',
    paragraphs: ['Website dan aplikasi memiliki kebutuhan setelah diluncurkan: konten berubah, dependensi diperbarui, dan kebutuhan pengguna berkembang. Rencana perawatan membantu menentukan siapa yang bertanggung jawab.', 'Catat lingkungan aplikasi, akses yang diperlukan, jadwal cadangan, dan prosedur pemulihan. Uji pemulihan secara berkala sesuai kebutuhan sistem, jangan hanya mengandalkan keberadaan file cadangan.', 'Sepakati cakupan dukungan dan cara melaporkan masalah. Setiap produk memiliki kebutuhan berbeda, sehingga jadwal dan tanggung jawab sebaiknya dibahas berdasarkan konteks bisnis.'] },
]

export const faqSeeds = [
  ['Apa yang perlu disiapkan sebelum konsultasi?', 'Ceritakan tujuan bisnis, pengguna yang dituju, kendala saat ini, serta sistem atau contoh yang relevan. Jika brief belum lengkap, diskusi awal dapat membantu memetakan kebutuhan.'],
  ['Apakah Wasla dapat melanjutkan sistem yang sudah ada?', 'Sistem yang sudah berjalan perlu ditinjau terlebih dahulu. Akses, dokumentasi, kondisi kode, dan kebutuhan integrasi menentukan apakah pengembangan lanjutan dapat dilakukan.'],
  ['Bagaimana lingkup dan jadwal proyek ditentukan?', 'Lingkup disusun setelah kebutuhan dan prioritas dipahami. Tahapan, keluaran, jadwal, dan tanggung jawab dikonfirmasi dalam kesepakatan proyek.'],
  ['Apakah konten website dapat saya kelola sendiri?', 'Website ini menyediakan CMS untuk konten yang disepakati, seperti layanan, portofolio, artikel, FAQ, dan detail perusahaan. Hak akses dapat disesuaikan untuk admin dan editor.'],
  ['Bagaimana dukungan setelah peluncuran?', 'Cakupan perawatan, pembaruan, serta kanal dukungan dibahas sesuai kebutuhan proyek. Tidak ada paket atau jaminan yang diasumsikan sebelum lingkup disepakati.'],
]

export function richText(paragraphs: readonly string[]) {
  return { root: { type: 'root', version: 1, direction: 'ltr' as const, format: '' as const, indent: 0, children: paragraphs.map(p => ({
    type: 'paragraph', version: 1, direction: 'ltr' as const, format: '' as const, indent: 0, textFormat: 0, textStyle: '',
    children: [{ type: 'text', version: 1, text: p, format: 0, detail: 0, mode: 'normal', style: '' }],
  })) } }
}
