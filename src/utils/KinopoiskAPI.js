import KpAPIError from './Errors/KpAPIError';
import NoInternetError from './Errors/NoInternetError';
import KPEmptyResponse from './Errors/KPEmptyResponse';

const KP_API_KEY = 'C3N95B6-J6MMZT5-HX88DKF-BCDKVQ4';

export default class KinopoiskAPI {
  async searchMovies(keyword) {
    if (!navigator.onLine)
      throw new NoInternetError('Упс... Нету интернету...');

    if (!keyword) {
      console.log('Empty request!');
      return [];
    }

    const url = new URL(
      'https://api.kinopoisk.dev/v1.4/movie/search'
    );
    url.searchParams.set('query', keyword);
    url.searchParams.set('limit', '6');
    url.searchParams.set('page', '1');

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
    if (response.total === 0) throw new KPEmptyResponse();

    return response;
  }
}
