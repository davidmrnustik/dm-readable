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
    post: PropTypes.string.isRequired
  }

  state = {
    comments: [],
    comment: Object.assign({}, this.props.comment),
    isFetching: false,
    commentModal: false
  }

  // Added setAppElement method to solve: https://github.com/reactjs/react-modal/issues/133
  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => ({
      comments: nextProps.comments,
      isFetching: nextProps.isFetching
    }))
  }

  componentDidMount() {
    this.props.actions.fetchComments(this.props.post);
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
    this.props.actions.saveComment(this.state.comment);
    this.setState(state => ({
      comments: [
        ...state.comments,
        state.comment
      ],
      comment: this.props.comment
    }))
    this.closeCommentModal();
  }

  render() {
    const { comments, comment, commentModal, isFetching } = this.state;

    return (
      <div className='comments'>
        {isFetching
          ? <Loading/>
          : comments.length !== 0
            ? comments.map(comment => (
                <Comment key={comment.id} {...comment} />
              ))
            : <p>There are no comments for this Post.</p>
        }

        <button onClick={() => this.openCommentModal()}>Add New Comment</button>

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

function mapStateToProps({ comments }, ownProps) {
  const comment = {
    id: '',
    timestamp: 0,
    body: '',
    author: '',
    parentId: ownProps.post
  }

  return {
    comment,
    isFetching: comments.isFetching,
    comments: comments.items
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);