import './style.scss';

import { getRandomInt } from './utils';

const arrEng = JSON.parse(localStorage.getItem('arrEng')) as string[];
const arrRu = JSON.parse(localStorage.getItem('arrRu')) as string[];

const initLocalArrs = () => {
  localStorage.setItem('arrEng', JSON.stringify([]));
  localStorage.setItem('arrRu', JSON.stringify([]));
};

const initList = () => {
  if (arrEng && arrRu) {
    const list = document.querySelector('.dic__list');

    arrEng.forEach((engWord, wordIndex) => {
      createRow(list, engWord, arrRu[wordIndex], wordIndex);
    });
  } else {
    initLocalArrs();
  }
};

const getTranslate = (language: 'ru' | 'eng', wordIndex: number): string => {
  if (language === 'ru') {
    return arrEng[wordIndex];
  } else {
    return arrRu[wordIndex];
  }
};

const getRandomWord = (): {
  word: string;
  language: 'ru' | 'eng';
  wordIndex: number;
} => {
  let word = '';
  let language = 'ru' as 'ru' | 'eng';
  const wordIndex = getRandomInt(arrEng.length);

  if (getRandomInt(2) === 1) {
    word = arrEng[wordIndex];
    language = 'eng';
  } else {
    word = arrRu[wordIndex];
    language = 'ru';
  }
  return {
    word,
    language,
    wordIndex,
  };
};

const initTestList = () => {
  const list = document.querySelector('.dic__list');
  const { word, wordIndex, language } = getRandomWord();
  const row = document.createElement('div');
  const wordElement = document.createElement('span');
  const wordInput = document.createElement('input');
  const newWordButton = document.createElement('button');
  const okButton = document.createElement('button');

  wordElement.classList.add('dic_list__guessed-word');
  wordInput.classList.add('dic_list__word-input');
  okButton.classList.add('dic_list__ok-button');
  newWordButton.classList.add('dic_list__new-word-button');
  row.classList.add('dic_list__word-row');

  newWordButton.textContent = 'new word';
  okButton.textContent = 'OK';
  wordElement.textContent = word;

  newWordButton.addEventListener('click', () => {
    clearDomList();
    initTestList();
  });

  okButton.addEventListener('click', () => {
    if (wordInput.value === getTranslate(language, wordIndex)) {
      console.log('угадал');
    } else {
      console.log('не угадал');
    }
  });

  row.appendChild(wordElement);
  row.appendChild(wordInput);
  row.appendChild(okButton);
  row.appendChild(newWordButton);

  list.appendChild(row);
};

const clearDomList = () => {
  const list = document.querySelector('.dic__list');
  list.innerHTML = '';
};

const createRow = (
  list: Element,
  engWord: string,
  ruWord: string,
  index: number
) => {
  const row = document.createElement('div');

  // TODO drag rows.
  //row.addEventListener('drag', () => {}, false);

  const cellEng = document.createElement('span');
  const cellRu = document.createElement('span');
  const removeButton = document.createElement('button');

  row.classList.add('dic_list__row');

  cellEng.classList.add('dic_list__cell');
  cellRu.classList.add('dic_list__cell');
  removeButton.classList.add('dic_list__button');

  removeButton.textContent = 'X';
  removeButton.dataset.index = String(index);

  removeButton.addEventListener('click', function () {
    const index = this.dataset.index;
    arrRu.splice(Number(index), 1);
    arrEng.splice(Number(index), 1);

    localStorage.setItem('arrEng', JSON.stringify(arrEng));
    localStorage.setItem('arrRu', JSON.stringify(arrRu));

    this.removeEventListener;
    this.parentElement.remove();
  });

  row.appendChild(cellEng);
  row.appendChild(cellRu);
  row.appendChild(removeButton);

  list.appendChild(row);

  cellEng.textContent = engWord;
  cellRu.textContent = ruWord;
};

let isTestMode = true;

const toggleTestMode = () => {
  const list = document.querySelector('.dic__list') as HTMLElement;

  if (isTestMode) {
    clearDomList();
    initTestList();
    list.style.justifyContent = 'center';
  } else {
    clearDomList();
    initList();
    list.style.justifyContent = 'start';
  }

  isTestMode = !isTestMode;
};

const addRow = (evt: Event): void => {
  evt.preventDefault();
  if (!isTestMode) {
    toggleTestMode();
  }

  const inputRu = document.querySelector(
    '.dic_form__input--ru'
  ) as HTMLInputElement;

  const inputEng = document.querySelector(
    '.dic_form__input--eng'
  ) as HTMLInputElement;

  const list = document.querySelector('.dic__list');

  createRow(list, inputEng.value, inputRu.value, arrRu.length);

  list.scrollTop = list.scrollHeight;

  arrRu.push(inputRu.value);
  arrEng.push(inputEng.value);

  localStorage.setItem('arrEng', JSON.stringify(arrEng));
  localStorage.setItem('arrRu', JSON.stringify(arrRu));

  inputRu.value = '';
  inputEng.value = '';
};

const initWindow = () => {
  initList();

  const addButton = document.querySelector('.dic_form__button--add');
  const testButton = document.querySelector('.dic_form__button--test');

  addButton.addEventListener('click', addRow);
  testButton.addEventListener('click', toggleTestMode);

  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyName === 'Control') {
      const inputRu = document.querySelector(
        '.dic_form__input--eng'
      ) as HTMLInputElement;

      inputRu.focus();
    }
  });
};

initWindow();
