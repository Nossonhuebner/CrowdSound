import {RECEIVE_USER} from '../actions/user_actions';
import { RECEIVE_TRACK, REMOVE_TRACK } from '../actions/track_actions';
import { LOG_IN_USER } from '../actions/session_actions';
import { RECEIVE_ALBUMS } from '../actions/album_actions';
import { merge } from 'lodash';

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER:
    case LOG_IN_USER:
      return merge({}, state, {[action.user.id]: action.user});
    case RECEIVE_TRACK:
      const user = state[action.track.artist_id];
      user.trackIds.push(action.track.id);
      return merge({}, state, {[user.id]: user});
    case REMOVE_TRACK:
      const newState = merge({}, state);
      const user1 = state[action.track.artist_id];
      const userTracks = user1.trackIds.filter(id => id !== action.track.id);
      newState[user1.id].trackIds = userTracks;
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
