# Wasla implemented design system

This records the image-led revision implemented on 22 October 2026. [DESIGN.md](../DESIGN.md) owns extracted tokens; [.impeccable/design.json](../.impeccable/design.json) adds motion, breakpoints and component previews. Source authority is the frontend stylesheet, layout and shared UI/navigation/motion components. [The direction contract](redesign-direction.md) records the user's code-first choice. No Figma comp or owner approval is claimed here.

## Identity and reasons

Navy and white establish Wasla's identity while retaining readable surfaces. Large Manrope headings supply scale; Plus Jakarta Sans separates practical copy and controls. Both fonts are locally hosted with swap behavior. Generous space lets original project photographs carry the visual argument. Open project plates avoid enclosing already grouped imagery/title/category. Rounded rectangular buttons supply consistent action shapes; circular arrows identify destination links.

ENERGY 3 / RHYTHM 3 / MOTION 2. Marketing persuades, portfolio supports discovery, articles support reading, contact/CMS support operation. Ulysses informs scale/pacing, Vodjo agency hierarchy, Until compact navigation/buttons. Reference artwork, source code and client claims are not reused. Transitions are straight, with no waves. The text wordmark is provisional until the original logo is supplied; real people, results and business channels require owner content.

## Palette and type

| CSS role | Value | Purpose |
| --- | --- | --- |
| Navy | #071a33 | identity surfaces, text, standard buttons |
| Royal / hero panel | #153454 / #10253e | button hover / image stage and caption |
| White / Ice | #fff / #f2f5f8 | reading / alternating sections |
| Line / field line | #d5dce4 / #bdc8d5 | dividers / field and arrow borders |
| Slate / Light | #526277 / #c8d6e6 | supporting copy on light / navy |
| Graphic Blue / Action Blue | #397bff / #245fd1 | focus / caret |
| Dark Line / Nav Active | #40506a / #203752 | dark borders / navigation state |
| White Hover | #dceaff | inverted button hover |

Hero type: clamp(52px, 6.15vw, 88px), 500 weight, 1.06 leading, -0.035em tracking. General H1/H2/H3: clamp(44px, 6.7vw, 96px), clamp(34px, 4.2vw, 60px), 25px. Default body: 15px/1.75. Supporting copy: 13–14px; labels: 12px; metadata: 9–12px. At 600px body becomes 14px, H1/H2 44/37px and hero clamp(42px, 11.6vw, 64px)/1.1. These are implemented values, not a claim that all mobile copy is at least 16px. Full contextual scales are in DESIGN.md. Paragraphs cap at 70ch; prose at 72ch.

## Space, shape and responsive rules

Wrapper maximum: 1600px including clamp(24px, 5vw, 80px) gutters; narrow gutter: 22px. Sections: 120px above 1100px, 90px at/below 1100px, 72px at/below 600px. Header: 100px, becoming 80px at/below 900px. Anchor offset: 110px.

| Breakpoint | Change |
| --- | --- |
| 1100px maximum | tighter desktop header/hero; 70px hero; 420px image height |
| 900px maximum | native mobile menu; stacked hero/services/FAQ/consultation; two-column process; static hero |
| 600px maximum | single-column work/articles/people/testimonials/form; two-column process retained; full-width hero imagery |
| 1700px minimum | hero split adjusts to 1.6:1 |

Projects use two columns with 56px/32px row/column gaps; first homepage work spans both columns at 1.96 ratio, other images 3:2. Narrow work uses 1.35. Hero crop is centered, then 1.8 tablet and 1.26 narrow with 58% horizontal positioning. Verify crop after replacement.

Standard buttons: 18px radius, 52px minimum, 13px 22px padding. Narrow: 16px, 48px, 12px 18px. Header CTA/filter/menu trigger: 16px radius; capsule navigation 22px, inset links 17px; fields 6px; labels 4px; arrows 50%. Images are square-edged. The flat page uses only a mobile menu separation shadow: `0 20px 40px #071a3326`.

## Components and behavior

- Buttons: Navy/White, inverted White/Navy and outline; 250ms color/border feedback, 350ms arrow movement. Focus: 3px Blue with 5px offset. Pending: 0.55 opacity, wait cursor, saving text.
- Navigation: sticky Navy header, desktop capsule, current-page semantics; native details/summary opens a White mobile panel. Escape restores summary focus; route selection closes. No hover-only essential information.
- Services: unnumbered divided links. Stage numbers belong to the ordered process.
- Projects: Media thumbnails, persistent concept labels, external captions and real detail links. Hover scales 1.025 over 700ms; reduced motion disables it. Filters use aria-pressed with count/empty feedback.
- FAQ: native disclosures with rotating plus.
- Forms: visible labels, optional markers, 50px fields, 120px textarea, inline errors, consent and result status. Success follows private Payload/PostgreSQL persistence. The JSON form requires JavaScript and states this in no-script copy.
- Articles: semantic rich text and underlined inline links; no invented authors.
- Proof: eligible published records only; empty team/testimonial sections are omitted on home and empty team omitted on About.

## Images and replacement

Three original imagegen photographs converted to WebP depict Ruang commerce, Alur operations and Sela journal. They are replaceable concepts, not client projects or Wasla office photos. [assets.md](assets.md) records exact prompt files and provenance.

`site-settings.heroImage` controls the opening; project thumbnail/gallery and post image are Media relationships. Hero falls back to a featured project thumbnail. Concept hero media carries a visible overlay; custom nonconcept media does not acquire a false concept label. `seed:media` fills empty demo relationships without overwriting owner choices. Real projects without images show an empty message; concepts have a plain authored fallback. No generated team portraits or copied reference photography.

## Motion and evidence limits

First eligible desktop session: optional skippable 900ms image clip reveal, cubic-bezier(.16,1,.3,1), text already visible. Passive rAF-gated scroll uses `min(scrollY × .035, 22)` pixels. At/below 900px or reduced motion, the image is static. Reduced motion also removes hover scaling and smooth scrolling.

The previous detector contains 130 advisories: 112 type, 9 radius, 9 color comparisons with superseded DESIGN.md. This refresh records the replacement values; the detector was not rerun and the old output is retained as historical evidence. It is not 130 confirmed interface defects or proof of a clean rerun. [Validation](redesign-validation.md) and [visual review](visual-review-redesign.md) own current bounded test/review results. This document is source-derived, not a new audit or deployment claim.
