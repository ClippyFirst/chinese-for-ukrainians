# Chat handoff — Chinese-to-Ukrainian transcription
**Updated:** 2026-10-21 (release-gate reconciliation and PR review follow-up)  
**Repository:** https://github.com/ClippyFirst/chinese-for-ukrainians  
**Plan:** [MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md](./MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md)

## Current snapshot (verified 2026-10-21)

- Current `main` is `630a04412d7cf8730285a7ea2ea06e24b435a0c5` (`docs: reconcile release gates and handoff`). Quality checks [39598097237](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39598097237) and GitHub Pages deployment [39598097190](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39598097190) both completed successfully on this exact SHA. This re-published the current site; it did not change converter behavior.
- The reproducibility repair is proposed in [PR #27](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/27). It commits a CI-generated npm lock graph (lockfile v3, 46 package entries) and switches both Quality and Pages installs to `npm ci`. Do not call this gate closed until the exact final PR head passes the complete Quality workflow and the merged main SHA deploys successfully.
- Local clone/install remain unavailable in this runtime because DNS cannot resolve GitHub/npm. CI is the execution environment for clean-install verification; local tests/build are not claimed.
- Current main already has `[hidden] { display: none !important; }`; browser regression tests cover empty/results/issue-state visibility and clearing. Do not duplicate the fix.
- PR #5 remains open and unmerged. Its UI diff omits `#result-ipa` and the main-page methodology navigation required by current browser tests. Do not merge it as-is.
- CSV structure was independently checked: 421 data rows, 421 unique Pinyin keys, no duplicate/empty keys or malformed-width rows. Blank cells remain 1 in `Кірносова`, 1 in `Кірносова—Цісар`, and 10 in `НАНУ`. This is not a full phonetic correctness or rights audit.
- Root MIT does not clear third-party data rights. Source-by-source rights clearance and verified citation metadata remain open.
- Keep public beta/research-preview status; no stable release, DOI, release tag, or universal narrow-phonetic claim is justified.

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

1. Complete [PR #27](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/27): require `npm ci` plus all unit/data/build/generated-drift/benchmark/release/browser checks to pass on the final head; merge only after that evidence is green.
2. Verify the resulting `main` Quality and Pages runs pass on the same commit and the deployed homepage/methodology route remains reachable.
3. Perform manual visual and interaction QA in a real browser at 320/360/390/430px, including keyboard/focus and core converter actions. CI does not replace production visual inspection.
4. Complete source-by-source third-party data rights review and verify citation author/title/version metadata before stable release or `CITATION.cff`.
5. Preserve independent Ukrainian mapping columns and existing blank cells unless source-specific evidence supports changes.
