import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";

const galleryElement = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {});

export function createImageCard(image) {
  const cardHTML = `
    <div class="photo-card">
      <a href="${image.largeImageURL}" data-lightbox="gallery">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class='gallery'>
      </a>
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </div>
  `;

  galleryElement.insertAdjacentHTML('beforeend', cardHTML);

  lightbox.refresh();
}

export function displayTotalHits(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

export function clearGallery() {
  galleryElement.innerHTML = '';
}

export function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

export function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}
