import * as SessionApiUtil from '../util/session_api_util';
export const RECEIVE_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_USER = "LOGOUT_USER";
import { receiveErrors } from './error_actions';

export const logIn = (user) => {
  return (dispatch) => {
    return SessionApiUtil.createSession(user)
    .then(user => dispatch(reciveUser(user)), (errors => dispatch(receiveErrors(errors))));
  };
};

export const logOut = () => {
  return dispatch => {
    SessionApiUtil.deleteSession()
    .then(() => logOutUser(), (errors => dispatch(receiveErrors(errors))));
  };
};



export const reciveUser = (user) => ({
  type: RECEIVE_USER,
  user
});

export const logOutUser = () => ({
  type: LOGOUT_USER

});
