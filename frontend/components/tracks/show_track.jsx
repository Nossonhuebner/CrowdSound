import React from 'react';
import { fetchTrack } from '../../actions/track_actions';
import { openPlaybackBar } from '../../actions/playback_actions';
import { connect } from 'react-redux';


class ShowTrack extends React.Component {

  componentDidMount() {
    this.props.fetchTrack(this.props.match.params.trackId);
  }

  render() {
    const artist = this.props.users[this.props.track.artist_id];
    const banner =
    <div className="track-show-banner">
      <div className="track-banner-title">{this.props.track.title}</div>
      <div className="track-banner-artist">{artist.username}</div>
      <img className="track-show-artwork" src={this.props.track.artworkUrl}/>
      <button className="track-banner-play" onClick={() => this.props.openPlaybackBar(this.props.track)}></button>
      <div className="track-banner-date">date</div>
    </div>;

    const comments = <h3>comments</h3>;

    return (
      <div className="track-show-container">
        {banner}

        <ul>
          {comments}
        </ul>


      </div>
    );
  }


}

const mapStateToProps = (state, ownProps) => {
  const track = state.entities.tracks[ownProps.match.params.trackId];
  const users = state.entities.users;

  return {track: track, users: users};
};


const mapDistpatchToProps = (dispatch) => ({
  fetchTrack: id => dispatch(fetchTrack(id)),
  openPlaybackBar: track => dispatch(openPlaybackBar(track))
});

export default connect(mapStateToProps, mapDistpatchToProps)(ShowTrack);
