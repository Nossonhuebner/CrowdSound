import * as repostApiUtil from '../util/repost_api_util';
import { receiveTrack } from './track_actions';
import { receiveErrors } from './error_actions';

export const createRepost = (trackId) => dispatch => {
  return repostApiUtil.createRepost(trackId)
  .then(track => dispatch(receiveTrack(track)), errors => dispatch(receiveErrors(errors)));
};

export const destroyRepost = (trackId) => dispatch => {
  return repostApiUtil.destroyRepost(trackId)
  .then(track => dispatch(receiveTrack(track)), errors => dispatch(receiveErrors(errors)));
};
