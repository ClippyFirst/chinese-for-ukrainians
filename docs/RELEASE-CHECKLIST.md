# Static release checklist

Before publishing a build:

1. `npm ci` succeeds from a clean checkout using the committed lockfile.
2. `npm run validate:data` passes against the current `zh-in-ua.csv`.
3. `npm run build` regenerates mappings from the CSV; `git diff --exit-code -- src/generated/transcription-map.js` confirms generated output is committed and reproducible.
4. `npm test` passes.
5. `npm run build` produces `dist/` without a backend.
6. `npm run check:release` reports no network/evaluation/unsafe-HTML primitives in the application source.
7. `npm run benchmark` records conversion timings for 1, 10, 100 and 1000 characters.
8. `npm run test:browser` passes on Chromium and the mobile viewport (the CI config runs Chromium and iPhone 13 emulation).
9. Production output contains no analytics, telemetry, runtime API endpoint, or user-text upload path.
10. The final UI is manually checked against `docs/superpowers/specs/2026-09-27-chinese-converter-design.md`, including mobile layout and keyboard/focus behavior.

The current GitHub Actions workflow runs the unit/integration suite, acoustic-pipeline input guards, build/data validation and generation, generated-file drift check, benchmark, release constraints, and Chromium/WebKit browser tests. A green workflow does not replace manual inspection of the deployed production site.

The release check intentionally treats `fetch`, XHR, WebSocket, `sendBeacon`, `innerHTML`, `eval`, and `new Function` as forbidden in application source. This is a narrow defense-in-depth rule for the static MVP, not a claim that these APIs are universally unsafe.

**Reproducibility gate — DONE_VERIFIED (2026-10-21):** the npm-generated lockfile (lockfile v3, 46 package entries) is committed. Both Quality and Pages use `npm ci`. Exact final PR-head Quality checks passed at [run 39598891161](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39598891161), and post-merge Quality [39599148938](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39599148938) plus Pages deployment [39599148935](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39599148935) passed on main SHA `6e4de5f290d14d3c19ca4c7849291f965964bfb9`. The subsequent documentation-only main snapshot `fe382a320ced01c361f8fee7b383bf2e1462fc8d` also passed Quality [39599788240](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39599788240) and Pages [39599787730](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39599787730). Manual visual QA, source-data rights clearance and citation metadata remain separate release gates.
