---
name: Wasla Informatika
description: Wasla public software-house identity and the custom navy/white Studio workspace.
colors:
  navy: "#071a33"
  navy-deep: "#030e1d"
  royal: "#173551"
  white: "#fff"
  ice: "#f7f8fa"
  line: "#dce1e7"
  slate: "#5b6879"
  light: "#c5d0dd"
  blue: "#397bff"
  field-line: "#c8d0da"
  menu-bar: "#18273a"
  button-white-hover: "#dfebf8"
  footer-line: "#2d3b4d"
  error: "#a62424"
  error-text: "#8c2020"
  error-bg: "#fff0ed"
  success-bg: "#e2eee8"
  gallery-overlay: "#030e1df5"
  process-line: "#40506a"
  action: "#245fd1"
  division-front: "#edf2f7"
  division-portrait: "#e6edf5"
  division-initials: "#173b63"
  studio-muted: "#596879"
  studio-line: "#dfe5ec"
  studio-ground: "#f6f8fb"
  studio-blue: "#245fc7"
  studio-focus: "#3d79d9"
  studio-red: "#a82d37"
  studio-field-line: "#cbd4e0"
  studio-primary-hover: "#1e3c60"
  studio-secondary-hover: "#edf2f8"
  studio-status-neutral-bg: "#eef1f5"
  studio-status-neutral-text: "#536174"
  studio-status-green-bg: "#e4f0e8"
  studio-status-green-text: "#28563c"
  studio-status-blue-bg: "#e7eefb"
  studio-status-blue-text: "#214b93"
  studio-status-amber-bg: "#fff2d9"
  studio-status-amber-text: "#795614"
  gallery-control-line: "#63758a"
  footer-subtitle: "#adc0d5"
  package-surface: "#f1f5f9"
  package-copy: "#52647c"
  package-action-hover: "#1c426c"
typography:
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "50px"
    fontWeight: 600
    lineHeight: 1.24
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(36px, 4vw, 54px)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  masthead:
    fontFamily: "Poppins, sans-serif"
    fontSize: "54px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Poppins, sans-serif"
    fontSize: "36px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  subtitle:
    fontFamily: "Poppins, sans-serif"
    fontSize: "21px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Poppins, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.7
  compact:
    fontFamily: "Poppins, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.55
  prose:
    fontFamily: "Poppins, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.9
  button:
    fontFamily: "Poppins, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.5
  label:
    fontFamily: "Poppins, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.7
  footer-signature:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(100px, 18vw, 230px)"
    fontWeight: 600
    lineHeight: 0.88
    letterSpacing: "-0.04em"
  footer-subtitle:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(13px, 1.6vw, 20px)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.22em"
  package-title:
    fontFamily: "Poppins, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.025em"
  package-price:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(27px, 2.35vw, 36px)"
    fontWeight: 600
    lineHeight: 1.7
    letterSpacing: "-0.035em"
  studio-heading:
    fontFamily: "Poppins, sans-serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.025em"
  studio-body:
    fontFamily: "Poppins, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.65
  studio-action:
    fontFamily: "Poppins, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  field: "2px"
  tag: "3px"
  contact: "65px 25px 65px 25px"
  contact-mobile: "50px 22px 50px 22px"
  filter: "25px"
  button: "30px"
  circle: "50%"
  technology-link: "16px"
  division-card: "24px"
  package-row: "16px"
  package-stage: "24px"
  package-scope: "12px"
  studio-control: "8px"
  studio-panel: "12px"
  studio-field-group: "10px"
  gallery-close: "28px"
spacing:
  work-gutter: "2px"
  compact: "10px"
  gutter: "15px"
  action-gap: "16px"
  regular: "20px"
  comfortable: "30px"
  group: "35px"
  section-action: "42px"
  heading: "50px"
  section: "90px"
