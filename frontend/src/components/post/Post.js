import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import Modal from 'react-modal';
import { styles } from '../common/styles';
import { Button, Row, Col, PageHeader, Glyphicon } from 'react-bootstrap';
import CommentList from '../comment/CommentList';
import Loading from '../common/Loading';
import * as postActions from '../../actions/posts';
import * as commentActions from '../../actions/comments';
import PostForm from './PostForm';
import PostDetail from './PostDetail';
import * as actionTypes from '../../constants';

/**
 * Post component is a container of Post detail page
 * and also renders related comments.
 * It contains post functionality modify, remove and vote.
 * It receives post props that is parsed from match params.
 * It fetches related comments to store by parsing match params.
 * We call componentWillReceiveProps to populate post when post is loaded directly.
 */
class Post extends Component {
  static propTypes = {
    post: PropTypes.any,
    loading: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = {
    post: Object.assign({}, this.props.post),
    modifyPostModal: false,
    saving: false
  }

  componentWillReceiveProps(nextProps) {
    // Necessary to populate post when existing post is loaded directly.
    if (this.props.post.id !== nextProps.post.id ||
      this.props.post.commentCount !== nextProps.post.commentCount) {
      this.setState({ post: Object.assign({}, nextProps.post )});
    }
  }

  // Added setAppElement method to solve: https://github.com/reactjs/react-modal/issues/133
  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount() {
    // Necessary to populate post id from params when post with existing comments is loaded directly.
    const postID = this.props.match ? this.props.match.params.post_id : null;
    this.props.actions.comment.fetchComments(this.state.post.id || postID);
  }

  openModifyPostModal = () => {
    this.setState({ modifyPostModal: true });
  }

  closeModifyPostModal = () => {
    this.setState({ modifyPostModal: false });
  }

  onSubmitModifyPost = post => {
    this.setState({ saving: true });
    this.props.actions.post.modifyPost(post)
      .then(() => {
        this.setState({
          saving: false,
          post: Object.assign({}, this.props.post)
        });
        this.closeModifyPostModal();
        toastr.success('A post has been modified.');
      });
  }

  onSubmitDeletePost = post => {
    let deletePost = confirm('Are you sure?');

    if (deletePost) {
      this.props.actions.post.removePost(post)
        .then(() => toastr.success('A post has been removed.'))
      this.props.actions.comment.fetchPostCommentAndRemoveIt(post.id);
      this.props.history.push('/');
    }
  }

  onClickUpvotePost = (event, post) => {
    event.preventDefault();
    this.setState({ saving: true });

    this.props.actions.post.updatePostVote(post, actionTypes.UPVOTE_POST_SUCCESS)
      .then(() => {
        this.setState({
          saving: false,
          post: Object.assign({}, this.props.post)
        });
      })
  }

  onClickDownvotePost = (event, post) => {
    event.preventDefault();
    this.setState({ saving: true });

    this.props.actions.post.updatePostVote(post, actionTypes.DOWNVOTE_POST_SUCCESS)
      .then(() => {
        this.setState({
          saving: false,
          post: Object.assign({}, this.props.post)
        });
      })
  }

  render() {
    const { loading } = this.props;
    const { post, modifyPostModal, saving } = this.state;

    return (
      <div className='container'>
        <PostDetail
          {...post}
          modify={true}
          showDetail={true}
          loading={saving}
          onClickModify={() => this.openModifyPostModal()}
          onClickDelete={() => this.onSubmitDeletePost(post)}
          onClickUpvotePost={(e) => this.onClickUpvotePost(e, post)}
          onClickDownvotePost={(e) => this.onClickDownvotePost(e, post)}
        />
        <hr/>
        
        <CommentList post={post}/>

        <Modal
          isOpen={modifyPostModal}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.closeModifyPostModal}
          shouldCloseOnEsc={true}>
          
          <PageHeader>Modify Post</PageHeader>

          <PostForm
            onSubmit={this.onSubmitModifyPost}
            modify={true}
            category={post.category}
            loading={saving}
            post={post}/>
          
          <Glyphicon
            glyph='remove'
            onClick={() => this.closeModifyPostModal()}
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

function mapStateToProps({ posts, ajaxCallsInProgress }, ownProps){
  const postID = ownProps.match ? ownProps.match.params.post_id : null;
  let post = {};
  
  if (postID && posts.length > 0) {
    post = getPostById(postID, posts);
  }
  return {
    post,
    loading: ajaxCallsInProgress > 0
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      post: bindActionCreators(postActions, dispatch),
      comment: bindActionCreators(commentActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);