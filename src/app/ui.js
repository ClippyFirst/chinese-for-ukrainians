import { convert } from './convert.js';
import { copyText } from './clipboard.js';

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

  const cards = {
    pinyin: root.querySelector('#result-pinyin'),
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
    cards.kirnosova.textContent = result.kirnosova;
    cards.kirnosovaTsisar.textContent = result.kirnosovaTsisar;
    cards.nanu.textContent = result.nanu;

    const issueCount = result.issues.length;
    issueState.hidden = issueCount === 0;
    if (issueCount) {
      issueText.textContent = `Є ${issueCount} невирішених або відсутніх зіставлень. Відповідні фрагменти залишено без вигаданого перекладу.`;
    }
  }

  input.addEventListener('input', render);
  mode.addEventListener('change', render);
  scriptChoices.forEach((choice) => choice.addEventListener('change', () => {
    mode.value = choice.value;
    render();
  }));
  showPinyinTones.addEventListener('change', render);
  showUkrainianTones.addEventListener('change', render);
  clearButton.addEventListener('click', () => { input.value = ''; input.focus(); render(); });
  exampleButton.addEventListener('click', () => { input.value = exampleText; input.focus(); render(); });

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
