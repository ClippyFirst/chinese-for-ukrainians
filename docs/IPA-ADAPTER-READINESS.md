# IPA adapter readiness

**Status: PARTIAL — inventory audit implemented; adapter migration remains TODO.** The executable diagnostic is `scripts/audit-ipa-adapter-readiness.mjs`; its regression test is `tests/ipa-adapter-readiness.test.mjs`. CI must establish its results on the exact commit. This document does not claim the IPA-first pipeline exists.

## Current behavior

The runtime resolves Chinese text to Pinyin tokens. It formats IPA from those tokens. Separately, the three Ukrainian outputs look up values using normalized Pinyin keys from `zh-in-ua.csv`. IPA is not passed into the Ukrainian transcription functions.

## Why a direct conversion is unsafe

A broad IPA representation can merge distinctions encoded by different Pinyin keys. If the corresponding Ukrainian CSV values differ, an IPA-keyed map could overwrite a source distinction. Empty cells are also system-specific and must not be filled from another system.

## Required work

1. **Implemented, pending exact-head CI evidence:** `node scripts/audit-ipa-adapter-readiness.mjs --json` reports unsupported IPA keys and IPA-key collisions across every CSV alias. Review its actual output before making architecture decisions.
2. Review collisions against primary phonetic and Ukrainian transcription sources.
3. Define a typed phonetic token containing segments, tone, syllable boundaries, source span, provenance, resolution status and uncertainty.
4. Specify an adapter for each Ukrainian system and document which features it preserves or merges.
5. Add golden tests for every reviewed collision, unsupported form, blank cell and system-specific divergence.
6. Compare old and new outputs across the full inventory and an independently sourced word corpus.
7. Route Ukrainian outputs through the adapter only after the evidence and regression gates pass.

## Acceptance criteria

- No silent last-write-wins collision handling.
- No fallback between Ukrainian systems.
- Unsupported pronunciations remain explicit rather than guessed.
- Source provenance, tone, syllable boundaries and uncertainty remain inspectable.
- Every output change has a reviewed rule or source-backed correction.
- Data validation, unit/integration/browser tests, generated-map determinism and release checks pass on the exact commit.
- README, methodology and architecture documentation match the implementation.

Until these criteria pass, retain the current pipeline and public beta / research preview status. Do not rewrite CSV values by assumption or describe broad IPA as narrow acoustic transcription.
