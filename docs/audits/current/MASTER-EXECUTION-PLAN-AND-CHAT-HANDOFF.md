# Master execution plan — Chinese-to-Ukrainian transcription
**Audit snapshot:** 2026-10-20 (release-readiness and IPA traceability pass)  
**Repository:** https://github.com/ClippyFirst/chinese-for-ukrainians  
**Reference branch:** `main`  
**Audit baseline SHA:** `69cb29ffcdf53fc67f3d08609613b08d92d3e6a4`. See [release-readiness audit](../../RELEASE-READINESS-AND-IPA-TRACEABILITY-2026-10-20.md). Subsequent commits add independent Pinyin cases, release-gate checks and audit documentation; verify CI on the latest resulting SHA before marking those additions as passing.  
**Purpose:** auditable continuation plan. Statuses reflect evidence observed during this pass, not assumptions.

## Status vocabulary
Use only `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE_VERIFIED`, `DEFERRED`, `NOT_APPLICABLE`. `DONE_VERIFIED` requires a named evidence artifact or command result.

## Findings at baseline
- `package.json` exists and defines `validate:data`, `generate:data`, `test`, `test:browser`, `benchmark`, `check:release`, `audit:ipa:uw`, `audit:ipa:uw:check`, and `build`.
- README describes the release as public beta / research preview and links to IPA adjudication, publication readiness, methodology and release docs.
- `docs/IPA-LITERATURE-BASED-ADJUDICATION-CLOSEOUT-2026-10-19.md` exists; literature-based broad-IPA release criterion is explicit. It does not claim universal narrow-phonetic accuracy.
- `docs/PUBLICATION-READINESS-2026-10-18.md`, `docs/RELEASE-CHECKLIST.md`, `docs/IPA-SCIENTIFIC-VERIFICATION-CLOSEOUT-2026-10-19.md`, `docs/IPA-CONVENTION-DECISION-2026-10-18.md`, `docs/QA-PLAN.md`, `docs/ARCHITECTURE.md`, `docs/PHONETIC-REPRODUCIBILITY.md`, `docs/USER-GUIDE.md`, `docs/IPA-FINAL-CLASS-ADJUDICATION-2026-10-18.md`, and `docs/PHONETIC-SOURCE-LEDGER-2026-10-18.csv` were fetched and inspected.
- Exact requested paths `docs/audits/current/MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md`, `docs/audits/current/PUBLICATION-READINESS-2026-10-18.md`, `docs/audits/current/IPA-LITERATURE-BASED-ADJUDICATION-CLOSEOUT-2026-10-19.md`, root `RELEASE-CHECKLIST.md`, and root `CITATION.cff` returned 404. The relevant audit documents are under `docs/`; the release checklist is `docs/RELEASE-CHECKLIST.md`. `CITATION.cff` was not found at repository root.
- `LICENSE` is MIT, with copyright line “Copyright (c) 2026 The Clippy First”.
- Read-only parse of current `zh-in-ua.csv` on `main`: 421 data rows, 421 unique Pinyin keys, 0 duplicate keys; blank counts are 1 in `Кірносова`, 1 in `Кірносова—Цісар`, and 10 in `НАНУ`. The `ten` row is `; ; тень`; `yo` and the listed NANU coverage gaps remain blank in that column. This confirms CSV counts, not the correctness of each phonetic value or source-image transcription.
- The latest commit's combined status endpoint is empty, but direct GitHub Actions API inspection found a successful **Quality checks** run on the exact latest SHA: [run 39482425883](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39482425883). The `verify` job reports success for `npm test`, acoustic-pipeline input guards, `npm run build` (which runs data validation and mapping generation), `npm run check:release`, browser installation, and `npm run test:browser`.
- The exact latest SHA also has a successful GitHub Pages deployment: [run 39482425963](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39482425963), including successful build and deploy jobs.
- A local `git clone` attempt could not resolve `github.com` from this runtime, so no independent local command transcript was produced. The optional `npm run benchmark` is not a step in the quality workflow and remains unexecuted.
- Live page inspection is still unverified: the direct page fetch was inaccessible and the available Firecrawl account reported insufficient credits. Do not infer visual/mobile correctness from successful deployment alone.

