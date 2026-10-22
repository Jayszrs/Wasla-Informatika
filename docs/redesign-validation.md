# Validasi redesign — 22 Oktober 2026

Alur yang diperiksa: pengunjung menemukan layanan dan contoh karya, meninjau detail, lalu mengirim konsultasi yang tersimpan privat. Editor mengunggah gambar dan mengganti hero/thumbnail melalui CMS; halaman publik mengambil pilihan tersebut dari database.

## Hasil teknis

| Pemeriksaan | Hasil dan batas bukti |
| --- | --- |
| Build produksi | `next build --webpack` berhasil; seluruh route publik dan Payload terkompilasi |
| TypeScript | `tsc --noEmit` berhasil setelah penambahan field hero dan regenerasi tipe |
| Lint | ESLint pada source, scripts, tests dan konfigurasi berhasil |
| Unit | 3 tes validasi kontak dan tautan lulus |
| Browser final | Seluruh 5 tes Playwright lulus dalam 46,4 detik pada server produksi lokal setelah perbaikan reviewer |
| Motion | 1440 dan 390 px diuji dengan normal/reduced motion; judul selalu terbaca; parallax hanya desktop normal dan maksimal 22 px |
| Matriks tampilan | 9 route × 4 lebar (1440, 1024, 768, 390): tanpa overflow, error JavaScript, atau gambar rusak pada capture akhir |
| Gambar CMS | Upload valid dan tidak valid diuji; thumbnail proyek publish terlihat; penggantian hero terlihat di beranda, lalu dipulihkan dan fixture dibersihkan |
| Formulir | Validasi, pending, error yang mempertahankan isian, sukses setelah penyimpanan, penolakan origin dan pembatasan percobaan diuji |
| Akses CMS | Login, admin/editor, draft privat, preview berizin, publish dan larangan eskalasi role diuji |
| Metadata | Judul dan canonical route utama diuji; detail draft tidak dibuka untuk anonim |

Capture akhir berada pada `.impeccable/review/`: `desktop.png`, `mobile.png`, viewport beranda, halaman internal desktop/mobile dan `browser-readings.json`. Capture produksi dilakukan setelah fixture CMS dibersihkan. Screenshot riset disimpan terpisah dalam `docs/evidence`, tidak digunakan sebagai aset website.

Detektor desain dijalankan satu kali pada source yang berubah: tidak ada temuan primer; 130 advisory membandingkan ukuran/radius baru dengan DESIGN.md lama. Dokumentasi sistem desain diperbarui dari implementasi setelah review. Provenance ketiga gambar contoh diperiksa: 3 raster, 0 provenance hilang.

Navy/putih 17,43:1; slate/putih 6,23:1; light/navy 14,33:1. Ini perhitungan token warna, bukan sertifikasi seluruh piksel atau audit teknologi bantu. Tidak ada klaim skor Lighthouse atau Core Web Vitals.

## Perubahan yang diverifikasi

Mockup konsep orisinal menggantikan gambar geometris hero dan portofolio. Nama klien, testimoni, alamat, legal entity dan kanal kontak yang tidak berasal dari data resmi telah dihapus dari template. Tim/testimoni beranda hanya tampil jika ada konten yang diterbitkan dan memenuhi izin. Bagian tim About juga disembunyikan ketika kosong. Gambar hero contoh memiliki label konsep yang terlihat langsung; saat diganti dengan unggahan biasa, label konsep tidak dipaksakan pada gambar tersebut.

Migrasi `20261022_093319_hero_image` telah diterapkan. Media awal dan pemetaan konten diisi secara idempotent oleh `seed:media`; pilihan gambar pengguna dipertahankan.

Review visual terpisah meminta dua perbaikan: label konsep pada hero dan penghilangan bagian tim About yang kosong. Setelah build dan capture ulang, reviewer menilai keduanya **resolved**, dengan disposition **ship** pada cakupan daftar perbaikan tersebut. Lihat [laporan reviewer](visual-review-redesign.md); verdict ini tidak diklaim sebagai sertifikasi menyeluruh.

## Batas eksternal

REA MCP berhasil melakukan pemeriksaan ulang empat skenario referensi dan mengekspor bukti lengkap; lihat [ledger terbaru](evidence/refresh-2026-10-22.md). Context7 tidak tersedia pada inventory sesi, sehingga pola implementasi diperiksa melalui dokumentasi Next yang terpasang dan API/tipe paket. Tidak ada ekspor Figma baru; alur yang dipilih pengguna adalah spesifikasi → kode → review browser.

Logo asli, konten klien nyata, profil tim, testimoni resmi dan kontak bisnis tetap merupakan input pemilik. Wordmark teks dan karya berlabel konsep menjaga website tetap dapat ditinjau tanpa mengarang bukti. Deployment publik, SMTP dan storage eksternal tidak dilakukan dalam revisi lokal ini.
