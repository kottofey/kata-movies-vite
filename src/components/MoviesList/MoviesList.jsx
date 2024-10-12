import Movie from '../Movie';

export default function MoviesList({
  moviesList,
  error,
  isLoaded,
  onRatingChange,
}) {
  const { docs } = moviesList;

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
      {docs.map((movie) => {
        const { id } = movie;

        return (
          <Movie
            key={`movie${id}`}
            movie={movie}
            error={error}
            isLoaded={isLoaded}
            onRatingChange={onRatingChange}
          />
        );
      })}
    </div>
  );
}
