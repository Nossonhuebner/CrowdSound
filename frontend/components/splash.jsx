import React from 'react';
import { connect } from 'react-redux';
import { fetchTracks } from '../actions/track_actions'
import { openPlaybackBar } from '../actions/playback_actions';
import { Link } from 'react-router-dom';

class Splash extends React.Component {



  componentDidMount() {
    this.props.fetchTracks()
  }

  render() {
    const tracks = this.props.topTracks.map(track => {
      return (
        <div className="top-track-item" key={track.id}>
          <button onClick={() => this.props.openPlaybackBar(track)}><img className="popular-track" src={track.artworkUrl}/></button>
          <Link className="top-track-link" to={`/users/${track.artist_id}/${track.id}`}>{track.title}</Link>
          <Link className="top-artist-link" to={`/users/${track.artist_id}`}>{track.artistName}</Link>
        </div>
    );
    });

    return (
      <div className="splash-body">
        <div className="greeting-container"></div>
        <div className="trending-title">Hear what’s trending for free in the CrowdSound community</div>
          <div className="top-tracks">
            {tracks}
          </div>
        <a className="explore">Explore our top 50</a>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  topTracks: Object.values(state.entities.tracks).slice(0, 12)
});

const mapDispatchToProps = dispatch => ({
  openPlaybackBar: track => dispatch(openPlaybackBar(track)),
  fetchTracks: () => dispatch(fetchTracks())
})


export default connect(mapStateToProps, mapDispatchToProps)(Splash)
