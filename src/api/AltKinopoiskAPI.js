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

    response.altKP = true;
    response.page = page;

    return response;
  };
}
