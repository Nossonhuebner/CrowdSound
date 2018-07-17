import React from 'react';
import { fetchTrack } from ''


class ShowTrack extends React.Component {

  componentDidMount() {
    this.props.fetchTrack(this.props.match.params.trackId);
  }

  render() {
    const banner =
    <div className="track-show-banner">
      <div className="track-banner-title">{this.props.track.title}</div>
      <div className="track-banner-artist">{this.props.artist.username}</div>
      <button className="track-banner-play" onClick={() => this.props.openPlaybackBar(this.props.track)}></button>
      <div className="track-banner-date">date</div>
    </div>;

    const comments = {};

    return (
      <div>
        {banner}

        <ul>
          {comments}
        </ul>


      </div>
    )
  }


}



const mapDistpatchToProps = (dispatch) => ({
  fetchTrack: id => dispatch(fetchTrack(id)),
  openPlaybackBar: track => dispatch(openPlaybackBar(track))
});
