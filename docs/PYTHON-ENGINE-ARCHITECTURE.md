# Python engine architecture

**Status: design accepted for implementation planning; no Python transcription package is shipped yet.** The current repository ships a browser-only JavaScript converter. The existing Python files under `research/ipa-acoustic/` are research/measurement utilities, not a reusable transcription engine.

## Product boundary

The Python distribution is a second interface to the same transcription project, not a second linguistic product. It should support batch processing, command-line pipelines, notebooks, OCR post-processing and research workflows while reusing the project's canonical Ukrainian mappings and documented broad-IPA conventions.

The web app remains a static browser application. Python must not become a server dependency of the deployed site.

## Contract and pipeline

The package must preserve the documented processing order:

```text
Chinese input
→ source-span scanning / non-Han preservation
→ script-aware Mandarin pronunciation resolution
→ normalized Pinyin tokens with tone and source alignment
→ broad segmental IPA + lexical-tone metadata
→ IPA-keyed Ukrainian adapters
→ structured result / string renderers / CLI
```

The three Ukrainian systems remain independent. A blank CSV cell is a meaningful missing value; it is never filled from another system. An unsupported IPA form remains unresolved; it must not fall back to a Pinyin-keyed lookup. The package must preserve source text, token boundaries, tones, mapping provenance, and issue states.

### Public API proposal

The stable system identifiers already used by the JavaScript runtime are authoritative:

- `kirnosova`
- `kirnosova_tsisar`
- `nanu`

Proposed convenience API:

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

Use `pypinyin` as the initial Python Mandarin G2P adapter rather than implementing a new Pinyin dictionary. PyPI currently lists version `0.55.0` (released 2025-07-20), MIT licensing, and support for phrase-based pronunciation, heteronyms, Traditional Chinese and tone-number output. Its documented `Style.TONE3`, `v_to_u=True`, and `neutral_tone_with_five=True` options are suitable inputs to the project's normalized token contract.

Important compatibility limit: the website currently uses pinned `pinyin-pro@3.29.4` plus `@pinyin-pro/data@1.3.1`. `pypinyin` is a different lexicon and resolver. It must not be described as output-identical to pinyin-pro for every polyphonic word, name or phrase. Cross-engine tests must distinguish:
1. exact parity on a curated, reviewed shared fixture;
2. expected engine-specific pronunciation differences;
3. unresolved or unsupported cases.

Tone sandhi should remain disabled by default. The website's IPA convention represents lexical/citation tone and does not claim connected-speech tone-sandhi output.

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

This is a target layout, not a claim that these files already exist.

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

The root MIT license covers repository code only to the extent stated by its terms; it does not automatically relicense source-derived transcription data, third-party dictionaries or reference materials. Package metadata must not claim broader data rights than the repository's provenance register supports. Review the pypinyin and optional OpenCC dependency licenses and notices at the pinned versions before publishing. Keep the source CSV attribution and data-use caveats inside the wheel.

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
