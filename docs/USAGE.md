# Usage

## 1. Enter text

Paste or type Chinese into the main text area. Punctuation, whitespace, Latin text, numbers and emoji remain part of the source text.

## 2. Choose script mode

- **Авто** classifies the input from Simplified/Traditional-exclusive Han characters.
- **Спрощене** explicitly uses the Simplified pronunciation path.
- **Традиційне** explicitly enables the Traditional pronunciation dictionary.

Auto detection can legitimately return **undetermined** when the text contains only shared characters. It does not rewrite the source.

## 3. Read the results

The result area contains four independent outputs:

1. Pinyin;
2. Кірносова;
3. Кірносова—Цісар;
4. НАНУ.

Pinyin shows tone marks by default. Use **Показувати тони Pinyin** to switch the display to unmarked syllables. Separately, **Показувати тони в українській транскрипції** controls Chinese tone marks applied to the Ukrainian transcription. Tone 1 uses a macron (`◌̄`), tone 2 an acute (`◌́`), tone 3 a caron (`◌̌`), and tone 4 a grave (`◌̀`); tone 5 has no mark. The Ukrainian marks are Unicode combining characters attached to the transcription's vowel, so Cyrillic remains Cyrillic. Each control changes presentation only, not pronunciation resolution or the source CSV mappings.

## 4. Uncertainty

If pronunciation cannot be resolved, the application does not invent a Pinyin value.

If a selected Ukrainian system has a blank source cell, the application preserves the original Chinese token and exposes an issue state rather than borrowing another system's mapping.

## 5. Copy

Each result has its own copy button. Copy feedback is announced through the live region.

## 6. Privacy

Conversion happens in the browser. The MVP contains no runtime API, account, database, analytics, or telemetry layer.
