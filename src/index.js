
import * as searchApi from './search-api.js';
import { createImageCard } from './gallery.js'
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more');

export const galleryElement = document.querySelector('.gallery');

let page = 1;
let searchQuery = '';

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    alert('Please enter a search query');
    return;
  }

  clearGallery();
  page = 1; 
  await performSearch();
});

loadMoreBtn.addEventListener('click', async function () {
  await performSearch();
});


async function performSearch() {
  try {
    const data = await searchApi.searchImages(searchQuery, page);

    if (data.hits.length < 40 && data.hits.length === 0 && page === 1 ) {

      hideLoadMoreBtn();
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      return;
    } else {
      showLoadMoreBtn();
      page += 1;

      data.hits.forEach(image => {
        createImageCard(image);
      });

      const lightbox = new SimpleLightbox('.gallery a', {});
      lightbox.refresh();

      displayTotalHits(data.totalHits);
    }
  } catch (error) {
    Notiflix.Notify.failure('Error fetching images. Please try again later.');
    console.error('Error fetching images:', error);
  }
}

function clearGallery() {
  galleryElement.innerHTML = '';
}

function showLoadMoreBtn() {
  console.log('Showing Load More Button');
  loadMoreBtn.style.display = 'block';
}

 function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
  console.log('Hiding Load More Button');
}

function displayTotalHits(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}
