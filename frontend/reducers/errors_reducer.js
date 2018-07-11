import { RECEIVE_ERRORS } from '../actions/error_actions';

export default (state = [], action)=> {
  switch (action.type) {
    case RECEIVE_ERRORS:
      return action.errors.responseJSON;
    default:
      return state;
  }
};
