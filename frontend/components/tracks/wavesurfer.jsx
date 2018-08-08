require('wavesurfer.js');
import ReactDOM from 'react-dom';
import WaveSurfer from 'wavesurfer.js';
import React from 'react';


export default class Waveform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    Waveform.defaultProps = {
      src: this.props.src
    };
  }
  componentDidMount() {
    this.$el = ReactDOM.findDOMNode(this);
    this.$waveform = this.$el.querySelector('.wave');
    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      waveColor: 'grey',
      progressColor: 'red',
      cursorColor: '#fff',
      barWidth: 2,
      height: 200,
      width: 400,
      fillParent: true,
      minPxPerSec: 50,
      pixelRatio: 1,
      interact: true,
      preload: true,
      hideScrollbar: true,
    });

    this.wavesurfer.load(this.props.src);
    this.wavesurfer.on('seek', () => {
      this.wavesurfer.play();
    });
  }
  componentWillUnmount() {

  }
  render() {
    return (
      <div className='waveform'>
        <div className='wave'></div>
      </div>
    );
  }
}
