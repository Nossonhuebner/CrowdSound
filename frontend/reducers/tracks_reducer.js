import { RECEIVE_TRACK, REMOVE_TRACK } from '../actions/track_actions';
import { merge } from 'lodash';
import { RECEIVE_USER } from '../actions/user_actions';

export default (state={}, action) => {
  const newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_TRACK:
      return merge({}, state, {[action.track.id]: action.track});
    case RECEIVE_USER:
      return merge(newState, action.tracks);
    case REMOVE_TRACK:
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};
