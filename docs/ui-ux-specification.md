# Wasla UI/UX specification: custom Studio and public refinement

The latest approved owner direction replaces Payload with a custom navy/white Studio, actual rendered service geometry, responsive internal planning and manual content editing. Public visual continuity remains binding: Poppins, photographic hero, navy/white and real project screenshots. Current tokens are in [DESIGN.md](../DESIGN.md); application rules are in [design-system.md](design-system.md); scope is in [.impeccable/studio-direction.md](../.impeccable/studio-direction.md). The [creative extension](../.impeccable/creative-refinement.md) and [package/footer continuation](../.impeccable/packages-refinement.md) preserve that identity. Supplied portraits are transparently AI-retouched, with provenance; no approved comp or invented schedules are claimed.

## Public journey and routes

Homepage: photographic proposition/action, real project gallery, six semantic service choices, CMS-owned website-package rows, navy-branded illustrative device and expertise, 24 official technology links, White people/consultation area, eligible testimonials and straight navy footer. Existing waves between selected sections remain; footer has no wave/seam. Header keeps left wordmark and ID marker, with right emblem removed. Public CTA surfaces are White; decorative text-link arrows/underlines are removed. Footer groups readable company details, Hubungi Kami, Layanan Kami, Jelajahi Wasla and configured valid social destinations. Its final aria-hidden signature pairs a low-opacity wasla child with readable informatika below; there is no clipping or height cap.

| Route | Current purpose |
| --- | --- |
| / | proposition, seven real covers, actual service geometry, expertise, technologies, people and consultation |
| /tentang-kami | masthead, CMS image/copy, White principles, full-width navy process, actual team and CTA |
| /layanan and /layanan/[slug] | alternating geometry/copy bands and published service detail |
| /paket-website | three editable package comparisons and contextual consultation |
| /portofolio and /portofolio/[slug] | public label Project, filters, truthful work context, external site and manual CMS gallery |
| /insights and /insights/[slug] | public label Artikel, published discovery and semantic reading |
| /kontak | four curved contact cards and private form with recipient/service selection |
| /privasi | consultation data purpose and explicit WhatsApp handoff |
| /admin | custom Wasla Studio dashboard and staff-only content operations |
| /admin/schedules | private project calendar and agenda |
| /preview | session-protected draft preview |

Missing/draft public details are unavailable anonymously. Old concept projects remain private drafts. Current seven completed websites are Catatan Mengaji - SD Bani Saleh, IPNU Kota Bekasi, Batu Alam Supplier, Fazma Stone, Cimuning - E-Katalog, Mahameru Baja Indonesia and SIT Permata Hati Bekasi. Screenshot provenance is in [real-project evidence](evidence/real-projects-2026-10-23.md) and [gallery evidence](evidence/project-gallery-2026-10-23.md). Do not infer stacks, traffic or results. Hero workstation is illustrative, not a claimed office photograph.

## Public interaction and responsive behavior

Wrapper is 1140px outer/1110px inner with 15px gutters, capping at 960/750/570px at 1199/991/767px, fluid below 575px. Header is 82px initially, 64px after scroll, 86px initial mobile. At 991px native details navigation fills the screen; enhancement makes background inert, locks scroll, wraps Tab and closes on Escape, route or desktop resize with appropriate focus restoration. Static ID describes language. Public focus is 3px Blue with 5px offset; skip-to-main remains.

Home projects use two columns/2px seams, seventh spans the row with a 16:9 device stage. Original CMS cover/gallery images occupy CSS laptop, tablet and optional phone frames; no screenshot text is redrawn. Cover replacement updates the laptop screen, and enlargement shows the original file. Desktop overlays respond to hover/focus; narrow home titles remain visible and catalog titles appear once below the image. Portfolio filters use aria-pressed and accessible result/empty feedback; article filters remain capsules. Galleries retain original thumbnails separately, contain-sized screenshot rows, visible captions and full-viewport native-dialog enlargement. Previous/next, arrow keys, Escape, scroll lock, focus return and direct-file fallback remain available.

