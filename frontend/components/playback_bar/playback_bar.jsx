import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openPlaybackBar } from '../../actions/playback_actions';

class PlaybackBar extends React.Component {

  render () {
    const display = () => {
      if (!this.props.playback) {
        return "";
      } else {

        const track = this.props.playback;
        const artist = this.props.users[this.props.playback.artist_id];

        return (
          <div className="playback-container">
            <img className="playback-track-artwork" style={{height: "inherit"}} src={track.artworkUrl}/>
            <audio autoPlay="true" src={track.fileUrl} className="audio-element" controls controlsList="nodownload">
            </audio>

            <div className="playback-links">
              <Link className="playback-link-artist" to={`/users/${track.artist_id}`}>{artist.username}</Link>
              <Link className="playback-link-track" to={`/users/${track.artist_id}/${track.id}`}>{track.title}</Link>
            </div>
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
  return {
    playback: state.ui.playback_bar,
    users: state.entities.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return { openPlaybackBar: (track) => dispatch(openPlaybackBar(track))}
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaybackBar);
