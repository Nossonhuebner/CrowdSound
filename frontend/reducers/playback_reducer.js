import { OPEN_PLAYBACK_BAR } from '../actions/playback_actions';
import { merge } from 'lodash';

export default (state = null, action) => {
  switch (action.type) {
    case OPEN_PLAYBACK_BAR:
      return merge({}, action.track);
    default:
      return state;
  }
}
