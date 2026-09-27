# Chinese for Ukrainians — Data Specification

## Source

Primary Ukrainian transcription source: `zh-in-ua.csv`

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

- normalize Unicode to NFC;
- trim surrounding whitespace;
- lowercase the lookup key;
- normalize `v` and `u:` to `ü`;
- remove a trailing tone number;
- tone marks are converted to their base vowel and tone is discarded for Ukrainian lookup.

The lookup key must not contain tone numbers or tone marks.

## Exceptional source rows

The current CSV should be treated as the live source and validated rather than described through stale defect assumptions. Special/edge forms may include:

- aliases such as `er/r`;
- standalone consonantal entries such as `m`, `n`, `ng`;
- entries with blank Ukrainian output cells;
- a Pinyin `ê` row;
- historical/edge entries that do not behave like ordinary Mandarin syllables.

Duplicate-key validation remains mandatory, but a duplicate is not assumed to exist merely because an older snapshot contained one.

## Key uniqueness policy

The build validator checks normalized Pinyin-key uniqueness against the current CSV. The current source has no duplicate normalized keys.

If a future data edit introduces a duplicate, the validator must fail and identify every conflicting source row. The conflict must be resolved in the CSV before release.

## Missing output policy

A blank output is meaningful source data until reviewed.

The app does not substitute another system's value. It preserves the original Chinese token in that output and emits a `missing` issue so the UI can explain why a direct transcription is unavailable.

## Generated format

The generated module is:

```js
export const transcriptionMap = {
  kirnosova: {
    bei: {
      value: "бей",
      missing: false,
      sourceRow: 11,
      sourceKey: "bei"
    }
  },
  kirnosova_tsisar: {},
  nanu: {}
};
```

The actual generated file contains the complete current mapping and is regenerated from the CSV. It must not be edited manually.

## Data tests

Tests verify:

- exact column names;
- UTF-8/BOM handling;
- row shape;
- normalized-key uniqueness;
- aliases;
- intentional blanks;
- deterministic generated output;
- system-specific lookup without cross-system fallback.
