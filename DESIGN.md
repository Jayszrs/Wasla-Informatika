---
name: Wasla Informatika
description: Indonesian technology studio with navy editorial typography and precise connection geometry.
colors:
  navy: "#071a33"
  royal: "#143a66"
  white: "#fff"
  blue: "#397bff"
  action: "#245fd1"
  ice: "#f5f8fc"
  line: "#e5edf5"
  slate: "#526277"
  light: "#dceaff"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(58px, 6.3vw, 90px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(42px, 6.6vw, 96px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(34px, 4.4vw, 64px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  subtitle:
    fontFamily: "Manrope, sans-serif"
    fontSize: "28px"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  prose:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.65
  button:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  control: "4px"
  mockup-window: "6px"
  imagery: "12px"
spacing:
  micro: "4px"
  small: "8px"
  compact: "12px"
  regular: "16px"
  comfortable: "24px"
  group: "32px"
  wide: "48px"
  gutter-desktop: "56px"
  gutter-laptop: "32px"
  gutter-mobile: "20px"
  section-desktop: "112px"
  section-laptop: "96px"
  section-tablet: "80px"
  section-mobile: "72px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.royal}"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  button-white-hover:
    backgroundColor: "{colors.light}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  button-outline-hover:
    backgroundColor: "{colors.ice}"
  button-disabled:
    backgroundColor: "{colors.slate}"
  text-link:
    textColor: "{colors.navy}"
    typography: "{typography.button}"
    padding: "10px 0px"
  input-field:
    backgroundColor: "{colors.ice}"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    padding: "14px"
  navigation:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    padding: "11px 20px"
  filter-selected:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
  project-image:
    backgroundColor: "{colors.ice}"
    rounded: "{rounded.imagery}"
  service-row:
    textColor: "{colors.navy}"
    padding: "34px 0px"
  faq:
    textColor: "{colors.navy}"
    padding: "24px 0px"
---

# Design System: Wasla Informatika

## Overview

**Creative North Star: "Precision in Technology. Creativity in Every Detail."**

Wasla is an Indonesian technology and digital development studio with a navy-and-white editorial identity. Large Manrope headings establish confidence; open space, fine dividers and readable Plus Jakarta Sans copy make the proposition and next action clear. Original connection geometry gives the technical work a recognizable visual language.

The system pairs expressive marketing compositions with restrained reading and editing surfaces. Depth belongs to authored interface demonstrations; controls remain straightforward. The original logo has not been supplied, so the full brand name remains a temporary text wordmark. Concept projects retain an explicit disclosure, and actual people or client evidence appear only when supplied.

**Key Characteristics:**

- Navy stages and white reading surfaces with a sparing blue accent.
- Large, balanced headings and generous, content-led spacing.
- Original connection, layer and route geometry.
- Flat editorial rows, image-led work and bounded interface depth.
- ENERGY 3 / RHYTHM 3 / MOTION 2.

This implemented-system record merges the established direction after the finish review recorded `ship` in `docs/visual-review.md`. It records source and existing review evidence; it does not claim a new owner sign-off or a new visual audit. Tokens above are normative; `.impeccable/design.json` holds motion, breakpoints, shadows and component previews.

## Colors

The palette uses a deep navy foundation, cool neutrals and two functional intensities of the same blue accent family.

### Primary

- **Navy** (`navy`): header, hero, footer, dark sections, headings and primary text; the continuous identity anchor.
- **Royal** (`royal`): supporting technical geometry, primary-button hover and scrollbar thumb.
- **Action Blue** (`action`): primary action fill and readable text-link emphasis on white.
- **Graphic Blue** (`blue`): focus outlines, caret, selection and limited graphic accents.

### Neutral

- **White** (`white`): reading surfaces, dark-surface text and inverted buttons.
- **Ice** (`ice`): quiet section alternation, form fields and understated empty-state containers.
- **Line** (`line`): light dividers and outline controls.
- **Slate** (`slate`): supporting copy and metadata on light surfaces.
- **Light Blue** (`light`): supporting text on navy and inverted-button hover.

**The Action Contrast Rule.** Keep Action Blue as the white-text primary-button fill; Graphic Blue remains the graphic and focus accent.

Local project concepts have their own contained art palettes. Those colors depict example interfaces and do not expand the site's navigation or action palette. The surface custom property follows its containing section, white by default and Ice in the service section.

## Typography

**Display Font:** self-hosted Manrope, with sans-serif fallback. Its open geometric forms suit the precise studio identity.

**Body Font:** self-hosted Plus Jakarta Sans, with sans-serif fallback. Its readable proportions support Indonesian descriptions, forms and long-form text. Both font files use `font-display: swap`.

### Hierarchy

- **Display:** hero role in the frontmatter, with controlled line breaks.
- **Headline:** general H1 role; internal page introductions narrow the responsive clamp.
- **Title:** section H2 role; individual editorial compositions vary scale while preserving family, weight and tracking.
- **Subtitle:** baseline H3; service and project titles have contextual sizes.
- **Body:** default copy, with paragraph measure capped at 70ch.
- **Prose:** long-form copy with generous leading and explicit paragraph/list separation.
- **Label:** form labels; categories and dates use smaller contextual roles and sentence case.
- **Button:** semibold action text, also used for underlined text links.

At or below 600px, general H1/H2/H3 sizes become 44/36/25px, with a 46px hero and 40px article title. Body and prose become 16px. The final narrow-screen overrides keep service descriptions, process copy, article excerpts, FAQ copy, contact notes and empty-team supporting copy at 16px.

**The Reading Measure Rule.** Preserve readable body measure and leading when extending layouts; do not compress body text to imitate the interface demonstrations.

The temporary header and oversized footer wordmarks have tighter tracking than headings; they are identity display treatments, not a general heading rule. Serif type inside labelled concept artwork belongs to those demonstrations only.

## Layout

The outer wrapper is capped at 1440px including padding, leaving 1328px of inner content with desktop gutters. Spacing tokens record the recurring rhythm and actual section/gutter values; fine component spacing uses intermediate values found in source.

| Condition | Gutters | Section rhythm | Responsive behavior |
| --- | --- | --- | --- |
| Above 1200px | desktop | desktop | editorial splits; desktop navigation; large work plates |
| At or below 1200px | laptop | laptop | tighter gaps and hero composition |
| At or below 900px | laptop | tablet | disclosure navigation; stacked hero; two-column process |
| At or below 600px | mobile | mobile | single-column projects, articles, forms, process and details |

Work uses unequal plates where hierarchy benefits; service lists use divided rows. Articles have a centered column capped at 820px, with paragraph measure still bounded. Contact fields start in two columns and stack on narrow screens. No content relies on a fixed screen-height text area. Anchor scrolling reserves 100px for the sticky header.

Header height changes from 102px to 82px at the navigation breakpoint, then 76px on narrow screens. The mobile statement starts with its H2; its desktop side note is hidden at or below 600px. Preserve spacing when optional content is absent.

## Elevation & Depth

The page is flat by default. Navy/White/Ice alternation, hairlines, scale and open space establish structure. Shadows make authored interface planes legible within concept artwork; the mobile menu uses a light separation shadow over page content.

### Shadow Vocabulary

- **Concept window:** `0 24px 50px #16251d22`, confined to the authored interface plane.
- **Hero demonstration:** `drop-shadow(0 18px 32px #0005)`, separating the miniature interface from the connection composition.
- **Mobile navigation:** `0 28px 40px #0002`, separating the open navy panel from content.

**The Flat Structure Rule.** Keep ordinary content rows and controls flat; reserve dimensional lift for interface demonstrations and the open navigation panel.

## Shapes

Controls have lightly eased corners; project images have softer framing; mockup windows sit between them. Use the named radius roles in the frontmatter. Service and project arrow controls are circular (50%); concept labels stay rectangular. Fine one-pixel borders structure content without enclosing every item in a card.

Connection routes, layered planes and linked nodes explain technology and movement. They are original illustration geometry, never a substitute logo. Preserve the original supplied logo geometry when it becomes available.

## Components

### Buttons and text links

Primary buttons use Action Blue with White text; inverted buttons use White on Navy; outline buttons use a fine Line border on light surfaces. Standard buttons have a 54px minimum height. The header CTA is 46px; the narrow hero variant is 50px. Text links use an underline and open inline spacing.

Background and icon feedback lasts 200ms. The optional diagonal arrow denotes forward navigation or submission. Hover moves a button arrow by 2px and a text-link arrow by 3px. Pending submission uses Slate fill, a wait cursor and saving text. Interactive primitives share a 3px Graphic Blue focus outline with 5px offset.

### Inputs / Fields

Visible labels sit above Ice fields with a fine cool border, control radius, 14px padding and 52px minimum height. Field text is 16px; textareas start at 150px and resize vertically. Optional fields are marked. Errors use a red border and inline explanation; consent and result feedback remain readable. Recoverable errors retain input, and pending/success/error states are labelled. The sidecar preserves implemented status colors without turning them into brand accents.

### Navigation

The sticky navy header carries the temporary text wordmark, destination links and consultation action. Desktop links have a fine underline on hover and current page. Native details/summary reveals a solid navy panel at the navigation breakpoint. Escape returns focus to the summary; route selection closes the menu. The proposition never waits for an intro animation.

### Filters and disclosures

Category filters are rectangular buttons with a cool border; selected state becomes Navy with White text and `aria-pressed`. Narrow-screen filters retain a 44px minimum height. Project concepts always carry the visible `Konsep eksplorasi` disclosure.

### Project plates and service rows

Project images use the imagery radius, a contained visual and circular forward link. Captions remain outside the image with title and category. Hover gently scales real images or adjusts authored interface planes; reduced motion removes these transforms. Service rows pair relevant original line geometry, category/title/copy and a circular navigation arrow, with fine dividing lines.

### FAQ, process and optional people

FAQ uses native details/summary with a rotating plus and body copy beneath. Process is an ordered four-step line sequence, four columns becoming two and then one. Team displays actual supplied profiles or an honest Ice empty state. The About page omits the redundant link back to itself.

### Motion

Only the first desktop browser session receives the optional 650ms hero entrance; it is skippable and never hides the proposition. Artwork offset follows passive, animation-frame-gated scroll with a 22px cap. Both effects require at least 901px width and no reduced-motion preference. Controls use 200ms feedback; image and concept hover use 500ms and 600ms. Reduced motion removes artwork movement, project/article hover transforms, smooth scrolling and loading travel. No-JavaScript content remains visible.

## Do's and Don'ts

### Do:

- **Do** preserve the navy-and-white identity, self-hosted font pairing and explicit motion dials.
- **Do** vary composition according to content: editorial rows for services, large plates for work and a quiet measure for reading.
- **Do** keep concept disclosures visible and use actual supplied people and client evidence.
- **Do** preserve keyboard focus, labelled state feedback and the static narrow-screen/reduced-motion composition.
- **Do** use connection geometry to explain technology and keep dimensional shadows inside its established roles.

### Don't:

- **Don't** invent a replacement brand symbol while the original logo is missing.
- **Don't** use Graphic Blue as the small white-text primary-button fill.
- **Don't** turn every content item into a floating card or every control into a pill.
- **Don't** stretch concept artwork typography or palette into the site's reading and navigation system.
- **Don't** block content or actions behind entrance motion, or imply new owner approval from an internal finish review.
