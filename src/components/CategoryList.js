import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Category from './Category';

const CategoryList = (props) => {
  return (
    <div className='category-list'>
      <Category id={props.category.path} />
    </div>
  )
}

CategoryList.propTypes = {
  category: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
}

function mapStateToProps({ categories }, ownProps) {
  return {
    category: categories.items.filter(category => category.path === ownProps.match.params.category)[0],
    isFetching: categories.isFetching
  }
}

export default connect(mapStateToProps)(CategoryList);