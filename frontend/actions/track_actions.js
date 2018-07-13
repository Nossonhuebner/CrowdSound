export const RECEIVE_TRACK = "RECEIVE_TRACK";
export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const REMOVE_TRACK = "REMOVE_TRACK";
import * as TracksApiUtil from '../util/track_api';
import { receiveErrors } from './error_actions';

export const uploadTrack = (track) => dispatch => {
  return TracksApiUtil.createUpload(track)
  .then(track => dispatch(receiveTrack(track)), errors => dispatch(receiveErrors(errors)));
};

export const deleteTrack = (id) => dispatch => {
  debugger
  return TracksApiUtil.deleteTrack(id)
  .then(() => dispatch(removeTrack(id)), errors => dispatch(receiveErrors(errors)));
};

// export const fetchTracks = (userId) => dispatch => {
//   return TracksApiUtil.fetchTracks(userId)
//   .then(tracks => dispatch(receiveTracks(tracks)));
// };



export const removeTrack = (id) => ({
  type: removeTrack,
  id
});

export const receiveTrack = (track) => {
  return {type: RECEIVE_TRACK, track};
};

export const receiveTracks = (tracks) => {
  return {type: RECEIVE_TRACK, tracks};
};
