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

TypeScript and targeted ESLint passed for the runtime and device browser test. The service keyboard/pointer test passed. The retained-canvas test initially caught a reduced-motion preference-change regression; a shared-query/fixed-angle correction was applied and requires the final rebuilt test result below.

A fresh REA controlled replay was requested for first device → End → Home → retained device. The MCP call returned a tool-boundary failure instead of an Evidence record, and the REA namespace then became unavailable in this agent session. No fresh Evidence ID was produced; older REA captures are not presented as evidence for this release. The explicit Playwright journey reports above remain the current runtime observations. This report makes no deployment claim.
