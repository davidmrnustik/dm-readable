import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ comments }) => {
  return (
    <div className='comments'>
      {comments.map(comment => (
        <Comment key={comment.id} {...comment} />
      ))}
      {comments.length === 0 && <p>There are no comments for this Post.</p>}
    </div>
  )
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
}

export default CommentList;