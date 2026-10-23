# Edge-form research reconciliation — 2026-10-23

## Outcome

The earlier four-key gap has been resolved into two explicit IPA conventions and two intentionally unsupported interjectional forms. This is a scoped, evidence-gated outcome; it is not a claim that every Mandarin interjection has a settled narrow phonetic transcription.

| Pinyin key | CSV № | IPA result | Ukrainian values (Kirnosova / Kirnosova–Tsisar / NANU) | Decision |
|---|---:|---|---|---|
| `ê` | 82 | `ɛ` | `е / е / blank` | Supported as a marginal interjectional form. Open-content Mandarin reference explicitly gives [ɛ] for ê in certain interjections. |
| `yo` | 378 | `jɔ` | `йо / йо / blank` | Supported by an explicit broad-IPA project convention for an attested exceptional interjection; not narrow acoustic ground truth. |
| `hm` | 125 | intentionally unsupported | `хм / гм / blank` | Sources attest the spelling/interjection but do not settle a unique segmental IPA target. |
| `hng` | 126 | intentionally unsupported | `х / гм / blank` | Sources attest the spelling/interjection but do not settle a unique segmental IPA target; OCR uncertainty cannot determine pronunciation. |

The numbers refer to the CSV's first column (`№`), not physical file line numbers. The NANU blanks are source-inventory gaps: do not fill them from another Ukrainian system.

## Evidence

- The Chinese Ministry of Education includes ê in its discussion of Mandarin vowels: https://www.moe.gov.cn/moe_879/moe_1252/s8447/201412/t20141204_179468.html
- The open-content *Chinese (Mandarin)* reference's “Pronunciation of finals” table gives ê as [ɛ] and limits it to certain interjections: https://upload.wikimedia.org/wikipedia/commons/2/20/Chinese_%28Mandarin%29.pdf
- Pinyin News documents Mandarin interjection spellings including hm and hng and attests “Yo!”: https://pinyin.info/news/2009/mandarin-interjections-in-pinyin/
- A Mandarin Pinyin pronunciation guide describes yo as an exceptional glide-plus-o spelling used interjectionally: https://www.friendlyskies.net/lang/chinese/files/B-hanyu_pinyin_pronunciation_guide_20101119.pdf
- The Chinese Text Project dictionary corroborates the interjectional use of 唷/yō: https://ctext.org/dictionary.pl?char=%E5%94%B7&if=en

These sources have different evidentiary roles. A source that attests an interjection spelling does not automatically establish its exact segment-level IPA. The [jɔ] rendering for yo is therefore labelled a project convention. The hm/hng forms remain unsupported until better phonetic evidence exists.

## Implementation and verification

- Runtime changes: `src/app/ipa.js` now handles ê and yo through explicit special mappings.
- Regression tests: `tests/ipa.test.mjs` checks ê, yo, tone suffixing, and unresolved hm/hng behavior.
- Inventory acceptance: `tests/ipa-adapter-readiness.test.mjs` requires 421 aliases, exactly two unsupported keys (`hm`, `hng`), and zero IPA-key collisions.
- Exact tested head: `bc3d3088f3ef4158b9159a48fb6e80e219b4cc7a`.
- Quality run [#40019246182](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40019246182) passed all configured gates, including unit/integration, acoustic-pipeline input guards, production build, generated-map determinism, benchmark, release constraints, browser regression tests, visual QA screenshots and dependency audit artifact upload.
- Merged implementation commit: `fba393964757459df4bd6d7c435fe7b99c8b9286`.

## What this does not close

1. It does not certify [jɔ] as a universal narrow or speaker-specific realization.
2. It does not provide a phonetic target for hm/hng; they remain explicit unresolved UI results rather than fabricated IPA.
3. It does not visually verify every disputed Ukrainian source cell against the original Kirnosova PDF page image.
4. It does not complete source-by-source redistribution/licensing review or manual assistive-technology/device QA.

The four-form implementation gap is closed for the stated scope. The wider service remains a public beta / research preview until the independent release-readiness items are resolved.
