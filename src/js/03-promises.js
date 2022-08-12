import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
const delayRef = document.querySelector('[name="delay"]');
const stepRef = document.querySelector('[name="step"]');
const amountRef = document.querySelector('[name="amount"]');
let intervalId = null;
let position = 1;

formRef.addEventListener('submit', event => {
  event.preventDefault();
  createPromise(position, delayRef.value);
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  intervalId = setInterval(() => {
    const delayNumb = delayRef.value + stepRef.value;
    const counter = position + 1;

    if (position === amountRef.value) {
      clearInterval(intervalId);
      return;
    }

    return new Promise((resolve, reject) => {
      if (shouldResolve) {
        resolve({position: counter, delay: delayNumb});
      } 
        reject({ position: counter, delay: delayNumb });
  
      position += 1;
    }, delay);
  });
}

createPromise(2, 500).then(onSuccess).catch(onError);

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

// const makeOrder = () => {
//   const DELAY = 1000;

//   return new Promise((resolve, reject) => {
//     const passed = Math.random() > 0.5;

//     setTimeout(() => {
//       if (passed) {
//         resolve({ position: 1, delay: DELAY});
//       }
//       reject({ position: 2, delay: DELAY});
//     }, DELAY);
//   })
// }

// makeOrder().then(onSuccess).catch(onError);

// function onSuccess({ position, delay }) {
//   Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
// }

// function onError({ position, delay }) {
//  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
// }

