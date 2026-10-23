import { ipaTranscriptionMap } from './data/ipa-transcription.js';
import { pinyinProEngine, traditionalToSimplified } from './app/pinyin-pro-adapter.js';
import { configureConverter } from './app/convert.js';
import { mountApp } from './app/ui.js';
configureConverter({
  pronunciationEngine: pinyinProEngine,
  mappings: ipaTranscriptionMap,
  traditionalToSimplified,
});

mountApp(document.querySelector('.page-shell'));
