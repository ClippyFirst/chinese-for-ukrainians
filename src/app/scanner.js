const HAN_RANGES = [
  [0x3400, 0x4dbf],
  [0x4e00, 0x9fff],
  [0xf900, 0xfaff],
  [0x20000, 0x2fa1f],
];

export function isHanCharacter(char) {
  if (!char) return false;
  const codePoint = char.codePointAt(0);
  return HAN_RANGES.some(([start, end]) => codePoint >= start && codePoint <= end);
}

export function scanText(source) {
  const spans = [];
  let index = 0;
  while (index < source.length) {
    const codePoint = source.codePointAt(index);
    const char = String.fromCodePoint(codePoint);
    const type = isHanCharacter(char) ? 'han' : 'text';
    const start = index;
    index += char.length;
    while (index < source.length) {
      const next = String.fromCodePoint(source.codePointAt(index));
      const nextType = isHanCharacter(next) ? 'han' : 'text';
      if (nextType !== type) break;
      index += next.length;
    }
    spans.push({ source: source.slice(start, index), start, end: index, type });
  }
  return spans;
}
