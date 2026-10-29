# Deployment dan operasi Wasla Studio

Target aktif: akun jaelanisuryasaputra10@gmail.com, scope `jae-f2e1`, project `waslainformatika` (`prj_y57AtYGyBMYsK9a8b7auDps05t54`). Project lama `wasla-informatika` bukan target rilis. Website aktif https://wasla.my.id, CMS https://wasla.my.id/admin. DNS dan HTTPS sudah terverifikasi; lihat [bukti domain](domain-wasla-my-id.md). Alamat vercel.app tetap tersedia sebagai alias.

## Persiapan lokal 29 Oktober 2026: galeri dan CMS media

Perubahan galeri, ornamen About, pemutar layar penuh, serta CMS media masih lokal. Sebelum rilis, jalankan `npm run db:video-gallery` dengan koneksi database target yang benar (atau `npm run db:migrate` pada proses penyiapan standar). Impor hanya menambah slug galeri yang belum ada, tanpa menimpa edit, draft, publikasi, akun, atau data lama. Ada 23 entri awal; 18 di antaranya adalah pilihan postingan individual dari empat akun yang diberikan pemilik. Provenance ada di `docs/video-gallery-sources-20261029.json`.

Pastikan Blob `BLOB_READ_WRITE_TOKEN` tersedia saat runtime Vercel. Gambar tetap menggunakan jalur unggahan 4 MB; MP4/WebM sampai 250 MB memakai token unggahan klien terbatas, multipart langsung ke Blob, dan finalisasi server terautentikasi. Route `/api/media/video-upload` dan turunannya harus ikut artifact; `.gitignore` hanya mengecualikan direktori media lokal di root.

Setelah staged deployment, periksa unggahan Blob video nyata dan finalisasi callback, playback/Range, serta alur draft/publish. Tes lokal membuktikan jalur penyimpanan lokal; tes tersebut tidak membuktikan callback Blob di deployment yang belum dirilis. SEPTIHAN/Seventeen tetap bergantung pada izin embedding YouTube karena pemilik tidak memiliki MP4 asli.

## Rilis aktif 27 Oktober 2026: video, tim, bahasa, dan mobile

