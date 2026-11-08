# Mandarin benchmark source audit — 2026-11-08

Purpose: identify reusable public evidence and datasets for the next same-corpus Mandarin G2P benchmark. This is a source audit, not a benchmark result and not permission to redistribute third-party data.

## Findings

| Resource | What it provides | License / reuse status | Decision |
|---|---|---|---|
| Park & Lee (2020), CPP / g2pM | 99,264 polyphone-labelled Mandarin sentences; grouped by polyphone and split 8:1:1 into train/dev/test after double annotation agreement | Paper describes the dataset and benchmark; repository/dataset redistribution terms were not verified in this audit | Candidate benchmark/reference only; do not bundle or redistribute until exact data license and provenance are verified |
| Zhang et al. (2023), CVTE-Poly | 845,254 samples, designed to reduce CPP imbalance and correct labels against the then-current official dictionary | Public implementation repository identified, but a license file was not retrievable/verified. No permission inferred from public availability | Strong candidate for external comparison; BLOCKED for dataset integration until maintainer/license verification |
| AISHELL-3 / OpenSLR SLR93 | About 85 hours, 88,035 Mandarin utterances, 218 speakers, character-level and Pinyin-level transcripts | OpenSLR catalog states Apache License 2.0 | Candidate for phrase-level Pinyin checks after verifying the downloaded archive's exact license/metadata and Pinyin normalization; speech/audio is optional, not a gate |
| AISHELL-1 / OpenSLR SLR33 | Mandarin speech corpus from 400 speakers; OpenSLR catalog describes professional transcription and says free for academic use | Catalog states free for academic use; that is not a general commercial redistribution license | Research-only candidate; do not bundle or use for commercial claims without permission review |
| g2pW / g2pM / g2pC | Competing context-aware Pinyin G2P engines | Code, model weights, training data and dependency licenses must be checked independently | Benchmark only in pinned isolated environments with raw outputs and full provenance |

## Primary references

- Park, K. & Lee, S. (2020), g2pM: A Neural Grapheme-to-Phoneme Conversion Package for Mandarin Chinese Based on a New Open Benchmark Dataset, Interspeech 2020, DOI 10.21437/Interspeech.2020-1094: https://www.isca-archive.org/interspeech_2020/park20c_interspeech.html
- Zhang et al. (2023), CVTE-Poly: A New Benchmark for Chinese Polyphone Disambiguation, Interspeech 2023, DOI 10.21437/Interspeech.2023-553: https://www.isca-archive.org/interspeech_2023/zhang23h_interspeech.html
- CVTE-Poly implementation: https://github.com/NewZsh/polyphone
- AISHELL-3 catalog and stated license: https://openslr.org/93/
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
| Identify Apache-licensed phrase-level Pinyin corpus candidate | PARTIAL | AISHELL-3 OpenSLR catalog states Apache-2.0; exact archive-level license/schema still to verify |
| Integrate CPP/CVTE-Poly into repository | BLOCKED | Exact dataset redistribution license and provenance not established |
| Run competitor engines on same locked test set | BLOCKED | No eligible, license-cleared, downloaded corpus and no reproducible pinned competitor environment/raw predictions |
| Independent IPA and Ukrainian gold | TODO / evidence-limited | Requires source-level class adjudication and independent collation of each published Ukrainian table |
| Manual assistive-technology QA | BLOCKED | Requires human-operated NVDA, VoiceOver, TalkBack and physical mobile devices |

## Next executable sequence

1. Retrieve AISHELL-3 archive metadata and license file; inspect the Pinyin transcript schema without committing source audio or large corpus files.
2. Build a small, source-attributed evaluation extraction only if the license and terms permit; keep source IDs and checksums, never silently rewrite labels.
3. Pin pinyin-pro, pypinyin, g2pW, g2pM and g2pC code/model revisions in separate reproducible environments; capture installation failures as blockers, not scores.
4. Lock a held-out set before tuning; report character/syllable/tone/sentence exact match, polyphone-only accuracy, coverage/abstention, per-phenomenon metrics, latency and raw predictions.
5. Do not mix G2P metrics with IPA or the three distinct Ukrainian transcription systems.

## Conclusion

This audit improves the research plan and identifies a plausible licensed data route, but does not create new accuracy evidence. No accuracy percentage or cross-engine winner is authorized by source discovery alone.
