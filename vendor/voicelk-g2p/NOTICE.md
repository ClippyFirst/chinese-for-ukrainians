# VoiceLK G2P rule-port notice

This directory records attribution for the small browser-side Sinhala G2P rule port in `src/app/sinhala-ipa.js`.

- Upstream: https://github.com/RootCode-AI/voicelk_ml
- Source file: `model_engine/g2p.py`
- License: MIT; the upstream license is preserved in this directory.
- Adapted scope: Sinhala consonant/vowel inventories and the inherent-vowel reduction (schwa) rule shape.
- Not ported: Python `sinling` tokenizer, ICT/domain lexicon, mixed-language routing, and the rest of the VoiceLK service.
- Local implementation: `src/app/sinhala-ipa.js`; this is a conservative, unvalidated browser adaptation, not a claim of parity with VoiceLK or normative IPA.
- Linguistic reference cited by upstream: Wasala, A., Weerasinghe, A. R., and Gamage, K. (2006), “Sinhala Grapheme-to-Phoneme Conversion and Rules for Schwa Epenthesis.” The adaptation still needs independent review and source-backed gold fixtures.

The repository's top-level MIT license does not replace the upstream license notice for this adapted component.
