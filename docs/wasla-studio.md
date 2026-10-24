# Wasla Studio

Pengganti CMS Payload dengan dashboard khusus Wasla. Pemindahan 23 Oktober 2026 mempertahankan ID konten, referensi galeri, media asli, dan hash akun lama. Login pertama memverifikasi hash lama, lalu menyimpan hash scrypt. Session baru menggunakan cookie HttpOnly; token disimpan dalam bentuk hash di database. Tabel lama tidak dihapus.

## Pekerjaan harian

1. Buka `/admin` dan masuk dengan akun CMS yang sudah tersedia.
2. Ringkasan menampilkan pekerjaan terdekat dan pesan berstatus baru. Jumlah berasal dari database; tidak ada grafik atau aktivitas rekaan.
3. Gunakan Project untuk sampul, galeri, kategori, tautan website, kebutuhan dan solusi. Buka galeri, tambah baris, pilih atau unggah gambar, isi keterangan, lalu gunakan Naik/Turun untuk mengurutkan.
4. Simpan sebagai draft untuk meninjau perubahan. Pada project yang telah terbit, draft perubahan tidak menimpa versi publik. Terbitkan untuk mengganti versi publik. Tarik dari website untuk menonaktifkan publikasi.
5. Preview draft memerlukan sesi staf. Riwayat menyimpan sampai 20 penyimpanan per dokumen; muat sebagai draft lalu tinjau dan simpan. Konten lama sebelum migrasi tidak memiliki riwayat baru secara retroaktif.

## Paket website

Buka **Pengaturan website → Paket website**. Setiap baris memuat nama, slug unik, harga rupiah berupa angka, deskripsi, keterangan CMS, dan layanan tujuan. Baseline yang disetujui pemilik: Landing Page Rp5.000.000 tanpa CMS; Web Application Rp8.000.000; Company Profile + CMS Rp10.000.000. Simpan untuk memperbarui beranda, `/paket-website`, dan isi awal pesan konsultasi. Perubahan harga tidak mengubah field pengaturan lain. Hapus semua baris bila paket sementara tidak ditampilkan; halaman menampilkan ajakan konsultasi yang sesuai.

Tombol paket membuka formulir berisi pilihan layanan dan ringkasan paket. Pengunjung masih meninjau, melengkapi identitas dan menyetujui penggunaan data sebelum mengirim. Fitur, jadwal, domain, hosting dan dukungan dibahas dalam penawaran.

## Foto dan bio tim

Buka **Tim & divisi**, pilih anggota, lalu isi **Tentang anggota** untuk bio dan gunakan **Foto profil → Unggah gambar** untuk mengganti foto. Simpan agar beranda dan Tentang diperbarui. Klik kartu menampilkan bio; klik lagi pada kartu mengembalikan profil. Tombol kembali terpisah sudah dihapus, sedangkan tautan WhatsApp tetap menjadi tindakan tersendiri. Keyboard memakai Enter/Space pada kartu, lalu Tab ke WhatsApp saat sisi bio terbuka. Tinggi kartu mengikuti isi bio.

## Scheduler project

Tambah nama pekerjaan, penanggung jawab dari tim, tanggal mulai dan tenggat. Klien, ID project dan catatan opsional. Status: direncanakan, dikerjakan, ditinjau, selesai. Tenggat tidak dapat mendahului tanggal mulai. Kalender menampilkan rentang pekerjaan; pilih tanggal untuk agenda, gunakan filter status dan tombol bulan. Edit jadwal untuk menjadwal ulang. Administrator dapat menghapus jadwal.

Tanggal kalender mengikuti WIB dan berupa tanggal tanpa jam. Scheduler adalah perencanaan internal; tidak ada notifikasi otomatis, integrasi kalender, atau pengiriman WhatsApp otomatis.

## Hak akses dan data

Admin dan editor dapat mengelola konten, galeri, jadwal, dan tindak lanjut pesan. Hanya admin mengelola pengguna dan penghapusan. Sesi kedaluwarsa setelah 8 jam. Login dibatasi percobaannya. Semua mutasi memeriksa asal permintaan dan input. Konflik penyimpanan dari tab lain ditolak agar editor memuat versi baru terlebih dahulu.

Unggahan publik adalah gambar. Teks alternatif wajib; file divalidasi dengan decoder gambar dan diubah menjadi WebP. Data konsultasi dan jadwal tidak dapat dibaca dari API tanpa sesi staf. Pengunggahan ke Blob tetap memerlukan token server; token tidak diteruskan ke browser.

CMS menggunakan tabel `studio_documents`, `studio_globals`, `studio_users`, `studio_sessions`, `studio_revisions`, dan tabel pembatas login. Tidak ada dependensi runtime Payload. Arsip sumber dan backup migrasi berada di `.local/`, diabaikan Git. Migrasi legacy hanya dijalankan melalui `npm run db:import-legacy`, dengan backup privat yang sesuai; instalasi baru menggunakan `npm run db:migrate`.

## Visual dan keterbatasan verifikasi

Antarmuka Studio adalah ruang kerja navy/putih dengan navigasi responsif, pencarian konten, filter status, keadaan kosong yang menjelaskan tindakan berikutnya, form edit, dan kalender. Ringkasan kosong tidak diisi project atau jadwal fiktif. Editor artikel mendukung judul, paragraf, tebal, miring, daftar, dan tautan dengan sintaks yang dijelaskan pada kolom. Rich text lama tetap utuh sampai isi diubah.

Elemen layanan publik memakai Three.js dengan geometri, material, pencahayaan, dan bayangan. Mouse/keyboard dapat memutar model. Di perangkat sentuh, tombol Putar objek mengaktifkan interaksi supaya halaman tetap dapat digulir. Reduced motion menonaktifkan gerak otomatis; gambar cadangan digunakan bila WebGL tidak tersedia. Pengujian sentuh dilakukan lewat emulasi Chrome, bukan seluruh perangkat fisik.
