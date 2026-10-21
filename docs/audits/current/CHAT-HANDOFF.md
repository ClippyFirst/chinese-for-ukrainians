# Chat handoff — Chinese-to-Ukrainian transcription
**Updated:** 2026-10-20 (release-readiness and IPA traceability audit)  
**Repository:** https://github.com/ClippyFirst/chinese-for-ukrainians  
**Plan:** [MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md](./MASTER-EXECUTION-PLAN-AND-CHAT-HANDOFF.md)

## Snapshot
- Latest main SHA at this handoff: `2b16122f31e2ecb183192f26366665554be05132` (docs-only). On that SHA, tests, acoustic input guards, production build and release checks passed, but Playwright browser installation was still running at the last check: [Quality run 39484386939](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39484386939). Do not mark latest-head quality as fully green until browser regression tests complete. The prior application/code SHA `0c173deeace88428fd2919fe47ce8e438adca3b6` passed all quality gates in [run 39482425883](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39482425883).
- Working branch in the remote snapshot: `main`. The branch listing includes a research branch `research/full-ipa-scientific-verification-2026-10-18` and several audit/fix branches; do not assume any are merged without comparing SHAs.
- Package: `chinese-for-ukrainians@0.1.0`; Node requirement >=22.12.0.
- GitHub Actions **Quality checks** passed on the exact latest SHA: [run 39482425883](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39482425883). Its `verify` job passed unit/integration tests, acoustic-pipeline input guards, build (including data validation and generation), release checks and browser regression tests.
- GitHub Pages deployment passed on latest docs SHA `2b16122f31e2ecb183192f26366665554be05132`: [run 39484386852](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39484386852). This is build/deploy evidence, not visual/mobile QA.
- Local `git clone` could not resolve `github.com`; no independent local transcript exists. Optional `npm run benchmark` remains unexecuted and is not a CI step.
- The combined-status endpoint was empty, but the direct Actions run results above are explicit successful evidence.
- `CITATION.cff` was not found at root. `LICENSE` exists (MIT; copyright line “The Clippy First”).
- Expected `docs/audits/current/` paths for earlier plan/readiness/IPA closeout did not exist. Actual relevant documents are in `docs/`. This plan and handoff now provide a canonical continuation point.

## Read during this pass
- `README.md`, `package.json`, `LICENSE`, `index.html`
- `docs/PUBLICATION-READINESS-2026-10-18.md`
- `docs/IPA-LITERATURE-BASED-ADJUDICATION-CLOSEOUT-2026-10-19.md`
- `docs/IPA-SCIENTIFIC-VERIFICATION-CLOSEOUT-2026-10-19.md`
- `docs/IPA-CONVENTION-DECISION-2026-10-18.md`
- `docs/RELEASE-CHECKLIST.md`, `docs/QA-PLAN.md`, `docs/ARCHITECTURE.md`
- `docs/PHONETIC-REPRODUCIBILITY.md`, `docs/USER-GUIDE.md`
- `docs/IPA-FINAL-CLASS-ADJUDICATION-2026-10-18.md`
- `docs/PHONETIC-SOURCE-LEDGER-2026-10-18.csv)
- `scripts/release-check.mjs`, `scripts/test.mjs`, `scripts/benchmark.mjs`, `scripts/validate-data.mjs`, `scripts/generate-mappings.mjs`, `.github/workflows/quality.yml`

## Confirmed package commands
`validate:data`, `generate:data`, `test`, `test:browser`, `benchmark`, `check:release`, `audit:ipa:uw`, `audit:ipa:uw:check`, `build`.

## Decisions to preserve
- Public beta/research-preview is appropriate on the stated evidence; do not call it stable or academically certified until release gates pass.
- Literature-based broad IPA convention is the chosen release criterion. No universal narrow-phonetic claim.
- Keep neutral tone unassigned a universal contour; tone sandhi and connected-speech changes are outside the current renderer.
- Never cross-fill blank Ukrainian mapping cells from another system.
- Do not invent citation authors/ORCIDs, license coverage, release tags, or DOI.

## Exact next steps
1. Re-check [Quality run 39484386939](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39484386939) for completion of Playwright browser installation and browser regression tests, then record the final conclusion for SHA `2b16122f31e2ecb1831929fe47ce8e438adca3b6`.
2. Complete live Pages smoke test and visual/mobile review (320/360/390/430px); deployment success is not visual QA.
3. Confirm credited author(s), title, version, repository URL, license scope and ORCID only if supplied/verified before creating `CITATION.cff`.
4. Complete source/data license provenance and CSV blank-cell/edge-key audits. Preserve the independence of all three Ukrainian systems.
5. Keep release status at public beta/research preview; no stable-release, universal narrow-IPA, archive or DOI claims without direct evidence.


## Release-readiness follow-up (2026-10-20)

- Read [release-readiness and IPA traceability audit](../../RELEASE-READINESS-AND-IPA-TRACEABILITY-2026-10-20.md) first.
- Baseline main SHA was `69cb29ffcdf53fc67f3d08609613b08d92d3e6a4`; its Quality run [39484629325](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39484629325) and Pages deploy [39484629491](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39484629491) passed. New independent Pinyin tests and CI steps were added after that SHA; check latest main workflow runs before claiming they pass.
- PR #5 remains open and dirty/conflicting; do not merge it without reconciliation. Its markup omits the current `#result-ipa` element while main UI code expects it.
- Ukrainian outputs derive directly from three separate Pinyin-keyed CSV columns, not from IPA.
- `package-lock.json` was observed to contain an empty `packages` object. Repair lockfile in an npm-enabled environment before adopting `npm ci`.
- Dependency metadata checked: `pinyin-pro@3.29.4` is published as MIT, while `@pinyin-pro/data@1.3.1` is published as ISC; included dictionary data/source rights still need review. Rights clearance for third-party data and citation author metadata remain open. No GitHub Release or DOI is authorized.
- Newly added files: `tests/fixtures/independent-pinyin-cases.csv`, `tests/independent-pinyin-corpus.test.mjs`, and `docs/RELEASE-READINESS-AND-IPA-TRACEABILITY-2026-10-20.md`.


