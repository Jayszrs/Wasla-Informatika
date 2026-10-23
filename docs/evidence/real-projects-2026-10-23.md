# Public project screenshot evidence, 23 October 2026

Scope: seven user-owned portfolio websites, plus the large bottom wordmark on the user's Jayszrs website. The user authorized screenshots. Only public landing pages were visited. No login, form submission, protected content, student record, source script, private asset, or security bypass was used. Screenshots are actual pixels, not generated mockups.

All shipped images are 1440 × 1000 desktop viewport captures converted from retained PNG originals to WebP. Each WebP has a `.webp.source.json` attribution/provenance sidecar. The raw REA export is [rea-evidence-bundle.json](real-projects-2026-10-23/rea-evidence-bundle.json); the machine-readable shipping manifest is [project-screenshots.json](real-projects-2026-10-23/project-screenshots.json).

| Observed public name / type | Actual URL | Result | Evidence ID | Permitted thumbnail |
| --- | --- | --- | --- | --- |
| Ngaji Yuk! · SD Islam Labschool Bani Saleh; Tahsin & Tahfidz platform landing | https://ngajiyuk.sdilbanisalehsetu.com/ | Available via Playwright fallback, HTTP 200 | `fallback-ngajiyuk-2026-10-23T02:05:18.365Z` | `/images/projects/ngajiyuk.webp` |
| IPNU IPPNU Kota Bekasi; organization/news portal | https://ipnubekasi.my.id/ | Available via REA | `ev_33d4630526f033824968521c9dac4be5a2b382053207320da15b26923e1f4012` | `/images/projects/ipnubekasi.webp` |
| Fazmastone / Batu Alam Supplier; stone supplier/catalog | https://www.batualamsupplier.com/ | Available via REA | `ev_dc8e597a79c11e487631626f33e8a401befa81ab5a03bd9b3c585cfc816003c2` | `/images/projects/batu-alam-supplier.webp` |
| Fazmastone Supplier Batu Alam; natural stone catalog/store | https://www.fazmastone.com/ | Available via REA | `ev_e8a68e9a44c024cc2efe32911d5ae4717d63579fc301a84fa09db65198016ba5` | `/images/projects/fazmastone.webp` |
| Cimuning Digital Hub; UMKM directory and product catalog | https://cimuning.com/ | Available via REA, after clicking visible `Lewati` walkthrough button | `ev_9ee59a9cb27b52c81b6d8a676e2e2074e3d6afd5ebced0d91389736ca339a529` | `/images/projects/cimuning.webp` |
| MBI Laser Cutting · Mahameru Baja Indonesia; industrial services/company site | https://mahamerubaja.vercel.app/ | Available via REA, after clicking visible `Tutup poster` button | `ev_abe836eecd3a27f0918701c324c14dd426eb707a8b71b6927390b1e675977879` | `/images/projects/mahameru-baja.webp` |
| SIT Permata Hati Bekasi; Islamic school profile | https://sitpermatahati.up.railway.app/ | Available via REA | `ev_28e341ee732a8e8eae5d451ef99ece4d6e514ee0722be6633b810475af90f116` | `/images/projects/sit-permatahati.webp` |

Names above are observed branding/headings, except Ngaji Yuk's browser document title which was directly recorded by the fallback. The descriptions classify visible public content. Framework, CMS, database, hosting configuration, authentication implementation, deployment ownership, traffic, conversion, and project outcomes are unverified for every site; no stack claim should be inferred from a hostname or appearance.

REA used Chrome 156.0.8078.47, temporary empty browser profiles, reduced motion, blocked service workers, and a 3.5–4.5 second landing settle. REA did not assert HTTP status codes because network collection was not requested. Its evidence captures URL, screenshot, accessibility content, and declared action outcomes. Fixed waits are not proof that every remote font/image completed. The screenshots were visually inspected.

Ngaji Yuk's REA navigation failed before initial state capture. The original error is retained in [ngajiyuk-rea-failure.json](real-projects-2026-10-23/ngajiyuk-rea-failure.json). A single permitted Playwright fallback used `domcontentloaded`, awaited document fonts and visible images for up to eight seconds, and captured the public marketing landing. Details and actual document title are retained in [ngajiyuk-fallback.json](real-projects-2026-10-23/ngajiyuk-fallback.json). The visible dashboard is the site's own public marketing preview, not an authenticated student record. No identifying child information was extracted. SIT Permata Hati's first viewport uses an aerial campus image.

Initial modal states for Cimuning and Mahameru remain in the raw evidence and original PNGs. Clean screenshots follow only ordinary public dismiss buttons; Cimuning's privacy notice remains visible. Mahameru's captured viewport after poster dismissal is positioned on its visible industrial hero. No page elements, styles, or content were removed or rewritten for capture.

## Jayszrs footer observation

Source: https://jayszrs.my.id/ . REA pressed `End` on the page body and settled before capturing the bottom. Evidence `ev_fe79ac6d9977e4b51348f450028672ebf7f266f1b8f2757bc02723c64aa8eada`; retained screenshot [jayszrs-footer.png](real-projects-2026-10-23/jayszrs-footer.png). This reference is for bottom wordmark placement only.

Observed order: the end of a contact/business panel, generous black space, thin horizontal rule, compact name/navigation/copyright row, then a very large `Jay Szrs` wordmark at the bottom. The wordmark is a heavy sans serif in low-contrast charcoal on black, centered across most of the content width, with its lower edge reaching the viewport bottom. Exact font family and CSS sizes were not inspected.

Suggested adaptation: keep Wasla's agreed navy/white design, place the huge `Wasla Informatika` wordmark below the footer information row as the final page element, and scale it fluidly within the page width. Use the footer's navy palette rather than copying Jayszrs's page styling. No Jayszrs screenshot is shipped as a portfolio thumbnail.

## Batu Alam Supplier scroll-top verification

A follow-up REA scenario settled 6.5 seconds, pressed `Control+Home`, then captured the public root. It still begins with **Client Testimonial** beneath the navigation. The shipped thumbnail now uses [batu-alam-supplier-scroll-top.png](real-projects-2026-10-23/batu-alam-supplier-scroll-top.png), evidence `ev_dc8e597a79c11e487631626f33e8a401befa81ab5a03bd9b3c585cfc816003c2`, retained in [batu-scroll-top-rea-evidence.json](real-projects-2026-10-23/batu-scroll-top-rea-evidence.json). The original earlier screenshot and evidence remain unchanged.

One Playwright fallback verification awaited fonts and visible images, pressed `Control+Home`, explicitly returned the viewport to 0,0, and read layout geometry without changing content/styles. It recorded HTTP 200, exact URL `https://www.batualamsupplier.com/`, title `Fazmastone - Supplier Batu Andesit Premium`, window/document/main scroll offsets of zero, and the first main heading `Client Testimonial` at y=352.5. The next section heading is `Keunggulan Produk Kami` at y=1080. This supports that the testimonials are the currently observed homepage opening, rather than a mistaken mid-page screenshot. [Verification JSON](real-projects-2026-10-23/batu-scroll-top-fallback.json) and [fallback screenshot](real-projects-2026-10-23/batu-alam-supplier-verified-scroll-top.png) are retained separately. Both captures used reduced motion; normal-motion behavior was not compared. No hypothetical hero was created or substituted.
