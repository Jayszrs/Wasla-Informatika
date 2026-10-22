# Validasi implementasi Vodjo — 22 Oktober 2026

Dokumen ini menggantikan validasi visual untuk desain editorial sebelumnya. Arah terbaru mengikuti koreksi pengguna: Vodjo `.com` menjadi rujukan utama komposisi, proporsi, tipografi, navigasi dan ritme bagian; identitas Wasla tetap navy/putih dengan aset serta konten sendiri.

## Riset dan batas bukti

REA MCP digunakan untuk browser publik. [Catatan pengukuran](evidence/vodjo-exact-2026-10-22.md) dan screenshot menyimpan bukti desktop 1440×900, mobile 390×844, menu dan beberapa posisi scroll homepage. Halaman dalam diperiksa pada viewport pertama; About juga diperiksa pada mobile. Data mentah ada pada `evidence/vodjo-exact-2026-10-22.json` dan `evidence/vodjo-internal-2026-10-22.json`.

Ukuran adalah perkiraan screenshot, bukan hasil pengambilan CSS privat. Timing hover/parallax referensi tidak diukur. Parallax Wasla merupakan implementasi tambahan sesuai permintaan pengguna. Tidak ada ekstraksi atau penyalinan source, foto, logo klien, testimoni maupun data kontak Vodjo.

Context7 tidak muncul dalam inventaris tool, termasuk pemeriksaan ulang sesi ini. Integrasi menggunakan dokumentasi resmi dan panduan Next yang tersedia di paket terpasang; lihat [keputusan library](library-decisions.md). Tool 21st UI tidak tersedia; komponen dibuat khusus. Pengguna memilih spesifikasi → kode → tinjauan browser, sehingga tidak ada file Figma yang diklaim sebagai hasil.

## Hasil implementasi

- Hero fotografis setinggi viewport, teks kiri, objek gambar kanan, navigasi datar dan header putih setelah scroll.
- Poppins lokal berlisensi OFL; tombol outline berbentuk kapsul; grid karya dua kolom rapat; tiga layanan pada bidang navy; batas bagian bergelombang; perangkat dan teks keahlian berdampingan; konsultasi abu muda; footer terpusat.
- Halaman dalam memakai masthead navy, judul terpusat dan gelombang berlapis. Tentang menempatkan gambar di kiri, layanan memakai gambar/teks bergantian, kontak memakai field satu kolom.
- Empat proyek contoh jelas berstatus konsep. Enam aset orisinal disimpan lokal dan diimpor ke Media. Tidak ada profil orang, testimoni, metrik atau klien yang dikarang.
- Hero, perangkat, gambar layanan, thumbnail, galeri, artikel, navigasi dan kontak tetap dapat dikelola melalui Payload CMS/PostgreSQL.
- Parallax desktop dibatasi: latar hero maksimum 72px, perangkat ±28px. Mobile, reduced motion dan halaman tanpa JavaScript tetap terbaca secara statis; tidak ada scroll hijacking atau layar tunggu wajib.

## Pemeriksaan akhir

Build produksi Next 16.4.2/webpack dan TypeScript berhasil pada Node 24.21.0. ESLint selesai tanpa error. Tiga unit test lulus. Lima tes browser Playwright/Chrome lulus dalam 52,8 detik:

1. Login admin, role editor, pembatasan role/penghapusan, draft privat, preview terautentikasi, publish, upload valid/invalid, penggantian dan pemulihan hero CMS.
2. Rute publik, metadata/canonical, filter portofolio/artikel, navigasi, FAQ dan pemilihan layanan menuju form.
3. Ukuran 1440/1024/768/390, keyboard, menu/inert/Escape/perpindahan ukuran dan tampilan tanpa JavaScript.
4. Hero tetap terbaca; parallax aktif terbatas pada desktop normal dan statis pada mobile/reduced motion.
5. Validasi form, status pending/error/sukses, pemulihan input, penyimpanan PostgreSQL privat, origin/rate limit, larangan pendaftaran admin dan akses draft/pesan anonim.

