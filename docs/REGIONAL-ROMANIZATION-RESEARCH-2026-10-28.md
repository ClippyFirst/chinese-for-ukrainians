# Regional romanization research — 2026-10-28

## Scope

Languages requested: Khmer (km), Lao (lo), Burmese/Myanmar (my), Sinhala (si). The site is a static, local-only Vite/GitHub Pages application; the current Content Security Policy explicitly disables network connections. Python packages cannot be invoked from the browser without a port, WASM/runtime or backend.

## Repository candidates

| Language | Candidate | Observed capability | License / integration note |
|---|---|---|---|
| Khmer | https://www.npmjs.com/package/@gmana/km-translit (0.1.2) | Browser-compatible JavaScript syllable-aware Khmer-to-Latin and reverse conversion; examples include `ភ្នំពេញ` → `Phnom Penh` | MIT; integrated as a pinned npm dependency. Its ASCII output is explicitly BGN/PCGN-derived, not a conformant BGN/PCGN implementation. `seanghay/khmerphonemizer` could not be fetched at the audited URL, so its current availability is unverified |
| Lao | https://github.com/byu-matrix-lab/lao2ipa | Python rule-based syllabification, IPA and Ministry of Health (MoH 2020) romanization | Apache-2.0; port all rule tables and tests before claiming parity |
| Burmese | https://github.com/myanmaropenwordnet/mya2rom | JavaScript: IPA, MLCTS, modified MLCTS, Simple and Simple2 | CC-BY-SA-4.0; vendored source, full license and attribution/change notice included |
| Burmese alternative | https://github.com/trhura/python-myanmar | Python romanizer, BGN/PCGN, MLCTS and IPA | MIT; Python-only |
| Sinhala | https://github.com/skyprolk/SinEn-Natural-Language-Tool_Kit | Sinhala-to-Latin / phoneme converter with mapping data and context-sensitive inherent-a insertion | Apache-2.0; converter adapted from another repository, requiring source and attribution audit |
| Sinhala direction mismatch | https://github.com/savi664/sin_transliterator | Neural Singlish-to-Sinhala reverse transliteration | Not a direct Sinhala-script-to-Latin romanizer |

## Current implementation status

The new page separates these scripts from the Chinese converter's IPA-keyed Ukrainian mapping pipeline. Khmer now uses the upstream `@gmana/km-translit` 0.1.2 JavaScript package for syllable-aware Latin romanization; its IPA field is deliberately unavailable because this package is a romanizer, not a phonological engine. Sinhala uses upstream Sinhala Text Converters for Unicode Sinhala → Singlish. Burmese loads upstream Mya2Rom 0.4.4 locally and uses its `mlcts2` and `ipa` modes. The Mya2Rom source, full CC-BY-SA-4.0 license and attribution/change notice are kept under `vendor/mya2rom/`. Lao remains a provisional Latin candidate without IPA.

**This is not a complete four-language implementation.** Khmer, Lao and Sinhala remain grapheme-level candidates and do not adequately model syllabification, inherent/dependent vowels, consonant classes, tone, context-sensitive sound changes, or lexical exceptions. Burmese uses the actual upstream Mya2Rom engine, but its upstream README describes it as a simple script and its simplified systems as work in progress; outputs still need independent source-backed validation. Current results must not be represented as independently verified or universally normative.

## Acceptance criteria for full integration

1. Port or package one reviewed upstream engine per language for browser use, preserving attribution and licenses.
2. Use one inspectable phonetic representation as the source of both IPA and pronunciation-based romanization where supported; distinguish orthographic standards (MLCTS, MoH 2020) from pronunciation transcription.
3. Add source-backed examples and independent expected outputs per language with source URL, rule environment, license and scope.
4. Test Unicode combining sequences, punctuation, unknown input, tone/length, script detection and copy controls.
5. Run unit/browser/accessibility/build/release checks on exact PR head.
6. Update the master execution plan only after acceptance checks are run. Current status: PARTIAL / research preview.


## Verification follow-up — 2026-10-28

Quality run [40737082982](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40737082982) passed on commit `c7028d4a291edd61800e1534b7cbbf746cb2960f`, including unit/integration tests, production build, deterministic generated mappings, benchmark, release checks and browser regression tests. This evidence predates the follow-up commits; the latest head must be rerun.

A correctness fix now withholds IPA for Khmer, Lao and Sinhala because the current grapheme tables are not reviewed phonological engines. The UI still offers explicitly provisional Latin candidates, but IPA displays “IPA not generated” rather than presenting guessed per-character values as phonetic transcription. Burmese continues to use the separate upstream Mya2Rom MLCTS2 and IPA modes; MLCTS2 is not claimed to derive from IPA.

Research sources rechecked: `seanghay/khmerphonemizer` is an MIT Python G2P engine; `byu-matrix-lab/lao2ipa` is a Python syllable-based Lao-to-IPA and romanization engine; `byu-matrix-lab/sea-transliteration-mnmt` publishes Khmer/Lao/Thai parallel character mappings but this review did not establish a license grant for that mapping repository, so it is not vendored; SinEn advertises Sinhala-to-Latin conversion but its implementation and data provenance require audit. Sources: https://github.com/seanghay/khmerphonemizer ; https://github.com/byu-matrix-lab/lao2ipa ; https://github.com/byu-matrix-lab/sea-transliteration-mnmt ; https://github.com/skyprolk/SinEn-Natural-Language-Tool_Kit .

