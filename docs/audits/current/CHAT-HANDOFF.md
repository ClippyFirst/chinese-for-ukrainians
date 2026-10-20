# Chat handoff — Chinese-to-Ukrainian transcription
**Updated:** 2026-10-20  
**Repository:** https://github.com/ClippyFirst/chinese-for-ukrainians  
**Plan:** [MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md](./MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md)

## Snapshot
- Latest commit observed by GitHub commit search: `069c6e639454b238c9973d8ab152e9b067e6b46f`, dated 2026-10-19. It clarifies the literature-based IPA release criterion.
- Working branch in the remote snapshot: `main`. The branch listing includes a research branch `research/full-ipa-scientific-verification-2026-10-18` and several audit/fix branches; do not assume any are merged without comparing SHAs.
- Package: `chinese-for-ukrainians@0.1.0`; Node requirement >=22.12.0.
- No local runtime was used in the audit snapshot. Do not report tests/build/browser/benchmark as passing.
- Combined status for the observed latest commit returned no status entries, not a green status.
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

## Exact next step
Run the commands in the plan from a clean local checkout with Node >=22.12.0, record all exit codes and output, and update task IDs/statuses only when supported by evidence. Then test the actual deployed site and confirm author/citation metadata before drafting `CITATION.cff`.
