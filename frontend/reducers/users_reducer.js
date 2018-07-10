import { RECEIVE_CURRENT_USER, RECEIVE_USER} from '../actions/user_actions';
import { merge } from 'lodash';

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, {[action.user.id]: action.user.username});
    case RECEIVE_CURRENT_USER:
      return merge({}, state, {[action.user.id]: action.user.username});
    default:
      return state;
  }
};

export default usersReducer;
