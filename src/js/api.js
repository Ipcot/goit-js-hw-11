import axios from 'axios';

export class Request {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchPayload() {
    const API_KEY = '27561705-01d67e91a566568adc5cfd7f5';
    const BASE_URL = 'https://pixabay.com/api/';
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    });

    const payload = await axios(`${BASE_URL}?${searchParams}`);

    this.page += 1;
    return payload.data;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }

  currentPage() {
    return this.page - 1;
  }
}
