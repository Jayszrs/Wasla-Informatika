# Wasla Informatika
<!-- impeccable:product-schema 1 -->

## Platform
web

## Stack
Next.js App Router, TypeScript, Tailwind CSS, custom Wasla Studio CMS, Neon PostgreSQL and Vercel Blob. Public service objects use Three.js. There are no runtime Payload dependencies; existing content, media, IDs, legacy account access and original database tables are preserved through separate studio_* storage.

## Users
Indonesian businesses evaluating a technology partner. Editors maintain services, projects, articles, media and company details, follow up on private consultation messages and plan project work. Administrators additionally manage staff access and deletion.

## Product Purpose
Explain Wasla's capabilities, make actual work discoverable and turn a business need into a consultation request. Give staff a private workspace for publishing and internal scheduling.

## Capabilities and Constraints
Public copy is Indonesian; anonymous visitors see published content only. Contact messages and schedules are private. No public administrator registration. Existing staff credentials remain usable through legacy-hash verification at first login, then migration to scrypt; eight-hour HttpOnly sessions preserve admin/editor roles. Only admin manages users and deletion.

Wasla Studio replaces Payload rather than reskinning it. Overview uses real counts, closest deadlines, new messages and recent projects with honest empty states. Content has explicit save/draft/publish/unpublish, staff-only draft preview, up to 20 revisions and conflict detection. Article rich text uses a Markdown-based textarea with documented formatting syntax; legacy rich text stays intact until edited. Gallery management is manual: add rows, choose or upload images with required alt text, enter captions, order and save/publish. Uploads are validated images stored through Blob; no invented images or automatic screenshot generation is implied.

Scheduler manages assignee, date-only WIB start/deadline, status and optional client/project/notes. Calendar supports month controls, status filtering, day selection and agenda; editing reschedules work. It is private planning without automatic reminders, calendar synchronization or automatic WhatsApp sends. Contact persists privately before presenting a separate explicit WhatsApp action.

No fabricated client work, staff, portraits, testimonials, metrics, prices, guarantees or schedules. Seven owner-supplied completed websites and four supplied people/phone destinations are the current evidence. Old project demonstrations remain private drafts; technology marks do not substantiate a displayed project's stack.

## Brand Commitments
Wasla navy/white, self-hosted Poppins, photographic public opening, real website screenshots and restrained accessible motion. Existing Vodjo-led public proportions remain, with the latest owner corrections taking precedence: actual Three.js service meshes; semantic click-to-flip division cards with supplied photos or initials; left wordmark and ID marker with right emblem removed; White public CTAs; seamless straight professional navy footer with a low-opacity decorative final wordmark. Circular navy favicon and branded illustrative device remain. Studio is an Operate surface: readable forms, concrete tasks, predictable navigation, true counts and honest empty states.

## Evidence on Hand
Owner artwork, seven completed website links, four named WhatsApp contacts, real project covers and 21 additional gallery captures. Source contract: `.impeccable/studio-direction.md`; current editor/access/data facts: `docs/wasla-studio.md`. Two batched visual looks, nine browser tests and 24 admin plus 36 public captures passed without observed overflow/errors in the current validation scope. Emulated touch coverage does not claim every physical device.

## Product Principles
Immediate access to the proposition and contact. Honest evidence. Maintainable owner-controlled content. Clear publication state and staff permissions. Private consultation/scheduling data. Keyboard and touch access; motion never blocks use.

## Open Decisions
Code-first implementation is approved; no approved visual comp is claimed. Production release dpl_7pH59fqvSkobj1h4sN7kTJssrZwT is promoted and verified at https://wasla.my.id. Vercel reports configured-correctly; Cloudflare and Google resolve ns1.vercel-dns.com and ns2.vercel-dns.com. HTTPS, canonical, sitemap, existing administrator login, Blob upload, scheduler, contact persistence and desktop/mobile checks passed on the custom domain. See docs/production-verification.md and docs/domain-wasla-my-id.md for operational evidence.

Historical context: earlier production/refinement records describe a Payload CMS, raster service perspective, right header emblem, connected coordinator diagram and larger centered footer signature. Those describe earlier releases, superseded by the explicit 23 October Studio contract. Prior project/gallery provenance and public deployment evidence remain historical evidence, not current operational certification.
