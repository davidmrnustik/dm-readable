import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Home = (props) => {
  return (
    <div>
      <h2>This is Home</h2>
      <div className='posts'>
        {!props.isFetching && props.posts.map(post => (
          <div className='post' key={post.id} style={{ marginBottom: 10 }}>
            <div className='post-title'><strong>{post.title}</strong></div>
            <span className='post-author'>{post.author}</span>
            <div className='post-comments'>Comments: {post.commentCount}</div>
            <div className='post-voteScore'>Votes: {post.voteScore}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

Home.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired
}

function mapStateToProps({ posts }) {
  return {
    posts: posts.items,
    isFetching: posts.isFetching,
  }
}

export default connect(mapStateToProps)(Home);