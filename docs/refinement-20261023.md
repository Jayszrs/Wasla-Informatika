# Penyempurnaan gerak, identitas dan galeri

Permintaan pemilik: redupkan tulisan besar footer; objek layanan mengikuti pointer dan scroll; lambang navy dan ikon tab bulat; lebih banyak gambar asli pada detail project yang dapat diunggah melalui CMS; struktur divisi pada beranda; lebih banyak logo teknologi dengan warna pada hover; latar konsultasi putih; proses kerja memenuhi lebar layar.

Identitas dan susunan Vodjo yang telah dipilih tetap menjadi dasar. Perubahan ini merupakan penyempurnaan terarah dengan workflow code-first yang telah disetujui, bukan konsep visual baru.

## Gerak

Fokus gerak adalah objek layanan sebagai satu sistem material: lapisan transformasi menggabungkan kedalaman saat scroll dengan rotasi terbatas saat pointer bergerak. Rotasi maksimum X 7 derajat/Y 9 derajat, pergeseran pointer 12/9 px, dan pergeseran scroll dibatasi 38 px. Ini merupakan interaksi perspektif pada ilustrasi raster 3D; bukan model WebGL yang dapat diputar 360 derajat. Satu antrean requestAnimationFrame menangani pembaruan, listener scroll/pointer pasif, ukuran dibaca sebelum transform ditulis. Konten tidak disembunyikan tanpa JavaScript. Touch/mobile dan reduced motion menampilkan objek statis. Navigasi antarrute memasang ulang target gerak agar halaman layanan juga aktif.

Pola dievaluasi dengan dokumentasi primer [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) dan [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion). Context7 tidak tersedia pada toolset sesi ini; tidak ada hasil Context7 yang diklaim.

## Galeri nyata

REA menghasilkan 21 screenshot tambahan: tiga per project (dua detail desktop dan satu mobile). [Manifest](evidence/project-gallery-2026-10-23.json) dan [laporan bukti](evidence/project-gallery-2026-10-23.md) menjelaskan sumber dan batas pengamatan. Tidak ada akses dashboard privat atau formulir eksternal yang dikirim.

Halaman project membaca array `gallery` di Payload. Pengunjung dapat memperbesar gambar, berpindah dengan tombol atau panah keyboard, lalu menutup dengan Escape; fokus kembali ke pemicu. Tanpa JavaScript, link tetap membuka file gambar. Pemilik dapat mengunggah gambar pada Media, menambahkan baris pada Project → Galeri project, mengurutkan dan mengisi caption, lalu publish. Tidak ada batas tiga pada antarmuka CMS; tiga merupakan konten awal tambahan per project. Thumbnail utama tetap terpisah.

## Identitas dan komposisi

Lambang navy diproses dari restorasi logo pemilik dengan imagegen, bukan tracing vektor presisi. Favicon memakai lambang navy dalam medali lingkaran; header, footer dan mockup perangkat diselaraskan. Prompt persis dan provenance disimpan bersama aset. Wordmark footer tetap besar dan dekoratif, dengan opacity 0.14; teks navigasi/kontak/copyright tetap terbaca penuh.

Struktur divisi memakai nama/role asli dari koleksi Team: Project Manager sebagai jalur koordinasi, tiga divisi pengembangan terhubung di bawahnya. Diagram ini menunjukkan koordinasi project, bukan klaim jabatan direktur atau struktur kepegawaian yang tidak diberikan. Semua nama terhubung ke WhatsApp masing-masing.

Teknologi diperluas menjadi 24 logo dari [Simple Icons](https://github.com/simple-icons/simple-icons), disertai provenance dan lisensi. SVG memakai warna merek dari metadata sumber; CSS membuatnya monokrom sebelum hover/fokus. Setiap logo menaut ke situs/dokumentasi resmi, sehingga touch dan keyboard tetap memiliki aksi. Bagian ini merupakan pilihan ekosistem teknologi, bukan klaim stack pada setiap project.

Konsultasi dan prinsip perusahaan memakai putih. Bagian proses memakai latar navy selebar layar dengan isi tetap pada grid konten; tidak ada lagi panel navy terpotong di tengah latar putih.

`scripts/seed-gallery-refresh.ts` menambahkan media/relasi galeri yang belum ada dan menerapkan aset navy. Gambar galeri yang sudah dipilih pemilik dipertahankan. Perintah ini merupakan migrasi konten yang sengaja dijalankan, bukan startup rutin.

## Validasi implementasi

Build produksi lokal dan Vercel berhasil, termasuk TypeScript; lint berhasil. Empat unit test dan delapan tes browser berhasil. Setelah koreksi satu kondisi pointer, dua tes refinement dijalankan kembali dan berhasil: mode landscape touch 1024 px tidak bergerak, pointer halus tetap responsif, reduced motion statis, 24 logo berwarna saat fokus, galeri next/Escape mengembalikan fokus, serta proses memenuhi viewport. Capture akhir dijalankan setelah tes selesai agar screenshot awal tes tidak menimpa gambar yang sudah ditunggu selesai dimuat.

Detector dijalankan sekali untuk permintaan refinement ini: 92 advisory terhadap kanon sebelumnya, tanpa finding non-advisory. Provenance scan meliputi logo baru dan galeri: 27 raster, tidak ada asal/prompt yang hilang. Skor Lighthouse dan klaim aksesibilitas menyeluruh tidak dibuat.

Seed tambahan diterapkan pada database lokal dan produksi: tiga gambar galeri per project, lambang navy, favicon dan perangkat navy. Uji deployment mengonfirmasi ketujuh array galeri memiliki gambar/alt, galeri terbuka/berpindah/tertutup, 24 teknologi dan warna fokus, struktur divisi, latar putih, opacity footer, favicon navy, pointer perspective dan reduced motion. Uji hosting CMS juga mencakup login admin, upload/download Blob dan persistensi pesan privat; fixture dibersihkan. Rilis akhir serta bukti domain publik dicatat pada `production-verification.md` setelah promosi.
