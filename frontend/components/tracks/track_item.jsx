import React from 'react';
import { connect } from 'react-redux';
import { deleteTrack } from '../../actions/track_actions';

const trackItem = ({track, deleteTrack, currentUserId}) => {
  const button = (track.artist_id === currentUserId) ?
    <button onClick={() => deleteTrack(track.id)}>Delete Track</button> :
      null;

  return(
    <li className="single-track">
      <div>{track.title}</div>
      <audio controls>
        <source src={track.fileUrl} type="audio/mpeg"/>
      </audio>
      {button}
    </li>
  ) ;
};

const mapStateToProps = state => ({
  currentUserId: state.session.id
});

const mapDispatchToProps = dispatch => ({
  deleteTrack: (id) => dispatch(deleteTrack(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(trackItem);
