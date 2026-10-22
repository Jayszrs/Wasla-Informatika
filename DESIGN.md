---
name: Wasla Informatika
description: Indonesian technology studio with navy editorial typography and image-led project discovery.
colors:
  navy: "#071a33"
  royal: "#153454"
  hero-panel: "#10253e"
  white: "#fff"
  ice: "#f2f5f8"
  line: "#d5dce4"
  slate: "#526277"
  light: "#c8d6e6"
  blue: "#397bff"
  action: "#245fd1"
  dark-line: "#40506a"
  field-line: "#bdc8d5"
  nav-active: "#203752"
  white-hover: "#dceaff"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(52px, 6.15vw, 88px)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(44px, 6.7vw, 96px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(34px, 4.2vw, 60px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  subtitle:
    fontFamily: "Manrope, sans-serif"
    fontSize: "25px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.75
  supporting:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.75
  compact:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.75
  button:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  tag: "4px"
  field: "6px"
  compact-control: "16px"
  nav-item: "17px"
  control: "18px"
  navigation: "22px"
  circle: "50%"
spacing:
  small: "8px"
  compact: "12px"
  regular: "16px"
  image-caption: "20px"
  comfortable: "24px"
  action-gap: "28px"
  group: "32px"
  wide: "40px"
  heading-gap: "48px"
  project-row: "56px"
  gutter: "clamp(24px, 5vw, 80px)"
  gutter-mobile: "22px"
  section-desktop: "120px"
  section-laptop: "90px"
  section-mobile: "72px"
components:
  button-primary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "13px 22px"
  button-primary-hover:
    backgroundColor: "{colors.royal}"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "13px 22px"
  button-white-hover:
    backgroundColor: "{colors.white-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    padding: "13px 22px"
  button-outline-hover:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
  input-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.field}"
    padding: "13px 14px"
  filter:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.compact-control}"
    padding: "10px 18px"
  filter-selected:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
  navigation:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.navigation}"
  concept-tag:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.tag}"
    padding: "7px 12px"
  service-row:
    textColor: "{colors.navy}"
    padding: "28px 0px"
  faq:
    textColor: "{colors.navy}"
    padding: "24px 0px"
---

# Design System: Wasla Informatika

## Overview

**Creative North Star: "Precision in Technology. Creativity in Every Detail."**

Wasla uses large calm typography, deep navy stages and generous white reading surfaces to introduce digital development work. Original project mockup photographs give the proposition a tangible object. Fine dividers and open compositions keep services and consultation easy to find.

The user chose a code-first agency direction informed by Ulysses' scale, Vodjo's information order and Until's type/button confidence. This is an implemented-system record, not a Figma comp or an owner approval claim. The text wordmark remains provisional until the original logo is supplied. Concepts stay visibly labelled; people and client evidence depend on supplied content.

**Key Characteristics:**

- Navy and white with cool supporting neutrals.
- Self-hosted Manrope display and Plus Jakarta Sans body typography.
- Large project imagery, square image edges and rounded rectangular controls.
- Flat service rows and varied editorial section rhythm.
- ENERGY 3 / RHYTHM 3 / MOTION 2.

Tokens above describe the current stylesheet. Motion, breakpoints and preview snippets extend them in `.impeccable/design.json`; page strategy lives in `docs/redesign-direction.md`.

## Colors

The navy family carries identity; White and Ice separate reading surfaces without adding a second brand hue.

### Primary

- **Navy:** header, hero, process, footer, primary text and standard button fill.
- **Royal / Hero Panel:** button hover / image-stage and caption ground.
- **Graphic Blue:** visible keyboard focus outline.
- **Action Blue:** input caret, rather than the current primary-button fill.

### Neutral

- **White / Ice:** reading, inverted controls and fields / services, consultation, closing CTA and empty image grounds.
- **Line / Field Line:** content dividers / field and service-arrow outlines.
- **Slate / Light:** supporting copy on light / navy surfaces.
- **Dark Line / Nav Active:** capsule and dark dividers / desktop link state.
- **White Hover:** inverted button hover background.

**The Contained Image Rule.** Colors within project mockups belong to the depicted product; they do not expand the site's action palette.

## Typography

**Display Font:** locally hosted Manrope, sans-serif fallback. Its open geometric forms support large, tightly set Indonesian headlines.

**Body Font:** locally hosted Plus Jakarta Sans, sans-serif fallback. It separates practical descriptions and controls from the display voice. Both use `font-display: swap`.

### Hierarchy

Frontmatter records hero, general H1/H2/H3, body, supporting, compact, label and button roles. Headings use balanced wrapping. Paragraphs cap at 70ch; rich text is constrained to 72ch.

| Context | Current size and leading |
| --- | --- |
| Hero above 1100px | display token; preserved line breaks; 900px maximum measure |
| Hero 901–1100px | 70px |
| Hero 601–900px | clamp(52px, 8.5vw, 76px) |
| Hero at or below 600px | clamp(42px, 11.6vw, 64px), 1.1 |
| Page introduction | clamp(44px, 6.2vw, 88px); 46px narrow |
| Brand statement | clamp(36px, 4.6vw, 66px), 1.15; 39px narrow |
| Article H1 | clamp(40px, 5.3vw, 76px) |
| General narrow H1 / H2 | 44px / 37px |
| Default narrow body | 14px, 1.75 |
| Project / service title | 25px; contextual 23px and 20px narrow |
| Article preview title | 24px, 1.35; 20px tablet and 25px narrow |
| Metadata / microcopy | 9–12px by context, never the default paragraph role |

