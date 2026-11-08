# Актуальна передача контексту — Chinese for Ukrainians

**Оновлено:** 2026-11-08, repository structure and Python engine design handoff.  
**Репозиторій:** https://github.com/ClippyFirst/chinese-for-ukrainians  
**Master register:** [MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md](./MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md)  
**Документація:** [індекс](../../INDEX.md)

## Поточний стан

- Базова гілка перед цією роботою: main, SHA `36cb27b3fd4b46b37ed1735269f5ebb3a7b28cc4`.
- Гілка цієї зміни: `chore/repository-hygiene-docs-2026-10-23`. Зміни не вносяться безпосередньо в main.
- PR #32 — [узгодження header на конвертері та методології](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/32) — merged у main commit `1bc06c5de6984880e8bbd3167f0d0e67b003bb3d`; browser CI пройшов після виправлення keyboard-focus тесту.
- PR #5 — closed as superseded (2026-10-23), не злитий. Його index.html прибирає IPA-вихід і посилання на методологію; гілку збережено для довідки.
- Продукт залишається **public beta / research preview**. Успішний CI не доводить фонетичної правильності кожного запису або очищення прав на всі джерела.

## Архітектурні факти

- CSV zh-in-ua.csv — канонічне джерело трьох українських систем; src/generated/transcription-map.js — генерований файл, його не видаляти й не редагувати вручну.
- IPA-first адаптер реалізовано в гілці PR #34: кожен resolved token несе сегментний IPA-ключ; три українські карти індексуються за IPA та зберігають provenance CSV. Колізії кидають помилку, а чотири непідтримані форми не отримують Pinyin-fallback. Чекаємо CI на точному HEAD перед злиттям.
- Три українські системи незалежні. Не заповнювати пропуски між ними.
- Датовані IPA audits, UW differential, source ledger і research/ipa-acoustic — дослідницькі докази/інструменти, а не зайві артефакти лише через те, що вони не є runtime-модулями.
- docs/USER-GUIDE.md — єдиний канонічний посібник користувача; дубльований docs/USAGE.md вилучено. Design QA перенесено в docs/audits/current/DESIGN-QA-2026-10-22.md.

## Команди

Потрібен Node.js >= 22.12.0.

~~~bash
npm ci
npm run validate:data
npm test
npm run build
git diff --exit-code -- src/generated/transcription-map.js
npm run check:release
npm run benchmark
npx playwright install
npm run test:browser
~~~

У цьому середовищі немає незалежного локального clone/runtime, тому локальне виконання npm-команд не заявляється. Для змін у репозиторії потрібен успішний Quality workflow на точному PR HEAD; історичні run-и не замінюють його.

## Реальні залишкові блокери

1. **IPA-first architecture:** спроєктувати й протестувати справжній IPA adapter boundary, не змінюючи мовні рішення без джерел.
2. **Права на дані:** пройти source-by-source умови використання; MIT LICENSE не поширюється автоматично на всі сторонні матеріали.
3. **Ручний QA:** screen reader/assistive technology, фізичне озвучення та реальні clipboard permissions.
4. **Корпус невизначених форм:** додати стабільну fixture лише на основі перевіреного прикладу.
5. **Citation metadata:** не вигадувати автора, ORCID чи DOI.
6. **CI:** перевірити workflow саме для цього PR і звірити фінальний SHA.

## Дії після цього PR

1. Перевірити лінки README → docs/INDEX → canonical docs, відсутність посилань на видалений docs/USAGE.md та коректність переміщеного Design QA.
2. Дочекатися зеленого Quality workflow на точному HEAD.
3. Злити лише цей ізольований cleanup PR після успішної перевірки; не зливати PR #5 автоматично.
4. Окремо вирішувати архітектурний IPA-first refactor і source rights, не маскувати їх документацією.


## IPA adapter continuation — 2026-10-23

