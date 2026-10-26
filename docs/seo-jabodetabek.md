# SEO Wasla: website dan IT consultant Jabodetabek

Perubahan 26 Oktober 2026 menargetkan kebutuhan pencarian yang berbeda melalui halaman yang sesuai:

| Halaman | Fokus |
| --- | --- |
| `/` | Jasa pembuatan website Jabodetabek dan IT consultant |
| `/layanan/website-development` | Jasa pembuatan website, buat website bisnis, landing page, company profile |
| `/layanan/it-consultation` | Jasa IT consultant dan konsultasi teknologi bisnis |
| `/cara-membuat-website` | Cara membuat website, cara buat website, persiapan situs bisnis |

Jakarta, Bogor, Depok, Tangerang, dan Bekasi disebut sebagai cakupan layanan. Tidak ada alamat kantor, cabang, ulasan, atau jaminan peringkat yang dibuat-buat. Tidak dibuat halaman kota duplikat. Panduan memberi bantuan konkret untuk memilih jenis situs, platform, kepemilikan domain, konten, pengujian, dan anggaran.

## Implementasi

- Judul dan deskripsi beranda serta fallback layanan terarah ada di `src/frontend/lib/seo.ts`. Field SEO layanan di Studio tetap dapat mengesampingkan fallback. Judul hero beranda dan konten layanan utama tetap berasal dari Studio.
- Penjelasan cakupan layanan, kebutuhan project, dan tautan paket/portofolio/panduan dirender di server. Panduan baru dikelola di source `src/app/(frontend)/cara-membuat-website/page.tsx`; artikel Studio tetap tersedia di `/insights`.
- Canonical tetap mengarah ke alamat dari `NEXT_PUBLIC_SITE_URL`; fallback tanpa konfigurasi adalah `https://wasla.my.id`. Metadata Open Graph dan Twitter menggunakan judul, deskripsi, serta gambar yang sesuai.
- JSON-LD berisi Organization, WebSite, Service, TechArticle, dan BreadcrumbList. Identitas penyedia memakai ID yang sama. Teks JSON di-escape sebelum dimasukkan ke HTML. Tidak ada rating atau kantor lokal yang direkayasa.
- Sitemap mencakup panduan dan konten CMS publik. Tanggal modifikasi beranda, panduan, dan dua layanan memperhitungkan revisi source 26 Oktober 2026, bukan hanya tanggal CMS yang lebih lama. Tanggal tidak dibuat ulang pada setiap request. Robots mengizinkan konten publik serta tetap mengecualikan admin/API/preview.
- `/favicon.ico` memuat ukuran 16, 32, 48, dan 128 piksel dari `public/images/brand/favicon-navy.png`. `/apple-touch-icon.png` berukuran 180 piksel dari emblem navy yang sudah ada. Tidak ada logo baru yang diciptakan. Kedua URL stabil dan terhubung dari metadata.
- Berkas verifikasi Google `public/google344ce5cab166309d.html` dipertahankan. Meta verifikasi yang keliru memakai nama berkas sebagai token dihapus; metode file HTML tidak membutuhkan meta tersebut.
- Tipe `Project.clientLogo` dilengkapi untuk komponen proof yang sudah memakai field tersebut, agar pemeriksaan TypeScript dan build dapat selesai.

## Hasil rilis dan Google Search Console

Deployment akhir `dpl_9StWpa5bh2pMCxHKCp4vpPkGDjg6` sudah dipromosikan ke `https://wasla.my.id`. Vercel menyelesaikan build dalam 51 detik. Pengujian XML deployment akhir mengembalikan HTTP 200, 32 URL, dan empat tanggal revisi SEO `2026-10-26`.

