import React from 'react';

class TrackSidebar extends React.Component {

  render() {
    const users = this.props.users.map(user => {
      return (
        <li className="sidebar-li">
          <img className="sidebar-user" src={user.profilePicUrl}></img>
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
