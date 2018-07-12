import { RECEIVE_ERRORS } from '../actions/error_actions';
import { RECEIVE_USER } from '../actions/user_actions';
import { OPEN_MODAL } from '../actions/modal_actions';

export default (state = [], action)=> {
  switch (action.type) {
    case RECEIVE_ERRORS:
      return action.errors.responseJSON || [];
    case RECEIVE_USER:
      return [];
    case OPEN_MODAL:
      return [];
    default:
      return state;
  }
};
