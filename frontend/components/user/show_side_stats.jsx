import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { incrementPlays } from '../../actions/track_actions';
import { createLike, destroyLike } from '../../actions/like_actions';
import { openModal } from '../../actions/modal_actions';


class UserLikes extends React.Component {


  loaded(e) {
    e.currentTarget.classList.remove("blurred");
    e.currentTarget.classList.add("unblurred");
  }

  render() {
    const trackLIs = this.props.tracks.map(track => {

      let likeButtonCallback;
      let liked = false;
      if (!this.props.currentUser) {
        likeButtonCallback = () => this.props.openModal('login');
      } else if (this.props.currentUser.likedTrackIds.includes(track.id)) {
        liked = true;
        likeButtonCallback = () => this.props.destroyLike(track.id);
      } else {
        likeButtonCallback = () => this.props.likeTrack(track.id);
      }

      // const color = liked ? '#ff5000' : 'black';
      // <button style={{color: color, borderColor: color}} onClick={likeButtonCallback}><i className="fa fa-heart"></i></button>

      return (
        <li className="side-liked-tracks" key={track.id}>
          <div className="blur">
            <img className="side-pic-dummy blurred" src={track.artworkUrl} onLoad={this.loaded.bind(this)} onClick={() => this.props.play(track.id)} />
          </div>
          <Link className="artist"to={`/users/${track.artist_id}`}>{track.artistName}</Link>
          <Link className="title" to={`/users/${track.artist_id}/${track.id}`}>{track.title}</Link>
          <div className="play-count"><i className="fa fa-play"></i>{track.plays}</div>
          <div className="like-count"><i className="fa fa-heart"></i>{track.likerIds.length}</div>
          <div className="repost-count"><i className="fa fa-retweet"></i>{track.reposterIds.length}</div>
          <div className="comment-count"><i className="fa fa-comment"></i>{track.commentIds.length}</div>
        </li>
      );
    });

    const likes = this.props.user.likedTrackIds || [];
    const count = likes.length == 1 ? '1 like' : `${likes.length} likes`;
    return (
      <div id="side-likes">
        <div className="user-side-header">
          <i className="fa fa-heart"></i>
          <div>{count}</div>
        </div>
        <ul className="user-side-ul">
          {trackLIs}
        </ul>
      </div>
    );
  }

}

const mapStateToProps =(state, ownProps)=> {
  const tracks = [];
  const likedTracks = ownProps.user.likedTrackIds ? ownProps.user.likedTrackIds :[];
  for (var i = 0; i < likedTracks.length && i < 5; i++) {
    let track = state.entities.tracks[ownProps.user.likedTrackIds[i]];
    if (track) {
      tracks.push(track);
    }
  }
  return {tracks, currentUser: state.entities.users[state.session.id]};
};

const mapDispatchToProps = dispatch => {
  return {
    play: id => dispatch(incrementPlays(id)),
    likeTrack: trackId => dispatch(createLike(trackId)),
    destroyLike: trackId => dispatch(destroyLike(trackId)),
    openModal: action => dispatch(openModal(action))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLikes);
