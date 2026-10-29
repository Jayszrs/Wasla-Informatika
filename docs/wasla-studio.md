# Wasla Studio

Pengganti CMS Payload dengan dashboard khusus Wasla. Pemindahan 23 Oktober 2026 mempertahankan ID konten, referensi galeri, media asli, dan hash akun lama. Login pertama memverifikasi hash lama, lalu menyimpan hash scrypt. Session baru menggunakan cookie HttpOnly; token disimpan dalam bentuk hash di database. Tabel lama tidak dihapus.

## Pekerjaan harian

1. Buka `/admin` dan masuk dengan akun CMS yang sudah tersedia.
2. Ringkasan menampilkan pekerjaan terdekat dan pesan berstatus baru. Jumlah berasal dari database; tidak ada grafik atau aktivitas rekaan.
3. Gunakan Project untuk sampul, galeri, kategori, tautan website, kebutuhan dan solusi. Buka galeri, tambah baris, pilih atau unggah gambar, isi keterangan, lalu gunakan Naik/Turun untuk mengurutkan.
4. Simpan sebagai draft untuk meninjau perubahan. Pada project yang telah terbit, draft perubahan tidak menimpa versi publik. Terbitkan untuk mengganti versi publik. Tarik dari website untuk menonaktifkan publikasi.
5. Preview draft memerlukan sesi staf. Riwayat menyimpan sampai 20 penyimpanan per dokumen; muat sebagai draft lalu tinjau dan simpan. Konten lama sebelum migrasi tidak memiliki riwayat baru secara retroaktif.

## Paket layanan

Buka **Pengaturan website → Paket layanan**. Setiap baris memuat nama, slug unik, harga rupiah, deskripsi, keterangan paket/CMS, layanan tujuan, pilihan **Harga mulai dari**, dan satuan seperti per sesi atau per video. Harga website tetap Rp5.000.000 tanpa CMS, Rp8.000.000 aplikasi web, dan Rp10.000.000 company profile + CMS. Paket kreatif baru dimulai Rp750.000 untuk wisuda/personal, Rp2.000.000 untuk foto wedding/acara, dan Rp350.000 untuk editing video. Dasar pembanding ada pada [catatan harga](creative-package-pricing.md). Semua nilai dapat diubah. Simpan untuk memperbarui beranda, `/paket-website`, dan isi awal konsultasi. Field pengaturan lain tetap dipertahankan. Hapus seluruh baris bila paket sementara tidak ditampilkan; halaman menampilkan ajakan konsultasi.

Tombol paket membuka formulir berisi pilihan layanan dan ringkasan paket. Pengunjung masih meninjau, melengkapi identitas dan menyetujui penggunaan data sebelum mengirim. Fitur, jadwal, domain, hosting dan dukungan dibahas dalam penawaran.

## Foto dan bio tim

Buka **Tim & divisi**, pilih anggota, lalu isi **Tentang anggota** untuk bio dan gunakan **Foto profil → Unggah gambar** untuk mengganti foto. Simpan agar beranda dan Tentang diperbarui. Klik kartu menampilkan bio; klik lagi pada kartu mengembalikan profil. Tombol kembali terpisah sudah dihapus. Tautan WhatsApp pada sisi bio dan LinkedIn pada kedua sisi tetap menjadi tindakan tersendiri. Keyboard memakai Enter/Space pada kartu, lalu Tab ke tautan yang terlihat. Tinggi kartu mengikuti isi bio.

Untuk profil LinkedIn, gunakan baris **Tautan kontak** yang sudah tersedia: isi **Nama tautan** dengan `LinkedIn` dan **URL HTTPS** dengan profil lengkap. Gunakan nama lengkap Jaelani Surya Saputra (`https://www.linkedin.com/in/jayszrs/`), Al Hafiz Taufikur Rohman (`https://www.linkedin.com/in/alhafiztaufikurrohman/`), dan Muhammad Lakchamana (`https://www.linkedin.com/in/lakchamana/`). Simpan perubahan; tautan tampil terpisah dari area pembalik kartu di beranda dan Tentang. Tidak ada kolom LinkedIn khusus. Pertahankan baris WhatsApp yang ada. Ahmad Suroso tidak diberi tautan LinkedIn tanpa profil yang disediakan pemilik.

## Scheduler project

## Galeri video dan foto

Buka **Galeri video** untuk mengatur judul, kanal, format konten, sampul, urutan, dan publikasi. Pilih kanal Fulday, TikTok, Cimuning, Growthfin, atau Pilihan. Gunakan tautan video/postingan tertentu untuk YouTube, TikTok, Instagram dan Google Drive; tautan profil akun tidak diterima sebagai sumber video.

Untuk video sendiri, pilih **File unggahan**, lalu unggah MP4/WebM melalui kolom video atau menu **Media**. Batas video 250 MB; progres unggahan ditampilkan. File video dan gambar dipisahkan pada pemilih media. Untuk foto, pilih format **image** dan gunakan gambar sampul sebagai gambar galeri. Foto dibuka dalam lightbox, bukan diberi tombol putar video.

