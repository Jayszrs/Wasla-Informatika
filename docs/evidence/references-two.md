# REA reference evidence: Ulysses de Santi and Until

Research date: 22 October 2026 (Asia/Jakarta). Investigator used the installed REA skill and REA MCP `capture_browser_scenario` with an explicitly selected local Chrome executable. Browser-visible DOM and screenshots were requested; proprietary application bundles, source maps, and private source code were not inspected.

## Method and coverage

- Desktop: 1440 × 900 CSS px, `reduced_motion: no-preference`.
- Mobile-width: 390 × 844 CSS px, `reduced_motion: reduce`. This is viewport emulation in desktop Chrome, not a real mobile hardware/touch test. Viewport and motion preference change together, so these captures cannot isolate the effect of reduced motion.
- REA performed the declared waits, PageDown presses, and menu clicks. No forms were submitted and no authenticated routes were accessed.
- Screenshot states are samples after navigation/waits, not a frame-by-frame recording. Waiting 1.8 s or 6.5 s does not establish exact animation duration, network performance, or the reason for a delay.
- Native CUA was reported by the parent investigation as unavailable; REA launched Chrome successfully.
- Until desktop scroll capture exceeded MCP's transport response budget. REA completed and retained it; the investigator exported the session bundle and extracted its screenshots locally instead of repeating the observation.
- Evidence bundle: `docs/evidence/rea-references-session.json` (27.4 MB). It contains complete REA records, screenshots, and browser-visible HTML. Screenshots alongside this file are research artifacts only and must not become production assets.
- No numerical contrast audit, hover-pointer session, focus-trap audit, assistive-technology test, or real-device performance test was performed.

## Evidence index

| Alias | REA Evidence ID | Scenario |
| --- | --- | --- |
| U1 | `ev_417ae8bd15f610b1b1e5ff78ed3adbf71cc0cdff6fb6aa3246c89c0974716321` | Ulysses desktop, wait 1.8 s, final screenshot/DOM |
| U2 | `ev_f079c7b71e853a1c363859cfba161822b3b4f08d2a7cc1fdea5e181a70d2ae35` | Ulysses desktop, wait 6.5 s, PageDown, wait 1 s |
| U3 | `ev_e34812233407ea9399e9bc64f0fb4132f49402fc141b7d7c9352fa612814b107` | Ulysses mobile-width/reduced-motion, same scroll sequence |
| U4 | `ev_a2e0ea590b98e4dd4a1fd69e4b3b3ad1690f57eefd069b336992d4562daa05c4` | Ulysses mobile-width/reduced-motion, menu click |
| T1 | `ev_ac32b04c1c4b027140b00cd6eb9744918f1c9902691c4a1beab2bfde52edd1a1` | Until desktop, wait 3.5 s, final screenshot/DOM |
| T2 | `ev_89899bdeaaca5add3fde9d479791d8d60b5caccc245d9cee25b2c39a23f18cf3` | Until desktop, wait 3 s, two PageDown presses with 1 s waits |
| T3 | `ev_43e1ae0db2c4f7781cb8e390244a50e0de869256714958b31e37199e32a61346` | Until mobile-width/reduced-motion, wait 3 s, PageDown, wait 1 s |
| T4 | `ev_4c0b80f05577a1d295e5f0beed0176b187cfc301a6d9c7ef108c3af8dc68bf84` | Until mobile-width/reduced-motion, menu click |

An additional early Until desktop capture `ev_cef9bcc6f2c186bc82aa20f103630eb5f00544a23671c6a8e085b7adab741d46` is retained in the session; analysis below relies on T1–T4.

## Reference 1: [Ulysses de Santi](https://ulyssesdesanti.com/?ref=minimal.gallery)

### Executive summary — interpretation

The site presents a dealer/curator as a visual signature followed by an image-led collection. Its memorable quality comes from a proprietary, oversized black monogram, deliberately sparse copy, generous white space, and uneven image placement. The primary transferable principle is a confident, highly recognizable opening supported by compelling work imagery. The entire spatial composition would be inappropriate to reproduce for Wasla.

### Verified observations

**Opening and hierarchy (U1, U2).** U1, sampled after a 1.8 s wait, displays a small centered black monogram on an otherwise white screen. U2, sampled after a 6.5 s wait, displays the settled homepage: a narrow top line with wordmark at left, three navigation links toward the right, and an email link at the far right. A large amount of white space separates this navigation from a huge black graphic monogram occupying most of the lower first viewport. A short three-line curatorial statement sits beneath it, left aligned. Photography begins at the bottom edge.

