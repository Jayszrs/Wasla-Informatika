# Wasla UI/UX specification and development handoff

## Visitor journeys
Business need → relevant service → scope/deliverables → consultation. Work discovery → category filter → case study → related service → consultation. Insight → readable article → contextual consultation. Staff → authenticated /admin → edit draft → preview → publish.

## Route specifications
| Route | Composition | Content and action |
| --- | --- | --- |
| / | navy editorial hero; statement; services; asymmetric work; reasons/expertise; process; team; insights; FAQ; CTA | hero/settings, published services/projects/posts/FAQ, approved testimonials only |
| /tentang-kami | editorial intro, principles, process, team, CTA | actual team only; meaningful empty state |
| /layanan | large introduction, category links and service rows | all ten requested services |
| /layanan/[slug] | title/intro, original service diagram, rich text, deliverables, process, CTA | published CMS service, unknown/draft gives 404 |
| /portofolio | title, concept disclosure, category filters, large image plates | filters update displayed results; all/empty feedback |
| /portofolio/[slug] | large project visual, summary, challenge, solution, optional results, technology, gallery, related CTA | real proof only; concept label persists throughout |
| /insights | editorial intro, category filter and reading previews | published date/category/excerpt |
| /insights/[slug] | title, category/date, readable rich text, related CTA | metadata from CMS; no invented authors |
| /kontak | editorial invitation and accessible form, optional factual channels | service preselection via query; server validation and private persistence |
| /privasi | clear contact-data use and owner-contact guidance | limits purpose, no false legal guarantee |
| /admin | Payload interface | administrators manage users; editors manage content/messages |

## Responsive layouts
1440: 1328px container, 56px gutter, 6/6 hero or editorial split, project plates 7/5 columns. 1024: 32px gutters, fluid headings, two-column project rhythm. 768: mobile navigation, stacked hero, two-column compact lists where readable. 390: 20px gutters, 42–48px H1, 34px H2, single-column images/forms. No fixed screen-height text trap. Touch targets ≥44px and principal buttons ≥48px. Sticky header offset applies to anchors.

## Homepage narrative and first viewport
Wordmark and consultation action are visible at the top. Hero uses the requested Indonesian proposition, large Manrope typography with controlled line breaks, supporting copy, two actions, and original connection geometry with a labelled digital-product concept. The artwork is contained away from body text for contrast. A thin bottom rail names Website / Aplikasi / Solusi IT to orient visitors. White statement section opens the content. Selected work uses scale differences instead of repetitive cards. Final navy CTA closes the narrative.

## Motion and accessibility acceptance
Visible SSR content, no mandatory splash, no scroll interception. First-session entrance is optional and skip-enabled. Static narrow/reduced-motion graphic. Native menu controls, Escape close, no hidden page focus in open navigation; links remain usable without JavaScript through native details. Native accordions. Forms expose errors with aria-describedby/aria-invalid and status via aria-live. Keyboard skip-to-content. Next image sizing prevents layout shift. Article typography uses semantic HTML. Test no-JS and desktop/mobile reduced-motion separately.

## Content model and publishing
Users, Media, Services, Projects, Posts, Team, Testimonials, FAQs, Contact Submissions; Site and Navigation globals. All editorial collections use drafts with anonymous published-only access. Testimonials additionally require approval. Team uploads are actual people, never placeholders disguised as staff. Site settings control hero, statement, logo uploads and contact channels. Preview is authenticated via Payload Local API and accepts an allowlisted collection and numeric ID; metadata is noindex.

## Delivery review before implementation
Direction checked against Phase 1: immediate proposition corrects early blank/mark states; large editorial type adopts confidence without reproducing layouts; conventional routes preserve agency usability; native controls address observed menu semantics; reduced motion avoids sampled dynamic fallback risks. No copied code, graphics or text. This review is an internal design review, not a claim of user approval.

## Outstanding owner inputs
Original logo required to trace white/navy/favicons. Real projects, results, photos, people, testimonials, address, domain, email and WhatsApp are supplied through CMS. Empty channels are hidden. Demonstration projects are clearly concepts. Deployment requires database/storage/SMTP credentials; none are invented or committed.

## Build sequence
Compatible pinned library setup → schema and migrations → tokens and components → homepage and internal routes → live CMS queries → contact and preview → interaction/motion → security, build, browser and content lifecycle tests → deployment documentation. Keep Payload and public root layouts separate.
