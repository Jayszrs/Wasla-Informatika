# Verifikasi produksi — 23 Oktober 2026

Situs publik: **https://waslainformatika.vercel.app**. CMS: **https://waslainformatika.vercel.app/admin**.

## Rilis

- Akun terverifikasi: `jaelanisuryasaputra10@gmail.com`, scope `jae-f2e1`.
- Project: `waslainformatika`, `prj_y57AtYGyBMYsK9a8b7auDps05t54`.
- Deployment: `dpl_HNfWgp5EA2zvQabGogcWLncYE3XM`, target production, status READY, build 57 detik.
- Next.js 16.4.2, Node.js 24.x; source diunggah melalui CLI dari checkout lokal. Tidak ada commit/push GitHub baru yang diklaim.
- Rilis diuji pada URL pentahapan berautentikasi, lalu dipromosikan ke domain publik yang diuji tanpa bypass autentikasi.

## Perbaikan masalah

Build manual pertama gagal karena `PAYLOAD_SECRET` kosong. Setelah secret disediakan, runtime masih gagal mengakses PostgreSQL karena database produksi belum ada. Persetujuan Neon kemudian terbaca, database `wasla-postgres` dibuat dengan paket Free (`free_v3`), dan environment koneksi dihubungkan ke project yang benar.

Empat migrasi berhasil diterapkan: initial, hero image, feature image, dan vercel media storage. Bootstrap membuat admin dengan password acak baru, mengisi konten awal/media, lalu menerapkan tujuh project nyata, empat anggota tim dan visual terbaru. `seed:real` merupakan migrasi konten satu kali, bukan perintah startup harian. Seed kini keluar setelah Payload selesai ditutup.

## Bukti alur lengkap

| Batas alur | Hasil |
| --- | --- |
| Browser ke halaman publik | HTTP 200 untuk `/`, `/portofolio`, `/layanan`, `/kontak`, `/tentang-kami`, `/insights`, `/privasi` |
| API ke project | Tujuh project terbit; tidak ada konsep publik |
| Direktori kontak | Empat anggota sesuai data pemilik |
| Login ke CMS | Login admin berhasil; dashboard menampilkan Project, Media dan Pesan Konsultasi |
| Upload ke penyimpanan | Upload PNG melalui API CMS berhasil; Blob HEAD membuktikan objek persisten tersedia |
| Penyimpanan ke pembacaan | Record Media dibaca kembali dan file berhasil diunduh melalui endpoint CMS |
| Formulir browser ke API | Submit menghasilkan HTTP 201 dan feedback sukses |
| API ke data privat | Pesan tersimpan dengan awalan penerima Amat Suroso dan hanya diperiksa menggunakan admin |
| Data ke WhatsApp | Tombol lanjutan berisi `https://wa.me/6281310154447?text=...`; tidak ada pesan WhatsApp eksternal dikirim saat tes |
| Desktop dan mobile | Lebar 1440/390 diperiksa; tidak ada overflow, gambar rusak atau page error pada capture akhir |

Fixture pesan dan upload verifikasi sementara dibersihkan setelah tes. Tes lokal sebelumnya juga mencakup keempat penerima, akses anonim, roles, draft/publish, validasi dan reduced motion. Pengujian produksi berfokus pada batas hosting/database/storage dan alur publik yang sebenarnya.

Manifest mesin: `.impeccable/review/production-verification.json`. Capture: `production-home-1440.png`, `production-home-390.png`, `production-contact-saved.png`, `production-admin.png` pada folder yang sama. Seluruh gambar ditunggu selesai dan header dikembalikan ke posisi atas pada capture homepage.

## Operasi

Kredensial admin tersimpan privat pada `.local/production-admin-credentials.txt`; tidak dimasukkan ke Git, source deployment atau laporan ini. Media memakai Vercel Blob dan tetap dapat diganti dari CMS. Upload server dibatasi 4 MB di Vercel dan mempertahankan pemeriksaan signature.

Pemindaian log setelah promosi menemukan dua warning driver PostgreSQL yang dicatat Vercel pada level error mengenai arti `sslmode=require` di versi driver mendatang. Pesannya bukan kegagalan koneksi; pemeriksaan HTTP, database dan file di atas berhasil. Tidak ada klaim pemantauan jangka panjang, skor Lighthouse, pengiriman SMTP atau pesan WhatsApp otomatis.
