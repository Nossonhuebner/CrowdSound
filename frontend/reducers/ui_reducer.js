import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';
import playbackReducer from './playback_reducer'

export default combineReducers({
  modal: modalReducer,
  playback_bar: playbackReducer
});
