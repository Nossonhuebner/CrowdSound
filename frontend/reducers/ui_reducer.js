import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';
import playbackReducer from './playback_reducer';
import searchReducer from './search_reducer';

export default combineReducers({
  search: searchReducer,
  modal: modalReducer,
  playback_bar: playbackReducer
});
