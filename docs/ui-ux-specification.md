# Wasla UI/UX specification: final local correction scope

The final implementation retains [the Vodjo-led direction](vodjo-direction.md) and applies the owner's latest precise corrections: seven real websites, unboxed transparent 3D services, actual technology logos, restored colorful identity, four curved contacts, recipient selection and a huge last footer wordmark. [DESIGN.md](../DESIGN.md) owns current design tokens; [design-system.md](design-system.md) explains their application. Workflow is code-first with browser evidence; no approved Figma comp or comp gate is claimed.

## Homepage journey

Full-height photographic hero and consultation action -> layered wave -> seven real screenshot projects -> wave -> three navy service columns with transparent 3D objects -> wave -> branded illustrative device and expertise/process -> eight monochrome technology marks -> Ice contact directory and private consultation form -> eligible real testimonials only -> wave and footer information -> navigation/copyright -> huge final wasla with informatika below.

Workstation imagery is illustrative, not a claim about Wasla's office. Projects are actual public screenshots supplied by the owner, not generated site mockups. Featured home records are capped at eight; the current seven are Catatan Mengaji — SD Bani Saleh, IPNU Kota Bekasi, Batu Alam Supplier, Fazma Stone, Cimuning — E-Katalog, Mahameru Baja Indonesia and SIT Permata Hati Bekasi. Old concepts are private drafts. Do not invent project stack, metrics, testimonials, results or staff details. [Screenshot evidence](evidence/real-projects-2026-10-23.md) records permitted sources and observed limits.

The colorful emblem is top-right in the header, used by favicon and the branded device; it is a raster restoration, not a bit-exact original. The technology strip shows PHP, Next.js, React, TypeScript, PostgreSQL, Payload CMS, JavaScript and Tailwind CSS actual marks. It describes studio capability, not the stack or endorsement of individual projects. The huge footer follows the owner's Jayszrs bottom-placement request while retaining Wasla navy/white and Poppins.

## Routes and content

| Route | Purpose |
| --- | --- |
| / | proposition, seven real projects, services, expertise/process, technology and direct consultation |
| /tentang-kami | Navy masthead, CMS feature image/copy, principles/process, real team and CTA |
| /layanan | Navy masthead, alternating transparent service-object/copy bands, detail links and native FAQ |
| /layanan/[slug] | published scope, deliverables, authored visual, content/process and contact |
| /portofolio | public label Project; real screenshot gallery, centered text category filters and accessible result/empty feedback |
| /portofolio/[slug] | truthful project context, challenge/solution, actual external website, optional substantiated details/gallery |
| /insights and /insights/[slug] | public label Artikel; published discovery and semantic reading |
| /kontak | Navy masthead, four curved contact cards and private form with recipient/service selection |
| /privasi | contact-data purpose and explicit private-save/WhatsApp handoff explanation |
| /admin | authenticated Payload editing and administrator-controlled staff access |

Project/Artikel labels retain existing URLs. Missing or draft details are unavailable anonymously; public queries enforce publishing access. Testimonials require eligible approved content. Contact submissions stay private and there is no public administrator registration.

## Layout, focus and responsive behavior

Centered 1140px outer/1110px inner wrapper has 15px gutters. At 1199/991/767px caps become 960/750/570px; at 575px wrapper is fluid. Hero is 100svh with 700px minimum, 680px narrow. Hero type 50px becomes 45/39/36px at 991/767/575px; compact copy is 13px and body 14px. All use self-hosted Poppins. Full token and contextual type values are in DESIGN.md.

Fixed header is 82px initial desktop, 64px after 80px scroll, and 86px initial mobile. Initial light text sits over dark hero/PageIntro, switching to White surface after scroll. At or below 991px the native details menu fills the screen; enhancement makes main/footer inert and hidden, locks background scroll, wraps Tab and closes on Escape with focus restoration, route selection or desktop resize. Static ID identifies language. Right-side emblem is 46px desktop/36px mobile. Global focus is 3px Blue with 5px offset; skip-to-main is available.

Home projects use two columns/2px seams, with the odd seventh spanning the row at aspect ratio 2.3. Below 767px all stack at 16:9. Desktop overlays respond to hover/focus; narrow home titles remain visible while catalog titles appear once outside the image. Portfolio text filters use aria-pressed, 44px minimum height, 20px type/18px narrow, no border/radius, Slate inactive/Navy active and an underline. Count remains announced but visually clipped; empty feedback remains visible. Article filters retain capsules.