Deployment `dpl_HkiYV3cfNP2ph3bXsdKcduMM41Ye` (https://waslainformatika-7xilrzwzn-jae-f2e1.vercel.app) sudah READY dan dipromosikan ke https://wasla.my.id. Intro landscape pada kunjungan/refresh, reel portrait dengan musik asli, tiga profil/foto LinkedIn tambahan, rotasi sentuh serta scroll 3D mobile, dan terjemahan publik Inggris terpasang. Data anggota baru ditambahkan secara idempoten; empat nomor WhatsApp lama dan data lain dipertahankan. Tidak ada nomor baru yang dikarang.

Build Vercel 60 detik. Lima tes browser staging dan lima tes domain publik lulus, termasuk audio/refresh/replay, ID/EN dan query formulir, foto, sentuhan serta reduced motion/error. Audit 32 halaman Inggris dan canonical lulus; sitemap memiliki 64 URL beralternatif bahasa. Kedua MP4 publik cocok hash dan mendukung Range 206. [Catatan fitur, MCP, dan release gate](website-films-team-mobile-20261027.md).

## Riwayat 26 Oktober 2026: rate card referensi pemilik

Deployment `dpl_CStkm6LKKH29oLKLpwaNMMWKuye9` (https://waslainformatika-1qa8himqp-jae-f2e1.vercel.app) sudah dipromosikan ke https://wasla.my.id. Kartu harga putih, tab kategori, checklist CMS, rincian native, dan alur konsultasi terpasang pada beranda serta halaman paket. Build 56 detik; 7 tes staging dan 8 tes produksi baca-saja lolos. Harga produksi tidak diubah. [Temuan REA dan delivery gate](rea-pricing-reference-20261026.md).

## Riwayat 26 Oktober 2026: SEO Jabodetabek dan favicon

Deployment `dpl_9StWpa5bh2pMCxHKCp4vpPkGDjg6` (https://waslainformatika-5h5rtpdtp-jae-f2e1.vercel.app) sudah READY dan dipromosikan ke https://wasla.my.id. Judul/deskripsi, konten layanan website dan IT consultant, panduan `/cara-membuat-website`, data terstruktur, tautan internal, favicon ICO, dan ikon Apple telah dirilis. Sitemap mencatat 32 URL serta tanggal revisi source untuk empat halaman yang diperbarui. Build Vercel selesai dalam 51 detik; tiga tes SEO browser pada domain aktif lolos setelah promosi.

Search Console menerima permintaan pengindeksan beranda, kedua layanan, dan panduan. `/sitemap.xml` berhasil dikirim; laporan sitemap masih menampilkan kegagalan pengambilan awal, sementara tes live Alat Inspeksi Google menunjukkan crawl diizinkan dan pengambilan berhasil. Hal ini belum membuktikan sitemap selesai diproses atau halaman sudah terindeks. Detail dan delivery gate ada di [catatan SEO](seo-jabodetabek.md).

## Riwayat 25 Oktober 2026, malam

Deployment `dpl_CJVQh6p3MVgQPzKM4TLevBvzoqYW` (https://waslainformatika-c7v8joxj0-jae-f2e1.vercel.app) sudah dipromosikan ke https://wasla.my.id dan berstatus READY. Paket memakai dua kelompok kartu bersih yang dapat dibalik, tanpa lapisan belakang seperti folder. Tiga nama lengkap dan LinkedIn tersimpan di CMS. Renderer 3D dibagi, kanvas dipertahankan saat scroll, sumber tekstur dingin menunggu gambar teroptimasi, dan galeri pulih setelah kegagalan gambar.

Formulir kontak kini memakai pool database utama yang menormalkan TLS ke `verify-full`. Alur produksi publik, admin, Blob, scheduler dan kontak lulus kembali. Query error pada jendela deployment terbaru tidak mengembalikan record; ini bukan klaim menghapus seluruh log historis. Bukti terbaru ada di [verifikasi produksi](production-verification.md), [laporan delivery gate](quality-gate-clean-cards-20261025.md), [performa scroll](scroll-performance-20261025.md) dan [log](runtime-logs-20261025.md).

## Riwayat 25 Oktober 2026, pagi

Deployment `dpl_5yZHwfwQdAtuk5i8DGiXGfSYvt4s` (https://waslainformatika-6wshy0zpq-jae-f2e1.vercel.app), build 39 detik, dipromosikan ke https://wasla.my.id setelah verifikasi staged dan review framing. Domain utama kemudian lulus pengujian perangkat/layanan dan alur Studio. Rilis ini menghapus bidang abu-abu perangkat, menstabilkan kemunculan project, menambahkan tiga paket kreatif CMS, memakai enam kartu navy tanpa bidang navy luar, serta menempatkan signature wasla informatika sejajar. Mode TLS database sekarang dibuat eksplisit `verify-full` tanpa mematikan pemeriksaan sertifikat. Lihat [verifikasi produksi](production-verification.md) dan [catatan log](runtime-logs-20261025.md).

## Riwayat custom CMS 23 Oktober 2026

Deployment historis `dpl_7pH59fqvSkobj1h4sN7kTJssrZwT`: https://waslainformatika-cu98ktauc-jae-f2e1.vercel.app. Build berhasil dalam 54 detik; canonical domain baru diperiksa sebelum promosi. Rilis ini dahulu dipromosikan dan diuji pada https://wasla.my.id. Seluruh dependensi dan UI Payload diganti Wasla Studio. Rilis Studio awal `dpl_H6DSFHPgaHYd5Eq8cwqxUKek7qWH` juga lulus verifikasi.

Rilis sebelumnya `dpl_2KvdJMGDipWxCqczTtHVoSyzsHio` memakai Payload dan menjadi riwayat pemulihan. Saat migrasi, snapshot privat dibuat untuk semua koleksi/global, hash akun disalin, dan tabel `studio_*` baru dibuat. ID media/project tetap. Tabel lama tidak dihapus. Pemeriksaan cutover mengambil lagi data lama sebelum promosi dan hanya mengaplikasikan record yang lebih baru; data baru Studio tidak ditimpa.

## Konfigurasi

- Node.js 24; Next.js standalone, build `npm run build` memakai Webpack.
- `DATABASE_URL`: pooled Neon untuk runtime. `DATABASE_URL_UNPOOLED`: koneksi langsung untuk migrasi/operasi administratif.
- `STUDIO_SECRET`: rahasia acak untuk HMAC pembatas formulir. Lingkungan produksi lama tetap dapat memakai `PAYLOAD_SECRET` sebagai fallback nama variabel; tidak ada runtime CMS Payload. Session Studio berupa token acak yang di-hash, bukan JWT Payload.
- `NEXT_PUBLIC_SITE_URL`: alamat HTTPS kanonis. Nilai aktif https://wasla.my.id sudah diterapkan pada deployment; canonical, sitemap dan robots telah diperiksa.
- `BLOB_READ_WRITE_TOKEN`: hanya server. Unggahan baru menggunakan SDK `@vercel/blob`; decoder gambar memvalidasi dan menormalisasi WebP. Batas 4 MB di Vercel. File lama tetap dapat diunduh dari `/api/media/file/...`.
- `TRUST_PROXY=true` pada Vercel. Jangan menyalin kredensial admin lokal ke produksi.

Database Neon `wasla-postgres` Free dan Blob `wasla-media` dipertahankan. Tidak ada seed pada build/startup. `npm run db:migrate` menyiapkan tabel Studio secara idempoten dan menginisialisasi baseline publik hanya pada instalasi baru. Akun pertama memerlukan email/password bootstrap di environment yang diabaikan Git. Instalasi aktif mempertahankan akun lama.

## Rilis melalui CLI

Konfigurasi login akun tujuan disimpan secara terisolasi pada `.local/vercel-account-10`. Periksa project/scope sebelum mutasi. Contoh:

```sh
vercel deploy --prod --skip-domain --yes --archive=tgz --scope jae-f2e1 --global-config .local/vercel-account-10
# Setelah staged runtime dan visual review berhasil:
vercel promote DEPLOYMENT_URL --yes --scope jae-f2e1 --global-config .local/vercel-account-10
```

Periksa halaman, login akun pemilik, draft/publish, upload/download Blob, privasi pesan/jadwal, scheduler, formulir dan mobile. Fixture pemeriksaan dibersihkan berdasarkan ID atau pencocokan email persis; jangan menghapus semua hasil query yang filternya tidak didukung.

Source dirilis dari checkout lokal melalui CLI. Tidak ada push GitHub baru yang diklaim. Sebelum mengandalkan autodeploy Git, sinkronkan perubahan source yang telah ditinjau. `.local`, `.env*`, `.vercel`, file media lokal dan hasil tes diabaikan dari unggahan deploy.

## Pemulihan dan lokal

Kredensial produksi berada pada `.local/production-admin-credentials.txt`; jangan menyalinnya ke dokumentasi publik. Backup/migrasi privat berada di `.local/`. Login lama berlaku; cookie sesi Payload tidak dipakai oleh Studio sehingga staf perlu masuk kembali sekali.

Pemulihan deployment lama tetap mungkin karena tabel Payload tidak dihapus. Konten yang dibuat setelah pindah ke Studio tidak otomatis tersalin kembali ke tabel lama; backup dan rencanakan sinkronisasi sebelum memilih rollback. Jangan menjalankan seed lama terhadap database aktif.

Pada Windows, hentikan `npm start` sebelum build karena DLL Sharp dapat terkunci. Setelah `npm run build` berhasil, `npm start` menyalin public/static ke standalone dan memulai server. Jalankan tes browser setelah server siap menerima HTTP.
