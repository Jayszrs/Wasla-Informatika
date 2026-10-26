# Scroll Reel — 35 detik, tanpa voice-over

Permintaan terbaru: karya ditampilkan sebagai scroll, tanpa penjelasan tiap proyek atau narasi. Komposisi baru **WaslaScrollReel** tersedia berdampingan dengan versi company profile 60 detik terdahulu.

MP4: `output/wasla-scroll-reel-35s.mp4`.
Preview lokal: http://127.0.0.1:3041/wasla-scroll-preview.html
Studio: http://localhost:3040/WaslaScrollReel

## Timeline

| Detik | Visual |
| --- | --- |
| 0–2 | Galeri karya bergerak dan identitas Wasla |
| 2–7 | Scroll Cimuning Digital Hub |
| 7–12 | Scroll Fazma Stone |
| 12–17 | Galeri screenshot Mahameru Baja bergerak vertikal |
| 17–22 | Scroll Ngaji Yuk! |
| 22–27 | Scroll IPNU Kota Bekasi |
| 27–32 | Galeri screenshot SIT Permata Hati bergerak vertikal |
| 32–35 | Galeri bergerak di belakang logo dan wasla.my.id |

Nama proyek tampil kecil; tidak ada deskripsi layanan, adegan proses kerja, subtitle, atau voice-over.

## Musik

Referensi pengguna: [The Weeknd, Playboi Carti — Timeless](https://www.youtube.com/watch?v=5EpyN_6dqyk).
Grid gerakan dan cut memakai **120 BPM** ([referensi tempo SongBPM](https://songbpm.com/%40the-weeknd/timeless-feat-playboi-carti-mkp3l)), setara 15 frame per ketukan pada 30 FPS. Ini penyelarasan tempo, bukan hasil pengukuran fase terhadap file lagu lokal.

**MP4 tidak berisi musik maupun audio lainnya.** Tidak ada salinan audio YouTube yang dimasukkan. Pengguna tidak menyediakan rekaman lokal. Musik dapat ditambahkan dari pustaka Instagram/TikTok; awal potongan perlu dipilih di aplikasi agar downbeat tepat dengan edit.

Preview HTML memakai [YouTube IFrame Player API resmi](https://developers.google.com/youtube/iframe_api_reference) untuk mencoba memutar referensi terpisah dari video lokal. Uji Chrome menerima penolakan embed **kode 150**, sehingga pemutar bersama dinonaktifkan dan tersedia tautan untuk membuka YouTube. Penolakan tersebut tidak dilewati. Tombol visual saja tetap dapat digunakan.

## Materi asli dan scroll

Halaman panjang publik Cimuning, Fazma Stone, Ngaji Yuk!, IPNU diambil melalui Chrome pada 27 Oktober 2026. Gambar memuat halaman asli; gerakan viewport dilakukan deterministik dalam Remotion. Rasio gambar dipertahankan.

Untuk Mahameru dan SIT Permata Hati, tampilan yang bergerak adalah galeri screenshot asli per bagian, dengan celah antar-artboard; tidak diklaim sebagai satu halaman panjang yang kontinu. Screenshot versi terdahulu beserta provenance tersedia di `public/projects/`.

Tangkapan panjang Mahameru/SIT juga disimpan sebagai referensi di `public/reel/`, tetapi tidak dipakai dalam komposisi karena ada bagian halaman yang tidak termuat lengkap. Tidak ada HTML situs yang direka untuk menggantikan karya asli.

## Render ulang

```powershell
npm ci
npm run dev -- --port=3040
npm run lint
npm run review:reel
npm run render:reel
```

File sumber aktif: `src/WaslaScrollReel.tsx`, `src/reel/`. Render final H.264 Rec.709/yuv420p, 1080×1920, 30 FPS, 1050 frame, durasi tepat 35 detik, tanpa track audio. Ukuran/durasi diverifikasi di `output/reel-verification.json` dan `output/reel-ffprobe.json`.

Versi 60 detik dan seluruh audionya tetap tersedia; komposisi reel tidak mengimpor `AudioManager` atau suara lama.
