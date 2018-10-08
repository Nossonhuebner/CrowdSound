require('wavesurfer.js');
import ReactDOM from 'react-dom';
import WaveSurfer from 'wavesurfer.js';
import React from 'react';
import {connect} from 'react-redux';
import { seek } from '../../actions/playback_actions';
import { incrementPlays } from '../../actions/track_actions';

class Waveform extends React.Component {
  constructor(props) {
    super(props);
    this.waveRef = React.createRef();
    // this.state = {
    //
    // };
    // Waveform.defaultProps = {
    //   src: this.props.src
    // };
  }
  componentDidMount() {

    const container = this.waveRef.current;
    this.wavesurfer = WaveSurfer.create({
      container: container,
      waveColor: '#f2f2f2',
      progressColor: '#ff4400',
      barWidth: 2,
      height: this.props.height,
      fillParent: true,
      cursorWidth: 0,
      interact: true,
      hideScrollbar: true,
      removeMediaElementOnDestroy: false
    });
    this.wavesurfer.setMute(true);
    this.wavesurfer.setPlaybackRate(0.00001);
    this.wavesurfer.on('seek', (e) => {
      const percent = this.wavesurfer.getDuration() * (e);
      if (this.props.id == this.props.playingId){
        this.props.seek(percent);
      } else {
        this.props.incrementPlays(this.props.id, percent);
      }
    });

    if (this.props.id) {
      this.wavesurfer.load(this.props.src);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.wavesurfer.load(this.props.src);
    }

    if (this.props.id !== this.props.playingId) {
      this.wavesurfer.play(0);
    }

    if (this.props.id == this.props.playingId && this.props.time < this.wavesurfer.getDuration()){
      this.wavesurfer.play(this.props.time);
    }
  }
  render() {
    return (
      <div className='waveform' style={{width: "600px"}}>
        <div ref={this.waveRef} style={{width: this.props.width}} className='wave'></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    time: state.ui.playback_bar.time,
    playingId: state.ui.playback_bar.playingId
  };
};

const mapDispatchToProps = dispatch => ({
  seek: time => dispatch(seek(time)),
  incrementPlays: (id, time) => dispatch(incrementPlays(id, time))
});


export default connect(mapStateToProps, mapDispatchToProps)(Waveform);
