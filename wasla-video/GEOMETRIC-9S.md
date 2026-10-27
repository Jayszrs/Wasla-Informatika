# Wasla geometric reel — 9 detik

Komposisi `WaslaGeometricReel`, portrait 1080 × 1920, 30 fps, 270 frame. Bahasa Indonesia, tanpa voice-over. Sound dari MP3 pengguna dipotong ke 9 detik pada tempo asli, dengan fade pendek dan normalisasi loudness.

Referensi pengguna: https://pin.it/1XOcr4ZmM — pin “Abstract shapes animation”, diperiksa melalui REA, evidence `ev_cf0e437bd4101cbfd22397cbe5461180e824946ae9af136e2e3b6c0494441d94`. Video sumber yang teramati berdurasi 67 detik dan berformat landscape. Versi Wasla mengambil bahasa gerak dan karakter abstraknya, dikomposisi ulang menjadi portrait 9 detik sesuai permintaan. Bukan pemotongan footage referensi.

Arahan: latar krem, tipografi sans hitam, kartu motif merah/kuning/hijau/biru, gerak menyebar, tumpukan diagonal, cascade, dan zoom kotak konsentris. Seluruh motif berupa SVG asli yang ditulis dalam proyek. Logo dan screenshot hanya dari Wasla; artwork dan musik referensi tidak disalin.

| Waktu | Isi |
|---|---|
| 0–1,57 dtk | Apa yang bikin bisnismu beda? |
| 1,57–2,67 dtk | Idemu. — bentuk mengelilingi teks |
| 2,67–3,57 dtk | Gayamu. — tumpukan kartu diagonal |
| 3,57–4,87 dtk | Websitemu. — cascade bentuk |
| 4,87–6,20 dtk | Kami wujudkan. — tunnel kotak biru |
| 6,20–6,57 dtk | Kilasan screenshot website asli, tanpa perkenalan |
| 6,57–9 dtk | Logo Wasla, jasa pembuatan website, URL dan mulai konsultasi |

```powershell
node scripts/prepare-geometric-audio.mjs
npm run lint
npm run review:geometric
npm run render:geometric
```

Studio: http://localhost:3040/WaslaGeometricReel

MP4: `output/wasla-geometric-9s.mp4`. Versi 15 detik dan versi sebelumnya tetap tersedia terpisah.

## Verifikasi ekspor

- ESLint dan TypeScript lulus.
- FFprobe: tepat 9 detik, 270 frame, 1080 × 1920, 30 fps; H.264 yuv420p dan AAC stereo 48 kHz; durasi audio tepat 9 detik.
- Sembilan frame dari MP4 diperiksa, termasuk setiap jenis visual dan frame terakhir. Teks utama, logo dan URL terbaca; tidak ada teks utama terpotong.
- Musik MP4 cocok dengan WAV yang disiapkan (korelasi 0,999431); tidak ada narasi suara. Loudness hasil AAC -16,75 LUFS, true peak -1,05 dBTP, tanpa clipping.
- Enam cut berada dalam 14 ms dari estimasi onset spektral sumber. Ini bukan label beat musik presisi sampel.
- Chrome berhasil memuat dan memutar MP4 dengan audio aktif, readyState 4, dan tanpa media error. Verifikasi durasi penuh dan frame terakhir dilakukan dari berkas hasil ekspor.

Laporan mesin: `output/geometric-verification.json`, `output/geometric-audio-verification.json`, `output/geometric-ffprobe.json`. Preview: `output/geometric-preview.jpg`.
