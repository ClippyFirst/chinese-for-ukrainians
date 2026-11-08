# Python Engine Implementation Plan

**Execution status: COMPLETED and merged to `main`.** This document began as an implementation plan. Its initial proposed module split was simplified during implementation; the as-built layout and exact CI evidence below supersede any target-file names that differ.

**Goal:** Ship an offline Python library and CLI that reuse the Chinese-for-Ukrainians transcription data and IPA-first adapter contract.

**Architecture:** A `python/` PEP 621 project uses pypinyin for Chinese pronunciation, a tested Python port of the existing broad-IPA mapping, and the canonical CSV packaged as generated data. The browser app remains independent and static; cross-engine differences are classified rather than concealed.

**Tech Stack:** Python 3.10+; pypinyin 0.55.0; pytest; PEP 621 `pyproject.toml`; optional OpenCC evaluation only if required.

**Spec:** [2026-11-08-python-engine-design.md](../specs/2026-11-08-python-engine-design.md)

## Global Constraints

- `zh-in-ua.csv` is the only editable Ukrainian mapping source.
- Python Ukrainian adapters consume segmental IPA keys, never source Pinyin keys.
- No cross-system fallback and no unsupported-IPA fallback.
- Preserve tone, token boundaries, source spans, mapping provenance and uncertainty.
- Pypinyin and pinyin-pro are distinct pronunciation engines; do not assert universal output parity.
- Runtime processing is offline; no API/server dependency.
- Do not publish a PyPI release or issue a DOI during implementation.

## Review Focus

- Phrase/polyphonic pronunciation differs between pypinyin and pinyin-pro.
- Traditional/variant characters may have different dictionary coverage and alignment.
- Neutral tone and tone sandhi must not be silently conflated.
- Unsupported IPA forms and blank CSV cells must remain unresolved/missing.
- Mixed Unicode text, punctuation and whitespace must survive tokenization and CLI piping.

---

### Task 1: Python project and public API skeleton

**As-built files:**
- `python/pyproject.toml`
- `python/src/zhua/__init__.py` (public API and typed result models)
- `python/src/zhua/__main__.py`
- `python/tests/test_engine.py`

**Interfaces:**
- `convert(text: str, *, script: str = "auto", show_pinyin_tones: bool = True, show_ukrainian_tones: bool = True) -> ConversionResult`
- `transcribe(text: str, system: str, *, show_tones: bool = True) -> str`
- `transcribe_all(text: str, *, show_tones: bool = True) -> dict[str, str]`

- [x] Empty input, invalid system, stable system keys and result model shape are tested.
- [x] Implemented the public API and package metadata.
- [x] Python pytest and wheel import from outside the repository passed in CI.
- [ ] A strict test-first/red-before-implementation sequence was not followed; CI exposed defects which were corrected before the final green run.

### Task 2: Canonical CSV packaging and IPA-keyed mappings

**As-built files:**
- `scripts/generate-mappings.mjs`
- generated `python/src/zhua/data/zh-in-ua.csv`
- `python/src/zhua/__init__.py` (CSV loader, IPA-key maps and validation)
- `python/tests/test_engine.py`

**Interfaces:**
- `load_mappings() -> MappingBundle`
- `validate_packaged_data() -> ValidationReport`

- [x] CSV schema, missing cells, source-row provenance, unsupported forms and byte-identical package data are tested.
- [x] Generation produces the Python package-data copy from the root CSV.
- [x] IPA-keyed maps detect collisions and retain explicit missing markers.
- [x] CI runs the generator and byte-drift check successfully.

### Task 3: Pinyin, scanner and IPA pipeline

**As-built files:**
- `python/src/zhua/__init__.py` (scanner, pypinyin adapter, tone normalization and broad IPA port in one compact module)
- `python/tests/test_engine.py`
- `python/tests/fixtures/cross_runtime_golden.json`
- `tests/python-cross-runtime-golden.test.mjs`

- [x] Test mixed Unicode/non-Han preservation, Traditional input, tone normalization, unsupported forms and representative IPA classes.
- [x] Use pypinyin `Style.TONE3`, `v_to_u=False`, `neutral_tone_with_five=True`; no unsupported tone-sandhi argument is passed.
- [x] Port the JS broad-IPA mapping, including unresolved IPA forms.
- [x] Shared six-case fixture asserts Pinyin, IPA and all three UA outputs across both runtimes.
- [x] Python pytest and JavaScript suites pass. Engine differences outside the fixture remain explicit.

### Task 4: CLI and user/developer documentation

**As-built files:**
- `python/src/zhua/__main__.py` and `zhua:main` console entry point in `python/pyproject.toml`
- `python/README.md`
- root README and docs index/architecture/hand-off

