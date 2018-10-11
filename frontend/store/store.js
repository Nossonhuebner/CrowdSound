import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default (defaultState = {}) => {
  // logger
  return createStore(RootReducer, defaultState, applyMiddleware(thunk));
};