Tes CMS memakai upload hero terpisah dari thumbnail proyek konsep, sehingga menguji gambar netral dan label konsep secara benar. Fixture dibersihkan; bucket rate limit pengujian juga dihapus setelah suite agar pratinjau tetap dapat digunakan. Pemeriksaan baca database mengonfirmasi tiga migrasi diterapkan, sepuluh layanan terbit memiliki gambar, dan nol bucket rate limit fixture tersisa.

Build mengeluarkan peringatan metadataBase pada generasi halaman statis; layout publik menetapkan metadataBase dan tes canonical publik lulus. Tidak ada error build. Bukti screenshot/ukuran berada di `.impeccable/review/`; [review visual](visual-review-vodjo.md) memiliki cakupan dan keputusan tersendiri.

Capture final memeriksa sembilan rute pada empat lebar (1440, 1024, 768 dan 390): 36 kombinasi, tanpa overflow horizontal, gambar rusak atau pageerror. Screenshot viewport tersedia untuk seluruh kombinasi; screenshot halaman penuh desktop/mobile tersedia untuk sembilan rute. Font dan gambar diselesaikan sebelum capture; halaman dikembalikan ke atas dan state header ditunggu sebelum pengambilan gambar. Rasio token yang dihitung: Navy/White 17,43:1; Slate/White 5,67:1; Light/Deep Navy 12,39:1. Ini pemeriksaan pasangan warna token, bukan klaim audit aksesibilitas menyeluruh pada setiap piksel foto.

Review independen awal meminta dua koreksi lokal: filter katalog karya menjadi teks tebal terpusat, dengan status jumlah tetap tersedia bagi pembaca layar tanpa menambah ruang visual; serta penghapusan judul overlay pada kartu katalog mobile karena judul sudah ada di caption. Homepage tetap memakai judul di atas gambar. Koreksi dilakukan sebagai satu batch, lalu build/capture dan pemeriksaan terkait diulang. Keputusan setelah koreksi dicatat terpisah oleh reviewer pada dokumen review visual.

Sesudah batch tersebut: build/TypeScript dan lint komponen yang berubah kembali lulus; keempat tes browser publik lulus dalam 35,3 detik. Capture 36 kombinasi diulang pada file yang sama dan kembali tidak menemukan overflow, gambar rusak atau pageerror. Tiga migrasi, sepuluh gambar layanan dan pembersihan bucket fixture dikonfirmasi kembali. Suite CMS tidak diulang karena batch hanya mengubah tampilan filter/caption; hasil suite lengkap sebelumnya tetap dicatat dengan cakupannya.

Keputusan akhir reviewer: **ship**. Kedua temuan dinilai resolved: galeri desktop mulai sekitar y=612 dengan filter teks terpusat, dan judul katalog mobile tampil sekali. Tidak ditemukan regresi akibat batch tersebut. Keputusan pass terakhir mencakup dua koreksi yang dinilai; review awal mencakup bagian lain yang tidak berubah. Canonical DESIGN.md, sidecar JSON, sistem desain dan spesifikasi UI/UX telah diselaraskan sesudah perubahan terakhir.

## Input pemilik dan batas operasional

Logo asli, kontak bisnis, proyek nyata, foto tim dan testimoni asli masih berasal dari pemilik. Wordmark teks merupakan pengganti sementara yang disetujui. Gambar contoh dapat diganti mengikuti [panduan aset](assets.md). Kanal kontak yang kosong tidak ditampilkan; tombol chat menuju halaman konsultasi sampai nomor WhatsApp valid diisi.

Pengujian memakai database lokal dan Chrome desktop yang mengemulasi ukuran layar; bukan pengujian perangkat fisik atau audit pembaca layar. Tidak ada skor Core Web Vitals atau Lighthouse yang diklaim. Situs belum dipublikasikan; SMTP, storage produksi dan domain memerlukan konfigurasi pemilik. Risiko dependency yang sudah tercatat tetap ada di [dependency-audit.md](dependency-audit.md).
