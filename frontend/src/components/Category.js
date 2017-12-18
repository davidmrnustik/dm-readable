import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostList from './post/PostList';
import Loading from './common/Loading';

class Category extends Component {
  static propTypes = {
    category: PropTypes.object
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
    const { match } = this.props;
    const category = this.props.category || this.state.category;

    return (
      <div className='category'>
        <h2>This is {category.path}</h2>
        <PostList category={category.path} />
      </div>
    )
    
  }
}

function mapStateToProps({ categories }, ownProps) {
  return {
    category: categories.filter(category => category.path === ownProps.match.params.category)[0]
  }
}

export default connect(mapStateToProps)(Category);