import React from 'react';
import PostList from './post/PostList';

const Home = () => {
  return (
    <div className='container'>
	    <h3 style={{ marginTop: 0 }}>Readable project</h3>
      <p className='lead'>
		    Readable is a Udacity course project. You can add posts and comments. You can vote, modify and remove them.
		  </p>
      <PostList />
    </div>
  )
}

export default Home;