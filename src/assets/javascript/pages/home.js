const getNumberBtn = document.querySelector('.form .btn');
const resetBtn = document.querySelector('.reset');
const input = document.querySelector('.form .input');
const infoToast = document.querySelector('.numbers span');
const numberDisplay = document.querySelector('.numbers div');

// Os eventos de teclado são para limitar o input apenas a números tanto
// para precionar quanto segurar a tecla
input.addEventListener('keypress', () => {
  input.value = input.value.replace(/[^a-zA-Z0-9]|[*a-zA-Z]/, '');
});

input.addEventListener('keyup', () => {
  input.value = input.value.replace(/[^a-zA-Z0-9]|[*a-zA-Z]/, '');
});

getNumberBtn.addEventListener('click', () => searchNumber());

let isRequested = true;
const searchNumber = async () => {
  let requestedNumber;
  let inputValue = Number(input.value);

  resetBtn.addEventListener('click', () => {
    isRequested = true;

    getNumberBtn.removeAttribute('disabled');
    input.removeAttribute('disabled');
    infoToast.removeAttribute('class');

    setdisplays('0');
    resetBtn.style.display = 'none';
  });

  if (input.value === '') {
    let error = { StatusCode: 400, Error: 'Bad Request' };
    return returnError(error);
  }

  if (isRequested) {
    try {
      const data = await fetch(
        'https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300'
      );

      requestedNumber = await data.json();

      if (requestedNumber.Error) {
        throw requestedNumber;
      }

      localStorage.setItem('requestedNumber', JSON.stringify(requestedNumber));
      isRequested = false;
    } catch (error) {
      return returnError(error);
    }
  }

  requestedNumber = JSON.parse(localStorage.getItem('requestedNumber'));

  if (inputValue > requestedNumber.value) {
    returnMessage('É menor', 'info', inputValue);
  } else if (inputValue < requestedNumber.value) {
    returnMessage('É maior', 'info', inputValue);
  }

  if (inputValue == requestedNumber.value) {
    returnMessage('Você acertou!!!', 'success', inputValue);

    getNumberBtn.setAttribute('disabled', true);
    input.setAttribute('disabled', true);
    resetBtn.style.display = 'flex';
  }
};

function returnMessage(message, useClass, value) {
  setdisplays(String(value), useClass);

  infoToast.removeAttribute('class');
  infoToast.classList.add(useClass);
  infoToast.textContent = message;

  input.value = '';
}

function returnError(error) {
  returnMessage('ERRO', 'error', error.StatusCode);
  setdisplays(String(error.StatusCode), 'error');

  getNumberBtn.setAttribute('disabled', true);
  input.setAttribute('disabled', true);
  resetBtn.style.display = 'flex';

  return new Error(JSON.stringify(error));
}

const leftDisplay = document.getElementById('left-display');
const centerDisplay = document.getElementById('center-display');
const rightDisplay = document.getElementById('right-display');

function setdisplays(input, color) {
  let baseClass = `${
    color ? color : ''
  } display-container display-size-12 display-no-`;

  let splitNumber = input.split('');

  switch (splitNumber.length) {
    case 1:
      leftDisplay.className = 'no-display';
      centerDisplay.className = 'no-display';
      rightDisplay.className = baseClass + splitNumber[0];
      break;
    case 2:
      leftDisplay.className = 'no-display';
      centerDisplay.className = baseClass + splitNumber[0];
      rightDisplay.className = baseClass + splitNumber[1];
      break;
    case 3:
      leftDisplay.className = baseClass + splitNumber[0];
      centerDisplay.className = baseClass + splitNumber[1];
      rightDisplay.className = baseClass + splitNumber[2];
      break;
    default:
      break;
  }
}

setdisplays('0');
