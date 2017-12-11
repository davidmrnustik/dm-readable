import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment, onClickModify, onClickDelete }) => {
  return (
    <div className='comment-detail'>
      <div className='comment-author'><em>{comment.author}</em></div>
      <div className='comment-body'>{comment.body}</div>
      <button onClick={onClickModify}>Modify</button>
      <button onClick={onClickDelete}>Delete</button>
      <div> ------------------ </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onClickModify: PropTypes.func,
  onClickDelete: PropTypes.func
}

export default Comment;