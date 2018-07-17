import { RECEIVE_ALBUM, RECEIVE_ALBUMS } from '../actions/album_actions';
import { RECEIVE_USER } from '../actions/user_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  const newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_ALBUM:
      newState[action.album.id] = action.album;
      return newState;
    case RECEIVE_ALBUMS:
    case RECEIVE_USER:
      if (action.albums) {
        const albumIds = Object.keys(action.albums);

        for (var i = 0; i < albumIds.length; i++) {
          newState[albumIds[i]] = action.albums[albumIds[i]];
        }
      }
      return newState;
    default:
      return state;
  }
};
