# Cross-engine benchmark: Mandarin → Pinyin, IPA, and Ukrainian

**Status:** benchmark protocol and execution ledger; empirical cross-engine ranking not yet established.  
**Started:** 2026-10-24  
**Repository:** https://github.com/ClippyFirst/chinese-for-ukrainians  
**Branch:** `research/cross-engine-benchmark-2026-10-24`

## Executive finding

The repository currently has three distinct tasks that must not be collapsed into one score:

1. Chinese text → selected Pinyin reading (G2P / polyphone disambiguation).
2. Pinyin → the project's documented broad IPA convention.
3. Chinese text → one of three source-specific Ukrainian practical transcription systems.

The current production code uses `pinyin-pro@3.29.4` for selected Pinyin, `src/app/ipa.js` for a deterministic broad-IPA rendering, and three independently keyed Ukrainian tables in `zh-in-ua.csv`. The Ukrainian outputs are **not derived from the IPA string**. A benchmark must preserve this fact and report layer-specific scores plus end-to-end error attribution.

No competitor has been run against the same corpus in this environment during this work. Consequently, this document does not claim an empirical win/loss, reproduce a vendor score as a local result, or treat a model-generated transcription as ground truth.

## Candidate engines and their valid roles

| Candidate | Role | Evidence available | Limitations / benchmark notes |
|---|---|---|---|
| `pinyin-pro@3.29.4` | Current Pinyin baseline | Pinned dependency and project integration tests | Baseline must be tested on a held-out corpus; upstream performance claims are not local measurements. |
| [g2pW](https://github.com/GitYCC/g2pW), Interspeech 2022 | Context-sensitive Mandarin polyphone disambiguation; supports Pinyin output | Peer-reviewed paper and public implementation: https://doi.org/10.21437/Interspeech.2022-216 | Python/PyTorch or ONNX setup is materially heavier than the browser baseline. Pin model/checkpoint and record any None/unknown output. |
| [g2pM](https://github.com/kakaobrain/g2pm), Interspeech 2020 | Context-sensitive Mandarin Pinyin G2P | Paper and public CPP benchmark; repository reports 97.31% test accuracy for its model and 97.85% for Chinese BERT on that benchmark | Those numbers are not comparable to a result on this project's corpus. Older package/dependency constraints need a separate reproducible environment. |
| [g2pC](https://github.com/Kyubyong/g2pC) | Context-aware Pinyin G2P | Repository reports 98.80% on its own 13,191-syllable internal test set | Internal set and evaluation protocol differ; use as a candidate only if install and licensing/reproducibility checks pass. |
| [pinyin-to-ipa](https://github.com/stefantaubert/pinyin-to-ipa) | Pinyin → IPA, Python library/CLI | Public package documentation and source; supports multiple candidate outputs for some inputs | Not a Mandarin text G2P system. Preserve candidate outputs and do not arbitrarily count the first candidate as truth. Its notation/tone conventions may differ. |
| [pinyin2ipa](https://github.com/Connum/npm-pinyin2ipa) | Pinyin notation conversion / phonetic representation | Public JavaScript package | Verify output contract: README examples may describe transformed Pinyin notation rather than IPA in all modes. Do not classify it as an IPA competitor until output symbols and contract are inspected. |
| [Montreal Forced Aligner Mandarin model](https://huggingface.co/MontrealCorpusTools/mandarin_mfa) | Pronunciation dictionary / acoustic alignment support | Public model resources | MFA is an aligner, not a direct substitute for this browser converter. Use its dictionary as a secondary lexicon only after licensing and phone-set mapping review. |

### Research sources

- Chen et al. (2022), *g2pW: A Conditional Weighted Softmax BERT for Polyphone Disambiguation in Mandarin*, Interspeech 2022, pp. 1926–1930, DOI 10.21437/Interspeech.2022-216: https://www.isca-archive.org/interspeech_2022/chen22d_interspeech.html
- Park & Lee (2020), *A Neural Grapheme-to-Phoneme Conversion Package for Mandarin Chinese Based on a New Open Benchmark Dataset*, Interspeech 2020, arXiv: https://arxiv.org/abs/2004.03136 and implementation: https://github.com/kakaobrain/g2pm
- g2pC implementation and its explicitly internal test figures: https://github.com/Kyubyong/g2pC
- pinyin-to-ipa implementation and output contract: https://github.com/stefantaubert/pinyin-to-ipa
- pinyin2ipa implementation: https://github.com/Connum/npm-pinyin2ipa

## Benchmark design

### Dataset partitions

Maintain three separate datasets and never use the same rows for tuning and final reporting.

1. **Development set:** debug adapters and agree normalization rules.
2. **Held-out linguistic test set:** locked before model comparisons; balanced by phenomena, not just common-character frequency.
3. **Challenge set:** proper names, rare words, simplified/traditional variants, code-switching, polyphones, neutral tone, interjections, unsupported readings, and punctuation.

Every gold record must include the exact source string, target span, intended reading/sense, source URL or bibliographic citation, evidence scope, transcription convention, reviewer/status, and license/reuse notes. A model output is not a source citation. For disputed pronunciation, keep multiple accepted readings or mark the case unresolved rather than inventing a single answer.

### Layer A — Chinese → Pinyin

Compare the current pinned `pinyin-pro` baseline against g2pW, g2pM, and g2pC when each can be installed and executed reproducibly.

Required metrics:
- target-character reading accuracy;
- tone accuracy separately from segmental Pinyin;
- sentence exact match;
- accuracy on polyphonic target characters only;
- accuracy by simplified/traditional input;
- coverage and abstention/unknown rate;
- latency per sentence and per 1,000 Han characters;
- peak resident memory and model/runtime footprint where measurable.

A character-level accuracy number can hide sentence-level failure. Report both micro-averages and per-phenomenon breakdowns. If the model's tokenizer, word segmentation, or tone sandhi contract differs, normalize only documented representational differences.

### Layer B — Pinyin → IPA

Compare `pinyinToIPA` with pinyin-to-ipa candidate outputs on the same numbered-tone and tone-marked Pinyin inputs.

Required metrics:
- exact match after only pre-registered normalization;
- segmental IPA error rate excluding tone markers;
- tone-mark error rate separately;
- phoneme edit distance;
- output candidate count / ambiguity rate;
- supported-input coverage and explicit unsupported rate;
- class-specific errors: initials, finals, apical vowels, syllabic nasals, ü/y/w spelling, zero initials, erhua, neutral tone, lexical tone contours, interjections.

Important: there is no single universal string-level IPA gold standard for every broad-transcription convention. First declare the target convention. Record legitimate notation variants as equivalence classes only when a phonetic source or the project's explicit convention supports that equivalence. Do not silently equate distinct segmental analyses.

### Layer C — Chinese → Ukrainian

Report each system independently: Kirnosova, Kirnosova–Tsisar, and NANU. The canonical CSV can support a **reproduction/regression score**, but it is not an independent accuracy gold set because the implementation reads that same data.

For a real accuracy benchmark, create a held-out set independently collated against the relevant publications/official tables. Record row-level citations and adjudication. Until the source-table collation and rights review are complete, label results as coverage/reproduction, not accuracy.

Required metrics per Ukrainian system:
- exact match against independently verified target strings;
- CER and grapheme edit distance;
- tone-mark accuracy reported separately;
- coverage and unresolved rate;
- fallback/guess rate (target should be zero for unsupported entries);
- disagreement rate between the three systems (descriptive, not a correctness score);
- error attribution: upstream selected-Pinyin error vs mapping/data error vs formatting error.

Do not average the three Ukrainian systems into one accuracy score. They are separate source-defined conventions, not three competing models targeting one canonical answer.

## Fair runtime protocol

- Record OS, CPU, RAM, runtime versions, dependency lock/checkpoint hashes, and command line.
- Use the same corpus file and deterministic input order for all systems.
- Warm up each runtime, then run at least 5 measured repetitions; report median and p95 latency. Report cold-start/model-load time separately.
- Keep offline model downloads cached and record their checksums; no implicit downloads during timed runs.
- Do not compare browser JavaScript latency to a warmed Python GPU model without clearly labeling hardware/runtime differences.
- Pin the exact model revision, dictionary version, and all package versions.
- Save raw predictions and per-row error classifications, not only aggregate scores.
- Treat a failed install, unavailable model weight, or inaccessible dataset as BLOCKED; do not substitute a different model silently.
- Run licensed models only after their code, checkpoint, lexicon, and corpus redistribution terms are reviewed.

## Interpretation of existing repository tests

- The 403-syllable inventory test demonstrates that every inventory key maps to a non-empty output under the project's convention. It does not establish acoustic accuracy.
- Tone suffix tests establish deterministic formatting, not lexical legality or tone-sandhi correctness.
- CSV-to-generated-map equality establishes artifact determinism, not the correctness of each source table cell.
- The existing `scripts/benchmark.mjs` measures conversion time on repeated text at sizes 1, 10, 100, and 1,000 characters. It currently does not compare engines, score linguistic outputs, persist raw predictions, measure cold starts, or record environment metadata.
- The six source-linked Pinyin fixtures are a smoke corpus only; their size is insufficient for a statistically meaningful ranking.

## Task ledger

| Task | Status | Acceptance criterion |
|---|---|---|
| Identify relevant open-source Pinyin/G2P competitors | DONE_VERIFIED (source discovery) | Public implementation/paper links recorded; role limitations documented |
| Separate the three benchmark targets | DONE_VERIFIED | Metrics and gold-data requirements defined per layer |
| Record current baseline behavior and limitations | DONE_VERIFIED (code inspection) | Existing `ipa.js`, `transcribe.js`, `ipa-transcription.js`, and `benchmark.mjs` behavior described accurately |
| Establish independent held-out Mandarin G2P gold set | TODO | Source-backed examples, intended reading/sense, reviewer and license metadata |
| Run g2pW on same corpus | BLOCKED until environment setup | Pinned code/checkpoint + successful run + raw predictions + metrics |
| Run g2pM on same corpus | BLOCKED until environment setup | Pinned code/checkpoint + successful run + raw predictions + metrics |
| Run g2pC on same corpus | BLOCKED until environment setup | Pinned code/data + successful run + raw predictions + metrics |
| Compare IPA adapters on shared Pinyin corpus | PARTIAL | Candidate identified; must run both adapters and adjudicate output conventions |
| Independently collate Ukrainian gold rows | TODO / evidence-limited | Row-level primary-source checks and rights review |
| Compare all three Ukrainian systems on held-out gold | BLOCKED by independent gold corpus | Per-system exact match, CER, coverage, tone and error attribution |
| Produce benchmark artifact with raw results and environment manifest | TODO | Reproducible command and machine-readable outputs committed; CI or documented run passes |

## Current decision

Do not claim that this repository is more accurate than the listed engines yet. The defensible current claim is narrower: it has a transparent deterministic broad-IPA adapter, three separate source-specific Ukrainian mappings, and explicit handling for unresolved/missing values. Comparative superiority must be established by the same-corpus experiments described above.


## Hosted CI execution record — 2026-10-24

Exact workflow run [#40078028959](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40078028959) completed successfully on commit `6c9ba05993be3ff96467fbbfe3a6c21e907f4cb3`. All three jobs passed and artifacts were confirmed: `node-baseline-and-manifest`, `python-candidate-install-contracts`, and `g2pc-documented-example-smoke`.

The Node job passed dependency installation, the project regression suite, `npm run validate:benchmark-corpus`, the existing latency smoke benchmark, environment-manifest generation, and artifact upload. The validator now rejects malformed CSV quote syntax and prevents unverified rows from being placed in the held-out partition. This remains structural validation, not linguistic gold verification.

**g2pC is still BLOCKED.** Its job succeeded by recording a blocker artifact after the upstream `pkuseg` native extension failed to compile on Python 3.10, even with `numpy<2`. The artifact contains no predictions. No g2pC accuracy or runtime result is available.

No shared held-out linguistic corpus has yet been evaluated; g2pW/g2pM remain unexecuted, IPA adapters remain unscored, and Ukrainian system accuracy remains evidence-limited. Therefore no comparative winner or accuracy claim is authorized.