components:
  button-primary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "10px 26px"
  button-primary-hover:
    backgroundColor: "{colors.royal}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    rounded: "{rounded.button}"
    padding: "10px 26px"
  button-outline-light:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "10px 26px"
  contact-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.contact}"
    padding: "30px 34px"
  contact-card-hover:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
  service-object:
    backgroundColor: "transparent"
    height: "300px"
  technology-mark:
    size: "52px"
  technology-link:
    rounded: "{rounded.technology-link}"
    padding: "22px 6px"
  division-card:
    backgroundColor: "{colors.division-front}"
    textColor: "{colors.navy}"
    rounded: "{rounded.division-card}"
  gallery-close:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.gallery-close}"
    padding: "7px 17px"
  gallery-dialog:
    backgroundColor: "{colors.gallery-overlay}"
    textColor: "{colors.white}"
    width: "100vw"
    height: "100dvh"
  footer-wordmark:
    textColor: "{colors.white}"
    typography: "{typography.footer-signature}"
    padding: "22px 0 38px"
  footer-subtitle:
    textColor: "{colors.footer-subtitle}"
    typography: "{typography.footer-subtitle}"
  input-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.field}"
    padding: "11px 12px"
  concept-tag:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.tag}"
    padding: "5px 10px"
  article-filter:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.filter}"
    padding: "9px 20px"
  article-filter-selected:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
  portfolio-filter:
    backgroundColor: "transparent"
    textColor: "{colors.slate}"
    padding: "6px 0px"
  portfolio-filter-selected:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
  package-row:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.package-row}"
    padding: "32px 26px"
  package-stage:
    backgroundColor: "{colors.navy}"
    rounded: "{rounded.package-stage}"
    padding: "48px 36px"
  package-scope:
    backgroundColor: "{colors.package-surface}"
    textColor: "{colors.package-copy}"
    rounded: "{rounded.package-scope}"
    padding: "22px 18px"
  package-action:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "10px 26px"
  package-action-hover:
    backgroundColor: "{colors.package-action-hover}"
  studio-primary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    typography: "{typography.studio-action}"
    rounded: "{rounded.studio-control}"
    padding: "11px 17px"
  studio-primary-hover:
    backgroundColor: "{colors.studio-primary-hover}"
  studio-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.studio-control}"
    padding: "11px 17px"
  studio-panel:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.studio-panel}"
    padding: "25px"
  studio-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.studio-control}"
    padding: "10px 12px"
  studio-status:
    backgroundColor: "{colors.studio-status-neutral-bg}"
    textColor: "{colors.studio-status-neutral-text}"
    padding: "4px 9px"
---

# Design System: Wasla Informatika

## Overview

**Creative North Star: "A familiar software-house experience, with Wasla's own work and voice."**

The public site keeps the owner's established software-house composition: photographic opening, centered grid, Poppins hierarchy, real project screenshots, navy/white fields and capsule actions. The latest approved contract replaces service-image tilt with actual Three.js geometry and the connected division diagram with click-to-flip people cards. The header has the left wordmark and static ID marker; the right emblem is removed. The footer is a seamless straight navy region with readable company/contact/service/navigation groups and a low-opacity wasla signature with a readable informatika subtitle. Owner-requested upright white website-package cards use a navy field and finite white side glows within this same identity. Physical Three.js project devices carry authentic screenshot textures, with real-image fallbacks and delayed allocation; the expertise section has a branded 3D phone. Public CTA surfaces are White.

Wasla Studio is the Operate surface of this identity: concrete tasks, readable forms, predictable navigation, real counts and honest empty states. It is a custom dashboard and internal scheduler, with no Payload runtime. Latest owner directions in `.impeccable/device-depth-refinement.md` and `.impeccable/package-cards-refinement.md` extend `.impeccable/studio-direction.md` and supersede CSS-only devices, visible return controls and horizontal package rows. This source-extracted record refreshes the existing design system; no new comp or invented photography is claimed.

**Key Characteristics:**

- Photographic public opening and seven real screenshot projects.
- Actual unboxed Three.js service objects with deliberate interaction.
- Four supplied, transparently retouched CMS portraits in semantic flip cards; honest initials remain the missing-photo fallback.
- Thirteen services with stable slug-based scenes and six homepage choices, including photography, video and graphic/photo editing.
- Original CMS screenshots on physical Three.js laptop, tablet and phone meshes, with server-rendered real-image device fallbacks.
- Left header wordmark, White CTAs and a straight navy footer.
- Three equal CMS-owned upright white package cards, explicit price/CMS scope, navy actions and package-only white side glow.
- Custom Studio Operate workspace with real data and explicit save states.

## Colors

### Primary

Wasla Navy carries text, filled actions and active Studio navigation. Deep Navy anchors public hero, services and footer; Royal is the public action hover. Blue marks public focus and Action supplies link feedback. Studio Blue marks editable focus, selected calendar dates and row actions; Studio Focus supplies its keyboard outline. These surface-specific blues coexist without changing the brand navy.

### Neutral

