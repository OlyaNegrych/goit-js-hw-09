import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
const delayRef = document.querySelector('[name="delay"]');
const stepRef = document.querySelector('[name="step"]');
const amountRef = document.querySelector('[name="amount"]');

formRef.addEventListener('submit', onPromiseCreate);

function onPromiseCreate(evt) {
  evt.preventDefault();
  let promiseDelay = Number(delayRef.value);

  for (let i = 1; i <= amountRef.value; i += 1) {
    createPromise(i, promiseDelay).then(onSuccess).catch(onError);
    promiseDelay += Number(stepRef.value);
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



