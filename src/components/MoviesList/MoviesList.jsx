import { Component } from 'react';

// import kpGetMoviesList from '../../utils/kpGetMoviesList';
import KinopoiskAPI from '../../utils/KinopoiskAPI';
import Movie from '../Movie';

export default class MoviesList extends Component {
  state = {
    moviesList: [
      {
        id: 1,
        name: 'null',
        year: 0,
        description: 'null',
        poster: {
          url: '',
          previewUrl: '',
        },
        altName: 'null',
      },
    ],
    isLoaded: false,
    error: {
      isError: false,
      errorObj: {},
    },
  };

  onMoviesLoaded = async (keyword) => {
    const kpapi = new KinopoiskAPI();
    // TODO заменить поисковый запрос на значение из поисковой строки
    try {
      const newList = await kpapi.searchMovies(keyword);

      this.setState({
        moviesList: newList.docs,
        isLoaded: true,
      });
    } catch (e) {
      console.log(e.message);
      this.onError(JSON.parse(e.message));
    }
  };

  onError = (error) => {
    this.setState({
      error: { isError: true, errorObj: error },
    });
  };

  render() {
    const { moviesList, isLoaded, error } = this.state;

    return (
      <div className='moviesList'>
        {moviesList.map((movie) => {
          const { id } = movie;

          return (
            <Movie
              movie={movie}
              key={id}
              isLoaded={isLoaded}
              error={error}
              onMoviesLoaded={this.onMoviesLoaded}
            />
          );
        })}
      </div>
    );
  }
}
