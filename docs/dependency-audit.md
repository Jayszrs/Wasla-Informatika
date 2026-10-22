# Dependency audit — 22 October 2026

The registry audit was run after updating to the final lockfile. This is a dependency advisory inventory, not an exploitation assessment or full security certification.

| Scope | Critical | High | Moderate | Low | Total affected dependency entries |
| --- | --- | --- | --- | --- | --- |
| Production dependency tree (`npm audit --omit=dev`) | 0 | 6 | 5 | 0 | 11 |
| Full tree including lint/build tooling (`npm audit`) | 0 | 9 | 5 | 0 | 14 |

Counts include parent packages flagged because they depend on an affected package; they do not represent fourteen independent vulnerabilities.

## Resolved during implementation

Sharp was upgraded to 0.35.5 to resolve reported inherited image-library advisories. DOMPurify was pinned to 3.4.17 to resolve the reported low-severity issues. Sass was moved to the current compatible 1.x range. No forced downgrade of Payload or Next was applied.

## Open upstream chains

- [Braces stack-exhaustion advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), affected braces <=3.0.3. The registry reports no fixed compatible release. In the production tree it propagates through micromatch → findup-sync → find-node-modules → Payload cloud-storage/S3 packages. Development tooling also includes fast-glob and Next's ESLint plugin. No public glob-pattern feature is implemented by this app; exploitability of every upstream call site was not established. This is not a claim that the advisory is harmless.
- [esbuild development-server advisory](https://github.com/advisories/GHSA-67mh-4wv8-2f99) propagates through the deprecated esbuild-kit loader used by Drizzle migration tooling and Payload's Postgres adapter. The vulnerable esbuild server is not started by this application's scripts. The registry offers no compatible automatic fix for the chain. Avoid exposing development/migration tooling; monitor Payload/Drizzle updates.

The current Next documentation explicitly supports ESLint10 with eslint-config-next16.4.2. Some bundled plugins retain older peer-range declarations, so npm emits override warnings; lint executes successfully on Node24.21.0. The source does not rely on the removed ESLint APIs.

Review upstream patches and the actual deployment threat model before a public release. The project is **not claimed to be advisory-free**. Raw machine audit JSON is retained locally under `.local/audit-production.json` and `.local/audit-all.json`; the lockfile is the reproducible dependency record.
