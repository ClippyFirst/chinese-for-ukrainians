# Mandarin marginal interjection IPA decisions — 2026-10-23

## Decision summary

This decision closes the previous blanket treatment of four aliases as one undifferentiated runtime gap. These forms are not all the same kind of problem.

| Pinyin key | CSV № | Runtime decision | Evidence status | Ukrainian source cells (Kirnosova / Kirnosova–Tsisar / NANU) |
|---|---:|---|---|---|
| `ê` | 82 | `ɛ` | Directly attested as [ɛ] in certain interjections by the open-content *Chinese (Mandarin)* reference. | `е / е / blank` |
| `yo` | 378 | `jɔ` | The exceptional interjectional spelling is attested; [jɔ] is an explicit broad-IPA project convention, not a claim of a narrow, speaker-specific realization. | `йо / йо / blank` |
| `hm` | 125 | Intentionally unsupported | The spelling is attested as a consonant-only interjection, but the reviewed evidence does not establish a single defensible segmental IPA target. | `хм / гм / blank` |
| `hng` | 126 | Intentionally unsupported | The spelling is attested, but the reviewed evidence does not settle the phonetic realization; OCR uncertainty is not phonetic evidence. | `х / гм / blank` |

CSV numbers above are values in the first `№` column, not physical line numbers.

## Sources and what they establish

1. Chinese Ministry of Education, Mandarin sound-system answer: https://www.moe.gov.cn/moe_879/moe_1252/s8447/201412/t20141204_179468.html — includes `ê` in discussion of Mandarin vowel inventory. This supports attestation, but not by itself the precise phonetic value.
2. *Chinese (Mandarin)*, open-content reference PDF: https://upload.wikimedia.org/wikipedia/commons/2/20/Chinese_%28Mandarin%29.pdf — its “Pronunciation of finals” table gives `ê` as [ɛ] and limits it to certain interjections. This is the direct basis for the `ê → ɛ` rule.
3. Pinyin News, “Mandarin interjections in Pinyin”: https://pinyin.info/news/2009/mandarin-interjections-in-pinyin/ — attests spellings such as `ng`, `hm`, and `hng` among Mandarin interjections, and records “Yo!” as an interjection. This establishes orthographic/functional attestation, not a complete IPA target for `hm` or `hng`.
4. Mandarin Pinyin pronunciation guide: https://www.friendlyskies.net/lang/chinese/files/B-hanyu_pinyin_pronunciation_guide_20101119.pdf — describes `yo` as an exceptional glide-plus-`o` spelling used interjectionally. The implementation chooses [jɔ] as a broad-IPA project convention. Because this is an adopted convention rather than a direct narrow phonetic measurement, it is explicitly documented as such.
5. Chinese Text Project dictionary entry for 唷: https://ctext.org/dictionary.pl?char=%E5%94%B7&if=en — corroborates the interjectional function of `yō`; it does not alone establish that every Pinyin-keyed `yo` token in the project has one invariant pronunciation.

## Scope and implementation

- The converter's IPA layer is a broad, reproducible reference convention, not a promise of narrow acoustic transcription for every spontaneous interjection.
- `ê` and `yo` have explicit special mappings in `src/app/ipa.js`; they are not treated as productive ordinary finals.
- `hm` and `hng` remain unresolved in the UI. The converter deliberately returns no IPA for them, so the IPA-keyed adapter cannot invent a Ukrainian result through a Pinyin fallback.
- The Ukrainian CSV remains canonical. Do not fill the NANU cells: the source-key comparison established these forms are absent from the official 410-key NANU/ASTKS inventory. Do not copy values between Ukrainian systems.
- These choices do not establish that the legacy Ukrainian cells have been verified against a legible primary-page image. That remains a separate source-collation task.

## Verification required

The following are acceptance checks for the implementation branch, not claims that they have already passed:

1. `npm test` passes, including tests asserting `ê → ɛ`, `yo → jɔ`, tone handling for `yo1`, and explicit unsupported behavior for `hm`/`hng`.
2. `npm run audit:ipa:uw` and `npm run audit:ipa:uw:check` complete without an unexpected inventory or collision failure. The inventory should now report two intentionally unsupported keys, not four.
3. `npm run build`, `npm run check:release`, and `npm run test:browser` pass on the exact commit.
4. A successful check is implementation evidence only; it does not upgrade [jɔ] to a universal narrow phonetic transcription or settle the two unsupported consonant-only forms.
