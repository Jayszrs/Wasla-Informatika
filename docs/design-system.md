# Wasla design system: public identity and Studio

The current authority is the owner's 23 October contract in [.impeccable/studio-direction.md](../.impeccable/studio-direction.md), reflected in [DESIGN.md](../DESIGN.md). That file owns normative color/type/radius/spacing/component tokens; [.impeccable/design.json](../.impeccable/design.json) extends them with motion, shadows, responsive breakpoints and ten standalone previews. Product truth remains in [PRODUCT.md](../PRODUCT.md). This refresh retains the established public visual world and adds the custom Studio Operate surface. It does not claim an approved comp.

## Public identity

Retain navy/white fields, self-hosted Poppins, centered 1140px outer/1110px inner grid, photographic hero, real project screenshots, capsule actions and existing internal section waves. Latest corrections supersede earlier guidance: no right header emblem; White public CTA surfaces; actual Three.js service geometry; semantic people flip cards; straight seamless professional footer. Circular navy favicon and branded illustrative device remain. Screenshots and technology logo colors remain contained evidence rather than new page accents.

Public header keeps the left wordmark, navigation and static ID marker. It is 82px initially, 64px after scroll and 86px initial mobile; desktop navigation yields to the full-screen menu at 991px. Menu enhancement preserves inert background, focus trap, Escape return, route/resize close and scroll lock. Public focus is a 3px Blue outline with 5px offset. Public text links have no decorative arrows/underlines.

Wrapper caps become 960/750/570px at 1199/991/767px, fluid at 575px, with 15px gutters. Home retains seven real projects; the odd seventh tile spans the desktop row and all stack below 767px. Technology retains 24 official links in eight/six/four columns, 52px marks desktop and 42px narrow, grayscale at rest and official color on hover/focus. The strip describes capabilities, not a displayed project's stack or endorsements. Principles/consultation/CTAs use White; process retains a full-width Deep Navy outer section with inner content wrapper.

## Actual geometry and people

`src/components/service-scene.tsx` builds Three.js rounded-box, sphere, torus and tube meshes with materials, room environment, lighting and shadows. Transparent raster artwork remains only while loading or if WebGL fails. Rendering is demand-driven, pixel ratio capped at 1.5 and offscreen resources disposed. Fine-pointer movement and bounded scroll adjust orientation; drag and arrow keys rotate, Home resets. Coarse-pointer rotation requires explicit Putar objek activation; Selesai memutar restores touch scrolling. Reduced motion stops automatic orientation and removes easing while deliberate controls remain available. Home scene region is 300px, 250px at 991px and 310px at 767px; catalog is 430/370/340/300px at desktop/1199/767/420px. No endless autoplay or enclosing illustration card.

Homepage people use `src/components/division-structure.tsx`: Project Manager first, followed by supplied Team records. The front button shows actual uploaded Team photo or navy typographic initials; no invented portraits. Click/Enter/Space flips to biography and an independent WhatsApp link, with a return button. Inactive face is inert/aria-hidden; focus moves to the back link and returns to the trigger. Four columns become two at 991px and one up to 320px at 420px. Division corners are 24px; perspective is 1200px with .65s transition removed for reduced motion. Contact/About retain curved direct-contact directory cards and exact Team destinations. The former connected coordinator tree is history.

## Footer

`src/app/(frontend)/layout.tsx` renders company wordmark/description, optional address/email, public navigation and named Team links; copyright, privacy and back-to-top follow. Footer is a straight Deep Navy region with no closing wave or seam. Information uses three columns, becoming two below 767px with company spanning both. Padding starts at 65px, 55px narrow. The final left-aligned lowercase wasla is decorative (`aria-hidden`), opacity .08, type clamp(100px,18vw,230px), line-height .85, maximum height 190px; narrow uses 26vw and 130px maximum. No final informatika subtitle remains. Readable identity and links are separate.

## Studio Operate tokens and layout

