# Chat handoff — Chinese-to-Ukrainian transcription
**Updated:** 2026-10-20 (after current-HEAD CI verification)  
**Repository:** https://github.com/ClippyFirst/chinese-for-ukrainians  
**Plan:** [MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md](./MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md)

## Snapshot
- Latest application/code SHA with verified quality CI: `0c173deeace88428fd2919fe47ce8e438adca3b6` (2026-10-20). Later commits in this audit update documentation only; their new CI runs were triggered and should be checked before the next handoff.
- Working branch in the remote snapshot: `main`. The branch listing includes a research branch `research/full-ipa-scientific-verification-2026-10-18` and several audit/fix branches; do not assume any are merged without comparing SHAs.
- Package: `chinese-for-ukrainians@0.1.0`; Node requirement >=22.12.0.
- GitHub Actions **Quality checks** passed on the exact latest SHA: [run 39482425883](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39482425883). Its `verify` job passed unit/integration tests, acoustic-pipeline input guards, build (including data validation and generation), release checks and browser regression tests.
- GitHub Pages deployment passed on the exact latest SHA: [run 39482425963](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39482425963).
- Local `git clone` could not resolve `github.com`; no independent local transcript exists. Optional `npm run benchmark` remains unexecuted and is not a CI step.
- The combined-status endpoint was empty, but the direct Actions run results above are explicit successful evidence.
- `CITATION.cff` was not found at root. `LICENSE` exists (MIT; copyright line “The Clippy First”).
- Expected `docs/audits/current/` paths for earlier plan/readiness/IPA closeout did not exist. Actual relevant documents are in `docs/`. This plan and handoff now provide a canonical continuation point.

## Read during this pass
- `README.md`, `package.json`, `LICENSE`, `index.html`
- `docs/PUBLICATION-READINESS-2026-10-18.md`
- `docs/IPA-LITERATURE-BASED-ADJUDICATION-CLOSEOUT-2026-10-19.md`
- `docs/IPA-SCIENTIFIC-VERIFICATION-CLOSEOUT-2026-10-19.md`
- `docs/IPA-CONVENTION-DECISION-2026-10-18.md`
- `docs/RELEASE-CHECKLIST.md`, `docs/QA-PLAN.md`, `docs/ARCHITECTURE.md`
- `docs/PHONETIC-REPRODUCIBILITY.md`, `docs/USER-GUIDE.md`
- `docs/IPA-FINAL-CLASS-ADJUDICATION-2026-10-18.md`
- `docs/PHONETIC-SOURCE-LEDGER-2026-10-18.csv)
- `scripts/release-check.mjs`, `scripts/test.mjs`, `scripts/benchmark.mjs`, `scripts/validate-data.mjs`, `scripts/generate-mappings.mjs`, `.github/workflows/quality.yml`

## Confirmed package commands
`validate:data`, `generate:data`, `test`, `test:browser`, `benchmark`, `check:release`, `audit:ipa:uw`, `audit:ipa:uw:check`, `build`.

## Decisions to preserve
- Public beta/research-preview is appropriate on the stated evidence; do not call it stable or academically certified until release gates pass.
- Literature-based broad IPA convention is the chosen release criterion. No universal narrow-phonetic claim.
- Keep neutral tone unassigned a universal contour; tone sandhi and connected-speech changes are outside the current renderer.
- Never cross-fill blank Ukrainian mapping cells from another system.
- Do not invent citation authors/ORCIDs, license coverage, release tags, or DOI.

## Exact next steps
1. Complete live Pages smoke test and visual/mobile review (320/360/390/430px); deployment success is not visual QA.
2. Confirm credited author(s), title, version, repository URL, license scope and ORCID only if supplied/verified before creating `CITATION.cff`.
3. Complete source/data license provenance and CSV blank-cell/edge-key audits. Preserve the independence of all three Ukrainian systems.
4. Keep release status at public beta/research preview; no stable-release, universal narrow-IPA, archive or DOI claims without direct evidence.
