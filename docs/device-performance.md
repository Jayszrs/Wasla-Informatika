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
