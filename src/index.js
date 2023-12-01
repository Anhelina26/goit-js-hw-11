import * as searchApi from './search-api.js';
import { createImageCard } from './gallery.js';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more');
export const galleryElement = document.querySelector('.gallery');

let page = 1;
let searchQuery = '';
let hasShownTotalHitsMessage = false;

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    alert('Please enter a search query');
    hideLoadMoreBtn();
    return;
  }

  clearGallery();
  page = 1;
  hasShownTotalHitsMessage = false;

  try {
    while (true) {
      const data = await searchApi.searchImages(searchQuery, page);

      const perPage = 40;
      const totalHits = data.totalHits;
      const totalPages = Math.ceil(totalHits / perPage);

      if (!hasShownTotalHitsMessage) {
        displayTotalHits(totalHits);
        hasShownTotalHitsMessage = true;
      }

      if (page >= totalPages || data.hits.length < perPage) {
        hideLoadMoreBtn();
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        break;
      } else {
        showLoadMoreBtn();
        page += 1;

        data.hits.forEach((image) => {
          createImageCard(image);
        });

        const lightbox = new SimpleLightbox('.gallery a', {});
        lightbox.refresh();
      }
    }
  } catch (error) {
    Notiflix.Notify.failure('Error fetching images. Please try again later.');
    console.error('Error fetching images:', error);
    hideLoadMoreBtn();
  }
});

function clearGallery() {
  galleryElement.innerHTML = '';
}

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('hidden');
  console.log('Showing Load More Button');
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('hidden');
  console.log('Hiding Load More Button');
}

function displayTotalHits(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}
