import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import toastr from 'toastr';
import Modal from 'react-modal';
import sortBy from 'sort-by';
import { Button, Row, Col, PageHeader, Glyphicon } from 'react-bootstrap';
import { styles } from '../common/styles';
import * as postActions from '../../actions/posts';
import Loading from '../common/Loading';
import * as commentActions from '../../actions/comments';
import PostForm from './PostForm';
import PostRow from './PostRow';
import * as actionTypes from '../../constants';
import SortForm from '../common/SortForm';

class PostList extends Component {
  static propTypes = {
    category: PropTypes.string,
    post: PropTypes.object,
    newPost: PropTypes.object,
    posts: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = {
    postModalOpen: false,
    modify: false,
    sort: actionTypes.SORT_POST_DEFAULT,
    saving: false
  }

  // Added setAppElement method to solve: https://github.com/reactjs/react-modal/issues/133
  componentWillMount() {
    Modal.setAppElement('body');
  }

  openPostModal = (modify = false) => {
    this.setState({
      postModalOpen: true,
      modify
    })
  }

  closePostModal = () => {
    this.setState({
      postModalOpen: false,
      modify: false
    })
  }

  onSubmitPost = post => {
    this.state.modify ? this.onSubmitModifyPost(post) : this.onSubmitNewPost(post);
  }

  onSubmitNewPost = post => {
    this.setState({ saving: true });

    this.props.actions.post.savePost(post)
      .then(() => {
        this.setState({ saving: false });
        this.closePostModal();
        toastr.success('A new post has been created.');
      })
      .catch(error => {
        toastr.error(error)
        this.setState({ saving: false });
        this.closePostModal();
      })
  }

  onSubmitModifyPost = post => {
    this.setState({ saving: true });

    this.props.actions.post.modifyPost(post)
      .then(() => {
        this.setState({
          modify: false,
          saving: false
        });
        this.closePostModal();
        toastr.success('A post has been modified.');
      });
  }

  onSubmitDeletePost = post => {
    let deletePost = confirm('Are you sure?');

    if (deletePost) {
      this.props.actions.post.removePost(post)
        .then(() => toastr.success('A post has been removed.'));
      this.props.actions.comment.fetchPostCommentAndRemoveIt(post.id);
    }
  }

  onClickModify = post => {
    this.openPostModal(true);
    this.props.actions.post.fetchPost(post, 'fetch');
  }

  onClickUpvotePost = (event, post) => {
    event.preventDefault();
    this.setState({ saving: true });

    this.props.actions.post.updatePostVote(post, actionTypes.UPVOTE_POST_SUCCESS)
      .then(() => {
        this.setState({ saving: false });
      })
  }

  onClickDownvotePost = (event, post) => {
    event.preventDefault();
    this.setState({ saving: true });

    this.props.actions.post.updatePostVote(post, actionTypes.DOWNVOTE_POST_SUCCESS)
      .then(() => {
        this.setState({ saving: false });
      })
  }

  onChangeSortPost = event => {
    this.setState({
      sort: event.target.value
    })
  }

  render() {
    const { posts, categories, loading, match, post, newPost } = this.props;
    const { postModalOpen, modify, sort, saving } = this.state;
    let noPostMessage;
    let sortedPosts = Object.assign([], posts, posts.sort(sortBy(sort, 'voteScore', 'title')));

    if (match.url === '/') {
      noPostMessage = 'There are no posts.';
    } else {
      noPostMessage = 'There are no posts for these category';
    }

    return (
      <div className='post-list'>
        <Button bsStyle='primary' onClick={() => this.openPostModal()}>Add New Post</Button>

        <hr/>
        
        <Row>
          <Col sm={6}>
            <h3 style={{ margin: '0 0 20px 0' }}>Posts</h3>
          </Col>
          {posts.length > 1 && (
            <Col sm={6} className='text-right'>
              <SortForm
                sort={sort}
                items={actionTypes.SORT_POST_ITEMS}
                onChange={e => this.onChangeSortPost(e)}
              />
            </Col>
          )}
        </Row>
        
        {!loading && sortedPosts.map(post => (
          <PostRow
            {...post}
            key={post.id}
            modify={modify}
            loading={saving}
            onClickModify={() => this.onClickModify(post)}
            onClickDelete={() => this.onSubmitDeletePost(post)}
            onClickUpvotePost={(e) => this.onClickUpvotePost(e, post)}
            onClickDownvotePost={(e) => this.onClickDownvotePost(e, post)}
          />
        ))}

        {loading ? <Loading/> : sortedPosts.length === 0 && noPostMessage}
        
        <Modal
          isOpen={postModalOpen}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.closePostModal}
          shouldCloseOnEsc={true}>

          <PageHeader>{modify ? 'Modify Post' : 'Add new Post'}</PageHeader>
          
          {loading && !saving ? <Loading/> : (
            <PostForm
              onSubmit={this.onSubmitPost}
              modify={modify}
              categories={categories}
              loading={saving}
              post={modify ? post : newPost}
            />
          )}

          <Glyphicon
            glyph='remove'
            onClick={() => this.closePostModal()}
            style={styles.modalClose}
          />
        </Modal>
      </div>
    )  
  }
}

function mapStateToProps({ post, posts, categories, comments, ajaxCallsInProgress }, ownProps) {
  const newPost = {
    id: '',
    timestamp: 0,
    title: '',
    body: '',
    author: '',
    category: ownProps.category,
    voteScore: 1,
    deleted: false,
    commentCount: 0
  };

  return {
    newPost,
    post: post || newPost,
    posts: ownProps.category
      ? posts.filter(item => item.category === ownProps.category).filter(item => !item.deleted)
      : posts.filter(item => !item.deleted),
    categories,
    comments,
    loading: ajaxCallsInProgress > 0
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      post: bindActionCreators(postActions, dispatch),
      comment: bindActionCreators(commentActions, dispatch)
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));