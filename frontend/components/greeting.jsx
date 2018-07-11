import React from 'react';
import { Link } from 'react-router-dom';
import {openModal} from '../actions/modal_actions';

export default (props) => {
  const personal = props.currentUser ?
              <div>
                <h2>{`Welcome, ${props.currentUser.username}`}</h2>
                <button onClick={props.logOut}>log out</button>
              </div>
              :<div>
                <button className="signup-button" onClick={() => dispatch(openModal('signup'))}>
                  Signup
                </button>

                <br></br>

                <button className="login-button" onClick={() => dispatch(openModal('login'))}>
                  Login
                </button>
              </div>;

  return (
    <div>
      <header>

        <h1>hey</h1>
        {personal}
      </header>
    </div>
  );
};
