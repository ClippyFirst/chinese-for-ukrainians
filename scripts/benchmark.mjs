import { performance } from 'node:perf_hooks';
import { pinyinProEngine, traditionalToSimplified } from '../src/app/pinyin-pro-adapter.js';
import { transcriptionMap } from '../src/generated/transcription-map.js';
import { configureConverter, convert } from '../src/app/convert.js';

configureConverter({ pronunciationEngine: pinyinProEngine, mappings: transcriptionMap, traditionalToSimplified });
const sample = '中华人民共和国成立于北京。';
const sizes = [1, 10, 100, 1000];
const results = [];
for (const size of sizes) {
  const source = sample.repeat(Math.ceil(size / Array.from(sample).length)).slice(0, size);
  const start = performance.now();
  convert(source, { scriptMode: 'auto' });
  results.push({ characters: Array.from(source).length, milliseconds: Number((performance.now() - start).toFixed(3)) });
}
console.table(results);
