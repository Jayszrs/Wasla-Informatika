# Wasla design system: approved corrections

The owner's latest precise corrections extend the existing Vodjo-led composition. Preserve its navy/white fields, self-hosted Poppins, centered grid, photographic opening, wave cadence and capsule actions. The seven real projects, transparent service objects, actual technology marks, colorful emblem, curved contact cards and huge final wordmark supersede earlier provisional restrictions. This is a code-first implementation; no approved Figma comp is required or claimed.

[DESIGN.md](../DESIGN.md) owns normative token primitives and component guidance. [.impeccable/design.json](../.impeccable/design.json) extends those tokens with motion, breakpoints, shadows and self-contained previews. Sources are frontend globals.css, layout/page and shared UI/navigation/contact components; product truth remains in [PRODUCT.md](../PRODUCT.md).

## Identity and tokens

Navy/Deep Navy carry text and dark fields; White/Ice support reading and consultation; Slate/Light support secondary copy. Blue is visible focus, Royal is action hover. Exact values, type roles, spacing, status colors and radii are in DESIGN.md frontmatter. The restored colorful emblem is an intentional identity exception within the navy/white world. Technology marks are monochrome.

Poppins normal 300/400/500/600/700 is self-hosted. Hero is 50px/1.24 at weight 600, reducing to 45/39/36px at 991/767/575px. Section headings are uppercase 36px, 30/29px narrow. Body is 14px/1.7, compact description 13px/1.55 and reading prose 15px/1.9, 14px narrow, at most 72ch. The final footer signature intentionally uses clamp(100px, 26vw, 370px), weight 600, line-height .9 and tracking -.04em. Its informatika subtitle uses clamp(12px, 1.5vw, 21px), line-height 1.5 and .35em tracking. These are current owner-requested sizes, not accidental detector drift.

Buttons have 30px capsule corners and 44px minimum height; home service actions are 40px. Article filters retain 25px corners; portfolio filters are unboxed. Fields have 2px corners. Contact cards deliberately use 65px 25px 65px 25px, changing to 50px 22px 50px 22px below 767px. No service image panel radius or enclosing background remains. Header and floating-contact shadows are recorded in the sidecar; other content stays flat.

## Responsive composition

The centered outer/inner grid is 1140/1110px, with 15px side gutters. At 1199/991/767px maximum widths become 960/750/570px; at 575px it becomes fluid. Fixed header is 82px initially and 64px after 80px scroll; mobile initially is 86px. The right-side colorful emblem is 46px desktop, 36px mobile, beside the static ID marker. Public navigation says Project and Artikel while keeping /portofolio and /insights.

Hero is 100svh, minimum 700px desktop/680px narrow, with the workstation right and proposition left. Home has seven screenshot projects in two columns with 2px seams; the seventh spans the row at aspect ratio 2.3. Below 767px all stack at 16:9. Home services are three columns, then one; transparent objects use 270px areas, 265px narrow. Feature uses a 540px contained branded device and two copy rows, stacking image first narrow.

Technology is eight actual marks across desktop, four columns at 1199px and below; mark size is 52px, 42px narrow. Contact cards use two columns/22px gaps, one column/16px gaps below 767px. Consultation uses equal columns/30px gaps, then one/38px. Home form fields use two columns desktop; dedicated Contact fields use one at every width. Footer has information, contacts, navigation/copyright and then the huge centered final wasla signature; its placement follows the owner's Jayszrs reference, with Wasla typography and palette retained.

Internal PageIntro uses a centered White H1 on Deep Navy: 54px desktop/42px narrow, 13px subtitle. Desktop padding 145px/60px, closing wave 140px and following margin 85px become 112px/35px, wave 40px and margin 55px below 767px. About pairs featureImage with copy. Service catalog extends to 1440px with alternating equal columns/30px gap and 65px spacing. Transparent contained imagery is 390px high in a minimum 360px region with 30px horizontal padding. Narrow stacks image first, 300px image/minimum 280px region, 25px gaps, 45px spacing, 28px title and 15px copy gutters. The former 2:1 cover-panel description is obsolete.

## Components and truthful media

