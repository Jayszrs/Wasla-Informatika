# QA — Wasla landscape promo

Output: `output/wasla-landscape-reference-27s6.mp4`.

- ESLint dan TypeScript lulus.
- FFprobe memverifikasi H.264 yuv420p, 1920 × 1080, 60 fps, 1656 frame, durasi video/container tepat 27,6 detik. Audio AAC stereo 48 kHz, durasi stream tepat 27,6 detik.
- 25 frame dari seluruh urutan diekstrak dari MP4 dan diperiksa: pembuka, split panel, strip karya, floating cards, grid miring, teks proses, kapsul, bola, showcase website, tiga warna tipografi, kota, globe dan kontak terakhir.
- Kartu proyek pada showcase tetap berada di dalam viewport yang dibulatkan. Pemeriksaan piksel di frame 975 dan 1655 memastikan revisi mastering audio tidak mengubah video yang sudah diperiksa.
- Musik MP4 dibandingkan dengan WAV hasil persiapan: korelasi 0,999085; tidak ada voice-over. Loudness AAC final -18,76 LUFS, true peak -1,90 dBTP, tanpa clipping; fade akhir 350 ms.
- Selisih 256 sample pada audio hasil decode merupakan padding AAC; durasi presentasi stream tetap 27,6 detik.
- Chrome memuat dan memutar MP4 sampai selesai pada 27,6 detik (ended=true), dengan audio aktif, readyState 4, resolusi 1920 × 1080 dan tanpa media error.
- Aset brand dan website berasal dari Wasla. Kota merupakan latar ilustratif ImageGen; ikon/globe dari SVG asli. Footage atau musik referensi Pinterest tidak dimasukkan ke output maupun ZIP.
- Integrasi Higgsfield terakhir diperiksa: tersedia tetapi belum terpasang/terhubung. Tidak ada klaim bahwa video diproses di Higgsfield. Brief lanjut disertakan.

Laporan terstruktur:

- `output/landscape-verification.json`
- `output/landscape-ffprobe.json`
- `output/landscape-audio-verification.json`
- `output/landscape-loudness.log`

Visual QA: `output/landscape-final-contact.jpg`; preview: `output/landscape-preview.jpg`.
