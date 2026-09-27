import { addTraditionalDict, pinyin } from 'pinyin-pro';
import TraditionalDict from '@pinyin-pro/data/traditional';

addTraditionalDict(TraditionalDict);

export const traditionalToSimplified = TraditionalDict;

export function pinyinProEngine(text, options = {}) {
  return pinyin(text, {
    type: 'all',
    toneType: 'symbol',
    segmentit: 2,
    ...options,
  });
}
