# Актуальна передача контексту — Chinese for Ukrainians

**Оновлено:** 2026-10-23, repository hygiene / documentation consolidation.  
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


## Continuation — 2026-10-28: Khmer, Lao, Burmese and Sinhala romanization research

- Branch: `feat/khmer-lao-burmese-sinhala-romanizers-2026-10-28`.
- PR [#48](https://github.com/ClippyFirst/chinese-for-ukrainians/pull/48) is open; it is not merged and does not deploy to production. Current branch HEAD at this handoff update: `efe569af3908e18285754f37d3b026522b69b95f`.
- Added `regional-languages.html`, a dedicated route, navigation from both existing pages, a multi-page Vite build entry, experimental local grapheme-level Latin/IPA candidate adapters, Playwright regression tests, README disclosure, and `docs/REGIONAL-ROMANIZATION-RESEARCH-2026-10-28.md`.
- Upstream candidates researched: Khmer `seanghay/khmerphonemizer` (MIT, Python G2P); Lao `byu-matrix-lab/lao2ipa` (Apache-2.0, IPA and MoH 2020 romanization); Burmese `myanmaropenwordnet/mya2rom` (JavaScript, README indicates CC-BY-SA-4.0) and `trhura/python-myanmar` (MIT); Sinhala `skyprolk/SinEn-Natural-Language-Tool_Kit` (Apache-2.0, adapted converter with provenance requiring review). No upstream engine code was copied in this change.
- Status: **PARTIAL / research preview**, not DONE_VERIFIED. The current adapters are grapheme-level demonstrations, not complete phonological engines; they do not reliably model syllabification, contextual vowels, tone, or lexical exceptions. The UI discloses this. They must not be described as normative romanizations or independently validated IPA.
- CI: Quality run [40735775526](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40735775526) was observed in progress on the earlier PR head `af9354088fd481b0fc4f3d262bf5630c4e5c577d`; it does not verify the latest head. Exact latest-head Quality run and its results remain pending inspection. No local npm/build/browser tests are claimed because this session has GitHub connector access but no checked-out local runtime.
- Next acceptance gates: obtain a Quality run on the latest exact PR HEAD; inspect/fix any build and browser failures; port or package one verified upstream engine per language for browser use while preserving licenses; validate source-backed expected outputs independently; test IPA and romanization against the same phonetic representation where appropriate; then update this status based on evidence.


### Follow-up — Mya2Rom integration, 2026-10-28

- Current branch head for this handoff snapshot: `71d35cbf8c498bbbaf0c1d6698d6fcbe8d235525`; PR #48 remains open and unmerged.
- Follow-up to the initial scaffold: vendored upstream Mya2Rom 0.4.4 JavaScript under `vendor/mya2rom/`, with its CC-BY-SA-4.0 license, upstream attribution and change notice. The regional page uses the upstream engine's `mlcts2` and `ipa` modes for Burmese; a regression fixture expects the upstream README's `မြို့` outputs.
- The earlier note that no upstream code had been copied described the initial scaffold only and is superseded by this integration update.
- Exact-head Quality run [40736212901](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40736212901) was still in progress at the time of this update; browser regression status and the final conclusion are not yet verified.
- Status remains **PARTIAL / research preview**: Khmer, Lao and Sinhala are still provisional grapheme-level adapters. Their upstream candidates are Python-based or require source/data provenance review. Do not merge or publish this as complete four-language phonological support until those engines are ported/integrated with license compliance and source-backed tests.


### Verification update — regional romanization PR #48, 2026-10-28

- Latest implementation head checked: `ed84dd5c5a2ac8c4d2722cfa28a4510f831d8c12`. PR #48 remains open and unmerged; production main is unchanged.
- Quality run [40736898938](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40736898938) passed unit/integration tests, production build, generated-mapping determinism, benchmark and release checks, then remained in progress at browser installation. Its browser suite has not yet produced a final result.
- Earlier browser run [40736403283](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40736403283) failed on 13 cases: the newly added nav link caused 320px overflow and changed keyboard tab order, and the Mya2Rom adapter's Unicode-range regex failed to match Burmese characters. Follow-up commits added responsive nav wrapping, updated keyboard coverage, corrected the regex, and included the upstream expected-output regression. These fixes still require a passing exact-head browser run.
- Mya2Rom 0.4.4 is integrated for Burmese MLCTS2 and IPA, with its CC-BY-SA-4.0 license and attribution/change notice kept under `vendor/mya2rom/` and copied into the static `public/` output.
- Status remains **PARTIAL / research preview**. Khmer and Lao upstream candidates are Python-only in the researched repositories; Sinhala candidate source/data requires provenance review. The current grapheme adapters for those three languages are not full phonological engines. Do not merge or deploy this PR as complete four-language support.
- Next acceptance gate: inspect the exact-head Quality run after browser tests finish; fix and rerun any remaining failures. Then port/package reviewed Khmer, Lao and Sinhala engines with source-backed fixtures before considering full completion.


## Handoff update — regional romanization, 2026-10-28

- Quality run [40737082982](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40737082982) passed on `c7028d4a291edd61800e1534b7cbbf746cb2960f`, including browser regression tests. Later changes need a new exact-head run.
- Follow-up correction prevents unreviewed Khmer/Lao/Sinhala character mappings from being displayed as IPA. The UI reports that IPA is not generated for those languages until reviewed phonological engines are integrated. This intentionally avoids unsupported phonetic claims.
- Research remains partial: Khmer MIT Python G2P and Lao Apache-2.0 syllable-based IPA/romanization are candidates requiring browser ports; Sinhala converter and data provenance need audit; Burmese Mya2Rom is locally integrated but not independently validated. See `docs/REGIONAL-ROMANIZATION-RESEARCH-2026-10-28.md`.
- Do not merge or call this complete four-language phonological support yet. Acceptance: latest-head Quality CI green; source-backed fixtures and license review; full Khmer/Lao/Sinhala engines; independent linguistic review of the Burmese outputs and all expected results.


### Final verification boundary — 2026-10-28

- Code fixes are at `fcae7190c7cb506799989de169f4699d74b3119e`; the master register was then updated in `dd148a54b6e1230f89a277f87b85deb20d7c3e23`.
- CI run [40737082982](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40737082982) passed on earlier SHA `c7028d4a291edd61800e1534b7cbbf746cb2960f`, not on the current code fixes. Latest-head CI remains NOT VERIFIED because the available GitHub actions do not expose workflow dispatch and no run is listed for the new commit.
- Keep PR #48 open. The prototype is not release-ready as a complete four-language phonological romanizer. Next: run Quality CI on latest PR head; port reviewed Khmer/Lao engines; audit Sinhala provenance; independently verify Burmese and all fixtures.


### Candidate research extension — 2026-10-28

- New research surfaced `@gmana/km-translit` (MIT, JavaScript/TypeScript, syllable-aware Khmer BGN/PCGN-derived profile with acknowledged limitations), `SuhasDissa/Singlish` (JavaScript, GPL-3.0; not vendored pending license review), Apache-2.0 LaoNLP (Python IPA/MoH 2020), and Laonetics (JS, CC-BY-NC-4.0; not integrated). These options and caveats are now on the regional page and in the research register.
- Latest UI/research commit: `cf5d4f56599040bd6db91d2b83af9a520b535235` (followed by documentation commits). No exact-head Quality run is available for this head. Do not call the current state verified or merge without fresh CI.


### Sinhala engine integration continuation — 2026-10-28

- Added browser-local `sinhala-soft/sinhala-text-converters` 1.0.5 for Sinhala Unicode → Singlish. MIT license and upstream UCSC/Sinhala Soft attribution are preserved under `vendor/sinhala-text-converters/` and `public/vendor/sinhala-text-converters/`.
- Added Playwright expected-output assertion for `ආයුබෝවන්` → `aayubowan`; it has not yet run on the latest head. Sinhala remains PARTIAL until CI and independent linguistic checks pass.
- Burmese Mya2Rom + Sinhala Text Converters are integrated locally; Khmer and Lao still need reviewed browser-compatible engines. IPA remains withheld for Khmer/Lao/Sinhala. Current exact-head Quality CI remains NOT VERIFIED because workflow dispatch is not exposed through the available connector.


### Output-order update — 2026-10-28

The required order is romanization → IPA → Ukrainian transcription. The regional page now displays three cards in that order. The Ukrainian candidate consumes IPA only; unknown symbols and diacritics remain visible as bracketed markers. This adapter is provisional and needs linguistic review. Burmese has Mya2Rom romanization and IPA modes; Sinhala currently has romanization only; Khmer and Lao still lack integrated upstream engines. Added browser checks cover output order, absence of Ukrainian output when IPA is unavailable, and the IPA-derived Burmese candidate. Keep PR #48 open pending full engine integration and exact-head CI.


### CI status reconciliation — 2026-10-28

Quality run `40743007634` passed on commit `6ec1927616595592041451609240c183837d18f8` with 71 browser tests passed and 1 skipped. It validates the regional three-card order and IPA-derived candidate tests. The latest branch head is `b9734aeff3692bfbb22c82e31bf407cabda6a751`; the main-converter order assertion and small IPA-affricate map extension came after the successful run, so exact latest-head CI remains unverified. The preceding run `40742716417` failed due a malformed regex in the adapter; that defect was fixed before run 40743007634. Keep PR #48 open.


### Final UI update — 2026-10-28

The regional results heading now explicitly reads **Romanization → IPA → Ukrainian transcription**. Latest UI commit at the time of this update is `3343ac2b52f871be75b4a37c35e620456f8e2cf0`. The successful Quality run `40743007634` predates the latest minor adapter, test, and heading edits; verify exact-head CI before considering the change fully accepted.


### IPA adaptation safeguard — 2026-10-28

Latest code commit `0566407bd90b67f412a5d98a54ad55e284c0dd96` avoids treating breathy/voiceless phonation or a glottal stop as aspiration. The apostrophe is used only for explicit aspirated IPA sequences; other unreviewed features remain bracketed. Quality run `40743692803` is still running at browser installation; earlier unit/integration, build, deterministic mapping, benchmark, and release checks have passed. Await browser-test completion.


### Final verification result — 2026-10-28

Quality run `40743692803` passed on code head `0566407bd90b67f412a5d98a54ad55e284c0dd96`: 73 browser tests passed, 1 skipped; unit/integration, corpus validators, acoustic guards, production build, deterministic generated mappings, benchmark, and release checks also passed. Later branch commits are documentation-only. The ordered output code is CI-verified; full Khmer/Lao/Sinhala/Burmese end-to-end linguistic support remains partial and must not be described as release-ready.


## Regional-language continuation — 2026-10-28

Latest PR #48 follow-up adds pinned `@gmana/km-translit@0.1.2` (MIT) to `package.json` and `package-lock.json`, uses `khmerToLatin` for Khmer output, and adds a browser test for the upstream-documented `ភ្នំពេញ` → `Phnom Penh`. The UI labels this as BGN/PCGN-derived ASCII romanization (not fully conformant), and explicitly withholds IPA and Ukrainian output because this romanizer is not an IPA engine. The exact-head Quality workflow is running on `626ef63aba4029aac9fcc171b56fcfbd9690acd4`: https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40745940883. Do not call this verified until the run completes and browser tests pass.

Current state: Burmese has Mya2Rom MLCTS2/IPA; Sinhala has Sinhala Text Converters romanization only; Khmer now has an upstream syllable-aware romanizer but no IPA; Lao remains provisional Latin candidate only. Still required: a browser-compatible reviewed Khmer IPA engine, Lao MoH/IPA engine port (upstream `lao2ipa` is Python-only), Sinhala IPA engine, source-backed fixtures and independent linguistic validation. PR remains open; production site is not updated.


## Sinhala IPA continuation — 2026-10-28

Added a conservative browser-side IPA rule-port at `src/app/sinhala-ipa.js`, based on the MIT-licensed VoiceLK ML G2P mappings and schwa-rule implementation. The original Python tokenizer and domain lexicon are not included. License and attribution are in `vendor/voicelk-g2p/`. The Sinhala result order is now Singlish romanization → provisional IPA → provisional Ukrainian candidate. Regression fixture: `ආයුබෝවන්` → `aːjuboːʋan` → `айубован`; this proves determinism, not linguistic correctness. Khmer romanization is integrated, but Khmer IPA and all Lao engine support remain TODO. Current exact-head Quality run must pass before claiming this batch verified.


## Lao rule-port continuation — 2026-10-28

Added partial browser port `src/app/lao-ipa.js` based on Apache-2.0 `byu-matrix-lab/lao2ipa`, with license/notice in `vendor/lao2ipa/`. It emits MoH-style Latin and IPA with tones for common patterns; all unsupported complexity remains a limitation. Regression fixtures cover `ກາ` and `ສະບາຍດີ`. The Ukrainian candidate is derived from this IPA, with tone contours retained visibly rather than silently discarded. Exact-head CI passed on `5840f4ccf5da05efd211506b8b9c1031d5226e48` (77 browser tests passed, 1 skipped; https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/40747486736). Independent Lao review and upstream-vector parity are still required; this is not a full port of upstream lao2ipa.
