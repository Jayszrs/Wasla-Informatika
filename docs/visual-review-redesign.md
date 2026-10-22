disposition: ship

Final verdict scope: both material fixes below were scored resolved against the refreshed production captures on 22 October 2026. This ship disposition covers the scored fixes, not a new whole-surface review. The initial five-section review is retained below as the finding record.

## verdict

1. Resolved — home-1440-viewport.png and home-390-viewport.png now visibly disclose “Konsep eksplorasi — Alur” on the image itself. It remains separate from the headline and does not obstruct the artifact or consultation action. Refreshed desktop.png and mobile.png retain that disclosure.
2. Resolved — about-1440.png and about-390.png now transition from the process directly to the consultation section; the empty team heading and forthcoming-profile copy are absent at both sizes.

The refreshed named captures are valid. No visible regression attributable to this fix batch was found in those affected regions. Build, typecheck, lint and the five-test browser suite were reported passing by the builder; those checks were not independently rerun in this verdict pass.

## remaining

Clear for the two scored fixes. Original limits on motion, accessibility and absent comp/QUALITY BAR evidence remain unchanged.

Final fix-list disposition: ship.

---

Initial full review disposition: fix.

Inputs not supplied: a separate QUALITY BAR card or decision critique image. This is an approved code-led direction; there is no approved image comp and no pixel-fidelity verdict.

## persistence

Pass for the code-led build. PRODUCT.md and docs/redesign-direction.md persist product truth, the user-pinned references, palette, type, image policy, page sequence and motion behavior. `seed:f29e8fcfc0cc4447` was confirmed by the local concept-seed check. The direction records the user's explicit override of its assigned world. Comp reproduction state and comp-diff gates do not apply. Updating the old DESIGN.md and design sidecar remains the documenter's downstream task; detector advisories against that old system are not evidence that the replacement world is wrong.

Evidence passes: all 24 required captures exist and show their named public routes or menu states: desktop.png, mobile.png, both home viewport captures, the desktop/mobile services, service, portfolio, project, insights, article, about and contact captures, and menu-390.png/menu-768.png. Full pages begin at the document top and contain loaded images rather than blank regions. The current homepage was additionally inspected through fresh native-resolution crops of those required captures. Existing desktop-crop-* and mobile-crop-* files depict the discarded design and were excluded.

Scope: visual review of the supplied public-route desktop/mobile matrix and menu captures, supported by selected CSS, homepage, About, navigation and motion source. The supplied browser-readings.json covers 36 route/width combinations and reports no overflow or broken images. Build, interaction, persistence and CMS replacement test results are builder-supplied evidence, not independently rerun here. Reduced-motion captures cannot prove the live opening animation's perceptual quality. This is not an exhaustive accessibility certification.

## fidelity

| Element / promise | Verdict | Evidence |
|---|---|---|
| TYPE | Match | home-1440-viewport.png and home-390-viewport.png show a confident, readable sans hierarchy with large Manrope display lettering; CSS uses a distinct body face, restrained tracking and self-hosted font variables. This follows the recorded Manrope/Jakarta direction. |
| MATERIAL | Match | Current desktop.png, portfolio-1440.png and project-390.png show photographic concept mockups at a meaningful scale. The geometric stand-ins have been replaced; the image material is visibly present rather than buried under effects. |
| GROUND | Match | The current first view, process and footer use deep navy; work and reading sections use white with restrained cool pale surfaces. CSS declares navy #071a33 and white #fff, consistent with the explicit palette. |
| First viewport | Match | Both home viewport captures explain the technology offer and expose a consultation action immediately. Desktop balances the large left headline with right supporting copy and a wide artifact; mobile retains readable type and a substantial product image. The remembered object is the dark laptop/mobile product presentation. |
| Portfolio before services | Match | desktop.png and mobile.png place selected work immediately after the opening. The first work image receives extra scale, followed by the two secondary works. Services use linked ruled rows. |
| Navigation / buttons | Match | Both menu captures show clear, uncrowded links and consultation action. Desktop capsule navigation and rounded rectangular CTAs follow the Until-influenced contract without copying reference artwork. |
| Internal-page reflow | Match | Supplied paired route captures preserve hierarchy, usable image crops, filter wrapping, readable articles and a single-column contact form at 390px. |
| Concept truth at the opening | Missing | home-1440-viewport.png and home-390-viewport.png show the Alur mockup without a visible concept disclosure. The surrounding labels say “Strategi. Desain. Teknologi.” / “Lihat karya kami.” Later project cards disclose concepts, but that disclosure is absent where this example is first presented. |
| Empty proof omitted | Contradicted | about-1440.png and about-390.png retain “Manusia di balik setiap solusi.” followed by “Profil tim akan diperkenalkan setelah informasi resminya tersedia.” The About source renders TeamSection unconditionally. The direction explicitly says empty proof sections are omitted. |
| Opening motion | Supported, visually limited | motion.tsx and CSS define one 900ms image reveal, visible default content, bounded desktop parallax and reduced-motion/mobile bypasses. The captures establish the static endpoint only. |

## ceiling

Against the supplied direction, the photographic artifacts, strong type scale, early work discovery and large closing wordmark commit to the chosen agency world. There is no material reason to rebuild the composition. The interpretation is restrained: it does not establish parity with Ulysses' live experiential art direction, and the reduced-motion evidence cannot establish that. A separate QUALITY BAR card was unavailable, so an independent card-level ceiling claim is withheld. No additional ornamental or motion devices are required by this review.

## material_fixes

1. Truth / image policy: add a concise visible concept disclosure to the hero image caption, such as “Konsep eksplorasi — Alur”; verify it remains visible in home-1440-viewport.png and home-390-viewport.png without becoming an eyebrow above the headline.
2. Story / empty proof: omit the About TeamSection when there are no published team members, just as the homepage already does; about-1440.png and about-390.png must close the process section into the next substantive section without the team-coming-soon block.

## keep

Preserve the navy-white palette, large calm typography, actual concept imagery, early work discovery, sparse linked service rows, readable mobile reflow and direct consultation path while resolving the two disclosure/content issues.
