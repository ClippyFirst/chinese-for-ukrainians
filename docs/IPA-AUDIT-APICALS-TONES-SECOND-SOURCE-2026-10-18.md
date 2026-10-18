# Independent cross-check: apical segments and tone scope

**Date:** 2026-10-18  
**Status:** evidence synthesis; notation decision remains open for apical segments.  
**Purpose:** separate what published evidence establishes from the converter's chosen broad transcription strings.

## 1. Apical segments after sibilants

### Independent evidence

Lee-Kim (2014), a peer-reviewed *Journal of the International Phonetic Association* study, used ultrasound and acoustic analysis. Its abstract reports that the segments after dental and retroflex sibilants are homorganic with the preceding sibilant, have periodic waveforms and clear formant structure, and lack inherent frication noise. It argues for dental and retroflex approximant analyses rather than voiced fricatives.

- Publisher: https://www.cambridge.org/core/journals/journal-of-the-international-phonetic-association/article/abs/revisiting-mandarin-apical-vowels-an-articulatory-and-acoustic-study/DA325F52844304100950A8B4FEAF6240
- DOI: https://doi.org/10.1017/S0025100314000267

A separate JIPA article on Jixi-Hui apical segments reviews the Standard Mandarin debate and notes that [ɿ] and [ʅ] are common sinological symbols but are not accepted as ordinary IPA symbols. It also summarizes competing analyses, including syllabic approximants and apical vowels. This is useful evidence that notation is analysis-dependent, though its experimental target is Jixi-Hui rather than Standard Mandarin.

- https://www.cambridge.org/core/journals/journal-of-the-international-phonetic-association/article/on-the-nature-of-apical-vowel-in-jixihui-chinese-acoustic-and-articulatory-data/C59E63F44526C4D7C3A43E5FE7EF603D

### Adjudication

Evidence supports preserving a distinct post-sibilant segment and not mapping these syllables to plain [i]. It does **not** uniquely determine the project's exact strings [ɹ̩] and [ɻ̩] for all seven syllables. Lee-Kim's dentalized/retroflexed approximant interpretation is compatible with a syllabic-approximant notation in broad transcription, but place detail is being abstracted away in the current outputs.

Current branch outputs remain:
- zi / ci / si: [tsɹ̩], [tsʰɹ̩], [sɹ̩]
- zhi / chi / shi: [ʈʂɻ̩], [ʈʂʰɻ̩], [ʂɻ̩]
- ri: [ɻ̩]

**Status: convention decision needed.** Keep these as provisional broad outputs. Do not label them uniquely proven by the literature. A final choice should say whether dentalization is intentionally omitted and why the series uses these syllabic approximant symbols.

## 2. Onset r is not the same question as ri or erhua

Chen, Whalen, and Mok (2024) examined 18 northern Mandarin speakers and report bunched tongue shapes for onset rhotics, with initial frication present for some productions but absent for others. Their paper reviews the long-standing approximant-versus-fricative debate.

- Full text: https://pmc.ncbi.nlm.nih.gov/articles/PMC11449382/
- DOI: https://doi.org/10.1515/phon-2023-0023

The branch uses [ɹ] for onset Pinyin r, matching the University of Washington's broad chart:
- https://courses.washington.edu/chin342/ipa/syllables.html

This is a defensible broad convention, not a universal narrow phonetic claim. Keep onset r, syllabic ri, standalone er, and postvocalic erhua as separate cases.

## 3. Lexical tones versus surface tones

Published work confirms that Mandarin third tone is context-sensitive. In a T3+T3 sequence, the first syllable is commonly realized with a T2-like rising contour; other contexts can yield a low or low-falling realization. Neutral tone is also reduced and context-dependent. See:

- Chang and Kuo (2016), *PLOS ONE*, tone-3 sandhi in production: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0159835
- “Processing Mandarin Tone 3 Sandhi at the Morphosyntactic Interface” (2021), *Frontiers in Psychology*: https://pmc.ncbi.nlm.nih.gov/articles/PMC8427194/
- Chen et al., quantitative analysis of tone sandhi in Standard Mandarin and Nanjing Mandarin: https://doi.org/10.1075/ijchl.18011.che

The current converter appends citation-form tone contours independently to syllables. This is a valid scope boundary, provided it is described as lexical/citation-tone notation rather than connected-speech surface transcription. Do not implement tone-3 sandhi as a context-free rewrite: it requires at least neighboring tones and, for realistic output, prosodic/lexical context.

## 4. Required regression gates

- All seven apical forms have explicit expected outputs and must not collapse to [i].
- Onset r, ri, er, and erhua remain explicitly distinct in docs and tests.
- Citation tone tests are labelled lexical/citation-form tests.
- A T3+T3 surface-tone example is documented as out of scope, not as a failing syllable-level mapping.
- The evidence ledger distinguishes source-backed scope decisions from claims that an exact IPA string has been independently validated.

## Conclusion

The source audit justifies a cautious broad transcription policy and the current separation of segment positions. It does not yet certify the exact apical symbols or every final's phonetic realization. The release should remain labelled a research preview until the unresolved classes are adjudicated and class-complete expected-output fixtures are independently sourced.

## 5. Additional independent check of üe: evidence does not settle glide notation

A separate UCL-hosted phonetics dissertation table transcribes Pinyin `üe` as `[yɛ]`, alongside `üan [yɑn]` and `ün [yn]`. This supports the open-mid quality in the nucleus and confirms that `üe` is not simply `[ɥe]`; however, it does not independently validate converting the first element to the approximant `[ɥ]` in the project's chosen notation.

- UCL repository, *A Speech Pattern Processing Method for Chinese*: https://discovery.ucl.ac.uk/id/eprint/10103942/1/A_speech_pattern_processing_me.pdf

A separate phonology summary gives `yue [ɥe]`, which illustrates that sources differ in the phonetic representation and vowel-quality detail. It is not a primary phonetic source and should be treated only as a notation comparison:
- https://wiki.chogus.org/content/wikipedia_en_all_maxi_2025-08/Neutral_tone

**Decision:** retain `ɥɛ` as the project's explicit broad-IPA convention for now because the UW chart gives `yɛ` and the code converts the glide-like first element to `ɥ` while preserving `ɛ`. Mark the glide-versus-vowel analysis as unresolved, particularly for `nüe/lüe`; do not claim the exact string `nɥɛ/lɥɛ` has been independently established by two primary phonetic sources. A better next step is to consult a dedicated Mandarin phonetics reference or articulatory/acoustic study that explicitly analyzes this final after n/l and j/q/x.
