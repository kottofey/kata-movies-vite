import KpAPIError from './Errors/KpAPIError';
import NoInternetError from './Errors/NoInternetError';
import KPEmptyResponse from './Errors/KPEmptyResponse';

const KP_API_KEY = 'C3N95B6-J6MMZT5-HX88DKF-BCDKVQ4';

export default class KinopoiskAPI {
  constructor() {
    this.respObj = {};
  }

  searchMovies = async (keyword) => {
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

    this.respObj = response.docs.map((movie) => ({
      id: movie.id,
      name: movie.name,
      year: movie.year,
      description: movie.description,
      poster: movie.poster,
      altName: movie.alternativeName,
      rating: movie.rating.kp,
      tags: movie.genres.map((genre) => genre.name),
    }));

    return this.respObj;
  };

  debugSearchMovies = async (keyword) => {
    this.respObj = [
      {
        id: keyword + 111,
        name: `Movie ${keyword}`,
        year: 2021,
        description: keyword.repeat(50),
        poster: {
          url: '',
          previewUrl: '',
        },
        altName: '111',
        rating: 9.111,
        tags: ['Tag 111', 'Tag 222', 'Tag 333'],
      },
      {
        id: keyword + 222,
        name: `Movie ${keyword}`,
        year: 2022,
        description: keyword.repeat(50),
        poster: {
          url: '',
          previewUrl: '',
        },
        altName: '222',
        rating: 9.222,
        tags: ['Tag 444', 'Tag 555', 'Tag 666'],
      },
      {
        id: keyword + 333,
        name: `Movie ${keyword}`,
        year: 2023,
        description: keyword.repeat(50),
        poster: {
          url: '',
          previewUrl: '',
        },
        altName: '333',
        rating: 9.333,
        tags: ['Tag 777', 'Tag 888', 'Tag 999'],
      },
      {
        id: keyword + 444,
        name: `Movie ${keyword}`,
        year: 2024,
        description: keyword.repeat(50),
        poster: {
          url: '',
          previewUrl: '',
        },
        altName: '444',
        rating: 9.444,
        tags: ['Tag 101010', 'Tag 111111', 'Tag 121212'],
      },
    ];
    return this.respObj;
  };
}
