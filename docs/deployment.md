# Deployment dan operasi

## Vercel — target aktif 23 Oktober 2026

Akun: `jaelanisuryasaputra10@gmail.com`; scope: `jae-f2e1`; project manual pemilik: `waslainformatika`, ID `prj_y57AtYGyBMYsK9a8b7auDps05t54`; domain: `https://waslainformatika.vercel.app`. Checkout lokal sudah terhubung ke project tersebut. Project awal `wasla-informatika` bukan tujuan rilis aktif. Gunakan konfigurasi CLI terisolasi `.local/vercel-account-10` dan selalu periksa project sebelum mutasi.

Build command project telah disetel ke `npm run build` agar menggunakan Webpack seperti build yang diuji. Runtime Node 24.x. `PAYLOAD_SECRET` produksi baru, `NEXT_PUBLIC_SITE_URL`, `TRUST_PROXY` dan koneksi Blob telah ditambahkan. Jangan menyalin kredensial admin lokal ke produksi. Rahasia bootstrap produksi disimpan privat di `.local/`, diabaikan Git dan `.vercelignore`.

Blob store `wasla-media` di `sin1` menyediakan media persisten melalui `@payloadcms/storage-vercel-blob`. Token hanya di server. Upload maksimum 4 MB di Vercel; pemeriksaan signature server dipertahankan. Penyimpanan lokal tetap memakai `media/` untuk pengembangan. Untuk proses bootstrap yang dijalankan di komputer, aktifkan `USE_VERCEL_BLOB=true` dan gunakan env produksi yang ditarik ke file di `.local/`, bukan menimpa `.env` lokal.

Database Neon belum terpasang pada pemeriksaan terakhir. Pemilik perlu membuat database Free melalui dashboard Storage project, atau menerima persyaratan Marketplace Neon sebelum CLI dapat memasangnya. Setelah koneksi `DATABASE_URL` tersedia: jalankan seluruh migrasi terdaftar, bootstrap admin dengan kredensial produksi baru, lalu `seed`, `seed:media`, `seed:real` satu kali. Jangan menaruh seed pada startup atau build rutin. `seed:real` menerapkan pilihan konten pemilik dan dapat menimpa pilihan field pada record terkait jika dijalankan lagi.

Rilis source terbaru dipentaskan menggunakan `vercel deploy --prod --skip-domain`. Sebelum `vercel promote`, verifikasi halaman publik, tujuh project, login CMS, perubahan konten, upload Blob, private submissions dan ringkasan WhatsApp. Build berstatus Ready saja belum membuktikan database atau CMS berjalan. Deployment manual pertama dari commit GitHub lama gagal karena `PAYLOAD_SECRET` kosong; konfigurasi itu sudah diperbaiki. Perubahan terbaru saat ini berada pada checkout lokal/unggahan CLI, belum diklaim telah disinkronkan ke branch GitHub.

## Target

Pada Windows, hentikan proses `npm start` sebelum menjalankan build baru. Server standalone memuat DLL Sharp/libvips dari direktori output; build tidak dapat menggantinya selama proses lama masih berjalan. Setelah build berhasil, jalankan kembali `npm start`.
Node.js 24 LTS dengan Next.js standalone atau host Node yang mendukung Payload. PostgreSQL 18 melalui koneksi jaringan privat/TLS sesuai penyedia. Media di object storage S3-compatible atau volume persisten yang dibackup. Sites/Cloudflare static hosting tidak dipakai karena brief menetapkan aplikasi Next.js/Payload/PostgreSQL di repositori lokal ini. Belum ada deployment publik yang diklaim.

## Rahasia dan konfigurasi
`DATABASE_URL` (role aplikasi dengan akses hanya database Wasla), `PAYLOAD_SECRET` acak minimal 32 byte, `NEXT_PUBLIC_SITE_URL` URL HTTPS kanonis. Jangan gunakan secret build contoh atau akun bootstrap lokal. Rahasia SMTP/S3 disimpan pada secret manager host, bukan Git, client bundle atau argumen shell.

