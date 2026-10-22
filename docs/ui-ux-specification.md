# Wasla UI/UX specification: Vodjo-led revision

The user's latest close-reference direction in [vodjo-direction.md](vodjo-direction.md) supersedes the earlier editorial interpretation. [Fresh evidence](evidence/vodjo-exact-2026-10-22.md) supplies screenshot-derived proportions; [DESIGN.md](../DESIGN.md) records actual implementation. Workflow remains specification → code → browser review; no Figma comp is claimed.

## Homepage journey

Full100svh photographic hero → layered wave → centered portfolio introduction and four dense16:9 concept tiles → wave → dark three-column service illustrations/text/actions → wave → transparent device beside expertise/process rows → five technology text tiles → gray consultation form → eligible real testimonials → compact centered footer with wave boundary.

The hero keeps Wasla's Indonesian proposition left, workspace subject weighted right, descriptor and outline consultation action, scroll cue and factual illustration disclosure when media is marked as concept. Hero MediaImage requests100vw. It is not the discarded oversized split editorial poster. Portfolio is balanced2×2 with2px seams, stacked narrow; title appears on desktop hover/focus and remains visible narrow, while accessible link names and concept labels are persistent.

The technology strip contains actual stack names, not fabricated clients. Testimonials appear only with eligible published/approved records. The compact footer publishes only supplied contact/address/social details. Floating chat uses valid WhatsApp when configured or links to consultation. Reference artwork, client work, names, copy, contact information and proprietary code are not reused.

## Routes and content

| Route | Purpose |
| --- | --- |
| `/` | proposition, work, services, expertise/process, technology and direct private consultation |
| `/tentang-kami` | Navy masthead; CMS feature image left/copy right; principles, process, actual populated team, CTA |
| `/layanan` | Navy masthead; alternating equal image/text service bands, real detail pills and native FAQ |
| `/layanan/[slug]` | published scope, deliverables, content, authored visual, process and contact |
| `/portofolio` | Navy masthead; concept disclosure, centered text category filters, accessible count/visible empty feedback and Media work |
| `/portofolio/[slug]` | project context, challenge/solution, optional real results, technologies/gallery, contact |
| `/insights` and `/insights/[slug]` | dedicated published article discovery and semantic reading; no invented author |
| `/kontak` | Navy masthead; factual-channel/form split, single-column form fields and service preselection |
| `/privasi` | clear contact-data purpose without invented legal guarantees |
| `/admin` | authenticated Payload staff editing and administrator user management |

Missing/draft details are unavailable anonymously. Public editorial queries enforce publishing access; testimonials require approval. Team and Insights do not fill homepage gaps. Contact submissions remain private. Original logo and official company evidence are owner inputs.

## Layout and interaction

Outer1140px/inner1110px desktop grid uses15px gutters. At1199/991/767 maximums wrapper960/750/570px; at575 fluid. Hero50px/62px,45px tablet,39px narrow,36px portrait; centered section H2 uppercase36px,30/29px narrow. Self-hosted Poppins300/400/500/600/700 throughout. Body14px, compact13px; reading15px/1.9 and72ch,14px narrow.

Fixed header82px initial desktop/64px scrolled, transparent-to-White after 80px. Shared PageIntro routes keep initial White text over their Navy masthead, then change to White on scroll; other internal routes retain the White header. Mobile starts86px and opens a full-screen Deep Navy menu at/below991px with96px top band. Native details/summary remains operable without JavaScript. Enhanced menu makes main/footer inert, wraps Tab, closes on Escape with focus restoration, route choice and desktop resize. Background content hides/scroll locks; floating chat hides. ID is a static language label, not a nonfunctional switch.

Below767px work/services/consultation stack, feature image precedes copy, technology becomes two columns plus final full-width tile. Portfolio filters use aria-pressed on centered semibold text buttons,20px desktop/18px narrow,44px minimum, transparent/no border/no radius, with8px26px desktop gaps and4px20px narrow gaps; bottom margin14px. Slate inactive text becomes Navy on hover/selection; active underline is1px with6px offset. The count retains role=status but is clipped to1?1px, reserving no gallery space; empty feedback remains visible. Article filters retain pills and focus styling is unchanged. At/below767px catalog overlays are disabled so project titles appear once in external captions; homepage titles stay visible in overlays while external captions remain hidden. Desktop catalog overlays still respond to hover/focus. FAQ uses native disclosure. Global focus is3px Blue with5px offset; skip-to-main is available. Detail rich text retains semantic structure. These are implementation requirements, not a claim of comprehensive accessibility certification.

## Internal mastheads and content bands

Shared PageIntro supplies short index titles on a full Deep Navy field, centered White H1 54px desktop / 42px below 767px, and Light subtitle 13px at both widths. Desktop padding is 145px top and 60px bottom, subtitle gap 8px, layered closing wave 140px and following margin 85px. Narrow uses 112px/35px padding, 8px subtitle gap, 40px wave and 55px following margin; a single-line title and two-line subtitle give an approximately 286px compact masthead. It replaces the discarded White introduction. Optional masthead actions are White outline capsules.

About shows global `featureImage` left and company copy right, equal columns with 30px gap; narrow stacks image first. Services alternates 50/50 image/text bands with a 30px gap and 65px spacing. CMS `service.image` covers a 2:1 region; unavailable media uses authored geometric ServiceArt. Text is at most 555px with 36px title, 13px excerpt and a real pill detail link. Below 767px the image always leads, gap is 25px, spacing 45px, title 28px and text gutters 15px. The dedicated Contact form uses one column at all widths; the homepage consultation field grid remains two columns on desktop.

## Contact and CMS

Form asks name/email, optional phone/company, published service or undecided option,20–5000-character need and consent; honeypot included. White46px fields with2px corners sit directly on Ice, textarea128px. Inline errors, pending, connection failure and saved feedback are distinct; recoverable errors preserve values and first server error receives focus. JSON submit requires JavaScript with honest no-script guidance.

`POST /api/contact` validates origin/content type,size,input/service and database-backed rate limit, then saves privately through Payload/PostgreSQL. Success follows persistence. Configured SMTP is optional notification; saved records survive notification failure. No invented response deadline or channel.

Service bands use the service image Media relationship. About reuses featureImage. Site globals own heroImage and new featureImage (migration20261022_102006), titles/copy/logos/channels. Project thumbnail/gallery and post image remain Media relations. Six original generated WebP assets and exact prompts/provenance are documented in [assets.md](assets.md):four concepts, illustrative workstation and transparent device. Seed preserves owner choices and documents the legacy demo hero transition. Actual projects/people/evidence replace examples through CMS; isConcept labels remain truthful.

## Motion and review limits

Visible SSR content; optional skippable first-session900ms backdrop clip. Hero desktop offset capped72px, feature±28px; below-fold groups may reveal once over650ms through IntersectionObserver. At/below900px or reduced motion all enhancements are static; no-JS content starts visible. These are explicit Wasla enhancements; reference capture did not establish Vodjo parallax or precise animation timings.

Source-derived documentation does not claim final build, browser review, deployment or owner approval. The main workflow owns final production evidence. Historical detector106 advisories comprise84 type,10 radius,12 color against old tokens; documentation is refreshed without a rerun. Fresh reference captures are research-only. Preserve the pinned close-reference structure while retaining legitimate differences needed for truthful content, accessible controls and real persistence.
