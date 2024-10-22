import { Input, Tabs, Alert, Button } from 'antd';
import { Component } from 'react';
import { debounce } from 'lodash';

import MoviesList from '../MoviesList';
import updateCustomRating from '../../utils/updateCustomRating';
import KinopoiskAPI from '../../utils/KinopoiskAPI';

export default class App extends Component {
  state = {
    search: '',
    tabSelected: 'search',
    isLoaded: true,
    error: {
      isError: false,
      errorObj: {},
    },
    moviesList: { docs: [], page: 1, pageSize: 6 },
    ratedMoviesList: {},
  };

  kpAPI = new KinopoiskAPI();

  componentDidMount() {
    const ratedMoviesList = JSON.parse(
      localStorage.getItem('ratedMoviesList')
    ) || { docs: [], page: 1, total: 0, pageSize: 6 };
    this.setState({
      ratedMoviesList,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      search,
      moviesList: { pageSize, page },
      tabSelected,
      ratedMoviesList,
    } = this.state;

    const {
      search: prevSearch,
      moviesList: { page: prevPage, pageSize: prevPageSize },
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
            moviesList: { ...updList, page, pageSize },
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

      const { docs, page } = newMoviesList;
      let { docs: ratedDocs } = newRatedList;

      const idx = docs.findIndex((item) => item.id === id);
      const ratedIdx = ratedDocs.findIndex((item) => item.id === id);

      if (rating === 0) {
        delete docs[idx].customRating;
        ratedDocs = [
          ...ratedDocs.slice(0, ratedIdx),
          ...ratedDocs.slice(ratedIdx + 1),
        ];

        localStorage.setItem(
          'ratedMoviesList',
          JSON.stringify({
            ...ratedMoviesList,
            docs: ratedDocs,
            total: ratedDocs.length,
          })
        );

        return {
          ratedMoviesList: {
            ...ratedMoviesList,
            docs: ratedDocs,
            total: ratedDocs.length,
          },
          moviesList: { ...moviesList, docs, page },
        };
      }

      docs[idx].customRating = rating;

      if (ratedIdx < 0) {
        ratedDocs = [...ratedDocs, docs[idx]];
      } else {
        ratedDocs[ratedIdx] = docs[idx];
      }

      localStorage.setItem(
        'ratedMoviesList',
        JSON.stringify({
          ...ratedMoviesList,
          docs: ratedDocs,
          total: ratedDocs.length,
        })
      );

      return {
        ratedMoviesList: {
          ...ratedMoviesList,
          docs: ratedDocs,
          total: ratedDocs.length,
        },
        moviesList: { ...moviesList, docs, page },
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
        ratedMoviesList: { ...ratedMoviesList, page, pageSize },
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
      moviesList,
      ratedMoviesList,
      tabSelected,
    } = this.state;

    return (
      <>
        <Button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          color='danger'
          variant='solid'
        >
          Clear localStorage
        </Button>
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
                    error={error}
                    isLoaded={isLoaded}
                    isMobile={window.innerWidth < 576}
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
                  moviesList={ratedMoviesList}
                  isMobile={window.innerWidth < 576}
                  isLoaded={isLoaded}
                  error={error}
                  tabSelected={tabSelected}
                  onRatingChange={this.onRatingChange}
                  onPaginationChange={this.onPaginationChange}
                />
              ),
            },
          ]}
        />
      </>
    );
  }
}
