# Targeted adjudication: üan and low-vowel quality (2026-10-19)

## Question

Does the vowel in Pinyin `üan` support the current broad output `ɥɛn`, or should the implementation follow the UCL table's `yɑn`?

## Evidence

### 1. Direct acoustic study: Liu (2026)

Yirong Liu, “Acoustic Realization of Mandarin /a/ Class Finals—An Experimental Phonetic Analysis Based on Four Types of Allophones,” *Modern Linguistics* 14(6), 737–748, published 25 June 2026. https://doi.org/10.12677/ml.2026.146578

- The study measured F1, F2, and vowel duration for 80 lexical items (20 per allophone class), each recorded three times by one adult male speaker described as having standard Mandarin pronunciation.
- Its four-way classification groups `ian` and `üan` together as a front open-mid [ɛ]-type realization of /a/ when a front high medial is followed by final /n/.
- The author reports that the [ɛ]-type class had the highest F2 and lowest F1 in the study, consistent with a raised/fronted realization rather than [ɑ].
- The article also discusses the traditional five-way analysis that distinguishes [ɛ] in `ian` from [æ] in `üan`. In this speaker's measurements, the F2 means differed (about 1942 Hz for `ian` vs about 1713 Hz for `üan`), but their distributions overlapped; the author therefore retained a four-way analysis rather than treating them as a categorical contrast.

**Limit:** this is a small, single-speaker descriptive acoustic study, not a population-level standard or a complete comparison of all syllable contexts. It supports [ɛ]-like quality in the sampled class but cannot settle every speaker's realization.

### 2. University of Washington chart

UW's zero-initial `yuan` entry is transcribed `yɛn`; its convention note explains that the chart uses `y` for the rounded-palatal glide /ɥ/. Converting that glide symbol to the project's ordinary IPA `ɥ` yields `ɥɛn`.

- https://courses.washington.edu/chin342/ipa/syllables.html
- https://courses.washington.edu/chin342/ipa/about.html

This is a convention-aligned witness for the current segment sequence, but it is not an acoustic gold label.

### 3. UCL dissertation table

The UCL finals table records `üan` as `yɑn`, differing in both the glide/vowel interpretation and the quality of the low vowel.

- https://discovery.ucl.ac.uk/id/eprint/10103942/1/A_speech_pattern_processing_me.pdf

This is a genuine competing transcription. The table alone does not show that its [ɑ] is a directly measured narrow target for every Standard Mandarin speaker.

## Adjudication

**Current output `ɥɛn` gains partial acoustic corroboration, but the class remains unresolved rather than fully verified.** The direct acoustic study and UW chart both support an [ɛ]-like nucleus in the relevant context; the UCL table supplies a conflicting [ɑ]-type analysis, and the acoustic sample is too small to claim universality.

No code change is warranted in this pass. Do not automatically change `yuan` to `ɥɑn` on the strength of one table, and do not erase the UCL disagreement from the evidence ledger.

## Follow-up gate

1. Compare additional Standard Mandarin acoustic data with a documented speaker sample and a clear phonetic transcription.
2. Distinguish a phonological representation of the final from a narrow phonetic realization.
3. Keep the current regression fixture for `yuan` as an implementation guard, not independent proof.
4. Revisit the broader `a/ɑ/ɛ/æ` policy jointly across `a, an, ang, ian, iang, uan, uang, üan`; avoid choosing each class independently.
