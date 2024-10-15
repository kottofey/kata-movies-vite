import { Input, Tabs, Alert } from 'antd';
import { Component } from 'react';
import { debounce } from 'lodash';

import MoviesList from '../MoviesList';
import KinopoiskAPI from '../../utils/KinopoiskAPI';
import updateCustomRating from '../../utils/updateCustomRating';

export default class App extends Component {
  state = {
    search: '',
    pageSize: 6,
    tabSelected: 'search',
    isLoaded: true,
    error: {
      isError: false,
      errorObj: {},
    },
    moviesList: { docs: [], total: 0, page: undefined },
    ratedMoviesList: { docs: [], total: 0, page: undefined },
    savedSearch: { docs: [], total: 0, page: undefined },
  };

  kpAPI = new KinopoiskAPI();

  componentDidUpdate(prevProps, prevState) {
    const {
      search,
      pageSize,
      moviesList: { page },
      tabSelected,
      ratedMoviesList,
    } = this.state;

    const {
      search: prevSearch,
      pageSize: prevPageSize,
      moviesList: { page: prevPage },
      tabSelected: prevTabSelected,
    } = prevState;

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
          const updList = updateCustomRating(res, ratedMoviesList);
          this.setState({
            isLoaded: true,
            moviesList: { ...updList, page },
            savedSearch: { ...updList, page: 1 },
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

  onSearchDebounced = debounce(this.onSearch, 1000);

  onRatingChange = (id, r) => {
    this.setState(({ moviesList, ratedMoviesList }) => {
      const newMoviesList = structuredClone(moviesList);
      const newRatedList = structuredClone(ratedMoviesList);

      const { docs, page, total } = newMoviesList;
      let { docs: ratedDocs } = newRatedList;

      const idx = docs.findIndex((item) => item.id === id);
      const ratedIdx = ratedDocs.findIndex((item) => item.id === id);

      if (r === 0) {
        delete docs[idx].customRating;
        return {
          ratedMoviesList: {
            docs: [
              ...ratedDocs.slice(0, ratedIdx),
              ...ratedDocs.slice(ratedIdx + 1),
            ],
            page,
            total,
          },
          moviesList: { docs, page, total },
          savedSearch: { docs, page, total },
        };
      }

      docs[idx].customRating = r;

      if (ratedIdx < 0) {
        ratedDocs = [...ratedDocs, docs[idx]];
      } else {
        ratedDocs[ratedIdx] = docs[idx];
      }

      return {
        ratedMoviesList: { docs: ratedDocs, page, total },
        moviesList: { docs, page, total },
        savedSearch: { docs, page, total },
      };
    });
  };

  onTabClick = (tabId) => {
    if (tabId === 'rated') {
      this.setState(({ moviesList, ratedMoviesList }) => {
        return {
          savedSearch: moviesList,
          moviesList: ratedMoviesList,
          tabSelected: tabId,
        };
      });
    } else {
      this.setState(({ savedSearch }) => {
        return {
          moviesList: savedSearch,
          tabSelected: tabId,
          page: 1,
        };
      });
    }
  };

  onPaginationChange = (pg, pgSize) => {
    this.setState(({ moviesList }) => {
      return {
        moviesList: { ...moviesList, page: pg },
        pageSize: pgSize,
      };
    });
  };

  render() {
    const {
      isLoaded,
      error,
      moviesList,
      ratedMoviesList,
      pageSize,
      tabSelected,
    } = this.state;

    return (
      <>
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
          onTabClick={(tabId) => this.onTabClick(tabId)}
          items={[
            {
              key: 'search',
              label: 'Search',
              children: (
                <Input
                  placeholder='Type to search...'
                  style={{
                    width: '90vw',
                    // minWidth: 482,
                    maxWidth: 990,
                    marginBottom: 18,
                  }}
                  onChange={(e) => {
                    this.onSearchDebounced(e.target.value);
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
          onRatingChange={this.onRatingChange}
          error={error}
          isLoaded={isLoaded}
          isMobile={window.innerWidth < 576}
          pageSize={pageSize}
          tabSelected={tabSelected}
          onPaginationChange={this.onPaginationChange}
        />
      </>
    );
  }
}
