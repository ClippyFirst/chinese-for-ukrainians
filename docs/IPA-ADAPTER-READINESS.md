# IPA adapter implementation and remaining research gates

**Status: IPA-keyed runtime boundary implemented; four inventory keys remain unsupported by the finite Pinyin-to-IPA function.** This document distinguishes implementation gaps from linguistic questions already reviewed in earlier audits. PR #34 introduced the runtime adapter; this is not a new research pass over every disputed Mandarin final.

## Current runtime behavior

The runtime resolves Chinese text to Pinyin pronunciation tokens. Each resolved token also carries a segmental IPA key. The three Ukrainian adapters consume that IPA key and look up system-specific values in maps derived from the canonical `zh-in-ua.csv`. Adapter entries retain source row, source Pinyin key and explicit missing markers. A collision throws rather than overwriting an entry. Unsupported IPA forms remain unresolved and never fall back to Pinyin lookup.

## Current executable inventory evidence

The deterministic audit `scripts/audit-ipa-adapter-readiness.mjs` reports 421 aliases, 417 supported keys, four unsupported keys and zero collision groups:

| CSV row | Pinyin key | Current state | Existing research / source context | Correct next action |
|---:|---|---|---|---|
| 82 | `ê` | **Unsupported in runtime IPA mapping** | Present in the CSV and has already been discussed in the edge-inventory audit. It is not present in the official NANU/ASTKS key inventory. A reference to [ɛ] for an interjection is not, by itself, a complete decision for every tone, target transcription convention, or Ukrainian system. | Do not infer a general rule from the spelling. Reuse the existing source comparison; only add a typed IPA result if the documented target convention and source evidence cover this specific form. Keep NANU blank because the source inventory omits the key. |
| 125 | `hm` | **Unsupported in runtime IPA mapping** | CSV values are Kirnosova `хм`, Kirnosova–Tsisar `гм`, NANU blank. Existing inventory audit reports the form in Kirnosova (2009), but the extracted PDF text is noisy; a secondary comparison corroborated the Ukrainian strings, while primary page-image verification was explicitly left outstanding. | This is not an empty Ukrainian mapping problem. Verify the already-known source transcription against the original table image if available; independently document a defensible segmental IPA representation before enabling the adapter. Preserve system differences and NANU blank. |
| 126 | `hng` | **Unsupported in runtime IPA mapping** | CSV values are Kirnosova `х`, Kirnosova–Tsisar `гм`, NANU blank. The earlier PDF extraction produced a Latin-looking glyph and was correctly not treated as reliable phonetic evidence; secondary comparison corroborated the Ukrainian strings, but primary page-image verification remained open. | Do not equate OCR output with IPA. Verify the source cell and choose a representation only with phonetic evidence for this marginal/interjectional form. Preserve the two distinct Ukrainian system values and NANU blank. |
| 378 | `yo` | **Unsupported in runtime IPA mapping** | The key has an existing row in the Ukrainian inventory but is outside the ordinary final aliases implemented by the finite IPA function. It has been included in prior edge-form reviews; a generic `y + o` decomposition would be an unsupported assumption. | Inspect existing row/source evidence and decide whether the project’s declared Mandarin scope includes this form. If included, record the exact segmental analysis before adding support; otherwise keep it explicitly unresolved/out-of-scope. |

The row numbers above are the identifiers in the CSV's first column (№), not physical file-line offsets. Structural support counts do **not** prove phonetic correctness.

## Previously reviewed forms — do not reopen without a reason

These forms were also mentioned in earlier audits, but they are **not the four currently unsupported keys**. The finite IPA function currently maps them:

| Form/class | Current IPA implementation | Status in the existing decision record |
|---|---|---|
| standalone `o` | `ɔ`; after `b/p/m/f`, the contracted spelling maps to `uɔ` | The labial-conditioned `bo/po/mo/fo` behavior was corrected against the UW chart and tested. Standalone `o` remains a marginal form whose exact phonetic status should not be confused with runtime unsupported status. |
| `rua` | `ɹwa` under the current finite function | The earlier inventory audit retained the CSV value `жуа`; the isolated OCR extraction `жува` was treated as likely extraction corruption. This is a Ukrainian-source transcription decision, not proof that the key is an ordinary productive Mandarin syllable. |
| `ong` | `ʊŋ` | The 2026-10-19 literature-based closeout selects this as the project's broad-IPA convention while recording alternatives. It is mapped; it is not one of the four unsupported keys. |
| `iong/yong` | `jʊŋ` | The 2026-10-19 literature-based closeout selects the project's glide-plus-final broad convention while documenting competing analyses. It is mapped; do not present the older “unresolved” wording in the targeted research note as the current release decision. |
| `üan/yuan` | `ɥɛn` | The 2026-10-19 literature-based closeout selects this broad convention and records the UCL disagreement/sample limitations. It is mapped. |
| standalone `er` | `əɹ` | The 2026-10-19 closeout adopts this transparent segmental representation as a project convention while retaining the competing [ɚ]/[ɐɹ] evidence. It is mapped; this does not mean it is a universal narrow target. |
| `m/n/ng` | `m̩/n̩/ŋ̍` | Explicit special mappings already exist. Keep them distinct from the four unsupported forms. |

For `ong`, `iong`, `üan`, and `er`, use [the literature-based adjudication closeout](./IPA-LITERATURE-BASED-ADJUDICATION-CLOSEOUT-2026-10-19.md) as the current broad-IPA release decision. The earlier [targeted research note](./IPA-ONG-IONG-ER-ADJUDICATION-2026-10-19.md) preserves the evidence history and should be read with its supersession note, not as the latest decision.

## Remaining tasks — precisely scoped

1. **Edge IPA representation:** adjudicate `ê`, `hm`, `hng`, and `yo` only. For each form, record scope/attestation, source evidence, selected segmental IPA (or explicit exclusion), uncertainty, and regression test. Do not invent values to turn the audit green.
2. **Primary image/source check:** where the old register says Kirnosova (2009) OCR is unreliable, inspect the original table image for `hm` and `hng`; do not treat secondary reproductions as primary confirmation.
3. **Word-level corpus:** build source-grounded word-level regression cases for pronunciation selection, polyphony, tone and segmentation. This is separate from the four edge keys.
4. **Rights review:** complete source-by-source reuse/licensing review; repository MIT does not automatically cover reproduced datasets.
5. **Manual accessibility/device QA:** verify screen reader, physical speech output and clipboard permissions on real devices.

## Acceptance criteria

- No silent IPA-key overwrite.
- No fallback between Ukrainian systems or from unsupported IPA to Pinyin.
- Source provenance, tone, syllable boundaries, uncertainty and missing values remain inspectable.
- Every changed output has a reviewed rule or source-backed correction.
- Data validation, unit/integration/browser tests, generated-map determinism and release checks pass on the exact release candidate.
- README, methodology and architecture documentation match the implementation.

The product remains **public beta / research preview**. The IPA-keyed adapter boundary is implemented, but this is not a claim of universal linguistic correctness or narrow acoustic transcription.