White is the public reading/consultation/principles/CTA surface and Studio panels. Ice remains available for contextual media. Public Slate/Light support light/dark copy. Studio Ground separates white work surfaces; Studio Muted, Studio Line and Studio Field Line preserve operational hierarchy. Division Front/Portrait support real photos or Navy Initials. Package Surface gives each card a pale scope field; Package Copy carries scope descriptions. White package cards sit on Navy; Package Action Hover is confined to their solid actions. Status green, blue and amber always accompany text labels rather than carrying meaning alone.

**The Evidence Rule.** Technology marks describe studio capabilities, not client relationships or displayed project stacks. Publish only supplied company facts and eligible proof.

## Typography

Self-hosted Poppins serves every surface. Public layout loads normal 300/400/500/600/700; Studio loads 400/500/600. Both use swap behavior and sans-serif fallback. Frontmatter owns normative role values. Public hero starts at the Display role; latest narrow overrides use 38px at 767px and 35px at 420px. Public sections use 36px headings, decreasing to 30/29px at 767/575px; reading prose is 15px/1.9 with a 72ch maximum and 14px narrow. Desktop navigation is 11px uppercase; mobile navigation is 20px.

Studio H1 uses Studio Heading, falling to 24px below 767px; H2/H3 are 17/15px. Labels are generally 11px, inputs/actions 12px, secondary timestamps/status labels 10px. The login story headline is 46px desktop, 36px at 991px and 30px at 767px. Numeric content counts use tabular numerals. The decorative final signature pairs large lowercase wasla with informatika at the Footer Subtitle role; readable company identity remains in the information area.

## Layout

Public wrapper is 1140px including two 15px gutters (1110px inner). Maximums become 960/750/570px at 1199/991/767px, fluid at 575px. Preserve observed section rhythm, generally 55-100px. Header is 82px initially, 64px after scroll, 86px initial mobile, with left wordmark and ID marker only. At 991px and below the full-screen menu replaces desktop navigation. Hero is 100svh with 700px minimum, 680px narrow. Existing waves remain between selected public sections; the footer starts with a straight boundary.

Home project grid uses two columns with 2px gaps; the seventh device tile spans the row at 16:9. Device stages normally use 16:10; detail uses 16:9, becoming 16:11 below 767px. Home service objects occupy 300px height, 250px at 991px and 310px at 767px; catalog scene height is 430/370/340/300px at desktop/1199/767/420px. Services stack below 767px; all catalog copy and actions, including alternating rows, retain 15px horizontal gutters. Scene grid tracks use minmax(0,1fr), zero intrinsic minimums and an absolute SVG fallback so intrinsic artwork cannot enlarge the row. Technology strip retains eight/six/four columns at desktop/1199/767px. Principles and consultation are White; process is a full-width Deep Navy outer section with an inner wrapper.

Division cards use four columns with 21px gaps, two columns at 991px and one centered column up to 320px at 420px. Height is content-driven: stacked grid faces share their tallest content, with minimums of 370px desktop, 390px at 991px, 370px at 767px and 400px at 420px. Biography text preserves line breaks and grows without a maximum height or internal scrolling. Transparent portraits use object-fit:contain and object-position:center bottom. Footer information uses four desktop columns (company, contacts, services and exploration), two at 991px. At 767px company and contacts span the full grid; contacts form two columns while service/exploration groups remain side by side. Footer padding starts at 65px, 55px narrow. The final signature is left-aligned, aria-hidden, with parent opacity 1, max-height:none, overflow:visible and padding 22px 0 38px. Only its wasla child has opacity .08; informatika stays opacity 1 with 17px top margin and Footer Subtitle styling. Narrow name type remains 26vw; bottom padding becomes 30px, with no height cap.

Website packages use three equal upright cards with 26px gaps within a Navy field. Field padding is 48px 36px; cards use 32px 26px padding and 25px vertical groups. At 1199px field padding becomes 38px 26px, card padding 28px 20px and grid gap 22px. At 991px the grid becomes one centered column capped at 560px, with 30px gaps/card padding and no fixed name/price block heights. At 767px field padding is 34px 22px with 20px corners, cards use 27px 22px, and scope fields 20px 17px. Name, price/CMS scope, full-width action and pale scope field remain in that order. Section padding remains 75px 90px vertical, 55px 65px narrow; standalone removes top padding and the heading stacks at 767px. Public page scrollbars remain visually hidden while native scroll behavior and Studio/internal controls remain intact.

