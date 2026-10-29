# Automatic intro and video portfolio

This owner correction supersedes the visible intro controls described in film-team-refinement-20261029.md.

The entry intro now contains only the video. A full-surface, accessible dismissal button has no visible label or chrome; click/tap anywhere or Escape closes it and stops playback. There are no play, pause, sound, progress, header or footer controls. Desktop/tablet select the existing landscape film; widths below 768 CSS px select the portrait reel.

Playback starts automatically, including when reduced motion is requested, as explicitly requested by the owner. The intro first attempts audible playback, then retries muted on a browser NotAllowedError. A failed retry or media error exits to the website instead of trapping the visitor. It pauses while the document is hidden and resumes while still open when visible. Close restores scrolling and focus.

The inline brand film also has no controls. It autoplays muted and loops only while visible and while no dialog is open. Opening and closing the intro pauses and resumes it as appropriate.

Nine owner-supplied portfolio destinations appear at /portofolio#video-portfolio. A two-film selection on the homepage links to the complete list, and format navigation near the Project heading makes the video section discoverable. The existing website projects remain intact.

Four YouTube titles and authentic local thumbnails were obtained from YouTube oEmbed and the corresponding thumbnail URLs. No generated project imagery is used. During local real-browser checks, the World Stamp Championship vlog and Bani Saleh video rendered YouTube players; SEPTIHAN and Seventeen showed an unavailable embedded player. Those two entries link directly to their original YouTube watch pages. The reason for the upstream restriction was not verified. The supported player is loaded only on click and provides an original-source fallback link; closing removes the iframe and returns focus.

Drive metadata identified Company Profile FTID.mp4. The file stays linked at its supplied Drive view address; no download or sharing permission change was performed. Public anonymous access was not certified by metadata. Fulday is credited only for past editing contributions, not the entire channel. TikTok and Instagram entries use the supplied accounts without invented metrics, production roles, or testimonials.

Maintain content in src/shared/video-portfolio.ts; components and styling are in src/frontend/components/video-portfolio.*. The source and thumbnail manifest is docs/video-portfolio-sources.json. This addition does not change CMS data.

## Owner follow-up: visual galleries and native previews

The owner subsequently requested images for FTID and the four account entries, all content from the supplied accounts, and Drive playback inside the website. These replace the earlier text-only account rows and external-only Drive row.

FTID now has its authentic 1920 × 1080 viewer poster and a native Drive preview modal. A separate live browser check observed the embedded film advancing with no media error, at 0.68 seconds of 1168.45 seconds. REA's controlled browser scenario independently observed the public Drive viewer and play control; its retained evidence is in .local/portfolio-sources/rea-ftid-preview.json. No 2.5 GB source download or sharing change was needed.

Fulday uses an authentic video thumbnail plus its channel avatar and the native channel uploads playlist. The observed channel ID supplies the conventional uploads-playlist ID; the player was checked in an actual website iframe. This displays the source channel, without expanding the earlier editing-contribution credit to ownership of the whole channel.

TikTok uses an actual video poster and account avatar. Its preview mounts the official creator blockquote and embed.js only on selection. The direct iframe URL was rejected by TikTok during inspection; the official widget subsequently loaded the profile and twelve video previews successfully. Instagram entries use authentic post images and avatars, with public native profile previews. These previews remain controlled by their platforms; original source links are available in every modal.

Closing a modal removes its frame/widget, restores body scrolling, and returns focus. The TikTok script observer, timer and owned script element are released on unmount. Both account previews and video players use the existing Wasla navy/white palette; image galleries replace the sparse rows without introducing new page animation.

Validation for the follow-up: TypeScript and targeted ESLint passed. All three portfolio browser cases passed after the gallery update, covering the nine destinations, 320/820/1440 layouts and both locales, and artwork/modal lifecycle for FTID plus all four accounts on a phone. Remote frames and TikTok's script are stubbed only in the integration tests; the live checks above are separate evidence of provider behavior. The two earlier unavailable YouTube embeds remain original-source links.

## Owner follow-up: recover audible onboarding

The owner reported silent onboarding. Both MP4s contain AAC stereo at 48 kHz with non-silent decoded samples: landscape mean -21.4 dB / peak -2.4 dB; portrait mean -19.5 dB / peak -2.0 dB. The code's muted retry after browser autoplay rejection left no way to restore audio. Chrome documents this gesture requirement at https://developer.chrome.com/blog/autoplay/.

The intro still attempts audible autoplay first. If playback falls back to muted, or the element volume becomes zero, a compact top-corner sound action appears. One click or keyboard activation unmutes, restores element volume and resumes playback without closing the intro. The action disappears after sound is enabled. Other clicks and Escape still dismiss the film; no pause button or bottom player controls were restored. Replay starts with sound requested again.

Three focused browser cases passed, including deterministic blocked-autoplay recovery on desktop and a 390px English phone, zero-volume recovery and dismissal. The manual phone check observed muted=false, volume=1, playing=true, decoded audio bytes increasing, and the dialog still open after enabling sound. TypeScript and targeted lint passed. This verifies media decoding and player state, not physical speaker output or permission to bypass browser policy.

Validation: TypeScript and targeted ESLint passed. Six focused browser cases passed across targeted runs: pure intro autoplay/replay/dismissal, phone/tablet selection, muted autoplay fallback, reduced-motion and failed-media access, all nine destinations and player lifecycle, and 320/820/1440 layouts with both Indonesian and English. The embed lifecycle test stubs the remote frame; separate manual browser checks established the observed upstream embed behavior. Screenshots in .local/site-review include the pure intro on 1440 × 900 and 390 × 844 and the portfolio at 320, 820 and 1440 px. Initial focus rests on the native dialog without a visible full-surface button outline; Tab reveals the dismissal button's focus ring. No deployment was performed.
