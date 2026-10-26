# QA revisi portofolio 60 detik

Diperiksa 27 Oktober 2026 (Asia/Jakarta).

## Perubahan dari versi 30 detik

- Durasi dua kali lebih panjang: 60 detik, 1800 frame.
- Enam website portofolio asli. Cimuning, Fazma Stone, Mahameru Baja dan Ngaji Yuk mendapat delapan detik masing-masing; IPNU dan SIT Permata Hati muncul pada rangkaian karya tambahan.
- Tidak menggunakan ilustrasi website fiktif dalam komposisi aktif.
- Mockup laptop dibangun ulang dengan viewport 1440:1000 sesuai screenshot.
- Layar smartphone mengikuti rasio gambar asli. Status bar, kamera dan home indicator terpisah dari screenshot. Tidak ada konten website tertutup notch.
- Screenshot mobile Cimuning diambil ulang tanpa banner pemberitahuan; lebar gambar sebenarnya 375 px, digunakan sebagai rasio viewport perangkat.
- Gerak perspektif, reveal tipografi, perpindahan fokus desktop/mobile, kursor/klik dan transisi halaman detail berbasis frame.
- Sembilan klip narasi Indonesia baru, serta musik dan efek orisinal 60 detik.

## Verifikasi

MP4 final diputar di Chrome sampai `currentTime=60`, `ended=true`, `readyState=4`; tidak ada error media. Frame penutup menampilkan logo dan URL. Bukti tersimpan di `output/playback-60s.png`.

ESLint dan TypeScript lulus. Render penuh 1800 frame berhasil. 45 still mencakup pembuka, seluruh batas adegan, setiap proyek dan penutup. Frame Cimuning dirender lagi setelah penyesuaian rasio screenshot. 17 frame didekode langsung dari MP4 akhir dan diperiksa melalui contact sheet `output/revision/contact-final-60s.jpg`; teks utama dan URL tidak terpotong. Logo dan URL bertahan hingga frame 1799.

FFprobe akhir: video/audio/container tepat **60.000000 detik**, **1080 ? 1920**, **30 FPS**, **1800 frame**, **H.264 / yuv420p / Rec.709**, **AAC stereo 48 kHz**, bahasa audio `ind`. Fast-start aktif.

Sembilan file VO sumber dibandingkan dengan audio MP4 pada waktu mulai aktualnya. Korelasi 0.99333?0.99576; seluruh narasi hadir, sinkron, dan berakhir sebelum batas adegannya. Ini verifikasi sinyal, bukan penilaian pendengaran manusia. Narasi terakhir selesai pada 58.9787s.

RMS musik 18.86?21.30 dB di bawah narator; pembuka lebih pelan karena fade-in. Analisis loudnorm pada MP4: **-14.98 LUFS**, **-2.67 dBTP**, LRA **5.00 LU**; tidak clipping. Puncak PCM mono terdekode **-2.67 dBFS**.

Detail: `output/verification.json`, `output/ffprobe.json`, `output/audio-mix-60s.json`, `output/audio-loudness-60s.log`.

SHA-256 MP4: `09ba1ecf4c22badb37f848829c9dcc71d4dfbe5c999644bbe5c3cf3660b6f88f`.

File final: `output/wasla-informatika-portfolio-60s.mp4`. Export sebelumnya disimpan di `output/previous-30s/`. Tidak ada unggahan ke media sosial atau perubahan produksi website dalam revisi video ini.
