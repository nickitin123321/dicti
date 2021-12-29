import './style.scss';

const clearList = () => {
  localStorage.setItem('arrEng', JSON.stringify([]));
  localStorage.setItem('arrRu', JSON.stringify([]));
};

const initList = () => {
  const arrEng = JSON.parse(localStorage.getItem('arrEng')) as string[];
  const arrRu = JSON.parse(localStorage.getItem('arrRu')) as string[];

  if (arrEng && arrRu) {
    const list = document.querySelector('.dic__list');

    arrEng.forEach((engWord, wordIndex) => {
      createRow(list, engWord, arrRu[wordIndex]);
    });
  } else {
    clearList();
  }
};

const createRow = (list: Element, engWord: string, ruWord: string) => {
  const row = document.createElement('div');

  const cellEng = document.createElement('span');
  const cellRu = document.createElement('span');

  row.classList.add('dic_list__row');
  cellEng.classList.add('dic_list__cell');
  cellRu.classList.add('dic_list__cell');

  row.appendChild(cellEng);
  row.appendChild(cellRu);
  list.appendChild(row);

  cellEng.textContent = engWord;
  cellRu.textContent = ruWord;
};

const handleClick = (evt: Event): void => {
  evt.preventDefault();

  const inputRu = document.querySelector(
    '.dic_form__input--ru'
  ) as HTMLInputElement;

  const inputEng = document.querySelector(
    '.dic_form__input--eng'
  ) as HTMLInputElement;

  const list = document.querySelector('.dic__list');

  createRow(list, inputEng.value, inputRu.value);

  list.scrollTop = list.scrollHeight;

  const arrRu = JSON.parse(localStorage.getItem('arrRu'));
  const arrEng = JSON.parse(localStorage.getItem('arrEng'));

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
  const clearButton = document.querySelector('.dic_form__button--clear');

  addButton.addEventListener('click', handleClick);
  clearButton.addEventListener('click', clearList);

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
