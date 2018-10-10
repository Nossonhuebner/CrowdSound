import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createLike, destroyLike } from '../../actions/like_actions';
import { openModal } from '../../actions/modal_actions';
import AudioPlayer from './audio_player';



class PlaybackBar extends React.Component {

  render () {
    console.log(this.props);
    const display = () => {
      if (!this.props.playback) {
        return "";
      } else {

        const track = this.props.playback;
        const artist = this.props.users[this.props.playback.artist_id];

        let liked;
        if (this.props.currentUserId && this.props.playback.likerIds.includes(this.props.currentUserId)) {
          liked = true;
        } else {
          liked = false;
        }

        let likeButtonCallback;
        if (!this.props.currentUserId) {
          likeButtonCallback = () => this.props.openModal('login');
        } else if (liked) {
          likeButtonCallback = (id) => {
            this.props.destroyLike(this.props.playback.id);
            liked = false;
          };
        } else {
          likeButtonCallback = (id) => {
            this.props.likeTrack(this.props.playback.id);
            liked = true;
          };

        }
        const heartColor = liked ? "#ff5000" : "black";

        console.log(artist);
        return (
          <div className="playback-container">
            <AudioPlayer source={track.fileUrl}/>
            <div className="playback-links">
              <img className="playback-track-artwork" style={{height: "inherit"}} src={track.artworkUrl}/>
              <Link className="playback-link-artist" to={`/users/${track.artist_id}`}>{track.artistName}</Link>
              <Link className="playback-link-track" to={`/users/${track.artist_id}/${track.id}`}>{track.title}</Link>
            </div>
            <button onClick={() => likeButtonCallback()} className="playback-like"><i className="fa fa-heart" style={{color: heartColor}}></i></button>
          </div>
        );
      }
    };

    return (
      <div>
        {display()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const playback = state.ui.playback_bar.queueIdx !== null ?
  state.entities.tracks[state.ui.playback_bar.playingId] : null;
  return {
    currentUserId: state.session.id,
    playback: playback,
    users: state.entities.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    likeTrack: trackId => dispatch(createLike(trackId)),
    destroyLike: trackId => dispatch(destroyLike(trackId)),
    openModal: action => dispatch(openModal(action)),
  };
  // openPlaybackBar: (track) => dispatch(openPlaybackBar(track))
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaybackBar);
