# Deployment dan operasi Wasla Studio

Target aktif: akun jaelanisuryasaputra10@gmail.com, scope `jae-f2e1`, project `waslainformatika` (`prj_y57AtYGyBMYsK9a8b7auDps05t54`). Project lama `wasla-informatika` bukan target rilis. Website aktif https://wasla.my.id, CMS https://wasla.my.id/admin. DNS dan HTTPS sudah terverifikasi; lihat [bukti domain](domain-wasla-my-id.md). Alamat vercel.app tetap tersedia sebagai alias.

## Rilis custom CMS 23 Oktober 2026

Deployment aktif `dpl_7pH59fqvSkobj1h4sN7kTJssrZwT`: https://waslainformatika-cu98ktauc-jae-f2e1.vercel.app. Build berhasil dalam 54 detik; canonical domain baru diperiksa sebelum promosi. Rilis sudah dipromosikan dan diuji pada https://wasla.my.id. Seluruh dependensi dan UI Payload diganti Wasla Studio. Rilis Studio awal `dpl_H6DSFHPgaHYd5Eq8cwqxUKek7qWH` juga lulus verifikasi; rilis aktif hanya mengganti environment canonical. Bukti rinci dicatat pada [production-verification.md](production-verification.md).

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
