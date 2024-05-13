import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

async function populateBreeds() {
  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    breedSelect.style.display = 'block';
  } catch (error) {
    console.error(error);
    showError();
  }
}

async function showCatInfo(breedId) {
  try {
    const catData = await fetchCatByBreed(breedId);
    const cat = catData[0];
    const catInfoHTML = `
      <img src="${cat.url}" alt="Cat Image">
      <div>
        <p><strong>Breed:</strong> ${cat.breeds[0].name}</p>
        <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
      </div>
    `;
    catInfo.innerHTML = catInfoHTML;
    catInfo.style.display = 'block';
  } catch (error) {
    console.error(error);
    showError();
  }
}

function showLoader() {
  loader.style.display = 'block';
  breedSelect.style.display = 'none';
  error.style.display = 'none';
  catInfo.style.display = 'none';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showError() {
  error.style.display = 'block';
  breedSelect.style.display = 'none';
  loader.style.display = 'none';
  catInfo.style.display = 'none';
}

// Event listener for breed selection
breedSelect.addEventListener('change', event => {
  const breedId = event.target.value;
  if (breedId) {
    showLoader();
    showCatInfo(breedId).then(hideLoader);
  }
});

// Initialize breeds on page load
showLoader();
populateBreeds().then(hideLoader);
