# Audit pass: contracted finals and vowel-quality conventions (2026-10-18)

## Scope

This pass reviews the current broad-IPA outputs for `ong`, `iong/yong`, contracted `iu/ui/un`, and the core vowel-quality distinctions. It deliberately separates (a) what the source establishes about Pinyin spelling/pronunciation, (b) the converter's notation convention, and (c) claims that remain unverified. It does not treat a passing test as independent phonetic evidence.

## Findings

### 1. Contracted Pinyin finals: `iu`, `ui`, `un`

Pinyin spelling contracts `iou → iu`, `uei → ui`, and `uen → un` after an initial. Zero-initial forms preserve the fuller spelling patterns as `you`, `wei`, and `wen`. This is explicitly described in the Hong Kong Polytechnic University Pinyin spelling guide and in the University of Kansas *Ting Yi Ting* pronunciation material.

- Current broad outputs: `liu → ljoʊ`, `dui → tweɪ`, `dun → twən`; zero-initial `you → joʊ`, `wei → weɪ`, `wen → wən`.
- Interpretation: these are broad, convention-normalized outputs, not a narrow record of every audible transition. In particular, the current `iu → joʊ` does not represent the more detailed [iəu̯]-type transcription used in some teaching descriptions.
- Decision: **retain provisionally; do not mark fully verified**. A consistent broad notation may omit a transitional central vowel, but the exact target must be chosen explicitly and checked against audio/acoustic sources before calling it a gold transcription. Tone-conditioned realizations should not be silently introduced into this context-free syllable function.
- Required next step: compare a declared broad IPA reference and at least one acoustic or carefully documented phonetic source across tones 1–4, especially `iu` in tones 3 and 4.

Sources:
- PolyU, *Spelling Rules in Pinyin* (spelling of `iou/uei/uen`): https://www.polyu.edu.hk/bepth/introduction-to-phonetics/spelling-rules-in-pinyin/
- University of Kansas, *Ting Yi Ting*, “Finals with a medial u” (explains that `ui` is short for `uei` and `un` for `uen`): https://opentext.ku.edu/tingyiting/chapter/lesson15/
- PolyU, *Compound final groups* (notes the `o` in `iou` is especially conspicuous in tones 3 and 4): https://www.polyu.edu.hk/bepth/introduction-to-phonetics/compound-finals/compound-final-groups/

### 2. `ong` and `iong/yong`

The implementation uses `ong → ʊŋ` and `iong/yong → jʊŋ`, with ordinary-IPA `j` as the glide. The University of Washington chart uses its own broad notation for glide and vowel symbols, while other phonetic descriptions transcribe these finals with symbols such as [uŋ], [ʊŋ], or a sequence whose exact interpretation depends on the transcription's phonological level.

- The source comparison supports that `ong` and `iong` are distinct final classes and that `yong` is the zero-initial spelling counterpart of `iong`.
- It does **not** establish that `ʊ` is the uniquely correct vowel symbol across all broad-IPA conventions or speakers.
- Decision: **retain as a documented provisional convention**. Do not replace `ʊ` with `u`, or `jʊŋ` with a different sequence, solely to make strings match a chart that uses a different glide convention.
- Required next step: adjudicate the vowel quality using sources that state the target accent and transcription level; preserve separate fixtures for `ong`, `iong`, `yong`, and legal onset combinations such as `jiong`, `qiong`, `xiong`.

Sources:
- University of Washington, *Mandarin IPA finals*: https://courses.washington.edu/chin342/ipa/finals.html
- University of Washington, *Mandarin Chinese Syllables*: https://courses.washington.edu/chin342/ipa/syllables.html
- Ohio State University, *Chinese (Mandarin) oral vowels, IPA*: https://ielp.ehe.osu.edu/files/2025/09/IPA_Mandarin.pdf

### 3. Core vowel qualities: `a/ɑ`, `e/ɤ/ə`, `o/ɔ`

The present converter distinguishes `a` from `ɑ` in selected contexts (`a → a`, `ang → ɑŋ`), uses `e → ɤ`, and uses `o → ɔ` as a standalone final while treating `o` after `b/p/m/f` contextually as `uɔ`. This is not internally contradictory if the output is a broad phonetic approximation: vowel quality can vary by context and sources may use different broad conventions.

Independent teaching/phonetics resources support several of these distinctions but do not yield a single universal character-by-character mapping:
- Ohio State University charts [a] and [ɑ] as context-dependent allophones and identifies [ɤ] and [ɔ] as relevant Mandarin vowel qualities.
- The University of Washington chart uses a stated broad convention that merges some vowel qualities; its chart must not be copied literally as ordinary IPA without conversion.
- The Open University/LibreTexts teaching chart describes `e` with a [ɤə]-type realization, illustrating that a simple [ɤ] output is a broad simplification.

Decision: **partially supported, not fully verified**. Keep current behavior stable until the project explicitly decides whether it targets broad citation-form segments or more detailed vowel trajectories. Do not treat `o` as one uniform mapping across all spellings; the already implemented labial-conditioned `bo/po/mo/fo → uɔ` rule remains separately evidenced.

Sources:
- Ohio State University, *Chinese (Mandarin) oral vowels, IPA*: https://ielp.ehe.osu.edu/files/2025/09/IPA_Mandarin.pdf
- University of Washington, *Mandarin IPA finals*: https://courses.washington.edu/chin342/ipa/finals.html
- LibreTexts, *The Sound System of Mandarin*: https://human.libretexts.org/Bookshelves/Languages/Chinese/CHN101_Elementary_Mandarin_I_Textbook/01%3A_Introduction/1.01%3A_The_Sound_System_of_Mandarin

## Regression guardrails added in this pass

The test fixture checks that:
- `ong`, `iong`, `yong`, `iu/you`, `ui/wei`, and `un/wen` remain separate and explicitly represented;
- tone-number and tone-mark inputs agree for representative `iu/ui/un/ong/iong` cases;
- the test name and comments describe a **declared broad convention**, not an independent gold-standard claim.

These are regression guardrails only. The audit status remains **partially verified** until the phonetic targets are adjudicated against independent sources at a stated transcription level.