Studio desktop sidebar is fixed at 238px; the shell offsets by the same width. Topbar is 78px and sticky; main width caps at 1510px with 38px 42px 60px padding. At 1199px sidebar/offset become 210px and main horizontal padding 26px. At 991px sidebar becomes a 250px overlay with scrim, shell loses offset, topbar becomes 68px. Below 767px main padding is 26px 18px 40px, overview stacks, table rows become labelled content/action arrangements, media uses two columns, editor becomes one column and save controls move before the form. Editor desktop uses flexible content plus a 270px sticky save rail (235px at 1199px). Calendar keeps seven columns: compact narrow date cells show status marks while the selected-day agenda supplies full task text. Desktop date cells are at least 110px, narrow 66px.

## Elevation & Depth

Public content is mostly flat; photography and genuine Three.js meshes/materials/lights provide depth. Service objects have transparent canvases, no enclosing card, and matching geometric SVG icons while loading or when WebGL is unavailable. The model uses rounded boxes, spheres, torus/tubes and physically shaded materials; scenes render on demand and release resources offscreen. Pointer drag/arrow keys rotate the model; Home resets it. Fine-pointer scroll adds bounded orientation. Coarse pointers require Putar objek before drag and Selesai memutar restores scrolling. Reduced motion stops automatic orientation while deliberate controls remain usable. No endless autoplay. Project devices and the branded expertise phone use real rounded-box geometry, shaded navy/silver materials and screen textures. They use hemisphere/directional lights without HDR environment or real-time shadows. DeviceScene waits for viewport intersection and idle scheduling before asynchronously importing its runtime. Four concurrent device renderers, pixel ratio at most 1.25, 1536px desktop/1024px narrow textures and instanced laptop keys bound allocation. Demand rendering settles without an idle loop; offscreen/context-loss cleanup disposes geometry, materials, textures and renderers. Fine-pointer movement and bounded scroll orient devices; reduced motion removes automatic orientation and touch scrolling stays native. Original screenshots remain server-rendered fallbacks until a textured frame renders.

Studio uses tonal layering with restrained panel shadow `0 5px 22px #071a3306`; sticky toast uses `0 4px 18px #071a3310`. Public scrolled header shadow is `0 2px 10px #071a3310`, floating contact `0 3px 14px #071a3326`. Division flip uses perspective(1200px) and .65s easing, removed for reduced motion. Avoid extending dimensional effects to ordinary form fields. Package cards are the owner-approved exception to mostly flat content: each side has a finite offset white glow (`-10px 8px 28px rgb(255 255 255 / .15), 10px 8px 28px rgb(255 255 255 / .15)`) against Navy. Hover uses 10px vertical offset/32px blur/.23 alpha; focus-within uses .25 alpha. Hover lift is 5px only for hover-capable pointers without reduced motion. This package-only glow is not a general elevation rule.

**The Deliberate Motion Rule.** Automatic movement must stop for reduced motion; touch scrolling remains available until the visitor explicitly activates object rotation.

## Shapes

Public project tile outer edges stay square; laptop, tablet and phone frames supply device-specific inner corners. Capsule actions use Button radius and nearly square fields use Field radius. Contact/About directory cards retain alternating Contact corners; the shared flip cards use Division Card corners. Technology links use their own radius. Upright White package cards retain the incumbent Package Row radius token; the internal legacy row name does not describe their composition. Their Navy field uses Package Stage corners and pale inner scope fields use Package Scope corners. The requested offset side glow belongs only to these cards. Studio controls are gently rounded using Studio Control, panels use Studio Panel, grouped fields use Studio Field Group; these operational shapes are intentionally quieter than public capsule actions. Calendar selected dates receive a visible blue inset boundary. Footer is straight and seamless. Existing section waves remain: their destination-colored 3px pseudo-element covers the bottom raster edge at -1px, without adding a separator or suppressing focus borders.

## Components

### Actions and navigation

Public actions have 44px minimum height, capsule shape and 250ms color states; home service actions use 40px. Global public focus is 3px Blue with 5px offset. Public text links have no decorative underline or arrow. Project/Artikel labels retain `/portofolio` and `/insights`. Mobile menu makes background inert, locks scrolling, wraps Tab, closes on Escape/route/resize and restores focus. ID describes language.

Studio primary/secondary actions have 42px minimum height, Studio Control corners and 180ms states. Navy primary hover becomes Studio Primary Hover; white outlined secondary hover becomes Studio Secondary Hover. Keyboard focus is 3px Studio Focus with 3px offset. Sidebar active item uses Navy/White and aria-current. Pending actions disable and dim; errors remain readable and recoverable. Mobile drawer is separate from the public navigation.

