import { OPEN_PLAYBACK_BAR } from '../actions/playback_actions';
import { RECEIVE_TRACK, RECEIVE_TRACKS } from '../actions/track_actions';
import { PREV_TRACK, NEXT_TRACK, SEEK } from '../actions/playback_actions';

import { RECEIVE_USER } from '../actions/user_actions';
import { merge } from 'lodash';

export default (state = {queue: [], queueIdx: null, playingId: null, time: 0}, action) => {
  switch (action.type) {
    case OPEN_PLAYBACK_BAR:
      return {
        queueIdx: state.queue.findIndex((el) => {
          return parseInt(el) === action.track.id;
        }),
        queue: state.queue,
        playingId: action.track.id,
        time: action.time || 0
      };
    case RECEIVE_TRACKS:
    case RECEIVE_USER:
      return merge({}, {
        queueIdx: state.queueIdx,
        queue: Object.keys(action.tracks),
        playingId: state.playingId,
        time: state.time
      });
    case NEXT_TRACK:
      let idx;
      let nextId;
      if (state.queueIdx >= state.queue.length-1) { // checks that new queue is not shorter than old queue
        idx = 0;
        nextId = state.queue[0];
      } else {
        idx = state.queueIdx + 1;
        nextId = state.queue[idx];
      }
      return {
              queueIdx: idx,
              queue: state.queue,
              playingId: nextId,
              time: 0
            };
    case PREV_TRACK:
      if (state.queueIdx === 0) {
        return state;
      }
        const prev = state.queue[state.queueIdx-1] ? state.queue[state.queueIdx-1] : state.queue[state.queueIdx-1]; // checks that current queue length is not less than that of playing track
        return {queueIdx: state.queueIdx-1, queue: state.queue, playingId: prev, time: 0};
      case SEEK:
        return {queueIdx: state.queueIdx, queue: state.queue, playingId: state.playingId, time: action.time};
    default:
      return state;
  }
};