- [x] Test stdin, UTF-8 file input, system selection, JSON output, error exit codes and stdout/stderr separation.
- [x] Add the `chuktrans` entry point and API/CLI examples.
- [x] Docs distinguish the browser app from the unpublished Python alpha.
- [x] Clean-environment CLI smoke test passed.

### Task 5: CI, wheel reproducibility and release gates

**Files:**
- Modify: `.github/workflows/quality.yml`
- Create: `python/tests/test_package_data.py`
- Modify: `docs/audits/current/MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md`
- Modify: `docs/audits/current/CHAT-HANDOFF.md`

- [x] Python 3.10–3.13 matrix passed (10 pytest tests per version).
- [x] Built sdist and wheel, inspected archive, installed wheel in a clean venv, imported from `/tmp`, and ran CLI JSON smoke test.
- [x] Canonical CSV/package-data byte equality passed.
- [x] Existing JavaScript, browser, benchmark, generated-artifact, production-build and release gates passed.
- [x] Exact commit/run evidence and remaining source/license/name blockers recorded in the master register.
- [x] No PyPI publication; name availability and source-data rights remain unresolved.

## Definition of done

- Python API, CLI, wheel and tests work from a clean install outside the checkout.
- All three Ukrainian systems use the same canonical CSV and IPA-first adapter semantics as the website.
- Pypinyin-specific pronunciation differences are documented and covered by a reviewed fixture.
- Python and JavaScript quality gates pass on the exact same commit.
- Documentation and master handoff reflect the real code state.
- PyPI publication remains a separate explicitly approved release action.


## Execution ledger — 2026-11-08

| Workstream | Status | Evidence / remaining acceptance |
|---|---|---|
| Python package skeleton and typed API | DONE_VERIFIED | `python/pyproject.toml`, `python/src/zhua/__init__.py`; 10 pytest tests pass on Python 3.10–3.13 |
| Canonical data packaging | DONE_VERIFIED | Generated copy committed at `python/src/zhua/data/zh-in-ua.csv`; generator synchronizes it; byte-equality test passes in CI |
| Pypinyin and broad IPA adapters | DONE_VERIFIED | Implemented in `zhua`; runtime, IPA collision and golden checks pass in CI |
| IPA-keyed three-system maps | DONE_VERIFIED | Built from packaged CSV, preserving blanks and source-row provenance; runtime verification passes in CI |
| Cross-runtime golden tests | DONE_VERIFIED | Shared fixture consumed by Node and pytest; six curated cases assert Pinyin, IPA and all three UA outputs; Node/Python suites pass |
| CLI | DONE_VERIFIED | `python -m zhua` and `chuktrans` entry point; stdin/file/system/JSON tests pass in CI CI |
| Wheel and clean install | DONE_VERIFIED | Quality workflow now builds a wheel, installs it in an isolated venv, imports from `/tmp`, and runs CLI smoke test; passed on exact PR head; isolated install/import/CLI smoke test passed |
| Python 3.10–3.13 matrix | DONE_VERIFIED | Matrix added; all four Python versions passed |
| Publication | DEFERRED | No PyPI publish. Package name, dependency notices and source-data rights remain unverified. |
| Linguistic evidence and manual QA | BLOCKED / separate gates | Pypinyin-vs-pinyin-pro differences outside shared fixture, source-data rights, and manual assistive-tech QA remain open. |

Local repository cloning was blocked by unavailable DNS resolution for github.com. All required build, pytest, cross-runtime and clean-install acceptance was therefore executed in GitHub Actions and passed on exact PR head `2e94cad9279344726d0bf74b35636e303d81d100`.


## Final verification — 2026-11-08

PR #51 merged as `539720a5b9cebcd5f83a011cf107b65f89ae45d2` after [Quality run 42464642753](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/42464642753) passed. Python pytest: 10/10 on Python 3.10, 3.11, 3.12 and 3.13. The sdist and wheel built; the wheel was inspected, installed in an isolated virtualenv, imported from `/tmp`, and its `chuktrans --json` smoke test passed. Shared JS/Python golden tests passed for Pinyin, IPA and all three Ukrainian outputs. Full JavaScript, benchmark, build, release and Chromium/WebKit browser gates passed.

The verified artifacts and SHA-256 checksums are recorded in the master execution register. Publication remains DEFERRED because source-specific rights for the packaged CSV and distribution-name availability remain unresolved. Manual assistive-technology QA remains TODO.


### As-built module boundary

The implementation is compact rather than following the original multi-file split: the public API, dataclasses, scanner, pypinyin adapter, tone normalization, IPA port, CSV loader and CLI function live in `python/src/zhua/__init__.py`; `__main__.py` provides `python -m zhua`. This was tested as shipped. Refactoring into smaller modules is optional maintenance work, not an acceptance blocker.
