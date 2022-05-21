import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Request } from './api';
import imgTemplates from '../hbs/img.hbs'


const request = new Request();

refs.form.addEventListener("submit", onSubmitHandler)
refs.btnLoadMore.addEventListener("click", onLoadMoreBtnHandler)

function onSubmitHandler(e) {
    e.preventDefault();
    request.query = e.currentTarget.elements.searchQuery.value;
    request.resetPage();
    request.fetchPayload().then(imgArray => {
        clearGallery();
        imgMarkup(imgArray);
     });
    

}

function onLoadMoreBtnHandler() {
request.fetchPayload().then(imgMarkup);
}

function imgMarkup(imgArray) {
    refs.gallery.insertAdjacentHTML("beforeend", imgTemplates(imgArray))
}

function clearGallery() {
    refs.gallery.innerHTML = "";
}