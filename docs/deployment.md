# Deployment dan operasi

## Target
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
