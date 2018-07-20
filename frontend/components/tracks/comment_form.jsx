import React from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../actions/comment_actions';
import { openModal } from '../../actions/modal_actions';


class CommentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {body: ""};
  }

  handleChange(e) {
    this.setState({body: e.currentTarget.value});
  }

  handleSubmit(e){
    e.preventDefault();
    if (this.props.currentUser) {
      this.props.createComment(this.props.trackId, this.state);
      this.setState({body: ""});
    } else {
      this.props.openModal('login');
    }
  }

  render() {
    const image = this.props.currentUser ?
    <img className="commentor-profile-pic" src={this.props.currentUser.profilePicUrl}/>
    : <div className="signed-out-commentor"></div>;
    return (
      <div className="comment-form-container">
        {image}
        <form className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
          <input className="comment-form-input" placeholder="Write a comment" type="text" onChange={this.handleChange.bind(this)} value={this.state.body}/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.id]
});


const mapDistpatchToProps = dispatch => ({
  createComment: (trackId, comment) => dispatch(createComment(trackId, comment)),
  openModal: action => dispatch(openModal(action))
});

export default connect(mapStateToProps, mapDistpatchToProps)(CommentForm);
