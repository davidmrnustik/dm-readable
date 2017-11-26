import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Post = (props) => {
  return (
    <div className='post' style={{ marginBottom: 10 }}>
      <div className='post-title'>
        <strong>{props.post.title}</strong>
      </div>
      <span className='post-author'>{props.post.author}</span>
      <div className='post-comments'>Comments: {props.post.commentCount}</div>
      <div className='post-voteScore'>Votes: {props.post.voteScore}</div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.any,
  isFetching: PropTypes.bool.isRequired
}

function mapStateToProps({ posts, isFetching }, ownProps){
  const postID = ownProps.match ? ownProps.match.params.post_id : null;
  return {
    post: postID && posts.items.filter(post => post.id === postID)[0],
    isFetching: posts.isFetching
  }
}

export default connect(mapStateToProps)(Post);