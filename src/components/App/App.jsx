import { Input, Tabs, Pagination, ConfigProvider, Rate } from 'antd';
import { useState } from 'react';

import MoviesList from '../MoviesList';
import KinopoiskAPI from '../../utils/KinopoiskAPI';

export default function App() {
  const [search, setSearch] = useState('');
  const [moviesList, setMoviesList] = useState([
    {
      id: 1,
      name: 'Movie 1',
      year: 2021,
      description: 'Description 1',
      poster: {
        url: '',
        previewUrl: '',
      },
      altName: 'null',
      rating: 2.499,
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    },
    {
      id: 2,
      name: 'Movie 2',
      year: 2022,
      description: 'Description 2',
      poster: {
        url: '',
        previewUrl: '',
      },
      altName: 'null',
      rating: 3,
      tags: ['Tag 4', 'Tag 5', 'Tag 6'],
    },
    {
      id: 3,
      name: 'Movie 3',
      year: 2023,
      description: 'Description 3',
      poster: {
        url: '',
        previewUrl: '',
      },
      altName: 'null',
      rating: 5,
      tags: ['Tag 7', 'Tag 8', 'Tag 9'],
    },
    {
      id: 4,
      name: 'Movie 4',
      year: 2024,
      description: 'Description 4',
      poster: {
        url: '',
        previewUrl: '',
      },
      altName: 'null',
      rating: 7,
      tags: ['Tag 10', 'Tag 11', 'Tag 12'],
    },
  ]);
  const [ratedMoviesList, setRatedMoviesList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState({ isError: false });

  // function onError() {
  //   setMoviesList([
  //     {
  //       id: 1,
  //       name: 'null',
  //       year: 0,
  //       description: 'null',
  //       poster: {
  //         url: '',
  //         previewUrl: '',
  //       },
  //       altName: 'null',
  //     },
  //   ]);
  //   setError({ isError: true, errorObj: error });
  //   console.log(`error ${error}`);
  // }
  //
  // async function onSearch(keyword) {
  //   const kpapi = new KinopoiskAPI();
  //   try {
  //     const newList = await kpapi.searchMovies(keyword);
  //
  //     setMoviesList(newList.docs);
  //     setIsLoaded(true);
  //     setSearch(keyword);
  //   } catch (e) {
  //     onError(e.errorObj);
  //   }
  // }

  return (
    <>
      <Tabs
        defaultActiveKey={0}
        centered
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
        // Здесь надо в зависимости от выбранной вкладки вывести
        // фильмы из поисковой строки или из оцененных из state
        onTabClick={(tabId) => console.log(`${tabId} tab selected`)}
        items={[
          {
            key: 'search',
            label: 'Search',
            children: (
              <Input
                placeholder='Type to search...'
                style={{
                  width: '90vw',
                  minWidth: 482,
                  maxWidth: 990,
                  marginBottom: 18,
                }}
              />
            ),
          },
          {
            key: 'rated',
            label: 'Rated',
          },
        ]}
      />
      <MoviesList
        moviesList={moviesList}
        ratedMoviesList={ratedMoviesList}
        error={error}
        isLoaded={isLoaded}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
        }}
      />

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
          defaultCurrent={1}
          total={50}
          itemBg='red'
          style={{ margin: '10px auto' }}
        />
      </ConfigProvider>
    </>
  );
}
