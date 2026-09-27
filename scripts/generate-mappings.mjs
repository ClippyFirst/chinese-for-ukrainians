import fs from 'node:fs/promises';

const input = await fs.readFile(new URL('../zh-in-ua.csv', import.meta.url), 'utf8');
await fs.mkdir(new URL('../src/generated/', import.meta.url), { recursive: true });
await fs.writeFile(
  new URL('../src/generated/transcription-map.js', import.meta.url),
  'export const transcriptionMap = Object.freeze({});\n',
  'utf8',
);
console.log('Mapping generation scaffold: ' + (input.split(/\r?\n/).length - 1) + ' data rows read.');
