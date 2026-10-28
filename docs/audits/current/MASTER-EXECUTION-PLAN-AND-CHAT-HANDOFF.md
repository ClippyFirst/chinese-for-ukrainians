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
| UI-REDESIGN-003 | Refine visual implementation without changing conversion/data behavior. | PARTIAL | Moved the new visual rules into `src/styles/redesign.css`, loaded after the base styles on both converter and methodology pages, leaving `src/styles/main.css` identical to `main`. Added `tests/browser/design-system.spec.js` for core token contrast, equal result-card weighting, one-column stacking/no overflow at 320/360/390/430 px, and shared methodology styling. Run #331 passed the earlier 38-test browser suite and run #332 passed 38/38 tests after the expanded 320/360/390/430 px layout assertions in commit `b47e1caa9342fddd1fafed5427328f8a0cb98cca`. Converter logic, CSV, generated map and runtime dependencies remain unchanged. Visual screenshot QA remains blocked. |
| UI-REDESIGN-004 | Run exact-head automated and visual release checks. | PARTIAL | Run #332 passed all checks, including 38/38 browser tests, on code commit `b47e1caa9342fddd1fafed5427328f8a0cb98cca`; run #333 passed on documentation-only commit `a4d28ffb88db1cf92641b525ff1122ba3562f4b7`. Run #335 then passed all workflow steps, including 38 browser tests, on branch head `fe71f0ce042e67af6d9d8d9b01d9a6e8b4602213`. The latest QA document now consolidates that evidence. The new documentation-only follow-up commit will trigger another CI run; check it before final handoff. Local clone/browser execution failed because this environment cannot resolve `github.com`. Visual screenshot review remains blocked: the available Firecrawl account reported insufficient credits, so no screenshot was captured. Acceptance: exact-head CI green plus real browser review at 320/360/390/430 px and desktop. Do not infer visual correctness from CSS inspection. |

### Branch and review

