import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Greeting from './greeting_container';
import Login from './login_form_container';
import SignUp from './sign_up_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modal from './modal';
import Upload from './upload';
import PersonlShow from './user/current_user_show_container';
import ShowUser from './user/user_show_container';
import PlaybackBar from './playback_bar/playback_bar';
import SearchBar from './search';

const splash = () => (
  <div className="greeting-container"></div>
);
// <Route path="/:userId/:trackId" to={ShowUserTrack}/>

export default () => {
  return (

    <div className="app">
      <ProtectedRoute exact path="/upload" component={Upload}/>
      <ProtectedRoute path="/you" component={PersonlShow}/>

      <Greeting />
      <Modal />
      <SearchBar />
      <Switch>
        <Route exact path="/users/:userId" component={ShowUser}/>
        <Route exact path = "/" component={splash}/>
      </Switch>
      <PlaybackBar />
    </div>
  );
};

// <Route path="/login" component={Login} />
// <Route path="/signup" component={SignUp} />
