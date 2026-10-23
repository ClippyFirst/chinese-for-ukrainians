# Chinese for Ukrainians — Product Requirements

## Product summary

A lightweight static browser application that turns Chinese text into five parallel representations:
1. Hanyu Pinyin;
2. broad IPA under the project's documented literature-based convention;
3. Ukrainian transcription — Kirnosova;
4. Ukrainian transcription — Kirnosova–Tsisar;
5. Ukrainian transcription — NANU.

The Ukrainian systems are independent and correspond to separate columns in zh-in-ua.csv. Runtime adapters are keyed by segmental IPA derived from the pronunciation token; the CSV remains the canonical source of each system's values and provenance. The tool transcribes pronunciation; it does not translate meaning.

## Primary user outcome

A Ukrainian-speaking learner, translator, researcher, editor or reader can paste Chinese text and compare Pinyin, IPA and three Ukrainian transcription systems in the browser without an account or server-side conversion.

## MVP scope

### Input
- Multiline text area, paste and keyboard input.
- Preserve whitespace, punctuation, line breaks, Latin text, numbers and emoji.
- Simplified, Traditional or mixed Chinese.
- Script mode: Auto, Simplified, Traditional.
- Character counter, clear action and example input.
- Independent Pinyin-tone and Ukrainian-tone display toggles.

### Output
Five visible representations: Pinyin, IPA and three Ukrainian systems. The Ukrainian renderers consume the token's segmental IPA key, not its Pinyin key.
- Pinyin and Ukrainian tone display are independently configurable.
- Result panels expose copy actions and the interface provides copy feedback.
- Speech synthesis is offered through the browser's speech API when supported.
- Empty, unresolved and missing-mapping states must be visible and non-destructive.
- IPA is a broad project convention, not a promise of universal narrow phonetic accuracy.
- Ukrainian mapping columns remain independent; no cross-system fallback.
- IPA-key collisions must fail validation rather than silently overwrite a source row.
- IPA forms unsupported by the current convention remain unresolved; no Pinyin fallback is permitted.
- The product does not rank the Ukrainian systems as universally superior or translate the source meaning.

## Script detection

Auto mode is deterministic and transparent:
- detect characters that are unambiguously Simplified-only or Traditional-only;
- shared-only text is Undetermined rather than guessed;
- evidence from both exclusive sets yields Mixed;
- detection never alters the input.

## Functional requirements

- **FR-01 Input:** accept arbitrary Unicode text.
- **FR-02 Script mode:** visible, keyboard-operable selection.
- **FR-03 Auto detection:** expose Simplified, Traditional, Mixed or Undetermined.
- **FR-04 Pronunciation:** use the pinned Mandarin pronunciation engine; ambiguous words and names may require manual review.
- **FR-05 Representations:** render Pinyin, broad IPA and the three CSV-defined Ukrainian systems.
- **FR-06 Preservation:** retain non-Chinese text, punctuation, whitespace and line breaks wherever technically possible.
- **FR-07 Copy:** copied output must match the visible representation and tone-display mode.
- **FR-08 Responsive UI:** support desktop, tablet and narrow mobile widths.
- **FR-09 Static privacy:** normal conversion must not send user text to a server.
- **FR-10 Accessibility:** semantic controls, visible focus, keyboard use, contrast, assistive labels and reduced-motion support.
- **FR-11 Tone controls:** changing either tone toggle must not mutate the underlying pronunciation or the other representation's tone setting.

## Data correctness

zh-in-ua.csv is the canonical source for the three Ukrainian systems. Do not silently correct source values or cross-fill blank cells.

Validation must check UTF-8 parsing, expected columns, row shape, normalized-key duplicates, aliases, empty keys and permitted missing mappings. Source coverage and phonetic correctness require evidence beyond structural validation.

## Error and uncertainty policy

- Do not fabricate Pinyin for unresolved pronunciation.
- Preserve original source text when pronunciation cannot be resolved.
- Make missing mappings and unsupported IPA forms visible.
- Distinguish unsupported/non-Chinese text, unresolved pronunciation and missing Ukrainian mapping where the implementation supports those distinctions.
- Treat automated fixtures as implementation evidence, not proof of linguistic truth.

## Non-goals

Translation, Cantonese/Jyutping, OCR, user accounts, server-side API, database, analytics, automatic rewriting of Chinese input and reverse conversion from Pinyin/Ukrainian transcription to characters.

## Privacy and performance

No user input should leave the browser during normal conversion. Avoid per-character network calls; ordinary paragraphs should feel responsive after static assets load.

## Definition of done

- Simplified, Traditional, shared-only and mixed-script cases behave as documented.
- Pinyin, broad IPA and all three independent Ukrainian outputs are present.
- Tone toggles are independent.
- Copy, clear, example and supported speech controls work.
- Punctuation and line breaks are preserved.
- Unknown pronunciation and blank mappings are not silently fabricated.
- Data validation, unit/integration tests, generated-map drift, release checks and browser regression tests pass on the exact candidate SHA.
- Static deployment works without a backend.
- Documentation states the actual architecture and limitations accurately.
