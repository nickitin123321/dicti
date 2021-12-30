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
      createRow(list, engWord, arrRu[wordIndex], wordIndex);
    });
  } else {
    clearList();
  }
};

const createRow = (
  list: Element,
  engWord: string,
  ruWord: string,
  index: number
) => {
  const row = document.createElement('div');

  const cellEng = document.createElement('span');
  const cellRu = document.createElement('span');
  const removeButton = document.createElement('button');

  row.classList.add('dic_list__row');

  cellEng.classList.add('dic_list__cell');
  cellRu.classList.add('dic_list__cell');
  removeButton.classList.add('dic_list__button');

  const arrRu = JSON.parse(localStorage.getItem('arrRu'));
  const arrEng = JSON.parse(localStorage.getItem('arrEng'));

  removeButton.textContent = 'X';
  removeButton.dataset.index = String(index);

  removeButton.addEventListener('click', () => {
    arrRu.splice(Number(removeButton.dataset.index), 1);
    arrEng.splice(Number(removeButton.dataset.index), 1);

    localStorage.setItem('arrEng', JSON.stringify(arrEng));
    localStorage.setItem('arrRu', JSON.stringify(arrRu));

    removeButton.removeEventListener;
    removeButton.parentElement.remove();
  });

  row.appendChild(cellEng);
  row.appendChild(cellRu);
  row.appendChild(removeButton);
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

  const arrRu = JSON.parse(localStorage.getItem('arrRu'));

  createRow(list, inputEng.value, inputRu.value, arrRu.length);

  list.scrollTop = list.scrollHeight;

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
