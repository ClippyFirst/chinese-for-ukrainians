# Master execution plan — Chinese-to-Ukrainian transcription
**Audit snapshot:** 2026-10-20 (updated after CI verification)  
**Repository:** https://github.com/ClippyFirst/chinese-for-ukrainians  
**Reference branch:** `main`  
**Application/code SHA with verified quality CI:** `0c173deeace88428fd2919fe47ce8e438adca3b6` (2026-10-20). Later commits in this audit are documentation-only; their own CI runs are checked separately.  
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

## Prioritized task register

| ID | Priority | Task / evidence of problem | Status | Dependencies | Acceptance criteria | Verification evidence |
|---|---|---|---|---|---|---|
| C2U-001 | P0 | Recover the authoritative execution plan and handoff. Expected audit-folder path returned 404; no equivalent plan found at two common paths. | DONE_VERIFIED | — | A durable plan and handoff are committed and linked from each other. | This file and `docs/audits/current/CHAT-HANDOFF.md`; commit URL to be added after commit. |
| C2U-002 | P0 | Establish current-HEAD quality status. | DONE_VERIFIED | — | Required data validation/generation (via build), unit/integration tests, acoustic input guards, production build, release constraints and browser regression checks pass on the exact main SHA. Benchmark is optional and separately tracked as not run. | [Quality checks run 39482425883](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39482425883), SHA `0c173deeace88428fd2919fe47ce8e438adca3b6`; local clone was blocked by DNS. |
| C2U-003 | P0 | Verify current public deployment and production UI. GitHub Pages deployment completed, but live-page and mobile/manual inspection are not confirmed. | IN_PROGRESS | C2U-002 | Homepage and methodology load; critical controls work; no console/runtime failures; check Chromium and 320/360/390/430px viewports. | [Pages run 39482425963](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39482425963) on SHA `0c173deeace88428fd2919fe47ce8e438adca3b6`; live inspection blocked by current fetch-tool access/credit limits. |
| C2U-004 | P1 | Citation metadata absent at root: `CITATION.cff` fetch returned 404. | TODO | confirm credited author(s), ORCID if intended, title, repository URL, license and version | Valid CFF metadata with no invented author identifiers; GitHub citation parser accepts it. | `CITATION.cff`, validator output and commit. |
| C2U-005 | P1 | Confirm release metadata and licensing scope. MIT `LICENSE` exists, but code/data/documentation/source-data rights may differ. | IN_PROGRESS | C2U-004; source/license inventory | Explicitly document what MIT covers and identify third-party/source-data terms; do not imply all cited source material is relicensed. | License/provenance audit note with file-level evidence. |
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
