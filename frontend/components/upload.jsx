import React from 'react';
import { uploadTrack } from '../actions/track_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class UploadTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      trackFile: null,
      trackArtwork: null,
      trackUrl: null
    };
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {

      this.setState({trackFile: file, trackUrl: fileReader.result});
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleArtwork(e) {
    const artwork = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {

      this.setState({trackArtwork: artwork, trackUrl: fileReader.result});
    };
    if (artwork) {
      fileReader.readAsDataURL(artwork);
    }
  }

  updateTitle(e) {
    this.setState({title: e.currentTarget.value});
  }

  updateDescription(e) {
    this.setState({description: e.currentTarget.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('track[title]', this.state.title);

    if (this.state.trackFile) {
      formData.append('track[file]', this.state.trackFile);
    }
    if (this.state.trackArtwork) {
      formData.append('track[artwork]', this.state.trackArtwork);
    }
    this.props.uploadTrack(formData).then(() => {
      return this.props.history.push('/');
    });
  }

  render() {
    return (
      <form className="upload-form" onSubmit={this.handleSubmit.bind(this)}>

        <input className="upload-title" placeholder="Track Name"
          type="text" value={this.state.title} onChange={this.updateTitle.bind(this)}/>

        <textarea className="upload-description"
          placeholder="Description (Optional)" value={this.state.description}
          onChange={this.updateDescription.bind(this)}></textarea>

        <label className="audio-upload">Track
            <input type="file" accept="audio/mpeg3" onChange={this.handleFile.bind(this)}/>
          </label>

          <label className="artwork-upload"><i className="fa fa-camera"></i>  Artwork (optional)
            <input type="file" accept="image/*" onChange={this.handleArtwork.bind(this)}/>
          </label>

        <input className="upload-submit" type="submit" value="Upload"
          disabled={!Boolean(this.state.title && this.state.trackFile)}/>
      </form>
    );
  }
}








const mapDispatchToProps = (dispatch) => ({
  uploadTrack: track => dispatch(uploadTrack(track))
});

export default connect(null, mapDispatchToProps)(withRouter(UploadTrack));
