# Struktur source Wasla

Frontend dan backend berada dalam satu aplikasi Next.js. Jalankan satu server website; bukan dua perintah server yang terpisah.

```text
src/
  app/
    (frontend)/           Halaman publik, layout, CSS, metadata
      paket-website/      Pilihan paket dan harga
    (studio)/             Halaman serta layout admin /admin
    api/                  Route HTTP tipis yang memanggil backend
  frontend/
    components/           Antarmuka publik, objek 3D, mockup dan formulir
    studio/               Antarmuka dashboard CMS
    lib/                  SEO, teknologi dan pemilihan visual layanan
  backend/
    api.ts                Handler API CMS dan izin akses
    auth.ts               Login, hash password dan sesi
    contact.ts            Validasi/persistensi pesan konsultasi
    content.ts            Konten, publikasi dan revisi
    content-validation.ts Validasi field CMS
    database.ts           Pool PostgreSQL dan definisi tabel
    cms.ts                Adapter konten untuk render server
    data/                 Baseline publik untuk instalasi baru
  shared/                 Tipe konten, field CMS dan helper publik bersama
scripts/                  Setup, migrasi, start dan pembaruan konten satu kali
tests/                    Tes unit serta alur browser
public/                   Font, logo, foto tim dan aset publik
docs/                     Riset, panduan, desain dan hasil verifikasi
```

`@/frontend/...` memuat tampilan. Modul `@/backend/...` yang mengakses database/secret digunakan di server. Impor tipe backend memakai `import type`, sehingga implementasi autentikasi tidak dimasukkan ke bundle browser. Definisi field dan tipe bersama tidak berisi kredensial.

URL tetap sama. API pesan sekarang dikelompokkan pada `src/app/api/contact`, sementara implementasinya di `src/backend/contact.ts`. Seluruh impor aktif diperbarui setelah pemindahan 35 file. Folder lama `src/components` dan `src/lib` sudah kosong dan dikeluarkan dari struktur aktif.

## Pembersihan

Seed lama yang tidak lagi diimpor (`src/lib/seed-content.ts`) dan script inspeksi sementara pada root (`inspect_more.mjs`) dihapus. Cache hasil build lama `.local/next-before-studio` dipindahkan ke Recycle Bin agar dapat dipulihkan; ini bukan source backend. Cache tipe route lama diarsipkan lalu dibuat ulang oleh Next.js.

File `.env`, kredensial `.local`, database lokal `.local/postgres`, backup source/data dan folder `media` tidak dihapus. Semuanya masih memiliki fungsi. `node_modules`, `.next`, laporan Playwright dan cache TypeScript adalah keluaran yang dapat dibuat ulang; bukan folder source yang perlu diedit.

Paket dapat diubah pada **Admin → Pengaturan website → Paket website**. Baseline yang disetujui: Landing Page Rp5.000.000 tanpa CMS; Web Application Rp8.000.000; Company Profile + CMS Rp10.000.000. Link konsultasi membawa pilihan paket ke formulir untuk ditinjau sebelum dikirim.
