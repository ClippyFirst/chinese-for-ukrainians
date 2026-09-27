import test from 'node:test';
import assert from 'node:assert/strict';
import { configureConverter, convert } from '../src/app/convert.js';

const mappings = {
  kirnosova: {
    zhong: { value: 'чжун', missing: false }, guo: { value: 'ґо', missing: false },
    bei: { value: 'бей', missing: false }, pou: { value: 'поу', missing: false },
  },
  kirnosova_tsisar: {
    zhong: { value: 'чжун', missing: false }, guo: { value: 'ґво', missing: false },
    bei: { value: 'бей', missing: false }, pou: { value: 'пов', missing: false },
  },
  nanu: {
    zhong: { value: 'чжун', missing: false }, guo: { value: 'ґо', missing: false },
    bei: { value: 'бей', missing: false }, pou: { value: '', missing: true },
  },
};
const engine = (text) => [...text].map((origin) => ({
  origin,
  pinyin: ({ 中: 'zhōng', 国: 'guó', 北: 'běi' }[origin] ?? 'mā'),
  isZh: true,
  polyphonic: ['mā'],
}));
configureConverter({ pronunciationEngine: engine, mappings, traditionalToSimplified: { 國: '国' } });

test('converts Chinese plus punctuation and Latin text without changing source', () => {
  const source = '中国! AI';
  const result = convert(source, { scriptMode: 'auto' });
  assert.equal(result.source, source);
  assert.equal(result.detectedScript.status, 'simplified');
  assert.equal(result.pinyin, 'zhōng guó! AI');
  assert.equal(result.kirnosova, 'чжунґо! AI');
});

test('keeps Auto shared-only detection undetermined', () => {
  const result = convert('中文', { scriptMode: 'auto' });
  assert.equal(result.detectedScript.status, 'undetermined');
});

test('manual script selection does not mutate input', () => {
  const source = '中國';
  const result = convert(source, { scriptMode: 'traditional' });
  assert.equal(result.source, source);
  assert.equal(result.detectedScript.status, 'traditional');
});

test('conversion is deterministic across repeated runs', () => {
  const source = '北京';
  assert.deepEqual(convert(source, { scriptMode: 'auto' }), convert(source, { scriptMode: 'auto' }));
});
