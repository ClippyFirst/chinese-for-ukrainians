# Historical IPA adapter execution addendum — 2026-10-23

**Status: superseded.** This file began as a pre-implementation risk note. Its original description of parallel IPA/Ukrainian generation and its proposed next steps no longer describe the current runtime.

The implementation was completed by:
- PR [#34](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/34), which routed each Ukrainian system through segmental IPA keys and retained source CSV row/key provenance;
- PR [#38](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/38), which adjudicated the supported marginal interjection forms and preserved intentionally unresolved forms.

The current implementation:
- derives IPA-keyed Ukrainian maps from the canonical `zh-in-ua.csv`;
- rejects IPA-key collisions rather than overwriting;
- keeps all three Ukrainian systems independent;
- preserves blank cells as missing;
- leaves unsupported IPA forms unresolved;
- does not fall back to Pinyin lookup.

The deterministic inventory evidence recorded in [IPA adapter readiness](../../IPA-ADAPTER-READINESS.md) reports 421 source aliases, 419 IPA-supported keys, exactly two intentionally unsupported keys (`hm`, `hng`), and zero IPA-key collisions on the tested implementation head. Quality run [#40019246182](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40019246182) passed the corresponding inventory test. These are structural/implementation invariants, not proof of every phonetic value.

Use [docs/IPA-ADAPTER-READINESS.md](../../IPA-ADAPTER-READINESS.md) for the current adapter contract and remaining linguistic research gates. Retain this dated file as historical context; do not use its original pre-implementation statements as current project status.
