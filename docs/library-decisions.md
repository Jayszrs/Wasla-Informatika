# Library integration evidence

Context7 unavailable: the enabled tool inventory contained no Context7 tools. Official sources were consulted on 22 October 2026 and installed package typings are used for verification. npm registry metadata determines exact compatible versions; package-lock.json retains the dependency graph.

- [Next installation](https://nextjs.org/docs/app/getting-started/installation), [App Router](https://nextjs.org/docs/app): App Router route groups, server components, awaited params/searchParams, Metadata API. Search reader could not parse the markdown content type on one URL; direct official HTTP retrieval succeeded.
- [Payload installation](https://payloadcms.com/docs/getting-started/installation): withPayload, separate root layouts, REST handlers and RootPage. Official blank-template route files were consulted from payloadcms/payload on GitHub.
- [Payload Postgres](https://payloadcms.com/docs/database/postgres): postgresAdapter with pooled PostgreSQL; explicit push:false.
- [Migrations](https://payloadcms.com/docs/database/migrations): generate and commit migrations; deploy via migrate before application startup; no production db push.
- [Tailwind Next integration](https://tailwindcss.com/docs/installation/framework-guides/nextjs): v4 PostCSS plugin and CSS import/theme tokens.
- [React Server Components](https://react.dev/reference/rsc/server-components): server rendering for content; small client islands for interactions.
- [Payload access](https://payloadcms.com/docs/access-control/overview), [production](https://payloadcms.com/docs/production/deployment): explicit server-side permissions, production secret, secure cookies, persistent storage.
- [Embedded Postgres](https://github.com/leinelissen/embedded-postgres): optional local-only native PostgreSQL runner for this Windows host, not the production database service. The wrapper's version is a prerelease while it carries released PostgreSQL binaries; Docker/managed PostgreSQL is the supported production path.
- [PostgreSQL](https://www.postgresql.org/docs/current/): atomic INSERT…ON CONFLICT for cross-worker contact limits. Pool max 10; indexed slugs/publication/order; rate keys hashed.

Selected stable application versions checked via npm: Next 16.4.2; Payload and all Payload packages 3.91.0; React/React DOM 19.3.1; Tailwind 4.3.3. @payloadcms/next peer accepts Next >=16.3.3 <17 and exact Payload 3.91.0. Animation uses bounded native CSS/rAF; Motion/GSAP integration is unnecessary, so no undocumented animation API is introduced.

Final runtime: Node 24 LTS, verified executable 24.21.0. System Node 22.12 was sufficient for the first app build but is too old for a transitive visitor-key dependency in the current lint toolchain. The project therefore pins Node24 in .node-version/.nvmrc and Docker, without modifying the machine's global installation. ESLint10.13.0 with eslint-config-next16.4.2 follows the installed Next official ESLint guide, which explicitly supports ESLint10. Some bundled plugins emit conservative peer-range warnings during installation; the actual lint command is verified. Sharp0.35.5 and DOMPurify3.4.17 replace versions flagged by the dependency audit. Open upstream advisories remain documented separately.
