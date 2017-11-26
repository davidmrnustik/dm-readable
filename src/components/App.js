import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import CategoryList from './CategoryList';
import Post from './Post';

class ReadableApp extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path='/' component={Home} />
          <Route exact path='/:category' component={CategoryList} />
          <Route path='/:category/:post_id' component={Post} />
        </div>
      </Router>
    )
  }
};

export default ReadableApp;