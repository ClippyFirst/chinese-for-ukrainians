# Regional romanization research — 2026-10-28

## Scope

Languages requested: Khmer (km), Lao (lo), Burmese/Myanmar (my), Sinhala (si). The site is a static, local-only Vite/GitHub Pages application; the current Content Security Policy explicitly disables network connections. Python packages cannot be invoked from the browser without a port, WASM/runtime or backend.

## Repository candidates

| Language | Candidate | Observed capability | License / integration note |
|---|---|---|---|
| Khmer | https://www.npmjs.com/package/@gmana/km-translit (0.1.2) | Browser-compatible JavaScript syllable-aware Khmer-to-Latin and reverse conversion; examples include `ភ្នំពេញ` → `Phnom Penh` | MIT; integrated as a pinned npm dependency. Its ASCII output is explicitly BGN/PCGN-derived, not a conformant BGN/PCGN implementation. `maohieng/khmerphonemizer` (linked as the upstream project in its README) is available as an MIT-licensed Python G2P engine, but it is not browser-ready: it depends on `khmercut` and `sosap` and ships a 35,245,639-byte `g2p.fst` plus a 2,162,286-byte `km_lexicon.tsv`; no compatible JS/WASM runtime was found during this pass |
| Lao | https://github.com/byu-matrix-lab/lao2ipa | Python rule-based syllabification, IPA and Ministry of Health (MoH 2020) romanization | Apache-2.0; port all rule tables and tests before claiming parity |
| Burmese | https://github.com/myanmaropenwordnet/mya2rom | JavaScript: IPA, MLCTS, modified MLCTS, Simple and Simple2 | CC-BY-SA-4.0; vendored source, full license and attribution/change notice included |
| Burmese alternative | https://github.com/trhura/python-myanmar | Python romanizer, BGN/PCGN, MLCTS and IPA | MIT; Python-only |
| Sinhala | https://github.com/sinhala-soft/sinhala-text-converters | JavaScript Sinhala Unicode → Singlish romanizer | MIT; integrated, UCSC/Sinhala Soft attribution retained |\n| Sinhala IPA candidate | https://github.com/RootCode-AI/voicelk_ml | Python G2P with consonant/vowel inventories, domain lexicon and schwa-reduction rules | MIT code; browser rule-port integrated without Python tokenizer or domain lexicon. Output is provisional and requires independent validation |
| Sinhala direction mismatch | https://github.com/savi664/sin_transliterator | Neural Singlish-to-Sinhala reverse transliteration | Not a direct Sinhala-script-to-Latin romanizer |

## Current implementation status

The new page separates these scripts from the Chinese converter's IPA-keyed Ukrainian mapping pipeline. Khmer now uses the upstream `@gmana/km-translit` 0.1.2 JavaScript package for syllable-aware Latin romanization; its IPA field is deliberately unavailable because this package is a romanizer, not a phonological engine. Sinhala uses upstream Sinhala Text Converters for Unicode Sinhala → Singlish, plus a conservative browser rule-port based on VoiceLK ML's MIT-licensed Sinhala G2P mappings and schwa rules. The port intentionally excludes the Python tokenizer and domain lexicon; its IPA is a research candidate, not validated parity. Attribution and upstream MIT license are retained under `vendor/voicelk-g2p/`. Burmese loads upstream Mya2Rom 0.4.4 locally and uses its `mlcts2` and `ipa` modes. The Mya2Rom source, full CC-BY-SA-4.0 license and attribution/change notice are kept under `vendor/mya2rom/`. Lao now uses a partial browser rule-port based on `lao2ipa` for MoH-style Latin output and IPA with tone contours. This port is deliberately labeled partial and does not reproduce all upstream orthographic rewrites.

**This is not a complete four-language implementation.** Khmer has an upstream romanizer but no IPA engine. Lao and Sinhala have partial browser rule-ports, not complete phonological engines; syllabification, consonant classes, tone, context-sensitive sound changes, lexical exceptions and/or upstream model components remain incomplete. Burmese uses the actual upstream Mya2Rom engine, but its upstream README describes it as a simple script and its simplified systems as work in progress; outputs still need independent source-backed validation. Current results must not be represented as independently verified or universally normative.

## Acceptance criteria for full integration

1. Port or package one reviewed upstream engine per language for browser use, preserving attribution and licenses.
2. Use one inspectable phonetic representation as the source of both IPA and pronunciation-based romanization where supported; distinguish orthographic standards (MLCTS, MoH 2020) from pronunciation transcription.
3. Add source-backed examples and independent expected outputs per language with source URL, rule environment, license and scope.
4. Test Unicode combining sequences, punctuation, unknown input, tone/length, script detection and copy controls.
5. Run unit/browser/accessibility/build/release checks on exact PR head.
6. Update the master execution plan only after acceptance checks are run. Current status: PARTIAL / research preview.


