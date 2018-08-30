require('wavesurfer.js');
import ReactDOM from 'react-dom';
import WaveSurfer from 'wavesurfer.js';
import React from 'react';
import {connect} from 'react-redux';


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
      height: 200,
      width: 200,
      fillParent: true,
      cursorWidth: 0,
      // minPxPerSec: 50,
      interact: true,
      preload: true,
      hideScrollbar: true
    });
    this.wavesurfer.load(this.props.src);
  }
  componentWillUnmount() {

  }
  render() {
    // if (this.waveRef.current){
    // console.log(this.waveRef.current.getCurrentTime());
    // }
    return (
      <div className='waveform' style={{width: "600px"}}>
        <div ref={this.waveRef} className='wave'></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {time: state.ui.playback_bar.time};
};


export default connect(mapStateToProps)(Waveform);
