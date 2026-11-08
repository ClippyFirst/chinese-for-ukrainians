import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { configureConverter, convert } from '../src/app/convert.js';
import { pinyinProEngine, traditionalToSimplified } from '../src/app/pinyin-pro-adapter.js';
import { ipaTranscriptionMap } from '../src/data/ipa-transcription.js';
import { detectScript } from '../src/app/detector.js';

configureConverter({ pronunciationEngine: pinyinProEngine, mappings: ipaTranscriptionMap, traditionalToSimplified });
const cases = JSON.parse(await readFile(new URL('../python/tests/fixtures/cross_runtime_golden.json', import.meta.url), 'utf8'));

test('JavaScript and Python agree on shared Pinyin, IPA and Ukrainian golden outputs', () => {
  for (const item of cases) {
    const js = convert(item.text);
    assert.equal(js.pinyin, item.pinyin, `JS Pinyin: ${item.text}`);
    assert.equal(js.ipa, item.ipa, `JS IPA: ${item.text}`);

    const result = spawnSync('python', ['-m', 'zhua', '--json', item.text], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    const py = JSON.parse(result.stdout);
    assert.equal(py.pinyin, item.pypinyin ?? item.pinyin, `Python Pinyin: ${item.text}`);
    assert.equal(py.ipa, item.pypinyin_ipa ?? item.ipa, `Python IPA: ${item.text}`);
    if (item.classification === 'exact-parity') {
      assert.equal(py.pinyin, js.pinyin, `shared Pinyin: ${item.text}`);
      assert.equal(py.ipa, js.ipa, `shared IPA: ${item.text}`);
      assert.equal(py.kirnosova, js.kirnosova, `Kirnosova: ${item.text}`);
      assert.equal(py.kirnosova_tsisar, js.kirnosovaTsisar, `Kirnosova-Tsisar: ${item.text}`);
      assert.equal(py.nanu, js.nanu, `NANU: ${item.text}`);
    } else {
      assert.equal(item.classification, 'known-engine-difference', `unexpected parity class: ${item.text}`);
    }
  }
});


test('JavaScript and Python agree on script classification without normalizing input', async () => {
  const scriptCases=JSON.parse(await readFile(new URL('./fixtures/script_detection.json',import.meta.url),'utf8'));
  for (const item of scriptCases) {
    assert.equal(detectScript(item.text,traditionalToSimplified).status,item.status,'JS script: '+item.text);
    const result=spawnSync('python',['-m','zhua','--json',item.text],{encoding:'utf8'});
    assert.equal(result.status,0,result.stderr);
    const py=JSON.parse(result.stdout);
    assert.equal(py.detected_script,item.status,'Python script: '+item.text);
    assert.equal(py.source,item.text);
  }
});
