const DEFAULT_LANG = 'zh-CN';

function getChineseVoice() {
  const voices = window.speechSynthesis?.getVoices?.() ?? [];
  return (
    voices.find((voice) => voice.lang.toLowerCase() === 'zh-cn') ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith('zh-cn')) ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith('zh')) ??
    null
  );
}

export function canSpeakChinese() {
  return typeof window !== 'undefined'
    && 'speechSynthesis' in window
    && 'SpeechSynthesisUtterance' in window;
}

export function speakChinese(text, { onStart, onEnd, onError } = {}) {
  if (!canSpeakChinese() || !text.trim()) return false;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = DEFAULT_LANG;
  utterance.rate = 0.86;
  utterance.pitch = 1;
  const voice = getChineseVoice();
  if (voice) utterance.voice = voice;

  utterance.onstart = () => onStart?.();
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onError?.();

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if (canSpeakChinese()) window.speechSynthesis.cancel();
}
