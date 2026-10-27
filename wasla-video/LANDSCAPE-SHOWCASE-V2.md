# WaslaLandscapePromo — revisi showcase website

Revisi terfokus pada scene 09 `WebsiteShowcase`, global frame 930–1115 / detik 15,5–18,6. Komposisi tetap `WaslaLandscapePromo`, 1920 × 1080, 60 fps, 1656 frame / 27,6 detik.

## Perubahan

- Frame browser gelap dengan alamat `wasla.my.id` dan padding tipis.
- Screenshot utama ditampilkan utuh pada rasio aslinya, **1844:814**; tinggi viewport mengikuti gambar. Bidang putih kosong dan pergeseran gambar yang meninggalkan ruang bawah dihilangkan.
- Tiga kartu proyek memiliki baris terpisah di bawah screenshot utama, ukuran sama, jarak konsisten, dan masuk bergantian. Teks dan tombol pada screenshot utama tetap terlihat.
- Gerak kamera diperkecil: push-in ringan dengan rotasi perspektif kecil; batas layar tetap aman.
- Cursor diperkecil dari skala 1,25 menjadi 0,65, bergerak di sisi kanan, lalu fade sebelum cut berikutnya.
- Scene tetap 186 frame / 3,1 detik. Audio dan timing semua adegan tetap memakai susunan sebelumnya.

Source: `src/landscape/Portfolio.tsx`, fungsi `WebsiteShowcase`.

## Preview dan ekspor

Studio: http://localhost:3040/WaslaLandscapePromo — lihat frame **1050**, detik **17,5**.

```powershell
npm run lint
node scripts/review-landscape-showcase.mjs
npm run render:landscape
node scripts/verify-landscape-showcase-audio.mjs
```

Output revisi: `output/wasla-landscape-showcase-v2-27s6.mp4`. MP4 versi sebelumnya tetap berada di `output/wasla-landscape-reference-27s6.mp4`.

Cuplikan khusus scene yang direvisi: `output/wasla-landscape-showcase-v2-scene-3s1.mp4` (3,1 detik, 186 frame, termasuk audio).

## QA ekspor

- ESLint dan TypeScript lulus.
- FFprobe: H.264 yuv420p, 1920 × 1080, 60 fps, 1656 frame; video, audio dan container tepat 27,6 detik; AAC stereo 48 kHz.
- 11 frame MP4 diperiksa: sebelum masuk, masuk, beberapa posisi pertengahan, akhir showcase, cut berikutnya, dan frame terakhir video. Screenshot utama utuh, kartu memiliki baris terpisah, tidak ada bidang putih kosong atau teks utama yang tertutup kartu.
- Cuplikan scene terverifikasi tepat 3,1 detik / 186 frame, audio juga 3,1 detik.
- Musik hasil decode identik dengan ekspor sebelumnya (perbandingan SHA256 PCM); tidak ada perubahan audio dan tidak ada voice-over. Korelasi dengan WAV sumber tetap 0,999085.
- Preview frame 1050: `output/landscape-showcase-v2-preview.jpg`. Contact sheet hasil MP4: `output/landscape-showcase-v2-final-contact.jpg`.
- Laporan: `output/landscape-showcase-v2-verification.json`, `output/landscape-showcase-v2-ffprobe.json`, `output/landscape-showcase-v2-audio-verification.json`, `output/landscape-showcase-v2-audio-preservation.json`.
- Chrome memutar video lengkap sampai selesai pada 27,6 detik (ended=true), audio aktif, readyState 4, resolusi 1920 × 1080, dan tanpa media error.
