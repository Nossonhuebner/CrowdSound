import React from 'react';
import { connect } from 'react-redux';
import { deleteAlbum } from '../../actions/album_actions';
import TrackItem from '../tracks/track_item';

const albumItem = (props) => {
  const button = (props.album.artist_id === props.currentUserId) ?
    <button onClick={() => props.deleteAlbum(props.album)}>Delete Album</button> : null;

    const albumTracks = [];
    for (var i = 0; i < props.album.trackIds.length; i++) {
      albumTracks.push(props.tracks[props.album.trackIds[i]]);
    }

    const tracks = props.albumTracks.map(track => (
      <TrackItem key={track.id} track={track}/>
    ));
    
  return(
    <li  className="single-Album">
      <img className="album-artwork" src={props.album.albumArtworkUrl}/>
      <ul>
        {tracks}
      </ul>
    </li>
  ) ;
};


const mapStateToProps = state => ({
  tracks: state.entities.tracks,
  currentUserId: state.session.id
});

const mapDispatchToProps = dispatch => {
  return {deleteAlbum: album => dispatch(deleteAlbum(album))};
};

export default connect(mapStateToProps, mapDispatchToProps)(albumItem);
