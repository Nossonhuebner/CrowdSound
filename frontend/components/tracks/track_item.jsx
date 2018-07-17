import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTrack, addToAlbum } from '../../actions/track_actions';
import { openPlaybackBar } from '../../actions/playback_actions';

class TrackItem extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {albumName: null};
  // }
  //
  //
  // updateAlbumName(e) {
  //   this.setState({albumName: e.currentTarget.value});
  // }
  //
  // handleSubmit(e) {
  //   e.preventDefault();
  //
  //   this.props.addToAlbum(this.props.track.id, this.state.albumName).then(() => {
  //     return this.props.history.push('/');
  //     this.setState({albumName: null});
  //   });
  // }



  render () {
    // const form =
    // <form onSubmit={this.handleSubmit.bind(this)}>
    //   <input onChange={this.updateAlbumName.bind(this)} type="text" placeholder="add to album" value={this.state.albumName}/>
    //   <input type="submit"/>
    // </form>;
    const button = (this.props.track.artist_id === this.props.currentUserId) ?
      <button className="track-delete-edit" onClick={() => this.props.deleteTrack(this.props.track)}>Delete Track</button>
    : null;

    return (
      <li  className="single-track">
        <img className="track-artwork" src={this.props.track.artworkUrl}/>
        <button className="track-item-play" onClick={() => this.props.openPlaybackBar(this.props.track)}></button>
        {button}
        <button className="track-item-like"><i class="fa fa-heart"></i></button>
        <div className="track-item-date">date</div>
        <div className="track-plays"><i class="fa fa-play"></i> 0</div>
        <div className="track-li-playback">so much empty space</div>
        <Link className="track-item-artist-link" to={`/users/${this.props.track.artist_id}`}>{this.props.artistName}</Link>
        <Link className="track-item-track-link" to={`/users/${this.props.track.artist_id}/${this.props.track.id}`}>{this.props.track.title}</Link>
      </li>
    ) ;
  }
}


const mapStateToProps = state => ({
  currentUserId: state.session.id
});

const mapDispatchToProps = dispatch => {
  return {
  addToAlbum: (id, albumName) => dispatch(addToAlbum(id, albumName)),
  deleteTrack: track => dispatch(deleteTrack(track)),
  openPlaybackBar: track => dispatch(openPlaybackBar(track))
};
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackItem);
