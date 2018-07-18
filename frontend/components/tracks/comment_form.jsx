import React from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../actions/comment_actions';


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
    this.props.createComment(this.props.trackId, this.state);
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



const mapDistpatchToProps = dispatch => ({
  createComment: (trackId, comment) => dispatch(createComment(trackId, comment))
});

export default connect(null, mapDistpatchToProps)(CommentForm);
