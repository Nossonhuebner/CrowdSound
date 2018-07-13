import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TrackItem from '../tracks/track_item';

class ShowUser extends React.Component {

  render() {
    const tracks = this.props.tracks.map(track => (
      <TrackItem track={track} />
    ));

    return (
      <div>
        <h1>{this.props.currentUser.username}</h1>
        <ul>
          {tracks}
        </ul>
      </div>

    );
  }

}

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.entities.users[state.session.id];
  const tracks = [];
  for (var i = 0; i < currentUser.trackIds.length; i++) {
    tracks.push(state.entities.tracks[currentUser.trackIds[i]]);
  }
  return {currentUser, tracks };
};

export default withRouter(connect(mapStateToProps)(ShowUser));
