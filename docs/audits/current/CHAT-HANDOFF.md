# Chat handoff — Chinese-to-Ukrainian transcription
**Updated:** 2026-10-21 (release-gate reconciliation and PR review follow-up)  
**Repository:** https://github.com/ClippyFirst/chinese-for-ukrainians  
**Plan:** [MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md](./MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md)

## Current snapshot (verified 2026-10-21)

- The verified application/dependency release commit is `6e4de5f290d14d3c19ca4c7849291f965964bfb9`; its Quality run [39599148938](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39599148938) and Pages deployment [39599148935](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39599148935) both succeeded. The latest main before this documentation refresh was `fe382a320ced01c361f8fee7b383bf2e1462fc8d`, also with successful Quality [39599788240](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39599788240) and Pages [39599787730](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39599787730).
- The root `package-lock.json` now contains a real npm-generated lock graph (lockfile v3, 46 package entries). Quality checks and GitHub Pages both use `npm ci`. The exact final PR head passed the complete Quality workflow, including clean install, unit/integration tests, acoustic input guards, data validation/generation, generated mapping drift, production build, benchmark, release constraints and browser regression tests. The merged main SHA then passed Quality and Pages deployment.
- Current main already has `[hidden] { display: none !important; }`; browser regression tests cover empty/results/issue-state visibility and clearing. No duplicate fix was added.
- PR #27 is merged; PR #26 was closed as superseded. PR #5 remains open and unmerged: its diff omits `#result-ipa` and the methodology navigation required by current browser tests, so do not merge it as-is.
- CSV structure was independently checked: 421 data rows, 421 unique Pinyin keys, no duplicate/empty keys or malformed-width rows. Blank cells remain 1 in `Кірносова`, 1 in `Кірносова—Цісар`, and 10 in `НАНУ`. This is not a full phonetic correctness or rights audit.
- Root MIT does not clear third-party data rights. Source-by-source rights clearance, verified citation metadata and manual production visual QA remain open.
- The site has been rebuilt and redeployed: [open the converter](https://clippyfirst.github.io/chinese-for-ukrainians/). Keep public beta/research-preview status; no stable release, DOI, release tag, or universal narrow-phonetic claim is justified.

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

1. Perform manual visual and interaction QA in a real browser at 320/360/390/430px, including keyboard/focus and core converter actions. CI does not replace production visual inspection.
2. Complete source-by-source third-party data rights review and verify citation author/title/version metadata before stable release or `CITATION.cff`.
3. Preserve independent Ukrainian mapping columns and existing blank cells unless source-specific evidence supports changes.
