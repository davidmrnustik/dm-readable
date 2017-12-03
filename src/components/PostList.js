import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Modal from 'react-modal';
import { savePost } from '../actions';
import randtoken from 'rand-token';
import PostForm from './PostForm';

randtoken.generator({
  chars: 'a-z'
});

const styles = {
  modalClose: {
    position: 'absolute',
    top: 20,
    right: 20
  }
}

class PostList extends Component {
  static propTypes = {
    category: PropTypes.string,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    post: PropTypes.object,
    saveNewPost: PropTypes.func
  }

  state = {
    newPostModalOpen: false,
    post: Object.assign({}, this.props.post)
  }

  openNewPostModal = () => {
    this.setState(() => ({
      newPostModalOpen: true
    }))
  }

  closeNewPostModal = () => {
    this.setState(() => ({
      newPostModalOpen: false
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
    this.props.saveNewPost(this.state.post);
    this.setState({ post: this.props.post});
    this.closeNewPostModal();
  }

  render() {
    const { posts, categories, isFetching } = this.props;
    const { newPostModalOpen, post } = this.state;

    return (
      <div className='post-list'>
        {!isFetching && posts.map(post => (
          <p key={post.id}>
            <Link to={`${post.category}/${post.id}`}>
              <strong>{post.title}</strong>
            </Link>
          </p>
        ))}
        {isFetching ? <Loading/> : posts.length === 0 && <p>There are no posts for these category.</p>}

        <button onClick={() => this.openNewPostModal()}>Add New Post</button>

        <Modal
          isOpen={newPostModalOpen}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.closeNewPostModal}
          shouldCloseOnEsc={true}>
          
          <PostForm
            onSubmit={this.onSubmitNewPost}
            onChange={this.onChangeFormControl}
            categories={categories}
            post={post}/>

          <button
            onClick={() => this.closeNewPostModal()}
            style={styles.modalClose}
          >
            Close
          </button>
        </Modal>
      </div>
    )  
  }
}

function mapStateToProps({ posts, categories }, ownProps) {
  const post = {
    id: randtoken.generate(21).toLowerCase(),
    timestamp: +new Date(),
    title: '',
    body: '',
    author: '',
    category: '',
    voteScore: 0,
    deleted: false,
    commentCount: 0
  };

  return {
    post,
    posts: ownProps.category
      ? posts.items.filter(item => item.category === ownProps.category)
      : posts.items,
    categories: categories.items,
    isFetching: posts.isFetching
  }
}

function mapDispatchToProps (dispatch) {
  return {
    saveNewPost: post => dispatch(savePost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);