**Typography (U2–U4).** The top wordmark is an uppercase, narrow/heavy graphic wordmark. Navigation and supporting text are compact black sans-serif. The mobile menu uses much larger uppercase condensed/heavy lettering for links. The exact font family and numerical sizes were not measured; the observed giant hero is an SVG mark, not a giant text heading.

**Layout, imagery, and pacing (U2).** After PageDown, a narrow photograph appears near the central-left column, a substantially larger portrait photograph occupies the right half, and another photograph begins lower on the far left. Thin white gutters and large empty gaps form a staggered, asymmetrical composition. Images have square edges. A translucent light label identifying the active project is positioned near the lower center. The DOM groups clickable media by project/designer/exhibition and supplies direct links to detail routes. Several image surfaces use CSS background images with empty alt/title attributes.

**Navigation and interaction (U2, U4).** Desktop links lead to Exhibitions, Spaces, About, and email. On mobile, these links collapse behind a two-line icon. Clicking that icon opens a near-black full-height menu, changes the icon to an X, displays large white stacked links, and places location/social/footer information at the bottom in two columns. The mobile menu trigger in the captured DOM is a `div` containing an SVG, without native `button` semantics, an accessible name, or `tabindex` visible in that element. This is a concrete accessibility concern; a complete keyboard audit was not conducted.

**Responsive behavior (U3).** The mobile-width initial view retains very large vertical white space. The monogram appears near the bottom, spans almost the full width, and is followed by the supporting statement. After PageDown, one project photo becomes nearly full-width with approximately 10 px side margins; a smaller image follows offset to the right. The active project label remains near the lower viewport. The top wordmark and menu icon remain visible in the sampled scroll state.

**Motion evidence and limits (U1–U3).** Separate timed samples prove an opening state and a later settled state; they do not reveal the exact transition curve, duration, or whether loading or deliberate animation controls the wait. The page moves from hero to a photo collection when scrolled. Single before/after screenshots do not prove a particular parallax algorithm or speed ratio. Mobile-width reduced-motion captures still show the same basic hero structure; no evidence establishes that its intro is fully bypassed.

### Strengths — interpretation

- Exceptional brand recognition through scale and a single graphic mark.
- Photographs act as the portfolio; sparse interface chrome lets their quality carry the page.
- A limited top-level menu is easy to scan.
- Staggered image sizes provide visual pacing without decorative card frames.

### Weaknesses and risks — interpretation grounded in evidence

- In the early sampled state no service proposition, portfolio item, or contact action is visible. For a service agency, this creates an avoidable opening risk.
- The mobile opening devotes much of its screen to empty space and a mark before evidence of work.
- Generic/empty image alternatives and the non-button mobile trigger require accessibility attention if adapting any interaction principle.
- Minimal visible project labels trade immediate context for visual impact; Wasla needs explicit problem/service/outcome summaries.

### Appropriate ideas for Wasla — interpretation

Use a short, non-blocking mark reveal, purposeful oversized typography, strong contrast, and one or two uneven portfolio image scales. Keep the business proposition and main contact action visible immediately. Introduce clear project titles, service tags, and honest project context. Use navy and warm white with an original geometric Wasla mark.

### Do not copy

Do not reuse its SVG paths, wordmark, photographs, curatorial wording, project taxonomy, precise offsets, page composition, or monogram-to-gallery sequence. Retained research screenshots are not licensed production assets.

## Reference 3: [Until](https://www.untillabs.com/?ref=minimal.gallery)

### Executive summary — interpretation

Until combines an immersive scientific visual narrative with a restrained capsule navigation system and large editorial sans-serif messages. The useful lesson is disciplined typography and a consistent CTA shape around an expressive visual scene. Wasla should borrow the clarity and hierarchy principles while creating completely different subject matter, graphics, wording, and page flow.

### Verified observations

**Opening and composition (T1).** The desktop viewport is filled by a picnic scene rendered with many soft, circular, particle-like marks. A large, cream-white sans-serif line sits near the lower edge; a bracketed monospace-style scroll instruction appears beneath it. The composition has a muted green photographic field, a strong blue blanket, and warm orange details. The scene is visibly graphical rather than a flat unprocessed photograph.

**Typography (T1, T4; browser-visible DOM).** The hero uses a heavy/medium-weight, tightly spaced sans-serif heading with a tight line-height. Its DOM identifies headings with `font-display`, `leading-[0.95]`, and negative tracking classes; this establishes declared styling tokens, not computed font metrics. Supporting interface text is substantially smaller. The scroll prompt and mobile navigation grouping have monospace-related styling classes. Hero message DOM includes split text wrapped in `aria-hidden` elements and full readable `aria-label` strings. Exact font family identity was not independently measured.

