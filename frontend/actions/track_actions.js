export const RECEIVE_TRACK = "RECEIVE_TRACK";
export const REMOVE_TRACK = "REMOVE_TRACK";
import * as TracksApiUtil from '../util/track_api';
import { receiveErrors } from './error_actions';

export const uploadTrack = (track) => dispatch => {
  debugger
  return TracksApiUtil.createUpload(track)
  .then(track => dispatch(receiveTrack(track)), errors => dispatch(receiveErrors(errors)));
};

export const deleteTrack = (id) => dispatch => {
  return TracksApiUtil.deleteTrack(id)
  .then(() => dispatch(removeTrack(id)), errors => dispatch(receiveErrors(errors)));
};



export const removeTrack = (id) => ({
  type: removeTrack,
  id
});

export const receiveTrack = (track) => {
  return {type: RECEIVE_TRACK, track};
};
