# Wasla Informatika

Website agency Indonesia dengan Next.js 16, React 19, TypeScript, PostgreSQL, dan **Wasla Studio**, CMS khusus tanpa Payload. Tujuh project nyata, layanan, artikel, galeri, profil tim, dan pengaturan website dikelola melalui `/admin`.

## Menjalankan lokal

Gunakan Node.js 24. Dari folder project:

```sh
npm ci
npm run setup:env
```

Jalankan PostgreSQL di terminal terpisah:

```sh
npm run db:local
```

Atau gunakan PostgreSQL/Docker sendiri dan isi `DATABASE_URL` pada `.env`. Untuk instalasi baru, isi `BOOTSTRAP_ADMIN_EMAIL` dan `BOOTSTRAP_ADMIN_PASSWORD` (minimal 12 karakter), lalu:

```sh
npm run db:migrate
npm run dev
```

Buka http://localhost:3000 dan http://localhost:3000/admin. Pada workspace yang telah disiapkan, akun dan database sudah tersedia; akun lama tetap dapat digunakan. File kredensial di `.local/` tidak masuk Git.

Untuk mode produksi lokal:

```sh
npm run build
npm start
```

`db:migrate` membuat tabel dan menginisialisasi konten hanya jika website belum diinisialisasi. Konten, pengguna, dan pesan yang sudah ada tidak ditimpa. Tidak ada pendaftaran admin publik.

## Wasla Studio

- Ringkasan: tenggat mendatang, pesan baru, jumlah konten sebenarnya, dan project terakhir diperbarui.
- Scheduler: kalender bulanan, agenda tanggal, penanggung jawab, klien, tanggal mulai/tenggat, catatan dan status pekerjaan. Kalender memakai tanggal WIB. Jadwal ini privat dan tidak otomatis mengirim pesan atau pengingat.
- Project, layanan, artikel, FAQ, testimoni: draft, terbit, preview privat, riwayat penyimpanan dan pemulihan sebagai draft.
- Galeri: unggah langsung dari form project atau pilih Media, keterangan dan urutan gambar. Foto profil tim juga dapat diganti dari CMS.
- Tim, navigasi dan pengaturan website: edit konten asli tanpa mengubah kode.
- Paket layanan: enam pilihan website, fotografi dan video editing. Harga, nama, deskripsi, keterangan, satuan, flag harga mulai dari dan layanan tujuan dapat diubah pada Pengaturan website. Pilihan paket masuk ke pesan konsultasi untuk ditinjau pengunjung.
- Pesan konsultasi: hanya staf, dengan status baru/dihubungi/selesai.
- Administrator mengelola pengguna dan penghapusan. Editor mengelola konten/jadwal/pesan tanpa menghapus atau mengubah hak akses.

Gambar divalidasi dan dikonversi menjadi WebP. Batas produksi 4 MB per gambar; lokal 8 MB. Di Vercel gambar baru disimpan di Blob, bukan filesystem sementara. Media yang masih digunakan tidak dapat dihapus.

Mockup project dan galeri memakai model laptop/HP/tablet dengan screenshot CMS sebagai tekstur; bagian keahlian memakai HP 3D beridentitas Wasla. Runtime dimuat saat terlihat dan dilepas setelah keluar layar. Foto tim memakai ukuran gambar responsif. Hasil pengukuran arrival lokal dan batasnya dicatat pada [laporan performa perangkat](docs/device-performance.md).

## Verifikasi

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
# Pada terminal lain:
npm run test:e2e
```

Pengujian browser menggunakan Chrome yang terpasang. Isi akun pengujian lokal pada `.env`; jangan menjalankan tes yang membuat/menghapus fixture dengan akun produksi.

## Produksi

Website: **https://wasla.my.id**. Dashboard: **https://wasla.my.id/admin**. Project Vercel: `waslainformatika`, scope `jae-f2e1`, akun pemilik yang telah diverifikasi. Database Neon dan Vercel Blob tetap digunakan. DNS, HTTPS, canonical dan alur Studio sudah diverifikasi pada domain baru; bukti ada di dokumentasi deployment.

Source tampilan berada di `src/frontend`, logika server di `src/backend`, dan tipe/helper bersama di `src/shared`. Route Next.js tetap di `src/app`. Lihat [struktur source dan pembersihan](docs/source-structure.md), [panduan CMS](docs/wasla-studio.md), [deployment](docs/deployment.md), dan [riset kartu flip](docs/rea-flip-reference.md). Kredensial, token, dump database dan file `.env` tidak boleh dikomit.
