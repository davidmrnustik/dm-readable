import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Post from './Post';

const Category = (props) => {
  return (
    <div>
      <h2>This is {props.title}</h2>
      {!props.isFetching && props.posts.map(post => (
        <Post key={post.id} {...post} />
      ))}
      {props.posts.length === 0 && <p>There are no posts for these category.</p>}
    </div>
  )
}

Category.propTypes = {
  title: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

function mapStateToProps({ categories, postsByCategory }, ownProps) {
  return {
    posts: postsByCategory.items,
    isFetching: categories.isFetching || postsByCategory.isFetching,
  }
}

export default connect(mapStateToProps)(Category);