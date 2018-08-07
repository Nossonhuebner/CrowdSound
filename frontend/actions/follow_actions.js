import { receiveUser } from './user_actions';
import { receiveErrors } from './error_actions';
import * as FollowApiUtil from '../util/follow_api_util';

export const createFollow = (id) => dispatch => {
  return FollowApiUtil.createFollow(id)
  .then(user => dispatch(receiveUser(user)), errors => dispatch(receiveErrors(errors)));
};

export const destroyFollow = (id) => dispatch => {
  return FollowApiUtil.destroyFollow(id)
  .then(user => dispatch(receiveUser(user)), errors => dispatch(receiveErrors(errors)));
};
