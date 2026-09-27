import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');

test('converter scaffold contains required entry points', () => {
  for (const entry of ['src', 'scripts', 'tests', 'zh-in-ua.csv']) {
    assert.equal(fs.existsSync(path.join(root, entry)), true, entry);
  }
});
