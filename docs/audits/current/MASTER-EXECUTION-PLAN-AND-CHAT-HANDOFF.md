# Master execution plan — Chinese-to-Ukrainian transcription
**Audit snapshot:** 2026-10-20  
**Repository:** https://github.com/ClippyFirst/chinese-for-ukrainians  
**Reference branch:** `main`  
**Latest commit observed through commit search:** `069c6e639454b238c9973d8ab152e9b067e6b46f` (2026-10-19; “docs: clarify final literature-based IPA release criterion”)  
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
- The latest observed commit's combined status endpoint returned an empty status list. This is **not evidence of a passing CI run**.
- No local checkout or Node/browser execution occurred in this remote GitHub inspection pass; all command results remain unverified until run in a real checkout.

## Prioritized task register

| ID | Priority | Task / evidence of problem | Status | Dependencies | Acceptance criteria | Verification evidence |
|---|---|---|---|---|---|---|
| C2U-001 | P0 | Recover the authoritative execution plan and handoff. Expected audit-folder path returned 404; no equivalent plan found at two common paths. | DONE_VERIFIED | — | A durable plan and handoff are committed and linked from each other. | This file and `docs/audits/current/CHAT-HANDOFF.md`; commit URL to be added after commit. |
| C2U-002 | P0 | Establish actual runtime quality status. Package scripts exist but have not been executed in this environment; latest commit has no reported combined statuses. | IN_PROGRESS | local checkout / available runtime | Run data validation, generation, tests, build, release check, benchmark, browser tests; record environment and exact exit outcomes. | Command transcript, CI run URL or explicit BLOCKED reason. |
| C2U-003 | P0 | Verify current public deployment and production UI. Publication-readiness document makes deployed-site and mobile/manual review part of the gate; no live deployment evidence captured yet. | TODO | C2U-002 | Homepage and methodology load; critical controls work; no console/runtime failures; check Chromium and 320/360/390/430px viewports. | Dated smoke-test record, screenshots or browser-test results, deployment URL/commit. |
| C2U-004 | P1 | Citation metadata absent at root: `CITATION.cff` fetch returned 404. | TODO | confirm credited author(s), ORCID if intended, title, repository URL, license and version | Valid CFF metadata with no invented author identifiers; GitHub citation parser accepts it. | `CITATION.cff`, validator output and commit. |
| C2U-005 | P1 | Confirm release metadata and licensing scope. MIT `LICENSE` exists, but code/data/documentation/source-data rights may differ. | IN_PROGRESS | C2U-004; source/license inventory | Explicitly document what MIT covers and identify third-party/source-data terms; do not imply all cited source material is relicensed. | License/provenance audit note with file-level evidence. |
| C2U-006 | P1 | Verify release reproducibility and tags. Current package version is 0.1.0; no release/tag/Zenodo evidence checked yet. | TODO | C2U-002, C2U-004, C2U-005 | A version can be rebuilt from a clean checkout; release notes describe scope and limitations; no claim of release/DOI until confirmed. | Reproducibility transcript, tag/release URL if created, artifact checksum. |
| C2U-007 | P1 | Confirm methodology/source links and public limitations remain consistent with the implementation. Audits contain settled choices and caveats; runtime test results are not yet observed. | IN_PROGRESS | C2U-002, C2U-003 | No unsupported universal narrow-IPA claim; neutral tone, tone sandhi, polyphony and Ukrainian-system independence explained accurately. | Source files, relevant tests, manual review record. |
| C2U-008 | P1 | Audit 421-row CSV and all source-specific blanks/edge keys. README records one blank per Kirnosova column for `ten` and 10 NANU blanks; do not fill from other systems. | TODO | C2U-002 | Current validation counts match source; no silent cross-system fallback; edge keys `ten`, `yo`, standalone `o` reviewed against primary evidence or explicitly left unresolved. | Validator output, data diff, regression fixtures and provenance note. |
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
1. Obtain or create a local checkout with the repository's current `main` and Node.js >=22.12.0.
2. Run in order: `npm ci`; `npm run validate:data`; `npm run generate:data`; `npm test`; `npm run build`; `npm run check:release`; `npm run benchmark`; install Chromium if needed and run `npm run test:browser`.
3. Capture outcomes and investigate failures before changing application behavior.
4. Verify the live Pages URL and methodology page; locate the actual Pages workflow configuration.
5. Confirm project author/citation metadata with repository evidence before creating `CITATION.cff`.
