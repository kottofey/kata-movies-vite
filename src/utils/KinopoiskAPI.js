import KpAPIError from './Errors/KpAPIError';
import NoInternetError from './Errors/NoInternetError';
import KPEmptyResponse from './Errors/KPEmptyResponse';

const KP_API_KEY = 'C3N95B6-J6MMZT5-HX88DKF-BCDKVQ4';

export default class KinopoiskAPI {
  constructor() {
    this.respObj = {};
  }

  searchMovies = async (keyword, pageSize, page) => {
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
    if (response.total === 0) throw new KPEmptyResponse();

    this.respObj.docs = response.docs.map((movie) => ({
      id: movie.id,
      name: movie.name,
      year: movie.year,
      description: movie.description,
      poster: movie.poster,
      altName: movie.alternativeName,
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

  debugSearchMovies = async (keyword) => {
    this.respObj = {
      docs: [
        {
          id: 111,
          name: `Debug Movie ${keyword}`,
          year: 2021,
          description: keyword.repeat(50),
          poster: {
            url: 'https://loremflickr.com/180/280?lock=1',
            previewUrl: 'https://loremflickr.com/360/560?lock=1',
          },
          altName: '111',
          rating: {
            kp: undefined,
            imdb: 9.111,
            filmCritics: undefined,
            russianFilmCritics: undefined,
          },
          tags: ['Tag 111', 'Tag 222', 'Tag 333'],
        },
        {
          id: 222,
          name: `Movie ${keyword}`,
          year: 2022,
          description: keyword.repeat(50),
          poster: {
            url: 'https://loremflickr.com/180/280?lock=2',
            previewUrl: 'https://loremflickr.com/1080/1680?lock=2',
          },
          altName: '222',
          rating: {
            kp: undefined,
            imdb: 9.222,
            filmCritics: undefined,
            russianFilmCritics: undefined,
          },
          tags: ['Tag 444', 'Tag 555', 'Tag 666'],
        },
        {
          id: 333,
          name: `Movie ${keyword}`,
          year: 2023,
          description: keyword.repeat(50),
          poster: {
            url: 'https://loremflickr.com/180/280?lock=3',
            previewUrl: 'https://loremflickr.com/1080/1680?lock=3',
          },
          altName: '333',
          rating: {
            kp: undefined,
            imdb: 9.333,
            filmCritics: undefined,
            russianFilmCritics: undefined,
          },
          tags: ['Tag 777', 'Tag 888', 'Tag 999'],
        },
        {
          id: 444,
          name: `Movie ${keyword}`,
          year: 2024,
          description: keyword.repeat(50),
          poster: {
            url: 'https://loremflickr.com/180/280?lock=4',
            previewUrl: 'https://loremflickr.com/1080/1680?lock=4',
          },
          altName: '444',
          rating: {
            kp: undefined,
            imdb: 9.444,
            filmCritics: undefined,
            russianFilmCritics: undefined,
          },
          tags: ['Tag 101010', 'Tag 111111', 'Tag 121212'],
        },
        {
          id: 555,
          name: `Movie ${keyword}`,
          year: 2021,
          description: keyword.repeat(50),
          poster: {
            url: 'https://loremflickr.com/180/280?lock=5',
            previewUrl: 'https://loremflickr.com/1080/1680?lock=5',
          },
          altName: '555',
          rating: {
            kp: undefined,
            imdb: 9.222,
            filmCritics: undefined,
            russianFilmCritics: undefined,
          },
          tags: ['Tag 111', 'Tag 222', 'Tag 333'],
        },
        {
          id: 666,
          name: `Movie ${keyword}`,
          year: 2022,
          description: keyword.repeat(50),
          poster: {
            url: 'https://loremflickr.com/180/280?lock=6',
            previewUrl: 'https://loremflickr.com/1080/1680?lock=6',
          },
          altName: '666',
          rating: {
            kp: undefined,
            imdb: 9.222,
            filmCritics: undefined,
            russianFilmCritics: undefined,
          },
          tags: ['Tag 444', 'Tag 555', 'Tag 666'],
        },
        {
          id: 777,
          name: `Movie ${keyword}`,
          year: 2023,
          description: keyword.repeat(50),
          poster: {
            url: 'https://loremflickr.com/180/280?lock=7',
            previewUrl: 'https://loremflickr.com/1080/1680?lock=7',
          },
          altName: '777',
          rating: {
            kp: undefined,
            imdb: 9.222,
            filmCritics: undefined,
            russianFilmCritics: undefined,
          },
          tags: ['Tag 777', 'Tag 888', 'Tag 999'],
        },
        {
          id: 888,
          name: `Movie ${keyword}`,
          year: 2024,
          description: keyword.repeat(50),
          poster: {
            url: 'https://loremflickr.com/180/280?lock=8',
            previewUrl: 'https://loremflickr.com/1080/1680?lock=8',
          },
          altName: '888',
          rating: {
            kp: undefined,
            imdb: 9.222,
            filmCritics: undefined,
            russianFilmCritics: undefined,
          },
          tags: ['Tag 101010', 'Tag 111111', 'Tag 121212'],
        },
      ],
      total: 96,
      page: 1,
    };

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    return this.respObj;
  };
}
