import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as APIUtil from '../util/api';
import Comment from './Comment';
import Loading from './Loading';
import Modal from 'react-modal';
import { modifyPost } from '../actions/posts';
import * as commentsAction from '../actions/comments';
import { getIDToken } from '../util/token';
import { styles } from './common/styles';
import CommentForm from './CommentForm';

class CommentList extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    commentIsFetching: PropTypes.bool.isRequired
  }

  post = this.props.post;

  state = {
    comment: Object.assign({}, this.props.comment),
    modify: false,
    commentModal: false
  }

  // Added setAppElement method to solve: https://github.com/reactjs/react-modal/issues/133
  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount() {
    this.props.actions.fetchComments(this.props.post.id);
  }

  openCommentModal = (comment = this.comment, modify = false) => {
    this.setState(state => ({
      comment: Object.assign({}, state.comment, comment),
      commentModal: true,
      modify
    }))
  }

  closeCommentModal = () => {
    this.setState(() => ({
      comment: this.props.comment,
      commentModal: false,
      modify: false
    }))
  }

  onChangeFormControl = event => {
    const field = event.target.name;
    let comment = Object.assign({}, this.state.comment);
    comment[field] = event.target.value;
    return this.setState({ comment });
  }

  onSubmitNewComment = event => {
    event.preventDefault();
    this.props.actions.saveComment(this.state.comment);

    this.setState(state => ({
      comment: Object.assign({}, this.props.comment)
    }))

    this.props.updatePost(Object.assign({}, this.props.post, {
      commentCount: this.props.comments.length + 1
    }));

    this.closeCommentModal();
  }

  onSubmitModifyComment = event => {
    event.preventDefault();
    this.props.actions.modifyComment(this.state.comment);

    this.setState(state => ({
      comment: this.props.comment,
      modify: false
    }))

    this.closeCommentModal();
  }

  onSubmitDeleteComment = comment => {
    let deleteComment = confirm('Are you sure?');

    if (deleteComment) {
      this.props.actions.modifyComment(comment, 'remove');

      this.props.updatePost(Object.assign({}, this.props.post, {
        commentCount: this.props.comments.length - 1
      }));
    }
  }

  render() {
    const { comment, commentModal, modify } = this.state;
    const { comments, commentIsFetching } = this.props;

    return (
      <div className='comments'>
        <h4>Comments</h4>
        <p><button onClick={() => this.openCommentModal()}>Add New Comment</button></p>

        {commentIsFetching ? <Loading/> : (
          <div className='comment-list'>
            
            {comments.length !== 0
              ? comments.map(comment => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    onClickModify={() => this.openCommentModal(comment, true)}
                    onClickDelete={() => this.onSubmitDeleteComment(comment)}
                  />
                ))
              : <p>There are no comments for this Post.</p>
            }
          </div>
        )}

        <Modal
          isOpen={commentModal}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.closeCommentModal}
          shouldCloseOnEsc={true}>
          
          <CommentForm
            onSubmit={modify ? this.onSubmitModifyComment : this.onSubmitNewComment}
            modify={modify}
            comment={comment}
            onChange={this.onChangeFormControl}
          />

          <button
            onClick={() => this.closeCommentModal()}
            style={styles.modalClose}
          >
            Close
          </button>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({ comments }, ownProps){
  const comment = {
    id: '',
    timestamp: 0,
    body: '',
    author: '',
    parentId: ownProps.post.id
  }

  return {
    comment,
    comments: comments.items.filter(comment => !comment.deleted),
    commentIsFetching: comments.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commentsAction, dispatch),
    updatePost: post => dispatch(modifyPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);