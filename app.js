const tiles = document.querySelector('.tile-container');
const backspaceAndEnterRow = document.querySelector('#keyboardAndEnterRow');
const keyboardFirstRow = document.querySelector('#keyboardFirstRow');
const keyboardSecondRow = document.querySelector('#keyboardSecondRow');
const keyboardThirdRow = document.querySelector('#keyboardThirdRow');

const keysFirstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const keysSecondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const keysThirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

const rows = 6;
const columns = 5;

let currentRow = 0;
let currentColumn = 0;

const letreco = 'VASCO';
let letrecoMap = {};
for (let index = 0; index < letreco.length; index++) {
  letrecoMap[letreco[index]] = index;  
}

const guesses = [];

for (let rowIndex = 0; rowIndex < rows; rowIndex ++){
  guesses[rowIndex] = new Array(columns);
  const tileRow = document.createElement('div');
  tileRow.setAttribute('id', `row${rowIndex}`);
  tileRow.setAttribute('class', 'tile-row');

  for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
    const tileColumn = document.createElement('div');
    tileColumn.setAttribute('id', `row${rowIndex}column${columnIndex}`);
    tileColumn.setAttribute('class',rowIndex === 0 ? 'tile-column typing' : 'tile-column disabled');
    tileRow.append(tileColumn);
    guesses[rowIndex][columnIndex] = "";
  }
  tiles.append(tileRow);
}

const moveToNextRow = () => {
  const typingColumns = document.querySelectorAll('.typing');
  for (let index = 0; index < typingColumns.length; index++) {
    typingColumns[index].classList.remove('typing');
    typingColumns[index].classList.add('disabled');
  }

  currentRow++;
  currentColumn = 0;

  const currentRowElement = document.querySelector(`#row${currentRow}`);
  const currentColumns = currentRowElement.querySelectorAll('.tile-column');

  for (let index = 0; index < currentColumns.length; index++) {
    currentColumns[index].classList.remove('disabled');
    currentColumns[index].classList.add('typing');
  }
}

const checkGuess = () => {
  const guess = guesses[currentRow].join('');
  if(guess.length !== columns){
    return;
  }

  const currentColumns = document.querySelectorAll('.typing');
  for (let index = 0; index < columns; index++) {
    const letter = guess[index];
    if(letrecoMap[letter] === undefined){
      currentColumns[index].classList.add('wrong');
    } else {
      if(letrecoMap[letter] === index) {
        currentColumns[index].classList.add('right');
      } else {
        currentColumns[index].classList.add('displaced');
      }
    } 
    
  }

  if(guess === letreco) {
    window.alert('Tu é demais');
  } else {
    if(currentRow === rows - 1){
      window.alert('errou');
    } else {
      moveToNextRow();
    }
  }
  
};

const handleKeyboardOnClick = (key) => {
  if (currentColumn === columns) {
    return;
  }
  const currentTile = document.querySelector(`#row${currentRow}column${currentColumn}`);
  currentTile.textContent = key;
  guesses[currentRow][currentColumn] = key;
  currentColumn++;

}

const createKeyboardRow = (keys, keyboardRow) => {
  keys.forEach((key) => {
    var buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', () => handleKeyboardOnClick(key));
    keyboardRow.append(buttonElement);
  })
}

createKeyboardRow(keysFirstRow, keyboardFirstRow);
createKeyboardRow(keysSecondRow, keyboardSecondRow);
createKeyboardRow(keysThirdRow, keyboardThirdRow);

const handleBackspace = () => {
  if(currentColumn === 0){
    return;
  }

  currentColumn--;
  guesses[currentRow][currentColumn] = '';
  const tile = document.querySelector(`#row${currentRow}column${currentColumn}`);
  tile.textContent = '';
}

function createButtonsBackspaceAndEnter(){
  const backspaceButton = document.createElement('button');
  backspaceButton.addEventListener('click', handleBackspace);

  const backspaceButtonIcon = document.createElement('img');
  backspaceButtonIcon.setAttribute('src', './icons/delete.svg');

  backspaceButton.append(backspaceButtonIcon);
  backspaceAndEnterRow.append(backspaceButton);

  const enterButton = document.createElement('button');
  enterButton.addEventListener('click', checkGuess);

  const enterButtonIcon = document.createElement('img');
  enterButtonIcon.setAttribute('src', './icons/check.svg');

  enterButton.append(enterButtonIcon);
  backspaceAndEnterRow.append(enterButton);
}

createButtonsBackspaceAndEnter();

document.onkeydown = function (event) {
  event = event || widow.event;
  if(event.key === 'Enter'){
    checkGuess();
  } else if (event.key === 'Backspace') {
    handleBackspace();
  } else {
    handleKeyboardOnClick(event.key.toUpperCase());
  }
}