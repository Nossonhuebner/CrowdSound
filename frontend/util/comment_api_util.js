
export const createComment = (trackId, comment) => {
  return $.ajax({
    method: 'POST',
    url: `/api/tracks/${trackId}/comments`,
    data: {comment}
  });
};

export const editComment = (trackId, comment) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/tracks/${trackId}/comments/${comment.id}`,
    data: {comment: comment.body}
  });
};

export const deleteComment = (trackId, comment) => {
  return $.ajax({
    method: 'DESTROY',
    url: `/api/tracks/${trackId}/comments/${comment.id}`,
  });
};
