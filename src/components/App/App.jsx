import { Input, Tabs, Alert, Radio } from 'antd';
import { Component } from 'react';
import { debounce } from 'lodash';

import MoviesList from '../MoviesList';
import updateCustomRating from '../../utils/updateCustomRating';
import KinopoiskAPI from '../../api/KinopoiskAPI';
import AltKinopoiskAPI from '../../api/AltKinopoiskAPI';
import paginateList from '../../utils/paginateList';
import KpAPITransform from '../../api/KpAPITransform';
import {
  IsLoadedContext,
  ErrorContext,
  IsMobileContext,
} from '../../context/Contexts';

export default class App extends Component {
  state = {
    search: '',
    tabSelected: 'search',
    isLoaded: true,
    error: {
      isError: false,
      errorObj: {},
    },
    moviesList: { docs: [] },
    ratedMoviesList: { docs: [] },
    api: 'KP',
  };

  kpAPI = new KinopoiskAPI();

  componentDidMount() {
    const ratedMoviesList = JSON.parse(
      localStorage.getItem('ratedMoviesList')
    ) || { docs: [], pageSize: 6 };

    this.setState(() => {
      return {
        ratedMoviesList,
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      search,
      moviesList: { pageSize = 12, page },
      tabSelected,
      ratedMoviesList,
      api,
    } = this.state;

    const {
      search: prevSearch,
      moviesList: { page: prevPage, pageSize: prevPageSize },
      tabSelected: prevTabSelected,
      api: prevApi,
    } = prevState;

    if (api !== prevApi) {
      if (api === 'KP') {
        this.kpAPI = new KinopoiskAPI();
      } else if (api === 'altKP') {
        this.kpAPI = new AltKinopoiskAPI();
      }
    }

    if (
      search !== prevSearch ||
      pageSize !== prevPageSize ||
      (page !== prevPage && page) ||
      (tabSelected === 'search' &&
        tabSelected !== prevTabSelected &&
        search.length)
    ) {
      this.kpAPI
        .searchMovies(search, pageSize, page)
        .then((res) => {
          const updList = updateCustomRating(
            KpAPITransform(res),
            ratedMoviesList
          );
          this.setState({
            isLoaded: true,
            moviesList: {
              ...updList,
              page,
              pageSize,
            },
          });
        })
        .catch((e) => {
          this.setState(() => {
            return {
              error: {
                isError: true,
                errorObj: e,
              },
            };
          });
        });
    }
  }

  onSearch = (keyword) => {
    this.setState(({ moviesList }) => {
      return {
        isLoaded: false,
        moviesList: { ...moviesList, page: 1 },
        search: keyword,
      };
    });
  };

  onSearchDebounced = debounce(this.onSearch, 400);

  onRatingChange = (id, rating) => {
    this.setState(({ moviesList, ratedMoviesList }) => {
      const newMoviesList = structuredClone(moviesList);
      const newRatedList = structuredClone(ratedMoviesList);

      const { docs } = newMoviesList;
      let { docs: ratedDocs, page: ratedPage } = newRatedList;

      const idx = docs.findIndex((item) => item.id === id);
      const ratedIdx = ratedDocs.findIndex((item) => item.id === id);

      if (rating === 0) {
        if (idx !== -1) delete docs[idx].customRating;

        const pagesTotal = Math.ceil(
          (newRatedList.docs.length - 1) / newRatedList.pageSize
        );
        ratedPage = ratedPage > pagesTotal ? pagesTotal : ratedPage;

        const updatedRatedList = {
          ...ratedMoviesList,
          docs: [
            ...ratedDocs.slice(0, ratedIdx),
            ...ratedDocs.slice(ratedIdx + 1),
          ],
          page: ratedPage,
          total: newRatedList.docs.length - 1,
        };

        localStorage.setItem(
          'ratedMoviesList',
          JSON.stringify(updatedRatedList)
        );

        return {
          ratedMoviesList: updatedRatedList,
          moviesList: { ...moviesList, docs },
        };
      }

      if (docs[idx]) docs[idx].customRating = rating;

      if (ratedIdx < 0) {
        ratedDocs = [...ratedDocs, docs[idx]];
        ratedPage = 1;
      } else if (docs[idx]) {
        ratedDocs[ratedIdx] = docs[idx];
      } else {
        ratedDocs[ratedIdx].customRating = rating;
      }

      const updatedList = {
        ...ratedMoviesList,
        docs: ratedDocs,
        page: ratedPage,
        pageSize: newRatedList.pageSize,
        total: ratedDocs.length,
      };

      localStorage.setItem(
        'ratedMoviesList',
        JSON.stringify(updatedList)
      );

      return {
        ratedMoviesList: updatedList,
        moviesList: { ...moviesList, docs },
      };
    });
  };

  onPaginationChange = (page, pageSize) => {
    const { tabSelected } = this.state;

    this.setState(({ moviesList, ratedMoviesList }) => {
      if (tabSelected === 'search') {
        return { moviesList: { ...moviesList, pageSize, page } };
      }

      return {
        ratedMoviesList: {
          ...ratedMoviesList,
          pageSize,
          page,
        },
      };
    });
  };

  onTabChange = (tab) => {
    this.setState({
      tabSelected: tab,
    });
  };

  render() {
    const {
      error,
      isLoaded,
      tabSelected,
      moviesList,
      ratedMoviesList,
    } = this.state;

    const { page, pageSize } = ratedMoviesList;

    return (
      <IsMobileContext.Provider value={window.innerWidth < 576}>
        <IsLoadedContext.Provider value={isLoaded}>
          <ErrorContext.Provider value={error}>
            <Radio.Group
              defaultValue='KP'
              size='small'
              buttonStyle='solid'
              onChange={(e) => {
                this.setState(() => {
                  return {
                    api: e.target.value,
                  };
                });
              }}
            >
              <Radio.Button value='KP'>API</Radio.Button>
              <Radio.Button value='altKP'>altAPI</Radio.Button>
            </Radio.Group>
            {error.isError && (
              <Alert
                type='error'
                message={`${error.errorObj.error}. Код ошибки: ${error.errorObj.statusCode}`}
                description={error.errorObj.message}
                closable
                banner
                onClose={() =>
                  this.setState(() => {
                    return {
                      error: { isError: false },
                    };
                  })
                }
                style={{
                  position: 'absolute',
                  zIndex: 1000,
                  width: '100%',
                }}
              />
            )}
            <Tabs
              defaultActiveKey={0}
              centered
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              }}
              onChange={(tab) => this.onTabChange(tab)}
              items={[
                {
                  key: 'search',
                  label: 'Search',
                  children: (
                    <>
                      <Input
                        placeholder='Type to search...'
                        style={{
                          width: '90vw',
                          maxWidth: 990,
                          marginBottom: 18,
                        }}
                        onChange={(e) => {
                          this.onSearchDebounced(e.target.value);
                        }}
                      />
                      <MoviesList
                        moviesList={moviesList}
                        tabSelected={tabSelected}
                        onRatingChange={this.onRatingChange}
                        onPaginationChange={this.onPaginationChange}
                      />
                    </>
                  ),
                },
                {
                  key: 'rated',
                  label: 'Rated',
                  children: (
                    <MoviesList
                      moviesList={paginateList(
                        ratedMoviesList,
                        page,
                        pageSize
                      )}
                      tabSelected={tabSelected}
                      onRatingChange={this.onRatingChange}
                      onPaginationChange={this.onPaginationChange}
                    />
                  ),
                },
              ]}
            />
          </ErrorContext.Provider>
        </IsLoadedContext.Provider>
      </IsMobileContext.Provider>
    );
  }
}
