import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import Category from './Category';

const CategoryList = (props) => {
  const title = props.categories.reduce((final, current) => {
    final = current.path === props.match.params.category
    ? current.path
    : final
    return final;
  }, '');

  return (
    <div className='category-list'>
      <Category title={title} />
    </div>
  )
}

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

function mapStateToProps({ categories }) {
  return {
    categories: categories.items,
    isFetching: categories.isFetching
  }
}

export default connect(mapStateToProps)(CategoryList);