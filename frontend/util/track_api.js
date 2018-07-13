
export const createUpload = (track) => {
  return $.ajax({
    url: '/api/tracks',
    method: 'POST',
    data: track,
    processData: false,
    contentType: false
  });
};

export const deleteTrack = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/tracks/${id}`
  });
};
