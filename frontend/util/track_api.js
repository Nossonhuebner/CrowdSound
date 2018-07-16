
export const createUpload = (track) => {
  return $.ajax({
    url: '/api/tracks',
    method: 'POST',
    data: track,
    processData: false,
    contentType: false
  });
};

export const deleteTrack = (track) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/tracks/${track.id}`
  });
};
