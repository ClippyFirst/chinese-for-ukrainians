# Chinese for Ukrainians — QA Plan

## Test layers

### Data tests
Validate zh-in-ua.csv and generated mapping data.

### Unit tests
Test:
- script detection;
- Pinyin normalization;
- tone removal;
- Ukrainian lookup;
- case handling;
- duplicate handling;
- missing mappings;
- punctuation preservation.

### Integration tests
Test the full pipeline:
Chinese → Pinyin → three Ukrainian systems.

### Browser tests
Test:
- typing;
- paste;
- copy;
- keyboard navigation;
- responsive layout;
- screen-reader announcements;
- mobile viewport.

## Mandatory fixtures

Include fixtures covering:
- Simplified Chinese;
- Traditional Chinese;
- a text where both scripts contain shared characters only;
- mixed Simplified/Traditional text;
- punctuation and line breaks;
- numbers and Latin text;
- polyphonic Chinese characters;
- an unresolved character;
- a duplicate/ambiguous CSV mapping such as pou.

## Golden test examples

Use known words/names as regression fixtures, with expected Pinyin and each Ukrainian system stored explicitly.

At minimum include examples where systems agree and examples where they differ.

The test data must identify its source rather than relying on assumptions.

## Property tests

Useful invariants:
- Non-Chinese punctuation is preserved.
- Copying a result returns exactly the displayed text.
- Changing the selected script mode does not mutate source input.
- Running conversion twice produces the same result.
- Generated mapping data is deterministic.

## Accessibility QA

Check:
- tab order;
- focus visibility;
- form labels;
- button names;
- live-region announcements;
- zoom to 200%;
- narrow viewport;
- reduced motion.

## Performance QA

Measure:
- initial HTML/CSS/JS payload;
- time to interactive;
- conversion latency for 1, 10, 100, and 1000 Chinese characters.

Avoid shipping an unnecessarily large dictionary if a smaller browser-friendly dataset can provide equivalent quality.

## Regression policy

Every correction to zh-in-ua.csv must add or update a fixture when the changed row affects application output.
