import React from 'react';
import { fetchTrack } from '../../actions/track_actions';
import { openPlaybackBar } from '../../actions/playback_actions';
import { connect } from 'react-redux';
import CommentForm from './comment_form';
import CommentItem from './comment_item';


class ShowTrack extends React.Component {

  componentDidMount() {
    this.props.fetchTrack(this.props.match.params.trackId);
  }

  render() {
    debugger
    const artist = this.props.users[this.props.track.artist_id];
    const banner =
    (<div className="track-show-banner">
      <div className="track-banner-title">{this.props.track.title}</div>
      <div className="track-banner-artist">{artist.username}</div>
      <img className="track-show-artwork" src={this.props.track.artworkUrl}/>
      <button className="track-banner-play" onClick={() => this.props.openPlaybackBar(this.props.track)}></button>
      <div className="track-banner-date">date</div>
    </div>);

    let comments = [];
    for (var i = 0; i < this.props.track.commentIds.length; i++) {
      const comment  = this.props.comments[this.props.track.commentIds[i]];
      if (comment) {
        comments.push(comment);
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


    return (
      <div className="track-show-container">
        {banner}
        <div className="comments-container">
        <CommentForm trackId={this.props.track.id}/>

        <ul className="comments=list">
          {commentItems}
        </ul>
        </div>
      </div>
    );
  }


}

const mapStateToProps = (state, ownProps) => {
  const track = state.entities.tracks[ownProps.match.params.trackId];
  const users = state.entities.users;
  const comments = state.entities.comments;

  return {track: track, users: users, comments};
};


const mapDistpatchToProps = (dispatch) => ({
  fetchTrack: id => dispatch(fetchTrack(id)),
  openPlaybackBar: track => dispatch(openPlaybackBar(track))
});

export default connect(mapStateToProps, mapDistpatchToProps)(ShowTrack);
