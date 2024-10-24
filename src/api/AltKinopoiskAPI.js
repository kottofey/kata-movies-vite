import KpAPIError from '../utils/Errors/KpAPIError';
import NoInternetError from '../utils/Errors/NoInternetError';
import KPEmptyResponseError from '../utils/Errors/KPEmptyResponseError';

const KP_API_KEY = 'f82dcc4b-36a2-450c-93b6-e67bb0d0f0b2';

export default class KinopoiskAPI {
  constructor() {
    this.respObj = {};
  }

  BASE_API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.1';

  searchMovies = async (keyword, page) => {
    if (!navigator.onLine)
      throw new NoInternetError('Упс... Нету интернету...');

    if (!keyword) {
      return { docs: [] };
    }

    const url = new URL(
      `${this.BASE_API_URL}/films/search-by-keyword`
    );
    url.searchParams.set('keyword', keyword);
    url.searchParams.set('page', page.toString());

    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-KEY': KP_API_KEY,
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new KpAPIError(
        'KinopoiskAPIError',
        await response.text()
      );
    }

    response = await response.json();
    if (response.total === 0) throw new KPEmptyResponseError();

    this.respObj.docs = response.films.map((movie) => ({
      id: movie.filmId,
      name: movie.nameRu || movie.nameEn,
      year: Number.parseInt(movie.year, 10),
      description: movie.description,
      poster: {
        url: movie.posterUrl || '',
        previewUrl: movie.posterUrlPreview || '',
      },
      rating: {
        kp:
          movie.rating === 'null'
            ? '0'
            : Number.parseInt(movie.rating, 10),
      },
      tags: movie.genres.map((genre) => genre.genre),
    }));

    this.respObj = {
      ...this.respObj,
      total: response.searchFilmsCountResult,
      altKP: true,
      page,
    };
    return this.respObj;
  };
}
