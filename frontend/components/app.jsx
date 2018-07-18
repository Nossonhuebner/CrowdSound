import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './nav_bar_container';
import Login from './login_form_container';
import SignUp from './sign_up_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modal from './modal';
import Upload from './upload';
import PersonlShow from './user/current_user_show_container';
import ShowUser from './user/user_show_container';
import PlaybackBar from './playback_bar/playback_bar';
import SearchBar from './search';
import ShowTrack from './tracks/show_track';

const splash = () => (
    <div>
      <div className="greeting-container"></div>
    </div>
);

// <SearchBar />


export default () => {
  return (

    <div className="app">
      <ProtectedRoute exact path="/upload" component={Upload}/>
      <ProtectedRoute path="/you" component={PersonlShow}/>

      <NavBar />
      <Modal />
      <Switch>
        <Route path="/users/:userId/:trackId" component={ShowTrack}/>
        <Route exact path = "/" component={splash}/>
        <Route exact path="/users/:userId" component={ShowUser}/>
      </Switch>
      <PlaybackBar />
    </div>
  );
};

// <Route path="/login" component={Login} />
// <Route path="/signup" component={SignUp} />
