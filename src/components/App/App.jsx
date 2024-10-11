import { Input, Tabs, Pagination, ConfigProvider } from 'antd';
import { Component } from 'react';
import { debounce } from 'lodash';

import MoviesList from '../MoviesList';
import KinopoiskAPI from '../../utils/KinopoiskAPI';
import updateCustomRating from '../../utils/updateCustomRating.js';

export default class App extends Component {
  state = {
    search: '',
    isLoaded: true,
    error: false,
    moviesList: [],
    ratedMoviesList: [],
    savedSearch: [],
    page: 1,
    pages: 50,
  };

  kpAPI = new KinopoiskAPI();

  componentDidUpdate(prevProps, prevState) {
    if (this.state.search !== prevState.search) {
      this.kpAPI
        .debugSearchMovies(this.state.search)
        .then((res) => this.setState({ moviesList: res }));
    }
  }

  onSearch = (keyword) => {
    this.setState({
      search: keyword,
    });
  };

  onSearchDebounced = debounce(this.onSearch, 500);

  onRatingChange = (id, r) => {
    this.setState(({ moviesList, ratedMoviesList }) => {
      const newMoviesList = structuredClone(moviesList);
      let newRatedList = structuredClone(ratedMoviesList);

      const idx = newMoviesList.findIndex((item) => item.id === id);
      const ratedIdx = newRatedList.findIndex(
        (item) => item.id === id
      );

      if (r === 0) {
        delete newMoviesList[idx].customRating;
        return {
          ratedMoviesList: [
            ...newRatedList.slice(0, ratedIdx),
            ...newRatedList.slice(ratedIdx + 1),
          ],
          moviesList: newMoviesList,
        };
      }

      newMoviesList[idx].customRating = r;

      if (ratedIdx < 0) {
        newRatedList = [...newRatedList, newMoviesList[idx]];
      } else {
        newRatedList[ratedIdx] = newMoviesList[idx];
      }

      return {
        ratedMoviesList: newRatedList,
        moviesList: newMoviesList,
      };
    });
  };

  render() {
    const {
      isLoaded,
      error,
      moviesList,
      ratedMoviesList,
      savedSearch,
      pages,
      page,
    } = this.state;

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
          onTabClick={(tabId) => {
            updateCustomRating(moviesList, ratedMoviesList);
            if (tabId === 'rated') {
              this.setState({
                savedSearch: [...moviesList],
                moviesList: [...ratedMoviesList],
              });
            } else {
              this.setState({
                moviesList: [...savedSearch],
              });
            }
          }}
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
            defaultCurrent={3}
            total={pages}
            style={{ margin: '10px auto' }}
            current={page}
            onChange={(pg) => this.setState({ page: pg })}
          />
        </ConfigProvider>
      </>
    );
  }
}
