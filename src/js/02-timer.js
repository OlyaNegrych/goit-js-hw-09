import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const timerRef = document.querySelector('.timer');
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
    console.log(selectedDates[0]);
  },
};

// console.log(options.defaultDate.getTime()); // current time
// console.log(options.onClose(selectedDates[0]));  // chosen time

flatpickr('#datetime-picker', { options });

startBtn.addEventListener('click', () => { timer.start(); });
stopBtn.addEventListener('click', () => { timer.stop(); });
stopBtn.setAttribute('disabled', 'disabled');

const timer = {
    intervalId: null,
    start() {
        const startTime = Date.now();

       this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startTime + currentTime;
            const { days, hours, minutes, seconds } = convertMs(deltaTime);

           console.log(`${days} : ${hours} : ${minutes} : ${seconds}`);
           
           updateClockFace({ days, hours, minutes, seconds });

       }, 1000);
        
        startBtn.setAttribute('disabled', 'disabled');
        stopBtn.removeAttribute('disabled');
    },
    stop() {
        clearInterval(this.intervalId);
        stopBtn.setAttribute('disabled', 'disabled');
        startBtn.removeAttribute('disabled');
    }
}

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
  const seconds = addLeadingZero(Math.floor(
    (((ms % day) % hour) % minute) / second
  ));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String().padStart(2, '0');
}