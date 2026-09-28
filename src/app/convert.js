import { scanText } from './scanner.js';
import { detectScript } from './detector.js';
import { configurePronunciationEngine, resolvePronunciation } from './pronunciation.js';
import { formatPinyin } from './pinyin.js';
import { formatIPA } from './ipa.js';
import { transcribeAll } from './transcribe.js';

let configuration = null;

export function configureConverter({ pronunciationEngine, mappings, traditionalToSimplified = {} }) {
  configuration = { pronunciationEngine, mappings, traditionalToSimplified };
  configurePronunciationEngine(pronunciationEngine);
}

function requireConfiguration() {
  if (!configuration) throw new Error('Converter is not configured.');
  return configuration;
}

export function convert(source, options = { scriptMode: 'auto', showPinyinTones: true, showUkrainianTones: true }) {
  const { mappings, traditionalToSimplified } = requireConfiguration();
  const scriptMode = options.scriptMode ?? 'auto';
  const showPinyinTones = options.showPinyinTones ?? true;
  const showUkrainianTones = options.showUkrainianTones ?? true;
  if (!['auto', 'simplified', 'traditional'].includes(scriptMode)) {
    throw new Error(`Unknown script mode: ${scriptMode}`);
  }

  const spans = scanText(source);
  const detectedScript = detectScript(source, traditionalToSimplified);
  const traditional = scriptMode === 'traditional'
    || (scriptMode === 'auto' && detectedScript.status === 'traditional')
    || (scriptMode === 'auto' && detectedScript.status === 'mixed');

  const tokens = resolvePronunciation(spans, source, { traditional });
  const pinyin = formatPinyin(tokens, { showTones: showPinyinTones });
  const ipa = formatIPA(tokens);
  const transcription = transcribeAll(tokens, mappings, { showTones: showUkrainianTones });
  const issues = transcriptionIssues(tokens, transcription);

  return {
    source,
    scriptMode,
    showPinyinTones,
    showUkrainianTones,
    detectedScript,
    tokens,
    pinyin,
    ipa,
    kirnosova: transcription.kirnosova.text,
    kirnosovaTsisar: transcription.kirnosova_tsisar.text,
    nanu: transcription.nanu.text,
    issues,
  };
}

function transcriptionIssues(tokens, transcription) {
  const pronunciationIssues = tokens
    .filter((token) => token.type === 'han' && token.status !== 'resolved')
    .map((token) => ({ type: 'pronunciation', status: token.status, source: token.source, pinyin: token.pinyin }));
  const mappingIssues = Object.entries(transcription).flatMap(([system, result]) =>
    result.issues.map((issue) => ({ type: 'mapping', system, ...issue })),
  );
  return [...pronunciationIssues, ...mappingIssues];
}
