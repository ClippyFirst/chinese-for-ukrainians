# Chinese for Ukrainians — Roadmap

## Phase 0 — Foundation — complete

- product requirements;
- architecture;
- visual system;
- current CSV validation;
- pronunciation engine and licensing decision;
- automated test scaffold.

## Phase 1 — MVP — implemented on the converter branch

- static page;
- Chinese input;
- Auto/Simplified/Traditional selector;
- Pinyin;
- Кірносова;
- Кірносова—Цісар;
- НАНУ;
- independent copy controls;
- responsive/accessibility baseline;
- explicit uncertainty state;
- static security/release checks.

## Phase 2 — Reliability — partially implemented

Already present:

- phrase/context-aware pronunciation through the selected engine;
- Traditional dictionary path;
- generated CSV mappings;
- duplicate-key validation;
- deterministic conversion tests;
- unresolved/missing mapping metadata.

Still planned:

- larger curated polyphonic regression corpus;
- broader golden fixtures sourced from reviewed reference material;
- automated visual regression.

## Phase 3 — Comparison tooling

- synchronized highlighting by syllable;
- click a syllable to inspect Pinyin and all three Ukrainian outputs;
- side-by-side difference emphasis;
- source row/rule explanation.

## Phase 4 — Optional expansion

Only if there is a clear need:

- Cantonese/Jyutping;
- additional Ukrainian transcription systems;
- Belarusian system;
- Russian Palladius;
- Wade–Giles;
- Zhuyin.

These should remain separate modules built on the same canonical pronunciation architecture.