- Dedicated branch: `feat/design-system-redesign-2026-10-22`.
- Draft PR: [#30 — design: refine the transcription workspace visual system](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/30).
- PR #5 was inspected but not merged: its base is far behind current main and its diff removes the required IPA result and methodology navigation. Do not merge it as-is.
- The five named design skills were applied as role-specific review lenses; the repository/tool environment did not confirm separate installation or execution of all five skill packages. This is not reported as five actual tool runs.
- A lightweight read-only stylesheet syntax sanity check found balanced braces, no premature closing brace, no unclosed quote/comment, and the required `[hidden] { display: none !important; }` guard. This is not a CSS parser, browser test, accessibility audit, or visual screenshot verification.

### Remaining acceptance criteria

1. Run #335 passed all defined workflow gates, including 38/38 browser tests, on branch head `fe71f0ce042e67af6d9d8d9b01d9a6e8b4602213`. A later documentation-only commit reconciles `design-qa.md`; verify its CI before final handoff. Remaining product acceptance is rendered visual review, blocked by unavailable screenshot tooling/credits.
2. Inspect the rendered homepage at desktop and 320/360/390/430 px. Exercise empty/results/issue states, script selection, independent tone switches, example, clear, copy, speech and methodology navigation.
3. Check keyboard-only use, visible focus, contrast, reduced motion, long/mixed-script content, browser console and page overflow.
4. Fix any concrete failures and rerun the affected checks before removing the BLOCKED/PARTIAL statuses.

No release claim or production deployment claim is made by this branch.

### Follow-up update — stylesheet separation and design regression tests

- Added `src/styles/redesign.css` as a separate design layer and linked it after existing styles on `index.html` and `methodology.html`. This avoids appending another 370-line override block to the existing minified base stylesheet.
- Restored `src/styles/main.css` to the exact content currently on `main`; the converter's base styling and component rules remain untouched.
- Added `tests/browser/design-system.spec.js`: checks WCAG AA contrast (4.5:1 threshold) for core token pairs, confirms the primary action's computed colors, checks equal widths for the three Ukrainian system cards on desktop and their one-column stacking/no overflow at 320/360/390/430 px, and checks that shared tokens load on the methodology page. Run #331 passed the earlier 38-test suite; run #332 then passed the expanded assertions (38 passed, 0 failed). The subsequent documentation-only commit `a4d28ffb88db1cf92641b525ff1122ba3562f4b7` passed run #333.
- Extended `docs/QA-PLAN.md` to register these design-specific browser gates.
- Independent offline calculation of the specified token contrast pairs: ink/paper 16.04:1; muted/paper 5.27:1; accent/paper 8.87:1; white/accent 9.93:1; warning/warning-surface 5.83:1. This validates only those color pairs, not every rendered text element.
- A static brace/quote/comment sanity scan of `src/styles/redesign.css` passed. This is not a standards-compliant CSS parse and does not replace browser execution.
- Latest recorded candidate before the next commit: `97b25b573caeac6b533c19adbc6fbced0c7fdf81`. Re-read the PR head before using this SHA as current; later documentation/metadata commits may change it.


### Visual QA gate — 2026-10-22

- Added root `design-qa.md` with `final result: blocked`. The repository has a written design contract but no pixel-specific source mockup. Local browser access is unavailable due GitHub DNS failure; the available Firecrawl screenshot request could not run because the connected account reported insufficient credits. Code review and color-ratio calculations are not a substitute for visual QA.
- CI run #331, candidate `958d75488fcedb3a5298763a419e081ae16b188a`: all checks completed successfully, including Playwright (38 passed, 0 failed). This predates the expanded mobile-width layout assertions. CI run #332 on code commit `b47e1caa9342fddd1fafed5427328f8a0cb98cca` completed successfully, including the expanded Playwright checks (38 passed, 0 failed). CI run #333 passed on documentation-only commit `a4d28ffb88db1cf92641b525ff1122ba3562f4b7`; CI run #335 also passed all 38 browser tests on later branch head `fe71f0ce042e67af6d9d8d9b01d9a6e8b4602213`. Subsequent commits update only QA/handoff documents, not implementation or tests.
- After this documentation commit, re-read the PR head and verify the latest CI run rather than reusing results from the earlier SHA.


## Repository hygiene and documentation consolidation — 2026-10-23

**Starting main SHA:** 36cb27b3fd4b46b37ed1735269f5ebb3a7b28cc4.  
**Dedicated branch:** chore/repository-hygiene-docs-2026-10-23.

### Task ledger

| ID | Task | Status | Evidence / acceptance |
|---|---|---|---|
| DOC-HYGIENE-001 | Make README a concise entry point and document actual output architecture. | IN_PROGRESS until exact-head CI | README now links to docs/INDEX.md and states that IPA and Ukrainian outputs are parallel; Ukrainian values are looked up from independent CSV columns. |
| DOC-HYGIENE-002 | Establish one documentation index and remove duplicate end-user guide. | IN_PROGRESS until link check | docs/INDEX.md maps canonical docs by purpose; docs/USAGE.md duplicated docs/USER-GUIDE.md and is removed after checking both contents. The IPA limitation remains documented in USER-GUIDE.md. |
| DOC-HYGIENE-003 | Move design QA evidence into the canonical audit area and reconcile stale status text. | IN_PROGRESS until link check | Design QA is moved to docs/audits/current/DESIGN-QA-2026-10-22.md; dated workflow results remain historical and do not prove current branch CI. |
| DOC-HYGIENE-004 | Reconcile QA plan, roadmap and release checklist with current scope. | IN_PROGRESS until exact-head CI | Documents now describe checks and acceptance criteria rather than implying old CI results certify the current SHA. |
| DOC-HYGIENE-005 | Remove only artifacts proven duplicate or misplaced. | IN_PROGRESS until tree check | Remove duplicate docs/USAGE.md and relocate root design-qa.md; retain dated phonetic audits, source ledgers, differential CSV, acoustic scripts, test fixtures, generated map and historical plans because they provide evidence, test coverage, build inputs or decision provenance. |

### Verified facts and invariants

- Current PR disposition (2026-10-23): PR #32 header alignment, PR #33 repository hygiene, PR #34 IPA-keyed adapters, and PR #35 documentation closeout are merged. PR #5 is closed as superseded without merging; its branch is preserved because its proposed index removes the required IPA result and methodology navigation. Earlier mentions of PR #5 as open are historical audit notes.
- src/generated/transcription-map.js is build output regenerated from zh-in-ua.csv, not an obsolete artifact.
- The 403-key UW differential, phonetic source ledger, dated IPA adjudication notes, and research/ipa-acoustic directory are evidence assets; dates and non-runtime status do not make them unused.
- No linguistic mappings, source CSV values, IPA conventions, runtime application code, dependency versions, generated mapping, or deployment configuration are intentionally changed by this documentation cleanup.

### Remaining blockers

1. **IPA adapter boundary:** implemented in merged PR #34. Runtime Ukrainian lookup now uses segmental IPA keys with source provenance and a collision guard. Remaining phonetic evidence work is tracked separately in C2U-IPA-009; the adapter change does not prove every IPA or Ukrainian value correct. Edge-form decision (2026-10-23): `ê` and `yo` now have explicitly documented broad-IPA conventions; `hm` and `hng` are deliberately out of ordinary supported syllable scope until direct phonetic evidence is available.
2. **Source-data rights:** MIT code licensing does not establish rights for every third-party source/dataset.
3. **Manual QA:** automated browser tests do not establish complete screen-reader, physical speech-output, or clipboard-permission behavior.
4. **Uncertainty corpus:** add a stable rare/unresolved-form fixture only when a source-grounded example is available.
5. **Citation metadata:** do not add author/ORCID fields without verified attribution.
6. **Exact-head acceptance:** run the Quality workflow for this branch; historical run #353 is not a substitute.

### Verification record

The GitHub repository interface was used to inspect the current tree, package scripts, README, master/handoff, QA plan, roadmap, release checklist, duplicate user guide and design QA record. No local clone or shell runtime was available, so no local npm command is claimed as executed. Verify internal links and the final branch's Quality workflow before merge.

**Disposition:** documentation/repository-hygiene change only, not a product release. Keep public beta / research preview status.


## IPA-first adapter implementation — 2026-10-23

| ID | Task | Status | Acceptance evidence |
|---|---|---|---|
| C2U-IPA-007 | Inventory audit of IPA key coverage and collisions | DONE_VERIFIED | Quality run #40010524093: 421 aliases, 417 supported keys, 4 unsupported, 0 collision groups; structural finding only, not a phonetic accuracy claim. |
| C2U-IPA-008 | Route Ukrainian output through IPA-keyed adapters | DONE_VERIFIED | PR #34 merged as `21b3e440fa8631a82273802f1880e31c9e8f7135`. Quality run #40012228389 passed 72 tests and all configured gates on the code-identical PR head; exact-main-SHA Quality run #40012724723 passed all configured checks. |
| C2U-IPA-009 | Adjudicate marginal/unsupported forms | DONE_VERIFIED | PR #38 merged as `fba393964757459df4bd6d7c435fe7b99c8b9286`. Quality run [#40019246182](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40019246182) passed on tested head `bc3d3088f3ef4158b9159a48fb6e80e219b4cc7a`, including unit/integration tests, deterministic inventory audit (421 aliases; exactly 2 unsupported: `hm`, `hng`; zero IPA-key collisions), production build, release constraints, browser regression tests and QA artifacts. `ê → ɛ`; `yo → jɔ` as a stated broad-IPA convention; `hm`/`hng` intentionally unsupported due insufficient phonetic evidence. This closes the implementation task, not narrow-acoustic accuracy or source-image verification of legacy Ukrainian cells. |
| C2U-LIC-010 | Source-by-source rights review | BLOCKED | Reuse/redistribution evidence required for every reproduced source; citations alone are not a rights grant. |
| C2U-QA-011 | Manual assistive-technology/device QA | BLOCKED | Screen-reader, physical speech-output and clipboard-permission tests need a real device/browser session. |

The IPA adapter migration retains the Pinyin-keyed CSV as the editable evidence source. Runtime output lookup now uses the segmental IPA key and carries source-row/Pinyin provenance. Unsupported IPA keys remain unresolved. Do not describe this as full linguistic validation; the adapter boundary is an architectural property, while each mapping still needs evidence.


## Cross-engine benchmark work — 2026-10-24

| ID | Task | Status | Acceptance evidence / blocker |
|---|---|---|---|
| C2U-BENCH-001 | Identify public Mandarin G2P and Pinyin→IPA candidates | DONE_VERIFIED (discovery only) | Candidate roles, links and source limitations recorded in `docs/audits/current/CROSS-ENGINE-BENCHMARK-2026-10-24.md`. |
| C2U-BENCH-002 | Separate Pinyin, IPA, and three Ukrainian-system evaluation targets | DONE_VERIFIED (protocol) | Distinct metrics and independent gold-data requirements documented; no combined misleading score. |
| C2U-BENCH-003 | Define source-backed benchmark corpus schema | DONE_VERIFIED (schema only) | `docs/audits/current/CROSS-ENGINE-BENCHMARK-CORPUS-SCHEMA-2026-10-24.csv`; example row is explicitly marked NOT_GOLD and must not be scored. |
| C2U-BENCH-004 | Create hosted, isolated execution path | DONE_VERIFIED (CI infrastructure) | Exact-head run [#40078028959](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40078028959) passed all three jobs; Node regression tests, `npm run validate:benchmark-corpus`, latency smoke benchmark, runtime manifest and all three artifacts were confirmed. This verifies orchestration, not linguistic accuracy. |
| C2U-BENCH-005 | Execute g2pC on documented examples | BLOCKED (upstream dependency build) | On run [#40078028959](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40078028959), legacy `pkuseg` native extension compilation failed under Python 3.10 despite `numpy<2`. Workflow emits a `BLOCKED` JSONL artifact; no prediction or score is claimed. Acceptance: a compatible upstream build/runtime or documented source-backed alternative, then successful raw-output capture. |
| C2U-BENCH-006 | Execute g2pW/g2pM on the same held-out corpus | TODO / dependency-gated | Candidate repositories need pinned revisions, verified installation and model-weight setup; then run identical corpus and persist raw outputs/environment manifest. |
| C2U-BENCH-007 | Compare IPA adapters empirically | TODO | Install/pin pinyin-to-ipa, record all candidate outputs, adjudicate target convention, then compute exact match, segmental distance, tone errors and coverage. |
| C2U-BENCH-008 | Independent gold set for the three Ukrainian systems | BLOCKED / evidence-limited | Requires row-level collation against source publications/official tables and data-rights review; current canonical CSV alone is not an independent gold standard. |
| C2U-BENCH-009 | Produce verified comparative leaderboard | TODO | Only after held-out data and all feasible candidates run successfully on the same inputs and the result artifact is checked into the repository. |

**Interpretation guardrail:** no comparative accuracy claim is authorized by source discovery, documented-example smoke tests, or published figures from different test sets. Existing `scripts/benchmark.mjs` remains a latency smoke test, not a cross-engine linguistic benchmark. The hosted workflow reduces the local-runtime blocker but has not yet been validated through a confirmed run of its own workflow; keep public beta / research preview status.


### Exact-head CI verification — 2026-10-24

- Workflow run [#40078028959](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40078028959) completed with conclusion **success** on commit `6c9ba05993be3ff96467fbbfe3a6c21e907f4cb3`.
- All three jobs succeeded: Node baseline, Python candidate metadata probe, and g2pC blocker-recording job. The g2pC job's success means the failure was captured honestly; it does **not** mean g2pC installed or ran.
- Artifacts confirmed: `node-baseline-and-manifest` (714 bytes), `python-candidate-install-contracts` (10,315 bytes), and `g2pc-documented-example-smoke` (350 bytes). The g2pC artifact records the blocked installation rather than fabricated output.
- Node job verified `npm ci`, `npm test`, `npm run validate:benchmark-corpus`, `npm run benchmark`, manifest generation, and artifact upload.
- Corpus validator was hardened to reject malformed CSV quoting, require VERIFIED held-out rows, and guard against training/development leakage annotations. The validator is exposed as `npm run validate:benchmark-corpus`.
- Empirical comparison remains unperformed: no shared held-out gold set, no g2pW/g2pM predictions, no Pinyin→IPA scored comparison, and no independently sourced Ukrainian accuracy corpus. Keep the research preview status.


### Follow-up CI and validator hardening — 2026-10-24

- Follow-up workflow run [#40078336942](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40078336942) completed with **success** on `2b596942e6fce55e1c5928b9a41054616432076f`. All three jobs passed: Node baseline, candidate metadata probe, and g2pC blocker capture. Artifacts were present: `node-baseline-and-manifest` (713 bytes), `python-candidate-install-contracts` (10,320 bytes), and `g2pc-documented-example-smoke` (350 bytes).
- The Node job ran `npm ci`, `npm test`, `npm run validate:benchmark-corpus`, and `npm run benchmark`. This is a verified hosted infrastructure check; it is not an accuracy benchmark.
- A subsequent validator review found two edge cases in the stricter layer checks: an empty IPA convention could pass, and Ukrainian rows were at risk of requiring all three systems instead of at least one. Fixed in commit `57bb9c775344cde0c5bdd1cb8d7ac61617a60376`. The workflow's path filter includes the validator, so a new exact-head CI run should execute; its result must be inspected before marking that fix DONE_VERIFIED.
- PR #43 remains stacked on PR #42 and open. The current PR #43 head is `57bb9c775344cde0c5bdd1cb8d7ac61617a60376`; do not merge it independently of its base or retarget it blindly.
- Research status unchanged: no scored g2pW/g2pM outputs, g2pC remains blocked at upstream dependency installation, no held-out gold corpus, and no comparative linguistic accuracy claim.


### Exact-head validation of the layer-specific guardrail fix — 2026-10-24

- Workflow run [#40079129604](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40079129604) completed with **success** on exact head `57bb9c775344cde0c5bdd1cb8d7ac61617a60376`.
- All three jobs passed: Node regression/corpus/latency baseline; public candidate metadata probe; g2pC blocker capture. Artifacts confirmed: `node-baseline-and-manifest` (713 bytes), `python-candidate-install-contracts` (10,319 bytes), `g2pc-documented-example-smoke` (350 bytes).
- Node job explicitly passed `npm ci`, `npm test`, `npm run validate:benchmark-corpus`, `npm run benchmark`, runtime manifest generation, and artifact upload.
- Validator fix is now **DONE_VERIFIED (structural guardrail only)**: VERIFIED IPA rows must have a non-empty convention other than `not_applicable`; Ukrainian-layer rows may provide one or more system outputs without being forced to populate all three. Existing corpus has no VERIFIED rows, so this verifies the validator's execution path against current data, not every negative/positive edge case in a dedicated unit test.
- g2pC's documented-example step was skipped because installation remains blocked; the job passed by recording the blocker artifact. This is not a model run.
- PR #43 is still open and stacked on PR #42. Latest check reports `mergeable: true`, head `57bb9c775344cde0c5bdd1cb8d7ac61617a60376`; do not merge it separately from its base. No PR was merged.
- Scientific acceptance remains incomplete: no held-out gold corpus, no g2pW/g2pM predictions, no scored IPA-adapter comparison, and no independent three-system Ukrainian gold set. Public beta/research preview remains the appropriate status.


### Validator regression tests — exact-head CI — 2026-10-24

- Added an optional CSV path argument to `scripts/validate-benchmark-corpus.mjs`. Default behavior is unchanged; tests can validate temporary fixtures without mutating the canonical research corpus.
- Added `tests/research-benchmark-validator.test.mjs` with five subprocess-based cases: valid VERIFIED G2P record; reject VERIFIED IPA record without a declared convention; accept a Ukrainian row with one populated system; reject unverified held-out data; reject duplicate case IDs.
- Exact-head workflow run [#40079587766](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40079587766) completed with **success** on commit `d407175f6c46c9c83106f5fa72ae582a86abb337`. All three jobs passed: Node baseline and environment manifest, Python candidate metadata probe, and g2pC blocker capture.
- Artifacts confirmed: `node-baseline-and-manifest` (712 bytes), `python-candidate-install-contracts` (10,318 bytes), and `g2pc-documented-example-smoke` (350 bytes). The g2pC artifact remains a blocker record, not model predictions.
- Node job includes `npm ci`, `npm test` (which auto-discovers `*.test.mjs` under `tests/`), `npm run validate:benchmark-corpus`, `npm run benchmark`, runtime manifest creation, and artifact upload. Exact-head CI success therefore verifies the new tests ran under the repository test runner; no local shell execution is claimed.
- Status: validator edge-case tests are **DONE_VERIFIED** at the hosted workflow level. The test fixtures are structural guardrail checks, not linguistic validation or gold corpus rows.
- PR #42 remains open. PR #43 remains open and stacked on #42; the connector's latest PR metadata currently reports `mergeable: false` for #43, so do not merge it independently or assume conflict-free status. Inspect the exact current diff/base relationship and resolve only through a safe branch update after the base is reconciled.
- Research readiness remains **PARTIAL / research preview**: no independent held-out gold set, no g2pW/g2pM scored runs, g2pC remains blocked by upstream `pkuseg` native build, no empirical Pinyin→IPA comparison, and no independently collated Ukrainian-system gold data. No accuracy ranking is authorized.


### Strict CSV parsing and expanded validator regression suite — 2026-10-24

- Hardened `scripts/validate-benchmark-corpus.mjs` to reject quotes embedded in unquoted fields and non-delimiter characters after a closing quote; CRLF, CR, LF, and quoted multiline fields are handled explicitly.
- Expanded `tests/research-benchmark-validator.test.mjs` from five to eight cases. New cases cover malformed quote syntax, missing one of the required Ukrainian outputs in an end-to-end gold row, and a held-out row whose license still requires permission.
- Hosted CI run [#40084662959](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40084662959) completed with **success** against exact head `d627345671f04a0de4ec7221e2a60995fb0a8f13`. The Node job confirmed the regression test step, corpus validator, existing latency smoke benchmark, runtime manifest, and artifact upload all passed. The other two jobs also completed successfully; the g2pC documented-example step was **skipped** because installation remains blocked, and its artifact records the blocker rather than predictions.
- Structural tests still do not establish linguistic truth. The fixture examples are synthetic test inputs and are not corpus rows or evidence for any transcription system.


## Continuation update — 2026-10-25, cross-engine benchmark guardrails and mobile table access

- PR [#42](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/42) merged at `7067a2ab88b032307db628d4f153f3b2807d6145`: documented a fair layered Mandarin benchmark contract, corpus schema, and the separation of Pinyin, broad IPA, and each Ukrainian-target method. This does not provide empirical accuracy evidence.
- PR [#44](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/44) merged at `d1e94e0e7d6dd6c4be8344e5a7376b16ddba449d`: added the isolated research-benchmark workflow, structural corpus validator, and validator tests; wired the validator regression and structural checks into the existing Quality workflow. Exact-head Quality run [40194934010](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40194934010) passed unit/integration tests, the new validator regression tests, corpus validation, acoustic input guards, production build, deterministic mapping check, conversion smoke benchmark, release checks, and browser regression tests.
- PR [#46](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/46) merged at `58cd2f1dba754172c4e8561d2afe6564516f6440`: made the methodology comparison tables accessible at 320/360/390/430px and added keyboard-scroll Playwright coverage. Exact-head Quality run [40195321277](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40195321277) passed, including browser regression tests.
- The dedicated `research-benchmark.yml` workflow now includes a `main` push trigger for relevant paths. The available connector only surfaced PR-triggered workflow runs, so the post-merge push-run conclusion and its `node-baseline-and-manifest`, `python-candidate-install-contracts`, and `g2pc-documented-example-smoke` artifacts are **NOT VERIFIED in this pass**. Do not mark that separate runner complete until the run and artifacts are inspected. The g2pC job is designed to emit `BLOCKED` rather than fabricate output if its legacy native dependency fails.
- Research boundary unchanged: benchmark corpus example rows are `NOT_GOLD`; no engine ranking or IPA/Ukrainian accuracy claim is made. Independent, source-backed, rights-reviewed held-out IPA and Ukrainian target gold remain the main scientific blocker.


## Continuation — 2026-10-28: Khmer, Lao, Burmese and Sinhala romanization research

- Branch: `feat/khmer-lao-burmese-sinhala-romanizers-2026-10-28`.
- PR [#48](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/48) is open; it is not merged and does not deploy to production. Current branch HEAD at this handoff update: `efe569af3908e18285754f37d3b026522b69b95f`.
- Added `regional-languages.html`, a dedicated route, navigation from both existing pages, a multi-page Vite build entry, experimental local grapheme-level Latin/IPA candidate adapters, Playwright regression tests, README disclosure, and `docs/REGIONAL-ROMANIZATION-RESEARCH-2026-10-28.md`.
- Upstream candidates researched: Khmer `seanghay/khmerphonemizer` (MIT, Python G2P); Lao `byu-matrix-lab/lao2ipa` (Apache-2.0, IPA and MoH 2020 romanization); Burmese `myanmaropenwordnet/mya2rom` (JavaScript, README indicates CC-BY-SA-4.0) and `trhura/python-myanmar` (MIT); Sinhala `skyprolk/SinEn-Natural-Language-Tool_Kit` (Apache-2.0, adapted converter with provenance requiring review). No upstream engine code was copied in this change.
- Status: **PARTIAL / research preview**, not DONE_VERIFIED. The current adapters are grapheme-level demonstrations, not complete phonological engines; they do not reliably model syllabification, contextual vowels, tone, or lexical exceptions. The UI discloses this. They must not be described as normative romanizations or independently validated IPA.
- CI: Quality run [40735775526](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40735775526) was observed in progress on the earlier PR head `af9354088fd481b0fc4f3d262bf5630c4e5c577d`; it does not verify the latest head. Exact latest-head Quality run and its results remain pending inspection. No local npm/build/browser tests are claimed because this session has GitHub connector access but no checked-out local runtime.
- Next acceptance gates: obtain a Quality run on the latest exact PR HEAD; inspect/fix any build and browser failures; port or package one verified upstream engine per language for browser use while preserving licenses; validate source-backed expected outputs independently; test IPA and romanization against the same phonetic representation where appropriate; then update this status based on evidence.


### Follow-up — Mya2Rom integration, 2026-10-28

- Current branch head for this handoff snapshot: `71d35cbf8c498bbbaf0c1d6698d6fcbe8d235525`; PR #48 remains open and unmerged.
- Follow-up to the initial scaffold: vendored upstream Mya2Rom 0.4.4 JavaScript under `vendor/mya2rom/`, with its CC-BY-SA-4.0 license, upstream attribution and change notice. The regional page uses the upstream engine's `mlcts2` and `ipa` modes for Burmese; a regression fixture expects the upstream README's `မြို့` outputs.
- The earlier note that no upstream code had been copied described the initial scaffold only and is superseded by this integration update.
- Exact-head Quality run [40736212901](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40736212901) was still in progress at the time of this update; browser regression status and the final conclusion are not yet verified.
- Status remains **PARTIAL / research preview**: Khmer, Lao and Sinhala are still provisional grapheme-level adapters. Their upstream candidates are Python-based or require source/data provenance review. Do not merge or publish this as complete four-language phonological support until those engines are ported/integrated with license compliance and source-backed tests.


### Verification update — regional romanization PR #48, 2026-10-28

- Latest implementation head checked: `ed84dd5c5a2ac8c4d2722cfa28a4510f831d8c12`. PR #48 remains open and unmerged; production main is unchanged.
- Quality run [40736898938](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40736898938) passed unit/integration tests, production build, generated-mapping determinism, benchmark and release checks, then remained in progress at browser installation. Its browser suite has not yet produced a final result.
- Earlier browser run [40736403283](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40736403283) failed on 13 cases: the newly added nav link caused 320px overflow and changed keyboard tab order, and the Mya2Rom adapter's Unicode-range regex failed to match Burmese characters. Follow-up commits added responsive nav wrapping, updated keyboard coverage, corrected the regex, and included the upstream expected-output regression. These fixes still require a passing exact-head browser run.
- Mya2Rom 0.4.4 is integrated for Burmese MLCTS2 and IPA, with its CC-BY-SA-4.0 license and attribution/change notice kept under `vendor/mya2rom/` and copied into the static `public/` output.
- Status remains **PARTIAL / research preview**. Khmer and Lao upstream candidates are Python-only in the researched repositories; Sinhala candidate source/data requires provenance review. The current grapheme adapters for those three languages are not full phonological engines. Do not merge or deploy this PR as complete four-language support.
- Next acceptance gate: inspect the exact-head Quality run after browser tests finish; fix and rerun any remaining failures. Then port/package reviewed Khmer, Lao and Sinhala engines with source-backed fixtures before considering full completion.


### Continuation update — regional romanization, 2026-10-28

- Exact-head CI run [40737082982](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40737082982) passed all listed Quality steps on `c7028d4a291edd61800e1534b7cbbf746cb2960f`; that run predates the latest correctness follow-up and does not certify the new head.
- Correctness improvement: IPA output is now withheld for Khmer, Lao and Sinhala because the current per-grapheme maps are not reviewed phonological engines. UI says IPA was not generated; the Latin candidates remain explicitly provisional. This preserves the IPA evidence boundary rather than fabricating phonetic results.
- Current status remains PARTIAL. Burmese Mya2Rom is integrated but needs current-head CI and independent validation. Khmer and Lao require browser-compatible ports of reviewed upstream engines; Sinhala requires provenance review. Independent, source-backed language fixtures remain TODO/BLOCKED.
- Current follow-up implementation head at the time of this entry is expected to advance as the handoff files are committed; inspect PR #48 for the exact latest SHA and rerun Quality checks before claiming DONE_VERIFIED for the current state.


### Final status for this continuation — 2026-10-28

- Latest code-fix commit: `fcae7190c7cb506799989de169f4699d74b3119e`. It also makes the Mya2Rom failure path withhold IPA and report the engine failure instead of implying upstream success.
- The only verified Quality result available is run [40737082982](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40737082982) on earlier commit `c7028d4a291edd61800e1534b7cbbf746cb2960f`; current-head CI is **BLOCKED / NOT VERIFIED**. The connected GitHub action set exposes workflow-run inspection and reruns, but no workflow-dispatch operation; current API-created commits have no run listed for the latest SHA.
- PR #48 remains open, unmerged, and mergeable. Do not merge until exact-head CI is green and the three remaining language-engine acceptance gates are addressed.


### Candidate discovery extension — 2026-10-28

- Further research surfaced a browser-native Khmer option, `@gmana/km-translit` (MIT, syllable-aware BGN/PCGN-derived romanization but explicitly not fully conformant), and Sinhala `SuhasDissa/Singlish` (JavaScript, 150 tests reported upstream, GPL-3.0). These are candidates, not integrated engines; the GPL package is not vendored pending licensing review.
- Lao alternatives include Apache-2.0 LaoNLP (Python; recent IPA/MoH 2020 support) and Laonetics (JavaScript but CC-BY-NC-4.0, so not integrated due to non-commercial restrictions and age). `lao2ipa` remains the leading IPA-first candidate for a port.
- Updated the research page to expose these options and their caveats. Current code change `cf5d4f56599040bd6db91d2b83af9a520b535235` is docs/UI only; no new exact-head CI run is available, so current-head verification remains BLOCKED / NOT VERIFIED.


### Sinhala integration continuation — 2026-10-28

- Added local browser ES-module integration of `sinhala-soft/sinhala-text-converters` 1.0.5 for Sinhala Unicode → Singlish. Upstream MIT license and UCSC/Sinhala Soft attribution are retained in `vendor/sinhala-text-converters/` and `public/vendor/sinhala-text-converters/`.
- Added a browser regression assertion for upstream-documented `ආයුබෝවන්` → `aayubowan`. The test is present but has not been executed on the current head; Sinhala remains PARTIAL pending exact-head CI and independent validation.
- Current engine coverage before the Khmer follow-up: Burmese uses Mya2Rom; Sinhala uses Sinhala Text Converters; Khmer and Lao had provisional Latin adapters only. IPA was withheld for Khmer/Lao/Sinhala. This historical note is superseded by the Khmer integration entry below.


### Regional pipeline order correction — 2026-10-28

- User-confirmed output order: **romanization → IPA → Ukrainian transcription**. The regional page now has three ordered result cards, indexed 01/02/03, and a browser regression test for the order.
- Added a conservative IPA → Ukrainian candidate adapter. The third stage consumes IPA only; unsupported IPA symbols and diacritics remain visibly bracketed. This is a research candidate, not a validated transcription standard.
- Burmese can populate all three visible stages using Mya2Rom's MLCTS2/IPA outputs and the provisional IPA adapter; the Ukrainian result remains uncertain where IPA contains unsupported phonation marks. Khmer now has an integrated syllable-aware Latin romanizer but no IPA engine; Lao still has only a provisional Latin candidate and no IPA; Sinhala has romanization but no IPA. These language integrations remain PARTIAL/BLOCKED on phonological evidence.
- Added browser tests for exact display order, no Ukrainian output when IPA is unavailable, and IPA-derived Burmese candidate behavior.
- Quality run `40740257204` passed on earlier commit `ef528de773764d821baae6e49faf571ba9797039`. Latest code changes were initially checked under run `40742716417`; follow-up documentation changes trigger new CI, so verify the latest branch head before claiming acceptance.


### Latest verification reconciliation — 2026-10-28

- Quality run `40743007634` completed successfully on `6ec1927616595592041451609240c183837d18f8`: browser suite reported **71 passed, 1 skipped**. This run verifies the three regional result cards and IPA-derived Ukrainian candidate tests on that head.
- Latest branch head is `b9734aeff3692bfbb22c82e31bf407cabda6a751`. After the successful run, the branch added the main Chinese-page output-order regression test (`9f687d1bcce270150ab7d28621c6f6833b0e2ca5`) and a small IPA-affricate mapping extension (`b9734aeff3692bfbb22c82e31bf407cabda6a751`). These two latest changes have not been exercised by CI. Do not mark exact-head verification DONE_VERIFIED.
- Previous browser run `40742716417` failed because a malformed regex in the IPA adapter prevented the regional module from executing; the regex was replaced by explicit code-point/string checks in `6ec1927616595592041451609240c183837d18f8`, and the following Quality run passed.


### Final regional UI state — 2026-10-28

- Regional results heading now explicitly displays the ordered contract: romanization → IPA → Ukrainian transcription.
- Latest UI commit: `3343ac2b52f871be75b4a37c35e620456f8e2cf0`. Latest branch verification remains inherited from successful run `40743007634` on earlier code commit `6ec1927616595592041451609240c183837d18f8`; later small adapter/UI/test changes remain not verified on the exact latest head.


### IPA adaptation safeguard — 2026-10-28

- Latest code commit `0566407bd90b67f412a5d98a54ad55e284c0dd96` removes speculative mappings that conflated breathy/voiceless phonation or glottal stop with the project's aspiration apostrophe. Only explicit aspirated IPA sequences currently map to apostrophe; breathy voice, glottal stop, tones, and unknown diacritics remain visibly unresolved.
- Quality run `40743692803` is in progress on that code head. Unit/integration tests, production build, deterministic generated mappings, benchmark, and release constraints are already green in the run; browser installation is still in progress. Do not claim full pass until the browser step completes.


### Final Quality verification — 2026-10-28

- Quality run `40743692803` completed **successfully** on executable-code head `0566407bd90b67f412a5d98a54ad55e284c0dd96`. Browser regression suite: **73 passed, 1 skipped**. Unit/integration tests, research benchmark validator, benchmark corpus guardrails, acoustic input guards, production build, generated-map determinism, conversion benchmark, and release constraints passed in the same run.
- This run includes the ordered output UI, the main-page order regression test, IPA-to-Ukrainian candidate handling, the unknown-feature preservation correction, and the final regional heading. Later branch commits are documentation/PR metadata only. Exact executable-code head is verified; the overall regional language engine coverage remains PARTIAL, not release-ready.


## Khmer upstream romanizer integration — 2026-10-28 (follow-up)

- Integrated pinned dependency `@gmana/km-translit@0.1.2` (MIT) in `package.json` and `package-lock.json`; browser runtime calls `khmerToLatin` instead of the per-grapheme placeholder for Khmer.
- This is a syllable-aware BGN/PCGN-derived ASCII profile, not a fully conformant BGN/PCGN implementation; its own documentation says diacritics are dropped. The UI explicitly labels this limitation and does not pretend that the romanizer supplies IPA.
- Added browser regression fixture `ភ្នំពេញ` → `Phnom Penh`; test asserts no IPA or Ukrainian candidate is generated without IPA.
- Status: Khmer romanization = PARTIAL / implementation integrated, awaiting exact-head clean-install CI and broader source-backed fixtures. Khmer IPA and IPA-derived Ukrainian output = TODO. Lao IPA/romanizer = TODO. Sinhala IPA = TODO. Burmese independent phonetic validation = TODO.
- Required verification: `npm ci`, unit/integration suite, browser suite, production build, generated-artifact determinism and release checks on the updated branch head. No local runtime is available in this session; do not mark the change verified until GitHub Quality CI passes.


## Sinhala IPA rule-port follow-up — 2026-10-28

- Added `src/app/sinhala-ipa.js`, a browser-side rule port based on MIT-licensed VoiceLK ML `model_engine/g2p.py` (https://github.com/RootCode-AI/voicelk_ml). `vendor/voicelk-g2p/LICENSE` and `NOTICE.md` preserve attribution and scope.
- The regional pipeline now uses Sinhala Text Converters for Singlish romanization, then the Sinhala IPA rule-port, then the provisional IPA-to-Ukrainian adapter. The port omits the upstream Python tokenizer and domain lexicon; its output is explicitly provisional, not validated VoiceLK parity or normative IPA.
- Browser fixture added for `ආයුබෝවන්` → `aːjuboːʋan` → `айубован`. This checks deterministic behavior only; independent linguistic review and broader source-backed fixtures remain TODO.
- Khmer romanization is now integrated through `@gmana/km-translit@0.1.2`; Khmer IPA remains TODO. Lao still lacks a reviewed browser-compatible romanizer/IPA engine. Burmese Mya2Rom is integrated but needs independent validation.
- Exact-head Quality CI after these changes is pending. A prior run for Khmer-only code [40746219843](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40746219843) passed. Do not mark the Sinhala change verified until a workflow on the final code head passes all unit, build and browser tests.


## Lao IPA/romanization rule-port follow-up — 2026-10-28

- Added `src/app/lao-ipa.js`, a partial browser-side port of selected `byu-matrix-lab/lao2ipa` (Apache-2.0) syllable, vowel, consonant and tone rules. License and scope notice are preserved in `vendor/lao2ipa/`.
- The Lao UI now shows a MoH-style Latin candidate and IPA with explicit tone contours, then passes that IPA through the Ukrainian candidate adapter. It is explicitly marked partial; it does not reproduce all upstream orthographic rewrites, clusters or tone-mark placements.
- Browser fixtures cover `ກາ` → `ka` / `kaː˩˧` and `ສະບາຍດີ` → `sabaaydi` / `saʔ˧˥.baːj˩˧.diː˩˧`; these are implementation regression fixtures, not independent language validation.
- Status: Khmer romanization integrated (IPA TODO); Lao romanization + partial IPA port integrated (PARTIAL); Sinhala romanization + partial IPA rule port integrated (PARTIAL); Burmese Mya2Rom MLCTS2/IPA integrated (needs independent validation). All Ukrainian outputs remain candidates, not normative results.
- Latest Lao code/test head is awaiting Quality CI. Do not mark the full four-language task DONE_VERIFIED until the final exact-head workflow passes and broader upstream vectors plus independent linguistic review are complete.
