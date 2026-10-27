# Film, tim, bahasa, dan mobile — 27 Oktober 2026

Permintaan pemilik: memasang MCP dari referensi, memakai dua video dari Downloads, menambahkan tiga anggota dari profil LinkedIn yang diberikan, serta memperbaiki bahasa Inggris dan interaksi 3D mobile. Identitas navy/white, Poppins, harga, project asli, dan data privat Studio dipertahankan.

## Perilaku website

- Kunjungan pertama dan hard refresh pada halaman publik membuka film landscape 27,6 detik. Navigasi internal biasa tidak mengulang intro. Video mulai tanpa suara; tombol Nyalakan suara dan kontrol native mengaktifkan audio. Lewati intro, Jelajahi website, Escape, dan akhir video menutup dialog, mengembalikan scroll serta fokus. Reduced motion meminta klik Putar perkenalan. Kegagalan memuat tetap menyediakan akses website.
- Reel portrait 15 detik berada sesudah hero, berdampingan dengan ajakan konsultasi pada desktop dan bertumpuk pada mobile. Audio asli tetap tertanam; tidak ada voice-over. Video berhenti ketika keluar viewport atau tab disembunyikan. Tonton film Wasla membuka ulang intro.
- Kedua video berasal dari file pemilik yang tepat, di-resize/kompres untuk web, dengan poster diambil dari frame videonya. Total MP4 web 7.253.737 byte. Hash sumber dan hasil ada di [manifest video](site-video-provenance.json). File sumber di Downloads tidak diubah.
- Tiga anggota tambahan: Bayu Saputra — Project Consultant & QA Project; Adelya Amanda — Mobile Developer & UI UX Specialist; Difa Alfaruq — UI UX Designer. Foto LinkedIn asli disimpan sebagai WebP tanpa retouch/generasi wajah. Sumber, dimensi dan hash ada di [manifest foto](team-linkedin-provenance.json). Foto publik Bayu tersedia 200×200; tidak diklaim sebagai foto resolusi tinggi.
- Anggota tampil pada beranda, tentang, dan kontak tanpa harus memiliki WhatsApp. Nomor WhatsApp lama tetap. Nomor baru tidak ditemukan pada informasi publik yang ditinjau, dan panel kontak Difa/Adelya hanya menyediakan email; profil baru memakai LinkedIn. Nomor terverifikasi dapat ditambahkan sebagai tautan `https://wa.me/62...` melalui Studio.
- Device mockup menerima gestur horizontal untuk rotasi mesh sebenarnya; gestur vertikal tetap scroll halaman. Gerak orientasi mengikuti scroll juga tersedia pada coarse pointer. Layanan mempertahankan Putar objek/Selesai memutar untuk drag sentuh. Reduced motion menonaktifkan orientasi otomatis. Renderer bersama, screenshot autentik dan fallback tetap.
- Grid project satu kolom di bawah 576px, kontrol sentuh minimal 44px, input mobile 16px. Tidak ada klaim menguji seluruh perangkat fisik.

## Bahasa

Root layout memasang LocaleProvider; halaman server dan komponen interaktif menerjemahkan isi sesuai rute `/en`. Proxy mempertahankan locale saat rewrite loopback diproses ulang. Sakelar ID/EN mempertahankan path, query, dan hash; tautan sakelar tidak dilokalkan kembali ke bahasa semula.

Navigasi, halaman publik, layanan, artikel, paket, profil, formulir, kontrol galeri dan label 3D memakai kamus Inggris yang ditulis untuk isi saat ini. Nilai opsi formulir tetap cocok dengan validasi backend. Pesan awal konsultasi paket mengikuti bahasa. Metadata, tanggal artikel, canonical, hreflang, sitemap dan schema layanan/panduan mengikuti bahasa. Nama orang/project, screenshot, serta lettering video asli tidak diganti. Studio tetap di luar rewrite publik; perubahan teks CMS berikutnya memerlukan padanan baru dalam kamus.

## MCP di komputer pemilik

Registrasi Codex berada di `C:\Users\jaela\.codex\config.toml`, dengan backup sebelum perubahan. Versi terpasang: shadcn 4.22.1; Playwright MCP 0.0.83; Serena 2.1.1.dev0 dari commit upstream `9e1cced0c34ed48d668e179f7c56c77b4d14a3e3`. Runtime Node 24 dipanggil dengan path absolut karena PATH terminal sesi ini tidak memuat Node/npm.

