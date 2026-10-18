# Raw University of Washington IPA comparison (2026-10-18)

**Purpose:** a compact, inspectable comparison between the University of Washington (UW) syllable chart's raw notation and this project's current broad ordinary-IPA output.

**Source snapshot:** [UW Mandarin Chinese Syllables](https://courses.washington.edu/chin342/ipa/syllables.html), captured in `tests/fixtures/uw-mandarin-syllables-ipa-reference.csv`. The source explicitly describes its notation as broad and uses field-specific conventions: [UW transcription note](https://courses.washington.edu/chin342/ipa/about.html).

**Important:** raw string inequality is not automatically a defect. This table separates documented notation conversions from unresolved phonetic-analysis differences. It is a sample audit, not a complete 403-row adjudication.

| Pinyin | Raw UW IPA | Current converter | Comparison status | Reason / next action |
|---|---|---|---|---|
| `bo` | `puɔ` | `puɔ` | source-aligned | Keep the context-conditioned `uɔ` realization after labials. |
| `wo` | `uɔ` | `uɔ` | source-aligned | Preserve as a separate zero-initial realization; do not replace it with `wɔ`. |
| `jue` | `tɕyɛ` | `tɕɥɛ` | documented convention conversion | UW's convention uses `y` for the rounded-palatal glide; project output writes ordinary IPA `ɥ` and preserves `ɛ`. |
| `yue` | `yɛ` | `ɥɛ` | documented convention conversion | Same declared glide conversion; still not a narrow-acoustic claim. |
| `yuan` | `yɛn` | `ɥɛn` | documented convention conversion | Same glide conversion; keep in the ü-final review set. |
| `weng` | `uəŋ` | `wəŋ` | documented convention conversion | UW explicitly uses `u` where ordinary IPA commonly uses glide `w`; retain the convention mapping. |
| `ai` | `ai` | `aɪ` | documented convention conversion | Project marks the offglide explicitly; do not claim literal symbol equality. |
| `ang` | `aŋ` | `ɑŋ` | convention decision needed | The project deliberately distinguishes [a]/[ɑ], while UW merges them; verify the full nasal-final class against acoustic evidence. |
| `dong` | `tuŋ` | `tʊŋ` | unresolved vowel quality | [u] vs [ʊ] is a phonetic-symbol difference, not merely a glide-symbol conversion. Adjudicate `ong` across onset classes before changing the code. |
| `jiong` | `tɕyuŋ` | `tɕjʊŋ` | unresolved glide and vowel analysis | Current output differs in both the glide analysis and nucleus symbol. Do not promote either string to gold without final-specific phonetic evidence. |
| `yong` | `yuŋ` | `jʊŋ` | unresolved glide and vowel analysis | UW's convention note maps glide `y` to /ɥ/; the current output uses /j/. Resolve the segment sequence independently. |
| `ri` | `ɹʅ` | `ɻ̩` | convention decision needed | The source's sinological apical symbol and the project's syllabic approximant analysis are not a one-to-one character conversion. Retain the articulatory/acoustic caveat. |
| `zi` | `tsɿ` | `tsɹ̩` | convention decision needed | UW's `ɿ` is a sinological symbol; current output commits to a syllabic-apical analysis that needs explicit justification. |

## What this comparison establishes

1. The raw source fixture now provides a traceable source string for every one of the 403 reference keys.
2. Some mappings are straightforward source-aligned cases (`bo`, `wo`); others are ordinary-IPA convention conversions (`jue`, `yue`, `weng`, `ai`).
3. The `ong/iong` family contains substantive unresolved questions: [u] vs [ʊ], and /j/ vs /ɥ/. These cannot be resolved by string replacement or by adding more self-referential tests.
4. The apical series likewise needs a written analysis decision rather than automatic substitution of `ɿ/ʅ` with syllabic approximants.

## Next review gate

For each unresolved row, record (a) a primary source that explicitly supports the segment sequence or vowel quality, (b) the target transcription depth, (c) any speaker/dialect limits, and (d) a regression fixture only after the expected output is adjudicated. Keep the 403-key source snapshot as a raw witness, not as an unreviewed gold standard.