## Execution update — 2026-10-21

- Reconciled the prior handoff with the current observed main head: `da995aa58936f5f9f72796fa32a0feaeb38b3847`.
- Exact-head Quality checks [39495006696](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39495006696) passed all workflow steps, including unit/integration tests, acoustic input guards, build/data generation, generated-map drift, benchmark, release checks, browser installation and browser tests.
- Attempted local clone; blocked before checkout by DNS/network error `Could not resolve host: github.com`. Therefore no local `npm ci`, test, build, or browser commands are claimed from this session.
- Lockfile remains empty/incomplete (`packages: {}`). This is the highest-priority reproducibility blocker; repair only with npm/registry access and validate from a clean checkout. Do not use `npm ci` before the lock graph is real.
- PR #5 remains open/unmerged. Do not merge blindly; current main's IPA output element `#result-ipa` is required. Any selective reuse requires a rebase/port plus complete browser regression tests.
- Source/data rights remain not cleared by the root MIT license. Existing provenance note correctly scopes the uncertainty; file-level terms and data redistribution permissions need evidence.
- No `CITATION.cff` added because authorship/version metadata must be confirmed, not invented.
- Live deployed visual QA at 320/360/390/430px remains unverified. CI deployment/browser checks do not establish that a real deployed page and methodology page were visually inspected.
- Preserve public beta/research preview. No release/tag/DOI or narrow-phonetic certification claims.

## Next actions, in order
1. In an npm-enabled environment with registry/network access, regenerate `package-lock.json`, run `npm ci`, then run `npm run validate:data`, `npm test`, `npm run build`, generated-file drift check, `npm run benchmark`, `npm run check:release`, and `npm run test:browser`; record exact output and commit SHA.
2. Run production smoke/visual checks on homepage and methodology page at 320/360/390/430px; test keyboard/focus and core actions.
3. Continue source-by-source rights review and obtain verified authorship/title/version metadata before adding citation metadata.
4. Preserve independent Ukrainian columns and blank cells unless source-specific evidence authorizes a correction.


### Deployment SHA reconciliation — 2026-10-21 follow-up
- Pages deployment run [39495006330](https://github.com/ClippyFirst/chinese-for-ukrainians/actions/runs/39495006330) passed on the exact same main SHA as Quality checks: `da995aa58936f5f9f72796fa32a0feaeb38b3847`.
- The live homepage and methodology page could not be inspected through the available web surface; fresh local clone is blocked by DNS. This does not establish a production UI failure, but manual deployed visual/mobile QA remains blocked/unverified.
- Continuation branch: `audit/complete-release-gates-2026-10-21`. This branch contains audit/handoff updates only, not application or data changes.


### UI/PR reconciliation — 2026-10-21 continued pass
- Re-read the exact current `src/styles/main.css` and `tests/browser/converter.spec.js` on `main`. The stylesheet already contains `[hidden] { display: none !important; }`; the browser suite explicitly checks that `#results` and `#issue-state` stay hidden in the empty state, that `#empty-state` hides after conversion, and that clearing returns to the empty state. Therefore the previously reported CSS/`hidden` conflict is **already repaired on current main**; do not duplicate that fix. This source inspection is not a new local test run.
- Re-inspected PR #5 diff at head `b8c65587822e7b466d05964eef5b412a115eba83`. The proposed `index.html` diff does not include `#result-ipa` and does not preserve the current methodology navigation link. Both are release-critical regressions: current browser tests assert all five output IDs including `result-ipa` and assert the methodology link on the main page. GitHub currently reports PR #5 as `mergeable=false`. Leave it open and unmerged; reuse requires rebasing onto current main, restoring the missing IPA output and methodology navigation, and passing all browser tests.
- The exact-head main branch is still `da995aa58936f5f9f72796fa32a0feaeb38b3847`; PR #25 is documentation-only and does not repair the empty lockfile or provide live visual QA. Do not represent this follow-up inspection as CI or browser execution.
