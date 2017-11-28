import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ReadableApp from './components/App';
import './assets/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import { fetchCategories, fetchPosts } from './actions';

class App extends Component {
  render() {
    return (
      <div>
        <ReadableApp />
      </div>
    )
  }
};

store.dispatch(fetchCategories());
store.dispatch(fetchPosts());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);