# Wasla Informatika — Reference Research

Latest user correction: Vodjo `.com` is now the dominant structural target. See the [literal REA measurement study](evidence/vodjo-exact-2026-10-22.md) and [current direction](vodjo-direction.md). Earlier mixed-reference synthesis remains research history rather than authority for the current layout.

Revision: the new REA MCP capture pass and original implementation implications are documented in [refresh-2026-10-22.md](evidence/refresh-2026-10-22.md). The revised code-first direction is in [redesign-direction.md](redesign-direction.md). Exact typography identities and motion timings are not inferred from visual similarity.

Research date: 22 October 2026, Asia/Jakarta. Phase 1 is research and synthesis; the user subsequently requested all three phases in this task. Design and implementation follow the documented synthesis, without claiming a separate owner approval.

## Method, availability and evidence

REA MCP launched local Chrome and captured browser-visible DOM, accessibility trees and screenshots. Desktop: 1440×900. Narrow viewport: 390×844. REA performed declared waits, PageDown presses and menu clicks. This is browser emulation, not physical phone testing. No third-party forms were submitted. No private source, protected content, authentication or paywalls were accessed.

Context7 and Figma tools are absent from the enabled tool inventory. Official documentation replaces Context7; repository specifications replace editable Figma delivery. CUA returned “No browser is available”; REA browser automation worked. We do not claim a Figma file, source-code reconstruction, exact animation duration, FPS, Core Web Vitals, numerical reference contrast, or pointer-hover verification.

Evidence and original sampled screenshots: [detailed Ulysses/Until ledger](evidence/references-two.md), [REA session bundle](evidence/rea-references-session.json). Research images belong only in docs/evidence and must never ship as Wasla assets.

| Reference | Evidence | Coverage |
| --- | --- | --- |
| Ulysses | U1–U4, full IDs in linked ledger | early/settled desktop, scroll, narrow reduced-motion view, menu |
| Vodjo | `ev_fb5cef217469f8aea5830f5f4e2ab1813027c2fc29d51c28364dac93752aaa3d` | 1440×900, reduced-motion, initial DOM and screenshot |
| Vodjo | `ev_78d60cf896a04a36e9d4365609181f9aac7fd77809ace6c7b2009037e9a11bc4` | desktop, normal motion, initial and PageDown sampled states |
| Vodjo | `ev_814e3f7f42a0c6386e2eb51705c5cd1784b8a5e7c4fffedd23c6a3ac29df48d9` | 390×844, normal motion, hero and DOM |
| Vodjo | `ev_19869067e3f2432d90fcdc53a70404aab65fc8ecac700b855f483ac83a1949f1` | narrow reduced-motion menu click, screenshot and accessibility |
| Until | T1–T4, full IDs in linked ledger | desktop, scroll, narrow reduced-motion view, menu |

**Labels below:** “Observed” means visible or present in captured browser DOM. “Interpretation” means our design judgment. “Unverified” explicitly marks missing evidence. DOM styling declarations do not establish computed metrics or actual pointer behavior.

## 1. Ulysses de Santi

Source: https://ulyssesdesanti.com/?ref=minimal.gallery

### Executive summary — interpretation
The opening makes identity itself the subject: a proprietary black monogram and long white intervals lead into a staggered photographic collection. The valuable lesson is conviction in one visual idea. A technology agency must add immediate service context and a usable conversion path.

### Observed visual, type and layout patterns
- U1 shows a small centered black mark on white after the declared 1.8-second wait. U2's later sample shows navigation and an oversized monogram across most of the lower first viewport. These prove two states, not the loader's exact duration or cause.
- The giant hero element is an SVG mark, not a font heading. Top navigation is compact sans-serif; mobile links are large, heavy, condensed uppercase. Font identity and pixel sizes were not measured.
- Photography follows with deliberately unequal sizes, square edges, thin gutters and offset columns. A light project label sits near the bottom center.
- Navigation exposes Exhibitions, Spaces, About and email. Project media link to detail routes.

