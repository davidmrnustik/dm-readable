import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Modal from 'react-modal';
import { savePost } from '../actions';
import PostForm from './PostForm';
import { styles } from './common/styles';

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.category !== this.props.category) {
      this.setState({ post: Object.assign({}, this.props.post, { category: nextProps.category })})
    }
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
    this.closeNewPostModal();
  }

  render() {
    const { posts, categories, isFetching, category } = this.props;
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
            modify={false}
            onChange={this.onChangeFormControl}
            category={category}
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
    id: '',
    timestamp: 0,
    title: '',
    body: '',
    author: '',
    category: ownProps.category,
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