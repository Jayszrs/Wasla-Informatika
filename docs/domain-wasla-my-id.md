# Domain wasla.my.id ? aktif

Diverifikasi 23 Oktober 2026 pada project Vercel `waslainformatika`, scope `jae-f2e1`.

Website: **https://wasla.my.id**. Dashboard: **https://wasla.my.id/admin**.

## Konfigurasi tersimpan

Nameserver kustom berhasil disimpan melalui panel TTM Host setelah pemilik masuk kembali:

- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

Panel menampilkan ?Perubahan Berhasil Disimpan!?. DNS Management berbayar tidak dibeli; DNS dikelola melalui Vercel. Bukti panel: `.impeccable/review/domain-nameservers-saved.jpg`.

## Bukti domain berfungsi

- Resolver Cloudflare `1.1.1.1` dan Google `8.8.8.8` mengembalikan kedua nameserver Vercel.
- Vercel `domains verify`: `configured-correctly`, kepemilikan pada scope aktif, tanpa konflik konfigurasi.
- Sertifikat berhasil diterbitkan. Permintaan HTTPS dengan validasi TLS aktif mengembalikan HTTP 200.
- `NEXT_PUBLIC_SITE_URL` produksi sudah `https://wasla.my.id`.
- Deployment `dpl_7pH59fqvSkobj1h4sN7kTJssrZwT` sudah dipromosikan; canonical homepage, sitemap dan robots menunjuk domain baru.
- Login Studio, unggah Blob, penyimpanan jadwal, formulir konsultasi dan tampilan desktop/mobile lulus pengujian pada domain baru.

Laporan mesin: `.impeccable/review/domain-production-verification.json` dan `.impeccable/review/studio-production-verification.json`. Jawaban A dapat berbeda antar resolver karena routing edge Vercel. Jangan mengganti record hanya karena alamat edge berbeda.

Alamat `waslainformatika.vercel.app` tetap tersedia sebagai alias. Nama `www` tidak dikonfigurasi pada pekerjaan ini. Jika kelak menambahkan email domain, kelola record MX/TXT melalui DNS Vercel.
