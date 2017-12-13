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
import { UPVOTE_POST, DOWNVOTE_POST } from '../constants';

class PostList extends Component {
  static propTypes = {
    category: PropTypes.string,
    post: PropTypes.object,
    posts: PropTypes.array.isRequired,
    postIsFetching: PropTypes.bool.isRequired,
    saveNewPost: PropTypes.func,
    comments: PropTypes.array.isRequired,
    commentIsFetching: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = {
    postModalOpen: false,
    modify: false,
    post: Object.assign({}, this.props.post)
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
    this.props.actions.post.fetchPosts();
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
    this.props.actions.post.savePost(this.state.post);
    
    this.setState(() => ({
      post: Object.assign({}, this.props.post)
    }))
    
    this.closePostModal();
  }

  onSubmitModifyPost = event => {
    event.preventDefault();
    this.props.actions.post.modifyPost(this.state.post);
    
    this.setState(state => ({
      post: this.props.post,
      modify: false
    }));

    this.closePostModal();
  }

  onSubmitDeletePost = post => {
    let deletePost = confirm('Are you sure?');

    if (deletePost) {
      this.props.actions.post.removePost(post);
      this.props.actions.comment.fetchPostCommentAndRemoveIt(post.id);
    }
  }

  onClickUpvotePost = (event, post) => {
    event.preventDefault();
    this.props.actions.post.updatePostVote(post, UPVOTE_POST);
  }

  onClickDownvotePost = (event, post) => {
    event.preventDefault();
    this.props.actions.post.updatePostVote(post, DOWNVOTE_POST);
  }

  render() {
    const { posts, categories, postIsFetching, postIsUpdating, category, match } = this.props;
    const { postModalOpen, post, modify } = this.state;
    let noPostMessage;

    if (match.url === '/') {
      noPostMessage = 'There are no posts.';
    } else {
      noPostMessage = 'There are no posts for these category';
    }

    return (
      <div className='post-list'>
        <button onClick={() => this.openPostModal()}>Add New Post</button>
        <hr/>

        {!postIsFetching && posts.map(post => (
          <PostDetail
            key={post.id}
            {...post}
            showDetail={false}
            modify={modify}
            isUpdating={postIsUpdating}
            onClickModify={() => this.openPostModal(post, true)}
            onClickDelete={() => this.onSubmitDeletePost(post)}
            onClickUpvotePost={(e) => this.onClickUpvotePost(e, post)}
            onClickDownvotePost={(e) => this.onClickDownvotePost(e, post)}
          />
        ))}
        {postIsFetching ? <Loading/> : posts.length === 0 && noPostMessage}
        
        <Modal
          isOpen={postModalOpen}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.closePostModal}
          shouldCloseOnEsc={true}>
          
          <PostForm
            onSubmit={modify ? this.onSubmitModifyPost : this.onSubmitNewPost }
            modify={modify}
            onChange={this.onChangeFormControl}
            category={category}
            categories={categories}
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

function mapStateToProps({ posts, categories, comments }, ownProps) {
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
      ? posts.items.filter(item => item.category === ownProps.category).filter(item => !item.deleted)
      : posts.items.filter(item => !item.deleted),
    categories: categories.items,
    postIsFetching: posts.isFetching,
    postIsUpdating: posts.isUpdating,
    comments: comments.items,
    commentIsFetching: comments.isFetching
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