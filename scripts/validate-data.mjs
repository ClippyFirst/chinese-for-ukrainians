import fs from 'node:fs/promises';

const sourcePath = new URL('../zh-in-ua.csv', import.meta.url);
const input = await fs.readFile(sourcePath, 'utf8');
if (!input.trim()) throw new Error('zh-in-ua.csv is empty');
console.log('Data validation scaffold: CSV is readable.');
