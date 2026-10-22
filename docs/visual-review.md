# Evidence reviewed

Historical review of the initial design. See [visual-review-redesign.md](visual-review-redesign.md) for the current redesign; this earlier verdict does not approve later changes.

Fresh finish review, 22 October 2026. Read PRODUCT.md, DESIGN.md, docs/reference-analysis.md, docs/design-system.md, docs/ui-ux-specification.md and the Impeccable craft floor. Code-led review; no design comp exists.

Viewed the supplied desktop and 390px homepage viewports and full pages; services viewports; desktop/mobile service, portfolio, project, insights, article, about and contact pages; 390px/768px open menus; Payload admin screenshot. Inspected full-resolution homepage regions through Sharp crops, rather than judging full-page thumbnails alone. Confirmed the refreshed portfolio capture now shows exactly three intended concepts, matching portfolio-recapture.json. Inspected shared component, homepage and CSS source read-only. No browser or test run was performed by this reviewer.

Follow-up verification was limited to the two requested fixes: refreshed About team regions at 1440px/390px and the homepage statement at 390px, cropped from the final captures after CMS fixture cleanup. Both fixes pass. No new broad audit was performed.

Root-provided verification: 36 route/viewport combinations at 1440/1024/768/390 without overflow or page errors; contrast measurements 17.43 navy/white, 6.23 slate/white, 14.33 light/navy and 5.78 white/action; navigation, filters, FAQ, service preselection, reduced motion, no-JS, contact persistence/rate limits and forbidden API tests; CMS authorization, draft protection, preview/publishing and media validation tests. These are supplied test evidence, not independently rerun claims.

# Craft floor

The viewed renders have clear hierarchy, readable mobile body copy, restrained borders, generous section separation, controlled heading wraps and coherent SVG geometry. Source confirms self-hosted type usage, visible focus treatment, selection/caret/scrollbar colors and bounded reduced-motion behavior. Public copy and concept disclosures are honest; empty team content avoids invented staff. CMS uses an appropriate editing interface. Motion, error/loading interactions and keyboard behavior cannot be assessed from static screenshots; rely on the supplied functional evidence for those states. The Next development indicator is excluded from design findings.

The narrow-screen paragraph placement identified in the first pass is now corrected. Service categories and article metadata are useful taxonomy/data, not generic section labels.

# Direction/quality bar

The navy opening, large Indonesian proposition, immediate consultation/work actions and original dimensional connection graphic establish a recognizable technology studio. The concept interface adds useful evidence while retaining a visible non-client disclosure. The white editorial statement, divided service rows, asymmetric homepage work plates, navy principles section, process sequence and reading previews produce deliberate variation. Mobile retains the identity without compressing desktop columns. The requested 3D-inspired geometric/SVG direction is honored. No wholesale redesign is warranted.

# Material findings

1. Resolved — About self-link: `src/components/ui.tsx`, `TeamSection` (line 38), now exposes `showAboutLink`, default true; `src/app/(frontend)/tentang-kami/page.tsx` passes false. Inspected refreshed 1440px and 390px team-region crops: the redundant link is absent and the section spacing remains coherent.
2. Resolved — mobile statement eyebrow: `src/app/(frontend)/globals.css` now hides `.brand-statement > p` at <=600px. Inspected the refreshed 390px homepage statement crop: the H2 leads directly, followed by readable supporting copy and its action. The desktop side-note is preserved.
3. Resolved capture issue: the initial portfolio-390 image included a transient published QA fixture and a blank image. Cleanup and refreshed evidence now show only Ruang, Alur and Sela. No remaining portfolio defect found.

Missing original logo, actual team/client content, company contact details and deployment credentials remain documented owner inputs, not visual implementation defects. This review does not certify deployment or production operations.

# Disposition

ship
