# Chinese for Ukrainians — Data Specification

## Source

Primary Ukrainian transcription source: zh-in-ua.csv

Columns:
- №
- Піньїнь
- Кірносова
- Кірносова—Цісар
- НАНУ

The three Ukrainian columns are separate output systems and must remain separate in generated data.

## Source-of-truth rule

Do not manually rewrite the transcription table inside application code.

The CSV is the canonical editable table. Build tooling converts it to an application-friendly structure.

## Pinyin key normalization

Before lookup:
- trim surrounding whitespace;
- preserve Unicode characters;
- normalize ü consistently;
- remove tone marks from display Pinyin to obtain the canonical lookup syllable;
- lowercase the lookup key.

The lookup key must not contain tone numbers or tone marks.

## Exceptional source rows

The current CSV should be treated as the live source and validated rather than described through stale defect assumptions. Special/edge forms may include:
- aliases such as er/r;
- standalone consonantal entries such as m, n, ng;
- entries with blank Ukrainian output cells;
- a Pinyin ê row;
- historical/edge entries that do not behave like ordinary Mandarin syllables.

Duplicate-key validation remains mandatory, but a duplicate is not assumed to exist merely because an older snapshot contained one.

These rows must be preserved and explicitly classified.

## Duplicate policy

Duplicates must never be silently overwritten.

Recommended generated representation:

{
  "pou": [
    {"sourceRow": 260, "kirnosova": "поу", "kirnosova_tsisar": "пов", "nanu": ""},
    {"sourceRow": 261, "kirnosova": "пу", "kirnosova_tsisar": "пу", "nanu": ""}
  ]
}

Then the application layer chooses according to an explicit rule. If no rule exists, mark the result ambiguous instead of guessing.

## Missing output policy

A blank output is meaningful source data until reviewed.

The app must not substitute another system's value.

For an empty selected-system mapping:
- show the original Pinyin syllable as fallback only if the UI clearly marks it as unresolved;
- log the row in validation output;
- include it in the data-quality report.

## Case handling

The data table stores lowercase syllable mappings.

Output capitalization should be applied at token level. Do not simply uppercase the first character of the entire output.

## Tones

The Ukrainian transcription columns do not use Mandarin tone marks as part of the lookup key.

Therefore Běijīng maps to lookup keys bei and jing.

Pinyin display retains tone information.

## Generated format

Recommended generated JSON:

{
  "version": 1,
  "source": "zh-in-ua.csv",
  "systems": {
    "kirnosova": {"label": "Кірносова"},
    "kirnosova_tsisar": {"label": "Кірносова—Цісар"},
    "nanu": {"label": "НАНУ"}
  },
  "syllables": {
    "bei": {
      "kirnosova": "бей",
      "kirnosova_tsisar": "бей",
      "nanu": "бей"
    }
  }
}

## Data tests

Tests must verify:
- expected row count;
- exact column names;
- UTF-8;
- no accidental whitespace;
- duplicate keys are reported;
- intentional blanks are reported;
- all ordinary Pinyin keys are reachable;
- generated JSON is deterministic.
