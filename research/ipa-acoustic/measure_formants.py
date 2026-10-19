#!/usr/bin/env python3
"""Extract reproducible raw F1/F2/F3 trajectories from manually verified vowel intervals.

This script does not perform forced alignment, infer IPA, or decide a phonetic hypothesis.
The token-index CSV must contain manually verified nucleus boundaries.
"""
from __future__ import annotations

import argparse
import csv
import math
import sys
from pathlib import Path
from typing import Iterable

REQUIRED_COLUMNS = {
    "token_id", "recording_path", "speaker_id", "pinyin", "tone",
    "initial", "final", "nucleus_start_s", "nucleus_end_s",
    "manual_boundary_status", "quality_status",
}
TRACK_FRACTIONS = (0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85)
FORMANT_NUMBERS = (1, 2, 3)


def validate_rows(rows: list[dict[str, str]]) -> None:
    """Fail closed on incomplete, duplicate, unverified, or invalid annotations."""
    if not rows:
        raise ValueError("token index contains no data rows")
    seen: set[str] = set()
    for row_number, row in enumerate(rows, start=2):
        missing = REQUIRED_COLUMNS - row.keys()
        if missing:
            raise ValueError(f"row {row_number}: missing columns: {', '.join(sorted(missing))}")
        token_id = row["token_id"].strip()
        if not token_id:
            raise ValueError(f"row {row_number}: token_id is empty")
        if token_id in seen:
            raise ValueError(f"row {row_number}: duplicate token_id {token_id!r}")
        seen.add(token_id)
        if row["manual_boundary_status"].strip().lower() != "verified":
            raise ValueError(f"row {row_number} ({token_id}): nucleus boundaries must be manually verified")
        if row["quality_status"].strip().lower() != "pass":
            raise ValueError(f"row {row_number} ({token_id}): quality_status must be pass; exclude failed tokens explicitly")
        if not row["speaker_id"].strip() or not row["recording_path"].strip():
            raise ValueError(f"row {row_number} ({token_id}): speaker_id and recording_path are required")
        try:
            start = float(row["nucleus_start_s"])
            end = float(row["nucleus_end_s"])
        except (TypeError, ValueError) as exc:
            raise ValueError(f"row {row_number} ({token_id}): nucleus boundaries must be numeric seconds") from exc
        if not (math.isfinite(start) and math.isfinite(end) and 0 <= start < end):
            raise ValueError(f"row {row_number} ({token_id}): invalid nucleus interval [{start}, {end}]")
        if not row["pinyin"].strip() or not row["final"].strip():
            raise ValueError(f"row {row_number} ({token_id}): pinyin and final are required")


def read_token_index(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames is None:
            raise ValueError("token index has no header")
        missing = REQUIRED_COLUMNS - set(reader.fieldnames)
        if missing:
            raise ValueError(f"token index is missing columns: {', '.join(sorted(missing))}")
        rows = list(reader)
    validate_rows(rows)
    return rows


def safe_audio_path(root: Path, relative_path: str) -> Path:
    root_resolved = root.resolve()
    audio_path = (root_resolved / relative_path).resolve()
    if audio_path != root_resolved and root_resolved not in audio_path.parents:
        raise ValueError(f"recording path escapes corpus root: {relative_path}")
    if not audio_path.is_file():
        raise FileNotFoundError(f"audio file not found: {audio_path}")
    return audio_path


def extract_rows(rows: list[dict[str, str]], corpus_root: Path) -> list[dict[str, object]]:
    try:
        import parselmouth
    except ImportError as exc:
        raise RuntimeError(
            "Praat-Parselmouth is required. Install the pinned package with "
            "'python -m pip install -r research/ipa-acoustic/requirements.txt'."
        ) from exc

    output: list[dict[str, object]] = []
    sound_cache: dict[Path, tuple[object, object]] = {}
    for row in rows:
        audio_path = safe_audio_path(corpus_root, row["recording_path"])
        if audio_path not in sound_cache:
            sound = parselmouth.Sound(str(audio_path))
            sound_cache[audio_path] = (sound, sound.to_formant_burg(
                time_step=0.01,
                max_number_of_formants=5,
                maximum_formant=float(row.get("max_formant_hz") or 5500),
                window_length=0.025,
                pre_emphasis_from=50.0,
            ))
        sound, formants = sound_cache[audio_path]
        start = float(row["nucleus_start_s"])
        end = float(row["nucleus_end_s"])
        if end > sound.get_total_duration():
            raise ValueError(
                f"{row['token_id']}: nucleus end {end:.4f}s exceeds audio duration "
                f"{sound.get_total_duration():.4f}s"
            )
        record: dict[str, object] = {
            "token_id": row["token_id"],
            "speaker_id": row["speaker_id"],
            "recording_path": row["recording_path"],
            "pinyin": row["pinyin"],
            "tone": row["tone"],
            "initial": row["initial"],
            "final": row["final"],
            "word_or_character": row.get("word_or_character", ""),
            "context": row.get("context", ""),
            "nucleus_start_s": start,
            "nucleus_end_s": end,
            "nucleus_duration_ms": round((end - start) * 1000, 3),
            "manual_boundary_status": row["manual_boundary_status"],
            "quality_status": row["quality_status"],
            "max_formant_hz": float(row.get("max_formant_hz") or 5500),
            "analysis_method": "Praat Burg; 10 ms step; 25 ms window; pre-emphasis 50 Hz; five formants",
        }
        missing_count = 0
        for point_number, fraction in enumerate(TRACK_FRACTIONS, start=1):
            timestamp = start + (end - start) * fraction
            record[f"time_{point_number}_fraction"] = fraction
            record[f"time_{point_number}_s"] = round(timestamp, 6)
            for formant_number in FORMANT_NUMBERS:
                value = formants.get_value_at_time(formant_number, timestamp)
                if value is None or not math.isfinite(float(value)):
                    record[f"f{formant_number}_p{point_number}"] = ""
                    missing_count += 1
                else:
                    record[f"f{formant_number}_p{point_number}"] = round(float(value), 3)
        record["missing_formant_values"] = missing_count
        record["formant_track_complete"] = missing_count == 0
        output.append(record)
    return output


def write_csv(path: Path, rows: list[dict[str, object]]) -> None:
    if not rows:
        raise ValueError("no measurement rows to write")
    path.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = list(rows[0].keys())
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames, extrasaction="raise")
        writer.writeheader()
        writer.writerows(rows)


def main(argv: Iterable[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--tokens", type=Path, required=True, help="CSV of manually verified token boundaries")
    parser.add_argument("--corpus-root", type=Path, required=True, help="root directory for recording_path values")
    parser.add_argument("--output", type=Path, required=True, help="destination CSV for raw formant trajectories")
    args = parser.parse_args(argv)
    try:
        tokens = read_token_index(args.tokens)
        measurements = extract_rows(tokens, args.corpus_root)
        write_csv(args.output, measurements)
    except (OSError, ValueError, RuntimeError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2
    complete = sum(bool(row["formant_track_complete"]) for row in measurements)
    print(
        f"Measured {len(measurements)} manually verified tokens; "
        f"{complete} have complete F1/F2/F3 tracks. "
        "These are raw acoustic measurements, not automatic IPA adjudications."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
