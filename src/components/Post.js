import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as APIUtil from '../util/api';
import CommentList from './CommentList';
import Modal from 'react-modal';
import Loading from './Loading';
import { modifyPost } from '../actions/posts';
import { styles } from './common/styles';
import PostForm from './PostForm';
import PostDetail from './PostDetail';

class Post extends Component {
  static propTypes = {
    post: PropTypes.any,
    postIsFetching: PropTypes.bool.isRequired
  }

  state = {
    post: Object.assign({}, this.props.post),
    modifyPostModal: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post.timestamp !== this.props.post.timestamp) {
      this.setState({ post: Object.assign({}, nextProps.post)})
    }
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
    this.props.modifyPost(this.state.post);
    this.closeModifyPostModal();
  }

  render() {
    const { post, postIsFetching } = this.props;
    const { modifyPostModal } = this.state;

    return (
      <div className='post' style={{ marginBottom: 10 }}>
        {postIsFetching ? <Loading/> : (
          <div className='post-container'>
            <PostDetail
              post={post}
              onClick={() => this.openModifyPostModal()}
            />
            <hr/>
            <h4>Comments</h4>
            <CommentList post={post.id} />

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
    post: postID && posts.items.filter(post => post.id === postID)[0],
    postIsFetching: posts.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    modifyPost: post => dispatch(modifyPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);