import React from 'react';
import PostList from './post/PostList';
import { styles } from './common/styles';

const Home = () => {
  return (
    <div className='container'>
	    <h3 style={styles.removeMarginTop}>Readable project</h3>
      <p className='lead'>
		    Readable is a Udacity course project. You can add posts and comments. You can vote, modify and remove them.
		  </p>
      <PostList />
    </div>
  )
}

export default Home;