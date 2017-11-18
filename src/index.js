import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReadableApp from './components/App';
import './assets/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div>
        <ReadableApp />
      </div>
    )
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);