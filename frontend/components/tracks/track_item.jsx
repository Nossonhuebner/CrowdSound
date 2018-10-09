import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTrack, addToAlbum, incrementPlays } from '../../actions/track_actions';
import { createLike, destroyLike } from '../../actions/like_actions';
import { createRepost, destroyRepost } from '../../actions/repost_actions';
import { openModal } from '../../actions/modal_actions';
import { openPlaybackBar } from '../../actions/playback_actions';
import { dateFormatter } from '../../util/date_util';
import Waveform from './wavesurfer';


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

    let reposted;
    if (this.props.currentUserId && this.props.track.reposterIds.includes(this.props.currentUserId)) {
      reposted = true;
    } else {
      reposted = false;
    }

    let repostButtonCallback;
    if (!this.props.currentUserId) {
      repostButtonCallback = () => this.props.openModal('login');
    } else if (reposted) {
      repostButtonCallback = (id) => {
        this.props.destroyRepost(this.props.track.id);
        reposted = false;
      };
    } else {
      repostButtonCallback = (id) => {
        this.props.createRepost(this.props.track.id);
        reposted = true;
      };
    }

    const repostColor = reposted ? "#ff5000" : "black";
    const repostBorder = reposted ? "#ff5000" : "";

    const heartColor = liked ? "#ff5000" : "black";
    const likeBorder = liked ? "#ff5000" : "";

    return (
      <li  className="single-track">
        <Waveform src={this.props.track.fileUrl} id={this.props.track.id} grid={"3/2/3/5"} width={550} height={100} className="track-item-wave"/>
        <img className="track-artwork" src={this.props.track.artworkUrl}/>
        <button className="track-item-play" onClick={() => this.props.incrementPlays(this.props.track.id)}></button>
        {button}
        <div className="track-item-buttons">
          <button style={{borderColor: likeBorder}} onClick={() => likeButtonCallback()} className="track-item-like">
            <i className="fa fa-heart" style={{color: heartColor}}></i>
            <div className="like-count" style={{color: heartColor}}>{this.props.track.likerIds.length || 'Like'}</div>
          </button>
          <button style={{borderColor: repostBorder}} onClick={() => repostButtonCallback()}className="track-item-repost">
            <i className="fa fa-retweet" style={{color: repostColor}}></i>
            <div className="like-count" style={{color: repostColor}}>{this.props.track.reposterIds.length || 'Repost'}</div>
          </button>
          <a href={`https://twitter.com/intent/tweet?button_hashtag=CrowdSound&ref_src=twsrc%5Etfw&text=Hey%20check%20out%20this%20awesome%20song%20on%20CrowdSound!&url=${window.location.href}`} className="twitter-hashtag-button track-item-share"><i className="fa fa-share" style={{paddingRight: "6px"}}></i>Share</a><script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </div>
        <Link className="track-item-comment" to={`/users/${this.props.track.artist_id}/${this.props.track.id}`}>
          <button><i className="fa fa-comment"></i><div className="comment-count">{this.props.track.commentIds.length}</div>
          </button>
        </Link>
        <div className="track-item-date">{dateFormatter(this.props.track.created_at)}</div>
        <div className="track-plays"><i className="fa fa-play"></i>  {this.props.track.plays}</div>
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
    createRepost: id => dispatch(createRepost(id)),
    destroyRepost: id => dispatch(destroyRepost(id)),
    likeTrack: trackId => dispatch(createLike(trackId)),
    destroyLike: trackId => dispatch(destroyLike(trackId)),
    openModal: action => dispatch(openModal(action)),
    deleteTrack: track => dispatch(deleteTrack(track)),
    incrementPlays: id => dispatch(incrementPlays(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackItem);
