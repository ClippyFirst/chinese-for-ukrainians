# Regional romanization research — 2026-10-28

## Scope

Languages requested: Khmer (km), Lao (lo), Burmese/Myanmar (my), Sinhala (si). The site is a static, local-only Vite/GitHub Pages application; the current Content Security Policy explicitly disables network connections. Python packages cannot be invoked from the browser without a port, WASM/runtime or backend.

## Repository candidates

| Language | Candidate | Observed capability | License / integration note |
|---|---|---|---|
| Khmer | https://github.com/seanghay/khmerphonemizer | Python grapheme-to-phoneme pipeline, lexicon and beam search | MIT; Python-only and G2P rather than an official Latin romanization scheme |
| Lao | https://github.com/byu-matrix-lab/lao2ipa | Python rule-based syllabification, IPA and Ministry of Health (MoH 2020) romanization | Apache-2.0; port all rule tables and tests before claiming parity |
| Burmese | https://github.com/myanmaropenwordnet/mya2rom | JavaScript: IPA, MLCTS, modified MLCTS, Simple and Simple2 | CC-BY-SA-4.0; vendored source, full license and attribution/change notice included |
| Burmese alternative | https://github.com/trhura/python-myanmar | Python romanizer, BGN/PCGN, MLCTS and IPA | MIT; Python-only |
| Sinhala | https://github.com/skyprolk/SinEn-Natural-Language-Tool_Kit | Sinhala-to-Latin / phoneme converter with mapping data and context-sensitive inherent-a insertion | Apache-2.0; converter adapted from another repository, requiring source and attribution audit |
| Sinhala direction mismatch | https://github.com/savi664/sin_transliterator | Neural Singlish-to-Sinhala reverse transliteration | Not a direct Sinhala-script-to-Latin romanizer |

## Current implementation status

The new page separates these scripts from the Chinese converter's IPA-keyed Ukrainian mapping pipeline. `src/app/regional-languages.js` contains conservative grapheme-level demonstration adapters for Khmer, Lao and Sinhala, with paired Latin/IPA candidates and explicit markers for unknown script characters. For Burmese, the page loads upstream Mya2Rom 0.4.4 locally and uses its `mlcts2` and `ipa` modes. The upstream source, full CC-BY-SA-4.0 license and attribution/change notice are kept separately under `vendor/mya2rom/`.

**This is not a complete four-language implementation.** Khmer, Lao and Sinhala remain grapheme-level candidates and do not adequately model syllabification, inherent/dependent vowels, consonant classes, tone, context-sensitive sound changes, or lexical exceptions. Burmese uses the actual upstream Mya2Rom engine, but its upstream README describes it as a simple script and its simplified systems as work in progress; outputs still need independent source-backed validation. Current results must not be represented as independently verified or universally normative.

## Acceptance criteria for full integration

1. Port or package one reviewed upstream engine per language for browser use, preserving attribution and licenses.
2. Use one inspectable phonetic representation as the source of both IPA and pronunciation-based romanization where supported; distinguish orthographic standards (MLCTS, MoH 2020) from pronunciation transcription.
3. Add source-backed examples and independent expected outputs per language with source URL, rule environment, license and scope.
4. Test Unicode combining sequences, punctuation, unknown input, tone/length, script detection and copy controls.
5. Run unit/browser/accessibility/build/release checks on exact PR head.
6. Update the master execution plan only after acceptance checks are run. Current status: PARTIAL / research preview.