The new [IPA adapter readiness gate](../../IPA-ADAPTER-READINESS.md) records the required sequence before a runtime migration. The current implementation still emits IPA and Ukrainian systems as parallel outputs; do not call it IPA-first. First inspect collisions between current broad-IPA keys and source CSV rows, then adjudicate them from primary sources before changing output generation. No phonetic mapping was changed in this branch.


The branch now includes `scripts/audit-ipa-adapter-readiness.mjs` and `tests/ipa-adapter-readiness.test.mjs`. The audit groups the current CSV aliases by broad IPA output and reports unsupported keys and collisions with divergent Ukrainian values. The test is picked up by the existing recursive test runner. The audit has not yet been run in a live repository runtime in this session; CI on the updated head is the evidence gate.


## Lockfile status recheck — 2026-10-23

The current `main:package-lock.json` is populated (27,197 characters, lockfileVersion 3, with root dependencies and package entries). The older master-register note that the lockfile contains an empty `packages` object is stale for the inspected current tree and must not be repeated as a current blocker. Exact clean-install reproducibility still requires the CI `npm ci` step to pass on the candidate SHA.


## IPA inventory audit result — 2026-10-23

Quality run [#40010328912](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40010328912) passed on commit `108f059a3903079557a4c8182164e49d4bd3208e`: 68 tests passed, zero failed. The new inventory audit found 421 CSV aliases, 417 mapped by the current broad-IPA function, 4 unsupported, and zero IPA-key collision groups under that function. This result establishes a deterministic inventory property only; it does not prove that every IPA value or Ukrainian transcription is linguistically correct. The audit subsequently identified the exact four keys below.


## IPA-first adapter implementation — 2026-10-23

PR #34: https://github.com/ClippyFirst/chinese-for-ukrainians/pull/34. Runtime changes are isolated in `src/data/ipa-transcription.js`, `src/app/pronunciation.js`, `src/app/transcribe.js` and `src/main.js`. The canonical CSV remains Pinyin-keyed source data; the runtime adapters use segmental IPA keys and preserve source row/key provenance. Missing system cells remain missing. Unsupported IPA keys are unresolved instead of falling back to Pinyin. PR #34 merged as `21b3e440fa8631a82273802f1880e31c9e8f7135`. Quality run #40012228389 passed 72 tests and all configured gates on the code-identical PR head; main's exact-SHA Quality run #40012724723 is completed successfully on the exact main SHA in Quality run #40012724723, including browser regression tests.


Edge-form scope decision (branch `fix/mandarin-edge-form-scope-2026-10-23`): `ê` maps to `ɛ`, supported by the open-content Mandarin reference's interjectional entry; `yo` maps to `jɔ` under an explicit broad-IPA project convention for an attested exceptional interjection. `hm` and `hng` stay deliberately unsupported: spelling/interjection attestation is not enough to determine exact IPA. New regression tests assert all four decisions, including unresolved behavior for `hm`/`hng`. This is not complete until CI and the inventory audit pass on the branch.


## Current main after IPA adapter merge

- Main SHA: `21b3e440fa8631a82273802f1880e31c9e8f7135`.
- PR #32 shared header: merged and Pages deployment succeeded.
- PR #33 repository hygiene, documentation consolidation and IPA inventory audit: merged; Pages deployment succeeded.
- PR #34 IPA-keyed Ukrainian adapters: merged; the adapter now consumes segmental IPA and preserves source provenance. Two consonant-only interjection spellings (`hm`, `hng`) remain intentionally unresolved by design; `ê` and `yo` now have explicit broad-IPA rules, subject to CI verification.
- Current main Quality and Pages runs: Quality `40012724723`, Pages `40012724825`; verify both final conclusions before marking the release candidate complete.


## IPA marginal interjection closeout — 2026-10-23

PR #38 merged to `main` as `fba393964757459df4bd6d7c435fe7b99c8b9286`. Quality run [#40019246182](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40019246182) passed on tested head `bc3d3088f3ef4158b9159a48fb6e80e219b4cc7a`. The regression suite now requires 421 aliases, exactly two unsupported keys (`hm`, `hng`), and zero IPA-key collisions. `ê → ɛ` is based on a source explicitly giving [ɛ] for certain interjections; `yo → jɔ` is an explicitly declared broad-IPA project convention for an attested exceptional interjection. `hm` and `hng` remain deliberately unresolved rather than guessed. This is a bounded implementation closeout, not proof of narrow phonetics or completion of source-image verification, licensing, or device QA.


## Cross-engine benchmark handoff — 2026-10-24

Working branch: `research/cross-engine-benchmark-2026-10-24`.

- Benchmark protocol and candidate inventory: `docs/audits/current/CROSS-ENGINE-BENCHMARK-2026-10-24.md`.
- Corpus schema: `docs/audits/current/CROSS-ENGINE-BENCHMARK-CORPUS-SCHEMA-2026-10-24.csv`. The included example is schema illustration only, marked `NOT_GOLD`; exclude it from all scoring.
- Key architecture fact: Pinyin G2P, broad IPA, and Ukrainian transcription are separate evaluation targets. The Ukrainian columns are source-specific and currently keyed by segmental IPA in the runtime adapter; do not merge their scores.
- Candidates: pinned current `pinyin-pro`; g2pW; g2pM; g2pC; pinyin-to-ipa. `pinyin2ipa` needs contract verification before treating it as a true IPA-output competitor. MFA is an auxiliary dictionary/alignment resource, not a direct converter replacement.
- Status: source discovery and protocol are documented; actual head-to-head model runs are NOT completed. The available session could inspect/update GitHub files but did not have a local shell/runtime to install external models, run them, and collect reproducible timing/memory/output artifacts. Do not report comparative accuracy or a winner.
- Next real acceptance gates: create an independently source-backed held-out corpus; run each pinned model on identical inputs; store raw predictions and environment manifest; separately evaluate IPA convention differences; independently collate Ukrainian source rows and rights; run the project CI on the exact resulting PR head.


## Continuation update — 2026-10-25, cross-engine benchmark guardrails and mobile table access

- PR [#42](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/42) merged at `7067a2ab88b032307db628d4f153f3b2807d6145`: documented a fair layered Mandarin benchmark contract, corpus schema, and the separation of Pinyin, broad IPA, and each Ukrainian-target method. This does not provide empirical accuracy evidence.
- PR [#44](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/44) merged at `d1e94e0e7d6dd6c4be8344e5a7376b16ddba449d`: added the isolated research-benchmark workflow, structural corpus validator, and validator tests; wired the validator regression and structural checks into the existing Quality workflow. Exact-head Quality run [40194934010](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40194934010) passed unit/integration tests, the new validator regression tests, corpus validation, acoustic input guards, production build, deterministic mapping check, conversion smoke benchmark, release checks, and browser regression tests.
- PR [#46](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/46) merged at `58cd2f1dba754172c4e8561d2afe6564516f6440`: made the methodology comparison tables accessible at 320/360/390/430px and added keyboard-scroll Playwright coverage. Exact-head Quality run [40195321277](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40195321277) passed, including browser regression tests.
- The dedicated `research-benchmark.yml` workflow now includes a `main` push trigger for relevant paths. The available connector only surfaced PR-triggered workflow runs, so the post-merge push-run conclusion and its `node-baseline-and-manifest`, `python-candidate-install-contracts`, and `g2pc-documented-example-smoke` artifacts are **NOT VERIFIED in this pass**. Do not mark that separate runner complete until the run and artifacts are inspected. The g2pC job is designed to emit `BLOCKED` rather than fabricate output if its legacy native dependency fails.
- Research boundary unchanged: benchmark corpus example rows are `NOT_GOLD`; no engine ranking or IPA/Ukrainian accuracy claim is made. Independent, source-backed, rights-reviewed held-out IPA and Ukrainian target gold remain the main scientific blocker.


---

## Handoff update — 2026-11-08

**Verified starting main SHA:** `91e94b8dd6826927a8e2588a0010bfc1e0bc00ae`. This update records the state before the documentation commit; the resulting commit SHA and exact-head workflow outcome must be appended once available.

### What is current

- Only `main` is currently listed as a branch; no open PRs were found. No branch merge operation was necessary.
- PR #48 is closed without merge by explicit scope correction; it belongs to separate Khmer/Lao/Burmese/Sinhala repositories. PR #50 is merged into the current main head.
- Quality workflow [41084676837](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/41084676837) passed on exact SHA `91e94b8dd6826927a8e2588a0010bfc1e0bc00ae`, including Node install, JS tests, research validators, acoustic guard tests, build, generated-file drift, conversion benchmark, release checks and Playwright browser tests.
- Local clone is blocked in this execution environment: `git clone https://github.com/ClippyFirst/chinese-for-ukrainians.git` failed with `Could not resolve host: github.com`. No local test command is claimed.
- The populated `package-lock.json` is lockfile v3; older notes describing it as empty are stale.
- The web app's IPA-first architecture is already implemented. The current runtime is not a Python package.

### Python engine scope

The new [Python engine architecture](../../PYTHON-ENGINE-ARCHITECTURE.md), [repository structure guide](../../REPOSITORY-STRUCTURE.md), [design spec](../../superpowers/specs/2026-11-08-python-engine-design.md) and [implementation plan](../../superpowers/plans/2026-11-08-python-engine.md) define the intended package boundary. The proposed import is `zhua`, CLI `chuktrans`, and PyPI distribution name remains provisional pending a live registry check.

Core technical decisions:
- use pypinyin 0.55.0 as the Python G2P adapter, not a new Pinyin dictionary;
- do not claim pypinyin and pinyin-pro produce identical results for every polyphonic word/name;
- preserve the IPA-first adapter contract and port the existing broad-IPA function with parity tests;
- keep root `zh-in-ua.csv` canonical and generate a package-data copy for the wheel;
- do not add OpenCC to the first core dependency set; evaluate `opencc-py` only as an optional extra if a tested use case requires explicit script conversion;
- no Python transcription package, CLI, wheel or PyPI release has been created yet.

### Next work

1. Implement the package and tests from the plan in a Python-enabled local workspace.
2. Generate and verify the package CSV copy; build and inspect sdist/wheel; test clean installation and CLI outside the checkout.
3. Add a Python version matrix to Quality CI and preserve all current JavaScript gates.
4. Confirm PyPI name availability and dependency/data licensing before publication.
5. Continue manual accessibility/device checks and source-data rights review.

Do not mark this project release-ready because the documentation has been completed. The Python package remains TODO, PyPI naming is BLOCKED pending registry evidence, and the web project remains public beta / research preview.


## Final verification — 2026-11-08

- Verified documentation snapshot: `2b8ee41a986b393b7e56b8925fb3c77cc9183049`.
- Quality run [42462895243](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/42462895243) passed on that exact SHA, including the full Playwright browser suite.
- GitHub Pages deployment [42462895229](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/42462895229) passed on the same SHA.
- Internal Markdown links: 48/48 resolved across README and docs index.
- Local clone and local commands remain unavailable because this runtime cannot resolve `github.com`; do not claim local pytest/npm runs.
- The Python engine is designed and documented but not implemented. The next task is the test-first package implementation in `python/`, followed by a clean wheel install and Python CI. No PyPI publication was attempted.

The current implementation snapshot remains public beta / research preview. Successful CI verifies the existing browser product and repository gates; it does not close linguistic source rights, manual assistive-technology QA, or Python package release readiness.


## Python engine implementation continuation — 2026-11-08

- Working branch: `feat/python-engine-2026-11-08`.
- PR #51: https://github.com/ClippyFirst/chinese-for-ukrainians/pull/51.
- Initial PR head: `f21b01a98af9a3fd0ba0a2522193b5b7e39a8156`; base main: `b5f21c206516c162cbd9413039b7c0b448f8b2d1`.
- Implemented alpha package `zhua`, CLI `chuktrans`, pypinyin 0.55.0 G2P adapter, broad IPA port, three IPA-keyed Ukrainian maps, canonical CSV package data, shared JS/Python golden fixture and wheel/clean-install CI.
- The canonical CSV is copied into the wheel by the generator; do not edit the packaged copy.
- `script="auto"` intentionally reports undetermined in this first alpha; pypinyin accepts both scripts but no full script classifier/normalizer has been ported.
- No local clone/tests/build could run because github.com DNS is unavailable. Quality workflow run #42463805036 was pending/in progress at handoff update; inspect its final exact-head result.
- Do not publish: source-data rights and distribution-name availability remain unverified. pypinyin/pinyin-pro differences beyond the six golden cases remain outside parity claims.


### CI defect and repair note — 2026-11-08

The first Quality run #42463805036 built the wheel and confirmed the CSV is included, but failed on import because the initial Python IPA port incorrectly emitted an initial-only x for unsupported hm/hng, causing IPA map collisions. The implementation was corrected to match the JavaScript rule: if the final has no supported IPA mapping, the complete syllable remains unsupported. The regression suite explicitly checks both forms. A later workflow also inspects the wheel and builds the sdist. The latest PR-head run, not the first failed run, is the acceptance evidence.


## Final Python package handoff — 2026-11-08

- PR #51 merged to main by squash.
- Merge commit: `539720a5b9cebcd5f83a011cf107b65f89ae45d2`.
- Verified source head: `2e94cad9279344726d0bf74b35636e303d81d100`.
- Successful CI run: https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/42464642753.
- All 5 jobs passed: full Quality verify plus Python 3.10, 3.11, 3.12 and 3.13. Each Python matrix job reports 10 passed tests.
- Wheel and sdist built. The wheel was installed into a fresh virtual environment and imported from `/tmp`; CLI JSON smoke test passed. Canonical CSV and license notice are included in the archive.
- Shared golden fixture compares Pinyin, broad IPA and the three Ukrainian systems between JavaScript and Python for six curated cases; both suites passed.
- Existing Node/browser, production build, benchmark and release gates passed, including Chromium/WebKit browser regression.
- Downloadable wheel and sdist were exported to the conversation artifacts. SHA-256 values are in the master register.
- Do not publish: CSV source-specific rights and PyPI name availability remain unresolved. `script="auto"` remains undetermined; universal engine parity is not claimed.
- Manual accessibility QA remains a separate TODO.


## Follow-up — script detection and accessibility — 2026-11-08

Branch `feat/script-detection-and-accessibility-2026-11-08` adds shared Simplified/Traditional detection to Python using the pinned `@pinyin-pro/data@1.3.1` map, with `mixed` and `undetermined` states and no source rewriting. The generated JSON is included in the wheel with the upstream ISC notice. The shared JS/Python Pinyin+IPA+three-UA fixture is expanded to 12 cases, including six lexical examples sourced to Han Dian. A new browser accessibility spec checks control names, landmarks, ARIA references, live regions, keyboard actions and 200% text resizing.

CSV ownership was confirmed by the repository owner: their original CSV is included with their authorization; root MIT applies to code and does not force the CSV under MIT. The earlier CSV-rights blocker is therefore closed. The PyPI distribution-name check remains unresolved because the live registry fetch service had no remaining credits; do not infer availability from search results. Manual screen-reader/device checks remain unperformed and must not be marked DONE.


## Final handoff — PR #52 merged and verified (2026-11-08)

PR [#52](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/52) is merged to `main` as `941d4f2c485e8503df7fcd7b1472bab846f90cd8`. Exact tested head: `5fadfcbf8c07b52375e2575b24b16fd8365f8c11`. Quality run [42466148142](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/42466148142) passed all five jobs after the Python 3.10 setup job was retried.

- Python: 14 tests pass on 3.10, 3.11, 3.12, 3.13.
- Browser: 61 Playwright tests pass, including new accessibility regression tests.
- Wheel/sdist build, archive inspection, isolated wheel install, import outside checkout and CLI JSON smoke test pass.
- Shared JS/Python golden set has 12 cases, including six Han Dian lexical references. A source-backed pypinyin phrase override handles `銀行`; universal engine parity is not claimed.
- Python `script="auto"` now reports simplified/traditional/mixed/undetermined from the shared character map without rewriting input.
- The CSV is owner-authored and its owner authorizes inclusion. Root MIT remains code scope; the CSV remains owner-controlled. The bundled @pinyin-pro/data character map carries a full ISC notice.
- CI PyPI probe: `chinese-ukrainian-transcription` and `chuktrans` both returned HTTP 404 / no public project JSON. This does not prove either name is claimable; keep final name selection blocked until maintainer decision and final registry check.
- Automated accessibility checks pass; actual screen-reader and physical-device QA remain unperformed.
- Final wheel SHA-256: `5f881ed7c3d2b6175a43cd93f2ad004924938ecb2ba0cae1d4d1f8e93b112dde`.
- Final sdist SHA-256: `9817bb130cf81b649a8111d711c24abf66d92c36b3793b51a7e689efc305cb78`.

The package remains unpublished. The remaining release gates are the owner's final PyPI name choice/name-claimability check and manual assistive-technology/device QA; broader independent linguistic gold-corpus work remains research scope.


## One-pass follow-up — 2026-11-08

PR #55 is merged as `49a5083076edafd71877824b3694bf0fba34f9e2`. The independent Pinyin lexical smoke fixture has 10 Han Dian source-linked entries. Exact Quality run [42488650345](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/42488650345) passed on tested head `8ddd4e7cf43409e550552281ed7a6922d75b0eaf`.

A separate benchmark source audit is in `MANDARIN-BENCHMARK-SOURCE-AUDIT-2026-11-08.md`. It identifies CPP, CVTE-Poly and AISHELL-3 as candidates with different evidence and licensing status. No third-party data was copied because exact dataset license/archive conditions were not fully verified. Do not claim G2P accuracy or engine superiority from the 10-case smoke fixture.

Next genuine work: verify AISHELL-3 archive metadata/schema; obtain a license-cleared locked corpus; pin and run competing G2P engines on the same corpus; independently adjudicate IPA and each Ukrainian method; complete manual NVDA/VoiceOver/TalkBack and physical-device QA. Audio is not a mandatory blocker where documentary phonetic evidence suffices.


## AISHELL-3 source verification continuation — 2026-11-08

PR #56 merged as `9c7e665b48f317a03ffcebaaf25f4d7794536652` after exact-head Quality run `42489252423` passed. AISHELL-3 metadata is cross-checked against OpenSLR page, archive-side `info.txt` and checksum file, and publisher page; all state Apache License 2.0. Archive checksum listed by OpenSLR: `6833e9dcb47709d4e153e2f669e5ddc8` (MD5). Public samples confirm Chinese text paired with numbered-tone Pinyin.

The large archive was not downloaded or unpacked. Exact internal license/NOTICE, transcript paths, data splits, and normalization rules remain open; no corpus data/audio copied. Next action is text-only archive listing and transcript inspection, then a source-attributed locked benchmark split.


The current research branch adds two public AISHELL-3 baseline page Chinese/Pinyin pairs to the existing smoke fixture, taking it from 10 to 12. The regression test checks the fixture count and source URL scope. This does not create a held-out corpus or independent accuracy result; await exact PR-head Quality CI.

The public sample containing `不会` was intentionally not added to exact lexical-Pinyin assertions because the displayed `bu2` is a surface sandhi form. This preserves the distinction between lexical tone and connected-speech sandhi.
