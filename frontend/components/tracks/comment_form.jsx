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
    } else {
      this.props.openModal('login');
      this.setState({body: ""});
    }
  }

  render() {

    return (
      <form className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" onChange={this.handleChange.bind(this)} value={this.state.body}/>
        <input type="submit" value="Comment"/>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.session.id
});


const mapDistpatchToProps = dispatch => ({
  createComment: (trackId, comment) => dispatch(createComment(trackId, comment)),
  openModal: action => dispatch(openModal(action))
});

export default connect(mapStateToProps, mapDistpatchToProps)(CommentForm);
