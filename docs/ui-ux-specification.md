# Wasla UI/UX specification: custom Studio and public refinement

The latest approved owner direction replaces Payload with a custom navy/white Studio, actual rendered service geometry, responsive internal planning and manual content editing. Public visual continuity remains binding: Poppins, photographic hero, navy/white and real project screenshots. Current tokens are in [DESIGN.md](../DESIGN.md); application rules are in [design-system.md](design-system.md); scope is in [.impeccable/studio-direction.md](../.impeccable/studio-direction.md). No approved comp, new portraits or invented schedules are claimed.

## Public journey and routes

Homepage: photographic proposition/action, real project gallery, three service scenes, navy-branded illustrative device and expertise, 24 official technology links, White people/consultation area, eligible testimonials and straight navy footer. Existing waves between selected sections remain; footer has no wave/seam. Header keeps left wordmark and ID marker, with right emblem removed. Public CTA surfaces are White; decorative text-link arrows/underlines are removed. The final footer signature is left-aligned lowercase wasla at opacity .08 with no subtitle, aria-hidden after readable brand/navigation/team/copyright/privacy/back-to-top.

| Route | Current purpose |
| --- | --- |
| / | proposition, seven real covers, actual service geometry, expertise, technologies, people and consultation |
| /tentang-kami | masthead, CMS image/copy, White principles, full-width navy process, actual team and CTA |
| /layanan and /layanan/[slug] | alternating geometry/copy bands and published service detail |
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

Home projects use two columns/2px seams, seventh spans the row at ratio 2.3; below 767px all are one column at 16:9. Desktop overlays respond to hover/focus; narrow home titles remain visible and catalog titles appear once below the image. Portfolio filters use aria-pressed and accessible result/empty feedback; article filters remain capsules. Galleries retain original thumbnails separately, contain-sized screenshot rows, visible captions and full-viewport native-dialog enlargement. Previous/next, arrow keys, Escape, scroll lock, focus return and direct-file fallback remain available.

Service scenes are real Three.js meshes with materials, environment, lights and shadows. Raster is only loading/WebGL fallback. Fine-pointer movement/scroll produces bounded orientation, drag and arrow keys rotate and Home resets. Touch starts with scrolling available and explicit Putar objek/Selesai memutar toggles. Reduced motion disables automatic orientation, retaining deliberate controls. Render on demand and dispose offscreen resources; no endless autoplay. Home height is 300px, 250px at 991px and 310px at 767px. Catalog height becomes 430/370/340/300px at desktop/1199/767/420px.

Homepage people use four cards, two columns below 991px and one centered column below 420px. Project Manager sorts first. Each front is a semantic button with actual Team photo or navy initials, name and role; click/Enter/Space opens biography/WhatsApp/return face. Inactive face is inert/aria-hidden; focus moves to WhatsApp and returns to the front. Flip transition is removed for reduced motion. Contact/About retain curved contact cards. No artificial coordinator tree or invented portraits remain.

## Contacts and private persistence

| Name | Role | Direct destination |
| --- | --- | --- |
| Jaelani Surya Saputra | Software Engineering | https://wa.me/6281318533055 |
| Amat Suroso | Project Manager | https://wa.me/6281310154447 |
| Alhafiz | Web Developer | https://wa.me/6289697505769 |
| Laksa | Full Stack Engineering | https://wa.me/6289643092842 |

Team records drive qualifying valid wa.me destinations. Form defaults to Project Manager when available. Name/email, service or undecided option, 20-5000-character need and consent are required; company/phone optional. Origin/input/rate checks precede private PostgreSQL persistence. Recipient name/role is saved with the message. Success appears after persistence and exposes an explicit Lanjut ke WhatsApp action; the website never automatically sends the external message. Errors preserve values; pending, connection failure and saved success differ. No-script guidance points to direct contacts. No price, response deadline or guarantee is fabricated.

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

Current source and workflow were checked against Studio/public styles, frontend layout, workspace editor, service scenes and division cards. Nine browser tests pass; 24 admin and 36 public captures show no observed overflow/errors. Chrome touch emulation does not represent every physical device. Fresh review: [visual-review-studio.md](visual-review-studio.md).

Production release dpl_7pH59fqvSkobj1h4sN7kTJssrZwT is promoted and verified at https://wasla.my.id. Vercel reports configured-correctly; Cloudflare and Google resolve ns1.vercel-dns.com and ns2.vercel-dns.com. HTTPS, canonical, sitemap, existing administrator login, Blob upload, scheduler, contact persistence and desktop/mobile checks passed on the custom domain. See docs/production-verification.md and docs/domain-wasla-my-id.md for operational evidence.

Historical [motion review](visual-review-motion.md) and [refinement record](refinement-20261023.md) document the earlier Payload, raster-perspective, right-emblem, coordinator-tree and .14 centered-footer release. Those remain historical evidence, superseded by the owner's current contract.
