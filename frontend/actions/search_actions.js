import { receiveErrors } from './error_actions';
export const RECEIVE_RESULTS = "RECEIVE_RESULTS";
export const REMOVE_RESULTS = "REMOVE_RESULTS";

import * as SearchApiUtil from '../util/search_api_util';

export const search = (params) => dispatch => {
  return SearchApiUtil.search(params)
  .then(results => dispatch(receiveResults(results)), (errors => dispatch(receiveErrors(errors))));
};

export const receiveResults = (results) => {
  return {
    type: RECEIVE_RESULTS,
    tracks: results.tracks,
    users: results.users
  };
};

export const wipeState = () => {
  return {
    type: REMOVE_RESULTS,
  };
};
