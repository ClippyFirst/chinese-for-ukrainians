# Open research gates: PyPI naming and independent linguistic gold data

**Date:** 2026-11-08  
**Scope:** record evidence and next acceptance gates; this note does not claim that any remaining research or human QA has passed.

## 1. PyPI distribution name

### Current metadata

- Distribution name in python/pyproject.toml: `chinese-ukrainian-transcription`.
- Import package: `zhua`.
- CLI command: `chuktrans`.
- Previously probed alternative: `chuktrans`.
- CI queried the PyPI JSON endpoints for both candidate names and received HTTP 404 / no public project JSON at that time. A 404 is not proof that a name is claimable: registry policy, reserved names, pending ownership, and name-normalization rules can affect claimability.

### Recommendation

Keep `chinese-ukrainian-transcription` as the preferred distribution name because it is descriptive and matches the package's declared purpose. Keep `chuktrans` as the short CLI command, not necessarily the distribution name. This is a recommendation, not an owner decision and not a claim that the name is available.

### Acceptance gate before publication

1. Maintainer explicitly confirms the preferred public distribution name.
2. Check the exact normalized project name in PyPI's current project-creation/claimability flow while authenticated as the publishing owner; an anonymous JSON 404 is insufficient.
3. Confirm the account/organization that will own the project and configure trusted publishing or credentials.
4. Verify metadata, README rendering, license files, dependency declarations and built artifacts one final time.
5. Publish only after explicit owner authorization. No package has been published in this work.

**Status: BLOCKED** on owner confirmation and authenticated registry claimability check. Do not rename the package speculatively or publish.

## 2. Independent linguistic gold corpus

### Existing evidence that can be reused

- `tests/fixtures/independent-pinyin-cases.csv` contains six Han Dian lexical cases: 银行, 銀行, 重庆, 音乐, 长大, 中国农业银行.
- The cases have individual dictionary URLs and intended reading/sense notes. They are valuable source-backed smoke tests for selected Pinyin phrase readings.
- The shared JS/Python golden fixture contains 12 cases and verifies deterministic cross-runtime behavior for Pinyin, broad IPA, and the three Ukrainian outputs.

### What these cases do not establish

- Six lexical examples are not a representative or statistically meaningful held-out set.
- The shared 12-case fixture partly measures implementation parity; it is not independent ground truth for IPA or Ukrainian output.
- A Han Dian lexical pronunciation entry can support Pinyin reading and sense, but does not automatically certify the project's broad IPA convention or any Ukrainian transcription method.
- The canonical owner-authored `zh-in-ua.csv` is the source table for the three Ukrainian systems; scoring the runtime against the same table is reproduction/coverage, not independent accuracy.
- The 403-entry UW syllable reference is a source snapshot and notation comparison, not universal phonetic truth or acoustic validation.

### Corpus construction contract

Keep separate, independently adjudicated partitions for:

1. **Pinyin G2P:** phrase-level and polyphone readings with exact source span, sense, script, lexical tone, alternate readings, source locator, evidence scope and reviewer.
2. **Broad IPA:** only entries whose target variety and transcription depth are declared and whose segmental representation is independently supported or explicitly adopted as a project convention. Record accepted variants and unresolved cases; do not turn orthographic notation differences into automatic errors.
3. **Ukrainian systems:** independently collate each target method against its primary publication/table. Keep Kirnosova, Kirnosova–Tsisar and NANU separate. Store page/table/row locator, exact source value, reviewer, rights/reuse note and adjudication status.

Each row must contain exact input and target span, intended reading/sense, expected output for only the layer it actually supports, source URL/bibliographic locator, verbatim short evidence locator, source scope, target variety, transcription convention, reviewer, review date, license/reuse status and status. Use statuses `CANDIDATE`, `SOURCE_VERIFIED`, `INDEPENDENTLY_REVIEWED`, `DISPUTED`, `UNRESOLVED`, `NOT_REUSABLE`. Do not put candidate or disputed rows in held-out scoring.

### Required acceptance before benchmark scoring

- At least two independent reviewers for disputed/high-impact cases, with adjudication recorded.
- Separate development and locked held-out sets; no tuning against held-out labels.
- A phenomenon-balanced inventory: common and rare syllables, polyphones, names, Simplified/Traditional variants, neutral tone, tone sandhi boundary cases, interjections, unsupported forms and punctuation/code-switching.
- Raw predictions, exact engine/model/dependency versions, checksums, environment manifest, scoring scripts and per-row error classifications committed alongside aggregate metrics.
- Explicit abstention and coverage metrics; no invented fallback output.
- Source licensing and quotation/reuse scope checked before redistribution.

### Current task status

- Pinyin independent lexical smoke fixture: **PARTIAL / DONE for its six scoped readings only**.
- Representative held-out Pinyin corpus: **TODO**.
- Independent broad-IPA gold corpus: **TODO / evidence-limited**; acoustic audio is not a mandatory gate by itself, but published notation and phonetic evidence must directly support the exact convention and scope.
- Independently collated Ukrainian gold rows: **TODO / evidence-limited**; primary-table page/row collation and rights notes are required.
- Head-to-head G2P/IPA benchmark: **BLOCKED** until the relevant layer-specific gold partitions and reproducible candidate environments exist.

Do not claim an accuracy percentage, a winner, or that the project is more accurate than competing engines from the current fixtures.

## 3. Manual accessibility and physical-device QA

The repeatable test matrix and task script are maintained in [ACCESSIBILITY-MANUAL-QA-PROTOCOL.md](../ACCESSIBILITY-MANUAL-QA-PROTOCOL.md). Automated browser checks and screenshot review are not manual sign-off. Required real-device coverage includes NVDA, VoiceOver, TalkBack, keyboard-only operation, actual clipboard permissions, zoom/text enlargement, and physical mobile speech output.

**Status: BLOCKED** pending a human-operated session. The protocol is prepared; no manual pass is claimed.
