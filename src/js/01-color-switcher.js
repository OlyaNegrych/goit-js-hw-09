const bodyRef = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const TIME_DELAY = 1000;
let intervalID = null;

startBtn.addEventListener('click', onStartColorChangeFn);
stopBtn.addEventListener('click', onStopColorChangeFn);
stopBtn.setAttribute('disabled', 'disabled');


function onStartColorChangeFn() {
    intervalID = setInterval(() => {
    bodyRef.style.backgroundColor = `${getRandomHexColor()}`;   
    }, TIME_DELAY);
    startBtn.setAttribute('disabled', 'disabled');
    stopBtn.removeAttribute('disabled');
}

function onStopColorChangeFn() {
    clearInterval(intervalID);
    stopBtn.setAttribute('disabled', 'disabled');
    startBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
