import { RECEIVE_TRACK, REMOVE_TRACK, RECEIVE_TRACKS } from '../actions/track_actions';
import { LOG_IN_USER } from '../actions/session_actions';
import { merge } from 'lodash';
import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_COMMENT } from '../actions/comment_actions';

export default (state = {}, action) => {
  const newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_TRACK:
      delete newState[action.track.id];
      return merge({}, newState, {[action.track.id]: action.track});
    case RECEIVE_USER:
    case LOG_IN_USER:
    case RECEIVE_TRACKS:
      return merge(newState, action.tracks);
    case REMOVE_TRACK:
      delete newState[action.track.id];
      return newState;
    case RECEIVE_COMMENT:
      const track = state[action.comment.trackId];
      track.commentIds.push(action.comment.id);
      return merge(newState, {[track.id]: track});
    default:
      return state;
  }
};
