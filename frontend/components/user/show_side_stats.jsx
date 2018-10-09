import React from 'react';
import { connect } from 'react-redux';


class UserLikes extends React.Component {

  render() {
    const trackLIs = this.props.tracks.map(track => {
      return (
        <li className="side-liked-tracks" key={track.id}>
          <img src={track.artworkUrl} />
          <div>
            <div>{track.title}</div>
            <div>{track.artistName}</div>
            <div>
              <div>{track.plays}</div>
              <div>{track.likerIds.length}</div>
              <div>{track.reposterIds.length}</div>
              <div>{track.commentIds.length}</div>
            </div>
          </div>
        </li>
      );
    });

    return (
      <div>{this.props.user.likedTrackIds.length} likes
        <ul className="user-side-ul">
          {trackLIs}
        </ul>
      </div>
    );
  }

}

const mapStateToProps =(state, ownProps)=> {
  const tracks = [];
  for (var i = 0; i < ownProps.user.likedTrackIds.length && i < 5; i++) {
    let track = state.entities.tracks[ownProps.user.likedTrackIds[i]];
    if (track) {
      tracks.push(track);
    }
  }
  return {tracks};
};

export default connect(mapStateToProps)(UserLikes);
