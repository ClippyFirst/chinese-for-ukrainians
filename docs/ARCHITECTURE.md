# Chinese for Ukrainians — Architecture

## Runtime architecture

The application is a static Vite site using plain HTML, CSS and JavaScript.

There is no application server, runtime database, authentication layer, analytics layer, or runtime API.

## Pipeline

```text
Chinese input
→ Unicode-safe source-span scan
→ script detection
→ Mandarin pronunciation resolver
→ canonical Pinyin tokens
→ Pinyin renderer
→ three Ukrainian renderers
→ ConversionResult
→ DOM UI
```

The canonical intermediate representation is the PronunciationToken array. The three Ukrainian systems consume those tokens independently.

## Repository structure

```text
/
├── index.html
├── src/
│   ├── main.js
│   ├── styles/main.css
│   ├── app/
│   │   ├── scanner.js
│   │   ├── detector.js
│   │   ├── pinyin.js
│   │   ├── pronunciation.js
│   │   ├── pinyin-pro-adapter.js
│   │   ├── transcribe.js
│   │   ├── convert.js
│   │   ├── ui.js
│   │   └── clipboard.js
│   ├── data/transcription.js
│   └── generated/transcription-map.js
├── scripts/
│   ├── validate-data.mjs
│   ├── generate-mappings.mjs
│   ├── benchmark.mjs
│   └── release-check.mjs
├── tests/
│   ├── *.test.mjs
│   └── browser/converter.spec.js
└── zh-in-ua.csv
```

## Data layers

### Ukrainian source

`zh-in-ua.csv` is the canonical editable source.

The validator checks the exact five-column header, row shape, normalized-key uniqueness, aliases, and blank mappings.

### Generated mapping

`scripts/generate-mappings.mjs` produces `src/generated/transcription-map.js`. It contains per-system entries with source-row metadata and an explicit `missing` flag. It is generated data and must not be hand-edited.

### Pronunciation

`pinyin-pro-adapter.js` isolates the external pronunciation engine. It initializes the official Traditional dictionary and exposes the Traditional→Simplified map to script detection.

## Script detection

Auto detection uses exclusive characters derived from the Traditional dictionary:

- a Traditional dictionary key is Traditional evidence;
- a value that is not itself a Traditional key is Simplified-only evidence;
- both signals produce `mixed`;
- neither produces `undetermined`.

Shared-only text is therefore not guessed.

Manual mode affects pronunciation options only. It never rewrites source text.

## Pronunciation resolution

The resolver passes contiguous Han spans to the pronunciation engine with its maximum-probability segmentation option.

The engine's contextual/polyphonic metadata is retained in each token. The canonical internal Pinyin representation is lowercase syllable + numeric tone, for example `bei3`.

Display Pinyin is generated separately with tone marks.

## Ukrainian rendering

Each token's tone is removed before CSV lookup. Each selected system queries only its own generated map.

- resolved mapping → mapped Ukrainian output;
- blank source cell → `missing` issue;
- missing key → `unresolved` issue;
- pronunciation failure → original Chinese source is preserved and an issue is surfaced.

No system borrows another system's value.

## UI/security boundary

The UI consumes `ConversionResult`. It does not run pronunciation or CSV lookup itself.

User-controlled result strings are assigned through `textContent`. No `innerHTML`, `eval`, dynamic function construction, runtime network calls, or analytics are used in the application source.

A production CSP sets `connect-src 'none'` and restricts scripts/styles to same-origin assets.
