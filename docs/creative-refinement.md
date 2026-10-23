# Layanan kreatif, foto tim dan mockup project

Permintaan pemilik, 23 Oktober 2026. Identitas navy/putih, Poppins, website nyata, CMS Studio dan tautan WhatsApp dipertahankan. Implementasi mengikuti koreksi terbaru pemilik; tidak ada klaim comp desain yang telah disetujui.

## Observasi dan keputusan

REA mengamati halaman publik `/layanan` pada Chrome milik provider: `ev_77cc9fedb1d0baaf3f15c9acc2b29abef06f777e0edbe00d8ef4eaab4209d08f`. Capture mencakup DOM dan screenshot setelah menunggu halaman. Tidak ada inspeksi akun privat atau source proprietary. Bukti ini mendokumentasikan halaman sebelum koreksi, bukan membuktikan hasil setelahnya. Screenshot pemilik menunjukkan garis horizontal pada akhir gelombang; keputusan implementasi adalah mempertahankan bentuk gelombang dan menutup piksel raster di batas permukaan tujuan melalui komponen CSS bersama.

## Visual layanan berdasarkan identitas

Pemilihan objek sekarang memakai slug, bukan urutan daftar CMS. Mengubah urutan layanan tidak menukar ilustrasi dengan layanan lain.

| Layanan | Objek Three.js |
| --- | --- |
| Website Development | Monitor dan ponsel |
| Web Application | Laptop dengan alur kerja |
| Custom Software | Modul software terhubung |
| E-Commerce | Tas belanja, produk dan pembayaran |
| UI/UX Design | Artboard antarmuka |
| IT Consultation | Papan strategi dan percakapan |
| IT Infrastructure & Support | Rak server |
| Maintenance & Support | Peralatan perawatan dan roda gigi |
| Systems Integration | Hub dan node penghubung |
| Database & Digital Solutions | Silinder penyimpanan database |
| Fotografi & Dokumentasi | Kamera dan lensa |
| Video Editing | Monitor timeline dan slate |
| Desain Grafis & Photo Editing | Artboard, pena dan swatch |

Objek merupakan mesh WebGL interaktif. Drag, keyboard, aktivasi touch dan reduced motion tetap tersedia. Render bersifat sesuai kebutuhan; objek di luar viewport dibersihkan. Fallback berbentuk ikon geometris yang sesuai layanan. Grid gambar memakai track `minmax(0,1fr)` dan fallback absolut agar SVG intrinsik tidak memperbesar baris dan menimpa judul.

Tiga layanan baru mencakup fotografi wedding/kerja sama WO, wisuda dan acara; penyuntingan video; desain grafis dan editing foto. Tidak ada harga, hasil bisnis atau jaminan kecepatan yang dikarang. Detail pekerjaan dan revisi dibahas sesuai brief. CMS mendukung kategori Fotografi dan Produksi Kreatif. `scripts/add-creative-services.ts` menambahkan hanya slug yang belum ada, memvalidasi data, membuat backup privat dan mempertahankan edit yang sudah ada.

## Foto tim

Nama terbaru dari pemilik: Ahmad Suroso, Jaelani Surya Saputra, Al Hafiz dan Laksa. Nomor WhatsApp tidak berubah. Foto asli yang dikirim pemilik menjadi target penyuntingan built-in `image_gen`: perapian pencahayaan, detail secara konservatif, pakaian profesional dan latar transparan. Hasil tidak disebut foto asli tanpa retouch atau restorasi identitas yang pasti; input beberapa orang beresolusi rendah.

Empat PNG tersimpan pada `public/images/team/`. Prompt lengkap dan pemetaan sumber ada pada [manifest aset](team-portrait-provenance.json), serta tertanam dalam metadata PNG. Scan provenance: empat raster, nol prompt hilang. Alpha transparan diverifikasi dari file dan setelah upload CMS. Foto dapat diganti pada **Tim & divisi → Foto profil**. Komponen kartu flip yang sama digunakan di beranda dan tentang, dengan fokus keyboard dan tautan WhatsApp yang tetap terpisah.

## Perangkat dan galeri

`ProjectMockup` menggunakan screenshot sampul asli sebagai layar laptop. Gambar galeri portrait dengan rasio kurang dari 0,8 menjadi layar ponsel. Tanpa gambar mobile, komponen menampilkan laptop saja; tidak merekayasa screenshot mobile dari potongan desktop. Ketujuh project saat ini mempunyai screenshot desktop dan mobile asli.

Galeri menampilkan bingkai laptop, tablet atau ponsel sesuai rasio gambar. Lightbox tetap membuka screenshot asli dengan caption, keyboard next/previous dan Escape. Mengganti media di CMS mengubah layar mockup secara langsung; tidak memerlukan generasi gambar baru. Bingkai perangkat adalah CSS yang terukur, sehingga tulisan dan desain website tidak digambar ulang oleh AI.

## Footer, jarak dan bukti capture

Footer menyertakan signature Wasla beropasitas rendah dengan subtitle informatika yang terbaca. Tidak ada batas tinggi yang memotong subtitle. Semua teks dan tombol daftar layanan mobile memakai gutter 15px; objek boleh memakai bidang selebar baris.

Capture bagian menyembunyikan header/floating contact/skip-link hanya pada screenshot agar elemen fixed tidak melintasi potongan bagian. Capture intro mempertahankan navigasi sebenarnya. Capture footer menggunakan viewport di posisi scroll paling bawah, disertai ukuran DOM dan clip rectangle; capture awal yang terpotong tidak dipakai sebagai bukti hasil akhir.

## Pengukuran Vercel

SDK `@vercel/analytics` dan `@vercel/speed-insights` dipasang hanya pada route group publik di Vercel. Event pageview menghapus query dan fragment; isi form dan halaman admin tidak dikirim sebagai custom event. Speed Insights disampling 10%. Project API mengonfirmasi konfigurasi kedua fitur sudah ada, tetapi kesiapan runtime perlu dibuktikan setelah deployment. Tidak ada upgrade Plus atau pembelian paket.

Dokumentasi primer: [Web Analytics](https://vercel.com/docs/analytics/quickstart), [Speed Insights](https://vercel.com/docs/speed-insights/quickstart). Pemeriksaan CLI memakai akun/scope tujuan yang sudah terhubung; perubahan checklist melalui dashboard menunggu sesi browser akun tujuan bila diperlukan. Checklist onboarding bukan bukti hasil pengujian website.

## Validasi dan rilis

Build dan typecheck berhasil. Empat tes unit dan sebelas tes browser lulus; empat tes yang terdampak perubahan scene diulang setelah koreksi ukuran intrinsik dan lulus. Lint: nol error, tujuh warning pada pilihan img/auth navigation yang telah tercatat. Audit dependensi produksi: nol kerentanan yang dilaporkan. Detector desain sekali pada pass ini menghasilkan daftar kosong.

Bukti saat ini: `.impeccable/review/creative-validation.json`, `creative-browser-readings.json`, dan [review visual](visual-review-creative.md). Status produksi dicatat pada [laporan deployment](production-verification.md) setelah verifikasi alamat publik, bukan disimpulkan dari capture lokal.
