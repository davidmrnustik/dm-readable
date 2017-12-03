import React from 'react';
import { connect } from 'react-redux';
import PostList from './PostList';

const Home = () => {
  return (
    <div>
      <h2>This is Home</h2>
      <PostList />
    </div>
  )
}

export default connect()(Home);