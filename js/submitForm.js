import preload from './preload.js';
import renderCards from './renderCards.js';
import fetchRequest from './fetchRequest.js';

const submitForm = (form) => {
  console.log(form);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSearch = Object.fromEntries(formData);
    const search = newSearch.search;
    const init = () => {
      preload.show();
      return Promise.all([
        fetchRequest(`../search.json`, {
          callback: (err, data) => {
            const newArr = data.articles.filter((item) =>
              item.title.includes(search));
            console.log('newArr: ', newArr);
            document.querySelector('.section-search').style = 'display: block';
            document.querySelector('.section-title__title-search').textContent =
            `По вашему запросу ${search}  найдено ${newArr.length}`;
            return renderCards(null, newArr);
          },
        }),
        fetchRequest('../headlines.json', {
          callback: renderCards,
        }),
      ]);
    };
    init().then(data => {
      preload.remove();
      document.querySelector('.cards').textContent = '';
      document.querySelector('.cards').append(data[1]);
      document.querySelector('.cards-search').textContent = '';
      document.querySelector('.cards-search').append(data[0]);
    });
  });
};

export default submitForm;