S3: `S3_BUCKET`, `S3_REGION`, `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, dan `S3_PUBLIC_URL`. Aktifkan semuanya bersama. Akses key terbatas pada bucket/prefix Wasla; public URL hanya untuk aset yang memang akan dipublikasikan. Sertakan domain gambar pada konfigurasi runtime/build. Jika S3 tidak aktif, mount `/app/media` sebagai volume persisten dan tetapkan `MEDIA_DIR=/app/media`; filesystem ephemeral tidak memadai. Helper lokal menormalkan MEDIA_DIR ke folder proyek sebelum server standalone mengubah working directory, sehingga upload dev dan produksi lokal menggunakan lokasi yang sama.

SMTP opsional: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_NOTIFY_EMAIL`. Tanpa SMTP pengiriman email dinonaktifkan, termasuk reset password; gunakan pemulihan administratif melalui lingkungan server. Notifikasi konsultasi hanya menyebut adanya pesan baru, bukan email/isi pribadi. Uji pengiriman pada penyedia pemilik sebelum produksi.

## Rilis
1. Cadangkan database/media dan uji pemulihan.
2. `npm ci`; `npm run generate:types`; `npm run generate:importmap`; `npm run typecheck`; tes relevan; `npm run build`.
3. Dengan kredensial rilis, jalankan `npm run db:migrate` satu kali dari checkout/image migrator yang memiliki source, config, dan dependensi. Container standalone runtime hanya melayani aplikasi; migrasi bukan dijalankan otomatis tiap replica.
4. Pada instalasi baru, isi bootstrap admin milik pemilik dan jalankan `npm run seed`. Hapus variabel bootstrap dari runtime setelah akun dibuat.
5. `npm start` atau build Dockerfile dan jalankan container dengan env/volume yang sesuai. Reverse proxy meneruskan HTTPS; cookies produksi memakai secure dan SameSite Lax. Bind runtime ke jaringan privat di belakang proxy.
6. Uji login, edit/publish/preview, upload, formulir, database persistence, sitemap dan image optimization di staging.

`npm start` menyalin aset publik/static ke build standalone dan menjalankan server hasil build. Untuk Docker, berikan URL publik pada waktu build juga, karena domain image optimization dan variabel NEXT_PUBLIC dibekukan oleh Next saat build:

```sh
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://example.com --build-arg S3_PUBLIC_URL=https://assets.example.com -t wasla .
```

Domain contoh harus diganti dengan domain milik pemilik; jangan masukkan secret melalui build args. Runtime tetap menerima DATABASE_URL, PAYLOAD_SECRET, dan kredensial penyedia melalui secret manager.

`push:false` berlaku di semua lingkungan. Perubahan schema dibuat dengan `payload migrate:create`, ditinjau dan dikomit. Jangan gunakan db push pada produksi. Rollback: redeploy versi aplikasi yang kompatibel; tinjau down migration dan backup sebelum mengubah data. Jangan menjalankan down otomatis.

## Pembatasan permintaan dan privasi
Formulir memakai counter PostgreSQL dengan UPSERT atomik, 5 percobaan per 15 menit, termasuk input invalid. Default `TRUST_PROXY=false` mengelompokkan permintaan langsung dalam satu bucket sehingga header palsu tidak dapat memecah limit. Di produksi, atur `TRUST_PROXY=true` hanya bila proxy tepercaya menghapus header kiriman klien dan menetapkan X-Forwarded-For sendiri. Tambahkan limit login/API di reverse proxy; Payload membatasi percobaan login per akun. Kunci limit berupa HMAC, bukan IP mentah. Bersihkan record limit kedaluwarsa secara berkala; tetapkan jadwal retensi pesan bersama pemilik sebelum rilis.

Formulir memerlukan Origin sesuai domain kanonis, JSON, batas body 16KiB, honeypot, persetujuan, validasi Zod dan layanan terbit yang valid. Simpan ke database sebelum memberikan sukses. Data kontak tidak dicatat dalam log. Penyedia harus memakai TLS pada koneksi eksternal dan backup terenkripsi sesuai kebutuhan operasional.

## Batas verifikasi
Docker tidak tersedia sebagai executable pada host pengujian ini; native PostgreSQL 18.4 digunakan untuk tes. Build image Docker, endpoint S3 dan SMTP belum diuji pada akun nyata. Tidak ada skor Lighthouse/Core Web Vitals yang diklaim. Audit dependensi dan hasil tes dicatat di docs/validation.md; dependensi upstream dengan advisory terbuka perlu ditinjau sebelum rilis publik.