Task status: regional page/navigation = DONE_VERIFIED on `c7028d4` only; Burmese integration = PARTIAL pending current-head CI and independent review; Khmer and Lao phonological engines = TODO pending browser-compatible port and source-backed fixtures; Sinhala engine = BLOCKED pending provenance review; Khmer/Lao/Sinhala IPA = DEFERRED until reviewed engines exist; exact-head CI after the follow-up = TODO; independent gold corpus = BLOCKED pending source-backed linguistic review.


## Further browser-compatible candidate discovery — 2026-10-28

A second search pass found additional options that should be evaluated before choosing ports:

- Khmer: [@gmana/km-translit 0.1.2](https://www.npmjs.com/package/@gmana/km-translit) is a dependency-free JavaScript/TypeScript package with syllable-aware Khmer-to-Latin and reverse conversion. It describes its output as a BGN/PCGN-1972-derived ASCII profile, explicitly **not a fully conformant implementation** because diacritics are dropped. Its published package license is MIT. This is a stronger browser-native romanization candidate than the provisional hand-written table, but exact source/release provenance, tests, and rule behavior must be checked before vendoring or replacing the current adapter.
- Sinhala: [@suhasdissa/singlish](https://github.com/SuhasDissa/singlish) is a browser-usable JavaScript/Node implementation for Sinhala Unicode → romanized Singlish, with a documented 150-case test suite. It is GPL-3.0 and describes phonetic limitations (including consonant-cluster cases); do not vendor it until the repository's licensing situation and integration obligations are explicitly resolved. The existing SinEn Apache-2.0 candidate still needs source/data provenance audit.
- Lao: [LaoNLP](https://github.com/wannaphong/LaoNLP) is Apache-2.0 and has recent IPA romanization and MoH 2020 romanization work, but remains Python-based. [Laonetics](https://github.com/ltruchot/laonetics) offers JavaScript/TypeScript syllable segmentation and English/French/IPA outputs, but is CC-BY-NC-4.0 and appears substantially older; it is not integrated because the non-commercial restriction and linguistic quality need review. The Apache-2.0 Python [lao2ipa](https://github.com/byu-matrix-lab/lao2ipa) remains the leading candidate for an IPA-first port.

These are candidate evaluations, not integrations or independent accuracy findings. No new upstream code or mapping data was copied from these projects in this follow-up. In particular, no per-character table should be promoted to phonological IPA merely because a source labels a field “IPA”.


## Sinhala engine integration update — 2026-10-28

The page now locally integrates `sinhala-soft/sinhala-text-converters` 1.0.5 for Sinhala Unicode → Singlish. The upstream MIT license and notice are included under `vendor/sinhala-text-converters/` and published under `public/vendor/sinhala-text-converters/`. The browser module is a narrow TypeScript-to-ES-module adaptation of upstream `unicode-to-singlish.ts` and `constants.ts`; TypeScript-only syntax/imports were removed, and the upstream transformation logic was otherwise retained. Attribution is preserved: the upstream README credits the Language Technology Research Laboratory, University of Colombo School of Computing (UCSC), and Sinhala Soft Foundation as maintainer. Source: https://github.com/sinhala-soft/sinhala-text-converters

A Playwright assertion now expects the upstream README example `ආයුබෝවන්` → `aayubowan` and verifies the engine status. This test is added but **not yet executed on the latest head**. Sinhala is therefore PARTIAL, not DONE_VERIFIED: source-backed expected output exists in upstream documentation, but independent linguistic review, wider test coverage, and exact-head CI remain outstanding. The engine does not emit IPA; IPA remains intentionally unavailable for Sinhala.


## Required end-to-end order — 2026-10-28

The site-wide regional-language contract is **romanization → IPA → Ukrainian transcription**. The page now renders three result cards in that exact order. The Ukrainian candidate is derived only from IPA; it does not independently map source-script characters or reuse romanization. The adapter maps recognized IPA segments and preserves unsupported symbols, tones, and diacritics as visible bracketed markers. This is a conservative candidate, not a validated language-specific standard.

Acceptance remains PARTIAL: Burmese Mya2Rom supplies separate MLCTS2 and IPA modes, but these parallel outputs do not prove that MLCTS2 was derived from IPA. Sinhala Text Converters supplies romanization only. Khmer and Lao still use provisional Latin candidates. IPA and an IPA-derived Ukrainian candidate remain unavailable for Khmer, Lao, and Sinhala until suitable phonological engines are integrated. The user-visible order is implemented, but complete four-language end-to-end output is not.


## Khmer romanizer integration — 2026-10-28

Integrated `@gmana/km-translit@0.1.2` as a pinned production dependency. Browser regression coverage checks the upstream README example `ភ្នំពេញ` → `Phnom Penh`, confirms the engine status is displayed, and verifies that no IPA or Ukrainian candidate is fabricated. The package is MIT-licensed and dependency-free. Its own documentation explicitly says its ASCII output drops BGN/PCGN diacritics, so the UI calls it BGN/PCGN-derived rather than a conformant implementation. The exact branch head must pass clean-install CI; package-lock reproducibility is not considered verified until `npm ci` passes.
