import Link from 'next/link'
import { ButtonLink, CTA, PageIntro } from '@/frontend/components/ui'
import { StructuredData } from '@/frontend/components/structured-data'
import { pageMeta, siteURL } from '@/frontend/lib/seo'

const title = 'Cara Membuat Website untuk Bisnis: Panduan dari Nol'
const description = 'Pelajari cara buat website: tentukan tujuan, pilih platform, siapkan domain dan hosting, susun konten, lalu uji sebelum terbit. Bandingkan buat sendiri dan jasa website.'
export const metadata = pageMeta(title, description, '/cara-membuat-website')

export default function Page() {
  const url = `${siteURL()}/cara-membuat-website`
  return <>
    <StructuredData data={{ '@context': 'https://schema.org', '@graph': [
      { '@type': 'TechArticle', '@id': `${url}#article`, headline: title, description, url, mainEntityOfPage: url, inLanguage: 'id-ID',
        author: { '@id': `${siteURL()}/#organization` }, publisher: { '@id': `${siteURL()}/#organization` },
        image: `${siteURL()}/opengraph-image` },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteURL() },
        { '@type': 'ListItem', position: 2, name: 'Cara membuat website', item: url },
      ] },
    ] }}/>
    <PageIntro title={title} copy="Ingin buat website tetapi belum tahu mulai dari mana? Panduan ini membantu Anda menyiapkan situs bisnis, baik dikerjakan sendiri maupun bersama pengembang.">
      <ButtonLink href="/layanan/website-development">Konsultasikan pembuatan website</ButtonLink>
    </PageIntro>
    <article className="wrap page-content">
      <div className="prose article-content">
        <p>Cara membuat website dimulai dari menentukan tujuan, memilih platform, menyiapkan domain dan hosting, mengisi halaman, lalu menguji situs sebelum diluncurkan. Pilihan alat mengikuti kebutuhan: situs informasi sederhana berbeda dengan aplikasi untuk pemesanan atau pekerjaan internal.</p>
        <nav aria-label="Isi panduan"><h2>Yang perlu Anda siapkan</h2><ol>
          <li><a href="#tujuan">Tujuan dan jenis website</a></li>
          <li><a href="#platform">Pilihan platform dan cara pengerjaan</a></li>
          <li><a href="#domain">Domain, hosting, dan akses</a></li>
          <li><a href="#konten">Konten dan navigasi</a></li>
          <li><a href="#pengujian">Pengujian dan persiapan Google</a></li>
          <li><a href="#biaya">Anggaran dan pemeliharaan</a></li>
        </ol></nav>
        <section id="tujuan"><h2>1. Tentukan tujuan dan jenis website</h2>
          <p>Tulis satu tindakan utama yang Anda harapkan dari pengunjung: menghubungi tim, meminta penawaran, melihat katalog, atau melakukan pemesanan. Tentukan siapa pengunjungnya dan informasi apa yang mereka butuhkan sebelum bertindak.</p>
          <ul><li><strong>Landing page:</strong> satu halaman untuk penawaran, produk, atau kampanye tertentu.</li><li><strong>Company profile:</strong> profil usaha, layanan, contoh pekerjaan, dan kontak.</li><li><strong>Toko online:</strong> katalog, keranjang, pembayaran, dan pengelolaan pesanan sesuai kebutuhan.</li><li><strong>Aplikasi web:</strong> proses khusus seperti pencatatan, persetujuan, atau dashboard operasional.</li></ul>
          <p>Contoh: usaha pemasok material dapat memulai dengan profil perusahaan, kategori produk, foto material, dan formulir permintaan penawaran. Fitur pembayaran belum tentu perlu jika harga bergantung pada jumlah dan ongkos pengiriman.</p>
        </section>
        <section id="platform"><h2>2. Pilih platform: buat sendiri atau gunakan jasa website?</h2>
          <p>Website builder menyediakan editor visual dan hosting dalam satu layanan. CMS membantu Anda mengatur halaman dan artikel dengan tema atau plugin. Pengembangan khusus memberi ruang untuk alur kerja dan integrasi yang lebih spesifik, tetapi membutuhkan pemeliharaan kode.</p>
          <p>Buat sendiri masuk akal jika kebutuhan sederhana dan Anda punya waktu mempelajari alatnya. Pertimbangkan jasa pembuatan website jika butuh bantuan menyusun konten, desain, pengembangan, atau integrasi. Sebelum memilih, cek biaya perpanjangan, akses pengelola, kemampuan ekspor data, dan siapa yang menangani pembaruan.</p>
          <p>Jika belum yakin dengan pilihan teknologi, Anda dapat membahasnya melalui <Link href="/layanan/it-consultation">jasa IT consultant</Link>.</p>
        </section>
        <section id="domain"><h2>3. Siapkan domain, hosting, dan kepemilikan akses</h2>
          <p>Domain adalah alamat website, sedangkan hosting menjalankan dan menyimpan situs. Pilih nama domain yang mudah dibaca dan sesuai identitas usaha. Sebagian platform sudah menyertakan hosting, sehingga Anda tidak perlu membeli layanan yang sama dua kali.</p>
          <p>Gunakan akun dan email yang dikuasai bisnis untuk pendaftaran domain. Catat tanggal perpanjangan dan pembagian akses pengelola. Pastikan situs dapat diakses melalui HTTPS, serta tentukan siapa yang menangani cadangan data dan pemulihan jika ada masalah.</p>
        </section>
        <section id="konten"><h2>4. Susun konten, halaman, dan navigasi</h2>
          <p>Mulai dari halaman beranda, layanan atau produk, tentang usaha, dan kontak. Siapkan nama usaha, penjelasan layanan, foto yang boleh digunakan, serta cara menghubungi tim. Tambahkan portofolio jika Anda memiliki pekerjaan yang dapat ditampilkan dengan izin.</p>
          <p>Jelaskan apa yang ditawarkan, untuk siapa, dan bagaimana proses pemesanannya. Jika melayani Jabodetabek, sebutkan area Jakarta, Bogor, Depok, Tangerang, atau Bekasi sesuai cakupan sebenarnya. Beri nama menu yang jelas dan pastikan setiap tombol mengarah ke tindakan yang tersedia.</p>
          <p>Jika tim ingin rutin mengganti teks, foto, atau artikel, masukkan kebutuhan CMS sejak awal. Hindari menaruh informasi penting hanya di dalam gambar karena pengunjung juga perlu membacanya pada layar kecil.</p>
        </section>
        <section id="pengujian"><h2>5. Uji website dan siapkan agar bisa ditemukan</h2>
          <ul><li>Buka situs di ponsel dan desktop. Periksa keterbacaan teks, menu, gambar, serta tombol kontak.</li><li>Uji formulir, notifikasi, tautan, dan halaman yang tidak ditemukan.</li><li>Tulis judul dan deskripsi yang menjelaskan isi setiap halaman secara berbeda.</li><li>Pastikan halaman publik dapat dirayapi, memiliki alamat kanonis, dan tercantum di sitemap.</li><li>Pasang favicon yang sesuai merek. Setelah situs terbit, verifikasi kepemilikan di Google Search Console dan kirim sitemap.</li></ul>
          <p>Website yang sudah terbit belum tentu langsung muncul untuk setiap pencarian. Google perlu menemukan dan memproses halaman; kemunculan serta posisinya bergantung pada banyak faktor. Tulis konten yang menjawab kebutuhan calon pelanggan dan perbarui informasi saat layanan berubah.</p>
        </section>
        <section id="biaya"><h2>6. Hitung biaya pembuatan dan pemeliharaan</h2>
          <p>Pisahkan biaya awal dari biaya berulang. Biaya awal dapat mencakup desain, pengembangan, penulisan, dan pengisian konten. Biaya berulang dapat mencakup domain, hosting, lisensi, cadangan data, serta pemeliharaan. Kebutuhan integrasi atau perubahan fitur dibahas terpisah.</p>
          <p>Minta penawaran dengan jumlah halaman, fitur, hasil kerja, batas revisi, jadwal, akses yang diserahkan, dan dukungan setelah peluncuran. Bandingkan ruang lingkupnya agar harga yang terlihat murah tidak menyembunyikan kebutuhan yang belum dihitung.</p>
          <p>Untuk melihat penawaran Wasla, buka <Link href="/paket-website">paket dan harga website</Link>. Anda juga bisa meninjau <Link href="/portofolio">project yang telah dikerjakan</Link> sebelum berdiskusi.</p>
        </section>
        <section><h2>Butuh bantuan buat website di Jabodetabek?</h2>
          <p>Wasla Informatika menerima kebutuhan pembuatan website dari Jakarta, Bogor, Depok, Tangerang, dan Bekasi. Sampaikan jenis usaha, tujuan situs, materi yang sudah tersedia, serta perkiraan anggaran. Kita bahas pilihan solusi dan ruang lingkupnya sebelum pekerjaan dimulai.</p>
          <p>Pelajari <Link href="/layanan/website-development">jasa pembuatan website Jabodetabek</Link> atau <Link href="/kontak?layanan=Website%20Development">pilih kontak untuk konsultasi website</Link>.</p>
        </section>
      </div>
    </article>
    <CTA title="Sudah punya gambaran website Anda?"/>
  </>
}
