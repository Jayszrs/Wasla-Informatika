# Scroll and 3D runtime investigation — 25 October 2026

The supplied `Recording 2026-10-25 141932.mp4` shows service objects rotating to an uninformative back, a gallery opening before its image arrives, and device views changing during repeated scrolling. The recording is observational evidence, not a timing trace. Extracted review frames are private local evidence in `.local/video-evidence/`.

## Controlled journey

Reports: `.impeccable/review/scene-journey-before-shared.json` and `.impeccable/review/scene-journey-after-shared.json`. Runner: `.local/measure-scene-journey.mjs`.

Chrome on this Windows machine; localhost production builds; 1440×900 viewport at device scale 1; 4× CPU slowdown; fresh browser context with HTTP cache shared within each journey. No network throttling was added. Each route visits up to seven device/service stages, then the footer and first stage, twice. The service route has thirteen entries, of which the first seven were exercised. Three gallery stages were exercised. Images were not force-loaded eagerly. This is one before/after pair, not repeated medians or a guarantee for visitors' hardware or networks.

| Route | WebGL contexts created, before → after | Context losses | Encoded poster frames | Long tasks / total long-task time |
| --- | --- | --- | --- | --- |
| Home | 18 → 1 | 14 → 0 | 50 → 0 | 53 / 11,812 ms → 9 / 1,424 ms |
| Services | 18 → 1 | 16 → 0 | 0 → 0 | 28 / 4,607 ms → 5 / 344 ms |
| Project gallery | 8 → 1 | 7 → 0 | 18 → 0 | 19 / 6,248 ms → 2 / 188 ms |

The before journey missed the sixth homepage device's six-second readiness deadline once. The after journey had no readiness misses or page exceptions. The first canvas was replaced on every before route and retained by identity on every after route. Long-task totals include navigation, initialization and the declared scroll journey; they are not a general page-load time or Core Web Vitals score.

## Implementation

- Device and service scenes share one lazy WebGL renderer. Geometry, lighting and textured screens remain actual Three.js meshes. Each scene's output is copied synchronously into its own normal DOM canvas.
- Visible scenes draw only on demand. Leaving the viewport pauses work and retains the same canvas and model. Returning no longer decodes screenshots, recompiles the renderer or switches to an encoded poster.
- Removed repeated `canvas.toDataURL()` encoding and per-scroll `forceContextLoss()`. Route unmount still disposes meshes, textures and subscriptions; the final shared renderer is released after a short idle delay when no clients remain.
- Service scenes no longer generate separate room-environment maps or render shadow maps. Directional and hemisphere lighting preserve material depth. Drag and keyboard rotation stay within front-readable angles, avoiding the blank laptop back seen in the video.
- Reduced motion uses a shared, strongly referenced media query and a fixed resting device angle. Pointer and scroll effects stop when reduction is enabled.

The approach follows the official [Three.js multiple-scenes guide, offscreen renderer copied to per-element canvases](https://threejs.org/manual/pages/multiple-scenes.html). The copy has a browser/GPU-dependent cost. Demand rendering, capped resolution and retained offscreen frames bound that cost here; the measured journey above checks this particular implementation rather than assuming the technique is universally faster.

## Verification and REA boundary

TypeScript and targeted ESLint passed for the runtime and device browser test. The service keyboard/pointer test passed. The retained-canvas test initially caught a reduced-motion preference-change regression; a shared-query/fixed-angle correction was applied. On the final rebuilt localhost:3007 server, the retained-canvas/reduced-motion/gallery test and cold-source recovery test both passed (2/2, 16.2 seconds).

A fresh REA controlled replay was requested for first device → End → Home → retained device. The MCP call returned a tool-boundary failure instead of an Evidence record, and the REA namespace then became unavailable in this agent session. No fresh Evidence ID was produced; older REA captures are not presented as evidence for this release. The explicit Playwright journey reports above remain the current runtime observations. This report makes no deployment claim.


## Cold screenshot source regression

A later staged hard-navigation check intermittently left the sixth and seventh project scenes in fallback, even though the visible screenshot images eventually loaded. A warm instrumented replay rendered all seven; this was not sufficient to dismiss the cold failure.

The actual failing boundary was reproduced by forcing a device fallback image's `currentSrc` to be empty. The runtime then selected the raw `/api/media/file/mahameru-baja-mobile-1.webp` and desktop media endpoints. Their public Blob redirects responded without `Access-Control-Allow-Origin` for the staged origin. Independent texture images use `crossOrigin="anonymous"`, so Chrome reported CORS failures followed by `EncodingError: The source image cannot be decoded.` Normal same-origin Next Image optimized URLs rendered correctly. This observation distinguishes the failure from GPU context exhaustion.

Texture acquisition now promotes only the near-viewport fallback image to eager loading, waits for its decode/selection, then independently decodes its optimized `currentSrc` (or optimized `src`). Independent bitmap decoding is retained because responsive HTML image `naturalWidth` is density-corrected and previously caused incorrect texture crops. A decode has a ten-second bound and one short retry; mounting also has one bounded retry. An abandoned offscreen lazy import does not consume a failure attempt. Error names are exposed as a non-sensitive diagnostic attribute and cleared on successful recovery.

The added browser regression forces empty selected sources and refuses raw media texture URLs. It also injects one transient independent-image decode error and requires the final textured device to render with the actual independently decoded bitmap dimensions. This checks recovery without depending on a warm CDN cache. The rebuilt regression passed on localhost:3007. A separate forced-empty-currentSrc verification then hard-navigated all seven projects, confirming actual rendered/non-empty canvases, no device error attributes, desktop bitmap 1440x1000 and mobile bitmap 390x844, no console/page errors and no HTTP failures. Evidence: `.impeccable/review/cold-device-sources-local.json`, checked 2026-10-25T14:46:06Z; runner `.local/verify-cold-device-sources.mjs`. These checks ran against a production build locally, not the subsequent staged deployment. The timing pair above predates this cold-source correction and is not presented as a new benchmark of that correction.

## Final controlled REA replay

The root session retried REA successfully after the child tool-boundary failure. Evidence `ev_23b32ad623f6a748500816080eed453a14a8b4d7194526d1f51fc83320d07aef` is retained in `.impeccable/review/clean-cards-rea-evidence.json`: local project-detail ready, End, settle, Home, visible rendered canvas; all declared actions completed and the owned browser process terminated. The capture establishes those declared runtime observations; canvas identity and WebGL counts come from the separate Playwright tests, not this URL-only REA capture.
