/**
 * @desc Updates movies in search tab if they have custom rating.
 *   Custom rating is taken from rated movies list
 * @param {object} moviesList - list from Search tab
 * @param {object} ratedList - list from Rated tab
 * @return {object} updatedList - Updated with custom ratiungs search tab movies list object
 */
export default function updateCustomRating(moviesList, ratedList) {
  const updatedList = structuredClone(moviesList);
  moviesList.docs.forEach((el1, i) => {
    let ratedEl;

    const isRated = ratedList.docs.some((el2) => {
      ratedEl = el2;
      return el2.id === el1.id;
    });

    if (isRated) {
      updatedList.docs[i] = ratedEl;
    }
  });

  return updatedList;
}
