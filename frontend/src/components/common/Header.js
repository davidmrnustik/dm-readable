import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Loading from './Loading';

class Header extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  }

  render() {
    const { loading, categories, location } = this.props;

    return (
      <div className='header'>
        <Link to='/'>Home</Link>
          {loading ? <Loading/> : categories.map(category => (
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
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default withRouter(connect(mapStateToProps)(Header));