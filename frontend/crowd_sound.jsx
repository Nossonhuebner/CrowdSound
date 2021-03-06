import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { Root } from './components/root';
import { createUser } from './actions/user_actions';


document.addEventListener("DOMContentLoaded", () => {
  let store;
  let preloadedState = {};
  if (window.currentUser) {
    preloadedState = {
      entities: {
        users: {[window.currentUser.id]: window.currentUser}
      },
      session: {id: window.currentUser.id}
    };
    delete window.currentUser;
    delete window.currentUserTracks;
  }

  store = configureStore(preloadedState);
  delete window.currentUser;
  const root = document.getElementById('root');

  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.createUser = createUser;

  ReactDOM.render(<Root store={store}/>, root);
});
