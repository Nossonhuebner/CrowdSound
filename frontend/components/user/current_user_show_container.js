import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { deleteTrack } from '../../actions/track_actions';
import ShowUser from './show_user';


const mapStateToProps = (state) => {
  const user = state.entities.users[state.session.id];
  const isCurrentUser = true;

  let userTracks = [];
  for (let i = 0; i < user.trackIds.length; i++) {
    userTracks.push(state.entities.tracks[user.trackIds[i]]);
  }

  let userAlbums = [];
  for (let i = 0; i < user.albumIds.length; i++) {
    userAlbums.push(state.entities.albums[user.albumIds[i]]);
  }

  return { user, userTracks, userAlbums, isCurrentUser };
};


const mapDispatchToProps = (dispatch) => ({
  deleteTrack: (id) => dispatch(deleteTrack(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowUser));
