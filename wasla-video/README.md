# Wasla Informatika — video company profile

Video motion graphic portrait dengan lima adegan, logo Wasla asli, screenshot wasla.my.id, ilustrasi orisinal, narasi Indonesia, musik dan efek suara orisinal.

File siap unggah: `output/wasla-informatika-company-profile-30s.mp4`.
Spesifikasi terverifikasi: **30,000 detik · 1080 × 1920 · 9:16 · 30 FPS · 900 frame · H.264 · AAC stereo 48 kHz**.

## Preview dan render ulang

Jalankan dari folder `wasla-video` dengan Node.js 22.13+ (yang dipakai: 22.23.4).

```powershell
npm ci
npm run dev -- --port=3040
```

Buka `http://localhost:3040/WaslaCompanyProfile`. Setiap adegan dan audio memiliki nama sendiri di timeline Studio.

```powershell
npm run lint
npm run render
npm run verify
```

Render menghasilkan master Remotion lalu MP4 akhir Rec.709/yuv420p, fast-start, dan timeline audio tepat 30 detik. Tahap final menghilangkan padding AAC 16 ms dari master. Chrome di lokasi standar Windows dipakai otomatis; lokasi lain dapat diberikan melalui `CHROME_PATH`. Remotion dapat mengunduh browser render resminya bila Chrome tidak tersedia.

FFmpeg/ffprobe memakai binary yang disertakan Remotion. `FFMPEG_PATH` dan `FFPROBE_PATH` dapat digunakan untuk instalasi lain. Remotion dikunci ke versi 4.0.539 dalam package-lock.

## Mengubah video

- `src/scenes/`: lima adegan, frame 0–149 / 150–329 / 330–539 / 540–719 / 720–899.
- `src/components/`: logo, mockup, tipografi, transisi, dan audio.
- `src/video/theme.ts`: warna dan font.
- `public/audio/narration.json`: naskah aktual, durasi, tempo, serta awal narasi.
- `NARASI.md`: naskah final.
- `ASSETS.md`: asal aset dan lisensi.
- `QA.md`: hasil pemeriksaan.

Voice-over dan semua aset sudah tersedia lokal. Render ulang tidak memerlukan TTS.

## Membuat ulang suara

Hanya langkah ini memerlukan internet untuk Microsoft Edge TTS. Naskah publik dikirim ke layanan TTS; tidak ada API key di proyek. Suara: `id-ID-ArdiNeural`, pitch -2 Hz. Tempo dibatasi +14%; narasi adegan kedua dipersingkat agar nyaman dalam enam detik.

```powershell
python -m venv .venv
.venv/Scripts/python.exe -m pip install -r requirements-audio.txt
.venv/Scripts/python.exe scripts/prepare_audio.py
npm run render
```

Script audio Python memakai jalur binary Remotion Windows x64. Untuk OS lain sesuaikan `BIN` pada script Python. Script render/verifikasi Node mendeteksi binary terpasang.

## Pemeriksaan frame

```powershell
npm run review
node scripts/review-encoded.mjs
```

Snapshot disimpan pada `output/review/`. Render still digunakan untuk frame yang tidak berurutan, karena render sparse sequence pada versi ini memicu kesalahan inline-audio. Export penuh 0–899 berhasil.

Skill resmi sudah dipasang melalui `npx remotion skills add`. Paket sumber dan aset: `output/wasla-video-project.zip`; dependensi dan virtual environment tidak disertakan. Instal kembali dengan `npm ci`.
