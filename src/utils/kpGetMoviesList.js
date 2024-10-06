const KP_API_KEY = 'C3N95B6-J6MMZT5-HX88DKF-BCDKVQ4';

async function kpGetMoviesList(keyword) {
  if (!keyword) {
    console.log('Empty request!');
    return [];
  }

  const url = new URL('https://api.kinopoisk.dev/v1.4/movie/search');
  url.searchParams.set('query', keyword);
  url.searchParams.set('limit', '6');
  url.searchParams.set('page', '1');

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-API-KEY': KP_API_KEY,
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    console.log(`Error! Response code: ${response.status}`);
  }
  return response.json();
}

export default kpGetMoviesList;
