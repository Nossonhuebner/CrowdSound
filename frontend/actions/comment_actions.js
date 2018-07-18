import * as CommentApiUtil from '../util/comment_api_util';
import { receiveErrors } from '../actions/error_actions';
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const  REMOVE_COMMENT = "REMOVE_COMMENT";




export const createComment = (trackId, comment) => dispatch => {
  return CommentApiUtil.createComment(trackId, comment)
  .then(comment => dispatch(receiveComment(comment)), errors => dispatch(receiveErrors(errors)));
};

export const editComment = (trackId, comment) => dispatch => {
  return CommentApiUtil.editComment(trackId, comment)
  .then(comment => dispatch(receiveComment(comment)), errors => dispatch(receiveErrors(errors)));
};

export const deleteComment = (trackId, commentId) => dispatch => {
  return CommentApiUtil.deleteComment(trackId, commentId)
  .then(() => dispatch(removeComment(commentId)), errors => dispatch(receiveErrors(errors)));
};



export const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment
});

export const removeComment = (commentId) => ({
  type: REMOVE_COMMENT,
  commentId
});
