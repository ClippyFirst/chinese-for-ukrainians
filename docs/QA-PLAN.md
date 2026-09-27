# Chinese for Ukrainians — QA Plan

## Test layers

### Data tests

Validate `zh-in-ua.csv` and generated mapping data with `npm run validate:data` and `npm run generate:data`.

### Unit/integration tests

The required `npm test` suite uses Node's built-in test runner and covers:

- Unicode Han scanning;
- Simplified/Traditional/mixed/undetermined detection;
- Pinyin normalization and tone rendering;
- phrase/context pronunciation through the injected engine contract;
- Ukrainian lookup;
- system-specific differences;
- missing mappings;
- punctuation and Latin preservation;
- deterministic conversion;
- UI label/view-model helpers.

### Browser tests

`npm run test:browser` covers:

- initial empty state;
- example flow;
- script selector;
- source non-mutation;
- copy;
- mobile overflow;
- reduced-motion preference.

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
- a synthetic duplicate-key mutation of the current CSV (validator regression only; the current source data is expected to remain duplicate-free).

## Property-style invariants

- Non-Chinese text is preserved.
- Copying a result returns exactly the displayed text.
- Changing script mode does not mutate source input.
- Repeated conversion is deterministic.
- Generated mapping data is deterministic.
- One Ukrainian system never borrows a blank value from another system.

## Accessibility QA

Check:

- tab order;
- focus visibility;
- semantic form labels;
- button names;
- live-region announcements;
- narrow viewport;
- reduced motion.

## Performance QA

`npm run benchmark` measures conversion latency for 1, 10, 100 and 1000 Chinese characters.

`npm run check:release` also checks application-source security constraints and the static bundle size.

## Regression policy

Every correction to `zh-in-ua.csv` that affects application output should add or update a regression fixture.
