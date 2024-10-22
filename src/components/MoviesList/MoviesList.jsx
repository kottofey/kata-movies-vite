import { ConfigProvider, Pagination } from 'antd';

import Movie from '../Movie';

export default function MoviesList({
  moviesList,
  error,
  isLoaded,
  isMobile,
  onRatingChange,
  pageSize,
  onPaginationChange,
}) {
  const { docs, altKP } = moviesList;
  return (
    <>
      <div className='moviesList'>
        {docs.map((movie) => {
          const { id } = movie;

          return (
            <Movie
              key={`movie${id}`}
              movie={movie}
              error={error}
              isMobile={isMobile}
              isLoaded={isLoaded}
              onRatingChange={onRatingChange}
            />
          );
        })}
      </div>

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#fff',
            fontFamily: 'Inter UI',
          },
          components: {
            Pagination: {
              itemActiveBg: '#1890FF',
            },
          },
        }}
      >
        <Pagination
          align='center'
          hideOnSinglePage
          pageSizeOptions={altKP ? [20] : [6, 12, 24, 48]}
          pageSize={altKP ? 20 : pageSize}
          defaultCurrent={1}
          total={tabSelected === 'search' && moviesList.total}
          current={moviesList.page}
          style={{ margin: '10px auto' }}
          onChange={(pg, pgSize) => onPaginationChange(pg, pgSize)}
        />
      </ConfigProvider>
    </>
  );
}
