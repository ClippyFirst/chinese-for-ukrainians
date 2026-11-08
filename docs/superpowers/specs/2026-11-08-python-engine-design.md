# Python transcription engine — design specification

**Date:** 2026-11-08  
**Status:** Design baseline for implementation; no Python package is shipped yet.  
**Repository:** `ClippyFirst/chinese-for-ukrainians`

## Intent

Add a distributable Python library and CLI for Chinese-to-Ukrainian transcription without creating a second, independently maintained linguistic product. The Python interface serves batch, automation, notebook and research use cases; the existing static browser application remains the public web interface.

## Goals

- Provide an importable, typed Python API and UTF-8 CLI.
- Reuse the canonical `zh-in-ua.csv` and the project's documented broad-IPA convention.
- Keep the three Ukrainian systems independent and preserve missing/unresolved states.
- Keep IPA as the adapter boundary; do not add a Pinyin fallback.
- Preserve non-Han text, whitespace, punctuation and source alignment.
- Make Python-vs-JavaScript pronunciation differences inspectable rather than hiding them.
- Ship an offline wheel with package data and no runtime network calls.

## Non-goals

- Replacing the browser application or adding a server.
- Claiming exact pypinyin/pinyin-pro parity for every phrase, name or polyphonic character.
- Acoustic/narrow IPA certification.
- Translation, OCR, Cantonese/Jyutping or automatic semantic disambiguation.
- Publishing to PyPI, choosing a final distribution name or issuing a DOI in this implementation phase.

## Approaches considered

1. **Duplicate the whole JavaScript runtime in Python.** Rejected: it would create two independently maintained data and behavior stacks and increase linguistic drift.
2. **Build a thin Python wrapper around a remote website/API.** Rejected: it violates offline/batch use and the project's static privacy model.
3. **A Python package with an explicit pronunciation adapter, shared canonical CSV, a parity-tested IPA port and a CLI.** Selected: it reuses project-owned transcription rules and source data while using pypinyin as the Python G2P dependency. Differences from the website's pinyin-pro engine remain explicit and testable.

## Architecture decisions

- Import package: provisional `zhua`; CLI: provisional `chuktrans`; PyPI distribution name remains provisional until registry availability and metadata are checked.
- Use PEP 621 `pyproject.toml`, `src/` layout, type hints and bilingual docstrings.
- Start with pypinyin `0.55.0`; use `Style.TONE3`, `v_to_u=True`, `neutral_tone_with_five=True`, and disable tone sandhi by default.
- Do not require OpenCC in the first core release. Test pypinyin's documented Traditional support. If explicit script normalization is needed, evaluate `opencc-py` as an optional extra and preserve original-source alignment.
- The root `zh-in-ua.csv` remains canonical. The wheel receives a generated package-data copy and CI checks byte equality.
- Port the current JS broad-IPA algorithm without altering linguistic decisions; add cross-runtime golden tests.
- Expose `convert()` as the single implementation path; `transcribe()` and `transcribe_all()` are convenience wrappers.
- Return strings from convenience functions and a typed structured result from `convert()`.

## Acceptance constraints

- The source CSV is not duplicated as an editable source.
- Blank cells, unsupported IPA and unresolved pronunciation never become fabricated output.
- No fallback from IPA lookup to Pinyin lookup.
- Mapping provenance and issue states remain inspectable.
- The Python wheel works outside the repository checkout.
- The Python tests and all existing JavaScript release gates pass on the exact candidate commit.
- No publish/release action occurs without a separately verified package name, ownership, metadata and source-data rights.

## Implementation decisions left to the builder

The builder may choose the build backend, exact optional OpenCC pin and final distribution name only after testing the relevant packaging/API behavior and verifying registry availability. These choices must be recorded in the implementation plan and task register.
