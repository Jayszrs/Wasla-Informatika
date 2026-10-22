# Wasla Informatika

Website agency Indonesia dengan Next.js App Router, TypeScript, Tailwind CSS, Payload CMS 3 dan PostgreSQL. Seluruh halaman mengambil konten dari CMS; karya awal ditandai **konsep eksplorasi**, bukan proyek klien.

## Menjalankan secara lokal

Gunakan Node.js 24 LTS (versi pengujian 24.21.0) dan npm. `.node-version` dan `.nvmrc` disediakan. Dari folder proyek:

```sh
npm ci
npm run setup:env
```

Pilih satu PostgreSQL lokal:

```sh
# Docker (opsi utama)
docker compose --env-file .env up -d

# Atau PostgreSQL native lokal tanpa Docker; biarkan terminal ini berjalan
npm run db:local
```

Isi `BOOTSTRAP_ADMIN_EMAIL` dan `BOOTSTRAP_ADMIN_PASSWORD` di `.env` dengan akun Anda (kata sandi minimal 16 karakter), lalu:

```sh
npm run db:migrate
npm run seed
npm run seed:media
npm run dev
```

Website: http://localhost:3000 · CMS: http://localhost:3000/admin

Untuk **pengujian lokal saja**, `node scripts/setup-local-admin.mjs` menghasilkan akun lokal acak. Kredensial tersimpan di `.local/admin-credentials.txt`, tidak masuk Git. Jangan pakai akun ini di produksi. Pada lingkungan yang disiapkan dalam sesi pengerjaan, PostgreSQL, migrasi, seed, dan akun lokal sudah dibuat.

`seed` dapat diulang: konten yang sudah ada tidak ditimpa. Tidak ada pendaftaran administrator publik, termasuk jalur first-register. Pemilik membuat admin pertama melalui seed lokal; admin dapat membuat editor di CMS.

## Konten dan alur CMS

- **Layanan**: sepuluh layanan awal, rich text, kategori, gambar untuk susunan bergantian, ilustrasi, hasil kerja, SEO, urutan, draft/publish.
- **Portofolio**: tantangan/solusi, teknologi, galeri, thumbnail, konsep/real, unggulan, SEO, draft/publish.
- **Insights**: artikel, kategori, tag, penulis opsional dari tim, gambar, tanggal, SEO, draft/publish.
- **Tim, FAQ, Testimoni**: foto/informasi asli; testimoni tampil hanya jika disetujui dan dipublikasikan.
- **Pengaturan Website**: judul/copy dan gambar hero, gambar area keahlian (juga dipakai di Tentang), pernyataan merek, logo, favicon, kontak, sosial, footer dan deskripsi SEO.
- **Navigasi**: label, tujuan, urutan dan status aktif.
- **Pesan Konsultasi**: privat; status baru/dihubungi/selesai. API publik tidak dapat membaca atau membuat record langsung.
- Preview draft pada layanan, proyek dan artikel memerlukan sesi admin/editor; URL tidak memberikan akses publik.

Admin mengelola pengguna dan penghapusan. Editor membuat/mengubah konten dan meninjau pesan, tetapi tidak dapat menaikkan role atau menghapus konten. Upload hanya PNG/JPEG/WebP/AVIF maksimal 8 MB, dengan teks alternatif wajib dan pemeriksaan signature.

## Perintah

```sh
npm run typecheck
npm run lint
npm test
npm run test:e2e         # Jalankan server lokal terlebih dahulu
npm run build
npm start
npm run generate:types
npm run generate:importmap
npm run db:create-migration -- nama_perubahan
npm run db:migrate
```

Playwright memakai Chrome lokal di Windows. Atur `CHROME_PATH` untuk executable lain atau sesuaikan konfigurasi di host non-Windows. Fixture CMS dibuat dan dibersihkan oleh tes; jalankan hanya pada database lokal/QA. Tes formulir menghapus pesan dengan identitas fixture `browser@example.invalid`, bukan pesan pengguna.

## Dokumen tiga fase

- [Riset referensi](docs/reference-analysis.md), [ledger REA](docs/evidence/references-two.md).
- [Arah Vodjo terbaru](docs/vodjo-direction.md), [pengukuran dan screenshot REA](docs/evidence/vodjo-exact-2026-10-22.md), [gambar dan panduan penggantian CMS](docs/assets.md).
- [Sistem desain](docs/design-system.md), [spesifikasi UI/UX dan handoff](docs/ui-ux-specification.md).
- [Keputusan library](docs/library-decisions.md), [deployment](docs/deployment.md), [validasi](docs/validation.md).
- [Validasi Vodjo terbaru](docs/vodjo-validation.md), [review visual Vodjo](docs/visual-review-vodjo.md).

Desain terbaru memakai Poppins berlisensi OFL yang disimpan lokal, komposisi navy/putih, hero fotografis, batas bagian bergelombang, serta masthead navy pada halaman dalam. Parallax terbatas pada desktop; mobile dan preferensi pengurangan gerak memakai tampilan statis. Dokumen redesign sebelumnya disimpan sebagai riwayat dan tidak menjadi acuan tampilan terbaru.

## Input pemilik yang masih diperlukan

Logo asli belum tersedia. Website menggunakan wordmark teks dengan persetujuan pengguna. Finalisasi SVG putih/navy/favikon dilakukan setelah aset asli diterima; tidak ada simbol pengganti yang diklaim sebagai logo. Masukkan nomor WhatsApp, email, alamat, proyek, foto tim dan testimoni asli melalui CMS. Kanal yang kosong tidak ditampilkan. Publikasi hosting dan konfigurasi penyedia email/object storage memerlukan kredensial pemilik.
