import * as LikeApiUtil from '../util/like_api';
import { receiveTrack } from './track_actions';
import { receiveErrors } from './error_actions';

export const createLike = (trackId) => dispatch => {
  debugger
  return LikeApiUtil.createLike(trackId)
  .then(track => dispatch(receiveTrack(track)), errors => dispatch(receiveErrors(errors)));
};

export const destroyLike = (trackId) => dispatch => {
  debugger
  return LikeApiUtil.destroyLike(trackId)
  .then(track => dispatch(receiveTrack(track)), errors => dispatch(receiveErrors(errors)));
};