### Observed motion, navigation and mobile
PageDown moves into the photographic collection; the samples do not establish parallax ratios or easing. At 390px the large white opening remains, then images stack with some offsets. The menu opens to near-black, full-height stacked white links and footer information. The inspected trigger is a div without native button semantics, name or tabindex. Full keyboard behavior remains untested.

### Strengths and weaknesses — interpretation
Strong signature, quiet chrome and image-led pacing. Risks for Wasla: a visitor may see neither service nor CTA in the early state; sparse labels make project context harder to judge; the trigger semantics are an accessibility concern. Real-device speed, exact entrance timing, reduced-motion bypass and hover outcomes remain unverified.

### Appropriate / do not copy
Adopt scale contrast, purposeful negative space and an asymmetric portfolio rhythm. Do not reuse the proprietary monogram, paths, imagery, wording, offsets or its exact mark-to-gallery sequence.

## 2. Vodjo

Source: https://www.vodjo.com/id/

### Executive summary — interpretation
A conventional agency architecture provides a clear map from proposition to examples, capabilities and consultation. Its credibility comes from content categories and identifiable work rather than a complex interaction model.

### Observed navigation and hierarchy
- Desktop header contains logo, Tentang, Layanan, Portofolio, Blog, Karir, Kontak, EN/ID, and social links.
- Hero is black with a large laptop photograph, left-aligned white heading, supporting paragraph and outlined “Hubungi Kami” anchor to the consultation section. A scroll cue and floating WhatsApp control are visible.
- After PageDown the header is white with dark logo/navigation. A layered wave separates the black hero from a white portfolio section.
- Heading order in DOM: hero → Portofolio → four project headings → Layanan Kami → Klien Kami → Konsultasi Gratis. Expertise/process copy and testimonials also occur before the footer.
- Portfolio imagery forms a tight two-column desktop grid of website and phone mockups. Project headings captured include KKBC, Avoskin, Going Merry and SIMPEG GO. These are reference content, not claims about Wasla.
- Service DOM contains linked illustrations/links, descriptions and repeated detail CTAs for web, mobile and AI development.
- Consultation has labelled name, work email, phone, company and message inputs plus send action. It was inspected, never submitted.
- Footer exposes company identity, address, telephone, email, social links and repeated navigation. A testimonial carousel and client logos are present; their truth was not independently audited.

### Observed typography, buttons and components
The browser DOM requests Google Fonts Poppins 300/400/600. Hero heading is bold, supporting copy compact, section titles centered and uppercase. Main contact button has a fine white outline and capsule geometry. Project visuals have very little framing. Body copy is considerably smaller than the desired Wasla 17–20px scale. This is a visual comparison, not a computed-pixel measurement.

### Observed motion and responsive behavior
Two desktop samples show a dark-to-light sticky-header state change after scroll. DOM contains animation classes, Slick carousel markup and wave image resources; class/library names do not prove exact easing or smoothness. At 390px navigation collapses to language selectors and hamburger. Clicking `.menu-toggle` opens a full-height black menu with centered stacked links, close control and social links at the bottom. Underlying accessibility capture still lists main-page content; focus trapping was not tested. On mobile the hero photograph crops while text remains readable; the WhatsApp circle occupies the lower right.

### Strengths and weaknesses — interpretation
Strengths: visible work early in the flow, clear service taxonomy, dedicated detail destinations, consultation near the homepage's end, persistent contact action, and company details in the footer. Risks: crowded desktop chrome, compact copy, repeated centered structures, a non-native div menu trigger, and floating controls competing for phone space. No complete accessibility or lead-delivery audit was performed.

### Appropriate / do not copy
Use clear service/project detail routes, labelled fields, a persistent contact entry, and explicit project context. Do not borrow client logos, testimonials, company data, images, wave graphics, prose or exact layouts. Wasla should use fewer top-level items, larger text and editorial variation.

## 3. Until Labs

Source: https://www.untillabs.com/?ref=minimal.gallery

