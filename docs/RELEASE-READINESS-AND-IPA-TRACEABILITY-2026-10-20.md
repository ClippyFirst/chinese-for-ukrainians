# Release-readiness and IPA traceability audit — 2026-10-20

**Audit baseline:** `main` at `69cb29ffcdf53fc67f3d08609613b08d92d3e6a4`  
**Repository:** https://github.com/ClippyFirst/chinese-for-ukrainians  
**Scope:** current release gates, PR #5 comparison, conversion data flow, independent validation, source rights and publication metadata.  
**Decision:** keep the existing **public beta / research preview** label. Do not create a GitHub Release or DOI from this audit.

## 1. Main, pull request, and CI evidence

### Main at the audit baseline

- Main SHA: [`69cb29f`](https://github.com/ClippyFirst/chinese-for-ukrainians/commit/69cb29ffcdf53fc67f3d08609613b08d92d3e6a4).
- Quality workflow succeeded on that exact SHA: [run 39484629325](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39484629325). Job steps report success for unit/integration tests, acoustic-pipeline input guards, production build, release constraints, browser installation, and browser regression tests.
- GitHub Pages deployment succeeded on that exact SHA: [run 39484629491](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39484629491).
- These are GitHub-hosted workflow results. A separate local test transcript and manual production-browser/mobile inspection were not obtained in this pass.

### Open PR #5

[PR #5](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/5) is an old, open UI redesign PR. Its head is `b8c65587822e7b466d05964eef5b412a115eba83`, base is `665cfa6a5f7a9fe4a0c916ff6d81f96fbd4c6ad3`; GitHub reports `mergeable_state=dirty` / `mergeable=false`. It changes only `index.html`, `src/app/ui.js`, `src/styles/main.css`, and a browser test. It has no review comments in the retrieved PR discussion.

**Recommendation: do not merge PR #5 as part of release-readiness work.** It is not a phonetic validation change, it is based on an older tree, and the stylesheet is collapsed to one line, making review and maintenance harder. The PR's version of `index.html` has no `#result-ipa` element, whereas current `main`'s `src/app/ui.js` queries and writes `#result-ipa`. That mismatch is not a proven failure of a future merge result, because the PR currently conflicts with main and has not been merged; it is a concrete reconciliation requirement if anyone rebases or cherry-picks its markup.

## 2. Conversion chain and provenance per output

The current implementation has a layered chain; the layers must not be described as though all outputs derive from IPA.

1. **Input segmentation:** `src/app/scanner.js` separates Han-script runs from other text. Punctuation, Latin text and emoji remain in text spans. It recognises the listed CJK ranges, including supplementary Han ranges, but it does not itself segment Chinese words.
2. **Script choice:** `src/app/detector.js` uses a finite traditional-to-simplified dictionary. Auto mode chooses the traditional pronunciation dictionary when the text is detected as traditional or mixed; undetermined/shared-only text falls back to the simplified dictionary. Detection is heuristic, not proof of a text's intended orthographic standard.
3. **Pinyin and tones:** `src/app/pronunciation.js` sends each Han run to pinned `pinyin-pro@3.29.4` with `type: 'all'`, symbol tones, and `segmentit: 2`. The engine's selected reading is used; alternatives are retained as metadata but are not independent evidence that context-sensitive reading is correct. The Traditional dictionary package is `@pinyin-pro/data@1.3.1`.
4. **Pinyin display:** `src/app/pinyin.js` normalizes tone-marked or numbered syllables and renders Hanyu Pinyin with or without lexical tone marks.
5. **Broad IPA:** `src/app/ipa.js` maps the selected Pinyin syllable to the project's finite broad practical IPA convention and appends lexical/citation-form tone contours. This is a convention-based mapping, not acoustic measurement, speaker-specific narrow IPA, or a general phonology engine. Neutral tone receives no fixed contour; tone sandhi and connected-speech effects are not applied. Unsupported forms produce a visible `⟦IPA:…⟧` marker.
6. **Ukrainian systems:** `src/app/transcribe.js` looks up the **base Pinyin key** in generated mappings from `zh-in-ua.csv` for each system independently, then applies Ukrainian tone marks from the Pinyin tone number. The three Ukrainian outputs are **not generated from the IPA output**. Their evidence comes from the source-specific Ukrainian mapping inventory and its literature/official-table provenance. A missing or unknown mapping is not filled from another system; the source Han character is preserved and an issue is reported.

### Consequences

- The broad-IPA output is a parallel diagnostic/representation layer; it is not the intermediate transliteration used to produce the three Ukrainian outputs.
- Tests of the 403-key University of Washington inventory establish mapping coverage and stable output against a chosen convention. Literal string differences from the source chart are not an accuracy score, and tests that assert the implementation's own chosen strings are regression tests rather than independent linguistic validation.
- `zh-in-ua.csv` has 421 data rows and 421 unique normalized Pinyin keys at the baseline. The existing blank values are source gaps, not invitations to infer an output. The three Ukrainian columns are distinct methods and remain independent.

## 3. Validation evidence and gaps

| Layer | Evidence present | What it proves | Remaining gap |
|---|---|---|---|
| Pinyin + lexical tones | Integration tests use the pinned real engine for `银行`, `重庆`, `音乐`, `长大`, plus Traditional `銀行`. This audit adds a source-linked independent lexical fixture (see below). | Engine behavior is reproducible for the tested phrases and version. | Six lexical cases are a small smoke corpus, not a representative accuracy benchmark. Names, rare/domain words, alternate readings and context-dependent polyphony need more independent coverage. |
| Broad IPA | 403-key UW reference inventory, a generated differential, source ledger, class-by-class adjudication, tone and edge-case tests. | Inventory coverage and conformance to the project's documented convention. | No universal narrow-IPA gold standard; some notation classes are convention-sensitive; no speaker-specific acoustic validation is claimed. |
| Ukrainian output — Kirnosova | Canonical CSV, 2009 paper/source inventory, source ledger and regression tests. | The program preserves the current authored table values and applies them deterministically. | Full visual row-by-row collation against the source PDF is still open because OCR/extracted table text is unreliable. |
| Ukrainian output — Kirnosova–Tsisar | Separate CSV column; 2019 proceedings article describes system principles. | The implementation preserves the separate method and its current values. | The 2019 article describes principles; it is not a 421-key table certifying every cell. Row-level source citations are incomplete. |
| Ukrainian output — NANU | Separate CSV column; official ASTKS table/source inventory comparison. | The implementation preserves the NANU values and source-specific missing keys. | Full row-by-row review and reuse-rights review remain incomplete. |
| Ambiguous / unknown cases | Polyphonic alternatives retained; unresolved IPA markers; missing mapping issues; no cross-column fallback; explicit blank-cell tests. | Known unsupported/missing values are surfaced rather than silently fabricated. | The selected Pinyin reading can still be wrong for a name, rare word or context; issue reporting is not a substitute for a full disambiguation model. |
| UI and deployment | Browser CI and Pages deploy pass at baseline SHA. | Automated browser regressions and deployment job passed. | Manual live-site inspection, keyboard/accessibility review and production mobile smoke test are not evidenced in this audit. |

### Independent Pinyin fixture added during this audit

Added `tests/fixtures/independent-pinyin-cases.csv` and `tests/independent-pinyin-corpus.test.mjs`. The six cases are sourced to individual Han Dian (zdic.net) lexical entries and cover simplified/traditional `银行/銀行`, place name `重庆`, `音乐`, polyphonic `长大`, and the longer institutional name `中国农业银行`. This corpus is separate from `zh-in-ua.csv` and tests actual pinned-engine output. The fixture deliberately records the selected sense for `长大`; the source also lists an alternate reading. The isolated-character test does not claim that the engine's chosen reading is the only valid reading.

Sources: [银行](https://zdic.net/hans/%E9%93%B6%E8%A1%8C), [銀行](https://zdic.net/hans/%E9%8A%80%E8%A1%8C), [重庆](https://zdic.net/hans/%E9%87%8D%E6%85%B6), [音乐](https://zdic.net/hans/%E9%9F%B3%E4%B9%90), [长大](https://zdic.net/hans/%E9%95%BF%E5%A4%A7), [中国农业银行](https://zdic.net/hans/%E4%B8%AD%E5%9B%BD%E5%86%9C%E4%B8%9A%E9%93%B6%E8%A1%8C). The test run for the newly added corpus must be checked on the new main SHA before treating it as passing.

## 4. Release checklist status

| Requirement | Status | Evidence / next action |
|---|---|---|
| CSV structure, duplicate keys and generated mappings | **Pass at baseline** | `npm run build` passed and includes data validation + generation. A generated-file drift check is not currently a dedicated CI step. |
| Unit/integration tests | **Pass at baseline; new corpus pending CI** | [Quality run 39484629325](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39484629325). |
| Production build and release constraints | **Pass at baseline** | Same Quality run. |
| Browser regression tests | **Pass at baseline** | Workflow runs Chromium and iPhone 13 mobile projects; same Quality run. Manual production visual QA remains open. |
| Benchmark | **Not evidenced as run** | `npm run benchmark` is listed in the checklist but is not a step in the current workflow. |
| Public site deployment | **Pass at baseline** | [Deploy run 39484629491](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39484629491). Live manual smoke test remains open. |
| Package dependency lock reproducibility | **Blocker for a reproducible install** | `package-lock.json` currently contains an empty `packages` object despite pinned dependencies in `package.json`; CI uses `npm install`, not `npm ci`. Regenerate and commit a complete lockfile in an environment with npm access, then verify `npm ci`. Do not switch CI to `npm ci` before the lockfile is repaired. |
| License / source rights | **Partial; not cleared** | Root MIT license is present, but it does not license all third-party data. Dependency and source-table license/notice review remains open. |
| `CITATION.cff` | **Not present; author metadata unresolved** | Repository/package title and URL are known, but author identity/attribution cannot be safely inferred from the copyright line alone. Ask the maintainer or use verified public authorship metadata before creating it. No DOI is required to add a correct citation file. |
| Stable release / DOI | **Not approved** | Do not create a GitHub Release or DOI until lockfile reproducibility, rights review, current-SHA CI, and manual production QA are addressed. Continue public beta / research preview. |

## 5. License and attribution

- Root `LICENSE` declares MIT with copyright notice `Copyright (c) 2026 The Clippy First`. This does not establish that every CSV value, source table, article excerpt, or linked resource can be redistributed under MIT.
- `package.json` pins `pinyin-pro@3.29.4` and `@pinyin-pro/data@1.3.1`. Keep their upstream notices and verify each package's published license metadata and distribution obligations before bundling a stable release.
- The citation ledger is provenance evidence, not a rights grant. The existing `docs/LICENSE-AND-DATA-PROVENANCE.md` correctly treats rights clearance as incomplete.
- No `CITATION.cff` was found at the repository root. Do not invent author names or ORCID identifiers. The package is marked `private: true` in `package.json`; this is npm package-publication metadata, not GitHub repository privacy, and should be revisited only if npm publishing is intended.

## 6. Release gate and remaining work

### Required before calling a release reproducible

1. Repair `package-lock.json` with a full lock generated by npm for the pinned dependencies; commit it and verify clean `npm ci` plus the complete workflow.
2. Re-check CI on the exact current `main` SHA after this audit's new tests/docs land.
3. Add a generated-output drift check and run `npm run benchmark` if retaining both as pre-release checklist requirements; alternatively explicitly downgrade the benchmark to informational in the checklist.
4. Perform a manual production smoke test of home and methodology pages, including 320/360/390/430px widths, keyboard/focus behavior, copy controls, and issue display.
5. Continue rights/attribution review for both upstream npm packages and reproduced source data/tables. Keep the scope note until resolved.
6. Ask the maintainer to confirm author attribution before creating `CITATION.cff`.

### Scientific and linguistic limits to keep visible

- Pinyin is an engine-selected lexical reading, not a guarantee of the intended reading for every polyphonic character, proper name, rare word, or domain-specific term.
- IPA is the project's literature-based broad convention, not universal narrow IPA or a measured surface pronunciation. Neutral tone has no universal fixed contour; tone sandhi, erhua inference, prosody and connected speech are not fully modelled.
- The three Ukrainian outputs are independent source-specific methods keyed from Pinyin, not a single IPA-to-Ukrainian pipeline and not a ranking of quality.
- Row-level evidence is incomplete for the three Ukrainian inventories; keep missing values explicit and preserve disagreements.
- CI proves the tested implementation is consistent with fixtures and build constraints, not that every linguistic output is correct.

**Release decision:** public beta / research preview remains appropriate. No GitHub Release, DOI, “fully validated”, “official converter”, or universal phonetic accuracy claim is justified by the current evidence.
