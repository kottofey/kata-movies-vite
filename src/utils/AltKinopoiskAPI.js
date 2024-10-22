import KpAPIError from './Errors/KpAPIError';
import NoInternetError from './Errors/NoInternetError';
import KPEmptyResponseError from './Errors/KPEmptyResponseError';

const KP_API_KEY = 'C3N95B6-J6MMZT5-HX88DKF-BCDKVQ4';

export default class KinopoiskAPI {
  constructor() {
    this.respObj = {};
  }

  BASE_API_URL = 'https://api.kinopoisk.dev/v1.4/movie/search';

  searchMovies = async (keyword, pageSize, page) => {
    if (!navigator.onLine)
      throw new NoInternetError('Упс... Нету интернету...');

    if (!keyword) {
      return { docs: [] };
    }

    const url = new URL(this.BASE_API_URL);
    url.searchParams.set('query', keyword);
    url.searchParams.set('limit', pageSize.toString());
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

    this.respObj.docs = response.docs.map((movie) => ({
      id: movie.id,
      name: movie.name || movie.alternativeName,
      year: movie.year,
      description: movie.description,
      poster: movie.poster || '',
      rating: {
        kp: movie.rating.kp,
        imdb: movie.rating.imdb,
        filmCritics: movie.rating.filmCritics,
        russianFilmCritics: movie.rating.russianFilmCritics,
      },
      tags: movie.genres.map((genre) => genre.name),
    }));

    this.respObj = {
      ...this.respObj,
      total: response.total,
      page: response.page,
    };
    return this.respObj;
  };
}
