import React from 'react';
import { Route } from 'react-router-dom';
import Greeting from './greeting_container';
import Login from './login_form_container';
import SignUp from './sign_up_form_container';
import { AuthRoute } from '../util/route_util';
import Modal from './modal';
import Upload from './upload';

export default () => {
  return (
    <div className="greeting-container">
      <Greeting />
      <Modal />
      <Upload />

    </div>
  );
};

// <Route path="/login" component={Login} />
// <Route path="/signup" component={SignUp} />
