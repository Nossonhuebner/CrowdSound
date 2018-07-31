
export const createLike = (trackId) => {
  return $.ajax({
    method: 'POST',
    url: `/api/tracks/${trackId}/likes`
  });
};

export const destroyLike = (trackId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/tracks/${trackId}/likes/1`
  });
};
