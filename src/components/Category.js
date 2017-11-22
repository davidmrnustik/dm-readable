import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Category = (props) => {
  return (
    <div>
      <h2>This is {props.category}</h2>
      {!props.isFetching && props.posts.map(post => (<p key={post.id}>{post.title}</p>))}
      {props.posts.length === 0 && <p>There are no posts for these category.</p>}
    </div>
  )
}

Category.propTypes = {
  categoryName: PropTypes.string.isRequired
}

function mapStateToProps({ categories, postsByCategory }, ownProps) {
  return {
    category: categories.items.reduce((acc, current) => {
      acc = ownProps.categoryName === current.name
      ? current.name
      : acc
      return acc;
    }, ''),
    posts: postsByCategory.items,
    isFetching: categories.isFetching || postsByCategory.isFetching,
  }
}

export default connect(mapStateToProps)(Category);