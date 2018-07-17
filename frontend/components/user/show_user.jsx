import React from 'react';
import TrackItem from '../tracks/track_item';
import { fetchUser } from '../../actions/user_actions';
import UserDetail from './user_detail';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';



class ShowUser extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.fetchUser(this.props.user.id);
  }


  render () {

    const tracks = this.props.userTracks.map(track => (
      <TrackItem key={track.id} artistName={this.props.user.username} track={track}/>
    ));
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
        <ul style={{width: "62%" , "paddingLeft": "1%"}} className="user-show-list">
          {tracks}
        </ul>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchUser: id => dispatch(fetchUser(id))
});

export default connect(null, mapDispatchToProps)(ShowUser);
