import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TrackItem from '../tracks/track_item';
import { deleteTrack } from '../../actions/track_actions';

class ShowUser extends React.Component {

  render() {
    const tracks = this.props.userTracks.map(track => (
      <TrackItem key={track.id} track={track} deleteTrack={this.props.deleteTrack}/>
    ));
    return (
      <div>
        <h1 className="test">{this.props.currentUser.username}</h1>
        <ul>
          {tracks}
        </ul>
      </div>

    );
  }

}

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.entities.users[state.session.id];
  let userTracks = [];
  for (let i = 0; i < currentUser.trackIds.length; i++) {
    userTracks.push(state.entities.tracks[currentUser.trackIds[i]]);
  }
  return { currentUser, userTracks };
};

const mapDispatchToProps = (dispatch) => ({
  deleteTrack: (id) => dispatch(deleteTrack(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowUser));
