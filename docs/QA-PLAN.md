# Chinese for Ukrainians — QA Plan

## Test layers

### Data tests
Validate zh-in-ua.csv and generated mapping data with npm run validate:data and npm run generate:data.

### Unit/integration tests
The required npm test suite uses Node's built-in test runner and covers:
- Unicode Han scanning;
- Simplified/Traditional/mixed/undetermined detection;
- Pinyin normalization and tone rendering;
- IPA mappings, apical vowels, tones, and visible unsupported-form markers;
- phrase/context pronunciation through the injected engine contract;
- integration fixtures against the actual pinned pinyin-pro engine;
- Ukrainian lookup, including tone-marked input normalization;
- system-specific differences and missing mappings;
- punctuation and Latin preservation;
- deterministic conversion and generated mapping data.

### Browser tests
npm run test:browser covers empty/results/issue states and all five visible representations; keyboard-operable script controls and source non-mutation; copy exactness, live-region feedback, and reset state; keyboard focus and tooltip discoverability; horizontal overflow at 320, 360, 390 and 430 CSS pixels; and reduced-motion preference.

## Mandatory fixtures
Include Simplified Chinese, Traditional Chinese, shared-only Han text, mixed scripts, punctuation/line breaks, numbers/Latin, polyphonic characters, unresolved characters, unsupported IPA forms, and synthetic duplicate-key mutations.

## Invariants
- Non-Chinese text is preserved.
- Copying a result returns exactly the displayed text.
- Script selection does not mutate input.
- Repeated conversion and generated mappings are deterministic.
- One Ukrainian system never borrows a blank value from another.
- Unsupported IPA is visibly marked; it must not silently become a Han character.
- Tone-marked and tone-number Pinyin resolve to the same Ukrainian table key.

## Performance and release
npm run benchmark measures conversion latency for 1, 10, 100 and 1000 Chinese characters. npm run check:release checks application-source constraints and static bundle size.

## Regression policy
Every correction to zh-in-ua.csv that affects output should add or update a regression fixture. See PHONETIC-REPRODUCIBILITY.md for the distinction between passing software tests and verified linguistic evidence.
