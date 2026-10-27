# WaslaSalesReel — SFX lebih efisien

MP4 yang diminta disalin langsung ke **`C:/Users/jaela/Downloads/WaslaSalesReel-Revisi-SFX-v4.mp4`**. Salinan Downloads diverifikasi identik dengan ekspor `output/wasla-sales-reel-v4-sfx-rapi-15s.mp4` melalui SHA256.

## Perubahan sound design

- Cue utama dikurangi dari **27 menjadi 9**.
- Enam airy whoosh mempunyai puncak envelope pada cut visual frame **56, 92, 128, 201, 282, 345**; awal sweep delapan frame sebelum cut.
- Satu cue pembuka, satu kelompok tap untuk tiga kapsul (frame 223, 232, 241), dan satu klik CTA (frame 369).
- Musik asli kiriman pengguna tetap di depan. Tidak ada tambahan boom bass, klik setiap baris teks, glint dekoratif, atau sweep berulang selama scroll.
- Audio AAC dinaikkan ke 320 kbps agar detail sweep lembut bertahan setelah encoding.

Video 15 detik, portrait 1080 × 1920, 30 fps; tidak ada voice-over. Stream video disalin tanpa encoding ulang, dan hash H.264 identik dengan ekspor visual sebelumnya.

## Source aktif

- `scripts/prepare-sales-audio-v4.py`
- `public/audio/sales-v4/{music-main.wav,sfx-clean.wav,final-mix.wav,manifest.json}`
- `src/WaslaSalesReel.tsx` memakai dua track Html5Audio native untuk preview.

```powershell
.venv/Scripts/python.exe scripts/prepare-sales-audio-v4.py
npm run lint
node scripts/render-sales.mjs --audio-only
node scripts/verify-sales-v4-audio.mjs
```

`--audio-only` memakai video v3 yang tersedia di output atau Downloads, lalu mengganti track audio. `npm run render:sales` tanpa flag merender ulang dari source jika visual ikut diubah.

## QA

- ESLint dan TypeScript lulus.
- H.264 yuv420p, 450 frame, tepat 15 detik; AAC stereo 48 kHz, tepat 15 detik.
- Musik cocok dengan sumber pengguna (korelasi 0,999966); final mix cocok dengan MP4 (0,999819); residual efek setelah musik dikurangkan cocok dengan stem SFX (0,979986).
- Musik secara RMS 20,36 dB di atas stem efek. Loudness final -16,96 LUFS, true peak -1,74 dBTP, tanpa clipping.
- Salinan Downloads 7.082.202 byte; hash `b111986cbf15ca35637c85e135ddf942b48a43affb9f7b7da1e7d12fd5acef75`.
- Laporan: `output/sales-v4-verification.json`, `sales-v4-audio-verification.json`, `sales-v4-visual-preservation.json`, `sales-v4-download.json`, `sales-v4-loudness.log`.
