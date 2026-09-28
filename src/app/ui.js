import { convert } from './convert.js';
import { copyText } from './clipboard.js';
import { canSpeakChinese, speakChinese, stopSpeaking } from './speech.js';

export const exampleText = '你好，世界！';

export function buildResultLabels(result) {
  return [
    ['Pinyin', result.pinyin],
    ['Кірносова', result.kirnosova],
    ['Кірносова—Цісар', result.kirnosovaTsisar],
    ['НАНУ', result.nanu],
  ];
}

export function mountApp(root) {
  const input = root.querySelector('#source-input');
  const mode = root.querySelector('#script-mode');
  const showPinyinTones = root.querySelector('#show-pinyin-tones');
  const showUkrainianTones = root.querySelector('#show-ukrainian-tones');
  const scriptChoices = root.querySelectorAll('input[name="script-choice"]');
  const characterCount = root.querySelector('#character-count');
  const results = root.querySelector('#results');
  const emptyState = root.querySelector('#empty-state');
  const issueState = root.querySelector('#issue-state');
  const issueText = root.querySelector('#issue-text');
  const liveRegion = root.querySelector('#live-region');
  const clearButton = root.querySelector('#clear-button');
  const exampleButton = root.querySelector('#example-button');
  const speakButton = root.querySelector('#speak-button');
  const speechNote = root.querySelector('#speech-note');

  const cards = {
    pinyin: root.querySelector('#result-pinyin'),
    ipa: root.querySelector('#result-ipa'),
    kirnosova: root.querySelector('#result-kirnosova'),
    kirnosovaTsisar: root.querySelector('#result-kirnosova-tsisar'),
    nanu: root.querySelector('#result-nanu'),
  };

  function render() {
    const source = input.value;
    characterCount.textContent = `${Array.from(source).length} символів`;
    if (!source) {
      results.hidden = true;
      issueState.hidden = true;
      emptyState.hidden = false;
      return;
    }

    const result = convert(source, {
      scriptMode: mode.value,
      showPinyinTones: showPinyinTones.checked,
      showUkrainianTones: showUkrainianTones.checked,
    });
    emptyState.hidden = true;
    results.hidden = false;
    cards.pinyin.textContent = result.pinyin;
    cards.ipa.textContent = result.ipa;
    cards.kirnosova.textContent = result.kirnosova;
    cards.kirnosovaTsisar.textContent = result.kirnosovaTsisar;
    cards.nanu.textContent = result.nanu;

    const issueCount = result.issues.length;
    issueState.hidden = issueCount === 0;
    if (issueCount) {
      issueText.textContent = `Є ${issueCount} невирішених або відсутніх зіставлень. Відповідні фрагменти залишено без вигаданого перекладу.`;
    }
  }

  input.addEventListener('input', () => {
    stopSpeaking();
    speakButton.textContent = 'Прослухати';
    speakButton.setAttribute('aria-pressed', 'false');
    render();
  });
  mode.addEventListener('change', render);
  scriptChoices.forEach((choice) => choice.addEventListener('change', () => {
    mode.value = choice.value;
    render();
  }));
  showPinyinTones.addEventListener('change', render);
  showUkrainianTones.addEventListener('change', render);
  clearButton.addEventListener('click', () => {
    stopSpeaking();
    speakButton.textContent = 'Прослухати';
    speakButton.setAttribute('aria-pressed', 'false');
    input.value = '';
    input.focus();
    render();
  });
  exampleButton.addEventListener('click', () => {
    stopSpeaking();
    speakButton.textContent = 'Прослухати';
    speakButton.setAttribute('aria-pressed', 'false');
    speechNote.textContent = 'Стандартна мандаринська вимова · голос браузера / ОС';
    input.value = exampleText;
    input.focus();
    render();
  });

  speakButton.addEventListener('click', async () => {
    if (speakButton.getAttribute('aria-pressed') === 'true') {
      stopSpeaking();
      speakButton.textContent = 'Прослухати';
      speakButton.setAttribute('aria-pressed', 'false');
      speechNote.textContent = 'Стандартна мандаринська вимова · голос браузера / ОС';
      return;
    }

    const source = input.value.trim();
    if (!source) return;
    if (!canSpeakChinese()) {
      speechNote.textContent = 'У цьому браузері недоступне озвучення тексту.';
      return;
    }

    speakButton.disabled = true;
    speechNote.textContent = 'Пошук китайського голосу…';
    const spoken = await speakChinese(source, {
      onStart: () => {
        speakButton.disabled = false;
        speakButton.textContent = 'Зупинити';
        speakButton.setAttribute('aria-pressed', 'true');
        speechNote.textContent = 'Відтворюється стандартна мандаринська вимова.';
      },
      onEnd: () => {
        speakButton.disabled = false;
        speakButton.textContent = 'Прослухати';
        speakButton.setAttribute('aria-pressed', 'false');
      },
      onError: () => {
        speakButton.disabled = false;
        speakButton.textContent = 'Прослухати';
        speakButton.setAttribute('aria-pressed', 'false');
        speechNote.textContent = 'Не вдалося відтворити звук у цьому браузері або системі.';
      },
    });
    if (!spoken) {
      speakButton.disabled = false;
      speechNote.textContent = 'Китайський голос не знайдено. Додайте голос для китайської (普通话 / 中文) у налаштуваннях Windows або браузера.';
    }
  });

  root.querySelectorAll('[data-copy-target]').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = root.querySelector(`#${button.dataset.copyTarget}`);
      try {
        await copyText(target.textContent);
        liveRegion.textContent = 'Скопійовано.';
      } catch {
        liveRegion.textContent = 'Не вдалося скопіювати. Виділіть результат і скопіюйте вручну.';
      }
    });
  });

  scriptChoices.forEach((choice) => { choice.checked = choice.value === mode.value; });
  render();
}
