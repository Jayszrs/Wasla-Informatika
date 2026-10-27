# Wasla — iklan jasa pembuatan website (15 detik)

**Catatan versi 1.** `WaslaSalesReel` sekarang memakai revisi bergaya Landscape Promo dengan satu scene scroll dan SFX: [SALES-V2.md](SALES-V2.md). Perintah `render:sales` mengekspor revisi terbaru ke nama berkas baru. MP4 versi 1 tetap disimpan pada nama lama.

Komposisi `WaslaSalesReel`, 1080 × 1920, 30 fps, tepat 450 frame. Fokus pada penawaran jasa dan ajakan konsultasi. Tidak ada narasi suara, judul portofolio, atau pengenalan klien.

| Waktu | Pesan / visual |
|---|---|
| 0–1,87 dtk | “Bisnis udah jalan. Websitenya udah ada?” |
| 1,87–4,27 dtk | “Bikin website. Bikin dilirik.” — HP dan browser bergerak |
| 4,27–6,30 dtk | “Rapi di laptop. Nyaman di HP.” |
| 6,30–7,70 dtk | Kilasan karya 1,4 detik, tanpa perkenalan atau penjelasan |
| 7,70–10,77 dtk | “Jasa pembuatan website custom. Sesuai bisnismu. Dari ide sampai siap online.” |
| 10,77–15 dtk | Wasla, “Yuk, bikin websitemu.”, “Konsultasi sekarang”, wasla.my.id |

Semua layar berasal dari screenshot proyek Wasla yang sudah tersedia di proyek. Tidak ada harga, testimoni, angka penjualan, atau janji peringkat pencarian yang ditambahkan.

Arahan visual melanjutkan referensi Pinterest pengguna: warna bidang penuh, tipografi besar, perubahan warna mengikuti onset musik, perspective phone, dan browser pop-out. Tidak memakai logo, UI, atau footage milik video referensi.

Sound memakai `public/audio/reel/user-sound.mp3` dari pengguna. Rekaman lengkap disesuaikan dari 14,707 ke 15 detik menggunakan `atempo`, mempertahankan pitch, tanpa pengulangan; fade pendek dan normalisasi loudness. Tidak ada voice-over.

Preview: `http://localhost:3040/WaslaSalesReel`.

```powershell
node scripts/prepare-sales-audio.mjs
npm run lint
npm run review:sales
npm run render:sales
node scripts/verify-sales-audio.mjs
```

Output final: `output/wasla-website-sales-15s.mp4`. Versi video terdahulu tetap tersedia sebagai komposisi terpisah. Laporan pemeriksaan: `output/sales-verification.json`, `output/sales-audio-verification.json`.

## Pemeriksaan hasil ekspor

- Lint dan TypeScript lulus.
- H.264 yuv420p, 1080 × 1920, 30 fps, 450 frame; durasi container/video/audio tepat 15 detik; AAC stereo 48 kHz.
- Frame MP4 hasil encoding diperiksa pada pembuka, penawaran, manfaat, dua kilasan karya, website custom, CTA, dan frame terakhir. Teks utama tidak terpotong; frame terakhir mempertahankan URL dan ajakan konsultasi.
- Korelasi musik MP4 dengan WAV yang disiapkan: 0,999481. Pemeriksaan loudness hasil AAC: -16,29 LUFS, true peak -0,86 dBTP, tanpa clipping.
- Enam cut berada dalam 14,48 ms dari estimasi onset sumber yang disesuaikan dengan tempo. Ini pemeriksaan onset spektral, bukan klaim analisis beat sampel presisi.
- MP4 dimuat dan sempat diputar di Chrome dengan audio aktif, readyState 4 dan tanpa media error. Pengamatan terakhir paused pada 5,15 detik; tidak mengklaim pemutaran browser sampai selesai. Frame terakhir diverifikasi dari MP4.
