import * as UsersApiUtil from '../util/users_api_util';
import { receiveErrors } from './error_actions';

export const RECEIVE_USER = "RECEIVE_USER";


export const createUser = (user) => {
  return dispatch => {
    return UsersApiUtil.createUser(user)
    .then(user => dispatch(receiveUser(user)), (errors => dispatch(receiveErrors(errors))));
  };
};



export const fetchUser = (id) => {
  return dispatch => {
    return UsersApiUtil.fetchUser(id)
    .then(payload => dispatch(receiveUser(payload)));
  };
};

export const receiveUser = ({user, tracks}) => {
  debugger
  return ({
    type: RECEIVE_USER,
    user,
    tracks
  });
};
