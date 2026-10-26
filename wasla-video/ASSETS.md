# Daftar aset

| Aset | Asal / penggunaan |
| --- | --- |
| `public/brand/wasla-emblem-navy.webp` | Logo Wasla milik pengguna dari aset website. Kontur asli dipertahankan. Versi terang dirender dengan grayscale/invert/screen di latar navy. |
| `public/screens/wasla-desktop.png` | Screenshot aktual homepage https://wasla.my.id melalui Chrome, 26 Oktober 2026. Dipakai pada adegan 1, 2, 4, 5. |
| `public/screens/wasla-mobile.png` | Screenshot aktual homepage pada viewport 390 × 844 untuk smartphone. |
| `public/projects/*.webp` | Aset portofolio website pengguna, disimpan sebagai referensi. Tidak muncul di render final. |
| `src/components/BrowserMockup.tsx` | Ilustrasi HTML/SVG orisinal: perusahaan, produk, bisnis, papan alur kerja. Ditandai sebagai ilustrasi antarmuka di video. |
| `src/scenes/Scene04Workflow.tsx` | Ikon vektor orisinal untuk konsultasi, desain, pengembangan, peluncuran. |
| `public/audio/voice/scene-01` sampai `scene-05` | Narasi sintetis Indonesia dari Microsoft Edge TTS melalui edge-tts 7.3.1, suara Ardi. MP3 asli dan WAV normalisasi disimpan. Penggunaan layanan mengikuti ketentuan penyedia; proyek tidak mengklaim lisensi tambahan dari Microsoft. |
| `public/audio/wasla-original-score.wav` | Musik baru yang disintesis khusus proyek oleh `scripts/prepare_audio.py`, 120 BPM, 48 kHz stereo. Tidak memakai lagu atau rekaman pihak ketiga. |
| `public/audio/wasla-original-effects.wav` | Whoosh, impact lembut, klik digital yang disintesis khusus proyek. Tidak memakai sampel pihak ketiga. |
| `public/fonts/sora-latin-700-normal.woff2`, `800` | Sora melalui @fontsource/sora. SIL OFL 1.1 di `public/fonts/LICENSE`. |
| `public/fonts/plus-jakarta-sans.ttf` | Font lokal website pengguna. SIL OFL 1.1 di `PlusJakartaSans-OFL.txt`. |
| `public/fonts/Poppins-SemiBold.ttf` | Font lokal website pengguna untuk wordmark. SIL OFL 1.1 di `Poppins-OFL.txt`. |

Semua font, screenshot, logo, musik, dan narasi dimuat lokal melalui `staticFile()`. Tidak ada dependensi CDN saat render. Tidak ada statistik klien, testimoni, atau rating fiktif pada ilustrasi.

Remotion dan dependensi mengikuti lisensi masing-masing di node_modules. Musik, efek, ilustrasi dibuat khusus untuk pekerjaan ini; logo dan materi website tetap milik pemiliknya.
