# Literature-based IPA adjudication closeout — 2026-10-19

## Decision and scope

The project adopts a **literature-based broad-IPA convention** for Standard Mandarin citation-form syllables. The review is complete for the practical release decision; new corpus collection, hand segmentation and acoustic measurement are **not release requirements**. They may be future research, but must not hold up the service indefinitely.

This is not a claim that every speaker has one narrow phonetic realization, nor that all published analyses agree. It means the implementation selects and documents a practical convention from published phonetic descriptions and reference inventories. Where sources differ, the chosen representation is a documented editorial convention, not a claim that competing analyses are scientifically invalid.

## Operating rules

1. Treat peer-reviewed phonetic studies and explicit phonetics descriptions as primary evidence; use reference charts to compare transcription conventions and inventory coverage.
2. Distinguish a real analytical difference (e.g. [u] vs [ʊ], or vowel vs glide sequence) from a symbol-convention difference (e.g. [y] used for a rounded-palatal glide where this project writes [ɥ]).
3. Prefer consistency across related finals and contexts over isolated literal matching to a chart.
4. Do not use test fixtures as linguistic evidence. Tests ensure the selected convention remains implemented consistently.
5. Keep citation-form lexical tones separate from tone sandhi, and keep broad IPA distinct from speaker-specific narrow transcription.
6. A documented convention-sensitive choice is not a release blocker once the selected output, rationale, sources, and regression coverage are recorded. Reopen only if a better source directly contradicts the chosen analysis or a reproducible defect is found.

## Decisions for the previously disputed classes

| Class | Selected implementation | Literature basis | Interpretation |
|---|---|---|---|
| `ong` | `ʊŋ` | UW and UCL tables use `uŋ`; Nguyen Dinh Hien (2018) argues `[uŋ]`; PhonoCollection records both `[ʊŋ]` and `[uŋ]` analyses. | Retain the existing broad five-vowel-style analysis `[ʊŋ]`. This is a convention choice among published alternatives, not a claim that `[uŋ]` is erroneous. |
| `iong/yong` | `jʊŋ` | Published inventories include `[jʊŋ]`, `[iʊŋ]`, `[yŋ]`, and UW's `yuŋ`; PolyU treats it as a compound final and notes rounding. | Retain `[jʊŋ]` as the project's glide-plus-final analysis, using ordinary IPA `[j]` rather than UW's glide notation. |
| `üan/yuan` | `ɥɛn` | UW `yɛn` converted to ordinary IPA `ɥɛn`; Liu (2026) groups `ian/üan` in an [ɛ]-type class in a one-speaker acoustic study; UCL lists competing `yɑn`. | Retain `[ɥɛn]` as the selected broad convention. The source conflict is documented; it does not justify treating either analysis as universally narrow. |
| Standalone `er` | `əɹ` | UW gives `ər`; Nguyen (2018) proposes `[ɐɹ]`; UCL and other descriptions use `[ɚ]`; Chen, Whalen & Mok (2024) examine rhotics and support keeping rhotic syllabic nuclei distinct from onset /r/ and erhua. | Retain `[əɹ]` as the project's transparent segmental representation. `[ɚ]` and `[ɐɹ]` remain documented alternatives, not proof of an implementation defect. |

## Other settled conventions

- Initial `r` uses broad `[ɹ]`; the literature reports substantial articulatory variation, so this is not claimed as a universal narrow realization.
- The apical syllables use `[ɹ̩]` after z/c/s and `[ɻ̩]` after zh/ch/sh/r. Lee-Kim (2014) supports a sonorant/approximant analysis; sinological `[ɿ]/[ʅ]` are not ordinary IPA symbols.
- The shared low-back /a/ class uses `[ɑ]` in `ao/iao/ang/iang/uang`, with the one-speaker limitation of Liu (2026) recorded.
- `ü` is `[y]` as a vowel; `ɥ` is used for the rounded-palatal glide. Context-conditioned spellings and contracted Pinyin forms are handled separately in the implementation.
- Neutral tone is left without a universal contour; tone sandhi and connected-speech alternations are out of scope for the citation-form renderer.

## Evidence and audit artifacts

- University of Washington, [Mandarin syllable chart](https://courses.washington.edu/chin342/ipa/syllables.html), [finals chart](https://courses.washington.edu/chin342/ipa/finals.html), and [transcription conventions](https://courses.washington.edu/chin342/ipa/about.html).
- UCL dissertation, [finals table](https://discovery.ucl.ac.uk/id/eprint/10103942/1/A_speech_pattern_processing_me.pdf).
- Nguyen Dinh Hien (2018), [Research on Several Points of Modern Chinese Final](https://doi.org/10.20288/JCS.2018.21.2.177).
- PhonoCollection, [Standard Chinese inventory and alternate transcription columns](https://github.com/untunt/PhonoCollection/blob/master/Standard%20Chinese.md).
- PolyU, [compound finals](https://www.polyu.edu.hk/bepth/introduction-to-phonetics/compound-finals/).
- Liu (2026), [Acoustic Realization of Mandarin /a/ Class Finals](https://doi.org/10.12677/ml.2026.146578).
- Lee-Kim (2014), [Revisiting Mandarin “apical vowels”](https://doi.org/10.1017/S0025100314000267).
- Chen, Whalen & Mok (2024), [Mandarin rhotic study](https://doi.org/10.1515/phon-2023-0023).

Related machine-readable records and implementation checks:
- [403-key UW differential](./IPA-UW-403-SYLLABLE-DIFFERENTIAL-2026-10-18.csv)
- [36-class adjudication register](./IPA-FINAL-CLASS-ADJUDICATION-2026-10-18.md)
- [scientific verification matrix](./IPA-SCIENTIFIC-VERIFICATION-MATRIX-2026-10-18.md)
- [source ledger](./PHONETIC-SOURCE-LEDGER-2026-10-18.csv)

## Release conclusion

**The literature-based broad-IPA review is closed for publication purposes.** The 403-key inventory and regression suite establish coverage and software consistency; they are not a 403-entry gold-standard accuracy score. The public-facing description must say “broad practical IPA” and preserve this convention note. Further acoustic research is optional follow-up, not a prerequisite for a clearly labelled public release.
