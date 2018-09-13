import React from 'react';
import { fetchTrack } from '../../actions/track_actions';
import { openPlaybackBar } from '../../actions/playback_actions';
import { connect } from 'react-redux';
import CommentForm from './comment_form';
import CommentItem from './comment_item';
import { Link } from 'react-router-dom';
import { dateFormatter } from '../../util/date_util';
import { createLike, destroyLike } from '../../actions/like_actions';
import { openModal } from '../../actions/modal_actions';
import { incrementPlays } from '../../actions/track_actions';
import { createFollow, destroyFollow } from '../../actions/follow_actions';
import { createRepost, destroyRepost } from '../../actions/repost_actions';
import Waveform from './wavesurfer';
import TrackLikers from '../sidebars/likers_container';
import TrackReposters from '../sidebars/reposters_container';

class ShowTrack extends React.Component {

  componentDidMount() {
    this.props.fetchTrack(this.props.match.params.trackId);
  }

  handlePlay(e){
    if (this.props.track.id !== this.props.currentlyPlayingId) {
      // this.props.openPlaybackBar(this.props.track);
      this.props.incrementPlays(this.props.track.id);
    }
  }

  render() {
    const artist = this.props.users[this.props.match.params.userId] || {followerIds: [], trackIds: []};

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
    const heartColor = liked ? "#ff5000" : "black";
    const borderColor = liked ? "#ff5000" : "";
    const likeText = liked ? "Liked" : "Like";

    const repostColor = reposted ? "#ff5000" : "black";
    const repostBorderColor = reposted ? "#ff5000" : "";
    const repostText = reposted ? "Reposted" : "Repost";


    const followText = following ? 'Following' : 'Follow';
    const followColor = following ? "#ff5000" : "";
    const followFill = following ? "" : "rgb(255, 80, 0)";

    const banner =
    (<div className="track-show-banner">
      <div className="track-banner-title">{this.props.track.title}</div>
      <Link to={`/users/${artist.id}`} className="track-banner-artist">{artist.username}</Link>
      <img className="track-show-artwork" src={this.props.track.artworkUrl}/>
      <button className="track-banner-play" onClick={this.handlePlay.bind(this)}></button>
      <Waveform src={this.props.track.fileUrl} id={this.props.track.id}/>
      <div className="track-banner-date">{dateFormatter(this.props.track.created_at)}</div>
    </div>);

    let comments = [];
    if (this.props.track.commentIds) {
      for (var i = 0; i < this.props.track.commentIds.length; i++) {
        const comment  = this.props.comments[this.props.track.commentIds[i]];
        if (comment) {
          comments.unshift(comment);
        }
      }
    }

    let commentItems;
      if (comments.length < 1) {
        commentItems = (<h2 className="empty-comments">Seems a little quiet over here</h2>);
      } else {
        commentItems =  comments.map(comment => {
          return <CommentItem key={comment.id} trackId={this.props.track.id} comment={comment} author={this.props.users[comment.userId]}/> ;
        });
      }

      const commentCount = (
        <div className="show-comment-count"><i className="fa fa-comment"></i>
        {comments.length === 1 ? "  1 comment" : `  ${comments.length} comments`}
        </div>
      );

      const likesCount = this.props.track.likerIds.length === 0 ? "" : (
        <div className="show-like-count"><i className="fa fa-heart"></i>
        {`   ${this.props.track.likerIds.length}`}
        </div>
      );
      const playsCount = this.props.track.plays === 0 ? "" : (
        <div className="show-like-count"><i className="fa fa-play"></i>
        {`   ${this.props.track.plays}`}
        </div>
      );

      const reposts = this.props.track.reposterIds ? this.props.track.reposterIds.length : null;
      const repostsCount = (!reposts) ? "" : (
        <div className="show-like-count"><i className="fa fa-retweet"></i>
        {`   ${this.props.track.reposterIds.length}`}
        </div>
      );

    return (
      <div className="track-show-container">
        {banner}
        <div className="comments-main">
          <div className="comments-container">
            <div className ="track-show-stat-container">
            <CommentForm trackId={this.props.track.id}/>
            <div className="track-show-options">
              <div className="track-show-buttons">
                <button onClick={() => likeButtonCallback()}
                  className="track-show-button"
                  style={{color: heartColor, borderColor: borderColor}}>
                  <i className="fa fa-heart"></i>
                  {likeText}
                </button>
                <button onClick={() => repostButtonCallback()}
                  style={{color: repostColor, borderColor: repostBorderColor}}
                  className="track-show-button"><i className="fa fa-retweet"></i>
                  {repostText}
                 </button>
                <a href={`https://twitter.com/intent/tweet?button_hashtag=CrowdSound&ref_src=twsrc%5Etfw&text=Hey%20check%20out%20this%20awesome%20song%20on%20CrowdSound!&url=${window.location.href}`}
                  className="twitter-hashtag-button track-show-button">
                  <i className="fa fa-share"></i>   Share
                </a>
                  <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
              </div>
              <div className="track-show-stats">
                {playsCount}
                {likesCount}
                {repostsCount}
              </div>
            </div>
          </div>
            <div className="under-comment_form">
              <div className="artist-box">
                <Link to={`/users/${artist.id}`}>
                <img className="comments-artist-pic" src={artist.profilePicUrl}/>
                </Link>
                <Link className="comments-artist-name" to={`/users/${artist.id}`}>{artist.username}</Link>
                <div className="track-show-user-stats">
                  <Link className="user-stats-followers" to={`/users/${artist.id}`}><i className="fa fa-users"></i>   {artist.followerIds.length}</Link>
                  <Link className="user-stats-tracks" to={`/users/${artist.id}`}><i className="fa fa-soundcloud"></i>  {artist.trackIds.length}</Link>
                </div>
                <button className="track-show-follow" style={{color: followColor, backgroundColor: followFill}} onClick={() => followButtonCallback()}>{followText}</button>
              </div>
              <div className="comments-box">
                  {commentCount}
                <ul className="comments-list">
                  {commentItems}
                </ul>
              </div>
            </div>
          </div>
          <div className="comments-sidebar">
            <TrackLikers track={this.props.track}/>
            <TrackReposters track={this.props.track}/>
          </div>
        </div>
      </div>
    );
  }


}

const mapStateToProps = (state, ownProps) => {
  const track = state.entities.tracks[ownProps.match.params.trackId] || {commentIds: [], likerIds: [], reposterIds: []};
  const users = state.entities.users;
  const comments = state.entities.comments;
  const currentUserId = state.session.id;
  let currentlyPlayingId = null;
  if (state.ui.playback_bar.playingId) {
    currentlyPlayingId = state.ui.playback_bar.playingId;
  }
  return {track, users, comments, currentUserId, currentlyPlayingId};
};


const mapDistpatchToProps = (dispatch) => ({
  createRepost: id => dispatch(createRepost(id)),
  destroyRepost: id => dispatch(destroyRepost(id)),
  createFollow: id => dispatch(createFollow(id)),
  destroyFollow: id => dispatch(destroyFollow(id)),
  incrementPlays: (id) => dispatch(incrementPlays(id)),
  openModal: () => dispatch(openModal('login')),
  likeTrack: (trackId) => dispatch(createLike(trackId)),
  destroyLike: (trackId) => dispatch(destroyLike(trackId)),
  fetchTrack: id => dispatch(fetchTrack(id)),
  openPlaybackBar: track => dispatch(openPlaybackBar(track))
});

export default connect(mapStateToProps, mapDistpatchToProps)(ShowTrack);
