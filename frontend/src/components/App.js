import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './common/Header';
import Home from './Home';
import Category from './Category';
import Post from './post/Post';

class ReadableApp extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  }

  render() {
    return (
      <div>
        <Header loading={this.props.loading} />
        <Route exact path='/' component={Home} />
        <Route exact path='/:category' component={Category} />
        <Route path='/:category/:post_id' component={Post} />
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    loading: state.ajaxCallsInProgress > 0
  }
};

export default connect(mapStateToProps)(ReadableApp);