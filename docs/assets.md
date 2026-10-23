# Aset Wasla — pembaruan 23 Oktober 2026

Penyempurnaan terbaru menggunakan `wasla-emblem-navy.webp`, `favicon-navy.png`, dan `wasla-device-navy.webp` menggantikan versi warna pada tampilan publik. Versi lama tetap menjadi arsip sumber, bukan identitas aktif. Prompt dan sidecar disimpan di `docs/assets/navy-*-20261023-prompt.txt` serta direktori brand. Tambahan 21 screenshot REA di `public/images/projects/gallery/` telah diimpor ke galeri CMS; [manifest dan laporan](evidence/project-gallery-2026-10-23.md) mencatat sumber asli. Untuk menambah gambar: Media → upload, Project → Galeri project → tambah baris/pilih gambar/caption → urutkan → publish. Seed `scripts/seed-gallery-refresh.ts` mempertahankan pilihan galeri yang ada dan menambahkan relasi yang belum ada; jalankan sebagai migrasi konten yang disengaja.

## Aset yang sekarang ditampilkan

Tujuh project menggunakan screenshot website publik asli yang diberikan pemilik, bukan gambar website hasil generasi. Sumber, tanggal, metode capture dan batas pengamatan ada di [laporan bukti](evidence/real-projects-2026-10-23.md). REA digunakan untuk enam website; Ngaji Yuk menggunakan fallback Playwright setelah navigasi REA gagal. Screenshot Batu Alam Supplier memang dimulai dari bagian Client Testimonial pada website aslinya.

`public/images/projects/` menyimpan screenshot tersebut. Sidecar `.source.json` menyimpan bukti rinci dan `.webp.json` menyimpan asal melalui `impeccable embed-prompt`. Framework, hasil bisnis dan metrik project tidak diklaim tanpa bukti.

`public/images/services/{web,app,design}-3d.webp` adalah ilustrasi layanan orisinal dengan alpha transparan. `public/images/brand/wasla-emblem.webp` merupakan restorasi raster dari gambar logo yang dikirim pemilik, bukan file vektor asli. Favicon merupakan turunannya. `wasla-device-branded.webp` adalah ilustrasi perangkat dengan logo tersebut, bukan produk klien. Prompt persis dan sumber generasi disimpan di [manifest prompt](assets/brand-20261023-prompts.json) dan sidecar masing-masing file. Ketigabelas raster baru lolos pemeriksaan provenance: tidak ada yang kehilangan asal/prompt.

Logo teknologi di `public/images/technology/` berasal dari Simple Icons, disertai provenance dan lisensi CC0. Logo pada bagian teknologi menunjukkan cakupan teknologi studio, bukan klaim stack masing-masing project.

## Pengelolaan CMS saat ini

Unggah media melalui `/admin` → Media, lalu pilih di Project, Artikel, Layanan atau Pengaturan Website. Format yang diterima: PNG, JPEG, WebP dan AVIF. Batas lokal 8 MB; di Vercel 4 MB karena upload diproses server dan diperiksa signature filenya. Gunakan gambar transparan untuk objek layanan/perangkat.

Field `illustration` mengatur objek layanan di beranda; `image` mengatur visual utama halaman layanan. Gambar/logo/favicon tetap dapat diganti melalui CMS. Empat anggota tim dan URL WhatsApp dikelola pada koleksi Team. Hanya URL WhatsApp valid yang menjadi tujuan kontak.

Pada instalasi baru, urutan pengisian adalah `npm run seed`, `npm run seed:media`, kemudian `npm run seed:real`. Perintah terakhir merupakan migrasi konten satu kali: menerapkan tujuh project, empat kontak, visual dan label sesuai permintaan pemilik, serta mengarsipkan empat konsep sebagai draft. Jangan menjalankannya sebagai bagian startup rutin karena pilihan konten pada slug terkait akan diterapkan kembali.

## Arsip aset konsep fase awal

Daftar berikut mencatat aset lama yang tetap menjadi sumber seed/histori. Empat project konsep tidak lagi diterbitkan; artikel sekarang memakai screenshot project asli. Gambar workstation masih dipakai sebagai ilustrasi hero, sementara mockup perangkat lama sudah diganti versi berlogo.

