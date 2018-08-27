import {RECEIVE_RESULTS, REMOVE_RESULTS }from '../actions/search_actions';
import {RECEIVE_ERRORS} from '../actions/error_actions';
const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case "RECEIVE_RESULTS":
      return {tracks: action.tracks, users: action.users};
    case REMOVE_RESULTS:
    case RECEIVE_ERRORS:
      return {};
    default:
      return state;
  }
};

export default searchReducer;