Pada properti URL-prefix `https://wasla.my.id/`, ditemukan sitemap lama `/site.map` dengan status gagal diambil. Sitemap yang benar `/sitemap.xml` dikirim satu kali dan UI menampilkan **Peta Situs berhasil dikirimkan**. Laporan pengambilannya masih menampilkan **Tidak dapat mengambil peta situs**. Sesuai [panduan diagnosis Google](https://support.google.com/webmasters/answer/7451001), sitemap kemudian diperiksa dengan tes URL live. Pada 26 Oktober 2026 pukul 15.10 WIB, Alat Inspeksi Google melaporkan **Crawl diizinkan: Ya**, **Pengambilan halaman: Berhasil**, dan **Pengindeksan diizinkan: Ya**. Jangan menyamakan tes pengambilan yang berhasil dengan keberhasilan pemrosesan sitemap dalam laporan.

Empat permintaan pengindeksan berikut diterima dengan pesan **URL telah ditambahkan ke antrean crawl prioritas**:

- `https://wasla.my.id/`
- `https://wasla.my.id/layanan/website-development`
- `https://wasla.my.id/layanan/it-consultation`
- `https://wasla.my.id/cara-membuat-website`

Penerimaan permintaan belum berarti halaman sudah diindeks atau mendapat peringkat untuk keyword tertentu. Pada pemeriksaan awal, panduan dan dua layanan belum dikenali di indeks Google. Bukti lokal privat tersedia di `.local/seo-review/index-request-{home,guide,website,it-consultant}.png`, `sitemap-google-status.png`, dan `sitemap-google-live-success.png`. Satu percobaan awal panduan gagal karena layanan reCAPTCHA tidak terhubung; pengajuan melalui sesi Search Console yang sudah aktif kemudian berhasil. Tidak ada tantangan CAPTCHA yang diselesaikan oleh agen.

## Verifikasi dan delivery gate

Lingkup gate: perubahan SEO, halaman panduan, dua halaman layanan, navigasi baru, dan favicon. Ini bukan audit ulang seluruh Studio. Tampilan meneruskan arah navy/white dan Poppins di `DESIGN.md`, dengan ENERGY 2 / RHYTHM 2 / MOTION 1 untuk konten tambahan. Tidak ada font, warna, dekorasi, atau animasi baru pada halaman konten. Logo berasal dari aset Wasla yang sudah ada.

- **Build dan tipe PASS:** build lokal berhasil; build final Vercel berhasil termasuk pemeriksaan TypeScript. `npm run typecheck` juga selesai tanpa error.
- **Lint PASS:** `npm run lint` menghasilkan 0 error. Enam warning lama pada `src/frontend/studio/workspace.tsx` mengenai navigasi dan tag gambar tetap tercatat di luar lingkup perubahan.
- **Unit PASS:** `npm test`, 7/7 tes lolos.
- **Browser PASS:** `TEST_BASE_URL=https://wasla.my.id npx playwright test tests/browser/seo.spec.ts`, 3/3 tes lolos pada deployment akhir, 19,3 detik. Versi awal juga diuji pada staging sebelum promosi.
- **Hard Gate PASS (perubahan yang dikirim):** empat halaman mengirim metadata dan JSON-LD tanpa JavaScript; panduan tidak overflow pada 390 dan 1440 piksel; semua tautan/action baru menggunakan tujuan yang tersedia; CTA mempertahankan pilihan layanan ke formulir; browser tidak mencatat page error pada alur tersebut. Tidak ditambahkan angka performa, testimoni, kantor lokal, harga, atau jaminan hasil yang dibuat-buat.
- **Purpose Gate PASS:** ikon merek diperlukan untuk identitas browser; aset lama dikonversi, bukan diganti simbol baru. Typography, layout, dan wave meneruskan komponen situs yang sudah digunakan. Tidak ada ornamen atau motion baru untuk mengisi ruang.
- **Liveliness PASS:** judul menjadi fokus halaman, heading dan whitespace memisahkan langkah panduan, serta identitas navy/white dan Poppins tetap konsisten. Layout desktop dan mobile diperiksa melalui screenshot di `.local/seo-review/guide-{390,1440}.png`.
- **Craftsmanship PASS:** konten menjawab pilihan dan persiapan website; panduan memakai HTML semantik, daftar isi bertaut ke enam bagian nyata, serta tautan ke layanan/paket/portofolio. Penyedia dan cakupan pada schema sesuai konten terlihat; JSON di-escape sebelum disisipkan ke HTML. Favicon ICO empat ukuran, PNG 128, Apple PNG 180, robots, sitemap, dan gambar Open Graph mengembalikan HTTP 200 dengan MIME yang sesuai.

## Pemantauan berikutnya

Gunakan properti Google Search Console untuk `https://wasla.my.id/` atau domain `wasla.my.id` pada akun pemilik. Keberadaan berkas verifikasi saja bukan bukti properti sudah terverifikasi atau halaman sudah terindeks.

1. Pantau hasil pemrosesan `https://wasla.my.id/sitemap.xml` yang sudah dikirim. Jika kegagalan pengambilan tetap ada setelah beberapa jam, periksa detail laporan dan tes live sebelum mengirim ulang. Google dapat mencoba lagi otomatis; jangan menghapus/mengirim ulang berulang kali.
2. Pantau hasil indeks beranda, dua layanan utama, dan panduan yang sudah diajukan. Jangan mengirim permintaan berulang untuk menaikkan prioritas.
3. Pantau Page indexing dan Performance: query, halaman, impresi, klik, serta posisi. Evaluasi perubahan setelah data cukup tersedia.
4. Pertahankan informasi layanan, kontak, portofolio, dan panduan sesuai kenyataan. Profil bisnis Google hanya dibuat untuk usaha yang memenuhi persyaratan, dengan identitas dan alamat/area layanan sebenarnya.

Penerapan SEO dan sitemap tidak menjamin Google mengindeks halaman, menampilkan favicon, atau memberi peringkat tertentu. Pengiriman dan status indeks hanya boleh dilaporkan setelah benar-benar diperiksa di Search Console.

Referensi: [Google Search Essentials](https://developers.google.com/search/docs/essentials), [panduan SEO Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [favicon di hasil pencarian](https://developers.google.com/search/docs/appearance/favicon-in-search/).
