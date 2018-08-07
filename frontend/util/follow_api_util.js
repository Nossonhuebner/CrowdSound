export const createFollow = (userId) => {
  return $.ajax({
    method: 'POST',
    url: `/api/users/${userId}/follows`
  });
};

export const destroyFollow = (userId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/users/${userId}/follows/1`
  });
};
