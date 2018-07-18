import usersReducer from './users_reducer';
import tracksReducer from './tracks_reducer';
import albumsReducer from './albums_reducer';
import commentsReducer from './comments_reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  users: usersReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  comments: commentsReducer
});
