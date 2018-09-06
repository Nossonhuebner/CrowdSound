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
    const width = this.props.width ? this.props.width : 200;

    const container = this.waveRef.current;
    this.wavesurfer = WaveSurfer.create({
      container: container,
      waveColor: '#f2f2f2',
      progressColor: '#ff4400',
      barWidth: 2,
      height: 200,
      width: width,
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
        this.props.incrementPlays(this.props.id);
        setTimeout(() => {
          this.props.seek(percent);
        }, 0);
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

    if (this.props.id == this.props.playingId && this.props.time < this.wavesurfer.getDuration()){
      this.wavesurfer.play(this.props.time);
    }
  }
  render() {
    return (
      <div className='waveform' style={{width: "600px"}}>
        <div ref={this.waveRef} className='wave'></div>
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
  incrementPlays: id => dispatch(incrementPlays(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(Waveform);
