# Wasla Motion Reel — revisi dari referensi Pinterest

File utama: `output/wasla-motion-reference-30s.mp4`.
Komposisi: `WaslaMotionReel` — 1080×1920, 30 FPS, 900 frame / 30 detik.

## Referensi yang benar-benar diperiksa

Pengguna memberikan https://pin.it/4EUwN5nj4. REA mengikuti redirect ke pin `933230354041679411`, dengan judul **Motion inspiration - Moolah**. Capture dilakukan dengan Chrome melalui `capture_browser_scenario`, menggunakan aksi tunggu terdeklarasi. Browser milik provider ditutup setelah capture.

Evidence ID: `ev_2ae92d96d3e0626f80df631904a77eb4d226b8e92b9efbd14943cc767f39c35b`.
Evidence lengkap lokal: `output/reference/pinterest-rea.json`.

DOM capture memuat URL media publik `https://v1.pinimg.com/videos/iht/expMp4/6e/90/b3/6e90b3ba4332515eb76b713d719cf550_720w.mp4`. Video referensi diambil untuk analisis lokal; ffprobe mengonfirmasi 720×1280, 30 FPS, 15,867007 detik. 32 frame dengan interval 0,5 detik diperiksa dalam `output/reference/contact-reference.jpg`.

## Ciri yang diterapkan pada karya Wasla

| Yang terlihat pada referensi | Adaptasi pada video Wasla |
| --- | --- |
| Pembuka singkat di bidang hitam, diikuti logo pada putih | Teks Kenalin, lalu logo Wasla asli |
| HP perspektif berputar, berubah ukuran, dan masuk/keluar layar | Mockup dengan screenshot mobile asli, rotasi Y/X, pergeseran dan close-up |
| Bidang warna polos yang berganti cepat | Putih, pink, biru Wasla, mint dan hitam |
| Headline besar di atas perangkat yang sebagian terpotong | Tipografi kinetik pendek dengan hero HP di bawahnya |
| Elemen UI terangkat dan melayang terpisah | Artboard desktop asli tampil di depan dan di sekitar mockup mobile |
| Potongan cepat dan logo penutup pada bidang warna | 27 shot berbasis frame, lalu logo dan URL di latar biru |

Semua konten layar, logo, dan nama diganti dengan materi Wasla. Maskot, logo, ilustrasi, UI aplikasi keuangan, dan footage referensi tidak dimasukkan ke render. Hasil mengikuti bahasa gerak dan komposisi, bukan salinan piksel identik.

## Sound kiriman pengguna

Sumber: `C:/Users/jaela/Downloads/original sound - camrift_musicaldown.com_1793071686.mp3`, disalin ke `public/audio/reel/user-sound.mp3`.
Durasi MP3 terukur 14,733061 detik; PCM terdekode 14,706958 detik. Sumber tetap utuh. Track 30 detik dibuat dengan pengulangan setiap 14 detik dan overlap equal-power sekitar 0,707 detik, ditambah fade-out 450 ms. Detail dan SHA-256 ada di `public/audio/reel/music-manifest.json`.

Tidak ada voice-over atau narasi hasil TTS pada komposisi ini. Track musik 30 detik dinormalisasi dengan loudnorm (target -16 LUFS, true peak -1,5 dBTP), dimuat menggunakan Audio dari @remotion/media, dan ikut dirender ke AAC. Tahap final memakai WAV tersebut langsung agar tidak melakukan encoding AAC berulang.

Spectral flux file kiriman dianalisis dalam hop sekitar 10 ms. Potongan utama dipilih dekat onset yang terdeteksi, lalu dibulatkan ke frame 30 FPS. Pengulangan kedua mengikuti offset audio 14 detik. Potongan pada batas loop dan akhir merupakan batas susunan, bukan diklaim sebagai onset musik.

## Preview dan render ulang

```powershell
npm run dev -- --port=3040
.venv/Scripts/python.exe scripts/prepare_motion_audio.py
npm run lint
npm run review:motion
npm run render:motion
node scripts/verify-motion-audio.mjs
```

Studio: http://localhost:3040/WaslaMotionReel. Pilih zoom Fit untuk melihat seluruh portrait.
Kode aktif: `src/WaslaMotionReel.tsx`, `src/motion/`. Proyek sebelumnya tetap tersedia sebagai komposisi terpisah.
