import React from 'react';
import { Link } from 'react-router-dom';

class TrackSidebar extends React.Component {

  render() {
    const users = this.props.users.map(user => {
      return (
        <li key={user.id} className="sidebar-li">
          <Link to={`/users/${user.id}`}><img className="sidebar-user" src={user.profilePicUrl}></img></Link>
        </li>
      );
    });

    return (
      <ul className="sidebar-ul">
        {users}
      </ul>
    );
  }
}

export default TrackSidebar;
