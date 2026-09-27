import { isHanCharacter } from './scanner.js';

export const SCRIPT_STATUS = Object.freeze({
  simplified: 'simplified',
  traditional: 'traditional',
  mixed: 'mixed',
  undetermined: 'undetermined',
});

export function createScriptClassifier(traditionalToSimplified = {}) {
  const traditionalKeys = new Set(Object.keys(traditionalToSimplified));
  const simplifiedOnly = new Set(
    Object.values(traditionalToSimplified).filter((value) => !traditionalKeys.has(value)),
  );

  return (source) => {
    let hasSimplified = false;
    let hasTraditional = false;

    for (const char of source) {
      if (!isHanCharacter(char)) continue;
      if (traditionalKeys.has(char)) hasTraditional = true;
      else if (simplifiedOnly.has(char)) hasSimplified = true;
    }

    const status = hasSimplified && hasTraditional
      ? SCRIPT_STATUS.mixed
      : hasSimplified
        ? SCRIPT_STATUS.simplified
        : hasTraditional
          ? SCRIPT_STATUS.traditional
          : SCRIPT_STATUS.undetermined;

    return { status, hasSimplified, hasTraditional };
  };
}

export function detectScript(source, traditionalToSimplified = {}) {
  return createScriptClassifier(traditionalToSimplified)(source);
}
