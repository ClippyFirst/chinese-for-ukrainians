# Independent vowel-quality cross-check (2026-10-18)

**Status: partial adjudication; not a complete IPA gold standard.**

## Why this review exists

The converter's broad IPA output cannot be validated by literal comparison with one chart. Authoritative teaching and phonetics sources use different transcription depths and symbol conventions, and some explicitly describe conditioned allophones rather than a one-to-one Pinyin-letter mapping. This note records what the sources do and do not establish.

## Source comparison

| Topic | University of Washington chart | Ohio State University vowel chart (2023; updated 2025) | LibreTexts Mandarin sound-system guide | Audit conclusion |
|---|---|---|---|---|
| Zero-initial `wo` / labial `bo, po, mo, fo` | Gives `wo → uɔ` and `bo/po/mo/fo → puɔ/pʰuɔ/muɔ/fuɔ` | Describes `[uɔ]` as a conditioned allophone of /ɤ/ | Says `o` in `bo, po, mo, fo, wo` sounds like `-uo` | The converter's `wo → uɔ` and labial `o → uɔ` are source-aligned. Preserve standalone `o → ɔ` as a declared broad convention, not as a universal analysis of every token written with Pinyin `o`. |
| Pinyin `e` | `ɤ` | Lists `ɤ` among back close-mid vowels and describes allophones of /ɤ/ | Gives a more detailed `[ɤə]` transcription | Current `e → ɤ` is a broad simplification compatible with the UW convention. It should not be described as a narrow transcription capturing every audible movement. |
| Pinyin `a` and `ang` | Uses `a` and `aŋ` in its broad chart | Distinguishes allophones `[a, ɑ]` and shows the conditioned environment | Uses pedagogical rather than consistent narrow IPA notation across all examples | Current `a → a`, `ang → ɑŋ` is a deliberate broad-IPA choice that preserves a low-vowel distinction. It is not a literal copy of UW and needs an explicit consistency review across `an/ang/ian/iang/uan/uang`. |
| `ong` and `iong/yong` | Gives `ong → uŋ` and `iong → yuŋ` in its own broad/glide convention | Its vowel chart documents conditioned rounded back-vowel qualities, but does not alone settle a syllable-by-syllable output for all these finals | Gives a pedagogical description of `ong`, not a single exact narrow-IPA target for every context | Current `ong → ʊŋ` and `iong/yong → jʊŋ` are plausible convention-normalized outputs, but remain provisional pending an explicit source-level decision about vowel quality and glide representation. |
| Diphthongs `ai/ei/ao/ou` | Uses `ai/ei/au/ou` without consistently marking IPA nonsyllabicity | Displays `aɪ, eɪ, ɑʊ, oʊ` as diphthongs | Uses `ai̯, ei̯, au̯, ou̯` | Current `aɪ/eɪ/aʊ/oʊ` is a readable ordinary-IPA convention. The differences are chiefly transcription depth, but the chosen convention should be applied consistently. |

## Source details

1. University of Washington, *Mandarin Chinese Syllables*: https://courses.washington.edu/chin342/ipa/syllables.html
   - Broad Pinyin/IPA syllable chart; gives the conditioned `uɔ` pattern for `wo` and labial-initial `o`.
2. University of Washington, *Mandarin IPA finals*: https://courses.washington.edu/chin342/ipa/finals.html
   - Final-class comparison and broad chart conventions.
3. Philip Neal Whitman, Ohio State University Intercultural English Language Programs, *IPA Mandarin* vowel chart (2023; updated November 2025): https://ielp.ehe.osu.edu/files/2025/09/IPA_Mandarin.pdf
   - Distinguishes [a]/[ɑ], gives conditioned allophones of /ɤ/ including [ɤ], [iɛ], [uɔ], and represents the diphthongs with IPA glide notation.
4. *The Sound System of Mandarin*, Humanities LibreTexts: https://human.libretexts.org/Bookshelves/Languages/Chinese/CHN101_Elementary_Mandarin_I_Textbook/01%3A_Introduction/1.01%3A_The_Sound_System_of_Mandarin
   - Uses more detailed values such as [ɤə], [iəu̯], [u̯ei̯], and syllabic [ɻ̩]/[ɹ̩] for the special `-i` series.
5. Hong Kong Polytechnic University, *Simple Finals*: https://www.polyu.edu.hk/bepth/introduction-to-phonetics/simple-finals/
   - Describes the weak intermediate [u]-like component in `bo/po/mo/fo`.
6. Wu, Chen-Huei, and Chilin Shih (2009), “Mandarin Vowels Revisited: Evidence from Electromagnetic Articulography,” *Proceedings of the 35th Berkeley Linguistics Society*. https://doi.org/10.3765/bls.v35i1.3622
   - Acoustic/articulatory study of Mandarin vowel variation. The study elicited syllables from one Taiwan Mandarin speaker and reports substantial context-conditioned variation; it is useful evidence against treating a single chart as a universal narrow-IPA gold standard, not a complete reference table for this converter.

## Actions taken / outstanding

- **Taken:** corrected zero-initial `wo` from `wo` to `uɔ`, matching the UW chart and the converter's existing `uo` output.
- **Taken:** retained the context-conditioned `uɔ` mapping after `b/p/m/f` instead of applying standalone `o → ɔ` indiscriminately.
- **Outstanding:** review the `a/ɑ` family as a single coherent class, including nasal finals and medial-conditioned variants. Wu & Shih (2009) show that [a] variants across `an`, `aŋ`, `aj`, and `aw` differ acoustically/articulatorily in their single-speaker study; this supports keeping context-conditioned distinctions under review, but the sample is not sufficient to impose one universal symbol mapping.
- **Outstanding:** decide whether the displayed output should remain broad phonemic/broad-phonetic IPA or become a more detailed narrow transcription. Do not mix conventions selectively without documenting each transformation.
- **Outstanding:** decide the exact ordinary-IPA notation for `ong`, `iong/yong`, and the contracted `iu/ui/un` families using source evidence and audio/acoustic references where available. For `iong/yong`, explicitly adjudicate [j] versus [ɥ] as the medial before choosing between candidates such as [jʊŋ], [juŋ], or [ɥuŋ]; current sources are not interchangeable notation variants.

A regression test only prevents an accidental change to a chosen output. It does not by itself prove that the output is scientifically correct.
