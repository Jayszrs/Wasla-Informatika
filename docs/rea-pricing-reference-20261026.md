# Rate card Wasla berdasarkan referensi pemilik

Referensi: [pricing Resolusiweb](https://resolusiweb.com/jasa-pembuatan-website-jakarta), sesuai screenshot yang dikirim pemilik pada 26 Oktober 2026. Tujuannya mengikuti susunan dan interaksi kartu dengan identitas dan paket Wasla.

## Temuan REA

| Temuan | Bukti dan batas cakupan |
| --- | --- |
| Navigasi kategori berbentuk segmented control dan panel terpisah | DOM hasil `ev_bd067b7abd32a4485678a9a291598b2b9f9049a7492523ae3406b9284d9dc45f`; role tablist/tab/tabpanel terlihat pada hasil runtime. |
| Kartu putih desktop tiga kolom, judul, ringkasan, harga, tombol, dan checklist terpisah | DOM, stylesheet yang tertanam, dan screenshot desktop `ev_96b88784797cd84aed35ac7dc29c4b8c672b15287d1258943b83962273ffe4d3`. Nilai CSS adalah isi stylesheet teramati, bukan seluruh laporan computed style. |
| Kategori WordPress, Custom Development, dan Redesign berpindah melalui klik | Ketiga aksi tab pada capture desktop selesai. Capture ini berstatus keseluruhan incomplete karena selector tombol rincian terakhir cocok ke 14 tombol; aksi tab sebelumnya tetap teramati. |
| Rincian dapat dibuka; tata letak mobile menumpuk | Capture terfokus pada viewport 390×844 `ev_fa7ed35dbe84d8ca1bab7dfd1e496eac54b310b4eb3d73ec83057cf9ef8eb09f` memilih tombol dengan `aria-controls` spesifik. Seluruh aksi selesai dan `aria-expanded` berubah menjadi true. |

REA menjalankan browser sementara miliknya sendiri, menavigasi referensi, dan melakukan aksi yang dideklarasikan. Tidak ada akses ke sesi login, pengiriman WhatsApp, atau formulir referensi. Bundle lengkap disimpan lokal di `.local/pricing-review/rea-pricing-reference-20261026.json`, dengan screenshot referensi dan Wasla di direktori yang sama. Tidak ada native target yang dibuka sehingga tidak ada native session untuk ditutup.

## Adaptasi untuk Wasla

- Tab memakai kategori yang tersedia: Website & aplikasi, Fotografi, dan Video editing. Grid berisi tiga kartu website, dua kartu foto yang dipusatkan, atau satu kartu video yang dipusatkan.
- Kartu putih memakai border, navy dan Poppins Wasla, harga tebal, tombol persegi membulat, checklist dengan garis pemisah, serta rincian/ketentuan dalam `details` native. Baris kartu desktop berbagi subgrid sehingga harga dan CTA sejajar.
- Ribbon pada Web Application menyatakan **Untuk kebutuhan operasional**, sesuai deskripsi paket. Ini pilihan presentasi Wasla, bukan klaim paket terlaris atau rekomendasi dari data pelanggan.
- Harga, flag mulai dari, satuan sesi/acara/video dan pilihan layanan tetap memakai CMS. Tidak disalin diskon, harga coret, biaya tahunan, domain gratis, garansi atau durasi pengerjaan dari referensi.
- `features[]` opsional ditambahkan ke schema JSON Studio dan tipe paket, tanpa migrasi SQL atau penimpaan data produksi. Checklist bisa diisi melalui Pengaturan website → Paket layanan → Cakupan paket (checklist).
- Paket bawaan yang ringkasan dan keterangannya belum berubah memakai rangkuman dari isi yang sudah ada. Jika editor mengubah deskripsi/keterangan, fallback lama berhenti; daftar custom atau keterangan CMS menjadi sumbernya. Daftar custom dideduplikasi dan baris kosong dibuang.
- Setiap CTA mempertahankan `layanan` dan `paket` untuk pilihan layanan serta ringkasan konsultasi. Tidak ada pesan eksternal yang dikirim.
- Semua paket dirender di server. Kategori menjadi interaktif setelah hydration; slot tab sudah dicadangkan dan panel pertama tetap pada posisinya. Tanpa JavaScript, semua kartu dan rincian tetap tersedia. Arrow Left/Right, Home/End, focus ring, target sentuh minimum 44px dan reduced motion diperiksa.

## Verifikasi lokal

- Build produksi lokal dan pemeriksaan TypeScript berhasil.
- `npm test`: 8/8 tes lolos, termasuk perubahan checklist CMS dan penghentian fallback isi lama.
- Browser pada `http://127.0.0.1:3000`: 9/9 tes lolos, 33,4 detik. Mencakup seluruh CTA, tab, keyboard, rincian, empat lebar 1440/1024/768/390, homepage, tanpa JavaScript, edit harga/checklist CMS dan pemulihannya, serta regresi SEO.
- Edit CMS hanya dilakukan pada database lokal. Harga uji dan checklist dikembalikan dalam `finally`; data produksi tidak diubah oleh pengujian tersebut.
- Lint: 0 error dan enam warning lama pada Studio mengenai navigasi/gambar. Tidak ada warning baru dari komponen yang diubah.
- Database dan dev server lokal yang dinyalakan untuk verifikasi dihentikan kembali. Alamat IPv4 eksplisit digunakan karena `localhost:3000` juga terhubung ke proyek lain melalui IPv6.

Pengujian awal tambahan menemukan `/en/paket-website` mengembalikan 404 pada implementasi lokal yang sudah ada. Perubahan ini memakai helper terjemahan yang tersedia dan menambahkan padanan label baru; perbaikan routing multibahasa tidak menjadi bagian dari permintaan rate card ini. Tidak ada klaim bahwa rute bahasa Inggris telah diverifikasi.

## Delivery gate

Lingkup: rate card beranda dan `/paket-website`, tab kategori, checklist CMS, serta konsultasi paket. Mode Persuade, ENERGY 2 / RHYTHM 2 / MOTION 1 mengikuti brief baru pemilik. Ini menggantikan arah deck/flip paket sebelumnya, dengan identitas situs lain tetap mengikuti `DESIGN.md`.

- **Hard Gate PASS:** kartu putih, harga dan CTA sejajar pada tes desktop; tidak overflow pada keempat viewport; seluruh CTA mencapai layanan yang sesuai; native details dan tab dapat dioperasikan lewat keyboard; semua paket terbaca tanpa JavaScript; tidak ada harga, diskon, testimoni, atau garansi baru yang dibuat-buat.
- **Purpose Gate PASS:** pills dipakai sebagai pemilih kategori; check mark menyatakan baris cakupan; chevron menyatakan buka/tutup rincian; ribbon membedakan kebutuhan aplikasi operasional. Tidak ditambah gradient, glow, foto atau ilustrasi dekoratif.
- **Liveliness PASS:** harga menjadi fokus, whitespace memisahkan ringkasan/harga/cakupan, panel kategori mengurangi kepadatan, dan satu aksen navy membedakan aplikasi operasional. Screenshot 1440 dan 390 piksel diperiksa secara visual.
- **Craftsmanship PASS:** struktur kartu mengikuti referensi pemilik, isi bersumber dari paket Wasla, checklist dapat diedit, perubahan CMS tidak meninggalkan fallback lama, serta tidak ada dependensi runtime baru. Alur dan metadata SEO sebelumnya tetap lolos pengujian.
