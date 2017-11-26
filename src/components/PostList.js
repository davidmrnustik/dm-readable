import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostList = (props) => {
  return (
    <div className='post-list'>
      {!props.isFetching && props.posts.map(post => (
        <p key={post.id}>
          <Link to={`${post.category}/${post.id}`}>
            <strong>{post.title}</strong>
          </Link>
        </p>
      ))}
      {props.posts.length === 0 && <p>There are no posts for these category.</p>}
    </div>
  )
}

PostList.propTypes = {
  category: PropTypes.string,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

function mapStateToProps({ posts }, ownProps) {
  return {
    posts: ownProps.category
    ? posts.items.filter(item => item.category === ownProps.category)
    : posts.items,
    isFetching: posts.isFetching
  }
}

export default connect(mapStateToProps)(PostList);