### Website packages and footer groups

`src/frontend/components/website-packages.tsx` renders CMS-owned upright cards on the homepage and `/paket-website`; shared defaults/formatting/context links live in `src/shared/website-packages.ts`. Each card has a Package Title, Package Price and visible CMS scope, a full-width solid Navy consultation action, then a pale scope field with editable description and CMS scope. Desktop price follows its clamp; later responsive overrides use 25px at 1199px, 36px at 991px and 32px at 767px. Name is 22px/1.4, 21px narrow. All three have equal standing. Section notes keep features, timing, domain, hosting and support in the proposal; no popularity badge, free hosting/domain or invented inclusion is added. Empty arrays retain an honest update message/contact route inside the Navy field.

The owner-approved defaults are Landing Page Rp5.000.000 without CMS; Web Application Rp8.000.000 with management according to project scope; Company Profile + CMS Rp10.000.000 including CMS. The action carries service and package slug into `/kontak`; the current CMS name, price and scope prefill an editable message. Pengaturan website ? Paket website exposes name, slug, price, description, CMS scope and consultation service.

The shared footer groups company details, Hubungi Kami, Layanan Kami and Jelajahi Wasla. Contacts retain actual names, roles, phone numbers and existing WhatsApp destinations. Service-specific links render only when the matching service is published; catalog/packages links and configured valid navigation/social destinations remain real anchors. The decorative final signature follows copyright, privacy and back-to-top rather than replacing accessible company information.

### People and contact

Shared home/about people cards sort Project Manager first. One invisible native full-card button overlays the front/back content; click, Enter and Space toggle either direction and aria-expanded/aria-controls expose the state. Front shows name/role and supplied Team photo or typographic initials; Navy back shows biography and a separate WhatsApp link. No visible return button exists. Inactive face is inert and aria-hidden; the toggle remains the same control on both sides. Faces share content-driven grid height and biography is unclipped. The four current people are Ahmad Suroso, Jaelani Surya Saputra, Al Hafiz and Laksa. Their owner-supplied photos received professional built-in image_gen retouching and transparent background extraction, with provenance in docs/team-portrait-provenance.json and PNG metadata. Low-resolution inputs do not establish untouched documentary imagery or exact restoration. Alpha was verified in files and after CMS upload. Photo and biography remain editable through Tim & divisi / Foto profil and Tentang anggota, with portraits using contain/center bottom; absent images retain honest initials. Keep each person's existing WhatsApp destination.

Consultation saves privately before exposing an explicit recipient-specific WhatsApp action. It never sends the external message automatically. Values survive recoverable errors. The floating contact opens the directory and hides when that directory is present.

### Project media and editor

`ProjectMockup` reads the CMS thumbnail for a laptop screen and the first genuine gallery portrait with width/height below .8 for an optional phone. With no mobile source, show the laptop alone. `DeviceScene` adds actual textured laptop/tablet/phone geometry; `DeviceFrame` supplies the original-image CSS fallback before WebGL is ready or when unavailable. Neither redraws screenshot text nor bakes the website into a generated mockup. The seven current projects have original desktop and mobile captures. Gallery portraits below .8 use phones; item zero uses a laptop when nonportrait, and subsequent nonportrait items use tablets. For example, replacing a CMS thumbnail changes its laptop screen directly, while selecting gallery media opens that original screenshot in the lightbox. Screen presentation uses top-aligned cover sizing; enlargement preserves the original image and caption.

Original project thumbnails remain distinct from galleries. Three additional captures per project were an earlier migration quantity, never an editor limit. In Studio, manually add gallery rows, choose Media or expand inline upload, provide required alternative text, upload an accepted image, enter captions, reorder with Naik/Turun, then save/publish. Upload is explicit; no automatic capture or image generation occurs. Gallery enlargement uses native dialog, previous/next and arrow-key navigation, Escape, scroll lock and focus return; file links remain a fallback.

Studio article rich text is a Markdown-based textarea supporting headings, paragraphs, bold, italic, lists and links through documented syntax. It is not a WYSIWYG toolbar editor. Legacy rich text is preserved until edited. Save/publish controls show dirty/pending/saved/error states; published versions stay live while a draft is edited. Draft preview requires staff session. Up to 20 stored revisions can be loaded as a draft and reviewed before saving; conflicting tab saves require reloading current content.

