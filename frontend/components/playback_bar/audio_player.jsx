import { nextTrack, prevTrack, seek } from '../../actions/playback_actions';
import React from 'react';
import { connect } from 'react-redux';


class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();

    this.state = {playButton: <i className="fa fa-pause"></i>, ellapsed: 0, progress: "", volume: 0.5, mute: false};
  }



  togglePlay() {
    if (this.audioRef.current.paused) {
      this.audioRef.current.play();
      this.setState({playButton: <i className="fa fa-pause"></i>});

    } else {
      this.setState({playButton: <i className="fa fa-play"></i>});

      this.audioRef.current.pause();
    }
  }

  progress(e) {
    this.setState({ellapsed: this.durationFormat(e.currentTarget.currentTime),
        progress: this.durationPercentage(e.currentTarget.currentTime)});

  }

  durationFormat(secs) {
    let minutes = Math.floor(secs / 60);
    let hours = Math.floor(minutes / 60);
    let formattedMinutes = minutes < 60 ? minutes : 0;
    const seconds =  Math.floor(secs) % 60;
    const formattedSeconds = seconds < 10 ? `:0${seconds}` : `:${seconds}`;

    if (hours && formattedMinutes < 10 ){
      formattedMinutes = `0${formattedMinutes}`;
    } else {
      formattedMinutes = `${formattedMinutes}`;
    }
    if (hours) {
      hours = `${hours}:`;
    } else {
      hours = "";
    }
    return hours + formattedMinutes + formattedSeconds;
  }

  durationPercentage(time){
    return time / this.audioRef.current.duration * 100;
  }

  rewind() {
    if (this.audioRef.current.currentTime > 2) {
      this.audioRef.current.currentTime = 0;
    } else {
      this.props.prevTrack();
    }
  }

  getDuration(e){
    this.setState({duration: e.currentTarget.duration});
  }

  clickSeek(e) {
    let element = e.currentTarget;
    let offsetX = 0;
    let mouseX;
    while (element.offsetParent) {
      offsetX += element.offsetLeft;
      element = element.offsetParent;
    }
    mouseX = e.pageX - offsetX;
    const newPercentage = mouseX / e.currentTarget.offsetWidth;
    const duration = this.audioRef.current.duration;
    this.audioRef.current.currentTime = duration * newPercentage;
    this.props.seek(this.state.progress);
  }

  handleVolume(e) {
    const volume = e.currentTarget.value;
    this.audioRef.current.volume = volume;
    this.setState({mute: false, volume: volume});
  }

  toggleMute() {
    if (this.state.mute) {
      this.setState({mute: false});
      this.audioRef.current.volume = this.state.volume;
    } else {
      this.setState({mute: true});
      this.audioRef.current.volume = 0;
    }
  }

  render() {
      let volumeIcon;
      if (this.state.volume == 0 || this.state.mute){
         volumeIcon = <i className="fa fa-volume-off"></i>;
      } else if (this.state.volume > 0 && this.state.volume < 0.5) {
        volumeIcon = <i className="fa fa-volume-down"></i>;
      } else {
        volumeIcon = <i className="fa fa-volume-up"></i>;
      }

      return (
        <div className="audio-player-container">
          <button className="rewind" onClick={() => this.rewind()}><i className="fa fa-step-backward"></i></button>
          <button onClick={() => this.togglePlay()}>{this.state.playButton}</button>
          <button className="next" onClick={() => this.props.nextTrack()}><i className="fa fa-step-forward"></i></button>
          <audio onTimeUpdate={this.progress.bind(this)} onEnded={this.props.nextTrack} ref={this.audioRef} id="audio-el" autoPlay="true" src={this.props.source} className="audio-element" controlsList="nodownload"></audio>
          <div className="ellapsed-time">{this.state.ellapsed}</div>
          <div onClick={this.clickSeek.bind(this)} className="full-length-body">
            <div className="audio-full-length"></div>
            <div className="audio-progress" style={{width: `${this.state.progress}%`}}></div>
            <div className="progress-ball"style={{left: `${this.state.progress}%`}}></div>
          </div>
          <div className="duration">{this.audioRef.current ?
              this.durationFormat(this.audioRef.current.duration)
               : "0:00"}
          </div>
          <div className="volume-container">
            <button className="volume-button" onClick={this.toggleMute.bind(this)}>{volumeIcon}</button>
            <div className="volume-wrapper">
              <input onChange={this.handleVolume.bind(this)} type="range" min="0.0" max="1.0" value={this.state.mute ? 0 : this.state.volume} step="any"/>
            </div>
          </div>
        </div>

    );
  }
}

const mapDispatchToProps = dispatch => ({
  seek: (time) => dispatch(seek(time)),
  nextTrack: () => dispatch(nextTrack()),
  prevTrack: () => dispatch(prevTrack())
});

export default connect(null, mapDispatchToProps)(AudioPlayer);
