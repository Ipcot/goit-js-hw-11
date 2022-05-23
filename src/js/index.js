import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Request } from './api';
import { imgMarkup, clearGallery } from './markup&SLB';

const request = new Request();
let pages = 0;

refs.form.addEventListener('submit', onSubmitHandler);
refs.btnLoadMore.addEventListener('click', onLoadMoreBtnHandler);
refs.btnLoadMore.hidden = true;

function onSubmitHandler(e) {
  e.preventDefault();

  window.scrollTo({
    top: 10,
    behavior: 'smooth',
  });
  request.query = e.currentTarget.elements.searchQuery.value;
  refs.btnLoadMore.hidden = true;
  request.resetPage();
  request
    .fetchPayload()
    .then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        clearGallery();
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
      }
      pages = Math.ceil(totalHits / hits.length);
      Notify.info(`Hooray! We found ${totalHits} images.`);
      clearGallery();
      imgMarkup(hits);

      if (pages === 1) {
        Notify.info("We're sorry, but you've reached the end of search results.");
        return;
      }
      refs.btnLoadMore.hidden = false;
    })
    .catch(error => Notify.failure(`${error}`));
}

////////////////// load more button (comment infinite scroll to see) //////////////////////

function onLoadMoreBtnHandler() {
  request
    .fetchPayload()
    .then(({ hits }) => {
      imgMarkup(hits);
      toSmoothScroll();
      if (pages === request.currentPage()) {
        Notify.info("We're sorry, but you've reached the end of search results.");
        refs.btnLoadMore.hidden = true;
      }
    })
    .catch(error => Notify.failure(`${error}`));
}

//////////////////////// infinite scroll//////////////////

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      request
        .fetchPayload()
        .then(({ hits }) => {
          imgMarkup(hits);

          if (pages === request.currentPage()) {
            Notify.info("We're sorry, but you've reached the end of search results.");
            refs.btnLoadMore.hidden = true;
          }
        })
        .catch(error => Notify.failure(`${error}`));
    }
  });
}

const options = {
  rootMargin: '200px',
};
const observer = new IntersectionObserver(onEntry, options);

observer.observe(refs.btnLoadMore);

/////////// smooth scroll when press button load more/////////////////////

function toSmoothScroll() {
  const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 0.5,
    behavior: 'smooth',
  });
}