Seven real project screenshots replace the four public concepts, which are archived as drafts: Catatan Mengaji — SD Bani Saleh, IPNU Kota Bekasi, Batu Alam Supplier, Fazma Stone, Cimuning — E-Katalog, Mahameru Baja Indonesia and SIT Permata Hati Bekasi. [Evidence](evidence/real-projects-2026-10-23.md) records their actual public sources. Do not infer their stacks, traffic or outcomes. The Batu Alam Supplier screenshot correctly opens at the site's observed Client Testimonial section.

Desktop project overlays respond to hover/focus. Narrow home titles stay visible over a gradient; catalog overlays disappear and external captions show each title once. Portfolio filters use aria-pressed, 20px type/18px narrow, 44px target, no border/radius and an active underline. Their status count is visually clipped; visible empty feedback remains. Articles keep capsule filters. Native FAQ and full-screen mobile details menu remain accessible; menu enhancement makes background inert, wraps Tab, restores focus on Escape, closes on route/resize and locks background scrolling.

Service illustration controls home objects; image controls catalog objects. Both are CMS Media fields and use original transparent 3D web/app/design assets. Fallback ServiceArt is retained for missing media. Actual PHP, Next.js, React, TypeScript, PostgreSQL, Payload CMS, JavaScript and Tailwind CSS marks come from Simple Icons under CC0 and describe studio capabilities. They are packaged SVGs in public/images/technology, not CMS client logos.

The top-right emblem, favicon and device restore the supplied colorful identity as raster artwork; restoration is not a bit-exact original. Site Settings owns logoWhite/logoNavy/favicon/heroImage/featureImage. Project thumbnail/gallery, article image, service illustration/image and Team contacts stay editable. Footer emblem and technology strip currently reference packaged assets in code. [assets.md](assets.md) records provenance, prompts and replacement instructions. seed:real is a one-time content migration that reapplies its explicit records, not a startup command.

## Contacts and interaction

| Name | Division | WhatsApp phone |
| --- | --- | --- |
| Jaelani Surya Saputra | Software Engineering | +6281318533055 |
| Amat Suroso | Project Manager | +6281310154447 |
| Alhafiz | Web Developer | +6289697505769 |
| Laksa | Full Stack Engineering | +6289643092842 |

Names, roles and valid wa.me destinations derive from Team records through src/lib/contacts.ts, initially populated by scripts/seed-real-content.ts. Each curved card opens its own WhatsApp destination. Floating contact links to /kontak#tim-kontak and hides when a contact directory is present. The form defaults to Project Manager when available and saves the selected name/role with the private message. After successful private persistence it presents a separate prefilled WhatsApp link. That link requires a click; the website never automatically sends the external message. Error, pending and saved feedback are distinct, recoverable errors preserve values, and no-script guidance points to direct contact cards.

Global focus is 3px Blue with 5px offset. SSR content is visible by default. Desktop normal-motion enhancements are a skippable first-session 900ms clip, hero parallax capped at 72px, feature at +/-28px and once-only 650ms reveals. Service hover lifts 8px/rotates Y -5 degrees; project hover scales 1.025. At or below 900px enhancements are static; reduced motion removes animation, transforms and smooth scrolling.

## Evidence and release scope

[Independent finish review](visual-review-real-projects.md) returned ship for the final captured local correction scope, with no material fixes. This documentation pass inspected final desktop/mobile, services desktop and contact mobile captures and compared their claims to current source. [Local validation](real-projects-validation.md) records passing build, TypeScript, lint, four unit and six browser tests, and 36 route/width readings without reported overflow or broken images. These are supplied validation results, not checks rerun by the documenter.

The one existing detector pass reports 91 advisory token/radius findings against the old canon. Current tokens and owner-requested footer/card choices are now documented; no detector rerun was performed. Static captures do not certify every accessibility or production property.

The authenticated Vercel account is jaelanisuryasaputra10@gmail.com; the intended project is waslainformatika. Production remains dependent on the owner's acceptance of database-provider terms and subsequent database provisioning, migrations, content/admin bootstrap, runtime verification and promotion. A staged build or registered domain is not a live-site claim. See [deployment.md](deployment.md) for operational status.
