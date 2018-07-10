

export const createUser = (user) => {
  return $.ajax({
    method: 'POST',
    url: '/api/users',
    data: user
  });
};

export const fetchUser = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${id}`
  });
};
