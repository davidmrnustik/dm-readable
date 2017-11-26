import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Post from './Post';
import { Link } from 'react-router-dom';
import PostList from './PostList';

const Home = (props) => {
  return (
    <div>
      <h2>This is Home</h2>
      <PostList />
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