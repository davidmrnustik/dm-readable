import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostList from './PostList';
import Loading from './Loading';

class Category extends Component {
  static propTypes = {
    category: PropTypes.object,
    isFetching: PropTypes.bool.isRequired
  }

  state = {
    category: ''
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.category) {
      this.setState({ category: Object.assign({}, nextProps.category) })
    }
  }

  render() {
    const { match, isFetching } = this.props;
    const category = this.props.category || this.state.category;

    return (
      <div className='category'>
        <h2>This is {category.path}</h2>
        {isFetching ? <Loading/> : <PostList category={category.path} />}
      </div>
    )
    
  }
}

function mapStateToProps({ categories }, ownProps) {
  return {
    category: categories.items.filter(category => category.path === ownProps.match.params.category)[0],
    isFetching: categories.isFetching
  }
}

export default connect(mapStateToProps)(Category);