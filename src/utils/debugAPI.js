export default class KinopoiskAPI {
  constructor() {
    this.respObj = {};
  }

  searchMovies = async (keyword) => {
    const DEBUG_DELAY = 0;

    this.respObj = {
      docs: [
        {
          id: 111,
          name: `Debug Movie ${keyword}`,
          year: 2021,
          description: keyword.repeat(50),
          poster: {
            url: 'https://loremflickr.com/180/280?lock=1',
            previewUrl: 'https://loremflickr.com/720/1120?lock=1',
          },
          altName: '111',
          rating: {
            kp: undefined,
            imdb: 9.111,
            filmCritics: undefined,
            russianFilmCritics: undefined,
          },
          tags: [
            'Tag 111',
            'Tag 2wqeqw22',
            'Tag 3233',
            'Tag x qeqw111',
            'Tag 222',
            'Tag 333',
          ],
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
      setTimeout(resolve, DEBUG_DELAY);
    });

    return this.respObj;
  };
}
