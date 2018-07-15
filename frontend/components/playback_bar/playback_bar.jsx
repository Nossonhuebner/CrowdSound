import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openPlaybackBar } from '../../actions/playback_actions';

class PlaybackBar extends React.Component {
  render () {
    debugger
    const track = this.props.playback;
    const display = () => {
      if (!this.props.playback) {
        return "";
      } else {
        return (
          <div className="playback-container">
            <img className="track-artwork" style={{height: "inherit"}}src={track.artworkUrl}/>
            <audio autoplay="true" className="audio-element" controls>
              <source src={track.fileUrl} type="audio/mpeg"/>
            </audio>
            <Link className="playback-link" to={`/users/${track.artist_id}`}>{track.artist.username}</Link>
          </div>
        );
      }
    }
    return (
      <div>
        {display()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  debugger
  return { playback: state.ui.playback_bar};
};

const mapDispatchToProps = (dispatch) => {
  return { openPlaybackBar: (track) => dispatch(openPlaybackBar(track))}
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaybackBar);
