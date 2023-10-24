const renderCards = (err, data) => {
  console.log('err, data', err, data);
  if (err) {
    console.warn(err, data);
    return;
  }
  data = data.articles ? data.articles : data;
  console.log('data: ', data);
  const template = document.createDocumentFragment();
  const news = data.map(newsItem => {
    const card = document.createElement('a');
    card.href = newsItem.url;
    card.classList.add('card');

    const img = document.createElement('img');
    img.classList.add('card__image');
    if (newsItem.urlToImage) {
      img.src = newsItem.urlToImage;
    } else {
      img.src = 'image/no-photo.png';
    }
    img.alt = 'news-image';


    const divContent = document.createElement('div');
    divContent.classList.add('card__content');
    divContent.append(img);

    const divTop = document.createElement('div');
    divTop.classList.add('card__content-top');

    const h3 = document.createElement('h3');
    h3.classList.add('card__title');
    let newsTitle;
    if (newsItem.description) {
      newsTitle = newsItem?.title.split(' ');
      newsTitle = newsTitle.slice(0, 10).join(' ') + '...';
    } else {
      newsTitle = '...';
    }
    h3.textContent = newsTitle;

    const imgIcon = document.createElement('img');
    imgIcon.classList.add('card__icon');
    imgIcon.src = 'image/arrow-right.svg';
    imgIcon.alt = 'arrow-right';

    divTop.append(h3, imgIcon);

    divContent.append(divTop);

    const p = document.createElement('p');
    p.classList.add('card__text');
    let newsText;
    if (newsItem.description) {
      newsText = newsItem?.description.split(' ');
      newsText = newsText.slice(0, 14).join(' ') + '...';
    } else {
      newsText = '...';
    }
    p.textContent = newsText;

    divContent.append(p);

    const divBottom = document.createElement('div');
    divBottom.classList.add('card__bottom');

    divContent.append(divBottom);

    const divCardWrapper = document.createElement('div');
    divCardWrapper.classList.add('card__date-wrapper');
    const pDate = document.createElement('p');
    pDate.classList.add('card__date');
    const date = new Date(newsItem.publishedAt);
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = date.getMonth() + 1 < 10 ? '0' +
      (date.getMonth() + 1) : (date.getMonth() + 1);
    const year = date.getFullYear();
    let hours = Math.floor((date / (1000 * 60 * 60)) % 24);
    hours = hours < 10 ? '0' + hours : hours;
    let mitutes = Math.floor((date / (1000 * 60)) % 60);
    mitutes = mitutes < 10 ? '0' + mitutes : mitutes;

    pDate.textContent = `${day}/${month}/${year}`;

    const pTime = document.createElement('p');
    pTime.classList.add('card__time');
    pTime.textContent = `${hours}:${mitutes}`;

    divCardWrapper.append(pDate, pTime);

    const divAuthor = document.createElement('div');
    divAuthor.classList.add('card__author-wrapper');
    const pAuthor = document.createElement('p');
    pAuthor.classList.add('card__author');
    pAuthor.textContent = newsItem.author ? newsItem.author : '';

    divAuthor.append(pAuthor);
    divBottom.append(divCardWrapper, divAuthor);

    card.append(divContent);
    card.append(divBottom);
    return card;
  });
  if (news.length > 8) {
    const newsArr = news.slice(0, 8);
    template.append(...newsArr);
  } else {
    template.append(...news);
  }
  return template;
};

export default renderCards;
