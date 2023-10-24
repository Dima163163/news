import preload from './preload.js';
import renderCards from './renderCards.js';
import fetchRequest from './fetchRequest.js';
import submitForm from './submitForm.js';

const wrapperCards = document.querySelector('.cards');
const form = document.querySelector('.header__form');


const init = () => {
  preload.show();
  const response = new Promise((resolve) => {
    resolve(fetchRequest('../headlines.json', {
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