**Navigation and buttons (T1, T4).** Desktop navigation forms a long translucent rounded capsule inset from the top and side edges. It contains the white mark/wordmark, seven navigation destinations, and a cream pill CTA with dark text. On mobile the wordmark text and desktop destinations disappear, leaving the mark, a pill CTA, and a three-line menu button. The menu opens as a tall cream rounded panel, with centered dark links, an X close icon, and a dark full-width CTA near the bottom. The menu button has an accessible name, `aria-expanded`, `aria-controls`, and `type="button"`; the panel has `role="dialog"` and `aria-modal="true"` in the observed DOM. Focus trapping and Escape behavior were not tested.

**Button styling declarations (T1/T3 DOM).** Linked CTAs use rounded 18 px shape declarations, compact 36 px height classes, horizontal padding, and transition classes. Their DOM declares background/text changes on hover. No pointer hover was performed, so the actual transition timing and visual result remain unverified. Mobile menu trigger classes declare a focus-visible ring and an expanded hit surface.

**Scroll narrative (T2).** After PageDown the same scene remains in view while the camera-like framing moves closer to the people. After a second PageDown it moves closer again. The full desktop navigation contracts into a short centered capsule containing just the mark and CTA. In sampled intermediate states, heading text is faded or nearly absent. These states establish a scroll-linked scene sequence and navigation adaptation. They do not establish the rendering technology, exact interpolation timing, FPS, or total scroll distance.

**Content hierarchy (T1/T3 DOM).** Browser-visible document structure contains a core scientific principle, a principle-to-protocol section, a science exploration CTA, a roadmap/path section, a team/recruiting section, and blog entries. This is DOM evidence, not a claim that every lower section was visually inspected.

**Mobile-width and reduced motion (T3).** The scene is cropped vertically to fit a narrow viewport. The compact capsule remains at the top. The scroll prompt is visible near the bottom in the initial sampled state. The desktop hero heading is not readable in this sample, despite its text existing in DOM. After PageDown the scene framing changes and the prompt disappears. Thus, setting reduced-motion preference did not produce a fully static scene in this scenario. DOM classes include `motion-reduce:relative`, but class presence does not prove an effective complete fallback.

### Strengths — interpretation

- Capsule geometry provides a coherent system for navigation and CTAs.
- Large type remains economical; most of the visual complexity is concentrated in the scene.
- The nav contracts as the narrative progresses, preserving the main conversion action.
- Mobile menu links are clear, generously spaced, and readable.
- The scene makes an abstract subject memorable.

### Weaknesses and risks — interpretation grounded in evidence

- Scroll-dependent scene progression can demand several scrolls before visitors reach conventional content.
- Faded/invisible intermediate heading states can interrupt comprehension.
- Dynamic imagery under white text needs careful contrast control across the entire animation.
- Mobile-width reduced-motion behavior warrants further testing; the captured experience still changes substantially with scroll.
- A 3D/particle narrative has a larger implementation/performance burden than Wasla needs. No performance measurements were captured, so this is a design/engineering risk, not a measured failure.

### Appropriate ideas for Wasla — interpretation

Use a calm, readable navigation system; confident editorial headings; deliberate text wrapping; and a consistent family of filled and outlined rounded buttons. Pair those with original navy/white project mockups or an abstract connection graphic. If the header becomes compact on scroll, preserve access to menu and contact actions at every breakpoint. Prefer a short scroll reveal and restrained image translation over a long pinned scene.

### Do not copy

Do not reuse Until's mark, particle scene, photographs, proprietary illustrations, wording, exact headline placement, long pinned visual story, or navigation dimensions. Do not infer that its technology or medical claims apply to Wasla.

## Accessibility and implementation implications — recommendations, not reference facts

1. Render the service proposition, primary CTA, and useful hero artwork immediately. Do not gate content behind a splash loader.
2. Use semantic buttons for menu controls; provide names, `aria-expanded`, focus management, Escape close, and body scroll restoration.
3. Keep hero text in semantic headings. If text is split for animation, hide fragments from assistive technology and retain one readable equivalent.
4. Respect `prefers-reduced-motion`: disable parallax/large transforms and show all text at full opacity. Test this separately at desktop and mobile sizes.
5. Keep a visible, static poster image when canvas/WebGL/motion is unavailable. Content and contact flow must work without the decorative scene.
6. Use subtle 8–24 px image translations, approximately 400–650 ms section reveals, and 150–220 ms button feedback as original proposed targets. These are Wasla recommendations, not measured values from the references.
7. Give project images useful alternatives and show real context: client/project type, challenge, delivered scope, and outcomes only when supplied and verified.

