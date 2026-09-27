import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const srcRoot = path.join(root, 'src');
const index = await fs.readFile(path.join(root, 'index.html'), 'utf8');
const sourceFiles = [];

async function collect(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await collect(full);
    else if (/\.(js|css|html)$/u.test(entry.name)) sourceFiles.push(await fs.readFile(full, 'utf8'));
  }
}
await collect(srcRoot);
sourceFiles.push(index);
const source = sourceFiles.join('\n');
const forbidden = [/\bfetch\s*\(/u, /XMLHttpRequest/u, /WebSocket/u, /sendBeacon/u, /\binnerHTML\b/u, /\beval\s*\(/u, /new Function\s*\(/u];
const violations = forbidden.filter((pattern) => pattern.test(source)).map(String);
if (violations.length) throw new Error(`Release security check failed: ${violations.join(', ')}`);

for (const required of ['src/app/convert.js', 'src/app/transcribe.js', 'src/app/pinyin-pro-adapter.js', 'src/generated/transcription-map.js']) {
  await fs.access(path.join(root, required));
}

const dist = path.join(root, 'dist');
let totalBytes = 0;
try {
  async function sizeDir(dir) {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await sizeDir(full);
      else totalBytes += (await fs.stat(full)).size;
    }
  }
  await sizeDir(dist);
  if (totalBytes > 2_000_000) throw new Error(`Static bundle exceeds 2 MB: ${totalBytes} bytes.`);
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

console.log(JSON.stringify({ security: 'pass', requiredFiles: 'pass', distBytes: totalBytes }, null, 2));
