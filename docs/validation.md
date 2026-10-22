# Validation and handoff

Final verification: 22 October 2026, Asia/Jakarta. Windows host; Node24.21.0; local Chrome155; native PostgreSQL18.4. The application was tested as a real Next.js production standalone server with the same PostgreSQL database used for development.

## Results

| Check | Result | Evidence |
| --- | --- | --- |
| Payload schema and migration | PASS | generated initial migration applied to PostgreSQL; push disabled |
| Generated types/import map | PASS | generated from actual Payload configuration |
| TypeScript | PASS | standalone typecheck and production build's TypeScript check |
| ESLint10 / Next config | PASS | final `npm run lint`, no findings |
| Unit tests | PASS | 3 tests: contact schema/consent/honeypot/bounds, trimming, safe links/WhatsApp |
| Production build | PASS | Next16.4.2 webpack build on Node24; all public/admin/API routes generated |
| Standalone startup | PASS | `scripts/start.mjs`; public/static assets copied; local media path preserved |
| Browser integration suite | PASS | all 4 Playwright tests passed against the production standalone server, 43.2 seconds |
| Responsive visual matrix | PASS at inspected scope | 9 routes × 1440/1024/768/390 = 36 combinations, no horizontal overflow or page errors |
| SEO resources | PASS | homepage, sitemap.xml, robots.txt and opengraph-image return 200 with correct content types |
| Visual review | ship | initial full review plus verdict pass resolved both listed small fixes; docs/visual-review.md |
| Mechanical visual detector | PASS | ran once on frontend CSS/components, returned [] |
| Design documentation | PASS | canonical DESIGN.md + schemaVersion2 sidecar, token references and source-color consistency checked |

The build logs a metadataBase fallback warning for generated metadata outside the public layout. Actual public canonical URLs and Open Graph endpoint were checked on the configured local origin. Build with the real domain and check staging metadata before release. This is not a measured search-ranking or Core Web Vitals claim.

## Functional click-through and state evidence

| Element or flow | Verified behavior |
| --- | --- |
| Desktop navigation | Layanan, Karya, Tentang and Insights links navigate to their actual pages; wordmark returns home |
| All public route types | home, about, services/list/detail, portfolio/list/detail, insights/list/detail, contact and privacy return readable pages and canonical metadata |
| Mobile menu | opens at768/390, closes with Escape, Enter toggles it, Layanan selection navigates and closes |
| Portfolio filter | E-Commerce reduces result count to1; Semua restores3; status text updates |
| Insights filter | Teknologi reduces to1 article; Semua restores3 |
| FAQ | pointer click opens; keyboard Enter closes the same disclosure |
| Service consultation action | navigates to contact with the correct service preselected |
| Missing service | branded not-found content rather than exposed unpublished data |
| Contact empty submission | inline name/consent and other field errors appear |
| Contact pending/error | submit disabled while pending; simulated503 shows error and preserves entered values |
| Contact valid submission | actual PostgreSQL record created before success; authenticated admin confirms it; fixture then deleted |
| Spam/origin protection | malformed input rejected400, foreign Origin403, rate limit429 with Retry-After900 |
| Private contact API | anonymous read and direct collection creation return403 |
| Public user registration | anonymous users creation and first-register return403 |
| CMS login | actual admin login form opens the dashboard and collection list |
| Editor permissions | can create/edit content and upload; attempted admin-role escalation leaves role editor; user creation and project deletion blocked403 |
| Media | valid PNG+alt accepted201 and file served200; forged PNG containing XML/script rejected400 |
| Draft/publish | draft absent from anonymous API including draft=true; authenticated preview works with noindex; published content becomes public; subsequent private draft is not exposed |
| Anonymous preview | not-found content, never internal draft; Next may stream a200 response after headers are sent, so tests also inspect body instead of relying only on status |
| No JavaScript | homepage text and native mobile disclosure remain usable; contact explains JS requirement and has POST method to avoid sending personal data in a default GET URL |
| Reduced motion | inspected separately at each width; hero parallax transform absent; headings remain visible |

Repeated instances of the same shared CTA/card component use the same actual routes; representative interactions above were clicked, and all destination route types were independently loaded. No claim is made that every duplicated link was individually clicked.

## Visual evidence

`.impeccable/review/` contains the final production homepage desktop/mobile full pages, first viewports, all principal internal-page desktop/mobile captures, menu states, and admin capture. `browser-readings.json` records computed display font sizes/families, reduced-motion transforms and width checks. The final matrix was captured after CMS fixtures were cleaned; no QA project remains in the public portfolio. Research screenshots stay in docs/evidence and are not website assets.

Token contrast, calculated with WCAG relative luminance:

| Pair | Ratio |
| --- | --- |
| Navy on white | 17.43:1 |
| Slate on white | 6.23:1 |
| Light blue on navy | 14.33:1 |
| White on action blue | 5.78:1 |

These are token measurements, not an exhaustive pixel-by-pixel contrast audit. No assistive-technology lab, physical mobile-device run, Lighthouse score or measured Core Web Vitals is claimed.

## Remaining owner inputs and external verification

- Original Wasla symbol is missing. Text wordmark is the explicitly approved interim identity. White/navy SVG tracing and final logo favicon await that original asset.
- Actual client work, team details/photos, approved testimonials, address, email, business WhatsApp and final domain must be provided. Seed project concepts remain labelled; no fake evidence was added.
- No live deployment, real S3 operation, SMTP delivery or Docker image build was claimed. Their configuration and release procedure are provided in docs/deployment.md.
- Dependency advisories remain upstream: production tree6 high/5 moderate; complete tree9 high/5 moderate, including parent dependency entries. See docs/dependency-audit.md. The project is not declared vulnerability-free or unconditionally ready for a public launch.
- Context7 and Figma MCP were unavailable. Official documentation and local design specifications were used and documented; no editable Figma file is claimed.

The production server and PostgreSQL were left running locally for review. Local admin credentials are in ignored `.local/admin-credentials.txt`. Use owner-controlled credentials and secrets for deployment.
