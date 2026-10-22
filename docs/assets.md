# Gambar contoh Wasla

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
