import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReadableApp from './components/App';
import './assets/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import { fetchCategories } from './actions/categories';
import { fetchPostsIfNeeded } from './actions/posts';

/**
 * Initial data fetching of post and categories from API Server
 * and routes handling for ReadableApp component.
 */
store.dispatch(fetchCategories());
store.dispatch(fetchPostsIfNeeded());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route component={ReadableApp} />
    </Router>
  </Provider>,
  document.getElementById('root')
);