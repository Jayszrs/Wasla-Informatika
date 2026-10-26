# QA Scroll Reel 35 detik

Diperiksa 27 Oktober 2026, Asia/Jakarta.

- ESLint dan TypeScript lulus.
- Komposisi `WaslaScrollReel` dirender penuh 1050 frame.
- FFprobe memastikan 1080×1920, 30 FPS, H.264, yuv420p, durasi tepat 35.000000 detik, fast-start.
- **Tidak ada track audio**: tidak ada voice-over, musik lama, atau musik Timeless tertanam.
- 36 still mencakup batas adegan, posisi scroll awal/akhir, pembuka dan frame penutup. 22 frame didekode langsung dari MP4 akhir; contact sheet diperiksa untuk keterbacaan nama, batas viewport dan penutup.
- Enam viewport dibandingkan pada awal/akhir scroll; rata-rata perubahan piksel 55,08–130,29 pada skala 0–255. Isi karya benar-benar bergeser dalam video, bukan hanya pergantian frame statis.
- Screenshot halaman panjang mempertahankan rasio sumber. Mahameru/SIT memakai artboard screenshot terpisah yang bergerak vertikal dengan celah yang jelas.
- Logo dan URL terlihat sampai frame 1049. Nama proyek berupa label; tidak ada paragraf penjelasan atau adegan proses kerja.
- Grid edit 120 BPM mengikuti referensi tempo. Fase beat belum diukur terhadap file musik lokal; tidak diklaim sebagai audio final yang sudah sinkron.
- Uji pemutar YouTube resmi mendapat error **150**, video tidak dapat diputar di embed. Kontrol putar bersama dinonaktifkan; kontrol video lokal dan tautan YouTube tetap tersedia. Pembatasan embed tidak dilewati.
- Video lokal diputar di Chrome sampai `currentTime=35`, `ended=true`, `readyState=4`, tanpa error media. Bukti di `output/reel-playback.png`.

Laporan mesin: `output/reel-verification.json`, `output/reel-ffprobe.json`, `output/reel-scroll-checks.json`.
Contact sheet akhir: `output/reel-review/contact-final.jpg`.

MP4 visual: `output/wasla-scroll-reel-35s.mp4`. Musik perlu ditambahkan melalui pustaka aplikasi unggahan, atau menggunakan rekaman lokal yang disediakan pengguna pada revisi berikutnya.
