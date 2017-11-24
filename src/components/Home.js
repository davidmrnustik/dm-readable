import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Post from './Post';
import { Route } from 'react-router-dom';

const Home = (props) => {
  return (
    <div>
      <Route path={props.match.url} render={() => (
        <h2>This is Home</h2>
      )}/>
      <div className='posts'>
        {!props.isFetching && props.posts.map(post => (
          <Route
            key={post.id}
            exact
            path={`${props.match.url}`}
            render={() => (
              <Post {...post} />
            )}
          />
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