export const RECEIVE_NEW_TRACK = "RECEIVE_NEW_TRACK";
export const RECEIVE_TRACK = "RECEIVE_TRACK";
export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const REMOVE_TRACK = "REMOVE_TRACK";
import * as TracksApiUtil from '../util/track_api';
import { receiveErrors } from './error_actions';

export const uploadTrack = (track) => dispatch => {
  return TracksApiUtil.createUpload(track)
  .then(track => dispatch(receiveNewTrack(track)), errors => dispatch(receiveErrors(errors)));
};

export const fetchTrack = id => dispatch => {
  return TracksApiUtil.fetchTrack(id)
  .then(track => dispatch(receiveTrack(track)), errors => dispatch(receiveErrors(errors)));
};

export const deleteTrack = (id) => dispatch => {
  return TracksApiUtil.deleteTrack(id)
  .then(() => dispatch(removeTrack(id)), errors => dispatch(receiveErrors(errors)));
};

export const incrementPlays = (id) => dispatch => {
  return TracksApiUtil.incrementPlays(id)
  .then(() => dispatch(receiveTrack(track)), errors => dispatch(receiveErrors(errors)));
};


// export const fetchTracks = (userId) => dispatch => {
//   return TracksApiUtil.fetchTracks(userId)
//   .then(tracks => dispatch(receiveTracks(tracks)));
// };

export const addToAlbum = (trackId, albumId) => {
  return TracksApiUtil.addToAlbum(trackId, albumId)
  .then(track => dispatch(receiveTrack(track)), errors => dispatch(receiveErrors(errors)));
};



export const removeTrack = (track) => ({
  type: REMOVE_TRACK,
  track
});

export const receiveNewTrack = ({track, user, comments}) => {
  return {type: RECEIVE_NEW_TRACK, track, user, comments};
};

export const receiveTrack = ({track, user, comments}) => {
  return {type: RECEIVE_TRACK, track, user, comments};
};

export const receiveTracks = (tracks) => {
  return {type: RECEIVE_TRACK, tracks};
};
