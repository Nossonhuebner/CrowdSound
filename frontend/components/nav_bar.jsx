import React from 'react';
import { Link } from 'react-router-dom';
import {openModal} from '../actions/modal_actions';
import { logIn } from '../actions/session_actions';
import Upload from './upload';
import SearchBar from './search';

export default (props) => {
  const personal = props.currentUser ?
              <div>
                <h2 className="welcome">{`${props.currentUser.username}`}</h2>
                <Link className="upload-link" to="/upload">Upload</Link>
                <Link className="upload-link" to="/you">You</Link>
                <button className="login-button" onClick={props.logOut}>Sign Out</button>
              </div>

              : <div>
                <button className="login-button" onClick={() => dispatch(openModal('login'))}>
                  Sign in
                </button>

                <button className="signup-button" onClick={() => dispatch(openModal('signup'))}>
                  Create account
                </button>

                <button className="signup-button" onClick={() => dispatch(logIn({username: 'Guest', password: 'hunter12'}))}>
                  Demo
                </button>

              </div>;

  return (
    <div className="bar-outer-container">
      <header className='greeting-bar'>
        <h1 className="logo">logo</h1>
        <SearchBar />
          {personal}
      </header>
    </div>
  );
};
