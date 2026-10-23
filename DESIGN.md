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
    lineHeight: 0.85
    letterSpacing: "-0.04em"
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
    height: "370px"
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
    padding: "20px 0 0"
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

The public site keeps the owner's established software-house composition: photographic opening, centered grid, Poppins hierarchy, real project screenshots, navy/white fields and capsule actions. The latest approved contract replaces service-image tilt with actual Three.js geometry and the connected division diagram with click-to-flip people cards. The header has the left wordmark and static ID marker; the right emblem is removed. The footer is a seamless straight navy region with readable company/navigation/team information and a low-opacity final signature. Public CTA surfaces are White.

Wasla Studio is the Operate surface of this identity: concrete tasks, readable forms, predictable navigation, real counts and honest empty states. It is a custom dashboard and internal scheduler, with no Payload runtime. Latest owner direction in `.impeccable/studio-direction.md` supersedes historic canon. This source-extracted record refreshes the existing design system; no new comp or invented photography is claimed.

**Key Characteristics:**

- Photographic public opening and seven real screenshot projects.
- Actual unboxed Three.js service objects with deliberate interaction.
- Navy initials or supplied CMS photos in semantic flip cards.
- Left header wordmark, White CTAs and a straight navy footer.
- Custom Studio Operate workspace with real data and explicit save states.

## Colors

### Primary

Wasla Navy carries text, filled actions and active Studio navigation. Deep Navy anchors public hero, services and footer; Royal is the public action hover. Blue marks public focus and Action supplies link feedback. Studio Blue marks editable focus, selected calendar dates and row actions; Studio Focus supplies its keyboard outline. These surface-specific blues coexist without changing the brand navy.

### Neutral

White is the public reading/consultation/principles/CTA surface and Studio panels. Ice remains available for contextual media. Public Slate/Light support light/dark copy. Studio Ground separates white work surfaces; Studio Muted, Studio Line and Studio Field Line preserve operational hierarchy. Division Front/Portrait support real photos or Navy Initials. Status green, blue and amber always accompany text labels rather than carrying meaning alone.

**The Evidence Rule.** Technology marks describe studio capabilities, not client relationships or displayed project stacks. Publish only supplied company facts and eligible proof.

## Typography

Self-hosted Poppins serves every surface. Public layout loads normal 300/400/500/600/700; Studio loads 400/500/600. Both use swap behavior and sans-serif fallback. Frontmatter owns normative role values. Public hero starts at the Display role; latest narrow overrides use 38px at 767px and 35px at 420px. Public sections use 36px headings, decreasing to 30/29px at 767/575px; reading prose is 15px/1.9 with a 72ch maximum and 14px narrow. Desktop navigation is 11px uppercase; mobile navigation is 20px.

Studio H1 uses Studio Heading, falling to 24px below 767px; H2/H3 are 17/15px. Labels are generally 11px, inputs/actions 12px, secondary timestamps/status labels 10px. The login story headline is 46px desktop, 36px at 991px and 30px at 767px. Numeric content counts use tabular numerals. Public final signature has no subtitle and is decorative, rather than a replacement for readable identity.

## Layout

Public wrapper is 1140px including two 15px gutters (1110px inner). Maximums become 960/750/570px at 1199/991/767px, fluid at 575px. Preserve observed section rhythm, generally 55-100px. Header is 82px initially, 64px after scroll, 86px initial mobile, with left wordmark and ID marker only. At 991px and below the full-screen menu replaces desktop navigation. Hero is 100svh with 700px minimum, 680px narrow. Existing waves remain between selected public sections; the footer starts with a straight boundary.

Home project grid uses two columns with 2px seams; the seventh tile spans the row at 2.3 ratio. Below 767px tiles stack at 16:9. Home service objects occupy 300px height, 250px at 991px and 310px at 767px; catalog scene height is 430/370/340/300px at desktop/1199/767/420px. Services stack below 767px. Technology strip retains eight/six/four columns at desktop/1199/767px. Principles and consultation are White; process is a full-width Deep Navy outer section with an inner wrapper.

Division cards use four columns with 21px gaps, two columns at 991px and one centered column up to 320px at 420px. Card height is 370px desktop, then 350/390/360/400px at 1199/991/767/420px. Footer information uses three columns (company, navigation, team), becomes two below 767px with company spanning both. Footer padding starts at 65px, 55px narrow. Final signature is left-aligned at .08 opacity, capped at 190px height; narrow uses 26vw type and a 130px cap. It has `aria-hidden="true"`.

Studio desktop sidebar is fixed at 238px; the shell offsets by the same width. Topbar is 78px and sticky; main width caps at 1510px with 38px 42px 60px padding. At 1199px sidebar/offset become 210px and main horizontal padding 26px. At 991px sidebar becomes a 250px overlay with scrim, shell loses offset, topbar becomes 68px. Below 767px main padding is 26px 18px 40px, overview stacks, table rows become labelled content/action arrangements, media uses two columns, editor becomes one column and save controls move before the form. Editor desktop uses flexible content plus a 270px sticky save rail (235px at 1199px). Calendar keeps seven columns: compact narrow date cells show status marks while the selected-day agenda supplies full task text. Desktop date cells are at least 110px, narrow 66px.

## Elevation & Depth

Public content is mostly flat; photography and genuine Three.js meshes/materials/lights provide depth. Service objects have transparent canvases, no enclosing card, and raster loading/WebGL fallback only. The model uses rounded boxes, spheres, torus/tubes and physically shaded materials; scenes render on demand and release resources offscreen. Pointer drag/arrow keys rotate the model; Home resets it. Fine-pointer scroll adds bounded orientation. Coarse pointers require Putar objek before drag and Selesai memutar restores scrolling. Reduced motion stops automatic orientation while deliberate controls remain usable. No endless autoplay.