Empat gambar proyek, satu foto workstation ilustratif, dan satu mockup perangkat dibuat khusus melalui **built-in imagegen**, bukan diambil dari referensi. Mockup konsep fiktif menunjukkan arah desain; bukan proyek klien atau foto kantor Wasla. Teks pada layar merupakan bagian gambar contoh, bukan kontrol website yang dapat digunakan.

| Aset | Isi dan pemakaian | Prompt asli |
| --- | --- | --- |
| `public/images/demo/ruang-concept.webp` | Toko furnitur pada desktop dan ponsel; thumbnail Ruang dan artikel tentang website/aplikasi | [ruang-prompt.txt](assets/ruang-prompt.txt) |
| `public/images/demo/alur-concept.webp` | Aplikasi operasional pada laptop dan ponsel; thumbnail Alur dan artikel perawatan | [alur-prompt.txt](assets/alur-prompt.txt) |
| `public/images/demo/sela-concept.webp` | Jurnal editorial pada laptop/tablet; thumbnail Sela dan artikel brief | [sela-prompt.txt](assets/sela-prompt.txt) |
| `public/images/demo/nusa-concept.webp` | Website profil perusahaan pada monitor dan ponsel; thumbnail Nusa | [nusa-prompt.txt](assets/nusa-prompt.txt) |
| `public/images/demo/workspace-hero.webp` | Workstation ilustratif dengan laptop di kanan; latar hero | [workspace-hero-prompt.txt](assets/workspace-hero-prompt.txt) |
| `public/images/demo/wasla-device.webp` | Mockup perangkat transparan dengan wordmark teks; bagian keahlian/proses | [wasla-device-prompt.txt](assets/wasla-device-prompt.txt) |

File WebP dikonversi dari hasil imagegen dengan Sharp, kualitas 90, maksimal lebar 1920px tanpa pembesaran. Alpha pada mockup perangkat dipertahankan. Sidecar `.webp.json` menyimpan prompt persis yang diberikan ke generator (format WebP memakai fallback sidecar dari `impeccable embed-prompt`). File final tersimpan di proyek.

## Mengganti lewat CMS

1. Buka `/admin`, lalu **Media**. Unggah foto PNG/JPEG/WebP/AVIF maksimal 8 MB dan isi alt text yang menjelaskan gambar.
2. Untuk hero: **Pengaturan Website → Gambar utama beranda**, pilih gambar, lalu simpan. Rasio lebar akan dipotong terpusat; tempatkan objek utama di area tengah.
   Untuk gambar perangkat: **Pengaturan Website → Gambar area keahlian**. PNG/WebP transparan cocok untuk komposisi ini.
3. Untuk proyek: **Portofolio → pilih proyek → thumbnail**. Untuk halaman detail, tambah gambar pada **gallery**, lalu publish.
4. Untuk artikel: **Insights → pilih artikel → image**, lalu publish.
5. Saat menambahkan proyek nyata, isi informasi yang benar dan nonaktifkan **isConcept**. Hapus atau ubah karya contoh sesuai kebutuhan.

`npm run seed:media` mengimpor keenam gambar dan mengisi field kosong pada konten contoh. Perintah dapat diulang tanpa menimpa gambar pilihan pengguna. Hero demo Alur versi sebelumnya dimigrasikan ke workstation baru; hero yang telah dipilih pemilik dipertahankan. File publik contoh tetap tersedia sebagai sumber seed, tetapi halaman mengambil pilihan gambar dari Media CMS.

Identitas klien, testimoni, profil tim, alamat, email, dan nomor telepon hanya dipublikasikan berdasarkan informasi resmi pemilik.

Halaman Layanan menggunakan field image per layanan untuk susunan gambar/teks bergantian. Buka Layanan, pilih layanan, ganti gambar utama, lalu publish. Seed hanya mengisi field kosong dengan visual contoh yang sudah terdaftar di Media; gambar pilihan pemilik dipertahankan. Gambar area keahlian juga digunakan pada pengantar Tentang Wasla.
