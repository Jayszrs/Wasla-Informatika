# Pemeriksaan video final

Diperiksa 27 Oktober 2026, Asia/Jakarta.

- ESLint dan TypeScript proyek video lulus.
- Studio aktif di port 3040, komposisi `WaslaCompanyProfile`.
- Render penuh 900 frame berhasil. Lima adegan dimulai pada frame 0 / 150 / 330 / 540 / 720.
- 23 snapshot dibuat, termasuk batas adegan dan frame 899. Lembar frame utama diperiksa untuk komposisi, teks, identitas, dan transisi. Pembuka berisi brand/browser; frame akhir mempertahankan logo, CTA, dan URL.
- Empat layanan menggunakan ilustrasi berbeda; konsep ditandai sebagai ilustrasi. Mockup Wasla menggunakan screenshot asli.
- FFprobe: video, audio, dan container **30.000000 s**; video **900 frame**, **1080 × 1920**, **30/1 FPS**, **H.264 / yuv420p**; audio **AAC stereo 48 kHz**.
- Bahasa audio `ind`. MP4 memakai fast-start.
- MP4 final diputar di Chrome melalui server lokal sampai `currentTime=30`, `ended=true`, `readyState=4`; frame penutup tampil dengan logo dan URL. Bukti di `output/browser-playback.png`.
- Kelima narasi didekode dan dibandingkan dengan audio final di waktu masing-masing. Korelasi 0,99298–0,99482 membuktikan narasi hadir dan sinkron; semua selesai sebelum batas adegan. Ini pemeriksaan sinyal, bukan penilaian pendengaran manusia.
- Musik **19,05 / 19,42 / 19,94 / 19,35 / 20,02 dB** di bawah RMS narasi per adegan.
- Analisis FFmpeg MP4 akhir: integrated loudness **-15,06 LUFS**, true peak **-3,31 dBTP**, loudness range **2,40 LU**. Tidak ada clipping. Puncak PCM mono **-3,32 dBFS**.

Narasi berakhir pada 4,6307 / 10,7107 / 17,7427 / 23,7347 / 29,8067 detik. Detail dan SHA-256 di `output/verification.json`; metadata di `output/ffprobe.json`.

Master Remotion memiliki padding AAC 16 ms dan full-range JPEG-derived YUV. Finalisasi mengubah video ke limited-range Rec.709 dan membuat ulang timeline AAC menjadi tepat 30 detik. Tidak ada pemotongan kalimat.

File akhir: `output/wasla-informatika-company-profile-30s.mp4`. `output/render-master.mp4` hanya perantara.
