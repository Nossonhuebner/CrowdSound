import React from 'react';
import { connect } from 'react-redux';
import { deleteTrack } from '../../actions/track_actions';
import { openPlaybackBar } from '../../actions/playback_actions';

const trackItem = (props) => {
  const button = (props.track.artist_id === props.currentUserId) ?
    <button onClick={() => props.deleteTrack(props.track)}>Delete Track</button> : null;

  return(
    <li  className="single-track">
      <img className="track-artwork" src={props.track.artworkUrl}/>
      <button onClick={() => props.openPlaybackBar(props.track)}>{props.track.title}</button>
      {button}
    </li>
  ) ;
};


const mapStateToProps = state => ({
  currentUserId: state.session.id
});

const mapDispatchToProps = dispatch => {
  return {deleteTrack: track => dispatch(deleteTrack(track)),
  openPlaybackBar: track => dispatch(openPlaybackBar(track))};
};

export default connect(mapStateToProps, mapDispatchToProps)(trackItem);
