import { transcriptionMap } from './generated/transcription-map.js';
import { pinyinProEngine, traditionalToSimplified } from './app/pinyin-pro-adapter.js';
import { configureConverter } from './app/convert.js';
import { mountApp } from './app/ui.js';
import './styles/main.css';

configureConverter({
  pronunciationEngine: pinyinProEngine,
  mappings: transcriptionMap,
  traditionalToSimplified,
});

mountApp(document.querySelector('.page-shell'));
