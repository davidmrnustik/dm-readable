import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import toastr from 'toastr';
import Modal from 'react-modal';
import { styles, customModal } from '../common/styles';
import { Button, Row, Col, PageHeader, Glyphicon } from 'react-bootstrap';
import CommentList from '../comment/CommentList';
import Loading from '../common/Loading';
import * as postActions from '../../actions/posts';
import * as commentActions from '../../actions/comments';
import PostForm from './PostForm';
import PostDetail from './PostDetail';
import * as actionTypes from '../../constants';
import MyModal from '../common/MyModal';

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
    deletePostModal: false,
    saving: false,
    selectedPost: {}
  }

  componentWillReceiveProps(nextProps) {
    const post = this.props.post;

    if (nextProps.post !== null) {
      if (post.id !== nextProps.post.id ||
        post.commentCount !== nextProps.post.commentCount) {

        // Necessary to populate post when existing post is loaded directly.
        this.setState({ post: Object.assign({}, nextProps.post )});
      }
    } else {
      this.props.history.push('/notfound');
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

  openModifyPostModal = modal => {
    this.setState({ [modal]: true });
  }

  closeModifyPostModal = modal => {
    this.setState({ [modal]: false });
  }

  onSubmitModifyPost = post => {
    this.setState({ saving: true });
    this.props.actions.post.modifyPost(post)
      .then(() => {
        this.setState({
          saving: false,
          post: Object.assign({}, this.props.post)
        });
        this.closeModifyPostModal('modifyPostModal');
        toastr.success('A post has been modified.');
      });
  }

  onSubmitDeletePost = () => {
    const post = this.state.selectedPost;

    this.setState({ saving: true });
    this.props.actions.post.removePost(post)
      .then(() => {
        this.setState({ saving: false, selectedPost: {} });
        this.closeModifyPostModal('deletePostModal');
        toastr.success('A post has been removed.');
        this.props.history.push('/');
      })
    this.props.actions.comment.fetchPostCommentAndRemoveIt(post.id);
  }

  onClickDelete = post => {
    this.setState({ selectedPost: post });
    this.openModifyPostModal('deletePostModal');
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

  postIsEmpty(post) {
    if (Object.keys(post).length === 0) {
      return true;
    }
  }

  render() {
    const { loading } = this.props;
    const { post, modifyPostModal, deletePostModal, saving } = this.state;

    if (!loading && (typeof post === undefined || this.postIsEmpty(post))) {
      return <Redirect to="/notfound"/>;
    }

    return (
      <div className='container'>
        {!post.deleted ? (
          loading
            ? <Loading text="Loading post and comments"/> 
            : <div>
                <PostDetail
                  {...post}
                  modify={true}
                  showDetail={true}
                  loading={saving}
                  onClickModify={() => this.openModifyPostModal('modifyPostModal')}
                  onClickDelete={() => this.onClickDelete(post)}
                  onClickUpvotePost={(e) => this.onClickUpvotePost(e, post)}
                  onClickDownvotePost={(e) => this.onClickDownvotePost(e, post)}
                />
              </div>

        )
          : <Redirect to="/notfound"/>
        }
        
        <hr/>
        
        <CommentList post={post}/>

        <MyModal
          isOpen={modifyPostModal}
          onRequestClose={() => this.closeModifyPostModal('modifyPostModal')}>
          
          <PageHeader>Modify Post</PageHeader>

          <PostForm
            onSubmit={this.onSubmitModifyPost}
            modify={true}
            category={post.category}
            loading={saving}
            post={post}/>
          
          <Glyphicon
            glyph='remove'
            onClick={() => this.closeModifyPostModal('modifyPostModal')}
            style={styles.modalClose}
          />
        </MyModal>

        <MyModal
          isOpen={deletePostModal}
          onRequestClose={() => this.closeModifyPostModal('deletePostModal')}
          style={customModal}
        >
          <h4 style={styles.marginBottom}>Are you sure?</h4>
          {saving ? <Loading/> :
            <p>
              <Button
                bsStyle='primary'
                onClick={() => this.onSubmitDeletePost()}
              >
                Yes
              </Button>
              {' '}
              <Button
                onClick={() => this.closeModifyPostModal('deletePostModal')}
              >
                No
              </Button>
            </p>
          }

          <Glyphicon
            glyph='remove'
            onClick={() => this.closeModifyPostModal('deletePostModal')}
            style={styles.modalClose}
          />
        </MyModal>
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