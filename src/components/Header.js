import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { fetchPostsByCategory } from '../actions';

const Header = (props) => {
  return (
    <div className='header'>
      <Link to='/'>Home</Link>
        {!props.isFetching && props.categories.map((category, index) => (
          <div key={index}>
            <Link onClick={() => props.getPostsByCategory(category.path)} to={`/${category.path}`}>{category.name}</Link>
          </div>
        ))}
    </div>
  )
}

Header.propTypes = {
  categories: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

function mapStateToProps({ categories }) {
  return {
    categories: categories.items,
    isFetching: categories.isFetching
  }
}

function mapDispatchToProps(dispatch){
  return {
    getPostsByCategory: category => dispatch(fetchPostsByCategory(category))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));