# Wasla UI/UX specification and development handoff

This describes the implemented image-led revision. The user approved specification → code → browser review. There is no separate Figma file or approved image comp. [PRODUCT.md](../PRODUCT.md) carries factual commitments, [the direction contract](redesign-direction.md) page strategy and [DESIGN.md](../DESIGN.md) exact visual tokens.

## Visitor journeys

Business need → service → scope/deliverables → consultation. Work discovery → filter → project detail → consultation. Insight → article → consultation. Staff → authenticated `/admin` → draft → authorised preview → publish. Public copy is Indonesian and public queries show eligible published content.

## Routes

| Route | Composition and behavior |
| --- | --- |
| `/` | Navy type/image hero; selected work; services; agency approach; process; optional team/testimonials; insights; optional FAQ; consultation; footer |
| `/tentang-kami` | editorial introduction, principles, process, populated team only, closing CTA |
| `/layanan` | introduction and CMS service rows with real detail destinations |
| `/layanan/[slug]` | title/intro, authored service visual, rich text, deliverables, process and CTA; missing/draft gives 404 |
| `/portofolio` | introduction, concept disclosure, category buttons, count/empty feedback and image plates |
| `/portofolio/[slug]` | image, summary, challenge, solution, optional real results, technology, gallery and CTA; concepts disclosed |
| `/insights` | introduction, filters and reading previews with published date/category/excerpt |
| `/insights/[slug]` | title, category/date, image, semantic rich text and CTA; no invented author |
| `/kontak` | invitation, supplied factual channels and form; query-based service preselection; private persistence |
| `/privasi` | contact-data purpose and owner-contact guidance without unsupported legal guarantees |
| `/admin` | Payload staff editing; administrator-only user management and server role enforcement |

## Homepage and opening

The first screen exposes the name, Indonesian technology proposition and consultation action. Desktop uses a 1.9:1 headline/copy split above a large CMS-managed project photograph. Concept imagery has an explicit visible overlay, followed by caption/link and a Website / Aplikasi / Solusi IT rail. The optional reveal never hides the headline.

Selected work follows immediately: one full-width featured plate and two secondary works on desktop. Services are unnumbered links, then agency approach/three principles and the four-stage ordered process. Team/testimonials appear only with eligible records. Insights, populated FAQ and consultation finish the page. Footer includes actual destinations, privacy, back-to-top and a large text wordmark; factual channels show only when supplied.

## Responsive layouts

Wrapper maximum is 1600px including clamp(24px, 5vw, 80px) gutters. At 1440px, gutters are 72px and inner content 1296px; at 1024px gutters are 51.2px; at 768px 38.4px; at 390px the override is 22px.

| Condition | Composition |
| --- | --- |
| Above 1100px | 120px sections; 100px header; capsule navigation; split hero; two-column work; four-column process |
| At/below 1100px | 90px sections; tighter desktop spacing and 70px hero before tablet override |
| At/below 900px | 80px header; native mobile menu; stacked hero/services/FAQ/consultation; two-column process |
| At/below 600px | 72px sections; 22px gutter; single-column work/articles/team/testimonials/form; two-column process; full-width hero imagery |

Narrow hero is clamp(42px, 11.6vw, 64px)/1.1, general H2 37px, default body 14px. Compact contextual text follows DESIGN.md. Standard narrow buttons are at least 48px; filter/menu trigger 44px. Anchor offset is 110px. No fixed viewport-height text trap.

## Interaction and state contract

Desktop links expose current-page semantics. Native details/summary opens a nonmodal mobile link panel; Escape closes and restores summary focus, route selection closes. Essential content never requires hover. FAQ uses native disclosures. Image arrows belong to their enclosing links, avoiding nested controls. Filters use aria-pressed, counts and meaningful empty states.

Shared focus is a 3px Blue outline with 5px offset. A skip link reaches main content. Images use CMS alt text and Next image sizing. Rich text retains semantic headings, paragraphs, lists and links. Missing real-project media states that an image is unavailable; concept fallbacks remain visibly concepts. Loading/error/not-found routes exist. These choices are not a comprehensive assistive-technology certification.

## Contact flow

Fields: name, email, optional company/phone, published service or undecided option, 20–5000-character message, consent and hidden honeypot. Pending, validation failure, connection failure and saved success are distinct. Recoverable errors retain values; server field errors focus the first affected field. Feedback uses alert/status semantics. The JSON form requires JavaScript; no-script text explains this and points to email when supplied.

`POST /api/contact` verifies origin/content type, limits size, applies database-backed rate limiting, validates input/service availability, then creates a private Payload contact submission in PostgreSQL. Success follows creation. Configured SMTP may notify staff; notification failure does not erase a saved record. No invented response-time guarantee or hardcoded business channel.

## Motion

First eligible session: skippable 900ms image clip reveal, with SSR heading already readable. Above 900px in normal motion, passive rAF-gated scroll offsets imagery at most 22px. Narrow/reduced-motion imagery is static; reduced motion also removes image hover transforms and smooth scrolling. Buttons use 250ms state transitions, arrows 350ms and image hover 700ms. No mandatory splash, artificial delay or scroll hijacking. Screenshots establish static endpoints; live motion has separate test evidence.

## Content and asset ownership

Media, Services, Projects, Posts, Team, Testimonials and FAQs serve editorial content; private Contact Submissions and staff Users serve operations. Site Settings and Navigation are globals. Public queries enforce published visibility; testimonials additionally require approval. Preview is authenticated and drafts remain private.

Settings own hero title/copy, statement, heroImage, supplied logos and factual channels. Projects own thumbnail/gallery and isConcept; posts own image. Hero falls back to a featured thumbnail. Original WebP mockups Ruang, Alur and Sela are replaceable concepts, with prompts/provenance and CMS instructions in [assets.md](assets.md). `seed:media` fills empty demo relationships without replacing owner choices. No reference image, fake client proof or generated staff portrait is published.

## Review and remaining inputs

[redesign-validation.md](redesign-validation.md) owns current technical/browser/content lifecycle evidence; [visual-review-redesign.md](visual-review-redesign.md) owns the visual disposition and scoped review of the final two fixes. Current code adds the hero concept overlay and omits empty About team content; custom nonconcept upload does not receive a false label. This documentation refresh is not an independent rerun of tests or visual review.

The old detector's 130 advisories compare the replacement implementation to superseded DESIGN tokens: 112 type, 9 radius, 9 color. Tokens are refreshed here; the detector was not rerun. Old crop files depicting the discarded design are not authority. [The reference refresh](evidence/refresh-2026-10-22.md) is bounded research, not exact reference font/motion or accessibility certification.

Original logo, real project outcomes, official people/testimonials, business channels, domain and production hosting remain owner inputs. Deployment, external storage and SMTP require configured services. This handoff describes the local implementation and its honest, replaceable examples.
