---
name: Wasla Informatika
description: Vodjo-led software-house composition with Wasla branding, original imagery and truthful Indonesian content.
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
  service-picture: "#142235"
  field-line: "#c8d0da"
  menu-bar: "#18273a"
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
rounded:
  field: "2px"
  tag: "3px"
  service-picture: "8px"
  filter: "25px"
  button: "30px"
  circle: "50%"
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
---

# Design System: Wasla Informatika

## Overview

**Creative North Star: "A familiar software-house experience, with Wasla's own work and voice."**

The user's latest direction explicitly pins a very close reconstruction of Vodjo's public `.com` homepage proportions and section cadence. That replaces the prior mixed-reference editorial world. Use the conventional centered grid, full-height photographic opening, dense project tiles, broad wave boundaries and compact Poppins hierarchy. Preserve Wasla navy/white, Indonesian copy, real CMS and original assets.

This is a source-derived record of the current code, not final browser approval or a Figma comp. Reference screenshots are research, not website assets. Missing client proof is replaced by an honest technology strip; actual people/testimonials require eligible owner content. The text wordmark remains provisional pending the original logo.

**Key Characteristics:**

- Full photographic opening with left-aligned proposition and right-weighted workstation.
- Poppins throughout; conventional centered container and compact uppercase navigation.
- Dense square-edged work images; capsule actions; near-square fields.
- Deep navy service field separated by authored broad wave silhouettes.
- ENERGY 3 / RHYTHM 2 / MOTION 2.

## Colors

### Primary

Navy carries text and filled actions. Deep Navy anchors hero, services, full-screen menu and footer; Royal supplies button hover. Graphic Blue remains the keyboard focus accent. Service Picture and Menu Bar supply restrained dark tonal separation.

### Neutral

White carries work/feature/technology reading surfaces. Ice carries consultation and quiet internal surfaces. Slate/Light are supporting text on light/dark respectively. Line and Field Line are fine structural borders. Image palettes belong to the depicted products, not the navigation palette.

**The Truthful Substitution Rule.** Keep the reference's structural role while using Wasla facts: technology names may occupy a logo-strip composition; they must not imply client relationships.

## Typography

Poppins is self-hosted in 300/400/500/600/700 normal weights with swap behavior. The same family serves display and body. Headings are semibold with balanced wraps; expertise descriptions use light weight to preserve the reference's compact hierarchy. Frontmatter is the normative role set.

| Context | Source value |
| --- | --- |
| Hero | 50px/1.24, 600; maximum copy width 545px |
| Hero at/below 991 / 767 / 575px | 45 / 39 / 36px |
| Centered section H2 | uppercase 36px; 30px at 767px, 29px at 575px |
| Service title / description | 20px / 13px at 1.55; title 21px narrow |
| Expertise heading / copy | 20px/1.5 / 13px, 300, 1.85; heading 21px portrait |
| Navigation | 11px, 500, uppercase, .025em; mobile menu 20px |
| Fields / labels | 12px; labels 500 |
| Internal masthead / article H1 | 54px / 46px; narrow 42px / 36px |
| Reading prose | 15px/1.9, narrow 14px; 72ch maximum |
| Metadata / concept labels | 8–12px contextual roles |

Other source contextual sizes include 9/10/11/12/13/14/15/16/18/19/20/21/22/23/24/25/26/27/28/29/30/31/32/34/35/36/38/39/42/45/46/50/54px. These are observed component choices, not a mandatory mathematical ramp. The compact footer wordmark is 34px, not a poster-scale identity element.

## Layout

The desktop wrapper is 1140px including 15px gutters, leaving 1110px inner content. At/below 1199px it caps at 960px, 991px at 750px, 767px at 570px; at/below 575px it fills the viewport with 15px gutters. Header initially measures 82px desktop, 64px after scroll; mobile initial is 86px and the open menu has a 96px top bar. Header fixes to the viewport and switches to White after 80px scroll; shared internal masthead routes begin with transparent/White-text navigation over Deep Navy, then switch to White on scroll. Other internal routes retain the White header. Anchor offset is 100px.

Hero is 100svh with 700px minimum (680px below 767px). Its backdrop extends 72px above the frame; image is cover-cropped at 58% horizontally desktop, 68% narrow. `MediaImage` declares 100vw sizes for this full-width image. Copy centers vertically in the container with 130px vertical padding; narrow padding is 155px/130px.

The homepage sequence is hero → layered wave → centered work introduction and four dense tiles → wave → three dark service columns → wave → split device/expertise/process → technology strip → gray consultation → populated testimonials → compact footer. The footer also uses an authored wave. Wave height is 110px, 70px narrow. They are fresh SVG silhouettes, not downloaded reference artwork.

Homepage projects are a balanced 2×2 grid, 16:9, with 2px seams. At/below 767px four tiles stack, retaining those seams. Ordinary portfolio grids use 36px/26px gaps and 35px narrow. Services use three columns with 30px gaps (20px at 991px), one below 767px. Expertise pairs a 540px contained transparent device image with two right-hand rows; narrow places the image first. Technology is five bordered 120px tiles; narrow uses two columns and a full-width final tile. Consultation uses equal columns with a 30px gap, stacking below 767px. Main section padding is roughly 55–100px according to content; preserve source-specific rhythm, not the former 120px editorial rule.

## Elevation & Depth

The page is predominantly flat. Photography, dark overlays and wave boundaries supply depth. The White scrolled/header surface shadow is `0 2px 10px #071a3310`; floating contact uses `0 3px 14px #071a3326`. No floating card shadow is applied to work, service columns, technology tiles or form fields. The narrow homepage project gradient keeps persistent titles readable over images; the narrow portfolio catalog disables image overlays and uses external captions instead.

## Shapes

