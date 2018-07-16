import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ShowUser from './show_user';
import { fetchUser } from '../../actions/user_actions';


class RandomUser extends React.Component {

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }

  render() {
    return (
      <ShowUser user={this.props.user} userTracks={this.props.userTracks} isCurrentUser={false} />
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const user = state.entities.users[ownProps.match.params.userId] || { trackIds: [] };
  let userTracks = [];
  for (let i = 0; i < user.trackIds.length; i++) {
    userTracks.push(state.entities.tracks[user.trackIds[i]]);
  }
  return { user, userTracks };
};

const mapDispatchToProps = dispatch => {
  return {fetchUser: id => dispatch(fetchUser(id))};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RandomUser));