### Studio calendar, access and states

Overview shows real closest deadlines/new messages, content counts and updated projects. Empty panels offer the next useful action without invented activity. Scheduler supports month navigation, today, status filter, selected-day agenda and edit-to-reschedule. Dates are WIB date-only; due date cannot precede start. It is private internal planning with no automatic reminders, calendar synchronization or automatic WhatsApp sends.

Admin and editor manage content, media, schedules and message follow-up. Only admin manages users and deletion. Existing legacy accounts remain valid through first-login migration; sessions use HttpOnly cookies, expire after eight hours and preserve role checks. Private messages/schedules require a staff session. The new studio tables preserve original legacy tables; Neon and Blob remain the data/media services.

### Semantic service scenes and public measurements

The catalog preserves ten technology services and adds Fotografi & Dokumentasi (wedding/WO collaboration, graduation and events), Video Editing and Desain Grafis & Photo Editing. Homepage choices are website-development, web-application, ui-ux-design, photography, video-editing and creative-editing. Consultation links retain the selected service; package prices use owner-approved CMS values, while guaranteed outcomes and turnaround are not invented.

`getServiceVisual(slug)` owns stable identity independently of CMS order. The 13 types are:

| Slug | Scene type | Subject |
| --- | --- | --- |
| website-development | website | Monitor and phone |
| web-application | application | Workflow laptop |
| custom-software | software | Connected software modules |
| e-commerce | commerce | Shopping bag, products and payment |
| ui-ux-design | design | Interface artboard |
| it-consultation | consultation | Strategy board and conversation |
| it-infrastructure / it-infrastructure-support | infrastructure | Server rack |
| maintenance-support | maintenance | Maintenance tools |
| systems-integration | integration | Hub and connected nodes |
| database-digital-solutions | database | Database cylinders |
| photography | photography | Camera and lens |
| video-editing | video | Editing timeline and slate |
| creative-editing | creative | Artboard, pen and swatches |

Published aliases and keyword fallbacks are defined in src/frontend/lib/service-visual.ts; unknown slugs fall back to website. Example: moving photography to the first CMS position still renders the camera. The same semantic type drives meshes, accessible label and SVG fallback.

`SiteMeasurements` mounts only in the public frontend layout when VERCEL === '1'. Page-view URLs have query and fragment removed; Speed Insights samples .1 (10%). No form content, private Studio route telemetry or custom form/admin events are added. App installation, platform configuration and production runtime verification are separate evidence states.

## Do's and Don'ts

### Do:

- **Do** preserve Wasla navy/white, Poppins, the photographic opening and original project covers.
- **Do** keep Three.js geometry, explicit touch activation, keyboard rotation and reduced-motion behavior.
- **Do** use provenance-backed retouches of the four supplied photos or honest initials, manual gallery uploads and independent WhatsApp links.
- **Do** preserve original CMS screenshots as device textures and server-rendered image fallbacks, and expose originals in enlargement.
- **Do** keep informatika readable beneath the low-opacity wasla child, with no signature height cap.
- **Do** keep package price and CMS scope visible together in equal upright cards, confine white side glow to their navy field, preserve native public scrolling and use actual footer destinations.
- **Do** keep Studio forms readable, mobile save controls first and calendar details available in the agenda.
- **Do** preserve published content until an explicit publish action, role restrictions and private data boundaries.

### Don't:

- **Don't** restore Payload runtime, the right header emblem, the connected tree diagram or raster-only service tilt.
- **Don't** introduce footer waves/seams, gray public CTA blocks, decorative link arrows or fabricated portraits.
- **Don't** invent client work, metrics, schedules, automatic reminders or project stacks.
- **Don't** treat staged runtime verification, local captures or documentation as completed production promotion or DNS.

Historical direction: earlier records describe right emblem, raster perspective, coordinator tree, clipped footer and Payload editing. Those remain historical. `.impeccable/device-depth-refinement.md` and `.impeccable/package-cards-refinement.md` now supersede CSS-only devices, separate flip-return buttons and horizontal package rows, preserving all other approved identity/content facts. This pass reads source only. Earlier creative/package captures and checks do not certify this changed device/card implementation. Fresh parent render captures, declared-profile cold-arrival measurements and production runtime/promotion checks remain pending. Domain and release operational evidence stays in `docs/production-verification.md` and `docs/domain-wasla-my-id.md`; no performance outcome or analytics-delivery certification is made here.