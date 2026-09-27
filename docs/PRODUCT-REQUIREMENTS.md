# Chinese for Ukrainians — Product Requirements

## Product summary

A lightweight static web application for converting Chinese text into:
- Hanyu Pinyin;
- Ukrainian transcription according to the three systems stored in zh-in-ua.csv:
  1. Kirnosova;
  2. Kirnosova–Tsisar;
  3. NANU.

The user enters Chinese characters and receives all selected outputs immediately in the browser.

## Primary user outcome

A Ukrainian-speaking learner, translator, researcher, editor, or reader can paste Chinese text and quickly compare Pinyin with three Ukrainian transcription systems without a server, account, or manual conversion.

## MVP scope

### Input
- Multiline text area.
- Paste and keyboard input.
- Preserve whitespace and punctuation.
- Chinese text may contain Simplified, Traditional, or mixed characters.
- Script mode: Auto-detect, Simplified, Traditional.
- Character counter.
- Clear input action.
- Example input action.
- Pinyin tone display: enabled by default and can be switched off independently of script selection.

### Output
Four independently copyable result panels:
1. Pinyin;
2. Ukrainian — Kirnosova;
3. Ukrainian — Kirnosova–Tsisar;
4. Ukrainian — NANU.

- Keep punctuation and whitespace aligned with the source wherever technically possible.
- Copy buttons for each result.
- Copy-all action.
- Empty-state before conversion.
- Clear error state if pronunciation data cannot be resolved.
- Clearly distinguish transcription from translation: the application does not translate meaning.
- The Pinyin copy result must match the currently selected tone-display mode.

### Script detection
Auto mode must be deterministic and transparent:
- Detect characters that are unambiguously Simplified-only or Traditional-only.
- If only shared characters occur, report Cannot determine rather than inventing certainty.
- If both exclusive forms occur, report Mixed.
- Script detection must not alter the input text.

### Non-goals for MVP
- Translation into Ukrainian.
- Cantonese.
- OCR from images.
- Speech recognition.
- User accounts.
- Server-side API.
- Database.
- Analytics requiring personal data.
- Automatic rewriting of the user's Chinese text.

## Functional requirements

### FR-01 Input
The application accepts arbitrary Unicode text through a textarea.

### FR-02 Script mode
The selected mode is visible and keyboard accessible.

### FR-03 Auto detection
Auto mode reports the detected script state and confidence category: Simplified, Traditional, Mixed, or Undetermined.

### FR-04 Pinyin
The app resolves Mandarin pronunciation and renders Pinyin consistently. Tone marks are displayed by default and can be disabled by the user without changing the underlying pronunciation or any Ukrainian transcription.

### FR-05 Ukrainian systems
Each Pinyin syllable is mapped through the corresponding column of zh-in-ua.csv.

### FR-06 Preservation
Latin text, numbers, punctuation, line breaks, emoji, and unsupported symbols remain unchanged unless they are part of a Chinese pronunciation token.

### FR-07 Copy
Every result can be copied independently. Copy feedback must be accessible and non-blocking.

### FR-08 Responsive layout
The interface must work on desktop, tablet, and narrow mobile screens.

### FR-09 No backend
Normal conversion must work entirely in the browser after the static assets have loaded.

### FR-10 Accessibility
Keyboard-only operation, visible focus, semantic controls, sufficient contrast, screen-reader labels, and reduced-motion support are required.

### FR-11 Tone display
A checked “Показувати тони Pinyin” control displays tone marks in Pinyin. When unchecked, the same syllables are rendered without tone marks. Changing this option must update the Pinyin result immediately and must not alter the three Ukrainian outputs.

## Data correctness requirements

zh-in-ua.csv is the source dataset for the three Ukrainian output systems. The app must not silently correct source values.

Before production release:
- parse the CSV as UTF-8;
- preserve Ukrainian apostrophe characters exactly as specified;
- detect duplicate Pinyin keys;
- detect empty cells;
- detect aliases such as er/r;
- detect rows where the three systems differ;
- generate a validation report.

The current repository data should be validated from the live CSV. Previously discussed duplicate-key concerns must not be carried forward as current defects; validation should report the actual current state of the source file. Blank output cells and special/edge syllable forms remain explicit data-policy cases.

## Error and uncertainty policy

When pronunciation cannot be resolved:
- do not fabricate Pinyin;
- preserve the original character;
- mark the unresolved segment in a non-destructive way;
- provide a short explanation.

The app should distinguish unsupported/non-Chinese text, unknown pronunciation, ambiguous/multiple pronunciation, and malformed/unsupported Pinyin mapping.

## Performance

Target:
- first meaningful UI in under 1 second on a normal desktop after static assets are cached;
- conversion of ordinary paragraphs should feel instantaneous;
- avoid network calls per character;
- debounce only if necessary.

## Privacy

No user input should leave the browser in normal operation. Do not add third-party analytics or telemetry in MVP.

## Definition of done

MVP is complete when:
- Simplified and Traditional examples both convert;
- Auto detection handles exclusive, shared, and mixed-script cases;
- Pinyin output is correct for supported Mandarin pronunciation data;
- all three Ukrainian columns map correctly from the repository CSV;
- copy buttons work;
- punctuation and line breaks are preserved;
- keyboard and mobile use are practical;
- validation tests pass;
- the site can be deployed as static files without a backend;
- Pinyin tone display can be toggled without changing the underlying conversion or Ukrainian outputs.
