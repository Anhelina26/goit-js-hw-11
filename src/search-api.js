import axios from 'axios';
import * as gallery from './gallery.js';
import Notiflix from 'notiflix';

let currentPage = 1;

export async function searchImages(query, page = 1) {
  const apiKey = '40892226-0964c3c4ef20d056d0d6e44f5';
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (page === 1) {
      gallery.hideLoadMoreBtn();
    }

    if (data.hits.length === 0 && page > 1) {
      gallery.hideLoadMoreBtn();
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    } else {
      data.hits.forEach(image => {
        gallery.createImageCard(image);
      });

      gallery.displayTotalHits(data.totalHits);
      gallery.showLoadMoreBtn();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
