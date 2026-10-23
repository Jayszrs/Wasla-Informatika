# Domain wasla.my.id — status pengaturan

Tanggal pemeriksaan: 23 Oktober 2026.

- Domain wasla.my.id sudah ditambahkan ke project Vercel waslainformatika, scope jae-f2e1, akun tujuan yang telah diverifikasi.
- Kepemilikan diterima Vercel; konfigurasi DNS belum valid.
- Registrar yang terlihat pada browser: TTM Host, halaman pengelolaan domain https://member.ttmhost.co.id/clientarea.php?action=domaindetails&id=803.
- DNS Management di panel merupakan add-on berbayar (Rp65.000 saat diperiksa). Add-on tidak dibeli.
- Jalur gratis yang disiapkan: nameserver ns1.vercel-dns.com dan ns2.vercel-dns.com.
- Form nameserver telah diisi, tetapi penyimpanan mengembalikan halaman login karena sesi registrar habis. Belum ada bukti perubahan nameserver tersimpan. Pemeriksaan Vercel terakhir masih membaca ns1.ttmhostjaya.my.id dan ns2.ttmhostjaya.my.id.

## Langkah berikutnya

Pemilik masuk kembali pada panel TTM Host. Pilih wasla.my.id ? Nameservers ? nameserver kustom; isi dua nameserver Vercel di atas dan simpan. Perubahan DNS dapat membutuhkan waktu propagasi; keberhasilan harus diverifikasi dari Vercel dan HTTPS, bukan hanya tombol simpan.

Vercel menyediakan alternatif record A jika pemilik memilih DNS hosting lain: pemeriksaan `domains verify` memberikan 216.198.79.1 dan 64.29.17.1 untuk @, serta fallback 76.76.21.21. Jangan mengubah MX/TXT atau layanan email yang tidak terkait. Karena add-on DNS saat ini belum aktif dan domain baru tidak menyajikan jawaban DNS yang valid, jalur nameserver gratis dipilih.

Setelah DNS/HTTPS valid, ubah NEXT_PUBLIC_SITE_URL produksi ke https://wasla.my.id lalu deploy ulang untuk canonical, sitemap dan Open Graph. Akses kontak menerima origin kedua alamat Wasla; alamat vercel.app tetap dapat digunakan selama proses sambungan. Jangan menandai domain siap sebelum pemeriksaan HTTPS berhasil.
