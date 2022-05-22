import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Request } from './api';
import {imgMarkup, clearGallery} from './simplelightbox'


const request = new Request();
let pages = 0;

// const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });

refs.form.addEventListener('submit', onSubmitHandler);
refs.btnLoadMore.addEventListener('click', onLoadMoreBtnHandler);

refs.btnLoadMore.hidden = true;

function onSubmitHandler(e) {
  e.preventDefault();
  request.query = e.currentTarget.elements.searchQuery.value;
  refs.btnLoadMore.hidden = true;
  request.resetPage();
    request.fetchPayload().then(({ hits, totalHits }) => {
      Notify.info(`Hooray! We found ${totalHits} images.`);
    if (hits.length === 0) {
      clearGallery();
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }
    pages = Math.ceil(totalHits / hits.length);

    clearGallery();
        imgMarkup(hits);
    if (pages === 1) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      return;
    }
    refs.btnLoadMore.hidden = false;
  });
}

function onLoadMoreBtnHandler() {
  request.fetchPayload().then(({ hits }) => {
      imgMarkup(hits);

    if (pages === request.currentPage()) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      refs.btnLoadMore.hidden = true;
    }
  });
}

const options = {
    rootMargin: "100px",
}
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
           
       }
    });
}, options);

observer.observe(refs.btnLoadMore)