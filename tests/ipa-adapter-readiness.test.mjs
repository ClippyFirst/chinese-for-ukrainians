import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

test('IPA adapter readiness inventory audit is deterministic', () => {
  const run = () => spawnSync(process.execPath, ['scripts/audit-ipa-adapter-readiness.mjs', '--json'], { encoding: 'utf8' });
  const first = run();
  const second = run();
  assert.equal(first.status, 0, first.stdout + first.stderr);
  assert.equal(second.status, 0, second.stdout + second.stderr);
  assert.equal(first.stdout, second.stdout);
  const report = JSON.parse(first.stdout);
  console.log('IPA adapter inventory:', JSON.stringify({ aliases: report.aliases, supported: report.supported, unsupported: report.unsupported, collisionGroups: report.collisionGroups, divergentGroups: report.divergentGroups, divergentCollisions: report.collisions.filter((item) => item.divergentSystems.length), unsupportedKeys: report.unsupportedKeys }));
  assert.ok(report.aliases > 0);
  assert.equal(report.supported + report.unsupported, report.aliases);
  assert.ok(Array.isArray(report.collisions));
  assert.ok(Array.isArray(report.unsupportedKeys));
});
