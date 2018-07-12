import usersReducer from './users_reducer';
import tracksReducer from './tracks_reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  tracks: tracksReducer,
  users: usersReducer
});
