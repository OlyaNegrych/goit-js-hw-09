import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const resetBtn = document.querySelector('[data-reset]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timer.targetTime = selectedDates[0].getTime();
    if ((timer.targetTime - Date.now()) <= 0) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  timer.start();
});
resetBtn.addEventListener('click', () => {
  timer.reset();
});
resetBtn.setAttribute('disabled', 'disabled');
startBtn.setAttribute('disabled', 'disabled');

const timer = {
  intervalId: null,
  targetTime: null,
  start() {
    this.intervalId = setInterval(() => {
      if (this.targetTime - Date.now() <= 0) {
        this.reset();
      }
      const currentTime = Date.now();
      const deltaTime = this.targetTime - currentTime;
      const time = convertMs(deltaTime);
      
      updateClockFace(time);
    }, 1000);

    startBtn.setAttribute('disabled', 'disabled');
    resetBtn.removeAttribute('disabled');
  },
  reset() {
    clearInterval(this.intervalId);
    const time = convertMs(0);
    updateClockFace(time);
    timer.targetTime = Date.now();

    resetBtn.setAttribute('disabled', 'disabled');
    startBtn.removeAttribute('disabled');
  },
};

function updateClockFace({ days, hours, minutes, seconds }) {
  daysRef.textContent = `${days}`;
  hoursRef.textContent = `${hours}`;
  minutesRef.textContent = `${minutes}`;
  secondsRef.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
