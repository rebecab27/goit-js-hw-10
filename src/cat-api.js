import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_YyoTf5YAjnCentffLHtxtBZS5zDKINHPe4tzqMqPJTseZUcsHRWrMVJ68cpPxIme';

export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch breeds');
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cat');
  }
}
