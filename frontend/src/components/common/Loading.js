import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { styles } from './styles';

/**
 * LoadingDots component renders text animation when ajax call is in action.
 * Mentioned in pluralsight online course:
 * Cory House - Building Applications with React and Redux in ES6
 * https://app.pluralsight.com/library/courses/react-redux-react-router-es6
 */
class LoadingDots extends Component {
  static propTypes = {
    interval: PropTypes.number,
    dots: PropTypes.number,
    text: PropTypes.string
  }

  state = {
    frame: 1
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        frame: prevState.frame + 1
      }));
    }, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let dots = this.state.frame % (this.props.dots + 1);
    let text = '';
    while (dots > 0) {
      text += '.';
      dots--;
    }
    return <span style={styles.loading}>{this.props.text}{text}&nbsp;</span>;
  }
}

LoadingDots.defaultProps = {
  interval: 300,
  dots: 3,
  text: 'Loading'
}

export default LoadingDots;