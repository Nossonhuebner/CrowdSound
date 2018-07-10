import * as UsersApiUtil from '../util/users_api_util';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
// export const RECEIVE_USERS = "RECEIVE_USERS";


export const createUser = (user) => {
  return dispatch => {
    return UsersApiUtil.createUser(user)
    .then(user => dispatch(receiveCurrentUser(user)));
  };
};



export const fetchUser = (id) => {
  return dispatch => {
    return UsersApiUtil.fetchUser(id)
    .then(user => dispatch(receiveUser(user)));
  };
};

export const receiveUser = (user) => {
  return ({
    type: RECEIVE_USER,
    user
  });
};

export const receiveCurrentUser = (user) => {
  return ({
    type: RECEIVE_CURRENT_USER,
    user
  });
};


// export const fetchUsers = () => {
//
// };
//
// export const receiveUsers = () => {
//
// };
