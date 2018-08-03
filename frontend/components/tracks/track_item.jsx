import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTrack, addToAlbum } from '../../actions/track_actions';
import { createLike, destroyLike } from '../../actions/like_actions';
import { openModal } from '../../actions/modal_actions';
import { openPlaybackBar } from '../../actions/playback_actions';
import { dateFormatter } from '../../util/date_util';

class TrackItem extends React.Component {


  render () {
    const button = (this.props.track.artist_id === this.props.currentUserId) ?
    <button className="track-delete-edit" onClick={() => this.props.deleteTrack(this.props.track)}><i className="fa fa-trash"></i></button>
    : null;

    // const form =
    // <form onSubmit={this.handleSubmit.bind(this)}>
    //   <input onChange={this.updateAlbumName.bind(this)} type="text" placeholder="add to album" value={this.state.albumName}/>
    //   <input type="submit"/>
    // </form>;
    let liked;
    if (this.props.currentUserId && this.props.track.likerIds.includes(this.props.currentUserId)) {
      liked = true;
    } else {
      liked = false;
    }

    let likeButtonCallback;
    if (!this.props.currentUserId) {
      likeButtonCallback = () => this.props.openModal('login');
    } else if (liked) {
      likeButtonCallback = (id) => {
        this.props.destroyLike(this.props.track.id);
        liked = false;
      };
    } else {
      likeButtonCallback = (id) => {
        this.props.likeTrack(this.props.track.id);
        liked = true;
      };
    }

    const heartColor = liked ? "#ff5000" : "black";

    return (
      <li  className="single-track">
        <img className="track-artwork" src={this.props.track.artworkUrl}/>
        <button className="track-item-play" onClick={() => this.props.openPlaybackBar(this.props.track)}></button>
        {button}
        <button onClick={() => likeButtonCallback()} className="track-item-like"><i className="fa fa-heart" style={{color: heartColor}}></i></button>
        <button className="track-item-repost"><i className="fa fa-retweet"></i></button>
        <button className="track-item-share"><i className="fa fa-share"></i></button>
        <Link className="track-item-comment" to={`/users/${this.props.track.artist_id}/${this.props.track.id}`}>
          <button ><i className="fa fa-comment"></i><div className="comment-count">{this.props.track.commentIds.length}</div>
          </button>
        </Link>
        <div className="track-item-date">{dateFormatter(this.props.track.created_at)}</div>
        <div className="track-plays"><i className="fa fa-play"></i>  0</div>
        <div className="track-li-playback">so much emptiness</div>
        <Link className="track-item-artist-link" to={`/users/${this.props.track.artist_id}`}>{this.props.artistName}</Link>
        <Link className="track-item-track-link" to={`/users/${this.props.track.artist_id}/${this.props.track.id}`}>{this.props.track.title}</Link>
      </li>
    ) ;
  }
}


const mapStateToProps = state => ({
  currentUserId: state.session.id
});

const mapDispatchToProps = dispatch => {
  // addToAlbum: (id, albumName) => dispatch(addToAlbum(id, albumName)),
  return {
  likeTrack: trackId => dispatch(createLike(trackId)),
  destroyLike: trackId => dispatch(destroyLike(trackId)),
  openModal: action => dispatch(openModal(action)),
  deleteTrack: track => dispatch(deleteTrack(track)),
  openPlaybackBar: track => dispatch(openPlaybackBar(track))
};
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackItem);
