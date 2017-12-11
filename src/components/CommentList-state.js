import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import * as APIUtil from '../util/api';
import Comment from './Comment';
import Loading from './Loading';
import Modal from 'react-modal';
import { modifyPost } from '../actions/posts';
import { getIDToken } from '../util/token';
import { styles } from './common/styles';
import CommentForm from './CommentForm';

class CommentList extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  post = this.props.post;

  comment = {
    id: '',
    timestamp: 0,
    body: '',
    author: '',
    parentId: this.post.id
  }

  state = {
    comment: this.comment,
    comments: [],
    modify: false,
    commentIsFetching: false,
    commentModal: false
  }

  // Added setAppElement method to solve: https://github.com/reactjs/react-modal/issues/133
  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments() {
    this.setState({ commentIsFetching: true });

    APIUtil
      .fetchData(`posts/${this.post.id}/comments`)
      .then(json => {
        this.setState({
          comments: json,
          commentIsFetching: false
        })
      })
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
      comment: this.comment,
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
    const updatedComment = Object.assign({}, this.state.comment, {
      id: getIDToken(),
      timestamp: +new Date()
    });

    event.preventDefault();
    this.setState({ commentIsFetching: true });
    
    APIUtil
      .handleData('POST', 'comments', JSON.stringify(updatedComment))
      .then(() => {
        this.setState(state => ({
          comments: [
            ...state.comments,
            updatedComment
          ],
          comment: this.props.comment,
          commentIsFetching: false
        }))
      });

    this.props.dispatch(modifyPost(Object.assign({}, this.post)))
    this.closeCommentModal();
  }

  onSubmitModifyComment = event => {
    const updatedComment = Object.assign({}, this.state.comment, {
      timestamp: +new Date()
    })

    event.preventDefault();
    this.setState({ commentIsFetching: true });

    APIUtil
      .handleData('PUT', `comments/${updatedComment.id}`, JSON.stringify(updatedComment))
      .then(() => {
        this.setState(state => ({
          comments: [
            ...state.comments.filter(comment => comment.id !== updatedComment.id),
            updatedComment
          ],
          comment: this.props.comment,
          commentIsFetching: false,
          modify: false
        }))
      })

    this.closeCommentModal();
  }

  onSubmitDeleteComment = comment => {
    let deleteComment = confirm('Are you sure?');

    if (deleteComment) {
      const updatedComment = Object.assign({}, comment, {
        deleted: true
      })

      this.setState({ commentIsFetching: true });

      APIUtil
        .handleData('PUT', `comments/${updatedComment.id}`, JSON.stringify(updatedComment))
        .then(() => {
          this.setState(state => ({
            comments: [
              ...state.comments.filter(comment => comment.id !== updatedComment.id)
            ],
            commentIsFetching: false
          }))
        })

      this.props.dispatch(modifyPost(Object.assign({}, this.post)))
      this.closeCommentModal();
    }
  }

  // componentWillUpdate(nextProps, nextState) {
  //   this.props.dispatch(modifyPost(Object.assign({}, this.post, {
  //     commentCount: nextState.comments.length
  //   })))
  // }

  render() {
    const { comment, commentModal, comments, commentIsFetching, modify } = this.state;

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

export default connect()(CommentList);