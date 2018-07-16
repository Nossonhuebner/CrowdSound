import {OPEN_MODAL, CLOSE_MODAL} from '../actions/modal_actions';
import { RECEIVE_USER } from '../actions/user_actions';
import { LOG_IN_USER } from '../actions/session_actions';

export default (state = null, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal;
    case RECEIVE_USER:
    case CLOSE_MODAL:
    case LOG_IN_USER:
      return null;
    default:
      return state;
  }


  return state;
};
