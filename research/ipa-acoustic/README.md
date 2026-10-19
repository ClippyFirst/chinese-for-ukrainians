# IPA acoustic measurement workspace

This folder contains the reproducible measurement stage for the Mandarin IPA verification project. It deliberately separates **measuring recordings** from **choosing IPA strings**.

## Status

No corpus measurements are committed yet. Do not populate the measurement files with guessed values or with the converter's own outputs. The current research protocol is at [IPA acoustic validation execution protocol](../../docs/IPA-ACOUSTIC-VALIDATION-EXECUTION-PROTOCOL-2026-10-19.md).

## Files

- `measure_formants.py` — extracts raw F1/F2/F3 trajectories from nucleus intervals already checked by a human annotator.
- `token-index-template.csv` — required fields and optional metadata for the token index.
- `requirements.txt` — pinned Praat-Parselmouth version.
- `test_measure_formants.py` — dependency-light tests for validation and safe path handling.

## Setup

From the repository root:

```powershell
python -m pip install -r research/ipa-acoustic/requirements.txt
python research/ipa-acoustic/test_measure_formants.py
```

## Run on a manually annotated corpus

1. Copy `token-index-template.csv` to a separate working location and add one row per recording token.
2. Use relative paths in `recording_path`, resolved under the local corpus root.
3. Verify the nucleus boundaries against the audio. Set `manual_boundary_status=verified` only after a human has checked them. Use `quality_status=pass` only after applying and documenting the preregistered quality criteria.
4. Use a speaker-appropriate formant ceiling in `max_formant_hz`; leave it blank only if the study protocol explicitly uses the 5500 Hz default for that recording.
5. Run:

```powershell
python research/ipa-acoustic/measure_formants.py --tokens path\to\token-index.csv --corpus-root path\to\corpus --output research\ipa-acoustic\measurements.csv
```

The output contains eight F1/F2/F3 sample points from 15% through 85% of each verified nucleus, nucleus duration, the exact Burg settings, and a missing-value count. It does not normalize formants, fit hypothesis tests, infer phonemes, or certify IPA. Keep raw formants and speaker metadata so later normalization and statistics remain auditable.

## Critical methodological safeguards

- The script refuses unverified boundaries, failed-quality rows, duplicate IDs, invalid intervals and paths outside the corpus root.
- Automated phone alignment can help locate candidates but is not an independent phonetic gold label. Manually review the acoustic intervals.
- Do not pool Taiwanese Mandarin measurements into a mainland Putonghua target. Variety, speaker, tone, onset and lexical context must remain traceable.
- A formant trajectory can support or disfavor a vowel-quality hypothesis, but it cannot alone settle every phonological segmentation or a project's broad-transcription convention.
