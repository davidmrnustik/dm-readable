import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostList from './PostList';
import Loading from './Loading';

const Category = ({ match, category, isFetching }) => {
  return (
    <div className='category'>
      <h2>This is {category.path}</h2>
      {isFetching ? <Loading/> : <PostList category={category.path} />}
    </div>
  )
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
}

function mapStateToProps({ categories }, ownProps) {
  return {
    category: categories.items.filter(category => category.path === ownProps.match.params.category)[0],
    isFetching: categories.isFetching
  }
}

export default connect(mapStateToProps)(Category);