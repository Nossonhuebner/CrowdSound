import {RECEIVE_USER} from '../actions/user_actions';
import { RECEIVE_TRACK } from '../actions/track_actions';
import { merge } from 'lodash';

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, {[action.user.id]: action.user});
    // case RECEIVE_TRACK:
    //   const user = state[action.track.artistId];
    //   user.trackIds.push(action.track.id);
    //   return merge({}, state, {[user.id]: user});
    default:
      return state;
  }
};

export default usersReducer;
