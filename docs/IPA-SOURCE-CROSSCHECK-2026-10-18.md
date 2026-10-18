# IPA source cross-check: initial classes — 2026-10-18

## Purpose

This is a source-aware regression expansion for the Mandarin-to-IPA layer. It adds one deterministic example for every Pinyin onset family implemented by the converter. Passing these tests proves implementation consistency for the chosen broad-IPA convention; it does **not** by itself certify phonetic accuracy or dialect-wide realization.

## Sources and evidential weight

1. **University of Washington, Mandarin Chinese Syllables** — https://courses.washington.edu/chin342/ipa/syllables.html  
   A syllable-level broad transcription chart useful for checking onset/final combinations. The accompanying explanation states that the chart uses a simplified, field-specific notation, including non-IPA apical-vowel symbols and glide conventions. It must not be compared character-for-character with ordinary IPA.
2. **Zhang, Yu (2017), *Processing Speaker Variability in Spoken Word Recognition: Evidence from Mandarin Chinese*, Ohio University dissertation, Appendix C** — https://etd.ohiolink.edu/acprod/odb_etd/ws/send_file/send?accession=ohiou1497455092009666&disposition=inline  
   Appendix C lists Pinyin initials and finals with IPA symbols, adapted from Zhao and Li (2009) and *Xinhua Zidian* (CASS, 2011). This is a useful phonological cross-check, but it is a dissertation appendix rather than the original sources, and PDF text extraction can misrepresent IPA glyphs. In particular, the extracted text for the palatal and retroflex affricates is not reliable enough to adjudicate every symbol without inspecting the rendered page.
3. **Open University, Getting started with Chinese 1, pronunciation guide** — https://www.open.edu/openlearn/mod/oucontent/view.php?id=106435&section=1.1  
   Confirms the pronunciation distinction of the Pinyin spellings and explicitly notes the special realization of the letter o in bo, po, mo, fo, and wo; it is a pronunciation guide, not an IPA transcription standard.

## Implemented onset inventory

The current converter uses these onset correspondences in its declared broad-IPA output:

| Pinyin onset | Converter IPA | Audit status |
|---|---|---|
| b, p | p, pʰ | Supported by standard Pinyin phonological descriptions; retain aspiration contrast |
| m, f | m, f | Stable consonant correspondences |
| d, t | t, tʰ | Supported by standard Pinyin phonological descriptions; retain aspiration contrast |
| n, l | n, l | Stable consonant correspondences |
| g, k | k, kʰ | Supported by standard Pinyin phonological descriptions; retain aspiration contrast |
| h | x | Standard broad representation; exact realization varies by context/speaker |
| j, q, x | tɕ, tɕʰ, ɕ | Standard broad representation; palatal place/affrication should be distinguished from retroflex series |
| zh, ch, sh | ʈʂ, ʈʂʰ, ʂ | Standard broad representation for the retroflex series; source glyph extraction needs care |
| z, c, s | ts, tsʰ, s | Standard broad representation for the alveolar series |
| r | ɻ | Broad convention selected by this project; other references use different approximations/phonological symbols |
| y, w | handled as zero-onset spellings with j/w glide outputs | Pinyin orthographic convention, not independent consonant initials in this implementation |

## Regression gate

The file tests/ipa-initials-crosscheck.test.mjs tests one tone-1 example for all 23 listed onset spellings/families, including y/w as zero-onset glide spellings. These are implementation regression expectations aligned with the project's broad-IPA convention. They are not a claim that the cited appendix validates every narrow phonetic detail.

## What remains open

- Verify the rendered page of Appendix C before interpreting ambiguous extracted glyphs for j/q/x and zh/ch/sh.
- Cross-check the full finals inventory, including ong, iong, ui, un, er, and the ü series, against at least two sources that explicitly state their transcription conventions.
- Decide and document whether the output is best described as broad phonemic IPA or a broad phonetic approximation; the current table intentionally mixes conventional phonological representations and explicit glide symbols.
- Do not present the 403-syllable coverage test or this onset regression test as an exhaustive linguistic accuracy certificate.
