# IPA convention decision record — 2026-10-18

## Decision

The converter uses broad practical IPA with ordinary IPA glide symbols. The University of Washington chart is a reference for Mandarin syllable coverage and broad pronunciation, not a literal output oracle.

Primary sources:
- https://courses.washington.edu/chin342/ipa/about.html
- https://courses.washington.edu/chin342/ipa/finals.html

The UW page explicitly describes its transcription as broad. It merges [a] and [ɑ], merges [ə] and [ʌ], uses [ɿ] and [ʅ] for apical vowels, and uses [i], [u], and [y] for glides where ordinary IPA often uses [j], [w], and [ɥ]. These are stated conventions, so literal string differences are not automatically errors.

## Documented choices

| Feature | Converter | UW chart | Note |
|---|---|---|---|
| ai | aɪ | ai | Offglide marked explicitly |
| ao | aʊ | au | Offglide marked explicitly |
| ang | ɑŋ | aŋ | Converter retains a low-vowel distinction |
| palatal glide | j | i in glide contexts | Ordinary IPA glide symbol |
| labial-velar glide | w | u in glide contexts | Ordinary IPA glide symbol |
| rounded palatal glide | ɥ | y in glide contexts | Ordinary IPA glide symbol |
| iong | jʊŋ | yuŋ | Different glide notation |
| apical vowel after z/c/s | ɹ̩ | ɿ | UW notes ɿ is a non-IPA sinological symbol |
| apical vowel after zh/ch/sh/r | ɻ̩ | ʅ for retroflex sibilants | Converter distinguishes articulatory context |
| o after b/p/m/f | ɔ | UW teaching chart gives [pɔ], [pʰɔ], [mɔ], [fɔ] | Context-specific open-mid back vowel; avoid inserting an extra [u] glide |
| standalone wo | wo | UW finals chart gives [wo] | Preserve the labial-velar glide in ordinary IPA |
| uo after an initial | uɔ | UW finals chart gives [wo] for the final | Project keeps a broad [uɔ] realization for the contracted final; requires further phonetic adjudication |
| er | əɹ | əɹ | Same broad output |
| neutral tone | no fixed contour | no single contour encoded in chart | Context-dependent; avoid inventing a contour |

## Scope and limitations

- This is broad Pinyin-to-IPA conversion, not narrow transcription or connected-speech phonology.
- Tone sandhi is not applied. Tone marks/numbers represent citation-form lexical tones; neutral tone gets no fixed contour.
- The 403-key UW test is a coverage test, not proof that every output is phonetically correct.
- The merged Ukrainian practical-transcription inventory contains additional marginal or system-specific forms.
- Uncommon forms, syllabic consonants, erhua, dialectal variants, and context-dependent reductions require separate evidence and tests.

## Status

Convention documented; linguistic certification remains incomplete. This note explains notation choices but does not certify every mapping or resolve outstanding manual checks in the Ukrainian transcription tables.
## Follow-up review: final classes and source-internal discrepancy

The regression suite now explicitly covers representative zero-initial spellings and contracted Pinyin forms (yi, wu, yu, you, yuan, yong, jiong, dui, dun, weng, and ong), alongside ei and ou. These assertions protect the implementation's declared broad-IPA output; they are not a claim that the UW symbols can be copied literally into ordinary IPA.

One source limitation surfaced during the comparison: the UW Finals page gives the standalone final er as əɹ, while the UW Mandarin Syllables chart displays the zero-initial syllable er as ər. The converter currently returns əɹ for er. This output agrees with the Finals page but not literally with the syllable chart. The discrepancy is recorded as a source-internal notation difference requiring a convention decision, not silently counted as a converter defect. The two pages are:
- https://courses.washington.edu/chin342/ipa/finals.html
- https://courses.washington.edu/chin342/ipa/syllables.html

The new tests also lock current broad-IPA choices for ong (ʊŋ) and contracted un/ui spellings (twən/tweɪ). UW uses its own broad/sinological notation for these glides and vowels, so these remain convention-sensitive choices. A passing regression test establishes consistency with the project decision record, not independent phonetic validation.

This is a targeted coverage expansion, not exhaustive final-by-final certification.

## Context-sensitive correction (2026-10-18)

The previous shared mapping `o: uɔ` and `wo: uɔ` collapsed distinct Pinyin forms. It produced an unsupported extra [u] element in forms such as `bo` and omitted the [w] glide in standalone `wo`. The mapping is now split: `o` maps to `ɔ` (so `bo/po/mo/fo` map to `pɔ/pʰɔ/mɔ/fɔ`), while `wo` maps to `wo`; `uo` remains `uɔ` pending a more complete source comparison. This is a source-backed targeted correction using the UW syllable chart and the University of Hawaiʻi teaching chart, not a claim that either chart is a complete narrow-IPA authority.
