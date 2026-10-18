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
| o / uo | uɔ | uɔ | Same broad final |
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
