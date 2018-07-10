import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { Root } from './components/root';
import { createUser } from './actions/user_actions';


document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  const store = configureStore();

  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.createUser = createUser;

  ReactDOM.render(<Root store={store}/>, root);
});
