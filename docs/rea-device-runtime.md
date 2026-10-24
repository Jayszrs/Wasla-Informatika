# Evidence runtime perangkat 3D

REA menjalankan browser Chrome sementara milik provider, membuka detail project Catatan Mengaji pada server lokal, lalu menunggu `.detail-visual canvas[data-rendered3d=true]` menjadi terlihat. Capture mencakup URL, DOM dan screenshot dengan reduced motion aktif pada viewport 1440×900.

Evidence: `ev_11e220b05a78624a9c40c26f84e0399442cb64e55781576ad8742831cb6dcd2e`. Langkah navigasi dan penantian selesai; completeness `complete`; browser sementara ditutup (`terminated-owned-process`). Tidak ada login, token, body jaringan, atau akses akun pihak lain dalam skenario ini.

Capture menunjukkan screenshot project asli pada model laptop dan HP dengan depth dan frame nyata. Ini adalah bukti render pada satu rute dan satu ukuran, bukan pengukuran performa atau bukti bahwa semua model bereaksi terhadap semua input. Tes browser terpisah memeriksa tekstur, galeri, pointer, reduced motion dan pelepasan renderer. Pengukuran cold arrival menggunakan profil jaringan/CPU yang disebutkan dalam laporan performa, bukan durasi startup browser REA.
