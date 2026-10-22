# Wasla design system — Phase 2

Status: original design direction derived from the user's explicit brief and Phase 1. Technical implementation is authorized by the request to complete all phases. No separate Figma or owner sign-off is claimed.

## Identity and art direction
“Precision in Technology. Creativity in Every Detail.” Navy editorial studio, Indonesian language, confident large type, understated controls and diagrams that explain connection and progress. ENERGY 3 / RHYTHM 3 / MOTION 2. Public marketing persuades; portfolio lets the work lead; articles prioritize reading; CMS prioritizes editing.

Original logo is missing. Use the full name as a text wordmark without inventing a W or intertwined replacement. Logo fields exist in Site Settings. Final vector tracing, monochrome white/navy assets and logo favicon remain dependent on the original asset. A typographic browser icon may be used as an explicitly provisional identity asset, not a claimed logo derivative.

## Tokens
| Token | Value | Purpose |
| --- | --- | --- |
| navy | #071A33 | hero, footer, headings |
| royal | #143A66 | raised navy surfaces |
| white | #FFFFFF | content and text on navy |
| blue | #397BFF | sparing graphic/focus accent; not small white-text button fill |
| action | #245FD1 | readable primary button background |
| ice | #F5F8FC | quiet section alternation |
| line | #E5EDF5 | dividers on white |
| slate | #526277 | secondary text on white |
| light-blue | #DCEAFF | secondary text on navy |

Manrope, locally hosted, is the display voice: geometric, open and precise. Plus Jakarta Sans, locally hosted, provides Indonesian body readability. Avoid extreme tracking. H1 clamp(42px, 6.6vw, 96px), H2 clamp(34px, 4.4vw, 64px), H3 26–36px. Body 17–20px, mobile ≥16px. Heading tracking -0.035em, leading 1.05–1.12; body leading 1.65. Text measure ≤70ch.

Spacing: 4/8/12/16/24/32/48/64/96/128px. Wrapper max-width 1440px includes 56px desktop gutters, leaving 1328px inner content. Laptop gutter 32px, mobile 20px. Section padding 112px desktop / 72px mobile. Radii: 4px buttons, 12px imagery, 50% circular navigation arrows. Actual mockup shadow: 0 24px 50px #16251d22; hero mockup uses drop-shadow(0 18px 32px #0005) to lift the demonstration plane. Hairlines define structure; every item is not a card. Display heading tracking uses -0.035em; tightly set text wordmarks have their own -0.06/-0.07em optical treatment.

## Components and states
- Buttons: action blue, white on navy, outline, text link. 48–54px height, 16px semibold, 4px radius, 200ms transition, focus 3px blue outline with offset. Disabled/pending clearly labelled. Arrows denote forward navigation and portfolio detail, never every action.
- Navigation: full text wordmark, four primary destinations, consultation CTA. Solid sticky navy surface. Active page via aria-current. ≤900px collapses to native disclosure button and readable link panel, closes on Escape and route choice. No inaccessible div controls.
- Services: featured numbered editorial rows with original geometry representing layers, path, integration; secondary links retain category context. Numbers only where ordering has meaning (process).
- Projects: image first, title/category, persistent concept label when applicable, labelled circular arrow link. Filters are real buttons with aria-pressed and empty result feedback.
- FAQ: native details/summary, clear plus/minus states, keyboard operation, no hidden essential copy.
- Forms: visible labels, explanatory optional markers, inline field errors, consent, honey field excluded from accessibility, server result region. Data retained after recoverable errors. No success before saved record.
- Articles: 70ch reading column, hierarchical rich text, safe renderer; no raw HTML interpolation.
- Admin: Payload's accessible editing primitives; role-based sidebar visibility and server authorization. No decorative marketing motion in admin.

## Original graphics and asset plan
| Asset | Implementation | Honesty and rights |
| --- | --- | --- |
| connection composition | authored SVG line geometry and restrained CSS depth | original; not the brand logo |
| project/browser/device visuals | authored semantic HTML interface demonstrations, rasterized to optimized WebP for cards where useful | always labelled “Konsep eksplorasi”; no client claim |
| service diagrams | exact SVG layers/routes/nodes | original geometry, not stock icons |
| process timeline | semantic ordered list, CSS line and progress accent | ordering explains workflow |
| section transition | straight hairline and navy/white composition change | no copied waves |
| team imagery | actual CMS uploads only | no invented staff or generated portraits |
| brand mark variants | pending supplied original | no fabricated replacement |

All source artwork is editable in the repository. Fonts carry OFL licenses. Research screenshots are excluded from public assets.

## Motion
Entrance 650ms, ease cubic-bezier(.16,1,.3,1), first browser session only, non-blocking and skippable. Hover 200ms. Artwork parallax ≤22px desktop, rAF-gated passive scroll, removed below 900px and with prefers-reduced-motion. Text stays visible by default. No motion library is needed for these bounded effects; CSS and a small client island reduce shipped JavaScript. No-JS retains navigation, all headings, links and forms' explanatory state.

## Visual review criteria
The first viewport must communicate software services, the name and next action immediately. Navy stage plus original technical composition establishes memory. Below it, alternate editorial statements, service rows, large project plates, timeline and compact reading previews. At 390px all content is one column without overflow. Contrast and actual click-through are measured during Phase 3, not asserted here.
