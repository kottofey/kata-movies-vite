import obj from './debugApiReturn.json';

export default class KinopoiskAPI {
  constructor() {
    this.respObj = {};
  }

  searchMovies = async () => {
    const DEBUG_DELAY = 0;

    await new Promise((resolve) => {
      setTimeout(resolve, DEBUG_DELAY);
    });
    this.respObj.docs = obj.docs.map((movie) => ({
      id: movie.id,
      name: movie.name || movie.alternativeName,
      year: movie.year,
      description: movie.description,
      poster: {
        ...(movie.poster || {
          url: 'https://s00.yaplakal.com/pics/pics_original/9/5/7/17917759.jpg',
        }),
      },
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
      total: obj.total,
      page: obj.page,
    };

    return this.respObj;
  };
}
