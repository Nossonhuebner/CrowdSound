import React from 'react';

export default class UploadTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      trackFile: null,
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

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('post[title]', this.state.title);
    if (this.state.trackFile) {

      formData.append('post[track]', this.state.trackFile);
    }
    $.ajax({
      url: '/api/tracks',
      method: 'POST',
      data: formData,
      contentType: false,
      processData: false
    }).then(
      (response) => console.log(response.message),
      (response) => {
        console.log(response.responseJSON);
      }
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>

        <input type="file" onChange={this.handleFile.bind(this)}/>

        <button>Upload a song</button>
      </form>
    );
  }
}
