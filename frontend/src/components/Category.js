import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PostList from './post/PostList';
import Loading from './common/Loading';
import { styles } from './common/styles';

class Category extends Component {
  static propTypes = {
    category: PropTypes.object
  }

  state = {
    category: ''
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category !== null) {
      this.setState({ category: Object.assign({}, nextProps.category) })
    }
  }

  categoryIsEmpty(category) {
    if (Object.keys(category).length === 0) {
      return true;
    }
  }

  render() {
    const { match, loading } = this.props;
    const category = this.props.category || this.state.category;

    if (!loading && this.categoryIsEmpty(category)) return <Redirect to="/notfound"/>;

    return (
      <div className='container'>
        <h3 style={styles.removeMarginTop}>Category {category.path}</h3>
        <p className='lead'>
          Introductory text for category {category.path}...
        </p>
        <PostList category={category.path} />
      </div>
    )
    
  }
}

function mapStateToProps({ categories, ajaxCallsInProgress }, ownProps) {
  return {
    category: categories.filter(category => category.path === ownProps.match.params.category)[0],
    loading: ajaxCallsInProgress > 0
  }
}

export default connect(mapStateToProps)(Category);