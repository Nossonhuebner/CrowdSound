import * as SessionApiUtil from '../util/session_api_util';
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const logIn = (user) => {
  return (dispatch) => {
    return SessionApiUtil.createSession(user)
    .then(user => dispatch(reciveUser(user)));
  };
};

export const logOut = () => {
  return dispatch => {
    SessionApiUtil.deleteSession()
    .then(() => logOutUser());
  };
};



export const reciveUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const logOutUser = () => ({
  type: LOGOUT_USER

});
