import {OPEN_MODAL, CLOSE_MODAL} from '../actions/modal_actions';
import { RECEIVE_USER } from '../actions/user_actions'

export default (state = null, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal;
    case RECEIVE_USER:
      return null;
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }


  return state;
};
