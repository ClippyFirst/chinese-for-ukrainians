# Repository structure and documentation policy

This document defines where code, canonical data, generated artifacts, research evidence and operational records belong. It is a navigation contract, not a request to move files merely for visual neatness.

## Current repository shape

```text
/
├── .github/workflows/       # CI, Pages deployment and isolated research benchmark
├── docs/
│   ├── audits/current/      # one current master register, handoff and active audit snapshots
│   ├── superpowers/
│   │   ├── decisions/       # durable technical decisions
│   │   ├── plans/           # executable implementation plans
│   │   └── specs/           # design specifications
│   └── *.md, *.csv          # canonical product, data, release and research documentation
├── research/
│   └── ipa-acoustic/        # acoustic measurement protocol and research-only scripts
├── scripts/                 # generators, validators, release checks and benchmark tools
├── src/
│   ├── app/                 # browser application and conversion orchestration
│   ├── data/                # source CSV loading and IPA-keyed adapters
│   ├── generated/           # generated mapping artifacts; do not hand-edit
│   └── styles/              # browser styles
├── tests/
│   ├── browser/             # Playwright end-to-end/browser regressions
│   ├── data/                # CSV and adapter invariants
│   └── fixtures/            # reviewed test/reference data with evidence labels
├── zh-in-ua.csv             # canonical editable Ukrainian mapping source
├── index.html               # converter entry
├── methodology.html         # methodology entry
├── package.json / package-lock.json
└── README.md
```

## Target extension for the Python distribution

The Python package belongs in a separate `python/` project subtree, not mixed into the browser runtime:

```text
python/
├── pyproject.toml
├── README.md
├── src/zhua/                # importable package
│   ├── api.py
│   ├── models.py
│   ├── scanner.py
│   ├── pinyin.py
│   ├── ipa.py
│   ├── mappings.py
│   ├── tones.py
│   ├── cli.py
│   └── data/zh-in-ua.csv    # generated package-data copy
└── tests/
```

This subtree does not yet exist. Add it only with the Python implementation batch, tests and CI—not as empty directories or placeholder files.

## Source-of-truth hierarchy

| Artifact | Authority | Editing rule |
|---|---|---|
| `zh-in-ua.csv` | Canonical Ukrainian-system values | Human-reviewed source edits only; cite/provenance each changed value |
| `src/generated/transcription-map.js` | Browser-generated mapping | Never edit manually; regenerate and verify no drift |
| `python/src/zhua/data/zh-in-ua.csv` | Future wheel package-data copy | Generated from root CSV; byte-for-byte drift check |
| `src/app/ipa.js` | Current broad-IPA JS behavior | Port to Python with explicit parity tests; no independent linguistic reinterpretation |
| Research CSVs and source ledger | Evidence and scope of claims | Preserve provenance, evidence class and unresolved states |
| `docs/audits/current/MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md` | Canonical task/status register | Update in place with exact evidence and blockers |
| `docs/audits/current/CHAT-HANDOFF.md` | Current continuation context | Update in place; link to master register |
| `docs/INDEX.md` | Canonical documentation navigation | Every maintained public document must be linked or deliberately classified as internal/historical |

## Documentation layers

1. **README** — short project identity, user-facing scope, quick start, status and links.
2. **User guide** — how to operate the existing website; do not duplicate it in the README.
3. **Product requirements** — externally visible behavior and non-goals.
4. **Architecture** — actual runtime flow and module ownership; distinguish shipped behavior from planned extensions.
5. **Data specification and provenance** — canonical files, schemas, licenses, missing values and evidence boundaries.
6. **Research records** — dated source audits and decisions; retain them as historical evidence.
7. **Master register** — only place for current task status and acceptance evidence.
8. **Handoff** — concise latest state, commands, exact SHA, and next blocker.
9. **Implementation plans** — task-by-task tests and commands; do not create competing roadmaps.

## Rules for changes

- Do not move or rename files just to make the tree look cleaner. First update all imports, scripts, workflows, links and generators in the same atomic change.
- Do not duplicate canonical CSVs as hand-maintained sources. Package copies are generated artifacts with deterministic drift checks.
- Do not put raw research evidence in runtime modules or runtime dependencies in research-only folders.
- Do not mark a test as passed because it exists. Record the exact command or exact-head CI run.
- Distinguish current, planned, experimental, unsupported and deferred features in every public architecture description.
- Keep the browser app static and private-by-default; the Python package is an offline library/CLI, not a backend.
- Do not claim linguistic certification from code parity or structural coverage tests.
- Keep dated audits immutable unless a correction is needed; record supersession explicitly instead of silently rewriting the historical finding.

## External engineering references reviewed

These repositories are references for workflow and structure, not code to copy:

- [Leonxlnx/unlazy](https://github.com/Leonxlnx/unlazy): acceptance ledgers, runnable gates, evidence re-verification and honest handoff of unmet gates.
- [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): separation of source-of-truth assets from generated/synchronized assets and verification steps.
- [obra/superpowers](https://github.com/obra/superpowers): explicit design → plan → test-first implementation → verification workflow.
- [mattpocock/skills](https://github.com/mattpocock/skills): focused reusable engineering workflows with clear triggers and scope.
- [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail): proportionate tests and explicit reporting of work not checked.

No source files, skill code or third-party assets from these projects are copied into this repository.
