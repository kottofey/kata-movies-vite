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
