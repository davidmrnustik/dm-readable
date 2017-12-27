import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './common/Header';
import Home from './Home';
import Category from './Category';
import Post from './post/Post';

/**
 * ReadableApp handles routes for Header, Home, Category and Post detail,
 * it receives ajaxCallsInProgress to serve as loading it in Header.
 */
const ReadableApp = ({ loading }) => {
  return (
    <div>
      <Header loading={loading} />
      <Route exact path='/' component={Home} />
      <Route exact path='/:category' component={Category} />
      <Route path='/:category/:post_id' component={Post} />
    </div>
  )
};

ReadableApp.propTypes = {
  loading: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    loading: state.ajaxCallsInProgress > 0
  }
};

export default connect(mapStateToProps)(ReadableApp);