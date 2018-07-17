
export const fetchAlbum = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/albums/${id}`
  });
};

export const fetchUserAlbums = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/albums`
  });
};

export const createAlbum = (payload) => {
  return $.ajax({
    method: 'GET',
    url: '/api/albums/',
    data: payload
  });
};
