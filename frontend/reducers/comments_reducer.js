import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_TRACK } from '../actions/track_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  const newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_COMMENT:
      return merge(newState, {[action.comment.id]: action.comment});
    case REMOVE_COMMENT:
      delete newState[action.commentId];
      return newState;
    case RECEIVE_TRACK:
      return merge(newState, action.comments);
    default:
      return state;
  }



};
