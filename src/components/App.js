import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Category from './Category';
import { fetchPostsByCategory } from '../actions';
import Home from './Home';

class ReadableApp extends Component {
  render() {
    const { categories, isFetching, getPostsByCategory } = this.props;

    return (
      <Router>
        <div>
          <Link to='/'>Home</Link>
          {!isFetching && categories.map((category, index) => (
            <div key={index}>
              <Link onClick={() => getPostsByCategory(category.path)} to={`/${category.path}`}>{category.name}</Link>
            </div>
          ))}

          <Route exact path='/' component={Home} />

          {!isFetching && categories.map((category, index) => (
            <Route
              key={index}
              path={`/${category.path}`}
              render={() => (
                <Category categoryName={category.path} />
              )} />
          ))}
        </div>
      </Router>
    )
  }
};

function mapStateToProps({ categories }) {
  return {
    categories: categories.items,
    isFetching: categories.isFetching,
  }
}

function mapDispatchToProps(dispatch){
  return {
    getPostsByCategory: category => dispatch(fetchPostsByCategory(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadableApp);