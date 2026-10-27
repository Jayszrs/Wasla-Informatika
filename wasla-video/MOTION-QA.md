# QA — Wasla Motion Reel 30 detik

Diperiksa 27 Oktober 2026, Asia/Jakarta.

## Hasil akhir

- `output/wasla-motion-reference-30s.mp4`: **30.000000 detik**, 1080×1920, 30 FPS, 900 frame, H.264/yuv420p Rec.709, AAC stereo 48 kHz, fast-start.
- File sound kiriman pengguna **tertanam dalam MP4**. Tidak ada voice-over atau track TTS dari versi sebelumnya.
- ESLint dan TypeScript lulus. Seluruh 900 frame selesai dirender.
- 30 still komposisi diperiksa. Sesudah perapian artboard melayang, 30 frame juga didekode langsung dari MP4 akhir dan diperiksa melalui `output/motion-review/contact-final.jpg`.
- Nama/isi website asli, logo Wasla, dan URL penutup benar. Crop besar pada beberapa close-up merupakan bagian komposisi seperti referensi; logo dan URL akhir tetap utuh sampai frame 899.
- MP4 dibuka dan dimainkan di Chrome, metadata 1080×1920 / 30 detik, `readyState=4`, `muted=false`, tanpa error media. Snapshot playback di `output/motion-playback.png`.

## Referensi dan kesesuaian gerak

Referensi Pinterest berhasil diperiksa melalui REA, lalu video publik 15,867 detik dianalisis lewat 32 frame. Lihat `MOTION-REFERENCE.md` untuk Evidence ID, sumber, serta pemetaan gaya.

Adaptasi meliputi bidang warna polos, rotasi perspektif HP, close-up yang membesar, artboard UI melayang, headline besar, potongan cepat, dan penutup logo pada latar warna. Seluruh layar memakai portofolio Wasla; tidak ada logo, maskot, screenshot aplikasi, atau footage Moolah dalam video akhir. Kesamaan merupakan penilaian arah visual dan gerakan, bukan klaim identik secara piksel.

## Audio dan sinkronisasi

- Korelasi PCM antara WAV musik siap render dan audio AAC final: **0,999409**, menunjukkan sound hadir dan tersinkron sepanjang video.
- 24 cut utama dibandingkan dengan onset spectral-flux file pengguna dan pengulangan audio. Selisih maksimum **17,33 ms**, di bawah satu frame pada 30 FPS. Hop analisis sekitar 10 ms; onset bukan label beat musikal dengan akurasi sampel.
- Loop memakai overlap equal-power sekitar **0,707 detik** pada titik 14 dan 28 detik. Rekaman asli tidak ditimpa.
- Loudness MP4 final **-16,86 LUFS**, true peak **-0,93 dBTP**, LRA **4,40 LU**. Puncak PCM mono terdekode **-1,55 dBFS**. Tidak clipping.
- Normalisasi dan fade tidak mengubah susunan visual. Audio final dienkode langsung dari WAV agar tidak dikompresi AAC berulang.

Laporan: `output/motion-verification.json`, `output/motion-ffprobe.json`, `output/motion-audio-verification.json`, `output/motion-loudness.log`.

SHA-256 MP4: `79a554d0f008a029a751be914f550493943b60bdf9b03ebe8ea01e7724773094`.
