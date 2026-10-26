# Wasla Informatika - proyek video

Versi terbaru: **Scroll Reel 35 detik, tanpa VO**, komposisi `WaslaScrollReel`. File: `output/wasla-scroll-reel-35s.mp4`. Panduan, sumber, dan status musik: [REEL.md](REEL.md). Pemeriksaan: [REEL-QA.md](REEL-QA.md).

## Versi company profile 60 detik sebelumnya

Revisi kedua: video portrait 1080 ? 1920, 30 FPS, 1800 frame, narasi Indonesia, musik dan efek orisinal. File akhir: `output/wasla-informatika-portfolio-60s.mp4`.

## Isi video

| Waktu | Adegan |
| --- | --- |
| 00?04 | Pembuka dengan karya asli |
| 04?10 | Wasla Informatika |
| 10?18 | Cimuning Digital Hub |
| 18?26 | Fazma Stone |
| 26?34 | Mahameru Baja Indonesia |
| 34?42 | Ngaji Yuk! |
| 42?46 | IPNU Kota Bekasi dan SIT Permata Hati Bekasi |
| 46?53 | Konsultasi, desain, pengembangan, peluncuran |
| 53?60 | Konsultasi / wasla.my.id |

Screenshot portofolio adalah tangkapan website asli, bukan UI fiktif. Empat proyek utama mendapat delapan detik masing-masing, dengan desktop, mobile, dan halaman detail. Tidak ada klaim hasil bisnis atau jumlah klien baru.

## Preview

Jalankan dari folder `wasla-video`, Node.js 22.13+ (dipakai: 22.23.4).

```powershell
npm ci
npm run dev -- --port=3040
```

Buka http://localhost:3040/WaslaCompanyProfile dan gunakan zoom **Fit** agar seluruh portrait terlihat. Timeline memiliki sembilan adegan bernama dan sembilan narasi terpisah.

## Render dan verifikasi

```powershell
npm run lint
npm run render
npm run verify
npm run review
node scripts/review-encoded.mjs
```

`npm run render` menghasilkan master Remotion, kemudian MP4 akhir H.264/yuv420p Rec.709 dengan AAC stereo 48 kHz, fast-start, dan durasi container/audio/video tepat 60 detik. Konfigurasi output berada di `video-spec.json`.

Chrome di lokasi standar Windows dipakai otomatis; lokasi lain dapat diberikan melalui `CHROME_PATH`. Remotion dapat menyediakan browser resmi jika Chrome tidak tersedia. FFmpeg dan ffprobe memakai paket binary Remotion, atau jalur `FFMPEG_PATH` / `FFPROBE_PATH`.

## Sumber untuk revisi

- `src/film/`: semua adegan aktif, mockup perangkat, data proyek dan tipografi revisi.
- `src/WaslaCompanyProfile.tsx`: urutan dan durasi adegan.
- `src/components/AudioManager.tsx`: timeline audio.
- `public/projects/`: tangkapan situs asli beserta `.source.json`.
- `public/audio/v2/`: VO, musik, efek, dan manifest durasi aktual.
- `NARASI.md`: naskah final; `ASSETS.md`: sumber aset; `QA.md`: verifikasi.

Semua aset sudah lokal; render ulang tidak membutuhkan TTS atau akses website publik. `src/scenes/` adalah sumber versi 30 detik terdahulu dan tidak dipakai komposisi aktif. Export lama dipertahankan di `output/previous-30s/`.

## Membuat ulang audio

```powershell
python -m venv .venv
.venv/Scripts/python.exe -m pip install -r requirements-audio.txt
.venv/Scripts/python.exe scripts/prepare_audio_v2.py --refresh
npm run render
```

Generasi narasi memerlukan internet ke Edge TTS. Suara Indonesia Ardi, pitch -2 Hz, tempo 0 sampai +8%. Tanpa `--refresh`, script menggunakan ulang klip yang durasinya sudah terukur. Script Python memakai jalur binary Windows x64; sesuaikan `BIN` untuk OS lain.

Remotion dikunci ke 4.0.539. Skill resmi tersedia di `.agents/skills/`, dipasang menggunakan `npx remotion skills add`. Paket sumber/aset: `output/wasla-video-portfolio-60s-project.zip`, tanpa node_modules dan virtual environment.
