# Sumber aset ? revisi portofolio

## Portofolio nyata

| Proyek | Situs | Aset aktif |
| --- | --- | --- |
| Cimuning Digital Hub | https://cimuning.com/ | cimuning.webp, cimuning-detail-1.webp, cimuning-mobile-clean.png |
| Fazma Stone | https://www.fazmastone.com/ | fazmastone.webp, fazmastone-detail-2.webp, fazmastone-mobile.webp |
| Mahameru Baja Indonesia | https://mahamerubaja.vercel.app/ | mahameru-baja.webp, mahameru-baja-detail-2.webp, mahameru-baja-mobile.webp |
| Ngaji Yuk! | https://ngajiyuk.sdilbanisalehsetu.com/ | ngajiyuk.webp, ngajiyuk-detail-1.webp, ngajiyuk-mobile.webp |
| IPNU Kota Bekasi | https://ipnubekasi.my.id/ | ipnubekasi.webp |
| SIT Permata Hati Bekasi | https://sitpermatahati.up.railway.app/ | sit-permatahati.webp |

Semua file berada di `public/projects/`. Screenshot asli dari koleksi portofolio Wasla di repositori, dengan catatan asal `.source.json`. Tangkapan desktop 1440?1000 dan mobile 390?844 dibuat melalui REA pada 23 Oktober 2026. Keanggotaan proyek diambil dari `src/backend/data/initial-content.json` website pengguna. Pengguna menyatakan proyek sebagai portofolio Wasla; ini bukan audit independen kepemilikan.

Cimuning mobile diambil ulang melalui Chrome pada 27 Oktober 2026, viewport 390?844 dan scrollY=0, tanpa banner pemberitahuan. Gambar hasil tangkapan berukuran 375?844 karena strip scrollbar tidak disertakan. Mockup memakai rasio 375:844 tersebut. Tidak ada modifikasi DOM, style, atau isi website. Viewport browser dikembalikan sesudah capture.

## Brand dan grafis

Logo asli pengguna: `public/brand/wasla-emblem-navy.webp`. Versi terang memakai grayscale/invert/screen pada latar navy, menjaga kontur logo asli. Wordmark memakai Poppins SemiBold dari aset website.

Laptop, smartphone, jendela browser, kursor, ikon proses, tipografi dan transisi dibuat sebagai React/CSS/SVG orisinal. Layar laptop mempertahankan rasio screenshot 1440:1000. Smartphone mempertahankan rasio gambar asli; kamera/status dan home indicator berada di luar area screenshot, sehingga konten tidak tertutup.

Screenshot homepage Wasla dan ilustrasi konsep versi terdahulu tetap disimpan, tetapi tidak dipakai dalam komposisi 60 detik aktif.

## Audio dan font

- `public/audio/v2/scene-01` sampai `09`: suara sintetis `id-ID-ArdiNeural`, melalui edge-tts 7.3.1. MP3 sumber dan WAV normalisasi tersimpan. Pemakaian TTS mengikuti ketentuan penyedia; proyek tidak mengklaim lisensi tambahan dari Microsoft.
- `public/audio/v2/score.wav`: musik elektronik korporat orisinal 120 BPM, disintesis deterministik oleh `scripts/prepare_audio_v2.py`; tidak memakai lagu/rekaman pihak ketiga.
- `public/audio/v2/effects.wav`: whoosh, impact lembut, dan klik digital disintesis oleh script yang sama; tanpa sampel pihak ketiga.
- Sora 700/800 dari @fontsource/sora; lisensi SIL OFL ada di `public/fonts/LICENSE`.
- Plus Jakarta Sans dan Poppins dari aset website pengguna; lisensi SIL OFL ada di `PlusJakartaSans-OFL.txt` dan `Poppins-OFL.txt`.

Aset dimuat lokal menggunakan `staticFile()`. Musik dan ilustrasi dibuat khusus untuk pekerjaan ini. Logo, situs klien, dan elemen pihak ketiga dalam screenshot tetap milik pemilik masing-masing. Remotion dan dependensinya mengikuti lisensi paket masing-masing.
