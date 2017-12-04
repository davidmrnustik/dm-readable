import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as APIUtil from '../util/api';
import CommentList from './CommentList';
import Modal from 'react-modal';
import Loading from './Loading';
import { modifyPost } from '../actions';
import { styles } from './common/styles';
import PostForm from './PostForm';

class Post extends Component {
  static propTypes = {
    post: PropTypes.any,
    postIsFetching: PropTypes.bool.isRequired
  }

  state = {
    comments: [],
    statePost: Object.assign({}, this.props.post),
    commentIsLoading: false,
    modifyPostModal: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post.timestamp !== this.props.post.timestamp) {
      this.setState({ statePost: Object.assign({}, nextProps.post)})
    }
  }

  componentDidMount() {
    this.setState({ commentIsLoading: true });
    APIUtil.fetchData(`posts/${this.props.post.id}/comments`)
      .then(
        response => response.json(),
        error => console.log('An error occured', error)
      )
      .then(comments => (
        this.setState({
          comments,
          commentIsLoading: false
        })
      ))
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
    let statePost = Object.assign({}, this.state.statePost);
    statePost[field] = event.target.value;
    return this.setState({ statePost });
  }

  onSubmitModifyPost = event => {
    event.preventDefault();
    this.props.modifyPost(this.state.statePost);
    this.closeModifyPostModal();
  }

  render() {
    const { post, postIsFetching } = this.props;
    const { comments, commentIsLoading, modifyPostModal, statePost } = this.state;

    return (
      <div className='post' style={{ marginBottom: 10 }}>
        {postIsFetching ? <Loading/> : (
          <div>
            <h2 className='post-title'>{post.title}</h2>
            <span className='post-author'>{post.author}</span>
            <div className='post-category'>Category: {post.category}</div>
            <div className='post-comments'>Comments: {post.commentCount}</div>
            <div className='post-voteScore'>Votes: {post.voteScore}</div>
            <button onClick={() => this.openModifyPostModal()}>Edit</button>
            <hr/>
            <p>{post.body}</p>
            <hr/>
            <h4>Comments</h4>
            {commentIsLoading ? <Loading/> : <CommentList comments={comments}/>}

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
                post={statePost}/>
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