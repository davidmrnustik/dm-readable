import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import MyModal from '../common/MyModal';
import sortBy from 'sort-by';
import toastr from 'toastr';
import { Row, Col, Button, PageHeader, Glyphicon } from 'react-bootstrap';
import { styles, customModal } from '../common/styles';
import Comment from './Comment';
import Loading from '../common/Loading';
import { fetchPost } from '../../actions/posts';
import * as commentsAction from '../../actions/comments';
import * as actionTypes from '../../constants';
import CommentForm from './CommentForm';
import SortForm from '../common/SortForm';

/**
 * CommentList component is a container of Comment component.
 * It contains all comment functionality:
 * add new/pre-populated modify/remove comment, vote and sort comments.
 * Create new and delete comment functions call an action to update a related post.
 * It receives post, posts, categories and ajax calls props.
 */
class CommentList extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  }

  state = {
    modify: false,
    commentModal: false,
    deleteCommentModal: false,
    sort: actionTypes.SORT_COMMENT_DEFAULT,
    saving: false,
    selectedComment: {}
  }

  // Added setAppElement method to solve: https://github.com/reactjs/react-modal/issues/133
  componentWillMount() {
    // Modal.setAppElement('body');
  }

  openCommentModal = (modal, modify = false) => {
    this.setState({
      [modal]: true,
      modify
    })
  }

  closeCommentModal = modal => {
    this.setState(() => ({
      [modal]: false,
      modify: false,
      selectedComment: {}
    }))
  }

  onSubmitNewComment = comment => {
    this.setState({ saving: true });
    this.props.actions.saveComment(comment)
      .then(() => {
        this.props.updatePost(this.props.post);
        this.setState({ saving: false })
        this.closeCommentModal('commentModal');
        toastr.success('A new comment has been added.');
      })
      .catch(error => {
        toastr.error(error)
        this.setState({ saving: false });
        this.closeCommentModal('commentModal');
      })
  }

  onSubmitModifyComment = comment => {
    this.setState({ saving: true });
    this.props.actions.modifyComment(comment)
      .then(() => {
        this.setState({
          modify: false,
          saving: false
        })
        this.closeCommentModal('commentModal');
        toastr.success('A comment has been modified.');
      })
  }

  onSubmitDeleteComment = () => {
    this.setState({ saving: true });
    this.props.actions.removeComment(this.state.selectedComment)
      .then(() => {
        this.props.updatePost(this.props.post);
        this.setState({ saving: false, selectedComment: {} });
        this.closeCommentModal('deleteCommentModal');
        toastr.success('A comment has been removed.');
      })
  }

  onSubmitComment = comment => {
    this.state.modify ? this.onSubmitModifyComment(comment) : this.onSubmitNewComment(comment);
  }

  onClickModifyComment = comment => {
    this.openCommentModal('commentModal', true);
    this.props.actions.fetchComment(comment);
  }

  onClickDeleteComment = comment => {
    this.setState({ selectedComment: comment });
    this.openCommentModal('deleteCommentModal');
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
    const { commentModal, modify, sort, saving, deleteCommentModal } = this.state;
    const { comment, comments, newComment, loading, post: { commentCount} } = this.props;
    let sortedComments = Object.assign([], comments, comments.sort(sortBy(sort, 'voteScore', 'author')));

    return (
      <div className='comments'>
        <Row>
          <Col sm={6}>
            <h4 style={styles.marginBottom}>
              Comments {loading ? <Loading text=''/> : `(${commentCount})`}
              { ' ' }
              <Button
                bsStyle='primary'
                onClick={() => this.openCommentModal('commentModal')}
                bsSize='small'
              >
                Add New Comment
              </Button>
            </h4>
          </Col>

          {sortedComments.length > 1 && (
            <Col sm={6} className='text-right'>
              <SortForm
                sort={sort}
                items={actionTypes.SORT_COMMENT_ITEMS}
                onChange={e => this.onChangeSortComment(e)}
              />
            </Col>
          )}
        </Row>

        <div className='comment-list'>
          {loading ? <Loading/> : sortedComments.length !== 0
            ? sortedComments.map(comment => (
                <Comment
                  key={comment.id}
                  {...comment}
                  loading={saving}
                  onClickModify={() => this.onClickModifyComment(comment)}
                  onClickDelete={() => this.onClickDeleteComment(comment)}
                  onClickUpvoteComment={(e) => this.onClickUpvoteComment(e, comment)}
                  onClickDownvoteComment={(e) => this.onClickDownvoteComment(e, comment)}
                />
              ))
            : <p>There are no comments for this Post.</p>
          }
        </div>

        <MyModal
          isOpen={commentModal}
          onRequestClose={() => this.closeCommentModal('commentModal')}
          >

          <PageHeader>{modify ? 'Modify Comment' : 'Add new Comment'}</PageHeader>
          
          {loading && !saving ? <Loading/> : (
            <CommentForm
              onSubmit={this.onSubmitComment}
              modify={modify}
              loading={saving}
              comment={modify ? comment : newComment}
            />
          )}

          <Glyphicon
            glyph='remove'
            onClick={() => this.closeCommentModal('commentModal')}
            style={styles.modalClose}
          />
        </MyModal>

        <MyModal
          isOpen={deleteCommentModal}
          onRequestClose={() => this.closeCommentModal('deleteCommentModal')}
          style={customModal}
        >
          <h4 style={styles.marginBottom}>Are you sure?</h4>
          {saving ? <Loading/> :
            <p>
              <Button
                bsStyle='primary'
                onClick={() => this.onSubmitDeleteComment()}
              >
                Yes
              </Button>
              {' '}
              <Button
                onClick={() => this.closeCommentModal('deleteCommentModal')}
              >
                No
              </Button>
            </p>
          }

          <Glyphicon
            glyph='remove'
            onClick={() => this.closeCommentModal('deleteCommentModal')}
            style={styles.modalClose}
          />
        </MyModal>
      </div>
    )
  }
}

function mapStateToProps({ comment, comments, posts, ajaxCallsInProgress }, ownProps){
  const newComment = Object.assign({}, actionTypes.INITIAL_COMMENT, { parentId: ownProps.post.id });
  
  return {
    newComment,
    comment: comment || newComment,
    comments: comments.filter(comment => !comment.deleted),
    loading: ajaxCallsInProgress > 0
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commentsAction, dispatch),
    updatePost: (post) => dispatch(fetchPost(post, 'update'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);