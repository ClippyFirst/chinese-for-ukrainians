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
| ao | ɑʊ | au | Offglide marked explicitly; [ɑ]-type nucleus aligns with OSU and Liu (2026) evidence |
| ang | ɑŋ | aŋ | Converter retains a low-vowel distinction |
| palatal glide | j | i in glide contexts | Ordinary IPA glide symbol |
| labial-velar glide | w | u in glide contexts | Ordinary IPA glide symbol |
| rounded palatal glide | ɥ | y in glide contexts | Ordinary IPA glide symbol |
| iao | jɑʊ | iau | Ordinary-IPA [j] glide plus [ɑʊ] diphthong; Liu (2026) supports the [ɑ]-type nucleus in this final family 
| iong | jʊŋ | yuŋ | Unresolved sequence/vowel analysis; not a simple notation conversion |
| apical vowel after z/c/s | ɹ̩ | ɿ | UW notes ɿ is a non-IPA sinological symbol |
| apical vowel after zh/ch/sh/r | ɻ̩ | ʅ for retroflex sibilants | Converter distinguishes articulatory context |
| o after b/p/m/f | uɔ after these initials; standalone `o` remains an edge case | UW syllable chart gives `bo/po/mo/fo` as `puɔ/pʰuɔ/muɔ/fuɔ`; PolyU also describes a short, weak `u` in these syllables | Earlier `pɔ/pʰɔ/mɔ/fɔ` claim was incorrect; implementation and regression tests now preserve the supported labial-conditioned `uo` realization |
| standalone wo | uɔ | UW chart gives `wo → uɔ`; Open University documents the Pinyin spelling rule `uo → wo`, which explains the spelling but is not itself an IPA target | The converter currently follows the UW segmental target `uɔ` for `wo`. This is a deliberate source-aligned choice; do not describe the output as `wo`.
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

The University of Washington's broad chart uses a field-specific notation, explicitly substituting `u` for the glide `w` and `i` for `j` in glide contexts. For zero-initial `wo`, however, the chart explicitly gives `uɔ`, and the implementation now outputs `uɔ`. The Open University spelling rule `uo → wo` explains the Pinyin spelling alternation; it does not override the chart's pronunciation target.

This correction resolves one confirmed implementation/documentation mismatch. It does not complete the exhaustive IPA audit: remaining finals and initial-final combinations still need source-backed expected-output checks, and the standalone `o` edge form needs its own explicit inventory policy.

## Source-backed correction: üe vowel quality (2026-10-18)

The converter originally used `üe → ɥe`. The University of Washington finals chart represents `üe` as `yɛ`, and its syllable chart shows forms including `nüe → nyɛ`, `lüe → lyɛ`, `jue → tɕyɛ`, `que → tɕʰyɛ`, and `yue → yɛ`. In the project's declared notation, the chart's glide symbol `y` is rendered as ordinary IPA `ɥ`; the vowel `ɛ` must be preserved. The mapping is therefore corrected to `üe → ɥɛ`, not `ɥe`.

Evidence:
- University of Washington, *Mandarin IPA finals*: https://courses.washington.edu/chin342/ipa/finals.html
- University of Washington, *Mandarin Chinese Syllables*: https://courses.washington.edu/chin342/ipa/syllables.html

Regression coverage now includes `nüe`, `lüe`, `jue`, `que`, `xue`, and `yue`. This resolves the identified vowel-quality mismatch for this final class under the project's current convention. It does not certify all other final classes or settle the broader articulatory analysis of Mandarin rounded palatal glides.

## Source-backed broad choice: onset r (2026-10-18)

The onset mapping for Pinyin `r` was changed from [ɻ] to [ɹ]. The University of Washington syllable chart uses [ɹ] for this onset. Chen, Whalen, and Mok (2024) found bunched tongue shapes for prevocalic Mandarin rhotics in their 18-speaker sample and observed that onset frication can be present or absent. Together, these sources support [ɹ] as the less over-specific default for this broad converter; they do not imply that all speakers have identical realizations.

This choice is deliberately separate from `ri`, whose apical/syllabic segment remains represented as [ɻ̩], and from `er`, retained as [əɹ] under the project's current broad convention. Erhua is not generated by this syllable-level function.

Evidence:
- University of Washington, *Mandarin Chinese Syllables*: https://courses.washington.edu/chin342/ipa/syllables.html
- Chen, Shuwen, Douglas H. Whalen, and Peggy Pik Ki Mok (2024), https://pmc.ncbi.nlm.nih.gov/articles/PMC11449382/