File video yang dipilih mengambil prioritas atas embed. Ini juga memungkinkan penggantian embed yang ditolak platform menggunakan file asli. Simpan sebagai draft, terbitkan saat siap, dan gunakan **Tarik dari website** untuk menghapusnya dari galeri publik. Media yang masih dirujuk draft atau versi terbit tidak dapat dihapus.

YouTube SEPTIHAN dan Seventeen menolak embed dengan error 150 pada pemeriksaan 29 Oktober 2026. Pemilik menyatakan file asli hanya tersedia di YouTube. Website menyediakan pesan kegagalan, coba lagi, dan sumber asli; tidak ada klaim kedua video sudah dapat diputar lewat embed.

## Scheduler project

Tambah nama pekerjaan, penanggung jawab dari tim, tanggal mulai dan tenggat. Klien, ID project dan catatan opsional. Status: direncanakan, dikerjakan, ditinjau, selesai. Tenggat tidak dapat mendahului tanggal mulai. Kalender menampilkan rentang pekerjaan; pilih tanggal untuk agenda, gunakan filter status dan tombol bulan. Edit jadwal untuk menjadwal ulang. Administrator dapat menghapus jadwal.

Tanggal kalender mengikuti WIB dan berupa tanggal tanpa jam. Scheduler adalah perencanaan internal; tidak ada notifikasi otomatis, integrasi kalender, atau pengiriman WhatsApp otomatis.

## Hak akses dan data

Admin dan editor dapat mengelola konten, galeri, jadwal, dan tindak lanjut pesan. Hanya admin mengelola pengguna dan penghapusan. Sesi kedaluwarsa setelah 8 jam. Login dibatasi percobaannya. Semua mutasi memeriksa asal permintaan dan input. Konflik penyimpanan dari tab lain ditolak agar editor memuat versi baru terlebih dahulu.

Unggahan gambar divalidasi dengan decoder dan diubah menjadi WebP. Video MP4/WebM diperiksa tipe dan signature file. Gambar/video memerlukan deskripsi. Di Vercel, video memakai unggahan multipart langsung dengan token terbatas yang diterbitkan untuk sesi staf, lalu diverifikasi sebelum didaftarkan sebagai Media; token server tetap privat. Penyimpanan lokal mendukung Range untuk seeking. Data konsultasi dan jadwal tidak dapat dibaca dari API tanpa sesi staf.

CMS menggunakan tabel `studio_documents`, `studio_globals`, `studio_users`, `studio_sessions`, `studio_revisions`, dan tabel pembatas login. Tidak ada dependensi runtime Payload. Arsip sumber dan backup migrasi berada di `.local/`, diabaikan Git. Migrasi legacy hanya dijalankan melalui `npm run db:import-legacy`, dengan backup privat yang sesuai; instalasi baru menggunakan `npm run db:migrate`.

## Visual dan keterbatasan verifikasi

Kartu harga 26 Oktober 2026 memakai tab kategori dan checklist pada beranda serta `/paket-website`. Di Pengaturan website → Paket layanan, isi **Cakupan paket (checklist)** dengan baris cakupan/hasil pekerjaan yang benar-benar ditawarkan. Nama, harga, ringkasan, CMS, unit tarif, dan layanan konsultasi tetap memakai field sebelumnya. Jika checklist belum diisi, paket bawaan yang ringkasan dan keterangannya masih sama memakai rangkuman faktual dari deskripsi tersebut. Mengubah ringkasan/keterangan menghentikan rangkuman lama; isi checklist untuk detail baru. Daftar kosong menampilkan keterangan paket/CMS saja. Tidak ada migrasi atau penimpaan otomatis terhadap data produksi.

Antarmuka Studio adalah ruang kerja navy/putih dengan navigasi responsif, pencarian konten, filter status, keadaan kosong yang menjelaskan tindakan berikutnya, form edit, dan kalender. Ringkasan kosong tidak diisi project atau jadwal fiktif. Editor artikel mendukung judul, paragraf, tebal, miring, daftar, dan tautan dengan sintaks yang dijelaskan pada kolom. Rich text lama tetap utuh sampai isi diubah.

Elemen layanan publik memakai mesh Three.js dengan geometri dan material nyata, diterangi langsung oleh lampu hemisphere dan directional. Runtime tidak membuat environment map atau peta bayangan real-time untuk setiap objek. Mouse/keyboard dapat memutar model. Di perangkat sentuh, tombol Putar objek mengaktifkan interaksi supaya halaman tetap dapat digulir. Reduced motion menonaktifkan gerak otomatis; gambar cadangan digunakan bila WebGL tidak tersedia. Pengujian sentuh dilakukan lewat emulasi Chrome, bukan seluruh perangkat fisik.
