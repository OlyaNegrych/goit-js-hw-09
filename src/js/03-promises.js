import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
const delayRef = document.querySelector('[name="delay"]');
const stepRef = document.querySelector('[name="step"]');
const amountRef = document.querySelector('[name="amount"]');
let intervalId = null;
let position = 1;

formRef.addEventListener('submit', onPromiseCreate);

function onPromiseCreate(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget;

  let promiseDelay = Number(delay.value);

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, promiseDelay).then(onSuccess).catch(onError);
    promiseDelay += Number(step.value);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);

    }, delay);
      
  });
}

function onSuccess(result) {
  Notiflix.Notify.success(result);
}

function onError(error) {
  Notiflix.Notify.failure(error);
}



