
export const search = (params) => {
  return $.ajax({
    method: 'GET',
    url: `/api/search/${params}`
  });
};
