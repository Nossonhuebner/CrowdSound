import React from 'react';
import { Link } from 'react-router-dom';

class UserSide extends React.Component {

  render() {
    const followers =
    <Link className="user-side-following" to={`/users/${this.props.user.id}`}>
      <div >Followers</div>
      <div className="side-count">{this.props.user.followerIds.length}</div>
    </Link>;
    const following =
    <Link className="user-side-following" to={`/users/${this.props.user.id}`}>
      <div>Following</div>
        <div className="side-count">{this.props.user.followeeIds.length}</div>
    </Link>;

    const tracks =
    <Link className="user-side-following"to={`/users/${this.props.user.id}`}>
      <div>Tracks</div>
      <div className="side-count">{this.props.user.trackIds.length}</div>
    </Link>;

    return (
      <div className="user-show-side">
        <div className="user-side-stats">
          {followers}
          {following}
          {tracks}
        </div>
      </div>
    );
  }
}

export default UserSide;
