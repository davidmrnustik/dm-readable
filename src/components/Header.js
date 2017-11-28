import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Loading from './Loading';

const Header = ({ isFetching, categories, location }) => {
  return (
    <div className='header'>
      <Link to='/'>Home</Link>
        {isFetching ? <Loading/> : categories.map(category => (
          <div key={category.path}>
            <Link
              style={{ fontWeight: category.path === location.pathname.substr(1) ? 'bold' : 'normal' }}
              to={`/${category.path}`}>
              {category.name}
            </Link>
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

export default withRouter(connect(mapStateToProps)(Header));