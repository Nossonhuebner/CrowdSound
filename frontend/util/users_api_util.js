

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

export const updateUser = (user) => {
  debugger
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/1`,
    data: user
  });
};
