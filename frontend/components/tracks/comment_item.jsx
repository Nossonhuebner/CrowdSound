import React from 'react';
import { connect } from 'react-redux';
import { editComment, deleteComment } from '../../actions/comment_actions';
import { Link } from 'react-router-dom';
import { dateFormatter } from '../../util/date_util';

class CommentItem extends React.Component {

  render() {
    const button = this.props.author.id === this.props.currentUserId ?
    <button onClick={() => this.props.deleteComment(this.props.trackId, this.props.comment.id)}><i className="fa fa-trash"></i>
    </button>
    : null ;

    return (
      <li className="comment-item">
        <Link to={`/users/${this.props.author.id}`}><img className="comment-profile-pic" src={this.props.author.profilePicUrl}/></Link>
        <div className="comment-center">
          <Link to={`/users/${this.props.author.id}`} className="comment-author">{this.props.author.username}</Link>
          <div className="comment-body">{this.props.comment.body}</div>
        </div>
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
