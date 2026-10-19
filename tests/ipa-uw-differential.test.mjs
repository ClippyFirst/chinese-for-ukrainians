import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

test('403-key UW differential is reproducible and covers every source key', () => {
  const result = spawnSync(process.execPath, ['scripts/audit-uw-ipa-differential.mjs', '--check'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /403 keys/u);
  assert.match(result.stdout, /165 literal matches/u);
});
