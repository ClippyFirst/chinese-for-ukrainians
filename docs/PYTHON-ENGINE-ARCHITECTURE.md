# Python engine architecture

**Status: alpha implementation merged to `main` at `539720a5b9cebcd5f83a011cf107b65f89ae45d2`; Quality run 42464642753 passed all jobs, including wheel, clean install, Python matrix and browser gates. Not published.** The repository now ships two interfaces: the static JavaScript browser converter and the alpha Python package `zhua` with the `chuktrans` CLI. The separate files under `research/ipa-acoustic/` remain research/measurement utilities.

## Product boundary

The Python distribution is a second interface to the same transcription project, not a second linguistic product. It should support batch processing, command-line pipelines, notebooks, OCR post-processing and research workflows while reusing the project's canonical Ukrainian mappings and documented broad-IPA conventions.

The web app remains a static browser application. Python must not become a server dependency of the deployed site.

## Contract and pipeline

The package must preserve the documented processing order:

```text
Chinese input
→ source-span scanning / non-Han preservation
→ shared Traditional/Simplified character evidence classification → pypinyin Mandarin pronunciation resolution
→ normalized Pinyin tokens with tone and source alignment
→ broad segmental IPA + lexical-tone metadata
→ IPA-keyed Ukrainian adapters
→ structured result / string renderers / CLI
```

The three Ukrainian systems remain independent. A blank CSV cell is a meaningful missing value; it is never filled from another system. An unsupported IPA form remains unresolved; it must not fall back to a Pinyin-keyed lookup. The package must preserve source text, token boundaries, tones, mapping provenance, and issue states.

### Implemented public API

The stable system identifiers already used by the JavaScript runtime are authoritative:

- `kirnosova`
- `kirnosova_tsisar`
- `nanu`

Implemented convenience API:

```python
import zhua

zhua.transcribe("你好世界", system="kirnosova")
zhua.transcribe_all("你好世界")
result = zhua.convert("你好世界")
```

Contract:

- `transcribe(text, system, *, show_tones=True)` returns one Ukrainian string.
- `transcribe_all(text, *, show_tones=True)` returns a mapping containing `pinyin`, `ipa`, and all three Ukrainian system outputs.
- `convert(text, *, script="auto", show_pinyin_tones=True, show_ukrainian_tones=True)` returns a typed result with source spans, tokens, Pinyin, IPA, per-system text, and structured issues.
- Unknown system identifiers and invalid option values raise clear `ValueError` exceptions.
- Empty input returns empty outputs without raising.
- Non-Han text, whitespace, punctuation, line breaks and emoji are preserved.
- No network access is required at runtime.

The convenience functions must be thin wrappers over the same `convert()` implementation; there must not be a second conversion path.

## Pronunciation dependency

Use `pypinyin` as the initial Python Mandarin G2P adapter rather than implementing a new Pinyin dictionary. PyPI currently lists version `0.55.0` (released 2025-07-20), MIT licensing, and support for phrase-based pronunciation, heteronyms, Traditional Chinese and tone-number output. Its `Style.TONE3` and `neutral_tone_with_five=True` options are used. The implementation keeps `v_to_u=False` so ü/v spellings can be normalized explicitly at the package boundary.

Important compatibility limit: the website currently uses pinned `pinyin-pro@3.29.4` plus `@pinyin-pro/data@1.3.1`. `pypinyin` is a different lexicon and resolver. It must not be described as output-identical to pinyin-pro for every polyphonic word, name or phrase. Cross-engine tests must distinguish:
1. exact parity on a curated, reviewed shared fixture;
2. expected engine-specific pronunciation differences;
3. unresolved or unsupported cases.

The adapter does not request or implement tone sandhi; its output is treated as lexical/citation-form Pinyin. The website's IPA convention does not claim connected-speech tone-sandhi output.

