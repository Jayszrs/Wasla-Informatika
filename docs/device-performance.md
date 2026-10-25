# Pengukuran pemuatan awal perangkat 3D

Perbandingan lokal 23 Oktober 2026 memakai Chrome, viewport 390×844, cache browser nonaktif, context baru pada setiap percobaan, CPU slowdown 4×, latency 80 ms dan unduhan 500.000 byte/detik. Masing-masing versi diambil tiga kali. Server dan jaringan produksi tidak diwakili oleh pengukuran ini.

| Ukuran | Sebelum | Sesudah |
| --- | ---: | ---: |
| Median Largest Contentful Paint | 2.228 ms | 1.648 ms |
| Transfer JavaScript saat tiba | 186.871 byte | 187.332 byte |
| Canvas WebGL pada viewport hero | 0 | 0 |

Tambahan JavaScript awal 461 byte (sekitar 0,25%). Tiga pengukuran sesudah adalah 2.240, 1.648 dan 1.464 ms. Hasil ini tidak menunjukkan regresi arrival dalam profil tersebut; perbedaan waktu bukan janji peningkatan yang sama pada semua perangkat atau koneksi.

Runtime perangkat diimpor saat elemen masuk viewport melalui IntersectionObserver dan idle scheduling. Gambar asli tetap terlihat sebelum model siap. Empat renderer perangkat menjadi batas bersamaan; renderer keluar layar dilepas, pixel ratio dibatasi 1,25, tekstur maksimal 1.536 piksel pada desktop dan 1.024 pada layar kecil. Keyboard memakai instancing, tanpa HDR environment atau bayangan realtime. Frame tambahan hanya berjalan saat input/resize/scroll mengubah orientasi; tidak ada putaran idle terus-menerus. Reduced motion mempertahankan geometri dan menghentikan gerak otomatis.

Manifest: `.impeccable/review/device-performance-before.json` dan `device-performance-after.json`. Tes browser terpisah memeriksa render tekstur, pergerakan, batas renderer, pelepasan offscreen, galeri, CMS biography/photo dan toggle kartu dua arah. Ini bukan skor Lighthouse atau pemantauan produksi jangka panjang.

## Pemeriksaan lanjutan 25 Oktober 2026

Profil yang sama diulang tiga kali setelah perbaikan grid/poster: LCP 1.692, 1.272 dan 1.324 ms, median 1.324 ms; transfer JavaScript awal 187.434 byte; nol canvas WebGL di hero. Manifest `device-performance-transparent.json` mencatat profil dan waktu setiap pengukuran. Ini pengukuran lokal tambahan, bukan eksperimen terkontrol lintas dua hari atau jaminan kecepatan produksi. Perbaikan framing tekstur setelah pengukuran hanya berjalan saat perangkat masuk viewport; tidak mengubah hasil arrival historis yang dicatat ini.

Modul dipanaskan saat jarak elemen 140px dari viewport, tetapi alokasi renderer hanya dimulai pada intersection viewport nyata (0px). Sumber desktop/HP didekode paralel dari `currentSrc` dalam objek Image tanpa srcset agar ukuran piksel tekstur konsisten pada semua lebar. Renderer dibatasi empat, pelepasan menunggu grace 350ms, dan frame terakhir disimpan sebagai poster WebP agar gulir ulang tidak kembali ke bentuk fallback berbeda. Poster dibersihkan saat sumber project berubah.
