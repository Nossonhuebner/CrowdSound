
export const createRepost = (trackId) => {
  return $.ajax({
    method: 'POST',
    url: `/api/tracks/${trackId}/reposts`
  });
};

export const destroyRepost = (trackId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/tracks/${trackId}/reposts`
  });
};