## Current release-readiness findings (2026-10-20)
- Open PR #5 is stale and conflicts with main (`mergeable_state=dirty`); do not merge as part of this audit. Its markup omits `#result-ipa`, so any reconciliation must preserve the current IPA result element or update the UI code in a tested manner.
- The conversion chain is documented in `docs/RELEASE-READINESS-AND-IPA-TRACEABILITY-2026-10-20.md`: Ukrainian outputs are looked up directly from base-Pinyin keys in three independent CSV columns; they are not generated from IPA.
- The independent lexical Pinyin fixture and test were added; their results remain pending until the current-main CI run completes.
- The audited `package-lock.json` contains an empty `packages` object, so lockfile-based clean-install reproducibility is not closed. Do not switch CI to `npm ci` before repairing it.
- Root MIT is not a blanket license for source data; source-rights review remains open. Public metadata identifies `pinyin-pro@3.29.4` as MIT and `@pinyin-pro/data@1.3.1` as ISC; review included dictionary data provenance too. Do not invent citation author metadata for `CITATION.cff`.

## Prioritized task register

| ID | Priority | Task / evidence of problem | Status | Dependencies | Acceptance criteria | Verification evidence |
|---|---|---|---|---|---|---|
| C2U-001 | P0 | Recover the authoritative execution plan and handoff. Expected audit-folder path returned 404; no equivalent plan found at two common paths. | DONE_VERIFIED | — | A durable plan and handoff are committed and linked from each other. | This file and `docs/audits/current/CHAT-HANDOFF.md`; commit URL to be added after commit. |
| C2U-002 | P0 | Establish current-HEAD quality status, including the independent Pinyin corpus and generated-file drift check. | IN_PROGRESS | — | Data validation/generation, unit/integration tests, acoustic input guards, production build, generated mapping drift check, benchmark, release constraints and browser regression checks pass on the exact main SHA. | Baseline SHA `69cb29ffcdf53fc67f3d08609613b08d92d3e6a4` passed [Quality run 39484629325](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39484629325). New tests and CI steps were committed after that baseline; latest-head status must be checked before marking done. The audit baseline also exposed an incomplete `package-lock.json`, so clean-install reproducibility remains open. |
| C2U-003 | P0 | Verify current public deployment and production UI. | IN_PROGRESS | C2U-002 | Homepage and methodology load; critical controls work; no console/runtime failures; check Chromium and 320/360/390/430px viewports. | Deployment passed for baseline SHA `69cb29ffcdf53fc67f3d08609613b08d92d3e6a4`: [Pages run 39484629491](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39484629491). This proves build/deploy only; manual live visual/mobile smoke test remains unverified. |
| C2U-004 | P1 | Citation metadata absent at root: `CITATION.cff` fetch returned 404. | TODO | confirm credited author(s), ORCID if intended, title, repository URL, license and version | Valid CFF metadata with no invented author identifiers; GitHub citation parser accepts it. | `CITATION.cff`, validator output and commit. |
| C2U-005 | P1 | Confirm release metadata and licensing scope. MIT `LICENSE` exists, but code/data/documentation/source-data rights may differ. | IN_PROGRESS | C2U-004; source/license inventory | Explicitly document what MIT covers and identify third-party/source-data terms; do not imply all cited source material is relicensed. | Added and linked [`docs/LICENSE-AND-DATA-PROVENANCE.md`](../../LICENSE-AND-DATA-PROVENANCE.md); this is a scope note, not file-by-file rights clearance. Upstream package notices and source-data terms remain to be reviewed. |
| C2U-006 | P1 | Verify release reproducibility and tags. Current package version is 0.1.0; no release/tag/Zenodo evidence checked yet. | TODO | C2U-002, C2U-004, C2U-005 | A version can be rebuilt from a clean checkout; release notes describe scope and limitations; no claim of release/DOI until confirmed. | Reproducibility transcript, tag/release URL if created, artifact checksum. |
| C2U-007 | P1 | Confirm methodology/source links and public limitations remain consistent with the implementation. Audits contain settled choices and caveats; runtime test results are not yet observed. | IN_PROGRESS | C2U-002, C2U-003 | No unsupported universal narrow-IPA claim; neutral tone, tone sandhi, polyphony and Ukrainian-system independence explained accurately. | Source files, relevant tests, manual review record. |
| C2U-008 | P1 | Audit 421-row CSV and all source-specific blanks/edge keys. | IN_PROGRESS | C2U-002 | Counts match source; no silent cross-system fallback; edge keys `ten`, `yo`, standalone `o` reviewed against primary evidence or explicitly left unresolved. | Direct `zh-in-ua.csv` parse: 421 rows/unique keys, zero duplicate keys, blank counts 1/1/10 across the three system columns. `docs/REFERENCE-INVENTORY-EXCEPTIONS-2026-10-18.md` documents source-coverage context; primary-page image verification remains outstanding for some rows. |
| C2U-009 | P2 | Add a reproducible methodological paper/note. Working title: “Chinese-to-Ukrainian Transcription: A Literature-Based IPA Convention and Comparative Implementation”. | TODO | C2U-002, C2U-007, C2U-008 | Report method, sources, competing analyses, limits, test protocol and reproducible outputs; no claims of submission/publication without proof. | Versioned manuscript and build/test appendix. |
| C2U-010 | P2 | Zenodo archival preparation. | TODO | C2U-004, C2U-006 | Release metadata, license, authorship and immutable version are correct; archive only after actual release; DOI is reported only after issuance. | Zenodo record URL and archived version checksum. |
| C2U-011 | P2 | Improve audit discoverability. Older IPA audit and final literature-based closeout have different wording/status; README says later closeout supersedes stricter audit for release criterion. | DONE_VERIFIED | — | Supersession is explicit and links resolve. | README and both closeout documents fetched successfully. |