Primary references:
- [pypinyin on PyPI](https://pypi.org/project/pypinyin/)
- [pypinyin API and usage](https://github.com/mozillazg/python-pinyin/blob/master/README_en.rst)
- [pypinyin tone-number and neutral-tone options](https://github.com/mozillazg/python-pinyin/blob/master/docs/usage.rst)

## Traditional Chinese and OpenCC

Do not make a second script-conversion pipeline part of the first release. pypinyin documents basic Traditional Chinese support; test that support directly against the repository's Traditional-script fixtures.

If explicit character conversion is later required, evaluate the maintained `opencc-py` distribution (Apache-2.0; Python >=3.9; imports as `opencc`) as an optional extra. Do not blindly adopt `opencc-python-reimplemented`: its PyPI page identifies release `0.1.7` from 2023 and an Alpha development classifier. OpenCC conversion must never silently destroy source alignment or rewrite the user's original text. It must be a separately named preprocessing option with tests for phrase conversion and length/alignment changes.

References:
- [opencc-py on PyPI](https://pypi.org/project/opencc-py/)
- [opencc-python-reimplemented on PyPI](https://pypi.org/project/opencc-python-reimplemented/)

## Canonical data and packaging

`zh-in-ua.csv` remains the only editable source for the three Ukrainian systems. Do not author a Python dictionary or a second manually maintained CSV.

The Python wheel must include a generated package-data copy, for example `python/src/zhua/data/zh-in-ua.csv`. The existing Node generator (or a narrowly scoped companion generator) must create this copy from the root CSV. CI must compare the packaged copy byte-for-byte with the canonical file and fail on drift. The wheel must load data using `importlib.resources`, never by assuming the repository checkout exists at runtime.

The Python IPA conversion must be a tested port of the current `src/app/ipa.js` contract, including:
- the same normalization of Pinyin tone marks, `v` and `u:`;
- the same supported initial/final and exceptional-form inventory;
- the same broad IPA symbols and lexical-tone convention;
- explicit unresolved output for unsupported forms;
- no Pinyin fallback after an IPA lookup miss.

The adapter map is built from the packaged CSV using the IPA key and must detect collisions before serving results. Each mapping entry retains source CSV row, source Pinyin key, system identifier and missing marker.

## Target package layout

```text
python/
├── pyproject.toml
├── README.md
├── LICENSE                  # only if distribution metadata requires a copy; keep scope explicit
├── src/
│   └── zhua/
│       ├── __init__.py
│       ├── api.py            # transcribe / transcribe_all / convert
│       ├── models.py         # typed results, tokens, issues
│       ├── scanner.py        # source spans and non-Han preservation
│       ├── pinyin.py         # pypinyin adapter
│       ├── ipa.py            # broad IPA adapter, parity-tested against JS
│       ├── mappings.py       # CSV loading, validation and IPA-key map
│       ├── tones.py          # Ukrainian tone-mark rendering
│       ├── cli.py            # command-line entry point
│       └── data/
│           └── zh-in-ua.csv  # generated copy; never edit by hand
└── tests/
    ├── test_api.py
    ├── test_scanner.py
    ├── test_pinyin.py
    ├── test_ipa.py
    ├── test_mappings.py
    ├── test_cli.py
    └── fixtures/
        └── cross_engine_golden.csv
```

This was the initial target layout. The current alpha is intentionally compact: most runtime logic is in `python/src/zhua/__init__.py`, the module entry point is `__main__.py`, and current regression tests are consolidated in `python/tests/test_engine.py`. Split modules only when the implementation stabilizes.

## Packaging and CLI

Use PEP 621 metadata in `pyproject.toml`, a `src/` layout, a pure-Python wheel, type annotations, bilingual Ukrainian/English docstrings, and explicit package-data inclusion. Start at `0.1.0`; do not promise API stability or publish until wheel contents and clean-install tests pass.

Proposed distribution name: `chinese-ukrainian-transcription` (provisional; availability was not verified in this session). Proposed import name: `zhua`. Proposed CLI: `chuktrans`.

CLI contract:

```bash
echo "你好世界" | chuktrans --system kirnosova
chuktrans --system all --format json input.txt
```

The CLI reads stdin when no input file is supplied, writes only result text/JSON to stdout, sends diagnostics to stderr, supports UTF-8, and returns a non-zero exit status for invalid options or unreadable files. It must not silently truncate long input.

## Licensing and provenance

The root MIT license covers project code. The owner confirms the canonical CSV is their original work and authorizes its inclusion; it remains under their control unless separately licensed. Preserve upstream `pypinyin` and `@pinyin-pro/data` notices; the generated character-variant dictionary carries its ISC notice in the wheel.

## Quality gates

Required before calling the Python engine implemented:

- pytest suite for API, scanner, Pinyin adapter, IPA adapter, mappings, errors and CLI;
- tests for simplified, Traditional, mixed, punctuation, whitespace, emoji, empty input, unknown pronunciation, missing CSV values, unsupported IPA, duplicate/colliding IPA keys and tone options;
- byte-for-byte packaged CSV drift check;
- cross-runtime golden fixture with explicit engine-difference classifications;
- build sdist and wheel, inspect archive contents, install wheel into a clean environment, import package outside the repository, and execute CLI smoke tests;
- Python CI matrix and security/dependency audit;
- existing JavaScript unit, browser, build, generated-artifact, benchmark and release gates remain green.

No PyPI publish, release tag, DOI or claim of production readiness is part of this design.


## Implementation snapshot — 2026-11-08

The current branch contains `python/src/zhua`, a PEP 621 package with the `convert()`, `transcribe()` and `transcribe_all()` APIs, a `chuktrans` entry point, a pypinyin 0.55.0 adapter, a port of the repository's broad IPA mapping, three independent IPA-keyed Ukrainian maps, and a generated Traditional/Simplified classifier map. `npm run generate:data` synchronizes both package data files from their pinned sources.

The cross-runtime golden fixture is `python/tests/fixtures/cross_runtime_golden.json`. The Node suite and Python pytest suite both consume the same twelve exact-parity cases, asserting Pinyin, broad IPA and all three Ukrainian outputs; the Node test also compares the two runtime results directly. This is a narrow shared-golden assertion, not a claim that pypinyin and pinyin-pro are universally equivalent.

Implementation caveats:
- `script="auto"` classifies distinctive Simplified, Traditional and mixed character evidence using the same pinned `@pinyin-pro/data` map as the browser. Shared-only Han text remains `undetermined`; this does not infer Taiwan/Hong Kong locale and never rewrites source text.
- The adapter uses pypinyin's `Style.TONE3`, `neutral_tone_with_five=True` and `v_to_u=False`; tone sandhi is not requested or applied by this adapter. Tones are treated as lexical/citation-form. It retains ü normalization and does not add OpenCC.
- The package metadata/distribution name remains provisional. The owner-authorized CSV is not a source-rights blocker. The PyPI name availability still needs a live registry check before metadata freeze.
- Local clone access was unavailable in the implementation session. The workflow now owns pytest, Python 3.10–3.13 matrix verification, wheel build, isolated wheel install from outside the checkout, CLI smoke test, shared golden cases and the pre-existing JavaScript/browser gates. Mark these gates verified only after the exact PR-head run completes.
