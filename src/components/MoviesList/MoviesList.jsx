// import kpGetMoviesList from '../../utils/kpGetMoviesList';
import KinopoiskAPI from '../../utils/KinopoiskAPI';
import Movie from '../Movie';

export default function MoviesList({ moviesList, error, isLoaded }) {
  // onMoviesLoaded = async (keyword) => {
  //   const kpapi = new KinopoiskAPI();
  //   try {
  //     const newList = await kpapi.searchMovies(keyword);
  //
  //     this.setState({
  //       moviesList: newList.docs,
  //       isLoaded: true,
  //       search: keyword,
  //     });
  //     console.log(this.state.search);
  //   } catch (e) {
  //     this.onError(e.errorObj);
  //   }
  // };
  //
  // onError = (error) => {
  //   this.setState({
  //     moviesList: [
  //       {
  //         id: 1,
  //         name: 'null',
  //         year: 0,
  //         description: 'null',
  //         poster: {
  //           url: '',
  //           previewUrl: '',
  //         },
  //         altName: 'null',
  //       },
  //     ],
  //     error: { isError: true, errorObj: error },
  //   });
  // };

  return (
    <div
      className='moviesList'
      style={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '0 auto',
        gap: 24,
      }}
    >
      {moviesList.map((movie) => {
        const { id } = movie;

        return (
          <Movie
            key={`movie${id}`}
            movie={movie}
            error={error}
            isLoaded={isLoaded}
          />
        );
      })}
    </div>
  );
}
