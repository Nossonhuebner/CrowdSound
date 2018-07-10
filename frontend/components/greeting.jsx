import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  const personal = props.currentUser ?
              <div>
                <h2>{`Welcome, ${props.currentUser.username}`}</h2>
                <button onClick={props.logOut}>log out</button>
              </div>
              : <div>
                <Link to="/signup">sign up</Link>
                <br></br>
                <Link to="/login">log in</Link>
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
