import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Category from './Category';
import Post from './Post';

class ReadableApp extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path='/' component={Home} />
        <Route exact path='/:category' component={Category} />
        <Route path='/:category/:post_id' component={Post} />
      </div>
    )
  }
};

export default ReadableApp;