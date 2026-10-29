# Team portraits and responsive films

Owner-requested refinement on 29 October 2026. Retains Wasla navy/white, Poppins, team card layout and authentic existing films. The dark viewing surface gives the film priority; a contained frame separates the image from its controls. No new decorative motion.

Bayu Saputra, Adelya Amanda and Difa Alfaruq now use individual 1254 × 1254 transparent PNG portraits from built-in ImageGen. Backgrounds and Difa's Open to Work overlay were removed; clarity and lighting were restored with identity preservation requested. These are AI-retouched derivatives, with the original source detail limits, rather than documentary originals. Original LinkedIn WebPs remain intact. Full prompts, source paths and output paths are recorded in [the provenance manifest](team-portrait-provenance.json).

The shared team component substitutes only the three exact original media filenames with the new static assets. A later different CMS photo remains authoritative. This avoids changing published team records or their LinkedIn/contact details. The PNGs live under public/images/team with the suffix -hd.png.

Both the entry intro and inline film choose the 9:16 sales reel below 768 CSS px and the landscape introduction at 768 px and above. Crossing that breakpoint reloads the matching source and poster. The inline film retains native controls and pauses offscreen, when hidden, and when opening the intro.

The intro attempts playback with sound enabled. Browsers can reject audible autoplay, in which case an explicit play button starts it on one gesture. Reduced motion also waits for that gesture. The intro has play/pause, sound toggle, progress, Escape, skip, and explore actions. Clicking its header, film or surrounding space closes it; playback controls keep their actions. Closing stops playback, restores scrolling and returns focus. Video errors preserve access to the website.

Local visual checks cover 1440 × 900 desktop, 820 × 1180 tablet, 390 × 844 phone and 320 × 568 small phone. PNG alpha was checked for fully transparent and opaque pixels. Browser regression checks live in tests/browser/public-films-locale-mobile.spec.ts.

Validation: typecheck passed; lint completed with zero errors and six existing Studio warnings. Five focused browser cases passed across targeted runs: entry/replay and sound controls, seven team portraits and links, phone/tablet selection and dismissal, blocked audible autoplay recovery, and reduced motion/load failure. The first dismissal test used an accessibility locator that excludes closed dialogs; its locator was corrected before the passing rerun. No deployment was performed.
