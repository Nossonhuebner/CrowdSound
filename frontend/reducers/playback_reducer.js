import { OPEN_PLAYBACK_BAR } from '../actions/playback_actions';
import { RECEIVE_TRACK } from '../actions/track_actions';
import { merge } from 'lodash';

export default (state = null, action) => {
  switch (action.type) {
    case OPEN_PLAYBACK_BAR:
      return merge({}, action.track);
    case RECEIVE_TRACK:
      if (state && state.id === action.track.id) {
        return merge({}, action.track);
      }
      return state;
    default:
      return state;
  }
};
