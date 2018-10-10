import * as UsersApiUtil from '../util/users_api_util';
import { receiveErrors } from './error_actions';
import { LOG_IN_USER } from './session_actions';

export const RECEIVE_USER = "RECEIVE_USER";


export const createUser = (user) => {
  return dispatch => {
    return UsersApiUtil.createUser(user)
    .then(user => dispatch(receiveNewUser(user)), (errors => dispatch(receiveErrors(errors))));
  };
};

export const updateUser = (user) => {
  return dispatch => {
    return UsersApiUtil.updateUser(user)
    .then(user => dispatch(receiveUser(user)), (errors => dispatch(receiveErrors(errors))));
  };
}



export const fetchUser = (id) => {
  return dispatch => {
    return UsersApiUtil.fetchUser(id)
    .then(payload => dispatch(receiveUser(payload)));
  };
};

export const receiveUser = ({user, users, tracks}) => {
  return ({
    type: RECEIVE_USER,
    user,
    followers: users.followers,
    followees: users.followees,
    tracks
  });
};

export const receiveNewUser = ({user, tracks}) => {
  return ({
    type: LOG_IN_USER,
    user,
    tracks
  });
};
