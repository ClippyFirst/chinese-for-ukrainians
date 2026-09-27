import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');

describe('converter scaffold', () => {
  it('contains the required source and data entry points', () => {
    expect(fs.existsSync(path.join(root, 'src'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'scripts'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'tests'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'zh-in-ua.csv'))).toBe(true);
  });
});
