import React from 'react';
import { connect } from 'react-redux';
import { updateUser} from '../../actions/user_actions';
import { withRouter } from 'react-router-dom';

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {profilePic: null, fileUrl: null};
  }

  handleProfilePic(e) {
    const profilePic = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {

      this.setState({profilePic: profilePic, fileUrl: fileReader.result});
    };
    if (profilePic) {
      fileReader.readAsDataURL(profilePic);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    if (this.state.profilePic) {
      formData.append('user[profile_pic]', this.state.profilePic);
    }
    this.props.updateProfilePic(formData);
  }

  render () {
    let form = "";
      if ((this.props.match.params.userId == this.props.currentUserId) || (this.props.match.path === "/you")) {
       form = (<form className="profile-pic-update" onSubmit={this.handleSubmit.bind(this)}>

        <label className="profile-pic-file-input"><i className="fa fa-camera"></i>  Update image

          <input type="file" accept="image/*" onChange={this.handleProfilePic.bind(this)}/>
        </label>

        <input className="profile-submit" type="submit" value="Upload"
          disabled={!Boolean(this.state.profilePic)} hidden={!Boolean(this.state.profilePic)}/>
      </form>);
      }

    return (
      <div className="user-banner">
        <h1 className="show-username">{this.props.user.username}</h1>
        <img src={this.props.user.profilePicUrl} className="show-profile-pic"/>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUserId: state.session.id
});


const mapDispatchToProps = (dispatch) => {
  return {updateProfilePic: pic => dispatch(updateUser(pic))};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetail));
