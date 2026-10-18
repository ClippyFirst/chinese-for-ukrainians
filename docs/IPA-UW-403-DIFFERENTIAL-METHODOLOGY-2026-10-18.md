# UW 403-key differential: method and interpretation (2026-10-18)

## Purpose

This file explains the generated table at [IPA-UW-403-SYLLABLE-DIFFERENTIAL-2026-10-18.csv](./IPA-UW-403-SYLLABLE-DIFFERENTIAL-2026-10-18.csv). It is a reproducible comparison of the 403 Pinyin keys in the captured University of Washington (UW) chart and the converter's current output. It is **not** a validated 403-syllable gold standard.

## Snapshot summary

- Reference keys: **403**
- Converter outputs missing for these keys: **0**
- Literal Unicode string matches between UW's raw IPA field and current output: **165**
- Different raw strings: **238**

A literal match is not proof of phonetic correctness. A different string is not proof of an error: the chart and implementation use different symbol conventions in several classes (for example, UW often writes Pinyin-like ai/au/ua, while this project uses explicit glide/offglide notation such as aɪ/ɑʊ/wa). The table intentionally keeps literal_relation separate from class_adjudication_status.

## Column definitions

| Column | Meaning |
|---|---|
| pinyin | Exact Pinyin key from the captured UW chart |
| uw_ipa_raw | Source string preserved in the fixture; not normalized |
| current_ipa_broad | Current result from pinyinToIPA(), without a tone suffix |
| source_kind | Provenance category recorded in the fixture |
| literal_relation | Exact string equality only; not a phonetic verdict |
| class_adjudication_status | Class-level state inherited from the adjudication register |
| normalized_final_class | Final class used to group related Pinyin spellings |
| note | Warning against treating raw inequality as a confirmed error |

## Class-status counts in this snapshot

| Status | Rows | Interpretation |
|---|---:|---|
| unresolved | 22 | Includes ong, iong, üan, and er contexts whose target sequence/quality remains disputed |
| convention-decision-needed | 6 | The class needs a documented convention or vowel-quality decision |
| convention-conversion | 86 | The comparison requires an explicit notation mapping |
| source-aligned-for-sampled-cases | 19 | Agreement exists for sampled cases only, not every possible context |
| source-aligned-for-sampled-alias | 4 | Sampled zero-initial alias alignment only |
| broad-convention-decided-with-caveat | 61 | The [ɑ]-type nucleus is standardized across ao/iao/ang/iang/uang; single-speaker acoustic limits remain |
| partially-corroborated-or-pending | 205 | Class needs further independent adjudication; this is not a pass |

The row counts describe how many syllable keys inherit a class status; they are not 403 independent research findings. A class with many rows does not have more evidence than a class with fewer rows.

## Reproduction and CI

~~~bash
npm run audit:ipa:uw
npm test
~~~

The generator imports the real pinyinToIPA() function, reads the committed raw UW fixture, and regenerates the CSV. The test runs the generator in --check mode, failing if the committed table is stale, any reference key is missing, or any key yields no output. This guarantees reproducibility and key coverage—not scientific correctness.

## Limits and next gate

1. Map the UW notation to the project's broad-IPA convention explicitly, class by class.
2. Keep raw source transcription and normalized project output in separate columns.
3. Adjudicate unresolved classes using independent academic phonetic evidence; do not turn the converter's own output into a gold label.
4. Expand source-backed coverage across legal onset/final combinations and record dialect, speaker sample, and transcription depth.
5. Only then label a class verified.

The current result is therefore a useful automated inventory/differential gate. It is not grounds to claim all 403 syllables are phonetically verified.