Handshake MCP dan tools/list berhasil: shadcn 7 tools; Playwright 25 tools; Serena 3 tools (antarmuka REPL upstream). Konfigurasi Serena global mengikuti project aktif, tidak mengunci workspace lain ke Wasla. VS Code user MCP mempertahankan Context7 dan menambahkan shadcn, Playwright, Figma. `.vscode/mcp.json` memasang Serena khusus workspace Wasla. Tidak ada perubahan pada kebijakan persetujuan, hook, atau proteksi editor.

Figma remote resmi terdaftar di `https://mcp.figma.com/mcp`; izin baca/tulis akun masih menunggu persetujuan pemilik pada halaman OAuth. Registrasi Magic/21st Codex yang sudah ada diperbaiki agar memakai header resmi `x-api-key` dari `API_KEY_21ST`; variabel tersebut belum tersedia. VS Code juga memiliki registrasi 21st dengan input API key bertipe password. Tidak ada key rekaan atau koneksi 21st yang diklaim sudah terverifikasi. Restart/reload klien diperlukan untuk memuat registrasi baru dalam sesi percakapan berikutnya.

Rujukan instalasi: [OpenAI MCP](https://learn.chatgpt.com/docs/extend/mcp?surface=cli), [shadcn](https://ui.shadcn.com/docs/mcp), [Playwright](https://github.com/microsoft/playwright-mcp), [Serena](https://oraios.github.io/serena/02-usage/030_clients.html), [Figma](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/), [VS Code](https://code.visualstudio.com/docs/agent-customization/mcp-servers).

## Data dan regenerasi

`scripts/add-team-members.ts` menambahkan anggota/foto secara idempoten melalui penyimpanan CMS. Anggota yang sudah ada tidak ditimpa; backup tim disimpan privat di `.local/site-review`. Jalankan dengan environment tujuan yang benar melalui Node `--env-file=... --import tsx`; jangan menjalankan seed baseline terhadap database aktif.

`scripts/prepare-site-videos.mjs` dan `scripts/prepare-team-linkedin.mjs` menghasilkan aset dan manifest. Script video memerlukan binary FFmpeg Remotion lokal serta dua file sumber asli di Downloads. URL gambar LinkedIn dapat kedaluwarsa; refresh dari profil yang sama bila perlu.

## Verifikasi dan release gate

Build produksi lokal dan typecheck berhasil. Delapan tes unit lulus. Lint: nol error, enam warning Studio yang sudah ada. Pemeriksaan mekanis Impeccable: 141 advisory pada target termasuk CSS lama, nol temuan non-advisory; lima advisory film adalah skala wordmark/caption dan headline promosi yang disengaja. Uji browser mencakup pemutaran/suara/refresh/replay/Escape, kegagalan video, reduced motion, tujuh profil/foto, ID/EN lintas rute, backend value formulir, sentuhan model serta scroll, dan batas layar 360/390/484/768.

Design read: mempertahankan dunia visual Wasla; ENERGY 2, RHYTHM 2, MOTION 2 pada UI, sedangkan film memakai motion graphic asli pemilik. Navy memisahkan player dari konten; poster memperlihatkan karya nyata, whitespace memisahkan cerita dari katalog, dan gerak dipakai untuk menjelaskan bentuk device. Tidak ada orang, nomor, harga, statistik, testimoni atau project rekaan. Kontrol baru diuji dengan mouse, keyboard dan sentuhan emulasi. Bukti lokal privat ada di `.local/site-review`; capture visual ada di `.impeccable/review`.

Deployment `dpl_HkiYV3cfNP2ph3bXsdKcduMM41Ye`, URL versi `https://waslainformatika-7xilrzwzn-jae-f2e1.vercel.app`, selesai build Vercel 60 detik dan dipromosikan ke **https://wasla.my.id**. Lima tes browser lulus pada build produksi lokal, deployment staging dengan akses otomasi proyek yang sudah ada, dan domain publik. Pemeriksaan domain publik tidak memakai bypass.

Audit aktual domain publik: 32 halaman Inggris HTTP 200, `lang=en`, canonical tepat, dan tidak ada fragmen Indonesia dari daftar pemeriksaan; 64 URL sitemap dengan alternatif bahasa. Tujuh anggota dan ketiga foto baru dapat dimuat. Kedua MP4 publik sama hash dengan encode lokal, melayani HTTP 200 dan Range 206. Tidak ada pengiriman WhatsApp atau pesan konsultasi nyata saat pengujian. Verifikasi final 27 Oktober 2026 pukul 16.42 WIB tercatat privat di `.local/site-review/live-verification.json`. [Capture REA mobile](rea-mobile-live-20261027.json) mengamati halaman Inggris 390×844 dengan kedua sumber video, intro Inggris, dan nol page error.