## Scientific constraints that must remain invariant
- Use the agreed literature-based **broad IPA** criterion for the beta/research-preview; do not claim universal narrow phonetic accuracy or independent acoustic validation.
- Keep lexical/citation tones separate from tone sandhi and connected speech. Neutral tone has no universal fixed contour in this tool.
- Pinyin depends on the pinned engine and its lexicon/context; rare words, names and polyphonic characters can need manual checking.
- The three Ukrainian systems remain independent. Blank cells are preserved and never borrowed from another system.
- Test fixtures demonstrate implementation consistency, not linguistic truth.
- Reopen settled IPA choices only on direct contradictory evidence or reproducible implementation defects.

## Next exact actions
1. Required current-HEAD CI gates are verified green; do not rerun them unless code changes or a failure is reported. Optional benchmark `npm run benchmark` remains unexecuted because this runtime cannot resolve `github.com` for a local clone.
2. Complete the live Pages homepage/methodology smoke test and visual/mobile review (320/360/390/430px); deployment success alone is not a visual QA result.
3. Confirm credited author(s), title, version, repository URL, license scope and ORCID only if supplied/verified; then create and validate `CITATION.cff`.
4. Complete file-level license/source-data provenance review; do not imply third-party source material is relicensed under MIT.
5. Continue CSV blank-cell/edge-key audit and release reproducibility; do not create a release or DOI without an actual tagged release/archive.


## Execution update — 2026-10-21

**Verified starting main SHA:** `da995aa58936f5f9f72796fa32a0feaeb38b3847` (commit message: `docs: confirm CI after generated map repair`).

