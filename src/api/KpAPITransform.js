export default function KpAPITransform(res) {
  let respObj = {};

  if (res.altKP) {
    respObj.docs = res.films.map((movie) => ({
      id: movie.filmId,
      name: movie.nameRu || movie.nameEn,
      year: Number.parseInt(movie.year, 10),
      description: movie.description,
      poster: {
        url: movie.posterUrl || '',
        previewUrl: movie.posterUrlPreview || '',
      },
      rating: {
        kp: Number.parseFloat(movie.rating),
      },
      tags: movie.genres.map((genre) => genre.genre),
    }));

    respObj = {
      docs: respObj.docs,
      total: res.searchFilmsCountResult,
      altKP: true,
      page: res.page,
    };

    return respObj;
  }

  respObj.docs = res.docs.map((movie) => ({
    id: movie.id,
    name: movie.name || movie.alternativeName,
    year: movie.year,
    description: movie.description,
    poster: { ...movie.poster } || '',
    rating: {
      kp: movie.rating.kp,
      imdb: movie.rating.imdb,
      filmCritics: movie.rating.filmCritics,
      russianFilmCritics: movie.rating.russianFilmCritics,
    },
    tags: movie.genres.map((genre) => genre.name),
  }));

  respObj = {
    docs: respObj.docs,
    page: res.page,
    total: res.total,
  };

  return respObj;
}
