import React from 'react';
import { Route } from 'react-router-dom';
import Greeting from './greeting_container';
import Login from './login_form_container';
import SignUp from './sign_up_form_container';

export default () => {
  return (
    <div>
      <Greeting />

      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
    </div>
  );
};
