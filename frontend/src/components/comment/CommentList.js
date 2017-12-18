import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as APIUtil from '../../util/api';
import Modal from 'react-modal';
import sortBy from 'sort-by';
import toastr from 'toastr';
import { styles } from '../common/styles';
import Comment from './Comment';
import Loading from '../common/Loading';
import { fetchPost} from '../../actions/posts';
import * as commentsAction from '../../actions/comments';
import { getIDToken } from '../../util/token';
import * as actionTypes from '../../constants';
import CommentForm from './CommentForm';
import SortForm from '../common/SortForm';

class CommentList extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired
  }

  post = this.props.post;

  state = {
    comment: Object.assign({}, this.props.comment),
    modify: false,
    commentModal: false,
    sort: actionTypes.SORT_COMMENT_DEFAULT,
    saving: false
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
    const commentsLength = this.props.comments.length;

    event.preventDefault();
    this.setState({ saving: true });
    this.props.actions.saveComment(this.state.comment)
      .then(() => {
        this.props.updatePost(this.props.post);
        this.setState(state => ({
          saving: false,
          comment: Object.assign({}, this.props.comment)
        }))
        this.closeCommentModal();
        toastr.success('A new comment has been added.');
      })
  }

  onSubmitModifyComment = event => {
    event.preventDefault();
    this.setState({ saving: true });
    this.props.actions.modifyComment(this.state.comment)
      .then(() => {
        this.setState(state => ({
          comment: this.props.comment,
          modify: false,
          saving: false
        }))
        this.closeCommentModal();
        toastr.success('A comment has been modified.');
      })

  }

  onSubmitDeleteComment = comment => {
    const commentsLength = this.props.comments.length;
    let deleteComment = confirm('Are you sure?');

    if (deleteComment) {
      this.props.actions.removeComment(comment)
        .then(() => {
          this.props.updatePost(this.props.post);
          toastr.success('A comment has been removed.');
        })
    }
  }

  onClickUpvoteComment = (event, comment) => {
    event.preventDefault();
    this.setState({ saving: true });
    this.props.actions.updateCommentVote(comment, actionTypes.UPVOTE_COMMENT)
      .then(() => {
        this.setState({ saving: false });
      })
  }

  onClickDownvoteComment = (event, comment) => {
    this.setState({ saving: true });
    event.preventDefault();
    this.props.actions.updateCommentVote(comment, actionTypes.DOWNVOTE_COMMENT)
      .then(() => {
        this.setState({ saving: false });
      })
  }

  onChangeSortComment = event => {
    this.setState({
      sort: event.target.value
    })
  }

  render() {
    const { comment, commentModal, modify, sort, saving } = this.state;
    const { comments } = this.props;
    let sortedComments = Object.assign([], comments, comments.sort(sortBy(sort, 'voteScore', 'author')));

    return (
      <div className='comments'>
        <h4>Comments</h4>
        <p><button onClick={() => this.openCommentModal()}>Add New Comment</button></p>        

        {sortedComments.length > 1 && (
          <div>
            <hr/>
            <SortForm
              sort={sort}
              items={actionTypes.SORT_COMMENT_ITEMS}
              onChange={e => this.onChangeSortComment(e)}
            />
          </div>
        )}
        <hr/>

        <div className='comment-list'>
          {sortedComments.length !== 0
            ? sortedComments.map(comment => (
                <Comment
                  key={comment.id}
                  {...comment}
                  loading={saving}
                  onClickModify={() => this.openCommentModal(comment, true)}
                  onClickDelete={() => this.onSubmitDeleteComment(comment)}
                  onClickUpvoteComment={(e) => this.onClickUpvoteComment(e, comment)}
                  onClickDownvoteComment={(e) => this.onClickDownvoteComment(e, comment)}
                />
              ))
            : <p>There are no comments for this Post.</p>
          }
        </div>

        <Modal
          isOpen={commentModal}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.closeCommentModal}
          shouldCloseOnEsc={true}>
          
          <CommentForm
            onSubmit={modify ? this.onSubmitModifyComment : this.onSubmitNewComment}
            modify={modify}
            loading={saving}
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
    comments: comments.filter(comment => !comment.deleted)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commentsAction, dispatch),
    updatePost: (post) => dispatch(fetchPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);