## Verification follow-up — 2026-10-28

Quality run [40737082982](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40737082982) passed on commit `c7028d4a291edd61800e1534b7cbbf746cb2960f`, including unit/integration tests, production build, deterministic generated mappings, benchmark, release checks and browser regression tests. This evidence predates the follow-up commits; the latest head must be rerun.

At this earlier point in the development sequence—before the later Lao and Sinhala rule-port integrations—a correctness fix withheld IPA for Khmer, Lao and Sinhala because the then-current grapheme tables were not reviewed phonological engines. The later sections below record subsequent partial rule-port integrations for Lao and Sinhala. Those later ports generate explicitly provisional IPA candidates; they do not establish full phonological coverage or independent linguistic validation. Khmer still has no integrated IPA engine. Burmese continues to use the separate upstream Mya2Rom MLCTS2 and IPA modes; MLCTS2 is not claimed to derive from IPA.

Research sources rechecked: `seanghay/khmerphonemizer` is an MIT Python G2P engine; `byu-matrix-lab/lao2ipa` is a Python syllable-based Lao-to-IPA and romanization engine; `byu-matrix-lab/sea-transliteration-mnmt` publishes Khmer/Lao/Thai parallel character mappings but this review did not establish a license grant for that mapping repository, so it is not vendored; SinEn advertises Sinhala-to-Latin conversion but its implementation and data provenance require audit. Sources: https://github.com/seanghay/khmerphonemizer ; https://github.com/byu-matrix-lab/lao2ipa ; https://github.com/byu-matrix-lab/sea-transliteration-mnmt ; https://github.com/skyprolk/SinEn-Natural-Language-Tool_Kit .

Historical task status at that point in the sequence: regional page/navigation = DONE_VERIFIED on `c7028d4` only; Burmese integration = PARTIAL pending then-current CI and independent review; Khmer and Lao phonological engines = TODO pending browser-compatible ports and source-backed fixtures; Sinhala engine = BLOCKED pending provenance review; Khmer/Lao/Sinhala IPA = DEFERRED until reviewed engines existed; exact-head CI after that follow-up = TODO; independent gold corpus = BLOCKED pending source-backed linguistic review. This snapshot is superseded by the later integration and verification notes below; use the final status section at the end of this document for the current ledger.


## Further browser-compatible candidate discovery — 2026-10-28

A second search pass found additional options that should be evaluated before choosing ports:

