import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ author, body }) => {
  return (
    <div className='comment'>
      <div className='comment-author'><em>{author}</em></div>
      <div className='comment-body'>{body}</div>
      <div> ------ </div>
    </div>
  )
}

Comment.propTypes = {
  author: PropTypes.string,
  body: PropTypes.string
}

export default Comment;