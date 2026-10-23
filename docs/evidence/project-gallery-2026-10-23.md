# Additional public project gallery captures, 23 October 2026

Completed: 21 actual public website screenshots, three per project. Each project has two distinct lower desktop views at 1440 × 1000 and one mobile root view at 390 × 844. These are additional gallery assets; the existing project cover images are untouched.

The machine-readable [gallery manifest](project-gallery-2026-10-23.json) lists every title, caption, source URL, asset path, exact Evidence ID, scenario step, original PNG digest, viewport, and declared action. Shipping images and source sidecars are in `public/images/projects/gallery/`; the same manifest is available there as `provenance.json`.

| Project | Public source | Desktop detail 1 | Desktop detail 2 | Mobile |
| --- | --- | --- | --- | --- |
| Ngaji Yuk! | https://ngajiyuk.sdilbanisalehsetu.com/ | Feature overview | Teacher/system/parent flow | Landing hero |
| IPNU IPPNU Kota Bekasi | https://ipnubekasi.my.id/ | News cards and categories | News archive and video section | Landing news portal |
| Batu Alam Supplier | https://www.batualamsupplier.com/ | Product advantages | Stone product catalog | Opening testimonial |
| Fazmastone | https://www.fazmastone.com/ | Public testimonials | Product categories | Storefront opening |
| Cimuning Digital Hub | https://cimuning.com/ | Local product and service catalog | Selected business directory | Directory opening |
| Mahameru Baja Indonesia | https://mahamerubaja.vercel.app/ | Promotion gallery | Offers and company profile | Industrial service hero |
| SIT Permata Hati Bekasi | https://sitpermatahati.up.railway.app/ | Education program cards | School profile and building | School hero |

All captures were made through REA `capture_browser_scenario`, using Chrome, temporary empty profiles, reduced motion, blocked service workers, and ordinary public navigation. No Playwright fallback was needed this pass, including Ngaji Yuk. Mobile capture and both desktop selections use the public root URL. Desktop movement uses declared PageDown key presses with settling waits; Cimuning and Mahameru use only the site's visible `Lewati` and `Tutup poster` dismissal buttons. Cimuning's privacy notice remains visible. No DOM nodes, styles, navigation, or content were changed.

The [complete retained REA bundle](project-gallery-2026-10-23-rea.json) contains 16 successful scenarios. Large inline replies for some scenarios exceeded the MCP transport budget; their complete records were retained and exported rather than repeated or reconstructed. The two extra scenarios supplied a later product-category view for Fazmastone and an education-program view for SIT Permata Hati. Exact selected frames are retained as PNGs in [the evidence directory](project-gallery-2026-10-23/). Reproduction scripts are [build-project-gallery.cjs](build-project-gallery.cjs) and [finalize-project-gallery.cjs](finalize-project-gallery.cjs).

Validation: all 21 PNG digests match the captured REA artifact digests. All 21 WebP files decode at their declared native viewport sizes and have distinct source PNG digests. All seven project contact sheets were visually inspected. The Impeccable `embed-prompt --scan public/images/projects/gallery` result is `21 rasters, 0 missing`; this Impeccable version records WebP origin metadata in `.webp.json` sidecars. Separate `.webp.source.json` files preserve detailed provenance. The shipped WebP pixels total about 2.25 MB.

These are observed public page designs, not authenticated dashboards. No login, private student record, form submission, hidden endpoint, or security bypass was used. The school site includes public news thumbnails near the top edge of one profile view; no private child data was accessed or extracted. Existing public testimonial content appears only as part of the captured site design and is not an endorsement of Wasla.

Limits: fixed waits do not prove every remote resource finished loading. The original public content, visible product fallback tiles, sticky headers, and notices remain as served. Technologies, ownership, third-party image rights, site outcomes, and claims shown within source pages were not independently verified. No CMS upload, gallery code integration, or database change is included in this asset capture task.
