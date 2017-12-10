import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as APIUtil from '../util/api';
import Comment from './Comment';
import Loading from './Loading';
import Modal from 'react-modal';
import * as commentActions from '../actions/comments';
import { styles } from './common/styles';
import CommentForm from './CommentForm';

class CommentList extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired
  }

  state = {
    comment: Object.assign({}, this.props.comment),
    commentModal: false
  }

  // Added setAppElement method to solve: https://github.com/reactjs/react-modal/issues/133
  componentWillMount() {
    Modal.setAppElement('body');
  }

  openCommentModal = () => {
    this.setState(() => ({
      commentModal: true
    }))
  }

  closeCommentModal = () => {
    this.setState(() => ({
      commentModal: false
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
    this.props.actions.saveComment(this.state.comment, this.props.post);
    // try to send this.props.comments.length
    
    this.setState((state, props) => ({
      comments: [
        ...props.comments,
        state.comment
      ],
      comment: this.props.comment
    }))
    this.closeCommentModal();
  }

  render() {
    const { comment, commentModal } = this.state;
    const { comments } = this.props;

    return (
      <div className='comments'>
        <p><button onClick={() => this.openCommentModal()}>Add New Comment</button></p>

        {comments.length !== 0
          ? comments.map(comment => (
              <Comment
                key={comment.id}
                comment={comment}
              />
            ))
          : <p>There are no comments for this Post.</p>}

        <Modal
          isOpen={commentModal}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.closeCommentModal}
          shouldCloseOnEsc={true}>
          
          <CommentForm
            onSubmit={this.onSubmitNewComment}
            modify={false}
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

function mapStateToProps({ posts }, ownProps) {
  const comment = {
    id: '',
    timestamp: 0,
    body: '',
    author: '',
    parentId: ownProps.postId
  }

  return {
    comment,
    post: posts.items.filter(post => post.id === ownProps.postId)[0]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);