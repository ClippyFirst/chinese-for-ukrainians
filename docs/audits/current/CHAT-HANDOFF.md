# Chat handoff — Chinese-to-Ukrainian transcription
**Updated:** 2026-10-21 (release-gate reconciliation and PR review follow-up)  
**Repository:** https://github.com/ClippyFirst/chinese-for-ukrainians  
**Plan:** [MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md](./MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md)

## Current snapshot (verified 2026-10-21)

- Current default branch `main` is `da995aa58936f5f9f72796fa32a0feaeb38b3847` (`docs: confirm CI after generated map repair`).
- Exact-head Quality checks [39495006696](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39495006696) passed the CI unit/integration suite, acoustic input guards, data validation/generation, generated mapping drift, production build, conversion benchmark, release constraints and Playwright browser regression tests.
- Exact-head GitHub Pages deployment [39495006330](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39495006330) passed on the same SHA. This proves build/deploy alignment, not manual production visual QA.
- Local `git clone` failed with `Could not resolve host: github.com`; no local `npm ci`, tests, build or browser run is claimed. The root `package-lock.json` remains incomplete (`packages: {}`), so clean-install reproducibility is still blocked.
- The stylesheet on current main already has `[hidden] { display: none !important; }`; current browser tests cover empty/results/issue visibility and clear-state behavior. No duplicate CSS fix is needed.
- PR #5 remains open, unmerged and reported `mergeable=false`. Its diff omits `#result-ipa` and the main-page methodology navigation that current tests require. Do not merge as-is.
- PR #25 is this documentation-only continuation, currently headed at `88c50833dfbe37f84fe28f511e6fb5d750470553`. No workflow runs are reported for that head yet; PR checks are not claimed as passing.
- Root MIT applies only to material the copyright holder can license; third-party source/data rights are not cleared. No `CITATION.cff` has been added because authorship metadata remains unconfirmed.
- Keep public beta/research-preview status. No stable release, DOI, release tag or universal narrow-phonetic claim is supported by current evidence.

## Read during this pass
- `README.md`, `package.json`, `LICENSE`, `index.html`
- `docs/PUBLICATION-READINESS-2026-10-18.md`
- `docs/IPA-LITERATURE-BASED-ADJUDICATION-CLOSEOUT-2026-10-19.md`
- `docs/IPA-SCIENTIFIC-VERIFICATION-CLOSEOUT-2026-10-19.md`
- `docs/IPA-CONVENTION-DECISION-2026-10-18.md`
- `docs/RELEASE-CHECKLIST.md`, `docs/QA-PLAN.md`, `docs/ARCHITECTURE.md`
- `docs/PHONETIC-REPRODUCIBILITY.md`, `docs/USER-GUIDE.md`
- `docs/IPA-FINAL-CLASS-ADJUDICATION-2026-10-18.md`
- `docs/PHONETIC-SOURCE-LEDGER-2026-10-18.csv`
- `scripts/release-check.mjs`, `scripts/test.mjs`, `scripts/benchmark.mjs`, `scripts/validate-data.mjs`, `scripts/generate-mappings.mjs`, `.github/workflows/quality.yml`

## Confirmed package commands
`validate:data`, `generate:data`, `test`, `test:browser`, `benchmark`, `check:release`, `audit:ipa:uw`, `audit:ipa:uw:check`, `build`.

## Decisions to preserve
- Public beta/research-preview is appropriate on the stated evidence; do not call it stable or academically certified until release gates pass.
- Literature-based broad IPA convention is the chosen release criterion. No universal narrow-phonetic claim.
- Keep neutral tone unassigned a universal contour; tone sandhi and connected-speech changes are outside the current renderer.
- Never cross-fill blank Ukrainian mapping cells from another system.
- Do not invent citation authors/ORCIDs, license coverage, release tags, or DOI.

## Next actions (ordered by dependency)

1. Restore clean-install reproducibility: regenerate `package-lock.json` with Node >=22.12 and npm registry access, then verify `npm ci`, data validation, unit/integration tests, production build, generated-file drift, benchmark, release checks and browser tests from a clean checkout. Never fabricate lockfile entries.
2. Reconcile PR #5 only if its author or maintainer chooses to continue it: rebase on current `main`, restore `#result-ipa` and methodology navigation, and run the full browser suite; otherwise leave it untouched.
3. Perform manual production smoke/visual review on the homepage and methodology page at 320/360/390/430px; test keyboard/focus and core actions. CI deployment is not a substitute.
4. Complete source-by-source rights review and verify citation author/title/version metadata before any `CITATION.cff` or stable release.
5. Preserve the independent Ukrainian mapping columns and existing blank cells unless source-specific evidence supports a change.
