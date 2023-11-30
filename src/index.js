// index.js
import * as searchApi from './search-api.js';
import { createImageCard } from './gallery.js'
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more');

export const galleryElement = document.querySelector('.gallery');

let currentPage = 1;
let searchQuery = '';



form.addEventListener('submit', async function (event) {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    alert('Please enter a search query');
    return;
  }

   clearGallery();
  currentPage = 1;
  await performSearch();
});

loadMoreBtn.addEventListener('click', async function () {
  await performSearch();
});

async function performSearch() {
  try {
    const data = await searchApi.searchImages(searchQuery, currentPage);

    if (data.hits.length === 0 && currentPage === 1) {
     await hideLoadMoreBtn();
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      return;
    } 
    else {
      if (currentPage === 1) {
      await hideLoadMoreBtn();
      }

      data.hits.forEach(image => {
       createImageCard(image);
      });

      const lightbox = new SimpleLightbox('.gallery a', {});
      lightbox.refresh(); 

      displayTotalHits(data.totalHits);
      showLoadMoreBtn();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    Notiflix.Notify.failure('Error fetching images. Please try again later.');
  }
}
function clearGallery() {
  galleryElement.innerHTML = '';
}

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

async function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

function displayTotalHits(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}
