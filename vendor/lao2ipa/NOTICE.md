# lao2ipa browser rule-port notice

- Upstream: https://github.com/byu-matrix-lab/lao2ipa
- Upstream license: Apache-2.0; full license is preserved in this directory.
- Local adaptation: `src/app/lao-ipa.js`.
- Adapted scope: selected consonant/vowel mappings, common syllable segmentation and tone-class rules for an experimental browser implementation.
- Not ported: the full upstream phonological analysis, all cluster rewrites, special syllable cases, and the complete regression corpus. The implementation is explicitly partial and must not be represented as equivalent to upstream lao2ipa.
- IPA and MoH-style romanization output are provisional until tested against upstream fixtures and independently reviewed by a Lao language specialist.
