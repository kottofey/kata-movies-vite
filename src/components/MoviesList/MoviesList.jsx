import { ConfigProvider, Pagination } from 'antd';

import Movie from '../Movie';

export default function MoviesList({
  moviesList,
  error,
  isLoaded,
  isMobile,
  onRatingChange,
  pageSize,
  tabSelected,
  onPaginationChange,
}) {
  const { docs } = moviesList;
  return (
    <>
      <div
        className='moviesList'
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '90vw',
          maxWidth: 1010,
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
          pageSizeOptions={[6, 12, 24, 48]}
          pageSize={pageSize}
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
