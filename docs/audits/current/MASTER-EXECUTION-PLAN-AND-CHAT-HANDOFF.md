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
