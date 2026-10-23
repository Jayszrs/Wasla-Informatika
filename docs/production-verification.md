# Verifikasi produksi Wasla Studio ? 23 Oktober 2026

Website aktif: **https://wasla.my.id**. CMS: **https://wasla.my.id/admin**. Akun administrator lama tetap dapat digunakan.

## Rilis aktif

Deployment `dpl_7pH59fqvSkobj1h4sN7kTJssrZwT`, target production/READY, build 54 detik, telah dipromosikan ke domain publik. Canonical diperiksa sebelum promosi; pengujian lengkap di bawah dijalankan kembali pada domain baru tanpa bypass autentikasi Vercel.

- CMS Wasla Studio menggantikan Payload: dashboard, konten, unggah galeri, pengaturan, pengguna, pesan konsultasi, revisi serta draft/publish.
- Scheduler privat menyediakan kalender, agenda, penanggung jawab, rentang tanggal dan status. Tidak ada pengingat otomatis yang diklaim.
- Objek layanan memakai mesh Three.js interaktif, bukan hanya perspektif gambar. Kartu divisi dapat dibalik dengan mouse/keyboard; foto dapat diunggah melalui CMS dan placeholder memakai inisial jujur.
- Header tanpa ornamen kanan, link project tanpa panah/garis dekoratif, CTA putih, footer navy lurus tanpa sambungan putih, serta layout mobile yang diperbaiki.
- Database lama tidak dihapus. Migrasi mempertahankan ID, akun, tujuh project nyata, galeri dan media. Pemeriksaan cutover tidak menemukan record lama yang lebih baru sebelum promosi.

## Verifikasi domain dan runtime

| Pemeriksaan | Hasil |
| --- | --- |
| DNS dan kepemilikan | Dua nameserver Vercel terbaca dari Cloudflare/Google; Vercel `configured-correctly` |
| HTTPS | HTTP 200 dengan validasi sertifikat normal |
| Metadata | Canonical, sitemap dan robots memakai https://wasla.my.id |
| Halaman publik | Tujuh rute utama HTTP 200 tanpa overflow teramati |
| Project | Tujuh project nyata terbit, setiap galeri minimal tiga gambar tambahan |
| Privasi | Jadwal dan pesan konsultasi menolak akses anonim |
| Akun | Administrator produksi berhasil login ke Studio dengan kredensial lama |
| Media | Upload, Blob HEAD dan download WebP berhasil |
| Scheduler | Create dan perubahan status tersimpan di produksi |
| Dashboard | Ringkasan dan kalender tampil setelah autentikasi |
| Konsultasi | Form menyimpan pesan privat lalu menyediakan link WhatsApp Amat Suroso yang benar; tidak mengirim pesan eksternal otomatis |
| Responsif | Homepage/admin lebar 1440 dan 390 tanpa overflow atau page error teramati |

Fixture upload, jadwal dan pesan verifikasi dihapus menggunakan ID persis. Bukti mesin: `.impeccable/review/studio-production-verification.json`, `domain-production-verification.json`, `studio-validation.json` dan `studio-legacy-media-verification.json`. Bukti media lama mencakup dua file representatif, bukan klaim mendekode semua 43 media.

Build, typecheck, empat tes unit dan sembilan tes browser lokal lulus. Lint: nol error, delapan warning yang dicatat. Capture lokal mencakup 24 kombinasi admin dan 36 publik; coverage emulasi tidak mengklaim seluruh perangkat fisik. Review independen [Studio](visual-review-studio.md) memberikan ship. Audit dependensi produksi saat pemeriksaan: nol kerentanan dilaporkan.

Source dirilis dari checkout lokal melalui CLI, tanpa klaim push GitHub. Kredensial tidak ditulis pada laporan publik. Panduan: [CMS](wasla-studio.md), [deployment](deployment.md), [domain](domain-wasla-my-id.md).

---

## Arsip sebelum Wasla Studio

Seluruh bagian berikut adalah riwayat rilis sebelumnya. Pernyataan Payload, ornamen header, raster perspective dan URL vercel.app di arsip tidak menjelaskan rilis aktif.

# Verifikasi produksi — 23 Oktober 2026

Situs publik: **https://waslainformatika.vercel.app**. CMS: **https://waslainformatika.vercel.app/admin**.

## Riwayat rilis refinement Payload

Deployment `dpl_2KvdJMGDipWxCqczTtHVoSyzsHio` dibangun dalam 56 detik, target production/READY, diuji pada URL pentahapan dan dipromosikan ke domain publik. Pembaruan: lambang navy dan favicon bulat, mockup navy, footer dekoratif opacity 0.14, perspektif objek layanan mengikuti pointer/scroll dengan fallback statis pada touch/reduced motion, 24 teknologi dengan warna saat hover/fokus, struktur divisi, latar konsultasi putih, proses selebar layar, serta 21 screenshot galeri nyata dari REA.

Ketujuh project produksi mempunyai tiga tambahan gambar galeri dengan alt dan caption. CMS tetap mendukung upload, penambahan baris dan pengurutan, tanpa batas tiga gambar. Pembesaran galeri mendukung kontrol next/previous, panah keyboard, Escape dan pengembalian fokus. Semua gambar berasal dari halaman publik, tanpa akses dashboard privat atau data siswa.

Delapan tes browser, empat tes unit, build dan lint berhasil. Setelah koreksi fallback pointer, kedua tes refinement berhasil dijalankan kembali, termasuk tablet landscape 1024 px dengan pointer coarse. Capture akhir mencakup 36 kombinasi rute/ukuran, tanpa overflow/gambar rusak/page error. [Review independen](visual-review-motion.md) memberikan ship setelah kedua finding dinilai resolved. [Rincian perubahan dan sumber](refinement-20261023.md) menyimpan batas interpretasi, provenance dan dokumentasi primer.

Pemeriksaan pentahapan final mengonfirmasi 24 logo, warna fokus, empat divisi, putihnya konsultasi, redupnya footer, favicon navy, seluruh galeri CMS, next/Escape, pointer perspective, reduced motion dan viewport mobile. Bukti domain publik berada di `.impeccable/review/refinement-production-verification.json`. Pengujian CMS/storage/contact lengkap juga berhasil pada deployment refinement sebelum koreksi satu kondisi pointer; koreksi tidak mengubah backend.

Catatan bootstrap dan rilis pertama di bawah adalah riwayat; seluruh ID di bagian riwayat ini sudah digantikan oleh rilis Studio di awal dokumen. Source tetap diunggah melalui CLI; tidak ada push GitHub yang diklaim.

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

Post-promotion log check for the final deployment: no HTTP 5xx request logs found within the checked 10-minute window. This is a scoped release check, not continuous monitoring.
