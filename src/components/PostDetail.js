import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PostDetail = ({ post, onClick }) => {
  return (
    <div className='post-detail'>
      <h2 className='post-title'>{post.title}</h2>
      <span className='post-author'>{post.author}</span>
      <div className='post-category'>Category: {post.category}</div>
      <div className='post-comments'>{post.commentCount > 1 ? 'Comments' : 'Comment'}: {post.commentCount}</div>
      <div className='post-voteScore'>Votes: {post.voteScore}</div>
      <button onClick={onClick}>Edit</button>
      <hr/>
      <p>{post.body}</p>
    </div>
    )
}

PostDetail.propTypes = {
  post: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default PostDetail;