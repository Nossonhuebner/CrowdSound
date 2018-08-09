import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ShowUser from './show_user';
import { fetchUser } from '../../actions/user_actions';


class RandomUser extends React.Component {

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.userId !== this.props.match.params.userId) {
      this.props.fetchUser(newProps.match.params.userId);
    }
  }

  render() {
    return (
      <ShowUser user={this.props.user} userTracks={this.props.userTracks} isCurrentUser={false} />
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const user = state.entities.users[ownProps.match.params.userId] || { trackIds: [], albumIds: [], followerIds: [], followeeIds: []};
  let userTracks = [];
  for (let i = 0; i < user.trackIds.length; i++) {
    const track = state.entities.tracks[user.trackIds[i]];
    if (track){
      userTracks.push(track);
    }
  }
  //
  // let userAlbums = [];
  // for (let i = 0; i < user.albumIds.length; i++) {
  //   const album = state.entities.albums[user.albumIds[i]];
  //   if (album) {
  //     userAlbums.push(album);
  //   }
  // }
  return { user, userTracks };
};

const mapDispatchToProps = dispatch => {
  return {fetchUser: id => dispatch(fetchUser(id))};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RandomUser));