Home services are three columns, one below 767px; transparent contained objects occupy 270px, 265px narrow, without enclosing panels. Technology uses eight columns, four at or below 1199px, with 52px marks/42px below 767px and visible captions. Contact cards use two columns/22px gaps, one column/16px below 767px. Their alternating radii are 65px 25px 65px 25px desktop and 50px 22px 50px 22px narrow. Dedicated Contact form fields remain one column; home fields use two until narrow. The floating directory link hides where contact cards are present. Footer information stacks narrow; the huge final wordmark scales with the viewport inside the wrapper.

## Internal pages and service media

PageIntro is centered White 54px H1 on Deep Navy, 42px below 767px, with 13px Light subtitle. Desktop content padding 145px/60px, wave 140px and following margin 85px become 112px/35px, 40px and 55px narrow. About pairs featureImage left/copy right, stacking image first.

Service catalog extends to 1440px and alternates equal image/copy bands, gap 30px and spacing 65px. The media region has minimum 360px height, 30px horizontal padding and contained 390px images. Copy maximum is 555px; titles 36px/excerpts 13px. Below 767px image leads with 300px height/minimum 280px region, gap 25px, spacing 45px, title 28px and copy gutters 15px. Both homepage and catalog use transparent objects, replacing the former 2:1 cover panels. FAQ remains a native disclosure.

CMS service illustration controls home; image controls catalog. Site Settings controls heroImage, featureImage, logoWhite, logoNavy and favicon. Projects own thumbnail/gallery and articles own image. Team owns names/roles/WhatsApp socials. Technology marks and footer emblem are packaged source assets. Uploads accept PNG/JPEG/WebP/AVIF; local maximum is 8 MB, Vercel server upload maximum is 4 MB with signature checks. [assets.md](assets.md) records provenance and replacement guidance. seed:real applies the explicit real-content migration and should not run as routine startup.

## Contact flow and exact recipients

| Name | Role | Direct destination |
| --- | --- | --- |
| Jaelani Surya Saputra | Software Engineering | https://wa.me/6281318533055 |
| Amat Suroso | Project Manager | https://wa.me/6281310154447 |
| Alhafiz | Web Developer | https://wa.me/6289697505769 |
| Laksa | Full Stack Engineering | https://wa.me/6289643092842 |

Cards show the corresponding +62 phone and link directly to that person. Only valid wa.me Team URLs qualify. Form recipient defaults to Project Manager when available, otherwise the first qualifying record. Service query preselection is supported on Contact. Required fields are name/email, service or undecided choice, 20-5000-character need and consent; company/phone are optional, honeypot hidden. Visible labels, optional markers, inline errors, pending, connection failure and saved success remain distinct. Fields are White with 2px corners, minimum 46px and 11px 12px padding; textarea minimum is 128px. Recoverable errors preserve values and first server error receives focus.

POST /api/contact validates origin, JSON content type, request size, input, published service, chosen recipient and a database-backed rate limit before saving privately through Payload/PostgreSQL. Selected recipient name/role is prefixed to the persisted message. Success follows persistence; optional SMTP notification failure does not discard the saved record. Recipient-specific URL encoding includes supplied summary fields. After a successful save the visitor sees **Lanjut ke WhatsApp [name]** and must click it to open WhatsApp; no external message is automatically sent. No-script guidance directs visitors to the contact cards. No fabricated response deadline, price or guarantee appears.

## Motion and final evidence

SSR content is visible. Eligible desktop normal-motion enhancement uses a skippable first-session 900ms backdrop clip, hero parallax capped at 72px, feature +/-28px and once-only below-fold 650ms reveals. Project hover scales 1.025; service hover lifts 8px/rotates Y -5 degrees. At or below 900px enhancements are static. Reduced motion removes animations, transforms and smooth scrolling. No-JS keeps content visible and native links/disclosures usable; JSON form submission needs JavaScript.

[Independent finish review](visual-review-real-projects.md) returned **ship**, with no material fixes, for the supplied final local screenshots and sampled implementation. This documenter checked desktop.png, mobile.png, services-1440-viewport.png and contact-390.png against final source. [Local validation](real-projects-validation.md) records successful build, TypeScript, ESLint, four unit tests, six browser tests and 36 route/width checks. Those results were read, not rerun here. The existing detector's 91 token/radius findings are advisory against the previous canon; this token refresh does not rerun the detector or claim a detector score/accessibility certification.

Production is separate: authenticated account jaelanisuryasaputra10@gmail.com and project waslainformatika are recorded, but database-provider terms still need owner acceptance. Provisioning, migrations, admin/content bootstrap, runtime checks and production promotion remain dependent on that database. This specification makes no live-site claim; [deployment.md](deployment.md) owns release status.