Service scenes are real Three.js meshes with materials, environment, lights and shadows. A matching geometric SVG is the loading/WebGL fallback. Stable slug mapping retains service identity through CMS reordering, including camera, editing timeline and artboard scenes for the creative services. Fine-pointer movement/scroll produces bounded orientation, drag and arrow keys rotate and Home resets. Touch starts with scrolling available and explicit Putar objek/Selesai memutar toggles. Reduced motion disables automatic orientation, retaining deliberate controls. Render on demand and dispose offscreen resources; no endless autoplay. Home height is 300px, 250px at 991px and 310px at 767px. Catalog height becomes 430/370/340/300px at desktop/1199/767/420px.

Homepage people use four cards, two columns below 991px and one centered column below 420px. Project Manager sorts first. Each front is a semantic button with actual Team photo or navy initials, name and role; click/Enter/Space opens biography/WhatsApp/return face. Inactive face is inert/aria-hidden; focus moves to WhatsApp and returns to the front. Flip transition is removed for reduced motion. Shared home/about flip cards use the four supplied AI-retouched transparent portraits, CMS-replaceable with honest initials as the absent-photo fallback. Low-resolution input limits and edits remain in [portrait provenance](team-portrait-provenance.json). Direct contact directories retain curved cards. No artificial coordinator tree remains.

## Website packages and footer behavior

The homepage and `/paket-website` share the CMS array from Pengaturan website ? Paket website. Defaults are Landing Page Rp5.000.000 without CMS; Web Application Rp8.000.000 with management according to project scope; Company Profile + CMS Rp10.000.000 including CMS. Name, slug, rupiah price, summary, CMS scope and consultation service are editable. Features, timing, domain, hosting and support are proposal details. Empty arrays show update/contact guidance.

Rows place description, explicit price/CMS scope and Bahas paket ini together. At 991px the action moves below two content columns; at 767px content stacks and the action fills the row. The action opens `/kontak?layanan=?&paket=?`, resolves the current CMS package by slug, selects its service and prefills an editable message with its name, price and CMS scope. It does not bypass the visitor's review, consent or private-save/explicit-WhatsApp sequence.

Footer services link only to matching published service slugs, plus real catalog/package destinations; navigation and social links come from valid configured destinations. Company/contact/service/exploration groups use four desktop columns and two at 991px; below 767px company and contacts span the grid, with two contact columns and adjacent service/exploration groups. The complete informatika subtitle and bottom spacing remain visible after the decorative wasla name.

The public page scrollbar is hidden while native wheel, keyboard and touch scrolling remain available. Public stylesheet scope leaves Studio and internal scroll controls separate. Existing waves retain covered raster edges; every narrow catalog copy/action row keeps 15px gutters.

## Contacts and private persistence

| Name | Role | Direct destination |
| --- | --- | --- |
| Jaelani Surya Saputra | Software Engineering | https://wa.me/6281318533055 |
| Ahmad Suroso | Project Manager | https://wa.me/6281310154447 |
| Al Hafiz | Web Developer | https://wa.me/6289697505769 |
| Laksa | Full Stack Engineering | https://wa.me/6289643092842 |

Team records drive qualifying valid wa.me destinations. Form defaults to Project Manager when available. Name/email, service or undecided option, 20-5000-character need and consent are required; company/phone optional. Origin/input/rate checks precede private PostgreSQL persistence. Recipient name/role is saved with the message. Success appears after persistence and exposes an explicit Lanjut ke WhatsApp action; the website never automatically sends the external message. Errors preserve values; pending, connection failure and saved success differ. No-script guidance points to direct contacts. Prices use the owner-approved editable package values; no response deadline, guarantee or package inclusion is fabricated.

## Studio overview and navigation

Custom Wasla Studio has no Payload runtime. Desktop left wordmark/navigation, concise heading, closest real deadlines/new messages, database counts and recently updated projects support daily operations. Empty states explain the next action without fabricated activity. Navigation exposes content, media, messages, scheduler and authorized settings. User management/deletion is admin-only. Current roles/session/data rules are in [wasla-studio.md](wasla-studio.md).

