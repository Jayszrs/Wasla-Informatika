export type Locale = 'id' | 'en'

export function withoutLocale(path: string) {
  const match = path.match(/^([^?#]*)(.*)$/)!
  const pathname = match[1]
  return (pathname === '/en' ? '/' : pathname.startsWith('/en/') ? pathname.slice(3) : pathname) + match[2]
}

export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith('/') || path.startsWith('//') || /^\/(?:api|admin|_next|images|fonts)(?:\/|$)/.test(path) || /\.[a-z0-9]+(?:[?#]|$)/i.test(path)) return path
  const plain = withoutLocale(path)
  return locale === 'en' ? plain === '/' ? '/en' : plain.startsWith('/?') || plain.startsWith('/#') ? `/en${plain.slice(1)}` : `/en${plain}` : plain
}

const english: Record<string, string> = {
  'Beranda': 'Home', 'Tentang': 'About', 'Tentang Kami': 'About Us', 'Tentang Wasla': 'About Wasla',
  'Layanan': 'Services', 'Project': 'Projects', 'Artikel': 'Articles', 'Paket': 'Pricing', 'Kontak': 'Contact', 'Privasi': 'Privacy',
  'Langsung ke konten': 'Skip to content', 'Navigasi utama': 'Main navigation', 'Navigasi mobile': 'Mobile navigation',
  'Buka menu navigasi': 'Open navigation menu', 'Wasla Informatika, beranda': 'Wasla Informatika, home',
  'Hubungi Kami': 'Contact Us', 'Layanan Kami': 'Our Services', 'Jelajahi Wasla': 'Explore Wasla',
  'Layanan footer': 'Footer services', 'Navigasi footer': 'Footer navigation', 'Sosial Media Kami': 'Our Social Media',
  'Kembali ke atas': 'Back to top', 'Pilih kontak WhatsApp': 'Choose a WhatsApp contact',
  'Jasa Pembuatan Website': 'Website Development', 'Pembuatan Aplikasi': 'Application Development',
  'Desain UI/UX': 'UI/UX Design', 'Fotografi Wedding & Wisuda': 'Wedding & Graduation Photography',
  'Desain Grafis & Photo Editing': 'Graphic Design & Photo Editing', 'Paket Website': 'Website Packages',
  'Software House & Solusi Digital': 'Software House & Digital Solutions',
  'Desain. Pengembangan. Solusi IT.': 'Design. Development. IT Solutions.',
  'Mulai konsultasi': 'Start a conversation', 'Gulir ke bawah': 'Scroll down', 'Project pilihan': 'Selected projects',
  'Website dan aplikasi yang telah kami kerjakan untuk pendidikan, organisasi, dan bisnis.': 'Websites and applications we have built for education, organizations, and businesses.',
  'Project sedang diperbarui. Mari diskusikan kebutuhan Anda.': 'Our projects are being updated. Let’s discuss what you need.',
  'Lihat semua project': 'View all projects', 'Layanan kami': 'Our services',
  'Pengembangan website dan aplikasi, fotografi, serta penyuntingan visual untuk kebutuhan bisnis dan momen Anda.': 'Website and application development, photography, and visual editing for your business and important moments.',
  'Pelajari layanan': 'Explore this service', 'Jelajahi seluruh layanan': 'Explore all services',
  'Desain yang terarah.': 'Design with direction.', 'Teknologi yang tepat guna.': 'Technology that fits.',
  'Memahami kebutuhan,': 'Understanding your needs,', 'sebelum membangun solusi.': 'before building a solution.',
  'Website responsif, aplikasi web, e-commerce, desain UI/UX, pengelolaan konten, integrasi sistem, dan solusi IT. Kami menyatukan disiplin tersebut untuk membantu Anda membangun pengalaman digital yang berguna.': 'Responsive websites, web applications, e-commerce, UI/UX design, content management, system integration, and IT solutions. We bring these disciplines together to build useful digital experiences.',
  'Kita mulai dari tujuan bisnis dan pengguna, kemudian menyusun prioritas, merancang pengalaman, serta mengembangkan dan menguji secara bertahap. Setiap langkah dibahas bersama agar hasilnya mudah digunakan dan dikelola.': 'We start with business and user goals, then set priorities, design the experience, and develop and test in stages. We review each step together so the result is easy to use and maintain.',
  'Kenali cara kami bekerja': 'See how we work', 'Teknologi kami': 'Our technology',
  'Pilihan teknologi untuk kebutuhan website, aplikasi, dan integrasi. Sentuh logo untuk mengenal perangkatnya.': 'Technology choices for websites, applications, and integration. Select a logo to learn about the tool.',
  'Ceritakan project Anda.': 'Tell us about your project.',
  'Sampaikan tujuan bisnis dan kebutuhan Anda. Pilih rekan diskusi, siapkan ringkasan, lalu lanjutkan percakapan melalui WhatsApp.': 'Share your business goals and requirements. Choose someone to speak with, prepare a brief, and continue the conversation on WhatsApp.',
  'Lingkup, jadwal, dan biaya dibahas bersama sesuai kebutuhan project.': 'Scope, schedule, and costs are discussed together according to your project needs.',
  'Cerita kolaborasi': 'Working together', 'Pengalaman yang dibagikan oleh rekan kolaborasi Wasla.': 'Experiences shared by people who have worked with Wasla.',
  'Paket layanan.': 'Service packages.', 'Pilih layanan untuk rencana Anda.': 'Choose a service for your plans.',
  'Website, fotografi, dan video editing. Pilih kebutuhan Anda, lalu kita susun rincian pengerjaannya bersama.': 'Websites, photography, and video editing. Choose what you need, then we will work through the details together.',
  'Website & aplikasi': 'Websites & applications', 'Foto & video': 'Photo & video', 'Mulai dari': 'From',
  'Fotografi': 'Photography', 'Video editing': 'Video editing', 'Kategori paket layanan': 'Service package categories',
  'Pilih paket': 'Choose package', 'Konsultasi paket': 'Discuss package', 'Untuk kebutuhan operasional': 'For business operations',
  'Rincian & ketentuan': 'Details & terms',
  'Domain, hosting, dukungan, jadwal, dan revisi mengikuti kesepakatan project.': 'Domains, hosting, support, timing, and revisions follow the project agreement.',
  'Lokasi, durasi, hasil akhir, revisi, dan biaya tambahan disepakati dalam penawaran.': 'Location, duration, deliverables, revisions, and additional costs are agreed in the proposal.',
  'Halaman penawaran layanan atau produk': 'A page for a service or product offer', 'Kebutuhan promosi atau kampanye': 'Promotions or campaigns',
  'Aplikasi untuk alur kerja operasional': 'An application for operational workflows', 'Fungsi mengikuti kebutuhan project': 'Functions tailored to the project requirements',
  'Website profil bisnis': 'Business profile website', 'Dashboard untuk memperbarui konten': 'A dashboard to update content',
  'Foto personal, wisuda, atau keluarga': 'Personal, graduation, or family photography', 'Penyesuaian warna dasar': 'Basic color adjustments', 'Transportasi sesuai lokasi': 'Transport according to location',
  'Foto pernikahan, lamaran, atau acara': 'Wedding, engagement, or event photography', 'Hasil digital sesuai kebutuhan': 'Digital deliverables according to requirements', 'Album dan video dibahas terpisah': 'Albums and video discussed separately',
  'Editing footage yang Anda sediakan': 'Editing footage you provide', 'Potongan gambar dan teks sederhana': 'Video cuts and simple text', 'Koreksi warna dan penataan audio dasar': 'Color correction and basic audio arrangement',
  'Cakupan paket': 'Package scope', 'Lihat cakupan paket': 'View package scope', 'Kembali ke harga': 'Back to pricing',
  'Tanpa CMS': 'Without CMS', 'Termasuk CMS': 'CMS included', 'Pengelolaan sesuai lingkup project': 'Management according to project scope',
  'Foto Wisuda & Personal': 'Graduation & Personal Photography', 'Foto Wedding & Acara': 'Wedding & Event Photography',
  'Fotografi & Dokumentasi': 'Photography & Documentation', 'per sesi': 'per session', 'per acara': 'per event', 'per video': 'per video',
  'Lihat seluruh paket layanan': 'View all service packages', 'Paket sedang diperbarui.': 'Packages are being updated.', 'Diskusikan kebutuhan Anda.': 'Discuss your requirements.',
  'Rincian hasil, jadwal, lokasi, revisi, dan biaya tambahan disepakati dalam penawaran. Untuk website, domain, hosting, serta dukungan mengikuti lingkup project.': 'Deliverables, schedule, location, revisions, and additional costs are agreed in the proposal. Website domains, hosting, and support depend on the project scope.',
  'Satu tim.': 'One team.', 'Beragam keahlian.': 'Different expertise.', 'Profil & kontak': 'Profile & contact',
  'Kenali orang dan divisi di balik project Anda. Ketuk kartu untuk melihat bio, lalu ketuk lagi untuk kembali.': 'Meet the people and teams behind your project. Select a card to read the bio, then select it again to return.',
  'Hubungi via WhatsApp': 'Contact on WhatsApp', 'Satu tim, saling terhubung.': 'One connected team.',
  'Semua': 'All', 'Aplikasi Web': 'Web Application', 'Portal Berita': 'News Portal', 'Company Profile': 'Company Profile', 'E-Katalog': 'E-Catalog',
  'Lihat project': 'View project', 'Kunjungi website': 'Visit website', 'Konsep Eksplorasi': 'Exploration concept',
  'Gambar proyek belum tersedia.': 'A project image is not available yet.',
  'Lebih dekat dengan project ini.': 'A closer look at this project.',
  'Jelajahi tampilan dan detailnya. Pilih gambar untuk melihat lebih besar.': 'Explore the interface and its details. Select an image to enlarge it.',
  'Galeri project diperbesar': 'Enlarged project gallery', 'Tutup galeri': 'Close gallery', 'Tutup': 'Close',
  'Memuat gambar...': 'Loading image...', 'Gambar belum termuat. Buka gambar asli': 'Image could not load. Open the original',
  'Gambar sebelumnya': 'Previous image', 'Gambar berikutnya': 'Next image',
  'Formulir konsultasi': 'Consultation form', 'Ingin berbicara dengan siapa?': 'Who would you like to speak with?',
  'Nama lengkap': 'Full name', 'Nama Anda': 'Your name', 'Perusahaan': 'Company', '(opsional)': '(optional)',
  'Nama perusahaan': 'Company name', 'Nomor telepon': 'Phone number', 'Nomor yang dapat dihubungi': 'A number we can reach',
  'Apa yang ingin Anda bangun?': 'What would you like to build?', 'Pilih layanan': 'Choose a service',
  'Belum yakin, mari diskusikan': 'Not sure yet, let’s discuss', 'Ceritakan kebutuhan Anda': 'Tell us what you need',
  'Tujuan, tantangan, dan rencana yang ingin Anda diskusikan…': 'Goals, challenges, and plans you would like to discuss...',
  'Biarkan kolom ini kosong': 'Leave this field empty', 'informasi privasi': 'privacy information',
  'Saya menyetujui penggunaan informasi ini untuk menanggapi konsultasi, sesuai': 'I agree to the use of this information to respond to my enquiry, in accordance with the',
  'Data Anda digunakan untuk menanggapi kebutuhan yang Anda sampaikan.': 'Your information is used to respond to the requirements you share.',
  'Menyimpan pesan…': 'Saving message...', 'Kirim pesan': 'Send message',
  'Pesan belum terkirim. Silakan coba lagi.': 'Your message has not been sent. Please try again.',
  'Terima kasih. Pesan Anda sudah tersimpan dan dapat ditinjau oleh tim Wasla.': 'Thank you. Your message has been saved for the Wasla team to review.',
  'Koneksi terputus. Pesan belum dapat dipastikan terkirim; periksa jaringan dan coba lagi.': 'The connection was interrupted. We could not confirm that your message was saved; check your connection and try again.',
  'Aktifkan JavaScript untuk menggunakan formulir, atau pilih salah satu kontak WhatsApp di halaman ini.': 'Enable JavaScript to use this form, or choose a WhatsApp contact on this page.',
  'Tuliskan nama Anda, minimal 2 karakter.': 'Enter your name using at least 2 characters.', 'Alamat email belum valid.': 'Enter a valid email address.',
  'Pilih layanan yang ingin dibahas.': 'Choose the service you would like to discuss.', 'Ceritakan kebutuhan Anda, minimal 20 karakter.': 'Describe your requirements using at least 20 characters.',
  'Persetujuan diperlukan untuk memproses pesan.': 'Consent is required to process your message.', 'Pesan maksimal 5.000 karakter.': 'Your message can contain up to 5,000 characters.',
  'Terlalu banyak percobaan. Silakan coba lagi dalam 15 menit.': 'Too many attempts. Please try again in 15 minutes.',
  'Pilih layanan yang tersedia.': 'Choose an available service.', 'Pilih kontak yang tersedia.': 'Choose an available contact.',
  'Dari percakapan,': 'From conversation,', 'menjadi kenyataan.': 'to reality.',
  'Proses yang terbuka, dengan arah dan keputusan yang kita pahami bersama.': 'An open process, with a direction and decisions we understand together.',
  'Kenali kebutuhan': 'Understand the needs', 'Rancang arahnya': 'Set the direction', 'Bangun solusinya': 'Build the solution', 'Luncurkan & rawat': 'Launch & maintain',
  'Kita membahas tujuan bisnis, pengguna, dan masalah yang perlu diselesaikan.': 'We discuss business goals, users, and the problems to solve.',
  'Prioritas menjadi alur, struktur, dan desain yang dapat ditinjau bersama.': 'Priorities become flows, structure, and design we can review together.',
  'Pengembangan bertahap memberi ruang untuk menguji dan menyempurnakan.': 'Development in stages gives us room to test and improve.',
  'Persiapan peluncuran, dokumentasi, dan dukungan sesuai lingkup proyek.': 'Launch preparation, documentation, and support according to the agreed scope.',
  'Langkah berikutnya, kita mulai bersama.': 'Let’s take the next step together.',
  'Ceritakan rencana Anda. Kita petakan kebutuhan digital atau produksi visual sesuai tujuan Anda.': 'Tell us your plans. We will map out the digital or visual production needs that fit your goals.',
}

export function translate(text: string, locale: Locale): string {
  if (locale === 'id') return text
  if (english[text]) return english[text]
  const trimmed = text.trim()
  if (english[trimmed]) return text.replace(trimmed, english[trimmed])
  const patterns: [RegExp, (match: RegExpMatchArray) => string][] = [
    [/^Konsultasi paket (.+)$/, m => `Discuss the ${translate(m[1], locale)} package`],
    [/^Bahas paket (.+)$/, m => `Discuss ${translate(m[1], locale)}`],
    [/^Lihat cakupan (.+)$/, m => `View the scope of ${translate(m[1], locale)}`],
    [/^Lihat harga (.+)$/, m => `View pricing for ${translate(m[1], locale)}`],
    [/^Kembali ke profil (.+)$/, m => `Return to ${m[1]}'s profile`],
    [/^Kenali (.+)$/, m => `Meet ${m[1]}`],
    [/^Buka website (.+)$/, m => `Visit the ${m[1]} website`],
    [/^Lihat (.+)$/, m => `View ${m[1]}`],
    [/^Perbesar gambar (\d+): (.+)$/, m => `Enlarge image ${m[1]}: ${translate(m[2], locale)}`],
    [/^Tampilan desktop website (.+)$/, m => `Desktop view of the ${m[1]} website`],
    [/^Tampilan mobile website (.+)$/, m => `Mobile view of the ${m[1]} website`],
    [/^Ringkasan tersimpan\. Lanjutkan ke WhatsApp (.+) untuk mengirim pesan Anda\.$/, m => `Your brief is saved. Continue to ${m[1]}'s WhatsApp to send your message.`],
    [/^Lanjut ke WhatsApp (.+)$/, m => `Continue to ${m[1]}'s WhatsApp`],
  ]
  for (const [pattern, replacement] of patterns) { const match = text.match(pattern); if (match) return replacement(match) }
  return text
}
