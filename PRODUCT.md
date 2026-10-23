# Wasla Informatika
<!-- impeccable:product-schema 1 -->

## Platform
web

## Stack
Next.js App Router, TypeScript, Tailwind CSS, custom Wasla Studio CMS, Neon PostgreSQL and Vercel Blob. Public service objects use Three.js. There are no runtime Payload dependencies; existing content, media, IDs, legacy account access and original database tables are preserved through separate studio_* storage.

## Users
Indonesian businesses evaluating a technology or creative-services partner, and people arranging wedding, graduation or event documentation. Editors maintain services, projects, articles, media and company details, follow up on private consultation messages and plan project work. Administrators additionally manage staff access and deletion.

## Product Purpose
Explain Wasla's capabilities, make actual work discoverable and turn a business need into a consultation request. Give staff a private workspace for publishing and internal scheduling.

## Capabilities and Constraints
Public copy is Indonesian; anonymous visitors see published content only. Contact messages and schedules are private. No public administrator registration. Existing staff credentials remain usable through legacy-hash verification at first login, then migration to scrypt; eight-hour HttpOnly sessions preserve admin/editor roles. Only admin manages users and deletion.

Wasla Studio replaces Payload rather than reskinning it. Overview uses real counts, closest deadlines, new messages and recent projects with honest empty states. Content has explicit save/draft/publish/unpublish, staff-only draft preview, up to 20 revisions and conflict detection. Article rich text uses a Markdown-based textarea with documented formatting syntax; legacy rich text stays intact until edited. Gallery management is manual: add rows, choose or upload images with required alt text, enter captions, order and save/publish. Uploads are validated images stored through Blob; no invented images or automatic screenshot generation is implied.

Scheduler manages assignee, date-only WIB start/deadline, status and optional client/project/notes. Calendar supports month controls, status filtering, day selection and agenda; editing reschedules work. It is private planning without automatic reminders, calendar synchronization or automatic WhatsApp sends. Contact persists privately before presenting a separate explicit WhatsApp action.

No fabricated client work, staff, portraits, testimonials, metrics, prices, guarantees or schedules. Owner-approved website package prices are explicit product facts, not a license to invent inclusions. Seven owner-supplied completed websites and four supplied people/phone destinations are the current evidence. Old project demonstrations remain private drafts; technology marks do not substantiate a displayed project's stack.

The approved extension preserves ten technology services and adds Fotografi & Dokumentasi (wedding and wedding-organizer collaboration, graduation and events), Video Editing and Desain Grafis & Photo Editing: 13 services total. Homepage offers six choices: website development, web application, UI/UX design and the three creative services. Slug-based scene identity remains correct when CMS order changes; service consultation actions retain context. Scope, revisions, formats and timing follow the brief without invented promises.

Website packages are CMS-editable in Pengaturan website ? Paket website and appear on the homepage and `/paket-website`. Owner-approved defaults are Landing Page Rp5.000.000 without CMS, Web Application Rp8.000.000 with management according to the project scope, and Company Profile + CMS Rp10.000.000 including CMS. Name, slug, rupiah price, summary, CMS description and consultation service are editable. A package action opens `/kontak` with its service selected and its current name, price and CMS scope in an editable message. Features, schedule, domain, hosting and support are settled in the proposal. A consultation remains a private saved message followed by an explicit WhatsApp action.

Four supplied portraits of Ahmad Suroso, Jaelani Surya Saputra, Al Hafiz and Laksa replace initials in the shared home/about flip cards. These are professional AI-retouched versions of supplied photographs with transparent alpha, not untouched documentary photos; low-resolution source limits remain explicit. The provenance manifest and PNG metadata record the edits. They remain CMS-replaceable at Tim & divisi → Foto profil; original WhatsApp destinations remain unchanged.

Project devices contain authentic CMS screenshots: the cover supplies the laptop, a genuine portrait gallery image supplies the optional phone, and gallery devices use laptop/tablet/phone frames. The seven projects have genuine desktop/mobile captures. Frames are CSS; no website text or screenshot is redrawn into a generated mockup. CMS replacement updates the device screen directly and enlargement shows the original file.

Vercel Web Analytics and Speed Insights mount only on public routes when VERCEL === '1'. Page-view URLs strip query/hash; Speed Insights samples 10%. No form content, admin telemetry or custom form/admin events are added. No paid Plus purchase is implied.

## Brand Commitments
Wasla navy/white, self-hosted Poppins, photographic public opening, real website screenshots and restrained accessible motion. Existing Vodjo-led public proportions remain, with the latest owner corrections taking precedence: actual Three.js service meshes; semantic click-to-flip division cards with supplied retouched photos or honest initials; left wordmark and ID marker with right emblem removed; White public CTAs; seamless straight professional navy footer with a low-opacity decorative wasla and readable informatika subtitle. Retain existing section waves with covered raster-edge seams, 15px mobile service-copy gutters and CSS device frames containing original screenshots. Reuse horizontal website-package comparison rows that stack on mobile. Footer information groups actual company details, Hubungi Kami, Layanan Kami, Jelajahi Wasla and configured social destinations; service links correspond to published services. Hide the public page scrollbar while preserving native wheel, touch and keyboard scrolling and internal/Studio scroll controls. Circular navy favicon and branded illustrative device remain. Studio is an Operate surface: readable forms, concrete tasks, predictable navigation, true counts and honest empty states.

## Evidence on Hand
Owner artwork, seven completed website links, four named WhatsApp contacts, real project covers and 21 additional gallery captures. Base contract: `.impeccable/studio-direction.md`; package/footer continuation: `.impeccable/packages-refinement.md`; current creative extension: `.impeccable/creative-refinement.md` and `docs/creative-refinement.md`; portrait provenance: `docs/team-portrait-provenance.json`; editor/access/data facts: `docs/wasla-studio.md`. The earlier creative review opened 24 captures across 1440, 1446, 1024 and 390 widths. The current package/footer measurement record is `.impeccable/review/packages-browser-readings.json`: 21 captures at 1440, 1477, 1024 and 390 widths, no recorded overflow, broken images or browser errors, including mobile footer upper/bottom views. Parent validation reports a passing build, 13 browser and four unit tests, and lint with zero errors/seven existing warnings. This documentation pass reads that record and does not rerun app checks or claim an independent visual verdict. Emulated touch coverage does not claim every physical device.

Source ownership: App Router addresses remain under `src/app`; public components and utilities are in `src/frontend`, CMS/API/data modules in `src/backend`, and shared content types, validation, contacts, media helpers, schema and package defaults in `src/shared`. Package sources are `src/frontend/components/website-packages.tsx`, `src/shared/website-packages.ts` and `src/shared/studio-schema.ts`. Organization changes do not change public or staff route addresses.

## Product Principles
Immediate access to the proposition and contact. Honest evidence. Maintainable owner-controlled content. Clear publication state and staff permissions. Private consultation/scheduling data. Keyboard and touch access; motion never blocks use.

## Open Decisions
Code-first extension is approved; no approved visual comp is claimed. DNS and HTTPS already work at https://wasla.my.id. New deployment dpl_3RqmPGEko4anami9d9Ugfmw6Db8s is READY; runtime verification and promotion remain pending. Earlier production checks do not certify this new deployment or telemetry delivery. See docs/production-verification.md and docs/domain-wasla-my-id.md for operational evidence.

Historical context: earlier production/refinement records describe a Payload CMS, raster service perspective, right header emblem, connected coordinator diagram and larger centered footer signature. Those describe earlier releases, superseded by the explicit 23 October Studio contract. Prior project/gallery provenance and public deployment evidence remain historical evidence, not current operational certification.