Studio inherits Wasla Navy and Poppins but has its own operational surface: Ground #f6f8fb, Muted #596879, Line #dfe5ec, Blue #245fc7, Focus #3d79d9, Red #a82d37 and field border #cbd4e0. White panels have 12px corners, controls 8px, groups 10px. Primary hover is #1e3c60; secondary hover #edf2f8. Controls have 42px minimum height, 11px 17px padding, 12px medium text and 180ms feedback. Studio keyboard focus is 3px with 3px offset. Panel shadow is restrained (`0 5px 22px #071a3306`); activity is never fabricated to populate panels.

Studio body is 13px/1.65; H1 28px/1.35 semibold, 24px narrow; H2/H3 17/15px. Source `src/app/(studio)/layout.tsx` loads Poppins 400/500/600. Desktop fixed sidebar is 238px, 210px at 1199px; sticky topbar is 78px. Main caps at 1510px with 38px 42px 60px padding, 26px horizontal at 1199px. At 991px sidebar is a 250px overlay with scrim, offset disappears and topbar is 68px. At 767px main becomes 26px 18px 40px, overview stacks, tables reflow to content/action rows, media uses two columns and the save panel moves before the single-column editor. Desktop editor uses flexible content and a 270px sticky rail, 235px at 1199px.

Status neutral is #eef1f5/#536174, green #e4f0e8/#28563c, blue #e7eefb/#214b93 and amber #fff2d9/#795614. Every status has a text label. Seven-column calendar cells are at least 110px desktop, 66px narrow; compact marks on mobile defer full text to the selected-day agenda. Current day has Navy fill and selected day a blue inset outline. Reduced motion disables Studio transitions/animation.

## Editing and access behavior

[Wasla Studio](wasla-studio.md) owns workflow details. Gallery uploads are manual: add row, select Media or upload inline with required alt text, caption, Naik/Turun order, save/publish. Thumbnail is independent. Three captured additions per project were an earlier migration quantity, not a CMS limit. Native-dialog gallery retains keyboard navigation, Escape, focus return and original-file fallback.

Article rich text is a Markdown-based textarea supporting headings, paragraphs, bold/italic, lists and links; it is not a WYSIWYG toolbar. Legacy rich text stays intact until edited. Save/publish/dirty/pending/error states remain explicit. Draft changes preserve the published version; staff-only preview, up to 20 revisions loaded as draft and conflicting-save rejection support review. Admin/editor manage content, schedules, media and message follow-up; only admin manages users and deletion. Existing legacy login access, eight-hour HttpOnly sessions, Neon, Blob and original tables are preserved; no Payload runtime remains.

Scheduler is private WIB date-only planning with month controls, today, status filtering, selected-day agenda and edit-to-reschedule. It has no automatic reminders, external calendar synchronization or automatic WhatsApp send. Contact also persists privately before presenting a separate explicit WhatsApp action.

## Evidence and history

Current source read: `src/app/(frontend)/globals.css`, frontend layout, Studio stylesheet/layout, `studio-workspace.tsx`, `service-scene.tsx` and `division-structure.tsx`. Nine browser tests pass; current capture set covers 24 admin and 36 public views with no observed overflow/errors. Touch is Chrome emulation rather than all physical devices. Fresh review is [visual-review-studio.md](visual-review-studio.md).

Earlier [motion review](visual-review-motion.md) and [refinement record](refinement-20261023.md) preserve historical evidence for raster perspective, right emblem, coordinator tree, .14 centered footer and previous release. Those are superseded current guidance. Stage READY at https://waslainformatika-nehon1bg1-jae-f2e1.vercel.app passed runtime verification; primary-domain promotion awaits visual review. Domain wasla.my.id is attached but registrar expiry prevented nameserver save; TTM Host nameservers remain. [Deployment](deployment.md) and [domain status](domain-wasla-my-id.md) own operational facts; documentation is not DNS or production certification.
