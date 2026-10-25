# Diagnosis log Vercel 25 Oktober 2026

## Koreksi dan verifikasi rilis malam

Query CLI pada deployment uji `dpl_mbHFG9x2jRFtBFJPDFkscj532HNm` menemukan satu warning alias SSL pada `POST /api/contact` dengan respons 201. Perbaikan pagi menormalkan pool CMS, tetapi pool kontak terpisah masih memakai `DATABASE_URL` mentah. Jadi warning belum sepenuhnya hilang pada jalur kontak.

`src/backend/contact.ts` kini mengimpor pool utama dari `src/backend/database.ts`; tidak membuat koneksi TLS alternatif. Normalisasi `verify-full`, pemeriksaan sertifikat, pengelolaan pool serverless dan batas koneksi yang sama berlaku untuk kontak. Tidak ada warning yang disembunyikan atau verifikasi TLS yang dimatikan.

Rilis aktif `dpl_CJVQh6p3MVgQPzKM4TLevBvzoqYW` sudah melewati pengiriman konsultasi produksi dengan respons 201 dan fixture privat dibersihkan. Query `logs` deployment tersebut, level error, jendela 15 menit, limit 30, setelah alur produksi tidak mengembalikan record. Socket produksi terverifikasi terenkripsi/authorized/TLS 1.3. Hasil ini terbatas pada query dan alur yang diamati; log lama tidak dihapus dan tidak diklaim seluruh histori selalu bersih.

## Diagnosis dan batas bukti rilis pagi

Screenshot pemilik menunjukkan peringatan Node dari `pg-connection-string` tentang alias SSL `prefer`, `require`, dan `verify-ca`. Driver saat ini memperlakukan alias itu sebagai verifikasi penuh, tetapi memperingatkan perubahan makna pada versi mayor mendatang. Peringatan ditulis ke stderr, sehingga tampak merah pada Runtime Logs. Pesan itu sendiri tidak membuktikan HTTP 500 atau kegagalan koneksi database.

Perbaikan di `src/backend/database-connection.ts` menormalkan alias tersebut ke `verify-full`, mempertahankan verifikasi sertifikat dan hostname yang berlaku. Tidak ada `rejectUnauthorized=false`, pemadaman TLS atau penekanan global terhadap warning. Pilihan lokal tanpa TLS dan konfigurasi libpq eksplisit tetap dihormati. Lima tes unit termasuk pemeriksaan normalisasi mode lulus.

Koneksi produksi diuji dengan URL runtime yang sudah tersedia. Query berhasil; socket terenkripsi, sertifikat authorized, protokol TLS 1.3. Pemeriksaan dilakukan pada socket klien karena `pg_stat_ssl` di belakang pooled proxy dapat menggambarkan hop proxy ke backend, bukan TLS klien ke endpoint Neon.

Rilis perbaikan: `dpl_5yZHwfwQdAtuk5i8DGiXGfSYvt4s`. Setelah promosi, halaman publik, media, login, scheduler dan formulir produksi berhasil melalui verifikasi HTTP/database/Blob yang dicatat di production-verification.md. Entri lama tidak dihapus; tetap dapat terlihat ketika dashboard mencakup deployment sebelumnya.

Batas pembacaan log: konektor Vercel menolak query dengan 403; fallback CLI akun tujuan dipakai dengan scope/project/deployment eksplisit. Query historis dan stream yang diakses tidak mengembalikan record yang dapat dianalisis dalam jendela pemeriksaan. Karena itu laporan ini **tidak** menyatakan semua event historis sudah diperiksa atau seluruh kategori error selalu nol. Bukti perbaikan warning spesifik berasal dari sumber driver, mode koneksi eksplisit, query TLS produksi dan alur aplikasi yang berhasil. File output CLI mentah tetap privat pada `.local/`, bukan disalin ke laporan publik.
