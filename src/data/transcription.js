export const SYSTEMS = Object.freeze({
  kirnosova: 'Кірносова',
  kirnosova_tsisar: 'Кірносова—Цісар',
  nanu: 'НАНУ',
});

const EXPECTED_HEADERS = Object.freeze(['№', 'Піньїнь', 'Кірносова', 'Кірносова—Цісар', 'НАНУ']);

export function normalizePinyinKey(value) {
  return String(value)
    .normalize('NFC')
    .trim()
    .toLowerCase()
    .replace(/u:/g, 'ü')
    .replace(/v/g, 'ü')
    .replace(/[1-5]$/u, '');
}

export function parseCsv(input) {
  const text = input.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') { field += '"'; i += 1; }
      else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"' && field.length === 0) quoted = true;
    else if (char === ';') { row.push(field); field = ''; }
    else if (char === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else field += char;
  }
  if (quoted) throw new Error('CSV contains an unterminated quoted field.');
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.filter((candidate) => candidate.some((cell) => cell !== ''));
}

export function validateCsv(input) {
  const rows = parseCsv(input);
  const errors = [];
  const warnings = [];
  const keys = new Map();
  if (!rows.length) return { valid: false, errors: ['CSV is empty.'], warnings, rows: 0, aliases: 0 };
  if (JSON.stringify(rows[0]) !== JSON.stringify(EXPECTED_HEADERS)) {
    errors.push(`Invalid header. Expected: ${EXPECTED_HEADERS.join(';')}`);
  }
  for (let index = 1; index < rows.length; index += 1) {
    const row = rows[index];
    if (row.length !== EXPECTED_HEADERS.length) {
      errors.push(`Row ${index + 1}: expected 5 fields, got ${row.length}.`);
      continue;
    }
    const sourceKey = row[1];
    if (!sourceKey.trim()) {
      errors.push(`Row ${index + 1}: Pinyin key is empty.`);
      continue;
    }
    for (const alias of sourceKey.split('/')) {
      const normalized = normalizePinyinKey(alias);
      if (!normalized) {
        errors.push(`Row ${index + 1}: empty normalized alias in '${sourceKey}'.`);
        continue;
      }
      if (keys.has(normalized)) {
        errors.push(`Duplicate normalized Pinyin key '${normalized}' in rows ${keys.get(normalized)} and ${index + 1}.`);
      } else keys.set(normalized, index + 1);
    }
    if (!row[2] && !row[3] && !row[4]) warnings.push(`Row ${index + 1}: all Ukrainian mappings are blank.`);
  }
  return { valid: errors.length === 0, errors, warnings, rows: Math.max(rows.length - 1, 0), aliases: keys.size };
}

export function generateMappings(input) {
  const report = validateCsv(input);
  if (!report.valid) throw new Error(report.errors.join('\n'));
  const rows = parseCsv(input);
  const systems = Object.fromEntries(Object.keys(SYSTEMS).map((key) => [key, {}]));
  for (let index = 1; index < rows.length; index += 1) {
    const row = rows[index];
    const [number, sourceKey, kirnosova, kirnosovaTsisar, nanu] = row;
    const values = { kirnosova, kirnosova_tsisar: kirnosovaTsisar, nanu };
    for (const alias of sourceKey.split('/')) {
      const normalized = normalizePinyinKey(alias);
      for (const system of Object.keys(SYSTEMS)) {
        systems[system][normalized] = Object.freeze({
          value: values[system],
          missing: values[system] === '',
          sourceRow: Number(number),
          sourceKey,
        });
      }
    }
  }
  return Object.freeze(systems);
}

export function lookupTranscription(mappings, system, normalizedPinyin) {
  const key = normalizePinyinKey(normalizedPinyin);
  const entry = mappings[system]?.[key];
  if (!entry) return { status: 'unresolved', value: '', key };
  if (entry.missing) return { status: 'missing', value: '', key, sourceRow: entry.sourceRow, sourceKey: entry.sourceKey };
  return { status: 'resolved', value: entry.value, key, sourceRow: entry.sourceRow, sourceKey: entry.sourceKey };
}
