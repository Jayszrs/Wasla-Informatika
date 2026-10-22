# Wasla design system: Vodjo-led revision

The latest user correction supersedes the mixed-reference editorial design. [vodjo-direction.md](vodjo-direction.md) pins close composition/proportion matching to Vodjo `.com`; [the fresh study](evidence/vodjo-exact-2026-10-22.md) distinguishes screenshot measurements from unverified computed styles. This code-first system uses fresh implementation and Wasla's navy/white, Indonesian copy, CMS and original assets. No Figma comp or final approval is claimed here.

[DESIGN.md](../DESIGN.md) owns current extracted tokens; [.impeccable/design.json](../.impeccable/design.json) adds motion/breakpoints/previews. Source authority is frontend globals.css/layout/page and shared navigation/motion/UI components.

## Identity and reasons

Poppins matches the reference's declared type family; locally hosted 300/400/500/600/700 weights keep it consistent. The 1140px centered outer/1110px inner grid reproduces the conventional agency proportions. A full-height photograph supplies the hero's material, four dense tiles support early work discovery, dark three-column services explain scope, and waves reproduce the requested cadence. The gray consultation remains a working form. Capsule actions follow the reference; near-square fields support practical entry. ENERGY 3 / RHYTHM 2 / MOTION 2.

## Current tokens and responsive rules

Palette: Navy #071a33, Deep Navy #030e1d, Royal #173551, White #fff, Ice #f7f8fa, Line #dce1e7, Slate #5b6879, Light #c5d0dd, Blue focus #397bff. Service panels #142235, field borders #c8d0da, menu top band #18273a. Standard buttons use Navy, not an action-blue fill. Hero/feature imagery owns any contained product colors.

Hero: 50px/62px, weight600, max copy545px; 45px at991,39px at767,36px at575. Centered uppercase section headings36px,30px narrow,29px portrait. Body14px/1.7; compact13px/1.55; expertise13px/1.85 weight300; reading15px/1.9,14px narrow,72ch. Navigation11px uppercase, mobile20px. Buttons12px600; labels12px500.

Wrapper:1140px; at1199/991/767 maximums960/750/570px; at575 fluid. All use15px gutters. Fixed header82px initial desktop,64px scrolled; mobile86px initial, open menu96px top band. Scroll threshold80px; anchor offset100px. Hero100svh, minimum700px or680px narrow. Desktop image cover position58%, narrow68%; hero image sizes100vw.

Home work2×2,16:9,2px seams; stacks below767. Services3 columns/30px gap, one narrow. Device/expertise split1:1; device540px contained; narrow image then copy. Technology5 bordered120px tiles, narrow2 columns plus last full-width. Consultation1:1/30px gap, stacked narrow. Waves110px/70px narrow. Full source-specific section rhythm is documented in DESIGN.md rather than imposing the discarded editorial spacing scale.

Buttons30px radius and44px minimum; service actions40px. Article filters25px; portfolio filters have no border/radius. Fields2px,tags3px,service panels8px,images square. Header shadow0 2px 10px #071a3310; floating contact0 3px 14px #071a3326. Other content stays flat.

## Internal page composition

Shared PageIntro is full-width Deep Navy with a short centered White title: desktop 54px, subtitle 13px, content padding 145px/60px and a layered 140px wave into White. Following margin is 85px. At/below 767px, title is 42px, subtitle 13px, padding 112px/35px, subtitle top gap 8px, wave 40px and following margin 55px. A single-line title and two-line subtitle produce a compact masthead of approximately 286px. Initial navigation stays light over the dark masthead and changes to White on scroll. This replaces the former White introduction.

About uses `featureImage` in the left half and introductory copy in the right half, with a 30px gap; narrow stacks image first. Services uses a 1440px catalog of alternating equal image/text bands: 30px gap, 65px lower spacing, 2:1 CMS `service.image`, 555px maximum text and 36px titles. Missing media uses authored geometric ServiceArt. Capsule links lead to detail pages. Below 767px all bands stack image first, gap 25px, lower spacing 45px, title 28px and text gutters 15px. Contact keeps its channel/form split but form fields are single-column on desktop as well as narrow.

## Behavior and content

Navigation is flat uppercase, transparent initially over the homepage and shared Navy internal mastheads, then White after scroll; other internal routes retain the White surface. Native details opens a full-screen menu at991px and below; main/footer inert, Tab wraps, Escape/links/desktop resize close, background scroll locks. Work titles remain accessible: desktop image overlays respond to hover/focus. At/below 767px homepage overlays remain visible and external captions hidden; catalog overlays are disabled so each title appears once in its external caption. Concept disclosure never depends on hover. Portfolio category buttons are centered bold text,20px desktop/18px narrow, transparent and unboxed, with44px minimum height. Desktop gaps8px26px become4px20px narrow; bottom margin14px. Slate inactive text becomes Navy on hover/selection; selected state uses a1px underline offset6px. The role=status count is clipped1?1px without gallery spacing. Article filters retain pills; focus styling is unchanged. FAQ is on Services; Insights/team stay dedicated destinations.

The homepage consultation retains a two-column field grid on desktop; the dedicated Contact form is single-column at every width. Both retain optional markers, validation/errors/pending/saved states, consent and private Payload/PostgreSQL POST persistence. Success follows saving. JavaScript is required for JSON submission and no-script copy states it. Floating chat goes to actual WhatsApp only when supplied, otherwise to consultation. No invented channel, client proof or team profile.

## Media and motion

Six original imagegen assets: Ruang,Alur,Sela,Nusa concepts; illustrative workstation hero; transparent phone. [assets.md](assets.md) records prompts/provenance and Media replacement. `heroImage`/`featureImage` are globals; projects and posts own their Media relationships. Migration `20261022_102006` adds featureImage. Seed fills demo content while preserving owner-selected media, including the documented legacy Alur-to-workstation transition. Workstation is not an office photo; technology names are not clients.

First eligible desktop session: skippable900ms backdrop clip; copy already visible. Hero parallax cap72px; feature±28px; once-only below-fold650ms reveals. All require normal motion and min-width901px; no-JS remains visible and narrow/reduced views static. These are Wasla enhancements, not claims of measured Vodjo parallax.

## Evidence limits

The old `detector-vodjo.json` has106 advisories:84 type,10 radius,12 color comparisons against the preceding DESIGN. This refresh records current values; detector was not rerun. Final production build/tests/review are owned by the main workflow and not asserted by this documentation pass. Original logo, actual clients/people/results, official contacts and production services remain owner inputs. Empty proof is omitted; the five technology tiles honestly substitute for unavailable client-logo proof while preserving the strip's visual role.
