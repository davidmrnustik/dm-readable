import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPostDetail } from '../actions';

const Post = (props) => {
  return (
    <div className='post' style={{ marginBottom: 10 }}>
      <div className='post-title'>
        <Link
          to={`${props.category}/${props.id}`}
          onClick={() => props.dispatch(fetchPostDetail(props.id))}
          >
          <strong>{props.title}</strong>
        </Link>
      </div>
      <span className='post-author'>{props.author}</span>
      <div className='post-comments'>Comments: {props.commentCount}</div>
      <div className='post-voteScore'>Votes: {props.voteScore}</div>
    </div>
  )
}


Post.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  voteScore: PropTypes.number.isRequired
}

export default connect()(Post);