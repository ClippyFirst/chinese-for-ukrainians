# Static release checklist

Before publishing a build:

1. `npm run validate:data` passes against the current `zh-in-ua.csv`.
2. `npm run generate:data` produces deterministic output.
3. `npm test` passes.
4. `npm run build` produces `dist/` without a backend.
5. `npm run check:release` reports no network/evaluation/unsafe-HTML primitives in the application source.
6. `npm run benchmark` records conversion timings for 1, 10, 100 and 1000 characters.
7. `npm run test:browser` passes on Chromium and the mobile viewport.
8. Production output contains no analytics, telemetry, runtime API endpoint, or user-text upload path.
9. The final UI is checked against `docs/superpowers/specs/2026-09-27-chinese-converter-design.md`.

The release check intentionally treats `fetch`, XHR, WebSocket, `sendBeacon`, `innerHTML`, `eval`, and `new Function` as forbidden in application source. This is a narrow defense-in-depth rule for the static MVP, not a claim that these APIs are universally unsafe.
