# Wasla — landscape branding promo

Revisi showcase terkini didokumentasikan di [LANDSCAPE-SHOWCASE-V2.md](LANDSCAPE-SHOWCASE-V2.md). Perintah `render:landscape` sekarang mengekspor ke `output/wasla-landscape-showcase-v2-27s6.mp4`; file MP4 sebelumnya tetap disimpan.

Permintaan: mengikuti referensi Pinterest terbaru dalam format landscape dengan teks bahasa Indonesia untuk Wasla. Komposisi `WaslaLandscapePromo`, 1920 × 1080, 60 fps, 1656 frame / 27,6 detik. Tidak ada voice-over. Sound berasal dari MP3 pengguna sebelumnya.

## Referensi yang diperiksa

- Link pengguna: https://pin.it/6GcErUN2D
- Pin teramati: https://id.pinterest.com/pin/1013521091153676958/
- Judul: “High-End Branding Promo Video | Motion Graphics & Visual Identity”.
- REA evidence: `ev_f1b9d32906575a3a9edf3bf46862bcff7eab79e8e32884080ddb461d3c1bdb30`.
- Sumber video: 736 × 414, 60 fps, 27,605011 detik. Output memakai durasi nominal 27,6 detik.
- Evidence ringkas: `output/reference-landscape/evidence.json`. Salinan video referensi hanya untuk analisis, tidak dimasukkan ke MP4 final atau ZIP proyek.

Urutan adegan, arah layout, kontras gelap/terang, susunan kartu, perspective, peralihan tipografi, globe dan chip kontak direkonstruksi di Remotion. Ini adaptasi dengan karya dan identitas Wasla; tidak diklaim identik piksel dengan footage asli. Logo, gambar karya, tulisan, dan sebagian ikon diganti sesuai Wasla. Tidak memakai aset brand studio dalam referensi.

## Timeline / teks Indonesia

| Detik | Adegan | Teks |
|---|---|---|
| 0–1,4 | Studio pada latar gelap dengan cahaya bawah | Studio oleh Wasla |
| 1,4–3,7 | Panel karya di kiri, teks di kanan, ring melintas | Tempat ide bermula / jadi nyata. |
| 3,7–6,3 | Deretan strip karya berwarna, kamera mendekat | Website, Desain, Bisnis, Digital, Custom, Responsif, Kreatif, Solusi |
| 6,3–8,7 | Enam kartu karya melayang | Dibuat untuk bisnismu. |
| 8,7–10,9 | Grid karya miring, cursor bergerak | Karya kami / Website. / Untuk bisnismu. |
| 10,9–11,8 | Teks besar pada gelap | Cara kami bekerja. |
| 11,8–14,5 | Tiga kapsul pada latar terang | Ide / Desain / Teknologi |
| 14,5–15,5 | Bola gelap | Bikin orang bilang “wah”. |
| 15,5–18,6 | Website Wasla dalam bidang perspektif | Website Wasla dan cuplikan proyek asli |
| 18,6–21,5 | Tiga perubahan warna dan teks berulang | Ide kreatif. / Desain berani. / Solusi digital. |
| 21,5–22,9 | Kota senja, kamera mendekat | Bawa bisnismu ke dunia digital. |
| 22,9–25,1 | Globe dan orbit karya | Visual koneksi digital |
| 25,1–27,6 | Chip kontak berkilau | Mulai konsultasi / wasla.my.id |

## Aset

- Screenshot karya: enam proyek nyata dalam `public/projects/`. Website Wasla: `public/screens/wasla-desktop.png`.
- Emblem asli Wasla: `public/brand/wasla-emblem-navy.webp`; wordmark dari komponen brand yang sudah ada.
- Globe, orbit, cursor, ring dan ikon merupakan SVG/CSS asli dalam source.
- Latar kota: `public/landscape/jakarta-twilight.png`, dibuat memakai **built-in ImageGen**, bukan Higgsfield atau fallback CLI. Gambar ini visual ilustratif hasil generasi, bukan foto dokumenter/lokasi kerja Wasla.

Prompt final gambar kota:

> Create one photorealistic cinematic establishing background for a premium Indonesian digital studio motion graphics promo. Very wide landscape 16:9 composition, drone view of Jakarta urban skyline at late twilight with a muted mauve pink sunset across the upper third, dark densely packed city below dotted with warm lights, distant skyscrapers silhouetted, realistic natural haze. Refined subdued photography, smooth clear sky leaving calm space for typography, no text, no logos, no borders, no people, no illustration. This is original artwork, not an image edit. Output a single wide image.

Musik: `public/audio/reel/music-landscape-27s6.wav`, dari rekaman pengguna dengan equal-power loop, durasi 27,6 detik, fade akhir 350 ms, loudness normalization dan gain akhir 0,75 untuk headroom transien AAC. MP3 sumber tetap disimpan utuh; tidak menggunakan audio referensi Pinterest.

## Higgsfield

Integrasi Higgsfield ditemukan melalui katalog plugin, tetapi pada pengerjaan versi ini belum terpasang/terhubung. Tidak ada proses yang dijalankan di akun Higgsfield dan tidak ada klaim koneksi berhasil. Integrasi telah ditawarkan kepada pengguna. Untuk memakai layanannya, pengguna perlu menambahkan Higgsfield dan login/menautkan akun. Brief lanjut tersedia dalam `HIGGSFIELD-LANDSCAPE-BRIEF.md`.

## Menjalankan dan mengekspor

```powershell
node scripts/prepare-landscape-audio.mjs
npm run lint
npm run review:landscape
npm run render:landscape
node scripts/verify-landscape-audio.mjs
```

Studio: http://localhost:3040/WaslaLandscapePromo

Final: `output/wasla-landscape-reference-27s6.mp4`.
