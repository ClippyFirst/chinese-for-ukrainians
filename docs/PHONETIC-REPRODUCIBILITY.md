# Phonetic reproducibility and evidence policy

## Scope

The site presents original Han text, selected Hanyu Pinyin, broad practical IPA derived from that Pinyin, and three independent Ukrainian systems. Each Ukrainian system now consumes a segmental IPA key through its own adapter. The adapters retain source-row and Pinyin provenance from the canonical CSV. These layers must not be conflated.

The IPA column is broad practical IPA, not narrow phonetic measurement or a guarantee of a speaker-specific surface realization. It displays lexical/citation-form tone contours and does not apply connected-speech tone sandhi. For example, third-tone sandhi is not inferred from surrounding words. A future surface-tone mode must be a separate, independently tested layer.

## Runtime pronunciation engine

The project uses the pinned pinyin-pro dependency and its Traditional dictionary. Polyphonic alternatives are retained as alternatives, not treated as independent proof that the engine's selected reading is contextually correct. Integration tests exercise the actual dependency rather than only an injected mock.

Dictionary coverage is finite. Add regression examples when a context-sensitive reading defect is reported. Passing an integration fixture establishes only that the pinned engine currently produces the expected reading for that fixture; it does not establish complete coverage of names, rare words, dialect forms, or historical readings.

Upstream references:
- Polyphonic readings: https://pinyin-pro.cn/en/use/polyphonic.html
- Custom dictionaries: https://pinyin-pro.cn/en/use/addDict.html
- Package/version history: https://www.npmjs.com/package/pinyin-pro

## IPA policy

The Pinyin-to-IPA function is a finite practical mapping, not a general-purpose phonology engine. Syllabic apical vowels in zhi/chi/shi/ri and zi/ci/si must not be dropped. The implementation uses ɻ̩ for the retroflex series and ɹ̩ for the alveolar series as a broad approximation. This notation should be reviewed against a selected authoritative Mandarin phonetics reference before being described as narrow or uniquely canonical IPA.

Unsupported edge forms are marked ⟦IPA:…⟧ rather than silently copying a Han character into the IPA output. Syllabic m, n, and ng have explicit mappings. Other exceptional forms, including ê, hm, hng, and yo, remain visibly unresolved pending a source-backed decision.

Tone marks in this column represent lexical/citation-form tone contours only. No tone sandhi is applied.

## Ukrainian transcription data provenance

zh-in-ua.csv is the canonical table. Its three Ukrainian output columns are independent systems and must never silently borrow values from one another. Blank cells remain explicit missing values.

Primary and bibliographic sources used to document the three systems:
- Nadiia Kirnosova, “Засади транскрибування китайської лексики українською мовою”, Сходознавство, 2009, no. 45–46, pp. 38–57. Catalogue record: https://irbis-nbuv.gov.ua/cgi-bin/irbis64r_81/cgiirbis_64.exe?C21COM=S&FT_PREFIX=&FT_REQUEST=&I21DBN=REF&P21DBN=REF&S21ALL=%28%3C.%3EU%3D%D0%A8171.13%24%3C.%3E%29&S21CNR=20&S21FMT=fullwebr&S21REF=10&S21STN=1&Z21ID=
- N. A. Kirnosova and N. Z. Tsisar, “Вихідні положення транскрипції з китайської мови на українську,” in *Питання сходознавства в Україні* (2019), pp. 65–66: https://foreign-languages.karazin.ua/resources/38a431e26e297a45b2a1b5d0c7d34ac9.pdf (full proceedings PDF; the article is listed on p. 3 of the PDF contents and begins on printed p. 65). A title-specific discovery link is also available at https://scholar.google.com/scholar?q=%22Вихідні+положення+транскрипції+з+китайської+мови+на+українську%22.
- Academic system (NAN Ukraine, approved 26 June 2019): https://pinyin.in.ua/

The canonical mapping table was checked against scholarly sources during the project's research and compilation process. The lack of a citation embedded in every CSV row is a documentation limitation, not evidence that the table was never checked. The table is therefore treated as a source-informed research dataset; it should not be described as a fully self-auditing, row-cited critical edition. The public-facing comparison and its sample rows are derived from the current CSV. For future reproducibility, a separate provenance ledger can preserve stable row/key ID, system, source URL, page/table/rule, exact source evidence, reviewer, review date, and status. Do not fill blanks or alter disagreements without direct evidence.

The explanatory comparison page is included in the repository at [methodology.html](../methodology.html) and is built as a second static entry point for GitHub Pages. It distinguishes bibliographic facts from output-level observations and avoids claiming that one system is universally superior. The current direct proceedings PDF at the Karazin University domain has been located and is linked from the page; do not substitute the older foreign-languages.karazin.ua URL variant from previous notes if it is unavailable.

## Reproduction protocol

Use the Node version declared in package.json:

~~~bash
npm ci
npm run validate:data
npm test
npm run test:browser
npm run check:release
npm run build
~~~

Integration tests run against the pinned pinyin-pro dependency. Browser tests verify user-facing behavior. A successful build or test suite is evidence that the checked invariants pass; it is not a substitute for linguistic review of the source table.