Images are square-edged; service illustration panels use the service-picture radius. Capsule actions and article filters follow the reference; portfolio filters are unboxed text buttons; fields stay almost square, labels subtly eased. Circular language/contact/back-to-top controls have a functional role. Broad authored waves are a deliberate reference requirement and replace the previous straight-only boundary rule.

## Components

### Actions and navigation

Buttons are 44px minimum, with 250ms color/border/icon transitions. The hero uses a White outline capsule; standard filled actions are Navy; hover follows the source variants. Service actions are 40px minimum with 11px type. Focus is a 3px Blue outline with 5px offset. Pending submit uses 0.55 opacity, wait cursor and saving text.

Flat uppercase desktop links replace the old capsule navigation. At/below 991px native details/summary opens a full-screen Deep Navy menu with centered links and a 96px top band. Escape restores summary focus; Tab wraps within summary/links; route selection and resize to desktop close it. Main/footer become inert and visually hidden while open, scrolling locks and floating contact hides. The static ID language marker is descriptive, not a fake language switch.

### Work and services

Homepage external captions/arrows are hidden; accessible image-link names retain the title. Desktop hover and keyboard focus show the descriptive overlay for both home and catalog. At or below 767px, homepage titles remain visible over a contrast gradient while catalog overlays are disabled, so catalog titles appear once in the external title/category caption. Concept labels persist independently of hover. Homepage service columns contain illustration, title, description and real detail action. The Services catalog uses alternating 50/50 image/text bands, detailed below; the homepage all-services destination opens that catalog.

### Portfolio and article filters

Portfolio categories are centered semibold text buttons: 20px desktop, 18px at or below 767px; transparent background, no border or radius, 6px vertical padding and inherited 44px minimum height. Gaps are 8px 26px desktop and 4px 20px narrow, with 14px bottom margin. Inactive text is Slate; hover/selected text is Navy. Selected state adds a 1px underline with 6px offset; visible focus is unchanged. The result count retains role=status but is visually clipped to 1?1px and reserves no gallery space; empty feedback remains visible. Article filters retain the White/Navy capsule variants in the token frontmatter.

### Internal mastheads and service catalog

Shared PageIntro uses a full-width Deep Navy field with a centered White H1, short route title and Light subtitle. Desktop content padding is 145px top / 60px bottom; the title is 54px and subtitle 13px with an 8px top gap. A layered 140px wave closes into White; the section has an 85px following margin. At or below 767px, title is 42px, subtitle 13px, content padding 112px / 35px, subtitle top gap 8px, wave 40px and following margin 55px. This creates the compact approximately 286px masthead for a single-line title and two-line subtitle. Optional masthead actions use White outline pills. This replaces the old White page introduction.

The Services list expands to 1440px without outer list padding. Each band is two equal columns with a 30px gap and 65px lower spacing. A 2:1 image leads the first band; even bands reverse the image to the right. CMS service images cover the image area; unavailable media uses geometric ServiceArt. Text caps at 555px; titles are 36px, excerpts 13px and pill links open the detail route. Below 767px bands stack image first with 25px gaps, 45px lower spacing, 15px text gutters and 28px titles.

About pairs the CMS feature image with right-hand introductory copy in equal columns, 30px gap, then principles/process and eligible real team. Contact uses its Navy masthead above the factual-channel/form split, with a single-column form at every width.

### Forms and disclosures

Homepage consultation is a flat Ice two-column section, not an enclosed card. The dedicated Contact page keeps factual-channel copy beside the form, but its form fields use one column even on desktop; homepage form fields remain two-column until the narrow breakpoint. Fields are White with fine borders, 46px minimum, 11px 12px padding; textarea starts at 128px. Errors use #a62424; error feedback #8c2020 on #fff0ed and saved feedback #e2eee8. These are status colors, not brand accents. Values survive recoverable errors. JavaScript JSON submit reports saved success only after private Payload/PostgreSQL persistence; no-script copy explains the requirement. FAQ remains a native disclosure on Services. Insights and team remain dedicated content destinations, not homepage filler.

### Assets and optional proof

Hero and feature images are independent Media globals (`heroImage`, `featureImage`). About uses `featureImage` on the left of its introductory copy; service catalog bands use each service `image` Media relationship, with authored ServiceArt fallback. Four project thumbnails/gallery and post images are Media relationships. Six original generated WebP assets include four labelled concepts, an illustrative workstation and a transparent device; provenance/replacement steps are in docs/assets.md. Empty eligible testimonials/team are omitted; technology text tiles do not claim clients.

### Motion

Optional first eligible session: 900ms backdrop clip reveal from inset(0 0 5%) to inset(0), skippable, with SSR copy already visible. Desktop normal-motion hero offset is min(scrollY × .12, 72)px. Feature offset clamps to ±28px. Below-fold groups alone may reveal once over 650ms from 24px down, through IntersectionObserver; all content is visible without JavaScript. At/below 900px or reduced motion all enhancement transforms/reveals are static. Image hover scales 1.025 over 650ms; reduced motion removes it. No scroll interception or artificial loader.

## Do's and Don'ts

### Do:

- **Do** preserve the user's pinned close-reference proportions, Poppins hierarchy and conventional grid.
- **Do** retain honest concept labels, original imagery and actual business content.
- **Do** use native menu/disclosure semantics, visible focus and labelled form states.
- **Do** keep CMS media replaceable and seed operations respectful of owner choices.

### Don't:

- **Don't** restore the discarded oversized editorial poster, asymmetric work gallery or huge footer wordmark.
- **Don't** copy reference logos, photography, source code, client work, testimonials or contact details.
- **Don't** imply technology tiles are client endorsements or fill missing proof with inventions.
- **Don't** infer final approval, deployment or accessibility certification from this source-derived record.
