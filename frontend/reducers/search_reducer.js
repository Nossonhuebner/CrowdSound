import {RECEIVE_RESULTS, REMOVE_RESULTS }from '../actions/search_actions';

const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case "RECEIVE_RESULTS":
      return {tracks: action.tracks, users: action.users};
    case REMOVE_RESULTS:
      return {};
    default:
      return state;
  }
};

export default searchReducer;
