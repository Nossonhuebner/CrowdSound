import React from 'react';
import { Route } from 'react-router-dom';
import Greeting from './greeting_container';
import Login from './login_form_container';
import SignUp from './sign_up_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modal from './modal';
import Upload from './upload';

const splash = () => (
  <div className="greeting-container"></div>
);

export default () => {
  return (
    <div>
      <ProtectedRoute exact path="/upload" component={Upload}/>
      <Greeting />
      <Modal />
      <AuthRoute exact path = "/" component={splash}/>
    </div>
  );
};

// <Route path="/login" component={Login} />
// <Route path="/signup" component={SignUp} />
