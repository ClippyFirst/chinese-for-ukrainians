import fs from 'node:fs/promises';
import { validateCsv } from '../src/data/transcription.js';

const input = await fs.readFile(new URL('../zh-in-ua.csv', import.meta.url), 'utf8');
const report = validateCsv(input);
if (!report.valid) {
  console.error(report.errors.join('\n'));
  process.exit(1);
}
console.log(JSON.stringify({ rows: report.rows, aliases: report.aliases, warnings: report.warnings }, null, 2));
