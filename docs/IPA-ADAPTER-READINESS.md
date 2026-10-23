# IPA adapter implementation and remaining research gates

**Status: adapter boundary implemented; linguistic evidence work remains partial.** PR #34 merged the runtime change that routes Ukrainian output through segmental IPA keys. The executable inventory audit is `scripts/audit-ipa-adapter-readiness.mjs`; its regression test is `tests/ipa-adapter-readiness.test.mjs`.

## Current behavior

The runtime resolves Chinese text to Pinyin pronunciation tokens. Each resolved token also carries a segmental IPA key. The three Ukrainian adapters consume that IPA key and look up system-specific values in maps derived from the canonical `zh-in-ua.csv`. Adapter entries retain source row, source Pinyin key and explicit missing markers. A collision throws rather than overwriting an entry. Unsupported IPA forms remain unresolved and never fall back to Pinyin lookup.

## Inventory evidence

Quality run #40012228389 passed 72 tests and all configured gates on the code-identical PR head. The current deterministic inventory audit must be rerun on this branch. The code now explicitly maps the evidence-backed marginal forms `ê → ɛ` and `yo → jɔ` (broad-IPA project convention); `hm` and `hng` remain intentionally unsupported because reviewed sources attest their spellings but do not establish a defensible segmental IPA target. Preserve these as explicit scope limitations rather than guessing.

These counts demonstrate structural coverage and key uniqueness under the current finite IPA function. They do not independently prove the correctness of every IPA segment or Ukrainian transcription.

## Remaining research work

1. `ê` and `yo` have explicit, tested broad-IPA conventions and remain marked as marginal interjectional forms, not ordinary productive syllables. `hm` and `hng` remain intentionally unresolved pending direct phonetic evidence; this is not a blocker for the documented standard-syllable scope.
2. Build a source-grounded word-level regression corpus in addition to the syllable inventory.
3. Review whether the broad IPA conventions for rhotics, contracted finals, vowel quality and lexical tone are the appropriate documented target for this project.
4. Complete source-by-source rights review for reproduced datasets and source material.
5. Complete manual screen-reader, physical speech-output and clipboard-permission checks on real devices.

## Acceptance criteria

- No silent IPA-key overwrite.
- No fallback between Ukrainian systems or from unsupported IPA to Pinyin.
- Source provenance, tone, syllable boundaries, uncertainty and missing values remain inspectable.
- Every changed output has a reviewed rule or source-backed correction.
- Data validation, unit/integration/browser tests, generated-map determinism and release checks pass on the exact release candidate.
- README, methodology and architecture documentation match the implementation.

The product remains **public beta / research preview**. The adapter boundary is implemented, but this is not a claim of universal linguistic correctness or narrow acoustic transcription.