Desktop sidebar is 238px, 210px at 1199px. Topbar is sticky at 78px; main caps at 1510px with 42px horizontal padding, 26px at 1199px. At 991px sidebar becomes a 250px overlay with scrim, shell offset disappears, topbar becomes 68px. At 767px main padding is 26px 18px 40px, overview stacks and table rows reflow to content/action pairs. Media library is four columns, three at 1199px and two narrow. Poppins body is 13px/1.65, H1 28px/1.35 and 24px narrow. Panels are White on Studio Ground; status text accompanies neutral/blue/green/amber fills. Keyboard focus is 3px Studio Focus with 3px offset.

## Editor and media operations

Desktop editor uses flexible content plus sticky 270px save rail, 235px at 1199px. Below 767px it becomes one column with save controls before the form. Explicit dirty/pending/saved/error states, visible labels and inline validation remain. Draft edits preserve the live published version until explicit publish. Unpublish removes the public version without deleting draft/gallery. Staff-only draft preview and up to 20 revisions allow review; loading a revision creates a draft for review/save, not an automatic publish. Concurrent-tab revision conflict requires reloading current content.

Article rich text is a Markdown-based textarea with documented headings, paragraphs, bold, italic, lists and links. It is not a WYSIWYG toolbar; legacy rich text is kept until edited. Gallery editing is manual: add a row, choose Media or expand inline upload, provide alt text, upload and use the image, enter caption, move with Naik/Turun and save/publish. No gallery automation or seed/capture occurs during normal editing. Existing three additional captures per project are initial migration data, not a maximum.

Media upload accepts PNG/JPEG/WebP/AVIF up to 4 MB in production, validates decoded image data and stores WebP via server-side Blob access. Alt text is required. Token stays server-side. Existing media/IDs/references and original database tables are preserved in the migration to independent studio_* tables; Neon and Blob remain services. Admin/editor can manage content, media, schedules and message follow-up; only admin manages users and deletion. Legacy login verifies existing hashes then migrates to scrypt. HttpOnly sessions expire after eight hours. Private messages/schedules and draft preview require staff session.

## Private project scheduler

Calendar has month previous/next, today, status filter, date buttons and agenda. Creating work requires name, Team assignee, start and deadline; client, project ID and notes are optional. Due cannot precede start. Statuses are direncanakan, dikerjakan, ditinjau and selesai. Dates are WIB date-only. Edit reschedules; admin can delete.

Desktop seven-column cells are at least 110px; narrow cells 66px show compact status marks, while agenda retains full title/date/assignee/status. Selected dates use aria-pressed and a blue inset boundary; current date has a navy marker. Empty month/day explains creating work. The scheduler is internal planning only: no automatic reminders, external calendar sync or automatic WhatsApp sends. Do not seed fictitious jobs to fill the calendar.

## Verification and historical scope

The current documentation pass checks source rather than making a new render or runtime certification. It reads public globals/layout, homepage/package/contact routes, shared package defaults, CMS schema and service mapping. The current [package/footer measurement record](../.impeccable/review/packages-browser-readings.json) lists 21 captures at 1440/1477/1024/390px, no recorded overflow/broken images/browser errors and separate mobile footer upper/bottom views. Parent validation reports a passing build, 13 browser/four unit tests and lint with zero errors/seven existing warnings. The parent implementation review owns the visual verdict; prior [creative refinement](creative-refinement.md) and [Studio visual review](visual-review-studio.md) remain dated evidence. Emulated touch does not represent every physical device.

Source organization keeps routes under `src/app`, public components/utilities under `src/frontend`, CMS/API/data modules under `src/backend`, and shared contracts/helpers under `src/shared`. Public and staff route addresses remain unchanged. Relevant sources include `src/frontend/components/website-packages.tsx`, `src/frontend/components/contact-form.tsx`, `src/frontend/components/service-scene.tsx`, `src/frontend/components/device-mockup.tsx`, `src/frontend/studio/workspace.tsx`, `src/shared/website-packages.ts` and `src/shared/studio-schema.ts`.

DNS and HTTPS already work at https://wasla.my.id. PRODUCT.md records the current release state. [Production verification](production-verification.md) and [domain status](domain-wasla-my-id.md) own operational evidence; source documentation does not certify a new release or analytics delivery. Historical [motion review](visual-review-motion.md) and [refinement record](refinement-20261023.md) describe superseded Payload, raster perspective, right emblem, coordinator tree and clipped/no-subtitle footer behavior.
