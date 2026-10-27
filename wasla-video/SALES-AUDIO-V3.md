# WaslaSalesReel — koreksi sound asli

Video aktif: `output/wasla-sales-motion-v3-sound-asli-15s.mp4`. Visual v2 tetap sama: 15 detik portrait, satu scene scroll portofolio. Revisi ini memajukan musik kiriman pengguna dan memperbaiki pemutaran preview Studio.

## Sumber dan perubahan

- MP3 asli: `C:/Users/jaela/Downloads/original sound - camrift_musicaldown.com_1793071686.mp3`.
- Salinan proyek `public/audio/reel/user-sound.mp3` identik dengan file tersebut: SHA256 `1a53fcd54f2759f523fb9df0febadb2448f4cf9aae78ca212975577bc6bf1f75`.
- Musik utama tetap berasal dari MP3 tersebut, disiapkan ke 15 detik dengan pitch dipertahankan. Musik dimajukan, SFX pendukung diturunkan; duck musik diperkecil dari 21% menjadi 4% pada pergantian besar.
- Preview memakai `Html5Audio` dengan pemutaran native (`useWebAudioApi=false`), volume 1, dan URL aset v3 baru. Dua track dapat diperiksa langsung dari elemen audio browser.
- Nama track Studio: “SOUND ASLI KIRIMAN - camrift - musik utama”. SFX tetap track terpisah dan tidak ada voice-over.
- Versi WAV/MP4/ZIP v2 tetap dipertahankan terpisah.

## Verifikasi

- ESLint dan TypeScript lulus.
- MP4 H.264 + AAC stereo 48 kHz, 1080 × 1920, 30 fps, 450 frame; durasi audio dan video tepat 15 detik.
- Korelasi track utama dengan musik pengguna yang disiapkan: 0,999966. Korelasi final mix dengan audio MP4: 0,999482. Musik secara RMS 19,54 dB di atas stem SFX.
- Loudness MP4 -16,86 LUFS, true peak -1,04 dBTP, tanpa clipping.
- Studio diuji dari awal lewat tombol Play: kedua audio ter-load, readyState 4, paused=false, muted=false, currentTime berjalan sejajar, tanpa media error.
- MP4 final diputar di Chrome hingga 15 detik (ended=true), audio aktif dan tanpa media error.

## Menjalankan

```powershell
.venv/Scripts/python.exe scripts/prepare-sales-audio-v3.py
npm run lint
npm run render:sales
node scripts/verify-sales-v3-audio.mjs
```

Aset aktif: `public/audio/sales-v2/music-main-v3.wav`, `sfx-support-v3.wav`, `final-mix-v3.wav`, `manifest-v3.json`.

Studio: http://localhost:3040/WaslaSalesReel

Laporan: `output/sales-v3-verification.json`, `output/sales-v3-audio-verification.json`, `output/sales-v3-ffprobe.json`, `output/sales-v3-loudness.log`.
