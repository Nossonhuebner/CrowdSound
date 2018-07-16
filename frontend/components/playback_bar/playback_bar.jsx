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
            <img className="track-artwork" style={{height: "inherit"}} src={track.artworkUrl}/>
            <audio autoPlay="true" className="audio-element" controls>
              <source src={track.fileUrl} type="audio/mpeg"/>
            </audio>
            <Link className="playback-link" to={`/users/${track.artist_id}`}>{artist.username}</Link>
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
  return { playback: state.ui.playback_bar, users: state.entities.users};
};

const mapDispatchToProps = (dispatch) => {
  return { openPlaybackBar: (track) => dispatch(openPlaybackBar(track))}
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaybackBar);
