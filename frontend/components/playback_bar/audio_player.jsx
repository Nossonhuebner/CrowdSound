import React from 'react';


class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();

    this.state = {playButton: <i className="fa fa-pause"></i>, elapsed: 0, progress: 0, duration: 0};
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
     this.setState({elapsed: this.durationFormat(e.currentTarget.currentTime),
        progress: this.durationPercentage(e.currentTarget.currentTime)});
  }

  durationFormat(secs) {
    debugger
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
    this.audioRef.current.currentTime = 0;
  }

  getDuration(e){
    this.setState({duration: e.currentTarget.duration});
  }

  render() {
      return (
        <div className="audio-player-container">
          <button className="rewind" onClick={() => this.rewind()}><i className="fa fa-step-backward"></i></button>
          <button onClick={() => this.togglePlay()}>{this.state.playButton}</button>
          <audio onLoadedData={this.getDuration.bind(this)} onTimeUpdate={this.progress.bind(this)} ref={this.audioRef} id="audio-el" autoPlay="true" src={this.props.source} className="audio-element" controlsList="nodownload"></audio>
          <div className="ellapsed-time">{this.state.elapsed}</div>
          <div className="audio-progress">
            <div className="audio-full-length" style={{width: `${this.state.progress}%`}}></div>
          </div>
          <div className="duration">{this.durationFormat(this.state.duration)}</div>
        </div>

    );
  }
}

export default AudioPlayer;
