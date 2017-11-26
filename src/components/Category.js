import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PostList from './PostList';

const Category = (props) => {
  return (
    <div>
      <h2>This is {props.id}</h2>
      <PostList category={props.id} />
    </div>
  )
}

Category.propTypes = {
  id: PropTypes.string.isRequired
}

export default Category;