- Khmer: [@gmana/km-translit 0.1.2](https://www.npmjs.com/package/@gmana/km-translit) is a dependency-free JavaScript/TypeScript package with syllable-aware Khmer-to-Latin and reverse conversion. It describes its output as a BGN/PCGN-1972-derived ASCII profile, explicitly **not a fully conformant implementation** because diacritics are dropped. Its published package license is MIT. This is a stronger browser-native romanization candidate than the provisional hand-written table, but exact source/release provenance, tests, and rule behavior must be checked before vendoring or replacing the current adapter.
- Sinhala: [@suhasdissa/singlish](https://github.com/SuhasDissa/singlish) is a browser-usable JavaScript/Node implementation for Sinhala Unicode → romanized Singlish, with a documented 150-case test suite. It is GPL-3.0 and describes phonetic limitations (including consonant-cluster cases); do not vendor it until the repository's licensing situation and integration obligations are explicitly resolved. The existing SinEn Apache-2.0 candidate still needs source/data provenance audit.
- Lao: [LaoNLP](https://github.com/wannaphong/LaoNLP) is Apache-2.0 and has recent IPA romanization and MoH 2020 romanization work, but remains Python-based. [Laonetics](https://github.com/ltruchot/laonetics) offers JavaScript/TypeScript syllable segmentation and English/French/IPA outputs, but is CC-BY-NC-4.0 and appears substantially older; it is not integrated because the non-commercial restriction and linguistic quality need review. The Apache-2.0 Python [lao2ipa](https://github.com/byu-matrix-lab/lao2ipa) remains the leading candidate for an IPA-first port.

These are candidate evaluations, not integrations or independent accuracy findings. No new upstream code or mapping data was copied from these projects in this follow-up. In particular, no per-character table should be promoted to phonological IPA merely because a source labels a field “IPA”.


## Sinhala engine integration update — 2026-10-28

The page now locally integrates `sinhala-soft/sinhala-text-converters` 1.0.5 for Sinhala Unicode → Singlish. The upstream MIT license and notice are included under `vendor/sinhala-text-converters/` and published under `public/vendor/sinhala-text-converters/`. The browser module is a narrow TypeScript-to-ES-module adaptation of upstream `unicode-to-singlish.ts` and `constants.ts`; TypeScript-only syntax/imports were removed, and the upstream transformation logic was otherwise retained. Attribution is preserved: the upstream README credits the Language Technology Research Laboratory, University of Colombo School of Computing (UCSC), and Sinhala Soft Foundation as maintainer. Source: https://github.com/sinhala-soft/sinhala-text-converters

The Playwright suite verifies the upstream README example `ආයුබෝවන්` → `aayubowan` and the browser-side IPA port against six expected vectors documented in VoiceLK ML's `tests/test_frontend.py`: `කරනවා` → `karənəʋaː`, `පුළුවන්` → `puɭuʋan`, `කරන්න` → `karannə`, `ධර්මය` → `d̪arməjə`, `සිංහල` → `siŋhələ`, and `කෘතිම` → `krut̪imə`. Exact-head Quality CI [40751705599](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40751705599) passed with these fixtures. This validates implementation parity for the listed cases only, not independent linguistic correctness; Sinhala remains PARTIAL pending broader source-backed coverage and independent review.


## Required end-to-end order — 2026-10-28

The site-wide regional-language contract is **romanization → IPA → Ukrainian transcription**. The page now renders three result cards in that exact order. The Ukrainian candidate is derived only from IPA; it does not independently map source-script characters or reuse romanization. The adapter maps recognized IPA segments and preserves unsupported symbols, tones, and diacritics as visible bracketed markers. This is a conservative candidate, not a validated language-specific standard.

Acceptance remains PARTIAL: Burmese Mya2Rom supplies separate MLCTS2 and IPA modes, but these parallel outputs do not prove that MLCTS2 was derived from IPA. Sinhala Text Converters supplies romanization only. Khmer and Lao still use provisional Latin candidates. IPA and an IPA-derived Ukrainian candidate remain unavailable for Khmer, Lao, and Sinhala until suitable phonological engines are integrated. The user-visible order is implemented, but complete four-language end-to-end output is not.


## Khmer romanizer integration — 2026-10-28

Integrated `@gmana/km-translit@0.1.2` as a pinned production dependency. Browser regression coverage checks the upstream README example `ភ្នំពេញ` → `Phnom Penh`, confirms the engine status is displayed, and verifies that no IPA or Ukrainian candidate is fabricated. The package is MIT-licensed and dependency-free. Its own documentation explicitly says its ASCII output drops BGN/PCGN diacritics, so the UI calls it BGN/PCGN-derived rather than a conformant implementation. The exact branch head must pass clean-install CI; package-lock reproducibility is not considered verified until `npm ci` passes.


## Sinhala IPA rule-port integration — 2026-10-28

Added `src/app/sinhala-ipa.js`, a browser-side adaptation of the Sinhala consonant/vowel/modifier inventory and inherent-vowel reduction logic from `RootCode-AI/voicelk_ml` (`model_engine/g2p.py`). The upstream project is MIT-licensed; its license and adaptation notice are retained in `vendor/voicelk-g2p/`. This port does not include `sinling` tokenization, the domain lexicon, mixed-language routing or the full VoiceLK service. The fixture `ආයුබෝවන්` → `aːjuboːʋan` is a deterministic regression test of the port, not independent evidence that every IPA form is correct. The output warning explicitly describes the port as provisional. Acceptance still requires independent Sinhala source-backed fixtures and linguistic review.


## Lao browser rule-port — 2026-10-28

Added `src/app/lao-ipa.js`, a conservative browser-side port of selected consonant/vowel mappings, common syllable segmentation and tone-class rules from `byu-matrix-lab/lao2ipa` (Apache-2.0). The upstream license and scope notice are preserved in `vendor/lao2ipa/`. It is not equivalent to the full upstream Python engine: uncommon clusters, special orthographic rewrites and some tone-mark placements remain unsupported. Browser fixtures cover `ສະບາຍດີ` and `ກາ`, including explicit tone preservation in the Ukrainian candidate. These fixtures prove current deterministic behavior only; the output remains provisional pending exact upstream-vector parity and independent Lao review.


## Upstream vector expansion and Khmer engine feasibility — 2026-10-28

- Added 28 Lao IPA regression vectors derived from `byu-matrix-lab/lao2ipa/tests/test_transliterate.py`, whose expected forms are described there as Vientiane IPA values sourced from Wiktionary; the suite normalizes punctuation, glottal-stop notation and tone-contour separators to compare the phonetic sequence. These are upstream-derived regression checks, not a claim of full parity with the upstream engine.
- The added vector exposed a contextual vowel issue in `ຄວາມ`: upstream rules treat `ວາ` as a vowel sequence rather than always consuming `ຄວ` as an onset. The browser port now has a `ວາ` vowel entry and avoids the cluster in that context, including when a Lao tone mark is written between `ວ` and `າ`. The expanded cases also cover preposed vowels, checked codas, common clusters and tone-marked forms.
- Added six Sinhala IPA regression vectors from VoiceLK ML's MIT-licensed test file, in addition to the upstream Singlish example.
- Exact executable-code head `33c61761280cbbe8e20c8a896354cb3b28f10062` passed Quality CI [40751705599](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40751705599): **83 browser tests passed, 1 skipped**; unit/integration, production build, generated-data determinism, benchmarks and release constraints passed.
- Khmer G2P feasibility: the MIT-licensed `maohieng/khmerphonemizer` README demonstrates a Python FST-based grapheme-to-phoneme model and word lexicon. Repository metadata shows `g2p.fst` is about 35.2 MB and `km_lexicon.tsv` about 2.16 MB; dependencies are `khmercut` and `sosap`. This is not a drop-in static-browser component. A server/WASM/JS adaptation, its payload/performance impact, and a review of the phoneme inventory's conversion to canonical IPA are still required. We have not silently treated its output as standard IPA.

## Current task status

- Regional UI and ordered result cards: DONE_VERIFIED by current-head CI.
- Khmer romanization: DONE_VERIFIED mechanically; phonological IPA: BLOCKED pending browser-compatible G2P and reviewed conversion into canonical IPA.
- Lao: PARTIAL; 17 upstream-derived regression vectors now guard common forms, but the port is not complete upstream parity and independent Lao review is outstanding.
- Burmese: PARTIAL; upstream Mya2Rom is integrated, but independent source-backed IPA review remains outstanding.
- Sinhala: PARTIAL; six upstream VoiceLK examples now regression-test the browser port, but the Python tokenizer/domain lexicon are omitted and independent review remains outstanding.
- Ukrainian adapter: PARTIAL; unsupported symbols, tone marks and combining diacritics are preserved visibly, but language-specific Ukrainian mappings require review.


## Unknown-input safeguard — 2026-10-28

Added a browser regression test using an unrecognized code point inside the Lao Unicode block. The port preserves it visibly as `⟦…⟧` in the romanization and IPA fields, and the IPA→Ukrainian adapter preserves the unresolved marker. The fixture also caught a false tone assignment on a consonant with no resolved vowel; the Lao port now emits a tone only when a vowel or coda is resolved, avoiding a fabricated contour in this case.


## Current reconciled status — 2026-10-28

This section supersedes earlier point-in-time status snapshots above.

- Regional UI/result order (romanization → IPA → Ukrainian candidate): **DONE_VERIFIED** by current-head Quality CI. The current PR head before this status-only update is tracked in PR #48.
- Khmer: **PARTIAL** — upstream `@gmana/km-translit@0.1.2` provides browser-compatible BGN/PCGN-derived ASCII romanization, but no IPA/G2P engine is integrated. Acceptance requires a browser-compatible or deployable licensed G2P engine, a reviewed mapping to canonical IPA, and source-backed regression fixtures.
- Lao: **PARTIAL** — selected `lao2ipa` rules are ported and 28 upstream-derived vectors run in browser CI; full upstream parity and independent linguistic review are outstanding.
- Burmese: **PARTIAL** — vendored Mya2Rom provides MLCTS2 and IPA modes; their parallel availability does not establish that romanization is derived from IPA. Independent review and broader gold fixtures are outstanding.
- Sinhala: **PARTIAL** — upstream Singlish romanization and a partial VoiceLK-derived IPA rule-port are integrated. The Python tokenizer and domain lexicon are omitted; independent phonological review and broader fixtures are outstanding.
- IPA → Ukrainian: **PARTIAL** — long-vowel length is retained as `⟦ː⟧`; tone marks, aspiration, combining marks, and unknown segments remain explicit. Mapping choices are not a normative standard and require language-specific review.
- Latest verified runtime/test commit before the additional inventory regression: `65ce6e8fe3552acc33b582108a4804bf7be7c9e2`, Quality CI [40770751349](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40770751349), with **87 browser tests passed, 1 skipped**. A new Sinhala long-vowel inventory regression has since been added and requires a new exact-head CI result before it can be marked verified.
- Release disposition: **PARTIAL PROTOTYPE / RESEARCH PREVIEW**, not release-ready. No merge or deployment has been performed.
