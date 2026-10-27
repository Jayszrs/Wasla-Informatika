# WaslaSalesReel — revisi gaya Landscape Promo

Audio versi aktif sudah dikoreksi pada [SALES-AUDIO-V3.md](SALES-AUDIO-V3.md); gunakan generator dan verifier v3 untuk ekspor terbaru. Catatan mixing dan QA di bawah mendokumentasikan versi 2.

Versi aktif `WaslaSalesReel`: portrait 1080 × 1920, 30 fps, tepat 450 frame / 15 detik. Teks sales bahasa Indonesia, musik kiriman pengguna, tanpa voice-over. Gaya mengikuti komposisi lokal `WaslaLandscapePromo`: charcoal, cahaya cyan lembut, teks kinetik merah/teal, kapsul fitur, objek glossy dan chip konsultasi kaca.

Portofolio hanya tampil pada **satu adegan scroll**, frame 128–200, yaitu 4,267–6,700 detik (2,433 detik). Keenam screenshot website Wasla bergerak dalam dua kolom berlawanan arah, tanpa nama atau penjelasan proyek. Tidak ada screenshot portofolio di adegan lainnya.

| Waktu | Isi |
|---|---|
| 0–1,867 dtk | “Jasa pembuatan website. Bisnismu layak tampil meyakinkan.” — teks masuk bergantian dan panel kode kaca berputar |
| 1,867–4,267 dtk | “Website.” → “Berkelas.” — tipografi besar, perubahan warna dan teks berulang |
| 4,267–6,700 dtk | Satu scroll portofolio, enam website asli, cursor bergerak |
| 6,700–9,400 dtk | “Dirancang untuk bisnismu.” — kapsul “Desain custom”, “Responsif”, “Siap online” |
| 9,400–11,500 dtk | “Dari ide, sampai online.” — bola glossy, ring dan panah naik |
| 11,500–15 dtk | Logo Wasla, “Waktunya punya website.”, “Konsultasi sekarang”, wasla.my.id |

## Sound design

27 cue SFX pendek, seluruhnya dibuat secara prosedural dan orisinal dengan seed tetap: airy whoosh, reverse sweep, scroll sweep, impact lembut, klik kaca, tap dan glint. Tidak memakai efek meme, narasi, atau rekaman pihak ketiga.

Cue diselaraskan ke pergantian teks, scene scroll, masuknya masing-masing kapsul, bola dan CTA. Panning stereo bergerak pada sweep. Musik turun sedikit pada pergantian besar agar SFX terbaca, lalu kembali; fade akhir 350 ms. Music dan SFX memiliki stem terpisah untuk preview dan remix.

- `public/audio/sales-v2/music-bed.wav`
- `public/audio/sales-v2/sfx-stem.wav`
- `public/audio/sales-v2/final-mix.wav`
- `public/audio/sales-v2/manifest.json` — semua cue, frame, level dan pan
- `public/audio/sales-v2/{whoosh,reverse,scroll,impact,click,tap,glint}.wav` — bunyi dasar

Generator: `scripts/prepare-sales-v2-audio.py` (NumPy dan Python bawaan virtualenv proyek). Sumber musik tetap `public/audio/reel/music-15s.wav`, yang dibuat dari MP3 pengguna dengan penyesuaian tempo ringan dan pitch dipertahankan. Tidak ada loop musik tambahan pada versi 15 detik ini.

## Preview / ekspor

Studio: http://localhost:3040/WaslaSalesReel

```powershell
.venv/Scripts/python.exe scripts/prepare-sales-v2-audio.py
npm run lint
npm run review:sales
npm run render:sales
node scripts/verify-sales-v2-audio.mjs
```

Output revisi: `output/wasla-sales-motion-v2-15s.mp4`. MP4 v1 tetap tersedia pada `output/wasla-website-sales-15s.mp4`; source scene v1 dipertahankan di `src/sales/Scenes.tsx`. Source aktif v2: `src/sales/StudioScenes.tsx` dan `src/WaslaSalesReel.tsx`.

## QA hasil ekspor

- ESLint dan TypeScript lulus.
- H.264 yuv420p, 1080 × 1920, 30 fps, 450 frame; container, video, dan audio tepat 15 detik. AAC stereo 48 kHz.
- 23 frame hasil encoding diperiksa di semua scene, termasuk scroll dan frame penutup. Teks utama, fitur, logo dan URL tidak terpotong. Dua frame kritis dibandingkan ulang setelah mastering audio; piksel video tidak berubah.
- Portofolio hanya di scene 03, selama 73 frame / 2,433 detik. Enam proyek nyata muncul dalam scroll tanpa perkenalan.
- Korelasi MP4 dengan final mix: 0,999521. Setelah musik dikurangkan, korelasi residual MP4 dengan stem SFX: 0,989891, memverifikasi efek benar-benar masuk dan tetap sinkron setelah encoding.
- Loudness hasil AAC -18,35 LUFS, true peak -1,92 dBTP, tanpa clipping. Stem SFX rata-rata -34,13 dBFS dengan transien yang lebih jelas, musik turun pada transisi utama.
- Laporan: `output/sales-v2-verification.json`, `output/sales-v2-audio-verification.json`, `output/sales-v2-ffprobe.json`, `output/sales-v2-loudness.log`.
- Preview: `output/sales-v2-preview.jpg`; contact sheet: `output/sales-v2-final-contact.jpg`.
- Chrome memutar MP4 sampai selesai pada 15 detik (ended=true), audio aktif, readyState 4, resolusi 1080 × 1920, dan tanpa media error.
