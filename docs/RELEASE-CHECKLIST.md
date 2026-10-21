# Static release checklist

Before publishing a build:

1. `npm ci` succeeds from a clean checkout using the committed lockfile.
2. `npm run validate:data` passes against the current `zh-in-ua.csv`.
2. `npm run build` regenerates mappings from the CSV; `git diff --exit-code -- src/generated/transcription-map.js` confirms generated output is committed and reproducible.
3. `npm test` passes.
4. `npm run build` produces `dist/` without a backend.
5. `npm run check:release` reports no network/evaluation/unsafe-HTML primitives in the application source.
6. `npm run benchmark` records conversion timings for 1, 10, 100 and 1000 characters.
7. `npm run test:browser` passes on Chromium and the mobile viewport (the CI config runs Chromium and iPhone 13 emulation).
8. Production output contains no analytics, telemetry, runtime API endpoint, or user-text upload path.
9. The final UI is manually checked against `docs/superpowers/specs/2026-09-27-chinese-converter-design.md`, including mobile layout and keyboard/focus behavior.

The current GitHub Actions workflow runs the unit/integration suite, acoustic-pipeline input guards, build/data validation and generation, generated-file drift check, benchmark, release constraints, and Chromium/WebKit browser tests. A green workflow does not replace manual inspection of the deployed production site.

The release check intentionally treats `fetch`, XHR, WebSocket, `sendBeacon`, `innerHTML`, `eval`, and `new Function` as forbidden in application source. This is a narrow defense-in-depth rule for the static MVP, not a claim that these APIs are universally unsafe.

**Reproducibility gate:** the lockfile now contains the dependency graph resolved by the pinned Node/npm CI environment. Both Quality checks and Pages use `npm ci`; treat this gate as closed only after the repair PR's exact final head passes the full Quality workflow and the resulting main commit is successfully deployed.
