# Validasi pembaruan project nyata — 23 Oktober 2026

## Hasil lokal

Build produksi Next.js 16.4.2 dengan Node.js 24.21.0 dan pemeriksaan TypeScript berhasil. ESLint berhasil. Empat tes unit dan enam tes browser berhasil pada build akhir, termasuk kontrol akses CMS, draft/publish, upload media, metadata, semua rute publik, filter project, FAQ, keyboard/menu, parallax dan reduced motion, serta persistensi formulir privat.

Tes tambahan memeriksa ketujuh tujuan website asli, halaman detail internal dan empat tujuan WhatsApp yang diberikan pemilik. Setiap pilihan penerima formulir menghasilkan ringkasan ber-URL-encoding dengan nomor/nama yang tepat; tujuan dicatat bersama pesan privat di CMS. Pengujian tidak membuka WhatsApp atau mengirim pesan eksternal. Konsep lama tidak muncul pada API publik.

Capture akhir meliputi sembilan rute pada lebar 1440, 1024, 768 dan 390 px. Font dan gambar ditunggu selesai, header dikembalikan ke keadaan atas. Tidak ditemukan overflow horizontal, gambar rusak atau page error dalam 36 kombinasi rute/ukuran. Bukti berada di `.impeccable/review/browser-readings.json` dan screenshot pada folder yang sama.

Pemeriksaan visual kedua mengonfirmasi logo warna pada perangkat, objek layanan tanpa panel kotak, logo teknologi, empat kartu kontak melengkung, label Project/Artikel dan wordmark besar pada footer. Tombol kontak mengambang disembunyikan pada halaman dengan direktori kontak agar tidak menutupi kartu. Detector hanya dijalankan sekali untuk pembaruan ini; 91 temuan bersifat advisory, terutama token baru yang belum tercatat pada kanon desain sebelumnya. Ini bukan skor aksesibilitas otomatis atau klaim Lighthouse.

## Penyimpanan

Adapter Vercel Blob dan migrasi `20261023_022943_vercel_media_storage` ditambahkan. Migrasi berhasil diterapkan pada PostgreSQL lokal. Lokal tetap memakai folder media; runtime Vercel memakai Blob apabila token tersedia. Validasi signature upload dipertahankan, dengan batas server 4 MB di Vercel. Integrasi Blob produksi belum diuji end-to-end sebelum database produksi tersedia.

## Status rilis saat catatan dibuat

Akun CLI telah diverifikasi sebagai `jaelanisuryasaputra10@gmail.com`, scope `jae-f2e1`. Setelah pemilik membuat deployment manual, checkout diarahkan ke project `waslainformatika` (`prj_y57AtYGyBMYsK9a8b7auDps05t54`), domain terdaftar `waslainformatika.vercel.app`. Project awal `wasla-informatika` tidak dihapus.

Deployment GitHub manual mengambil commit lama `792f4e5` dan gagal karena `PAYLOAD_SECRET` tidak tersedia. Secret produksi baru telah dibuat secara privat dan ditambahkan ke project yang benar; URL situs, TRUST_PROXY dan koneksi Blob juga disiapkan. Rilis terbaru melalui CLI dipentaskan tanpa memindahkan domain produksi.

Deployment terbaru `dpl_31hVHF5dfRAUT9nBw296paXcabFN` selesai dengan status READY di `https://waslainformatika-9hmknyecx-jae-f2e1.vercel.app` (pentahapan, belum promosi domain kanonis). Pemeriksaan HTTP berautentikasi Vercel mengembalikan 200 untuk aset statis `/images/technology/php.svg` dan 500 untuk `/`. Log runtime mengonfirmasi `cannot connect to Postgres`, `ECONNREFUSED 127.0.0.1:5432`; environment produksi memang belum mempunyai `DATABASE_URL`.

Vercel mengembalikan `integration_terms_acceptance_required` untuk Neon; penerimaan persyaratan harus dilakukan pemilik akun. Build yang berhasil belum membuktikan website/CMS produksi berfungsi. Migrasi, bootstrap admin, pengisian media/konten, pengujian runtime produksi dan promosi domain masih bergantung pada database tersebut. Kredensial lokal tidak digunakan ulang sebagai kredensial produksi. Review visual independen berstatus **ship** pada lingkup perubahan tampilan lokal, bukan verifikasi produksi; lihat [laporan review](visual-review-real-projects.md).
