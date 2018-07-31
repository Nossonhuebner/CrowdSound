import React from 'react';


class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();

    this.state = {playButton: <i className="fa fa-pause"></i>, elapsed: 0, progress: 0};
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
    // const hours = secs / 3600 ? secs / 3600 : "";
    const minutes = secs / 60 > 0 ? secs / 60 - (secs / 60 % 1) : '';
    const seconds = secs - (secs % 1);
    return `${minutes}:${seconds}`;
  }

  durationPercentage(time){
    return time / this.audioRef.current.duration * 100;
  }

  render() {
      return (
        <div>
          <button onClick={() => this.togglePlay()}>{this.state.playButton}</button>
          <audio onTimeUpdate={this.progress.bind(this)} ref={this.audioRef} id="audio-el" autoPlay="true" src={this.props.source} className="audio-element" controlsList="nodownload"></audio>
          <div className="audio-progress">{this.state.elapsed}
            <div className="audio-full-length" style={{width: `${this.state.progress}%`}}></div>
          </div>
        </div>

    );
  }
}

export default AudioPlayer;
