const DEFAULT_LANG = 'zh-CN';
const VOICE_TIMEOUT_MS = 1200;

function getVoices() {
  return typeof window !== 'undefined' && window.speechSynthesis
    ? window.speechSynthesis.getVoices()
    : [];
}

function getChineseVoice() {
  const voices = getVoices();
  return (
    voices.find((voice) => voice.lang?.toLowerCase() === 'zh-cn') ??
    voices.find((voice) => voice.lang?.toLowerCase().startsWith('zh-cn')) ??
    voices.find((voice) => voice.lang?.toLowerCase().startsWith('cmn')) ??
    voices.find((voice) => voice.lang?.toLowerCase().startsWith('zh')) ??
    null
  );
}

export function canSpeakChinese() {
  return typeof window !== 'undefined'
    && 'speechSynthesis' in window
    && 'SpeechSynthesisUtterance' in window;
}

export function hasChineseVoice() {
  return Boolean(getChineseVoice());
}

function waitForVoices() {
  if (!canSpeakChinese()) return Promise.resolve(false);
  if (getVoices().length) return Promise.resolve(true);

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.speechSynthesis.removeEventListener('voiceschanged', finish);
      resolve(Boolean(getVoices().length));
    };
    window.speechSynthesis.addEventListener('voiceschanged', finish, { once: true });
    window.setTimeout(finish, VOICE_TIMEOUT_MS);
  });
}

export async function speakChinese(text, { onStart, onEnd, onError, onUnavailable } = {}) {
  if (!canSpeakChinese() || !text.trim()) {
    onUnavailable?.();
    return false;
  }

  await waitForVoices();
  const voice = getChineseVoice();
  if (!voice) {
    onUnavailable?.();
    return false;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = voice.lang || DEFAULT_LANG;
  utterance.rate = 0.86;
  utterance.pitch = 1;
  utterance.voice = voice;
  utterance.onstart = () => onStart?.();
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onError?.();
  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if (canSpeakChinese()) window.speechSynthesis.cancel();
}