### Executive summary — interpretation
An immersive, particle-like photographic scene carries the story, while tightly set sans-serif headings and a coherent capsule button family provide structure. The transferable value is disciplined hierarchy around one expressive scene.

### Observed visual/type/button patterns
- Desktop is dominated by a stylized picnic scene with soft particle-like circles. Cream-white large sans type sits near the lower edge, followed by a bracketed scroll instruction.
- DOM declares tight leading and negative tracking for display type; exact family and computed sizes were not independently measured. Split heading fragments are aria-hidden with readable full labels.
- A translucent capsule holds mark/wordmark, seven links and a cream CTA. DOM declares rounded button shapes, approximately 36px height utility classes and hover background/text transitions. Pointer hover and its duration were not observed.
- Mobile reduces chrome to mark, CTA and semantic menu button. The opened cream rounded panel has large centered links, a close control and dark CTA. Button declarations include aria-expanded/controls, an accessible name and focus-visible styling; dialog declarations include aria-modal. Actual focus trapping/Escape were not tested.

### Observed scroll and mobile
T2's PageDown samples zoom closer into the scene; navigation contracts to mark plus CTA. Heading text fades in intermediate samples. This establishes scene progression, not rendering technology or FPS. At 390px with reduced-motion the scene is vertically cropped, its framing still changes after scroll, and the desktop heading is not readable in the sampled state. Because width and preference changed together, an isolated reduced-motion fallback is unverified.

### Strengths and weaknesses — interpretation
Memorable visual subject, consistent button geometry, compact conversion action, economical large type. Risks: scroll effort before conventional content, faded intermediate copy, changing contrast on imagery, and the engineering cost of a particle narrative. These are risks, not measured performance failures.

### Appropriate / do not copy
Adopt deliberate heading wraps, calm navigation, a coherent filled/outline/text button family and well-spaced mobile links. Avoid its mark, scene, proprietary graphics, exact capsule dimensions, text and pinned narrative. Its scientific claims have no relevance to Wasla.

## 4. Original Wasla synthesis — recommendations

**Concept: “Precision in Technology. Creativity in Every Detail.”** A navy editorial studio with an original connection diagram and authentic, labelled interface demonstrations. The graphic expresses the path from business need to usable software. It is not a substitute for the missing Wasla logo.

### Homepage flow
1. Navy navigation and immediately readable hero: Indonesian proposition, consultation CTA, work link, original connection artwork and labelled concept mockups.
2. White editorial brand statement: the business purpose behind engineering.
3. Services grouped by development, design, infrastructure and consultation, with a featured row and compact secondary links.
4. Large selected work, unequal image scales, category and unmistakable concept labels until client content arrives.
5. Why Wasla: concrete collaboration principles; no invented success metrics.
6. Expertise: a typographic/connection system explaining technical choices, not a wall of unverifiable certification logos.
7. Process timeline: discover → design → build → launch/support.
8. Team: CMS-driven actual profiles; honest empty editorial state until supplied.
9. Insights: original educational articles and detail routes.
10. FAQ addressing scope, content, maintenance and consultation.
11. Navy final CTA and factual footer; no invented business number.

### Motion contract
The page is visible and usable before enhancement. A first-session 650ms wordmark/hero accent reveal never blocks content or scroll; no artificial loader. A skip control may end it immediately. The original connection artwork translates at most 22px with scroll on wide screens; project imagery responds to hover with a small transform. One 500ms image-mask entrance, 200ms buttons, and a timeline progress accent provide hierarchy. No scroll hijacking, pinned multi-screen scene, infinite floating or custom cursor. Reduced-motion, narrow screens and no-JS receive readable static content. These durations are design choices, not reference measurements.

### Design handoff strategy
Navy #071A33 and white dominate; Manrope display plus Plus Jakarta Sans body; 8px spacing foundation; 4–12px corner language; 48px minimum primary controls; visible keyboard focus; a semantic mobile menu; images with alt text; contact success only after database persistence. Review 1440/1024/768/390px plus reduced-motion and no-JS. Do not claim measured performance until tested.
