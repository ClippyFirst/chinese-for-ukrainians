# Mandarin benchmark source audit — 2026-11-08

Purpose: identify reusable public evidence and datasets for the next same-corpus Mandarin G2P benchmark. This is a source audit, not a benchmark result and not permission to redistribute third-party data.

## Findings

| Resource | What it provides | License / reuse status | Decision |
|---|---|---|---|
| Park & Lee (2020), CPP / g2pM | 99,264 polyphone-labelled Mandarin sentences; grouped by polyphone and split 8:1:1 into train/dev/test after double annotation agreement | Paper describes the dataset and benchmark; repository/dataset redistribution terms were not verified in this audit | Candidate benchmark/reference only; do not bundle or redistribute until exact data license and provenance are verified |
| Zhang et al. (2023), CVTE-Poly | 845,254 samples, designed to reduce CPP imbalance and correct labels against the then-current official dictionary | Public implementation repository identified, but a license file was not retrievable/verified. No permission inferred from public availability | Strong candidate for external comparison; BLOCKED for dataset integration until maintainer/license verification |
| AISHELL-3 / OpenSLR SLR93 | About 85 hours, 88,035 Mandarin utterances, 218 speakers, character-level and Pinyin-level transcripts | OpenSLR SLR93 page and archive-side `info.txt` state Apache License 2.0; publisher page independently states Apache 2.0; checksum file lists MD5 `6833e9dcb47709d4e153e2f669e5ddc8`. Internal archive files were not unpacked. | License/catalog metadata = DONE_VERIFIED; transcript paths/splits/normalization = BLOCKED pending archive listing and text-file inspection. No corpus rows or audio copied. |
| AISHELL-1 / OpenSLR SLR33 | Mandarin speech corpus from 400 speakers; OpenSLR catalog describes professional transcription and says free for academic use | Catalog states free for academic use; that is not a general commercial redistribution license | Research-only candidate; do not bundle or use for commercial claims without permission review |
| g2pW / g2pM / g2pC | Competing context-aware Pinyin G2P engines | Code, model weights, training data and dependency licenses must be checked independently | Benchmark only in pinned isolated environments with raw outputs and full provenance |

## Primary references

- Park, K. & Lee, S. (2020), g2pM: A Neural Grapheme-to-Phoneme Conversion Package for Mandarin Chinese Based on a New Open Benchmark Dataset, Interspeech 2020, DOI 10.21437/Interspeech.2020-1094: https://www.isca-archive.org/interspeech_2020/park20c_interspeech.html
- Zhang et al. (2023), CVTE-Poly: A New Benchmark for Chinese Polyphone Disambiguation, Interspeech 2023, DOI 10.21437/Interspeech.2023-553: https://www.isca-archive.org/interspeech_2023/zhang23h_interspeech.html
- CVTE-Poly implementation: https://github.com/NewZsh/polyphone
- AISHELL-3 catalog and stated license: https://openslr.org/93/
- Archive metadata: https://www.openslr.org/resources/93/info.txt
- Archive checksum: https://www.openslr.org/resources/93/checksum.md5 (MD5 `6833e9dcb47709d4e153e2f669e5ddc8`)
- Archive description: https://www.openslr.org/resources/93/about.html
- Publisher page (also states Apache 2.0): https://www.aishelltech.com/aishell_3
- Public paired Chinese/Pinyin examples: https://sos1sos2sixteen.github.io/aishell3/
- Baseline code repository (MIT code license; separate from corpus): https://github.com/sos1sos2Sixteen/aishell-3-baseline-fc
- AISHELL-1 catalog and academic-use scope: https://www.openslr.org/33/
- g2pW paper: https://www.isca-archive.org/interspeech_2022/chen22d_interspeech.html
- g2pC implementation: https://github.com/Kyubyong/g2pC

## Important distinctions