Other implemented contextual display sizes are 19, 20, 22, 23, 27, 28, 29, 30, 31, 32, 34, 35, 36 and 43px. They serve captions, process, quotations, wordmarks, detail headings and plain concept fallbacks. They do not form an enforced mathematical ramp. Footer wordmark uses clamp(110px, 23vw, 340px), then 24vw narrow, with 0.9 leading.

## Layout

The wrapper caps at 1600px including fluid gutters. Generous section rhythm lets imagery and typography establish hierarchy without enclosed cards. Frontmatter records recurring gaps; local 18/22/25/26/30/35/36/45/55/58/60/65/70/80/90px spacing remains component-specific.

| Width | Rhythm and behavior |
| --- | --- |
| Above 1100px | 120px sections; fluid gutters; 100px header; hero 1.9:1 split and 8% gap |
| 901–1100px | 90px sections; hero 1.6:1 split and 5% gap; tighter navigation |
| 601–900px | 90px sections; 80px header; native mobile menu; stacked hero/services/FAQ/consultation |
| At or below 600px | 72px sections; 22px gutters; single-column projects/articles/team/testimonials/form; two-column process |
| At least 1700px | hero split becomes 1.6:1 |

Projects use two columns with 56px row and 32px column gaps. First homepage work spans both columns with a 1.96 image ratio; other project images use 3:2. Narrow projects use 1.35 and 34px gaps. Hero uses a centered cover crop and clamp(370px, 42vw, 640px) height, 420px at laptop, 1.8 ratio at tablet, and 1.26 ratio with 58% horizontal positioning narrow. Narrow hero imagery bleeds through wrapper gutters. Anchor scrolling reserves 110px.

## Elevation & Depth

Ordinary structure is flat. Navy/White/Ice alternation, image scale and hairlines carry depth. The open mobile menu alone uses a separation shadow (`0 20px 40px #071a3326`). Photographic mockup depth belongs to the image; plain concept fallbacks have no decorative CSS shadow.

**The Flat Structure Rule.** Do not add floating surfaces to service rows, reading content or project captions.

## Shapes

Buttons have rounded rectangular corners; filters and compact controls are slightly tighter. The desktop link group is a bordered capsule with inset links. Inputs and concept labels have smaller radii. Images are square-edged. Circular arrows signal destinations inside image links and service rows, rather than independent nested controls. Section boundaries are straight, with no waves.

## Components

### Buttons and text links

Standard Navy buttons use White text; inverted buttons use White with Navy text. Standard minimum height is 52px. Color/border transitions last 250ms; arrows move 2px diagonally over 350ms. Header CTA uses a 44px minimum and compact-control radius. At or below 600px, standard controls use 48px minimum, 12px type, 12px 18px padding, 25px gap and compact-control radius. Disabled submission retains its fill with 0.55 opacity and a wait cursor.

Text links use a bottom border, 14px semibold text, 24px gap and 10px vertical padding. Their arrow moves 3px diagonally. All interactive elements share a 3px Graphic Blue focus outline with 5px offset.

### Navigation

The sticky Navy header places a provisional wordmark beside a bordered desktop capsule and consultation action. Hover/current state uses Nav Active; active pages expose `aria-current`. At 900px, native details/summary opens a White rounded link panel. Its summary is 44px square. Escape closes and restores summary focus; route choice closes the menu. No essential information depends on hover.

### Project images, services and filters

Media CMS thumbnails lead work; captions carry title/category outside the image. White concept tags persist whenever `isConcept` is true. Hero concepts have a visible image overlay determined from selected project media or explicit concept media metadata. Image hover scales 1.025 over 700ms; reduced motion disables it. Missing concept media uses a plain authored fallback; missing real-project media shows an honest empty state.

Services are unnumbered divided links with title, excerpt and circular arrow. Process numbers belong to the ordered four-stage workflow. Filters are 44px-minimum buttons with `aria-pressed`, selected Navy fill and results feedback.

### Inputs / Fields

Visible labels sit above White fields with Field Line borders, 50px minimum height and field radius. Textareas start at 120px and resize vertically. Inline errors use `#a62424`; error feedback uses `#8c2020` on `#fff0ed`, saved feedback `#e2eee8`. These are functional status colors, not brand accents. Pending, recoverable error and saved states are explicit. Values survive recoverable errors. The JavaScript form posts JSON to the private contact endpoint and reports success after persistence.

### FAQ, process and optional proof

Native FAQ disclosures rotate a plus 45 degrees when open. Process uses four columns above 900px and two below, including narrow screens. Team and testimonial sections are omitted when eligible published data is empty. About also omits an empty team and suppresses its self-link when present.

### Opening motion

The first eligible desktop session gets a skippable 900ms image clip reveal with cubic-bezier(.16, 1, .3, 1). Text is readable initially. Passive rAF-gated scroll offsets the image by `min(scrollY × .035, 22)` pixels. Both enhancements require at least 901px and normal motion. Narrow and reduced-motion views are static; reduced motion also removes image hover scaling and smooth scrolling. No blocking loader or scroll hijacking.

## Do's and Don'ts

### Do:

- **Do** preserve Navy/White, self-hosted typography and the declared dials.
- **Do** give original project imagery space and maintain visible concept disclosures.
- **Do** retain real destinations, visible focus, native disclosures and labelled form feedback.
- **Do** use Media relationships and preserve user-selected media during seeding.
- **Do** use owner-supplied people, client evidence and business channels.

### Don't:

- **Don't** restore the discarded geometric hero or introduce copied artwork, waves or fake client proof.
- **Don't** invent a replacement logo while the original is missing.
- **Don't** turn square image plates into floating cards or every control into a capsule.
- **Don't** hide essential content behind motion or hover.
- **Don't** infer owner approval, full accessibility compliance or performance results from this source-derived record.
