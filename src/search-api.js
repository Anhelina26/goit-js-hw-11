//search-api.js
import axios from 'axios';

export async function searchImages(query, page = 1) {
  const apiKey = '40892226-0964c3c4ef20d056d0d6e44f5';
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching images from the API:', error);
    throw error;
  }
}
