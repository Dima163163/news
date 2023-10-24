import preload from './preload.js';
import renderCards from './renderCards.js';
import fetchRequest from './fetchRequest.js';
import submitForm from './submitForm.js';

const wrapperCards = document.querySelector('.cards');
const form = document.querySelector('.header__form');

const select = document.querySelector('.header-select');

const init = () => {
  preload.show();
  const response = new Promise((resolve) => {
    resolve(fetchRequest(`top-headlines?country=${select.value}`, {
      callback: (err, data) => renderCards(null, data, 8),
    }));
  });
  return response;
};

init().then(data => {
  preload.remove();
  console.log(data);
  wrapperCards.append(data);
  submitForm(form);
});
