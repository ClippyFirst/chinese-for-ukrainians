# IPA adapter execution addendum

The current implementation emits IPA and Ukrainian outputs in parallel. A direct IPA-key substitution is unsafe until collisions are audited and source-backed decisions are recorded. No phonetic mappings or runtime code were changed.

Next: implement a deterministic inventory collision audit, review each divergent collision against primary sources, then define and test the typed phonetic-token boundary before changing Ukrainian output generation.


## New executable evidence gate

A deterministic inventory audit now exists at `scripts/audit-ipa-adapter-readiness.mjs`; its regression test is `tests/ipa-adapter-readiness.test.mjs`. It reports unsupported IPA keys and source rows that collapse to the same IPA while having different Ukrainian outputs. This is a diagnostic gate, not an implementation of the IPA-first adapter. Exact counts and CI status must be copied from the workflow run after the updated branch finishes.