### Current-head verification
- GitHub Actions Quality checks run [39495006696](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39495006696) completed successfully on exactly `da995aa58936f5f9f72796fa32a0feaeb38b3847`.
- The job explicitly passed dependency installation, unit/integration tests, acoustic-pipeline input guards, production build, generated mapping determinism, conversion benchmark, release constraints, browser installation, and browser regression tests. This is CI evidence; it is not an independent local reproduction transcript or live production visual QA.
- A fresh local clone attempt failed before checkout with `Could not resolve host: github.com`. No local npm commands are claimed as run in this session.
- `package-lock.json` remains invalid for clean-install reproducibility: its complete content is only `{ "name": "chinese-for-ukrainians", "lockfileVersion": 3, "requires": true, "packages": {} }`. Do not switch CI to `npm ci` and do not fabricate a dependency graph. Acceptance: regenerate it with Node/npm and registry access, then verify `npm ci`, all test/build/release commands, and generated-file drift on a clean checkout.

### Current task ledger
- C2U-002 current-head CI gates: `DONE_VERIFIED` for the workflow checks listed above on the exact SHA; clean-install reproducibility remains a separate open gate.
- C2U-003 deployment: CI deploy status must be matched to the current SHA, but live homepage/methodology interaction and 320/360/390/430px visual QA are still `TODO`; deployment success alone does not satisfy them.
- C2U-004 citation metadata: `BLOCKED` pending maintainer-confirmed authorship/title/version details. Do not add `CITATION.cff` with guessed identity or version metadata.
- C2U-005 source/data rights: `IN_PROGRESS`; existing scope note correctly warns root MIT does not license third-party datasets automatically. File/source-specific reuse rights remain evidence-limited.
- C2U-008 CSV and independent systems: existing fixture/test and build validation passed in CI. CSV structure counts previously audited (421 unique Pinyin keys, no duplicates; blank values remain in each independent column). Linguistic correctness and unresolved blank-cell source coverage are not proven by structural tests; never cross-fill.
- PR #5 remains open and is not merged. Its design direction can be reviewed separately, but it is not a release-gate fix; preserve current `#result-ipa` markup and do not merge without rebasing and running the full browser suite.

### Blockers and stop condition
The available connector can inspect and commit GitHub files, but this runtime cannot resolve GitHub for local clone/install, and no live browser is available here for deployed visual QA. Rights clearance and verified citation metadata require evidence/maintainer input, not guesswork. Keep the product at public beta / research preview; no release tag, DOI, stable-release claim, or universal narrow-IPA claim is justified by this pass.


### Deployment SHA reconciliation — 2026-10-21 follow-up
- GitHub Pages workflow run [39495006330](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39495006330) completed successfully on the same current-main SHA `da995aa58936f5f9f72796fa32a0feaeb38b3847` as Quality checks run 39495006696. This verifies build/deploy alignment, not rendered UI quality.
- Attempts to open the deployed homepage and `methodology.html` through the available web inspection surface were inaccessible; local network/DNS also blocks a fresh clone. Production smoke/visual review therefore remains `BLOCKED` in this environment, acceptance still requires an actual browser at 320/360/390/430px plus keyboard/focus/core-action checks.
- The audit continuation branch is `audit/complete-release-gates-2026-10-21`; its current head after these documentation-only updates is recorded in the final handoff. No application/data code was altered in this branch.


### Follow-up UI evidence — 2026-10-21
- **Resolved on current main, `DONE_VERIFIED` by source/test inspection (not a fresh local run):** `src/styles/main.css` already defines `[hidden] { display: none !important; }`. `tests/browser/converter.spec.js` checks empty/results/issue-state visibility and clear-state behavior. Do not create a duplicate fix; CI run 39495006696 passed the browser regression suite on the same main SHA.
- **PR #5 remains blocked from merge:** its current head `b8c65587822e7b466d05964eef5b412a115eba83` has no `#result-ipa` in the proposed index diff and removes the main-page methodology navigation. Current-main browser tests require both. GitHub reports `mergeable=false`. Acceptance for reuse: rebase onto current main, restore the IPA result and methodology link, then pass all unit/data/build/release/browser gates; do not merge the stale PR as-is.
- These findings update the task ledger; they do not constitute local test execution, deployed visual QA, lockfile repair, or source-data rights clearance.


