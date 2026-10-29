# Automatic intro and video portfolio

This owner correction supersedes the visible intro controls described in film-team-refinement-20261029.md.

The entry intro now contains only the video. A full-surface, accessible dismissal button has no visible label or chrome; click/tap anywhere or Escape closes it and stops playback. There are no play, pause, sound, progress, header or footer controls. Desktop/tablet select the existing landscape film; widths below 768 CSS px select the portrait reel.

Playback starts automatically, including when reduced motion is requested, as explicitly requested by the owner. The intro first attempts audible playback, then retries muted on a browser NotAllowedError. A failed retry or media error exits to the website instead of trapping the visitor. It pauses while the document is hidden and resumes while still open when visible. Close restores scrolling and focus.

The inline brand film also has no controls. It autoplays muted and loops only while visible and while no dialog is open. Opening and closing the intro pauses and resumes it as appropriate.

Nine owner-supplied portfolio destinations appear at /portofolio#video-portfolio. A two-film selection on the homepage links to the complete list, and format navigation near the Project heading makes the video section discoverable. The existing website projects remain intact.

Four YouTube titles and authentic local thumbnails were obtained from YouTube oEmbed and the corresponding thumbnail URLs. No generated project imagery is used. During local real-browser checks, the World Stamp Championship vlog and Bani Saleh video rendered YouTube players; SEPTIHAN and Seventeen showed an unavailable embedded player. Those two entries link directly to their original YouTube watch pages. The reason for the upstream restriction was not verified. The supported player is loaded only on click and provides an original-source fallback link; closing removes the iframe and returns focus.

Drive metadata identified Company Profile FTID.mp4. The file stays linked at its supplied Drive view address; no download or sharing permission change was performed. Public anonymous access was not certified by metadata. Fulday is credited only for past editing contributions, not the entire channel. TikTok and Instagram entries use the supplied accounts without invented metrics, production roles, or testimonials.

Maintain content in src/shared/video-portfolio.ts; components and styling are in src/frontend/components/video-portfolio.*. The source and thumbnail manifest is docs/video-portfolio-sources.json. This addition does not change CMS data.

Validation: TypeScript and targeted ESLint passed. Six focused browser cases passed across targeted runs: pure intro autoplay/replay/dismissal, phone/tablet selection, muted autoplay fallback, reduced-motion and failed-media access, all nine destinations and player lifecycle, and 320/820/1440 layouts with both Indonesian and English. The embed lifecycle test stubs the remote frame; separate manual browser checks established the observed upstream embed behavior. Screenshots in .local/site-review include the pure intro on 1440 × 900 and 390 × 844 and the portfolio at 320, 820 and 1440 px. Initial focus rests on the native dialog without a visible full-surface button outline; Tab reveals the dismissal button's focus ring. No deployment was performed.
