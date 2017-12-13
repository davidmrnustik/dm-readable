import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CommentList from './CommentList';
import Modal from 'react-modal';
import Loading from './Loading';
import * as postActions from '../actions/posts';
import * as commentActions from '../actions/comments';
import { styles } from './common/styles';
import PostForm from './PostForm';
import PostDetail from './PostDetail';

class Post extends Component {
  static propTypes = {
    post: PropTypes.any,
    postIsFetching: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = {
    post: Object.assign({}, this.props.post),
    modifyPostModal: false
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
    this.setState(() => ({
      modifyPostModal: true
    }))
  }

  closeModifyPostModal = () => {
    this.setState(() => ({
      modifyPostModal: false
    }))
  }

  onChangeFormControl = event => {
    const field = event.target.name;
    let post = Object.assign({}, this.state.post);
    post[field] = event.target.value;
    return this.setState({ post });
  }

  onSubmitModifyPost = event => {
    event.preventDefault();
    this.props.actions.post.modifyPost(this.state.post);
    this.closeModifyPostModal();
  }

  onSubmitDeletePost = post => {
    let deletePost = confirm('Are you sure?');

    if (deletePost) {
      this.props.actions.post.removePost(post);
      this.props.actions.comment.fetchPostCommentAndRemoveIt(post.id);
      this.props.history.push('/');
    }
  }

  render() {
    const { post, postIsFetching } = this.props;
    const { modifyPostModal } = this.state;

    return (
      <div className='post' style={{ marginBottom: 10 }}>
        {postIsFetching ? <Loading/> : (
          <div className='post-container'>
            <PostDetail
              {...post}
              modify={true}
              showDetail={true}
              onClickModify={() => this.openModifyPostModal()}
              onClickDelete={() => this.onSubmitDeletePost(post)}
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
                onChange={this.onChangeFormControl}
                category={post.category}
                post={this.state.post}/>
              <button
                onClick={() => this.closeModifyPostModal()}
                style={styles.modalClose}
              >
                Close
              </button>
            </Modal>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ posts }, ownProps){
  const postID = ownProps.match ? ownProps.match.params.post_id : null;
  return {
    post: postID && posts.items.filter(post => post.id === postID).filter(post => !post.deleted)[0],
    postIsFetching: posts.isFetching
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