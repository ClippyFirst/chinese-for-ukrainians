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
| o after b/p/m/f | uɔ after these initials; standalone `o` remains an edge case | UW syllable chart gives `bo/po/mo/fo` as `puɔ/pʰuɔ/muɔ/fuɔ`; PolyU also describes a short, weak `u` in these syllables | Earlier `pɔ/pʰɔ/mɔ/fɔ` claim was incorrect; implementation and regression tests now preserve the supported labial-conditioned `uo` realization |
| standalone wo | wo | UW chart renders `wo` as `uɔ` under its stated convention of using `u` for glides; Open University confirms the Pinyin spelling rule `uo → wo` for zero initial | `wo` is retained as the project's ordinary-IPA glide notation; literal output differs from UW by convention |
| uo after an initial | uɔ | UW chart gives `duo → tuɔ` and related forms with `uɔ` | Supported as a broad chart-aligned representation; this does not certify narrow phonetic realization for every speaker |
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

## Interim correction note (superseded by the third pass)

An earlier pass separated `o`, `uo`, and `wo` after noticing that one shared mapping collapsed distinct Pinyin spellings. That pass incorrectly concluded that the UW chart supported `pɔ/pʰɔ/mɔ/fɔ` for `bo/po/mo/fo`. The chart actually gives `puɔ/pʰuɔ/muɔ/fuɔ`; see the source correction below. The current implementation and tests supersede the earlier interim mapping.

## Source correction and context-sensitive final (2026-10-18, third pass)

A re-read of the University of Washington syllable chart found an error in the earlier decision note: it does **not** give `bo/po/mo/fo` as `pɔ/pʰɔ/mɔ/fɔ`. The chart explicitly renders these as `puɔ/pʰuɔ/muɔ/fuɔ`; the Hong Kong Polytechnic University pronunciation guide independently says that `o` after b/p/m/f contains a short, weak `u` and is close to a `uo` diphthong. A University of Szeged doctoral dissertation likewise describes Pinyin `bo` as `[buo]`. This is evidence for a context-sensitive rule, not a universal change to the standalone `o` entry.

The implementation now uses the `uo` mapping for final `o` after Pinyin initials b, p, m, and f. Standalone `o` remains a separately classified edge form and is not treated as an ordinary standard syllable; its output should not be generalized from the labial-conditioned forms. Regression tests now assert `bo → puɔ`, `po → pʰuɔ`, `mo → muɔ`, and `fo → fuɔ`.

Evidence:
- University of Washington, *Mandarin Chinese Syllables*: https://courses.washington.edu/chin342/ipa/syllables.html
- Hong Kong Polytechnic University, *Simple Finals*: https://www.polyu.edu.hk/bepth/introduction-to-phonetics/simple-finals/
- Fan, Libo (2025), *Perception and production of Chinese vowel finals by Hungarian learners*, University of Szeged, discussion of Pinyin `o` after labials: https://doktori.bibl.u-szeged.hu/12676/1/Final%20Dissertation-Libo.pdf
- Open University, Pinyin spelling convention `uo → wo`: https://www.open.edu/openlearn/mod/oucontent/view.php?id=106435&section=1.3

The University of Washington's broad chart uses a field-specific notation, explicitly substituting `u` for the glide `w` and `i` for `j` in glide contexts. The project's `wo` output therefore remains `wo` in its declared ordinary-IPA notation even though the chart writes the corresponding syllable as `uɔ`. This is a convention conversion, not an assertion that the two strings are identical.

This correction resolves one confirmed implementation/documentation mismatch. It does not complete the exhaustive IPA audit: remaining finals and initial-final combinations still need source-backed expected-output checks, and the standalone `o` edge form needs its own explicit inventory policy.
