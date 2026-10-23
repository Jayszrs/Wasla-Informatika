# REA reference: IPNU Bekasi structural flip cards

Inspected 23 October 2026. Target: [IPNU Bekasi — Struktural](https://ipnubekasi.my.id/struktural). Scope: the public page and declared browser interactions only; no authentication, private records, source recovery, or security bypass.

## Method and evidence

REA `capture_browser_scenario` launched isolated, empty-profile Chrome 156.0.8078.47 sessions. REA performed the declared waits, card clicks, and keyboard probe. Service workers were blocked. The two successful interaction captures used reduced-motion emulation. Evidence is retained by the active REA session; IDs below identify the complete records. Screenshot hashes identify the exact captured pixels without importing the reference's artwork into Wasla.

| Evidence | Viewport and actions | Coverage |
| --- | --- | --- |
| `ev_03449be0da8eeed374e7d6abda1b3260a66d3f10beaa0ec9899531476055c600` | 1280 × 900; initial page and settling wait | Complete DOM and accessibility snapshot |
| `ev_130a6a62fe32913837377ce057b2183a451e82cee2ea100efde5bcb8bfd94e64` | 1280 × 900; wait, click first leader card, wait, click again, wait | Complete action sequence and DOM states; final front screenshot SHA-256 `8995c790ea1e3d1a9f9ced51430fe654c70f0d2dc5519f296b8f3aadba7dc8cd` |
| `ev_04ddc72c0e4e9d87dc912be63a18038450a6e58b2c967fb39dc379666827e242` | 390 × 844; wait, target card with Enter, wait, click card, wait | Complete action sequence, DOM states, final accessibility and back screenshot SHA-256 `9af344ba85d943e133f5d6e018f6aaf490ac347d878a0b1ed83f43fb029027c6` |

An initial broad card selector matched four elements and failed strict-mode selection (`ev_a62ab369caf07dbf6423ba251763d12ba4909ed61252f2bc9fb207c15530a9b4`). It does **not** establish a successful click. The successful probes selected the unique card containing the first leader's image. Another scenario record (`ev_939cf478eacc7171c66664a5b4c8b46f0996dc8563857a6bd0754d6e5d1ae5a9`) was retained but its large screenshot response exceeded transport admission; conclusions below rely on the later, smaller complete captures instead.

## Verified observations

- The front is a portrait poster with the person's name and position embedded in the artwork. It sits within a tall rounded card. The first leader is centered; other officers occupy a subsequent group.
- One click changes the selected card's inner wrapper to a 180-degree rotation around its vertical axis. Its back replaces the portrait with HTML name, role, organizational information, and a quotation. A second click removes the rotation and returns to the portrait. The page URL remains `/struktural`.
- The captured browser DOM declares a 4:5 aspect ratio, perspective, preserved 3D transforms, concealed reverse faces, a rounded 2rem outline, and a 700ms transform transition. These are observed declarations, **not** measured frame timings or recovered original implementation source.
- The narrow viewport preserves the same front/back model. The card is approximately 288px wide, centered in a single column; the wider viewport shows the primary card at approximately 320px. Mobile navigation collapses to a compact header with a menu control.
- The mobile-width click successfully revealed the back. This was browser viewport emulation using a declared click, **not** a physical touch-device test.
- Targeting the card with Enter did not add its flipped rotation; the subsequent click did. The captured card container is a `div` with a pointer cursor and has no button role or `tabindex`. This establishes a keyboard concern for this card, rather than a complete audit of all keyboard navigation.
- The initial accessibility snapshot includes the back-face biography even when the front face is displayed. Visual back-face hiding alone does not hide that text from accessibility exposure in this capture.
- In the narrow screenshot, the fixed chatbot/WhatsApp controls overlap the lower-right portion of the card. These controls can obscure the biography area.

## Design interpretation for Wasla

The useful reference pattern is a focused team card: identity first, responsibilities and a contact action on the reverse, with an explicit action to turn it back. The mechanism should be original to Wasla's navy/white identity. Do not copy IPNU portraits, poster designs, insignia, biography details, green/gold styling, or wording.

For Wasla, use the four supplied team names and roles. Until real profile photos are uploaded, use intentional typographic identities or initials; do not invent photographs or personal biographies. Let CMS team records supply future photos and responsibilities.

Use an actual button to reveal details, accessible state (`aria-expanded`), and a clearly named close/return control. Support Enter, Space, click, and tap. Keep inactive-face controls out of the focus order and accessibility tree. Place a separate WhatsApp link on the active back face; flipping should not initiate contact.

Retain the card's dimensions across both faces to prevent layout jumps. Reduce rotation to an immediate face change when reduced motion is requested. Keep text readable on small screens and ensure the floating WhatsApp launcher cannot cover the active card's controls. A compact two-column tablet layout and single-column small-phone layout suit four members without recreating the reference's organizational page composition.

## Limits

This inspection verifies a small number of settled states and declared actions. It does not measure the animation's actual frame rate, prove touch behavior on hardware, establish screen-reader behavior across products, or audit the whole reference site. Reduced-motion emulation did not prevent state changes, but transition timing under that preference was not measured. The browser evidence contains public rendered DOM and accessibility content; no claim is made about inaccessible original source code.