1. CPP and CVTE-Poly are research datasets for polyphone disambiguation; they are not gold for the project's IPA or any Ukrainian transcription convention.
2. AISHELL Pinyin transcripts can support phrase-level G2P evaluation only after exact archive schema, transcript normalization, and license terms are checked. They do not independently adjudicate IPA or Ukrainian targets.
3. A dataset's paper, code repository, model weights and annotations may have different licenses. Verify each separately.
4. Existing project-owned Han Dian lexical fixture is now 10 cases (after PR #55). It remains a smoke set, not a statistically representative held-out benchmark.
5. The owner-authored zh-in-ua.csv is valid as a project source table and may be used for deterministic reproduction/coverage checks, but cannot be presented as independent gold for its own runtime mapping.

## Execution ledger

| Task | Status | Evidence / acceptance |
|---|---|---|
| Expand source-linked Pinyin lexical smoke fixture from 6 to 10 | DONE_VERIFIED | PR #55 merged as 49a5083076edafd71877824b3694bf0fba34f9e2; exact Quality run #42488650345 passed |
| Identify large public Mandarin polyphone datasets | DONE_VERIFIED (discovery) | CPP and CVTE-Poly peer-reviewed papers; no dataset copied |
| Verify AISHELL-3 catalog/license metadata | DONE_VERIFIED | OpenSLR resource page, archive `info.txt`, and publisher page state Apache 2.0; archive checksum published |
| Verify AISHELL-3 transcript paths/schema from archive | BLOCKED | 18–19 GB archive not available for listing/unpacking in this runtime. Acceptance: inspect text-only transcript files, split membership, internal license/NOTICE and normalization; no audio import required |
| Integrate CPP/CVTE-Poly into repository | BLOCKED | Exact dataset redistribution license and provenance not established |
| Run competitor engines on same locked test set | BLOCKED | No eligible, license-cleared, downloaded corpus and no reproducible pinned competitor environment/raw predictions |
| Independent IPA and Ukrainian gold | TODO / evidence-limited | Requires source-level class adjudication and independent collation of each published Ukrainian table |
| Manual assistive-technology QA | BLOCKED | Requires human-operated NVDA, VoiceOver, TalkBack and physical mobile devices |

## Next executable sequence

1. Inspect AISHELL-3 archive listing and representative transcript files (text only). Verify internal LICENSE/NOTICE and exact train/dev/test separation.
2. Build a small source-attributed extraction only after transcript terms and provenance are clear; retain utterance IDs, original text/Pinyin, archive checksum and explicit normalization; never silently rewrite labels.
3. Pin pinyin-pro, pypinyin, g2pW, g2pM and g2pC code/model revisions in separate reproducible environments; capture installation failures as blockers, not scores.
4. Lock a held-out set before tuning; report character/syllable/tone/sentence exact match, polyphone-only accuracy, coverage/abstention, per-phenomenon metrics, latency and raw predictions.
5. Do not mix G2P metrics with IPA or the three distinct Ukrainian transcription systems.

## Conclusion

This audit improves the research plan and identifies a plausible licensed data route, but does not create new accuracy evidence. No accuracy percentage or cross-engine winner is authorized by source discovery alone.


## AISHELL-3 metadata verification update — 2026-11-08

- OpenSLR SLR93 page explicitly labels the resource Apache License v2.0 and identifies `data_aishell3.tgz` as speech data plus transcripts (~19 GB).
- Archive-side `info.txt` independently states `license: Apache License v.2.0`; `about.html` repeats the corpus description. `checksum.md5` lists `6833e9dcb47709d4e153e2f669e5ddc8` for `data_aishell3.tgz` (MD5 is an integrity locator, not a cryptographic authenticity guarantee).
- Publisher's AISHELL-3 page independently states Apache License v2.0. Public baseline samples show Chinese/Pinyin aligned examples.
- Baseline GitHub repository reports MIT for its code; that is separate from the corpus license.
- Not done: downloading/unpacking the 18–19 GB archive, verifying internal license/NOTICE, enumerating transcript paths/splits, or extracting text. No data/audio copied.
- Status: AISHELL-3 catalog/license metadata = DONE_VERIFIED; archive schema = BLOCKED by unavailable large-archive access; text-only benchmark extraction = TODO pending schema/terms inspection.
- Sources: https://openslr.org/93/ ; https://www.openslr.org/resources/93/info.txt ; https://www.openslr.org/resources/93/checksum.md5 ; https://www.aishelltech.com/aishell_3 ; https://sos1sos2sixteen.github.io/aishell3/ .
