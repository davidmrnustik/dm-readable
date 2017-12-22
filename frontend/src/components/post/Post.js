import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import Modal from 'react-modal';
import { styles } from '../common/styles';
import CommentList from '../comment/CommentList';
import Loading from '../common/Loading';
import * as postActions from '../../actions/posts';
import * as commentActions from '../../actions/comments';
import PostForm from './PostForm';
import PostDetail from './PostDetail';
import * as actionTypes from '../../constants';

class Post extends Component {
  static propTypes = {
    post: PropTypes.any,
    loading: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = {
    modifyPostModal: false,
    saving: false
  }

  componentWillReceiveProps(nextProps) {
    this.setState(state => ({
      post: Object.assign({}, state.post, nextProps.post),
    }))
  }

  // Added setAppElement method to solve: https://github.com/reactjs/react-modal/issues/133
  componentWillMount() {
    Modal.setAppElement('body');
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
        this.setState({ saving: false });
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

  render() {
    const { post, loading } = this.props;
    const { modifyPostModal, saving } = this.state;

    return (
      <div className='post' style={{ marginBottom: 10 }}>
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
          <PostForm
            onSubmit={this.onSubmitModifyPost}
            modify={true}
            category={post.category}
            loading={saving}
            post={post}/>
          <button
            onClick={() => this.closeModifyPostModal()}
            style={styles.modalClose}
          >
            Close
          </button>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({ posts, ajaxCallsInProgress }, ownProps){
  const postID = ownProps.match ? ownProps.match.params.post_id : null;
  return {
    post: postID && posts.filter(post => post.id === postID).filter(post => !post.deleted)[0],
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