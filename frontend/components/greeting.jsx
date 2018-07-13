import React from 'react';
import { Link } from 'react-router-dom';
import {openModal} from '../actions/modal_actions';
import { logIn } from '../actions/session_actions';
import Upload from './upload';

export default (props) => {
  const personal = props.currentUser ?
              <div>
                <h2 className="welcome">{`${props.currentUser.username}`}</h2>
                <Link className="upload-link" to="/upload">Upload</Link>
                <button className="login-button" onClick={props.logOut}>Sign Out</button>
              </div>

              : <div>
                <button className="login-button" onClick={() => dispatch(openModal('login'))}>
                  Sign in
                </button>

                <button className="signup-button" onClick={() => dispatch(openModal('signup'))}>
                  Create account
                </button>

                <button className="signup-button" onClick={() => dispatch(logIn({user:{username: 'Guest', password: 'hunter12'}}))}>
                  Demo
                </button>

              </div>;

  return (
    <div>
      <header className='greeting-bar'>
        <h1>Logo</h1>

          {personal}
      </header>
    </div>
  );
};
