import React from 'react';
import { connect } from 'react-redux';
import { editComment, deleteComment } from '../../actions/comment_actions';
import { Link } from 'react-router-dom';
import { dateFormatter } from '../../util/date_util';

class CommentItem extends React.Component {

  render() {
    const button = this.props.author.id === this.props.currentUserId ?
    <button className="delete-comment" onClick={() => this.props.deleteComment(this.props.trackId, this.props.comment.id)}>
      <i className="fa fa-trash"></i>
    </button>
    : null ;

    return (
      <li className="comment-item">
        <Link to={`/users/${this.props.author.id}`}><img className="comment-profile-pic" src={this.props.author.profilePicUrl}/></Link>
          <Link to={`/users/${this.props.author.id}`} className="comment-author">{this.props.author.username}</Link>
          <p className="comment-body">{this.props.comment.body}</p>
        <div className="comment-date">{dateFormatter(this.props.comment.created_at)}</div>
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
