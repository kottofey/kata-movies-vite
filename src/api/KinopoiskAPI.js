import KpAPIError from '../utils/Errors/KpAPIError';
import NoInternetError from '../utils/Errors/NoInternetError';
import KPEmptyResponseError from '../utils/Errors/KPEmptyResponseError';

const KP_API_KEY = 'C3N95B6-J6MMZT5-HX88DKF-BCDKVQ4';

export default class KinopoiskAPI {
  constructor() {
    this.respObj = {};
  }

  BASE_API_URL = 'https://api.kinopoisk.dev/v1.4';

  searchMovies = async (keyword, pageSize, page) => {
    if (!navigator.onLine)
      throw new NoInternetError('Упс... Нету интернету...');

    if (!keyword) {
      return { docs: [] };
    }

    const url = new URL(`${this.BASE_API_URL}/movie/search`);
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

    return response;
  };
}
