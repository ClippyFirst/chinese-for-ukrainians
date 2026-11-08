# Python Engine Implementation Plan

> **For agentic workers:** Execute task-by-task. Keep the master register current. Every production behavior change requires a failing test first and a passing full suite afterward.

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

**Files:**
- Create: `python/pyproject.toml`
- Create: `python/src/zhua/__init__.py`
- Create: `python/src/zhua/api.py`
- Create: `python/src/zhua/models.py`
- Test: `python/tests/test_api.py`

**Interfaces:**
- `convert(text: str, *, script: str = "auto", show_pinyin_tones: bool = True, show_ukrainian_tones: bool = True) -> ConversionResult`
- `transcribe(text: str, system: str, *, show_tones: bool = True) -> str`
- `transcribe_all(text: str, *, show_tones: bool = True) -> dict[str, str]`

- [ ] Test empty input, invalid system, stable system keys and result model shape.
- [ ] Verify tests fail because the API is absent.
- [ ] Implement the minimal typed API and package metadata.
- [ ] Run `python -m pytest` and `python -m build`; verify wheel import from outside the repository.

### Task 2: Canonical CSV packaging and IPA-keyed mappings

**Files:**
- Modify: `scripts/generate-mappings.mjs`
- Create: `python/src/zhua/data/zh-in-ua.csv` (generated)
- Create: `python/src/zhua/mappings.py`
- Test: `python/tests/test_mappings.py`

**Interfaces:**
- `load_mappings() -> MappingBundle`
- `validate_packaged_data() -> ValidationReport`

- [ ] Test CSV schema, aliases, missing cells, source row provenance, duplicate normalized keys and packaged-data drift.
- [ ] Verify the new tests fail before implementation.
- [ ] Extend generation to produce the package-data copy from the root CSV.
- [ ] Build IPA-keyed maps with collision detection and explicit missing markers.
- [ ] Run Python tests and `npm run validate:data && npm run generate:data && git diff --exit-code -- src/generated/transcription-map.js`.

### Task 3: Pinyin, scanner and IPA pipeline

**Files:**
- Create: `python/src/zhua/scanner.py`
- Create: `python/src/zhua/pinyin.py`
- Create: `python/src/zhua/ipa.py`
- Create: `python/src/zhua/tones.py`
- Test: `python/tests/test_scanner.py`
- Test: `python/tests/test_pinyin.py`
- Test: `python/tests/test_ipa.py`
- Test: `python/tests/fixtures/cross_engine_golden.csv`

- [ ] Test non-Han preservation, Simplified/Traditional/mixed input, tone-number normalization, neutral tone, unsupported forms and representative IPA classes.
- [ ] Verify each test fails for the intended missing behavior.
- [ ] Implement the pypinyin adapter using `Style.TONE3`, `v_to_u=False` (then normalize `v`/`u:` to `ü` in the package adapter), `neutral_tone_with_five=True`, `tone_sandhi=False`.
- [ ] Port the existing JS broad-IPA mapping without changing its linguistic convention.
- [ ] Build a reviewed cross-engine fixture. Classify each case as exact parity, known engine difference or unresolved; do not score a guessed answer as gold.
- [ ] Run `python -m pytest` and the existing JS suite.

### Task 4: CLI and user/developer documentation

**Files:**
- Create: `python/src/zhua/cli.py`
- Modify: `python/pyproject.toml`
- Create: `python/README.md`
- Modify: `README.md`, `docs/INDEX.md`, `docs/ARCHITECTURE.md`, `docs/USER-GUIDE.md`

- [ ] Test stdin, UTF-8 file input, system selection, JSON output, error exit codes and preservation of stdout/stderr separation.
- [ ] Verify CLI tests fail before implementation.
- [ ] Add `chuktrans` entry point and bilingual API/CLI examples.
- [ ] Confirm docs distinguish the shipped website from the Python package until the latter is actually released.
- [ ] Run CLI smoke tests from a clean environment.

### Task 5: CI, wheel reproducibility and release gates

**Files:**
- Modify: `.github/workflows/quality.yml`
- Create: `python/tests/test_package_data.py`
- Modify: `docs/audits/current/MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md`
- Modify: `docs/audits/current/CHAT-HANDOFF.md`

- [ ] Add a supported Python-version matrix and run pytest.
- [ ] Build sdist/wheel, inspect archive data, install wheel into a clean environment and run import/CLI smoke tests.
- [ ] Verify canonical CSV/package-data byte equality.
- [ ] Run all existing JavaScript quality, browser, benchmark, generated-artifact and release checks.
- [ ] Record exact commit SHA, CI run URLs, commands and remaining source/license/name blockers.
- [ ] Do not publish to PyPI until the distribution name is confirmed available, metadata is verified, dependency notices are reviewed and source-data rights are sufficiently clear.

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
| Python package skeleton and typed API | PARTIAL | `python/pyproject.toml`, `python/src/zhua/__init__.py`; runtime test result pending exact-head CI |
| Canonical data packaging | PARTIAL | Generated copy committed at `python/src/zhua/data/zh-in-ua.csv`; generator now synchronizes it; byte-equality test added, CI pending |
| Pypinyin and broad IPA adapters | PARTIAL | Implemented in `zhua`; exact behavior and collision gates pending CI |
| IPA-keyed three-system maps | PARTIAL | Built from packaged CSV, preserving blanks and source-row provenance; runtime verification pending |
| Cross-runtime golden tests | PARTIAL | Shared fixture consumed by Node and pytest; exact parity only for six listed cases; CI pending |
| CLI | PARTIAL | `python -m zhua` and `chuktrans` entry point; stdin/file/system/JSON smoke tests pending CI |
| Wheel and clean install | TODO | Quality workflow now builds a wheel, installs it in an isolated venv, imports from `/tmp`, and runs CLI smoke test; must pass on exact PR HEAD |
| Python 3.10–3.13 matrix | TODO | Matrix added; must pass on exact PR HEAD |
| Publication | DEFERRED | No PyPI publish. Package name, dependency notices and source-data rights remain unverified. |
| Linguistic evidence and manual QA | BLOCKED / separate gates | Pypinyin-vs-pinyin-pro differences outside shared fixture, source-data rights, and manual assistive-tech QA remain open. |

Local repository cloning was blocked by unavailable DNS resolution for github.com, so no local pytest/build/clean-install result is claimed. The CI workflow is the acceptance environment; the final ledger must be updated only from its exact-head results.
