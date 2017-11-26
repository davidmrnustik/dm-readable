import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { API_URL, API_HEADERS } from '../constants';
import * as APIUtil from '../util/api';

class Post extends Component {
  constructor(props) {
    super(props);
      
    this.state = {
      comments: [],
      commentIsLoading: false
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

  render() {
    const { post } = this.props;
    const { comments, commentIsLoading } = this.state;

    return (
      <div className='post' style={{ marginBottom: 10 }}>
        <h2 className='post-title'>{post.title}</h2>
        <span className='post-author'>{post.author}</span>
        <div className='post-comments'>Comments: {post.commentCount}</div>
        <div className='post-voteScore'>Votes: {post.voteScore}</div>
        <hr/>
        <h4>Comments</h4>
        <div className='comments'>
          {!commentIsLoading && comments.map(comment => (
            <div className='comment' key={comment.id}>
              <div className='comment-author'><em>{comment.author}</em></div>
              <div className='comment-body'>{comment.body}</div>
              <div> ------ </div>
            </div>
          ))}
          {comments.length === 0 && <p>There are no comments for this Post.</p>}
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  post: PropTypes.any,
  postIsFetching: PropTypes.bool.isRequired
}

function mapStateToProps({ posts, comments }, ownProps){
  const postID = ownProps.match ? ownProps.match.params.post_id : null;
  return {
    post: postID && posts.items.filter(post => post.id === postID)[0],
    postIsFetching: posts.isFetching
  }
}

export default connect(mapStateToProps)(Post);