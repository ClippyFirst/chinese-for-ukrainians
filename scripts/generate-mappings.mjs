import fs from 'node:fs/promises';
import { generateMappings } from '../src/data/transcription.js';

const source = await fs.readFile(new URL('../zh-in-ua.csv', import.meta.url), 'utf8');
const mappings = generateMappings(source);
const output = `// Generated from zh-in-ua.csv. Do not edit manually.\nexport const transcriptionMap = ${JSON.stringify(mappings, null, 2)};\n`;
const target = new URL('../src/generated/transcription-map.js', import.meta.url);
await fs.mkdir(new URL('../src/generated/', import.meta.url), { recursive: true });
await fs.writeFile(target, output, 'utf8');
console.log(`Generated ${output.length} bytes at src/generated/transcription-map.js`);
