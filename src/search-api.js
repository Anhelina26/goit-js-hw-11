import axios from 'axios';
import * as gallery from './gallery.js';
import Notiflix from 'notiflix';

let currentPage = 1;

export async function searchImages(query, page = 1) {
  const apiKey = '40892226-0964c3c4ef20d056d0d6e44f5';
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

  // Explicitly hide the button before making the request
  gallery.hideLoadMoreBtn();

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.hits.length === 0 && page === 1) {
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    } else {
      if (page === 1) {
        gallery.hideLoadMoreBtn();
      }

      data.hits.forEach(image => {
        gallery.createImageCard(image);
      });

      gallery.displayTotalHits(data.totalHits);
      gallery.showLoadMoreBtn();
    }
  } catch (error) {
    console.error('Error fetching images:', error);

    gallery.hideLoadMoreBtn();
    Notiflix.Notify.failure('Error fetching images. Please try again later.');
  }
}
