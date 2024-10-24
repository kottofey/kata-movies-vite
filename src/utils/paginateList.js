export default function paginateList(list, page, pageSize) {
  const total = list.docs.length;
  const pagesTotal = Math.ceil(total / pageSize);
  let newPage;

  const first = pageSize * (page - 1);
  const last = pageSize * page;

  if (page <= 0) {
    newPage = 1;
  } else if (page > pagesTotal && pagesTotal !== 0) {
    newPage = pagesTotal;
  } else {
    newPage = page;
  }

  return {
    ...list,
    docs: list.docs.slice(first, last),
    page: newPage,
    total,
    pageSize,
  };
}
