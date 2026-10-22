# Chinese for Ukrainians — Design System

Status: current implementation contract. Detailed acceptance criteria live in [Design redesign brief (2026-10-22)](./DESIGN-REDESIGN-BRIEF-2026-10-22.md).

## Product character

The interface is a **functional linguistic reference instrument**: editorial, precise, calm, and compact. It should feel closer to a dictionary workstation or typographic specimen than to a generic AI product or marketing landing page.

### Principles

- **Function first:** the converter is the visual center; the input is immediately discoverable.
- **Typography creates hierarchy:** scale, weight, alignment, rules and whitespace do the work.
- **CJK and Ukrainian are first-class:** Chinese characters, Pinyin tone diacritics, IPA and Cyrillic need appropriate font fallbacks and line wrapping.
- **Parallel, not ranked:** the three Ukrainian systems receive equal visual weight and no winner-like color treatment.
- **Calm density:** information-rich without turning every element into a separate card.
- **No AI clichés:** no gradients, glassmorphism, robot imagery, chat bubbles, decorative illustrations or unsupported claims.
- **Local by default:** the local-processing cue must remain accurate; ordinary conversion does not send user input to a server.
- **Evidence over polish:** unresolved pronunciation/mapping stays visible and is never silently invented.

## Color tokens

| Role | Value | Purpose |
|---|---|---|
| Paper | `#f3f2ee` | page background |
| Surface | `#ffffff` | main work surfaces |
| Soft surface | `#faf9f6` | input and neutral result surfaces |
| Ink | `#151719` | primary text |
| Muted | `#5f656b` | secondary text |
| Line | `#d8d9d8` | separators |
| Strong line | `#aeb3b7` | form borders |
| Accent | `#173f8a` | actions, focus-adjacent accents |
| Accent dark | `#102f69` | action hover |
| Accent soft | `#eef3fb` | Pinyin surface and selected-state support |
| Warning | `#725d22` | unresolved-data status |
| Warning surface | `#faf5e6` | non-destructive warning background |

The accent communicates interaction, not a preference for any transcription system. Warning states use text and iconography as well as color.

## Typography

- Interface: system sans stack; no required remote fonts.
- Main heading: restrained system serif stack with responsive size and natural wrapping.
- Chinese input: CJK-compatible sans fallback stack.
- Pinyin: readable sans, slightly larger than ordinary result text.
- IPA: readable symbols and explanatory copy with enough width to scan.
- Ukrainian: readable Cyrillic-capable sans.
- Preserve diacritics, IPA symbols, apostrophes, punctuation, spaces and line breaks.
- Avoid decorative display fonts, excessive uppercase, forced nowrap headings and low-contrast microcopy.

## Page composition

### Header

A compact identity line contains the Chinese mark, product label, methodology navigation and local-processing cue. The heading and explanatory sentence describe transcription/pronunciation support without marketing claims.

### Input workspace

The first major work surface contains the section marker, input heading, character count, large multiline textarea, Unicode/local-processing hints, script selector, independent tone controls, speech action, example and clear actions. The input remains the primary visual object.

### Controls

- Script mode: Auto, Simplified, Traditional.
- Pinyin tone display and Ukrainian tone display remain independent.
- Script selector has equal-width, equal-height options.
- Example, clear and speech actions remain visible and usable by touch and keyboard.
- Labels and help text must remain legible at narrow widths.

### Results

Results include five distinct representations: Hanyu Pinyin, broad IPA and the three Ukrainian transcription systems. Pinyin and IPA are separately labelled pronunciation layers; neither is translation.

Pinyin receives a full-width, subtly accented panel because it is the shared pronunciation representation. IPA remains a distinct neutral panel with its current explanatory caveats. The three Ukrainian systems use equal-weight result cards. At desktop widths they may sit in three equal columns; on narrow screens they stack into one column.

Every result keeps its own copy action. Copy feedback must be accessible and must not change the result value.

### Empty and issue states

- The empty state is understated and instructive, not an error.
- Unresolved data is described clearly and non-destructively.
- Hidden, empty, results and issue states must follow the DOM state; CSS must not override the HTML `hidden` attribute.
- Do not silently fabricate Pinyin, IPA or Ukrainian mappings.

### Feedback and footer

Retain the methodology link, GitHub issue/feedback link and concise project information. Keep text accurate and avoid claims of perfect or universal phonetic accuracy.

## Interaction

- Primary actions use solid accent; quiet actions use neutral borders.
- Focus indicators are clearly visible for links, buttons, textarea, radio-like script choices and switches.
- Copy actions are local to their corresponding output.
- No unnecessary animation or loading spinner for synchronous conversion.
- Respect `prefers-reduced-motion`.
- Tooltips remain viewport-safe and discoverable by keyboard and pointer.
- Do not use color alone to communicate selected, copied, unresolved or error states.

## Responsive rules

- Desktop: maximum content width around 1120 px; readable input and explanatory text; compact control deck; three equal Ukrainian result columns.
- Tablet: preserve hierarchy while allowing control groups to wrap or stack.
- Mobile: narrow side margins, one-column results, full-width script selector and stacked/wrapping controls.
- Explicitly test 320, 360, 390 and 430 CSS-pixel widths.
- No horizontal page overflow, clipped headings, clipped CJK/IPA characters or off-screen tooltip.
- Long source and output strings must wrap without breaking the underlying text.

## Accessibility

Semantic landmarks and heading order, explicit labels, keyboard operation, visible focus, sufficient contrast, screen-reader labels/status, native controls, reduced-motion support and readable zoomed layouts are required.

Do not hide interactive inputs in a way that removes their focus affordance. When a visually hidden native input is used to implement a segmented control, its focus state must be visible on the corresponding segment.

## Content rules

Preferred labels include «Введіть китайський текст», «Письмо», «Авто», «Спрощене», «Традиційне», «Тони Pinyin», «Тони в українському записі», «Результати», «Копіювати», «Приклад» and «Очистити».

Avoid «магія», «розумний перекладач», «100% точний» and winner-like labels. Never describe transcription as translation. Keep the names of the three Ukrainian systems consistent.

## Design QA checklist

1. Find and focus the Chinese input immediately.
2. Identify the local-processing and methodology cues.
3. Confirm the current script mode and operate it with keyboard.
4. Toggle Pinyin and Ukrainian tones independently.
5. Run an example, paste multiline text, then clear it.
6. Read Pinyin and IPA without confusing either for translation.
7. Compare all three Ukrainian systems without a visual ranking.
8. Copy each output and verify accessible feedback.
9. Inspect empty, results and unresolved-data states.
10. Review 320/360/390/430 px and desktop; check focus, contrast, reduced motion, console and overflow.
