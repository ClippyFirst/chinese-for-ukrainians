import fs from 'node:fs/promises';
import { parseCsv, normalizePinyinKey } from '../src/data/transcription.js';
import { pinyinToIPA } from '../src/app/ipa.js';

const csv = await fs.readFile(new URL('../zh-in-ua.csv', import.meta.url), 'utf8');
const rows = parseCsv(csv);
const systems = [{ key: 'kirnosova', col: 2 }, { key: 'kirnosova_tsisar', col: 3 }, { key: 'nanu', col: 4 }];
const records = [];
for (const row of rows.slice(1)) {
  for (const alias of row[1].split('/')) {
    const pinyin = normalizePinyinKey(alias);
    records.push({ row: row[0], pinyin, ipa: pinyinToIPA(pinyin), values: systems.map((s) => row[s.col]) });
  }
}
const groups = new Map();
for (const record of records.filter((item) => item.ipa)) {
  const group = groups.get(record.ipa) ?? [];
  group.push(record);
  groups.set(record.ipa, group);
}
const collisions = [...groups.entries()].filter(([, group]) => group.length > 1).map(([ipa, group]) => ({
  ipa,
  pinyin: group.map((item) => item.pinyin),
  rows: group.map((item) => item.row),
  divergentSystems: systems.filter((system, index) => new Set(group.map((item) => item.values[index])).size > 1).map((system) => system.key),
}));
const unsupported = records.filter((item) => !item.ipa).map(({ pinyin, row }) => ({ pinyin, row }));
const report = {
  aliases: records.length,
  supported: records.length - unsupported.length,
  unsupported: unsupported.length,
  collisionGroups: collisions.length,
  divergentGroups: collisions.filter((item) => item.divergentSystems.length).length,
  collisions,
  unsupportedKeys: unsupported,
};
if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else {
  for (const key of ['aliases', 'supported', 'unsupported', 'collisionGroups', 'divergentGroups']) console.log(key + ': ' + report[key]);
  for (const item of collisions.filter((entry) => entry.divergentSystems.length)) console.log('DIVERGENCE ' + item.ipa + ': ' + item.pinyin.join('/') + ' (' + item.divergentSystems.join(',') + ')');
}
