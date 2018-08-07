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
    const borderColor = liked ? "#ff5000" : "";
    const likeText = liked ? "Liked" : "Like";


    const artist = this.props.users[this.props.match.params.userId] || {};
    const banner =
    (<div className="track-show-banner">
      <div className="track-banner-title">{this.props.track.title}</div>
      <div className="track-banner-artist">{artist.username}</div>
      <img className="track-show-artwork" src={this.props.track.artworkUrl}/>
      <button className="track-banner-play" onClick={this.handlePlay.bind(this)}></button>
      <div className="track-banner-date">{dateFormatter(this.props.track.created_at)}</div>
    </div>);

    let comments = [];
    for (var i = 0; i < this.props.track.commentIds.length; i++) {
      const comment  = this.props.comments[this.props.track.commentIds[i]];
      if (comment) {
        comments.unshift(comment);
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


    return (
      <div className="track-show-container">
        {banner}
        <div className="comments-main">
          <div className="comments-container">
            <div className ="track-show-stat-container">
            <CommentForm trackId={this.props.track.id}/>
            <div className="track-show-options">
              <div className="track-show-buttons">
                <button onClick={() => likeButtonCallback()} className="track-show-button"style={{color: heartColor, borderColor: borderColor}}><i className="fa fa-heart"></i>   {likeText}</button>
                <button className="track-show-button"><i className="fa fa-retweet"></i>   Repost</button>
                <button className="track-show-button"><i className="fa fa-share"></i>   Share</button>
              </div>
              <div className="track-show-stats">
                {playsCount}
                {likesCount}
              </div>
            </div>
          </div>
            <div className="under-comment_form">
              <div className="artist-box">
                <Link to={`/users/${artist.id}`}>
                <img className="comments-artist-pic" src={artist.profilePicUrl}/>
                </Link>
                <Link className="comments-artist-name" to={`/users/${artist.id}`}>{artist.username}</Link>
              </div>
              <div className="comments-box">
                  {commentCount}
                <ul className="comments-list">
                  {commentItems}
                </ul>
              </div>
            </div>
          </div>
          <div className="comments-sidebar"></div>
        </div>
      </div>
    );
  }


}

const mapStateToProps = (state, ownProps) => {
  const track = state.entities.tracks[ownProps.match.params.trackId] || {commentIds: [], likerIds: []};
  const users = state.entities.users;
  const comments = state.entities.comments;
  const currentUserId = state.session.id;
  let currentlyPlayingId = null;
  if (state.ui.playback_bar){
    currentlyPlayingId = state.ui.playback_bar.id;
  }
  return {track, users, comments, currentUserId, currentlyPlayingId};
};


const mapDistpatchToProps = (dispatch) => ({
  incrementPlays: (id) => dispatch(incrementPlays(id)),
  openModal: () => dispatch(openModal('login')),
  likeTrack: (trackId) => dispatch(createLike(trackId)),
  destroyLike: (trackId) => dispatch(destroyLike(trackId)),
  fetchTrack: id => dispatch(fetchTrack(id)),
  openPlaybackBar: track => dispatch(openPlaybackBar(track))
});

export default connect(mapStateToProps, mapDistpatchToProps)(ShowTrack);
