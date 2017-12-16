import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as APIUtil from '../util/api';
import Comment from './Comment';
import Loading from './Loading';
import Modal from 'react-modal';
import { updatePostCommentCount } from '../actions/posts';
import * as commentsAction from '../actions/comments';
import { getIDToken } from '../util/token';
import {
  INCREASE_POST_COMMENT_COUNT,
  DECREASE_POST_COMMENT_COUNT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  SORT_COMMENT_DEFAULT,
  SORT_COMMENT_ITEMS
} from '../constants';
import { styles } from './common/styles';
import sortBy from 'sort-by';
import CommentForm from './CommentForm';
import SortForm from './SortForm';

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
    commentModal: false,
    sort: SORT_COMMENT_DEFAULT
  }

  // Added setAppElement method to solve: https://github.com/reactjs/react-modal/issues/133
  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount() {
    this.props.actions.fetchComments(this.props.post.id);
  }

  openCommentModal = (comment = this.props.comment, modify = false) => {
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

    this.props.updatePost(
      this.props.post,
      this.props.comments.length,
      INCREASE_POST_COMMENT_COUNT
    );

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
      this.props.actions.removeComment(comment);

      this.props.updatePost(
      this.props.post,
      this.props.comments.length,
      DECREASE_POST_COMMENT_COUNT
    );
    }
  }

  onClickUpvoteComment = (event, comment) => {
    event.preventDefault();
    this.props.actions.updateCommentVote(comment, UPVOTE_COMMENT);
  }

  onClickDownvoteComment = (event, comment) => {
    event.preventDefault();
    this.props.actions.updateCommentVote(comment, DOWNVOTE_COMMENT);
  }

  onChangeSortComment = event => {
    this.setState({
      sort: event.target.value
    })
  }

  render() {
    const { comment, commentModal, modify, sort } = this.state;
    const { comments, commentIsFetching, commentIsUpdating } = this.props;
    let sortedComments = Object.assign([], comments, comments.sort(sortBy(sort, 'voteScore', 'author')));

    return (
      <div className='comments'>
        <h4>Comments</h4>
        <p><button onClick={() => this.openCommentModal()}>Add New Comment</button></p>        

        {sortedComments.length > 0 && (
          <div>
            <hr/>
            <SortForm
              sort={sort}
              items={SORT_COMMENT_ITEMS}
              onChange={e => this.onChangeSortComment(e)}
            />
          </div>
        )}
        <hr/>

        {commentIsFetching ? <Loading/> : (
          <div className='comment-list'>
            
            {sortedComments.length !== 0
              ? sortedComments.map(comment => (
                  <Comment
                    key={comment.id}
                    {...comment}
                    isUpdating={commentIsUpdating}
                    onClickModify={() => this.openCommentModal(comment, true)}
                    onClickDelete={() => this.onSubmitDeleteComment(comment)}
                    onClickUpvoteComment={(e) => this.onClickUpvoteComment(e, comment)}
                    onClickDownvoteComment={(e) => this.onClickDownvoteComment(e, comment)}
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
    voteScore: 1,
    parentId: ownProps.post.id,
    deleted: false,
    parentDeleted: false
  }

  return {
    comment,
    comments: comments.items.filter(comment => !comment.deleted),
    commentIsFetching: comments.isFetching,
    commentIsUpdating: comments.isUpdating
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commentsAction, dispatch),
    updatePost: (post, length, type) => dispatch(updatePostCommentCount(post, length, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);