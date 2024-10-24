import { ConfigProvider, Empty, Pagination } from 'antd';

import Movie from '../Movie';

export default function MoviesList({
  moviesList,
  error,
  isLoaded,
  isMobile,
  onRatingChange,
  onPaginationChange,
}) {
  const { docs, altKP, page = 1, pageSize = 12, total } = moviesList;
  if (!docs.length)
    return (
      <Empty
        description='No Movies Here'
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
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
          hideOnSinglePage={false}
          showSizeChanger
          pageSizeOptions={altKP ? [20] : [6, 12, 24, 48]}
          pageSize={altKP ? 20 : pageSize}
          defaultCurrent={1}
          total={total}
          current={page}
          style={{ margin: '10px auto' }}
          onChange={(pg, pgSize) => onPaginationChange(pg, pgSize)}
        />
      </ConfigProvider>
    </>
  );
}
