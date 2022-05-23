import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import imgTemplates from '../hbs/img.hbs';
import { refs } from './refs';

const galleryLigthbox = new SimpleLightbox('.gallery a');

export function imgMarkup(imgArray) {
  refs.gallery.insertAdjacentHTML('beforeend', imgTemplates(imgArray));
  galleryLigthbox.refresh();
}

export function clearGallery() {
  refs.gallery.innerHTML = '';
}
