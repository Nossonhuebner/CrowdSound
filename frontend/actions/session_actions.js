import * as SessionApiUtil from '../util/session_api_util';
export const RECEIVE_USER = "RECEIVE_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOG_IN_USER = "LOG_IN_USER";
import { receiveErrors } from './error_actions';
import { receiveUser } from './user_actions';


export const logIn = (user) => {
  return (dispatch) => {
    return SessionApiUtil.createSession(user)
    .then(user => dispatch(logInUser(user)), (errors => dispatch(receiveErrors(errors))));
  };
};

export const logOut = () => {
  return dispatch => {
    SessionApiUtil.deleteSession()
    .then(() => dispatch(logOutUser()), (errors => dispatch(receiveErrors(errors))));
  };
};


export const logOutUser = () => ({
  type: LOGOUT_USER
});

export const logInUser = ({user, tracks}) => {
  return ({
    type: LOG_IN_USER,
    user,
    tracks
  });
};