### Final continuation checkpoint — 2026-10-21
- Dedicated branch: `audit/complete-release-gates-2026-10-21`.
- Last pre-checkpoint commit before this note was `88c50833dfbe37f84fe28f511e6fb5d750470553`. The exact live branch head is exposed by [PR #25](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/25); later handoff/checkpoint commits follow that SHA.
- Compare against current `main` SHA `da995aa58936f5f9f72796fa32a0feaeb38b3847`: documentation-only changes in the two canonical audit/handoff files; no app, generated data, dependency manifest, or lockfile edits.
- No CI workflow runs or combined commit statuses are present for the continuation head at the time of this check. The successful Quality/Pages runs cited above apply to current `main`, not this documentation branch.
- Stop condition remains evidence-limited: lockfile/clean-install, live visual QA, source-data rights and citation metadata are still open. Do not claim release-ready.


### Independent read-only CSV structure recheck — 2026-10-21
- Fetched current-main `zh-in-ua.csv` through the GitHub contents API (blob SHA `1d95758cd96b2d9ba6540902ce41d78dd647f1b3`) and parsed its semicolon-delimited quoted rows in a standalone read-only check.
- Result: 421 data rows, 5 columns, 0 malformed-width rows, 0 empty Pinyin keys, 421 unique keys, 0 duplicate keys. Blank cells remain 1 in `Кірносова`, 1 in `Кірносова—Цісар`, and 10 in `НАНУ`.
- This is a structural recheck only, not a run of the repository's validator, a review of all phonetic values, source-image verification, or permission clearance. Existing CI run 39495006696 remains the authoritative current-main evidence for the repository's automated validation/build/browser gates.




## Final continuation status — 2026-10-21 (verified after merge)

- **Starting main SHA:** `da995aa58936f5f9f72796fa32a0feaeb38b3847`.
- **Verified application/dependency release commit:** `6e4de5f290d14d3c19ca4c7849291f965964bfb9`. The subsequent documentation-only main snapshot `fe382a320ced01c361f8fee7b383bf2e1462fc8d` also passed Quality [39599788240](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39599788240) and Pages [39599787730](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39599787730).
- PR #25 merged the canonical release-gate handoff. PR #27 merged the npm-generated lock graph and switched Quality and Pages to `npm ci`; PR #26 was closed as superseded. PR #5 remains open and was not merged because its UI diff removes required IPA output and methodology navigation.
- **Exact final PR-head verification:** Quality run [39598891161](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39598891161) succeeded with `npm ci`, unit/integration tests, acoustic input guards, production build/data validation and generation, generated mapping drift, benchmark, release constraints, browser installation and browser tests.
- **Post-merge verification:** Quality run [39599148938](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39599148938) and GitHub Pages deployment [39599148935](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39599148935) both succeeded on the same main SHA `6e4de5f290d14d3c19ca4c7849291f965964bfb9`.
- Lockfile gate: `DONE_VERIFIED`. The committed lockfile is npm-generated (lockfile v3, 46 package entries); both CI and Pages use `npm ci`. No dependency versions or integrity hashes were manually fabricated.
- Remaining gates: manual production visual QA at 320/360/390/430px and keyboard/focus/core-action checks; source-by-source third-party rights clearance; verified citation metadata. These are not established by green CI.
- CSV structural recheck: 421 data rows, 421 unique Pinyin keys, no duplicate/empty keys or malformed-width rows; blank cells remain 1/1/10 across the three Ukrainian mapping columns. This does not certify every phonetic value.
- Keep the product at public beta/research preview until evidence supports stronger publication claims. No stable release, DOI, release tag or universal narrow-IPA claim was made.


## Design-system redesign continuation — 2026-10-22

### Task ledger

| ID | Task | Status | Evidence / acceptance |
|---|---|---|---|
| UI-REDESIGN-001 | Define a shared, repository-specific redesign contract before changing visuals. | DONE_VERIFIED | Added `docs/DESIGN-REDESIGN-BRIEF-2026-10-22.md` covering product invariants, visual direction, responsiveness, accessibility, skill-role mapping and verification gates. |
| UI-REDESIGN-002 | Reconcile design-system documentation with the actual shipped UI. | DONE_VERIFIED | Updated `docs/DESIGN-SYSTEM.md` to retain and document the IPA panel, speech control, methodology navigation, copy actions, uncertainty states and all three equal Ukrainian systems. README links the brief. |
| UI-REDESIGN-003 | Refine visual implementation without changing conversion/data behavior. | PARTIAL | Moved the new visual rules into `src/styles/redesign.css`, loaded after the base styles on both converter and methodology pages, leaving `src/styles/main.css` identical to `main`. Added `tests/browser/design-system.spec.js` for core token contrast, equal result-card weighting, mobile stacking and shared methodology styling. Converter logic, CSV, generated map and runtime dependencies remain unchanged. Tests and live browser QA are still unexecuted. |
| UI-REDESIGN-004 | Run exact-head automated and visual release checks. | BLOCKED | GitHub Actions lookup returned no PR-triggered runs and no combined status checks for the candidate SHA at lookup time. A local `git clone` attempt failed because this execution environment cannot resolve `github.com`; therefore `npm ci`, Node tests, build, release checks and Playwright cannot be run locally here. Acceptance: green CI for the final PR head plus real browser review at 320/360/390/430 px and desktop. Do not infer visual correctness from CSS inspection. |

### Branch and review

- Dedicated branch: `feat/design-system-redesign-2026-10-22`.
- Draft PR: [#30 — design: refine the transcription workspace visual system](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/30).
- PR #5 was inspected but not merged: its base is far behind current main and its diff removes the required IPA result and methodology navigation. Do not merge it as-is.
- The five named design skills were applied as role-specific review lenses; the repository/tool environment did not confirm separate installation or execution of all five skill packages. This is not reported as five actual tool runs.
- A lightweight read-only stylesheet syntax sanity check found balanced braces, no premature closing brace, no unclosed quote/comment, and the required `[hidden] { display: none !important; }` guard. This is not a CSS parser, browser test, accessibility audit, or visual screenshot verification.

### Remaining acceptance criteria

1. Confirm CI on the latest PR #30 head, including `npm ci`, data validation, `npm test`, `npm run build`, `npm run check:release`, `npm run test:browser`, benchmark and generated-artifact drift as defined by the repository workflow.
2. Inspect the rendered homepage at desktop and 320/360/390/430 px. Exercise empty/results/issue states, script selection, independent tone switches, example, clear, copy, speech and methodology navigation.
3. Check keyboard-only use, visible focus, contrast, reduced motion, long/mixed-script content, browser console and page overflow.
4. Fix any concrete failures and rerun the affected checks before removing the BLOCKED/PARTIAL statuses.

No release claim or production deployment claim is made by this branch.

### Follow-up update — stylesheet separation and design regression tests

- Added `src/styles/redesign.css` as a separate design layer and linked it after existing styles on `index.html` and `methodology.html`. This avoids appending another 370-line override block to the existing minified base stylesheet.
- Restored `src/styles/main.css` to the exact content currently on `main`; the converter's base styling and component rules remain untouched.
- Added `tests/browser/design-system.spec.js`: checks WCAG AA contrast (4.5:1 threshold) for core token pairs, confirms the primary action's computed colors, checks equal widths for the three Ukrainian system cards on desktop and their one-column stacking on mobile, and checks that shared tokens load on the methodology page.
- Extended `docs/QA-PLAN.md` to register these design-specific browser gates.
- Independent offline calculation of the specified token contrast pairs: ink/paper 16.04:1; muted/paper 5.27:1; accent/paper 8.87:1; white/accent 9.93:1; warning/warning-surface 5.83:1. This validates only those color pairs, not every rendered text element.
- A static brace/quote/comment sanity scan of `src/styles/redesign.css` passed. This is not a standards-compliant CSS parse and does not replace browser execution.
- Latest recorded candidate before the next commit: `97b25b573caeac6b533c19adbc6fbced0c7fdf81`. Re-read the PR head before using this SHA as current; later documentation/metadata commits may change it.
