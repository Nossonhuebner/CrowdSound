import React from 'react';
import { connect } from 'react-redux';
import { editComment, deleteComment } from '../../actions/comment_actions';

class CommentItem extends React.Component {

  render() {
    const button = this.props.author.id === this.props.currentUserId ?
    <button onClick={() => this.props.deleteComment(this.props.trackId, this.props.comment.id)}><i className="fa fa-trash"></i>
    </button>
    : null ;

    return (
      <li className="comment-item">
        <img className="comment-profile-pic" src={this.props.author.profilePicUrl}/>
        <div className="comment-center">
          <div className="comment-author">{this.props.author.username}</div>
          <div className="comment-body">{this.props.comment.body}</div>
        </div>
        <div className="comment-date">date</div>
        {button}
      </li>
    );
  }
}

const mapStateToProps = state => ({
  currentUserId: state.session.id
});

const mapDistpatchToProps = dispatch => ({
  editComment: (trackId, comment) => dispatch(editComment(trackId, comment)),
  deleteComment: (trackId, commentId) => dispatch(deleteComment(trackId, commentId))
});

export default connect(mapStateToProps, mapDistpatchToProps)(CommentItem);
