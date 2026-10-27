# Brief siap pakai — Higgsfield / Wasla

Status: brief persiapan, belum dijalankan di Higgsfield. Memerlukan integrasi dan akun pengguna yang terhubung. Jangan mengklaim video lokal sebagai output Higgsfield.

Referensi: https://pin.it/6GcErUN2D

## Prompt

Create a 27.6-second, 16:9 landscape branding promo for Wasla Informatika, ideally 1920x1080 at 60fps. Follow the supplied reference's scene order, spatial composition, camera movement and transition rhythm closely. Use Wasla's supplied logo and real website portfolio screenshots. Keep all final written copy in Indonesian, spelled exactly as below. No voice-over. Do not copy ReLabel's branding, customer faces, contact details or case-study artwork.

0–1.4: black-charcoal studio intro with subtle cyan bloom below. Center “Studio oleh” then the supplied Wasla logo.
1.4–3.7: tall rounded project card enters left, kinetic type right: “Tempat ide bermula” then “jadi nyata.” A clean white ring sweeps across the card.
3.7–6.3: narrow colorful vertical portfolio ribbons fill a bright off-white screen; camera pushes forward and drifts horizontally. Use the supplied website screenshots as ribbon artwork.
6.3–8.7: dark scene with six small rounded portfolio cards floating around the center, soft colored light behind them. Center text: “Dibuat untuk bisnismu.”
8.7–10.9: diagonal perspective wall of actual website screenshots, cursor sweeps across. Overlay “Karya kami”, then “Website.” and “Untuk bisnismu.”
10.9–11.8: large fast kinetic line, “Cara kami bekerja.”
11.8–14.5: bright background with three stacked dark rounded capsules, small circular icons. Labels: “Ide”, “Desain”, “Teknologi”.
14.5–15.5: glossy charcoal sphere with “Bikin orang bilang” and large “wah”.
15.5–18.6: perspective rounded showcase of the actual Wasla home page, followed by actual project previews; white pointer movement.
18.6–21.5: bold oversized kinetic typography with repeating text as background. Three states: vivid red “Ide kreatif.”, dark teal “Desain berani.”, charcoal and violet “Solusi digital.”
21.5–22.9: cinematic sunset city view with rounded corners, small off-white capsule: “Bawa bisnismu ke dunia digital.”
22.9–25.1: rotating blue Earth, three thin orbit rings, small circular project thumbnails instead of stock people or testimonials; camera pulls back.
25.1–27.6: dark return with subtle cyan lower glow; centered glossy capsule with traveling edge glint. Copy changes from “Mulai konsultasi” to “wasla.my.id”; supplied Wasla logo below.

Use the user's supplied music recording after generation, with a clean edit to exactly 27.6 seconds and a short end fade. Keep Indonesian typography sharp; if a video model cannot reliably render exact copy, export clean motion plates and overlay the editable type in Remotion.

## Input yang sudah tersedia lokal

- Logo: `public/brand/wasla-emblem-navy.webp` dan komponen `src/components/BrandLogo.tsx`.
- Portfolio: `public/projects/*.webp`; desktop/mobile/detail asli tersedia.
- Halaman Wasla: `public/screens/wasla-desktop.png`.
- Kota: `public/landscape/jakarta-twilight.png` (generated illustrative background).
- Musik: `public/audio/reel/user-sound.mp3` (rekaman pengguna).
- Rekonstruksi editable dan timing: `src/WaslaLandscapePromo.tsx`, `src/landscape/`.
