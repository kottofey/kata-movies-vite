import Movie from '../Movie';

export default function MoviesList({ moviesList }) {
  return (
    <div className='moviesList'>
      {moviesList.map((movie) => {
        const { id, name, year, description, poster } = movie;

        return (
          <Movie
            key={id}
            id={id}
            name={name}
            year={year}
            description={description}
            poster={poster || ''}
          />
        );
      })}
    </div>
  );
}
