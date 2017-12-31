import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './common/Header';
import Home from './Home';
import Category from './Category';
import Post from './post/Post';
import NotFoundPage from './NotFoundPage';

/**
 * ReadableApp handles routes for Header, Home, Category and Post detail,
 * it receives ajaxCallsInProgress to serve as loading it in Header.
 */
const ReadableApp = ({ loading }) => {
  return (
    <div>
      <Header loading={loading} />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/notfound' component={NotFoundPage} />
        <Route exact path='/:category' component={Category} />
        <Route path='/:category/:post_id' component={Post} />
      </Switch>
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