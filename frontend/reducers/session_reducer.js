import { RECEIVE_CURRENT_USER, LOGOUT_USER } from '../actions/session_actions';

export const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {id: action.user.id};
    case LOGOUT_USER:
      return {id: null};
    default:
      return state;
  }

};