Studio uses tonal layering with restrained panel shadow `0 5px 22px #071a3306`; sticky toast uses `0 4px 18px #071a3310`. Public scrolled header shadow is `0 2px 10px #071a3310`, floating contact `0 3px 14px #071a3326`. Division flip uses perspective(1200px) and .65s easing, removed for reduced motion. Avoid extending dimensional effects to ordinary form fields.

**The Deliberate Motion Rule.** Automatic movement must stop for reduced motion; touch scrolling remains available until the visitor explicitly activates object rotation.

## Shapes

Public screenshot tiles stay square; capsule actions use Button radius and nearly square fields use Field radius. Contact/About directory cards retain alternating Contact corners; the homepage flip cards use Division Card corners. Technology links use their own radius. Studio controls are gently rounded using Studio Control, panels use Studio Panel, grouped fields use Studio Field Group; these operational shapes are intentionally quieter than public capsule actions. Calendar selected dates receive a visible blue inset boundary. Footer is straight and seamless.

## Components

### Actions and navigation

Public actions have 44px minimum height, capsule shape and 250ms color states; home service actions use 40px. Global public focus is 3px Blue with 5px offset. Public text links have no decorative underline or arrow. Project/Artikel labels retain `/portofolio` and `/insights`. Mobile menu makes background inert, locks scrolling, wraps Tab, closes on Escape/route/resize and restores focus. ID describes language.

Studio primary/secondary actions have 42px minimum height, Studio Control corners and 180ms states. Navy primary hover becomes Studio Primary Hover; white outlined secondary hover becomes Studio Secondary Hover. Keyboard focus is 3px Studio Focus with 3px offset. Sidebar active item uses Navy/White and aria-current. Pending actions disable and dim; errors remain readable and recoverable. Mobile drawer is separate from the public navigation.

### People and contact

Homepage people cards sort Project Manager first. Front is a semantic button with name/role and supplied Team photo or typographic initials; click, Enter and Space reveal a Navy back with biography, separate WhatsApp link and return button. Inactive face is inert and aria-hidden; focus transfers to the back link and returns to the front button. No stock/generated portrait fills missing photos. Contact/About retain the four curved direct-contact cards. Team is the source of names, divisions and valid WhatsApp destinations.

Consultation saves privately before exposing an explicit recipient-specific WhatsApp action. It never sends the external message automatically. Values survive recoverable errors. The floating contact opens the directory and hides when that directory is present.

### Project media and editor

Original project thumbnails remain distinct from galleries. Three additional captures per project were an earlier migration quantity, never an editor limit. In Studio, manually add gallery rows, choose Media or expand inline upload, provide required alternative text, upload an accepted image, enter captions, reorder with Naik/Turun, then save/publish. Upload is explicit; no automatic capture or image generation occurs. Gallery enlargement uses native dialog, previous/next and arrow-key navigation, Escape, scroll lock and focus return; file links remain a fallback.

Studio article rich text is a Markdown-based textarea supporting headings, paragraphs, bold, italic, lists and links through documented syntax. It is not a WYSIWYG toolbar editor. Legacy rich text is preserved until edited. Save/publish controls show dirty/pending/saved/error states; published versions stay live while a draft is edited. Draft preview requires staff session. Up to 20 stored revisions can be loaded as a draft and reviewed before saving; conflicting tab saves require reloading current content.

### Studio calendar, access and states

Overview shows real closest deadlines/new messages, content counts and updated projects. Empty panels offer the next useful action without invented activity. Scheduler supports month navigation, today, status filter, selected-day agenda and edit-to-reschedule. Dates are WIB date-only; due date cannot precede start. It is private internal planning with no automatic reminders, calendar synchronization or automatic WhatsApp sends.

Admin and editor manage content, media, schedules and message follow-up. Only admin manages users and deletion. Existing legacy accounts remain valid through first-login migration; sessions use HttpOnly cookies, expire after eight hours and preserve role checks. Private messages/schedules require a staff session. The new studio tables preserve original legacy tables; Neon and Blob remain the data/media services.

## Do's and Don'ts

### Do:

- **Do** preserve Wasla navy/white, Poppins, the photographic opening and original project covers.
- **Do** keep Three.js geometry, explicit touch activation, keyboard rotation and reduced-motion behavior.
- **Do** use supplied photos or honest initials, manual gallery uploads and independent WhatsApp links.
- **Do** keep Studio forms readable, mobile save controls first and calendar details available in the agenda.
- **Do** preserve published content until an explicit publish action, role restrictions and private data boundaries.

### Don't:

- **Don't** restore Payload runtime, the right header emblem, the connected tree diagram or raster-only service tilt.
- **Don't** introduce footer waves/seams, gray public CTA blocks, decorative link arrows or fabricated portraits.
- **Don't** invent client work, metrics, schedules, automatic reminders or project stacks.
- **Don't** treat staged runtime verification, local captures or documentation as completed production promotion or DNS.

Historical direction: earlier code-first records described a right emblem, raster perspective, a coordinator tree, a .14 centered footer signature and Payload editing. Those are history, superseded by the 23 October Studio contract. Prior public evidence remains in `docs/refinement-20261023.md` and `docs/visual-review-motion.md`; current operations are in `docs/wasla-studio.md` and `docs/domain-wasla-my-id.md`. Stage READY at https://waslainformatika-nehon1bg1-jae-f2e1.vercel.app passed runtime verification; primary-domain promotion awaits visual review. Domain wasla.my.id is attached, but registrar session expiry prevented nameserver save; current nameservers remain TTM Host. Neither promotion nor DNS completion is claimed here.
