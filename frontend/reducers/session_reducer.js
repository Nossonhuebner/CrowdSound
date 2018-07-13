import { RECEIVE_USER, LOGOUT_USER, LOG_IN_USER } from '../actions/session_actions';

export const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_USER:
      return {id: null};
    case LOG_IN_USER:
      return {id: action.user.id};
    default:
      return state;
  }

};
