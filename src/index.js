import { searchImages } from './search-api.js';
import * as gallery from './gallery.js';

const form = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more');
let currentPage = 1;
let searchQuery = '';

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    alert('Please enter a search query');
    return;
  }

  gallery.clearGallery();
  currentPage = 1;
  await performSearch();
});

loadMoreBtn.addEventListener('click', async function () {
  await performSearch();
});

async function performSearch() {
  try {
    await searchImages(searchQuery, currentPage);
    currentPage++;
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

