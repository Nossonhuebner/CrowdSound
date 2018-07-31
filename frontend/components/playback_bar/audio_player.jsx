import React from 'react';


class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();

    this.state = {playButton: <i className="fa fa-pause"></i>, progress: 0};
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

  progress() {
    debugger
     setState({progress:  e.currentTarget.currentTime / e.currentTarget.duration});
  }

  render() {
      return (
        <div>
          <button onClick={() => this.togglePlay()}>{this.state.playButton}</button>
          <audio onChange={this.progress.bind(this)} ref={this.audioRef} id="audio-el" autoPlay="true" src={this.props.source} className="audio-element" controlsList="nodownload"></audio>
          <div className="audio-progress">{this.state.progress}</div>
          <div className="audio-full-length"></div>
        </div>

    );
  }
}

export default AudioPlayer;
