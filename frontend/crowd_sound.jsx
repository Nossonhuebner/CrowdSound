import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import {Root} from './components/Root';
import { createUser } from './actions/user_actions';

document.addEventListener("DOMContentLoaded", () => {
  const store = configureStore();
  const root = document.getElementById('root');

  if (window.current_user) {

  }
  ReactDOM.render(<Root store={store}/>, root);
});
