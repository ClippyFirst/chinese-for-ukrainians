# Chinese for Ukrainians — Architecture

## Runtime

The product is a static Vite site using HTML, CSS and browser JavaScript. It has no application server, runtime database, authentication, analytics, or conversion API. Normal conversion runs in the browser.

## Actual conversion pipeline

~~~text
Chinese input
→ Unicode-safe source-span scanner
→ script detector (Auto / Simplified / Traditional)
→ pronunciation resolver and pinned pinyin-pro adapter
→ canonical Pinyin pronunciation tokens
   ├─→ Pinyin renderer (tone marks optional)
   ├─→ broad IPA renderer
   └─→ segmental IPA key
        └─→ three independent IPA-keyed Ukrainian adapters
             ├─→ Kirnosova
             ├─→ Kirnosova–Tsisar
             └─→ NANU
→ ConversionResult
→ DOM UI / copy / speech controls
~~~

**IPA adapter boundary:** each resolved token carries a segmental IPA key, and Ukrainian renderers consume that key through collision-checked maps derived from the canonical CSV. Tone remains separate metadata. The four unsupported IPA forms remain unresolved; there is no Pinyin fallback.

## Regional-language pipeline contract

The additional-language interface has a strict, shared display and processing order:

~~~text
Source-script input
→ language-specific romanization engine (named profile)
→ language-specific phonological engine / IPA
→ Ukrainian practical-transcription adapter consuming IPA
~~~

The three visible result stages must appear in exactly this order: **Romanization → IPA → Ukrainian**. Romanization is the script's Latin rendering under a named system; it must not be relabeled as IPA. IPA is a phonological representation and must preserve supported contrasts such as tone, vowel length, aspiration, phonation, and syllable boundaries. The Ukrainian stage must consume IPA rather than reprocess source graphemes or romanization independently. If an upstream stage is unavailable or uncertain, show an explicit unavailable/uncertain state instead of fabricating a result.

The regional module currently only partially meets the engine requirement: Burmese has upstream Mya2Rom modes for MLCTS2 and IPA; Sinhala has an upstream Singlish romanizer but no integrated IPA engine; Khmer and Lao still use provisional Latin candidates and lack an integrated, reviewed IPA engine. The Ukrainian regional adapter is deliberately a **candidate**: it maps recognized IPA segments and visibly brackets unreviewed symbols/diacritics. It is not a validated language-specific transcription standard and must not be treated as normative. Consequently, the page now presents all three stages in the correct order, but does not yet provide complete verified end-to-end output for all four languages.

## Main files

- index.html — converter entry point.
- methodology.html — methods and limitations page.
- src/main.js — browser application entry.
- src/app/scanner.js — source spans and preservation of non-Han text.
- src/app/detector.js — script evidence and Auto detection.
- src/app/pinyin-pro-adapter.js — pinned external pronunciation engine adapter and Traditional dictionary access.
- src/app/pronunciation.js — phrase/context pronunciation resolution and token metadata.
- src/app/pinyin.js — Pinyin normalization/display.
- src/app/ipa.js — broad IPA representation.
- src/app/transcribe.js — per-system IPA-keyed Ukrainian rendering and optional tone marks.
- src/data/ipa-transcription.js — IPA-keyed maps with source-row and Pinyin provenance.
- src/data/transcription.js — CSV parsing/validation and mapping access.
- src/generated/transcription-map.js — generated mapping artifact; never hand-edit.
- src/app/convert.js — orchestration and ConversionResult.
- src/app/ui.js — DOM rendering and user interactions.
- src/app/clipboard.js — clipboard behavior.
- src/app/speech.js — browser speech-synthesis integration.
- src/styles/main.css, src/styles/methodology.css, src/styles/redesign.css — base, methodology-specific, and shared visual refinement layers.
- zh-in-ua.csv — canonical editable source for the three Ukrainian systems.

## Data layers

### Source CSV
zh-in-ua.csv is the editable source. The validator checks the required header, row shape, normalized key uniqueness, aliases and allowed blank mappings. Blank values are meaningful coverage gaps, not permission to borrow from another system.

### Generated map
scripts/generate-mappings.mjs creates src/generated/transcription-map.js, including source-row metadata and an explicit missing marker. The build regenerates this file. Review generated drift after build and never edit the generated file manually.

### Pronunciation engine
pinyin-pro-adapter.js isolates pinyin-pro and its pinned data package. Phrase/context pronunciation and polyphonic metadata are carried into canonical tokens, but names and ambiguous cases may still need review.

## Script detection

Auto detection uses exclusive characters derived from the Traditional dictionary:
- a Traditional dictionary key is evidence for Traditional;
- a mapped value that is not itself a Traditional key is evidence for Simplified-only;
- both signals produce Mixed;
- neither signal produces Undetermined.

Shared-only text is not guessed. Manual script selection affects pronunciation options and never rewrites source text.

## Result and uncertainty policy

- A resolved Ukrainian key uses the selected system's own mapping.
- A blank source cell remains missing.
- An absent key remains unresolved.
- Pronunciation failure preserves the original Chinese source and surfaces an issue.
- No Ukrainian system borrows values from another.

The UI renders user-controlled result strings as text, not HTML. The application source is checked for disallowed dynamic evaluation, unsafe HTML and runtime network primitives. The production Content Security Policy restricts connections and assets to the static-site requirements.

## Research versus runtime

The docs/audits files, source ledger, UW differential and research/ipa-acoustic scripts are not runtime dependencies, but they are active research provenance, validation or reproducibility assets. Do not delete them merely because the application does not import them.
