import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
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

  clearGallery();
  currentPage = 1; 
  await searchImages(searchQuery);
});

loadMoreBtn.addEventListener('click', async function () {
  currentPage++;
  await searchImages(searchQuery, currentPage);
});

async function searchImages(query, page = 1) {
  const apiKey = '40892226-0964c3c4ef20d056d0d6e44f5';
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.hits.length === 0) {
      Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
    } else {
      data.hits.forEach(image => {
        createImageCard(image);
      });
      displayTotalHits(data.totalHits);
      showLoadMoreBtn();
      
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function createImageCard(image) {
  const cardHTML = `
    <div class="photo-card">
      <a href="${image.largeImageURL}" data-lightbox="gallery">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy class='galery'">
      </a>
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </div>
  `;

  gallery.innerHTML += cardHTML;


  const lightbox = new SimpleLightbox('.gallery a', {});
  lightbox.refresh();
}

function displayTotalHits(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

function clearGallery() {
  gallery.innerHTML = '';
}

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}


