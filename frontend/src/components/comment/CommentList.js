import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import sortBy from 'sort-by';
import toastr from 'toastr';
import { Row, Col, Button, PageHeader, Glyphicon } from 'react-bootstrap';
import { styles } from '../common/styles';
import Comment from './Comment';
import Loading from '../common/Loading';
import { fetchPost } from '../../actions/posts';
import * as commentsAction from '../../actions/comments';
import * as actionTypes from '../../constants';
import CommentForm from './CommentForm';
import SortForm from '../common/SortForm';

class CommentList extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  }

  state = {
    post: Object.assign({}, this.props.post),
    modify: false,
    commentModal: false,
    sort: actionTypes.SORT_COMMENT_DEFAULT,
    saving: false
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.post.id !== nextProps.post.id) {
      this.setState({ post: Object.assign({}, nextProps.post )});
    }
  }

  // Added setAppElement method to solve: https://github.com/reactjs/react-modal/issues/133
  componentWillMount() {
    Modal.setAppElement('body');
  }

  openCommentModal = (modify = false) => {
    this.setState({
      commentModal: true,
      modify
    })
  }

  closeCommentModal = () => {
    this.setState(() => ({
      commentModal: false,
      modify: false
    }))
  }

  onSubmitNewComment = comment => {
    const commentsLength = this.props.comments.length;

    this.setState({ saving: true });
    this.props.actions.saveComment(comment)
      .then(() => {
        this.props.updatePost(this.props.post);
        this.setState({ saving: false })
        this.closeCommentModal();
        toastr.success('A new comment has been added.');
      })
      .catch(error => {
        toastr.error(error)
        this.setState({ saving: false });
        this.closeCommentModal();
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

  onSubmitComment = comment => {
    this.state.modify ? this.onSubmitModifyComment(comment) : this.onSubmitNewComment(comment);
  }

  onClickModify = comment => {
    this.openCommentModal(true);
    this.props.actions.fetchComment(comment);
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
    const { commentModal, modify, sort, saving } = this.state;
    const { comment, comments, newComment, loading, post } = this.props;
    let sortedComments = Object.assign([], comments, comments.sort(sortBy(sort, 'voteScore', 'author')));

    return (
      <div className='comments'>
        <Row>
          <Col sm={6}>
            <h4 style={{ margin: '0 0 20px 0' }}>
              Comments {loading ? <Loading text=''/> : `(${post.commentCount})`}
              { ' ' }
              <Button
                bsStyle='primary'
                onClick={() => this.openCommentModal()}
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
                  onClickModify={() => this.onClickModify(comment)}
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
            onClick={() => this.closeCommentModal()}
            style={styles.modalClose}
          />
        </Modal>
      </div>
    )
  }
}

function getPostById(id, posts) {
  const post = posts.filter(post => post.id === id);
  if (post.length > 0) return post[0];
  return null; 
}

function mapStateToProps({ comment, comments, posts, ajaxCallsInProgress }, ownProps){
  const postID = ownProps.match ? ownProps.match.params.post_id : null;
  const newComment = {
    id: '',
    timestamp: 0,
    body: '',
    author: '',
    voteScore: 1,
    parentId: ownProps.post.id || postID,
    deleted: false,
    parentDeleted: false
  }

  let post = {};
  
  if (postID && posts.length > 0) {
    post = getPostById(postID, posts);
  }

  return {
    post: ownProps.post || post,
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