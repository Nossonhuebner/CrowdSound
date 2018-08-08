import React from 'react';
import TrackItem from '../tracks/track_item';
import { fetchUser } from '../../actions/user_actions';
import UserDetail from './user_detail';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createFollow, destroyFollow } from '../../actions/follow_actions';
import { openModal } from '../../actions/modal_actions';




class ShowUser extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    if (this.props.match.path === "/you") {
      this.props.fetchUser(this.props.currentUserId);
    } else {
      this.props.fetchUser(this.props.match.params.userId);
    }
  }


  render () {
    const artist = this.props.user || {followerIds: [], trackIds: []};
    const tracks = this.props.userTracks.map(track => (
      <TrackItem key={track.id} artistName={this.props.user.username} track={track}/>
    ));

    let following;
    if (this.props.currentUserId && artist.followerIds.includes(this.props.currentUserId)) {
      following = true;
    } else {
      following = false;
    }

    let followButtonCallback;
    if (!this.props.currentUserId) {
      followButtonCallback = () => this.props.openModal('login');
    } else if (following) {
      followButtonCallback = () => {
        this.props.destroyFollow(artist.id);
        following = false;
      };
    } else {
      followButtonCallback = () => {
        this.props.createFollow(artist.id);
        following = true;
      };
    }

    const followText = following ? 'Following' : 'Follow';
    const followColor = following ? "#ff5000" : "";
    const followFill = following ? "" : "rgb(255, 80, 0)";

    //
    // const albums = this.props.userAlbums.map(album => (
    //   <AlbumItem key={album.id} album={album} />
    // ));

    // <Route exact path="/users/:userId" component={tracks}/>
    // <Route path="/users/:userId/tracks" component={tracks}/>
    // <Route exact path="/users/:userId/albums" component={albums}/>
    return (


      <div className="show-user-container">

        <UserDetail user={this.props.user}/>
        <div className="user-show-info">
          <div></div>
          <div>
            <button className="user-show-follow" style={{color: followColor, backgroundColor: followFill}} onClick={() => followButtonCallback()}>{followText}</button>
          </div>
        </div>
        <ul style={{width: "830px", "paddingLeft": "1%"}} className="user-show-list">
          {tracks}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUserId: state.session.id
});

const mapDispatchToProps = (dispatch) => ({
  openModal: () => dispatch(openModal('login')),
  createFollow: id => dispatch(createFollow(id)),
  destroyFollow: id => dispatch(destroyFollow(id)),
  fetchUser: id => dispatch(fetchUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShowUser));
