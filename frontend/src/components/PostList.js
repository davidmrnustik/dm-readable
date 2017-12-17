import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Loading from './Loading';
import Modal from 'react-modal';
import * as postActions from '../actions/posts';
import * as commentActions from '../actions/comments';
import PostForm from './PostForm';
import PostDetail from './PostDetail';
import { styles } from './common/styles';
import * as actionTypes from '../constants';
import sortBy from 'sort-by';
import SortForm from './SortForm';
import toastr from 'toastr';

class PostList extends Component {
  static propTypes = {
    category: PropTypes.string,
    post: PropTypes.object,
    posts: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    saveNewPost: PropTypes.func,
    actions: PropTypes.object.isRequired
  }

  state = {
    postModalOpen: false,
    modify: false,
    post: Object.assign({}, this.props.post),
    sort: actionTypes.SORT_POST_DEFAULT,
    saving: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category !== this.props.category) {
      this.setState({ post: Object.assign({}, this.props.post, { category: nextProps.category })})
    }
  }

  // Added setAppElement method to solve: https://github.com/reactjs/react-modal/issues/133
  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount() {
    this.props.actions.post.fetchPostsIfNeeded();
  }

  openPostModal = (post = this.props.post, modify = false) => {
    this.setState(state => ({
      post: Object.assign({}, state.post, post),
      postModalOpen: true,
      modify
    }))
  }

  closePostModal = () => {
    this.setState(state => ({
      post: this.props.post,
      postModalOpen: false,
      modify: false
    }))
  }

  onChangeFormControl = event => {
    const field = event.target.name;
    let post = Object.assign({}, this.state.post);
    post[field] = event.target.value;
    return this.setState({ post });
  }

  onSubmitNewPost = event => {
    event.preventDefault();
    this.setState({ saving: true });

    this.props.actions.post.savePost(this.state.post)
      .then(() => {
        this.setState(() => ({
          post: Object.assign({}, this.props.post),
          saving: false
        }));
        this.closePostModal();
        toastr.success('A new post has been created.');
      });
  }

  onSubmitModifyPost = event => {
    event.preventDefault();
    this.setState({ saving: true });

    this.props.actions.post.modifyPost(this.state.post)
      .then(() => {
        this.setState(() => ({
          post: Object.assign({}, this.props.post),
          modify: false,
          saving: false
        }));
        this.closePostModal();
        toastr.success('A post has been modified.');
      });
  }

  onSubmitDeletePost = post => {
    let deletePost = confirm('Are you sure?');

    if (deletePost) {
      this.props.actions.post.removePost(post)
        .then(() => toastr.success('A post has been removed.'))
      this.props.actions.comment.fetchPostCommentAndRemoveIt(post.id);
    }
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
    const { posts, categories, loading, category, match } = this.props;
    const { postModalOpen, post, modify, sort, saving } = this.state;
    let noPostMessage;
    let sortedPosts = Object.assign([], posts, posts.sort(sortBy(sort, 'voteScore', 'title')));

    if (match.url === '/') {
      noPostMessage = 'There are no posts.';
    } else {
      noPostMessage = 'There are no posts for these category';
    }

    return (
      <div className='post-list'>
        <button onClick={() => this.openPostModal()}>Add New Post</button>

        <hr/>
        
        {posts.length > 1 && (
          <div>
            <SortForm
              sort={sort}
              items={actionTypes.SORT_POST_ITEMS}
              onChange={e => this.onChangeSortPost(e)}
            />
            <hr/>
          </div>
        )}
        
        {!loading && sortedPosts.map(post => (
          <PostDetail
            key={post.id}
            {...post}
            showDetail={false}
            modify={modify}
            loading={saving}
            onClickModify={() => this.openPostModal(post, true)}
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
          
          <PostForm
            onSubmit={modify ? this.onSubmitModifyPost : this.onSubmitNewPost }
            modify={modify}
            onChange={this.onChangeFormControl}
            categories={categories}
            loading={saving}
            post={post}/>

          <button
            onClick={() => this.closePostModal()}
            style={styles.modalClose}
          >
            Close
          </button>
        </Modal>
      </div>
    )  
  }
}

function mapStateToProps({ posts, categories, comments, ajaxCallsInProgress }, ownProps) {
  const post = {
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
    post,
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